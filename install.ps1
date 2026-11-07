# design-engineering installer for Windows (PowerShell 5.1+ and 7+).
#
#   irm https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.ps1 | iex
#   & ([scriptblock]::Create((irm https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.ps1))) -DryRun
#   $env:DE_REF = 'v4.0.0'; .\install.ps1 -Harness claude,codex -Yes
#
# Run from a checkout and it installs that checkout instead of downloading.
# Idempotent; backs up any settings file before editing; never reads or writes
# credentials. -Uninstall removes exactly what the manifest says it installed.
param(
  [switch]$DryRun,
  [string[]]$Only,
  [string[]]$Harness,
  [switch]$Yes,
  [switch]$Uninstall,
  [switch]$WithHooks,
  [switch]$NoHooks,
  [switch]$WithMcp,
  [switch]$WithCompanions,
  [switch]$Help
)
$ErrorActionPreference = 'Stop'

if ($Help) {
  @'
Usage: install.ps1 [-DryRun] [-Only skill,plugin,agents,hooks,mcp,companions]
                   [-Harness claude,codex,cursor,gemini,opencode] [-Yes]
                   [-WithHooks | -NoHooks] [-WithMcp] [-WithCompanions] [-Uninstall]
Env: DE_REF (latest release by default; a tag like v4.2.1, or a branch like main), DE_REPO (default AgentsORG/design-engineering),
     DE_USE_SKILLS_CLI=1 (install the skill with npx skills instead of copying it from the download)
'@ | Write-Output
  return
}

$Repo = if ($env:DE_REPO) { $env:DE_REPO } else { 'AgentsORG/design-engineering' }
$Ref = if ($env:DE_REF) { $env:DE_REF } else { 'latest' }
$HomeDir = if ($env:DE_HOME) { $env:DE_HOME } else { $HOME }
$CfgBase = if ($env:XDG_CONFIG_HOME) { $env:XDG_CONFIG_HOME } else { Join-Path $HomeDir '.config' }
$CfgDir = Join-Path $CfgBase 'design-engineering'
$Manifest = Join-Path $CfgDir 'manifest.txt'
$Backups = Join-Path $CfgDir 'backups'
$SkillDst = Join-Path $HomeDir '.agents\skills\design-engineering'
$AllHarness = @('claude', 'codex', 'cursor', 'gemini', 'opencode')

function Split-List($v) { @($v | ForEach-Object { $_ -split ',' } | Where-Object { $_ } | ForEach-Object { $_.Trim() }) }
$Parts = @('skill', 'plugin', 'agents', 'hooks')
if ($WithMcp) { $Parts += 'mcp' }
if ($WithCompanions) { $Parts += 'companions' }
if ($Only) { $Parts = Split-List $Only }
if ($NoHooks) { $Parts = @($Parts | Where-Object { $_ -ne 'hooks' }) }
function Want($p) { $Parts -contains $p }

$Summary = New-Object System.Collections.ArrayList
function Note($part, $target, $status) {
  if ($DryRun) { $status = "would: $status" }
  [void]$Summary.Add([pscustomobject]@{ Part = $part; Target = $target; Status = $status })
}
function Say($m) { Write-Host $m }
function Have($c) { [bool](Get-Command $c -ErrorAction SilentlyContinue) }
function Act($desc, [scriptblock]$block) {
  if ($DryRun) { Say "  [dry-run] $desc"; return }
  & $block
}
function Record($line) {
  if ($DryRun) { return }
  New-Item -ItemType Directory -Force $CfgDir | Out-Null
  $have = @(); if (Test-Path $Manifest) { $have = @(Get-Content $Manifest) }
  if ($have -notcontains $line) { Add-Content -Path $Manifest -Value $line -Encoding utf8 }
}
function BKey($p) { 'home' + ($p.Substring([Math]::Min($HomeDir.Length, $p.Length)) -replace '[\\/:]', '__') }
function Stamp { Get-Date -Format 'yyyyMMddHHmmss' }
function Same($a, $b) { (Test-Path $b) -and ((Get-FileHash $a).Hash -eq (Get-FileHash $b).Hash) }
function Put-File($from, $dst) {
  if (Same $from $dst) { return 'same' }
  $mine = (Test-Path $Manifest) -and (@(Get-Content $Manifest) -contains "file:$dst")
  if ((Test-Path $dst) -and -not $mine) {
    Act "back up $dst" { New-Item -ItemType Directory -Force $Backups | Out-Null; Copy-Item $dst (Join-Path $Backups "$(BKey $dst).$(Stamp)") }
  }
  Act "copy $from -> $dst" { New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null; Copy-Item $from $dst -Force }
  Record "file:$dst"
  'new'
}
function Invoke-Native($desc, [string]$exe, [string[]]$argv) {
  Act "$exe $($argv -join ' ')" { & $exe @argv; if ($LASTEXITCODE -ne 0) { throw "$exe failed ($LASTEXITCODE): $desc" } }
}

# ---------- source ----------
$Src = $null; $Mode = $null
if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot 'skills\design-engineering\SKILL.md')) -and (Test-Path (Join-Path $PSScriptRoot 'plugin\agents'))) {
  $Src = $PSScriptRoot; $Mode = 'local checkout'
}
function Get-Source {
  # Returns @(path, mode). Never writes $script: variables: under `& ([scriptblock]::Create((irm ...)))`
  # the script: scope is the caller's, so the top level would never see them.
  if ($Src) { return @($Src, $Mode) }
  $tmp = Join-Path ([IO.Path]::GetTempPath()) ("de-" + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Force $tmp | Out-Null
  $zip = Join-Path $tmp 'src.zip'
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $ProgressPreference = 'SilentlyContinue'
  # A release ships a ~1 MB install bundle; a branch only has the full repo snapshot.
  $bundle = if ($Ref -eq 'latest') { "https://github.com/$Repo/releases/latest/download/design-engineering-install.zip" }
            elseif ($Ref -match '^v\d') { "https://github.com/$Repo/releases/download/$Ref/design-engineering-install.zip" } else { $null }
  $mode = $null
  if ($bundle) {
    Say "Downloading $Repo ($Ref) install bundle ..."
    try { Invoke-WebRequest -UseBasicParsing $bundle -OutFile $zip; $mode = "release $Ref" } catch { Say "No install bundle for $Ref; downloading the repo snapshot instead." }
  }
  if (-not $mode) {
    $snap = if ($Ref -eq 'latest') { 'main' } else { $Ref }
    Say "Downloading $Repo@$snap ..."
    Invoke-WebRequest -UseBasicParsing "https://codeload.github.com/$Repo/zip/$snap" -OutFile $zip
    $mode = "download $snap"
  }
  Expand-Archive $zip -DestinationPath $tmp -Force
  return @((Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName, $mode)
}

# ---------- harness detection ----------
function Detect($h) {
  switch ($h) {
    'claude' { (Have 'claude') -or (Test-Path (Join-Path $HomeDir '.claude')) }
    'codex' { (Have 'codex') -or (Test-Path (Join-Path $HomeDir '.codex')) }
    'cursor' { (Have 'cursor-agent') -or (Have 'cursor') -or (Test-Path (Join-Path $HomeDir '.cursor')) }
    'gemini' { (Have 'gemini') -or (Have 'agy') -or (Test-Path (Join-Path $HomeDir '.gemini')) }
    'opencode' { (Have 'opencode') -or (Test-Path (Join-Path $HomeDir '.config\opencode')) }
    default { $false }
  }
}
if ($Harness) { $Harness = Split-List $Harness } else { $Harness = @($AllHarness | Where-Object { Detect $_ }) }
function UseH($h) { $Harness -contains $h }
$AgentDir = @{
  claude = Join-Path $HomeDir '.claude\agents'; codex = Join-Path $HomeDir '.codex\agents'
  cursor = Join-Path $HomeDir '.cursor\agents'; gemini = Join-Path $HomeDir '.gemini\agents'
  opencode = Join-Path $HomeDir '.config\opencode\agents'
}

function Show-Summary {
  Say ''
  $Summary | Format-Table -AutoSize Part, Target, Status | Out-String -Width 200 | Write-Host
}

# ---------- uninstall ----------
if ($Uninstall) {
  Say 'Uninstalling design-engineering'
  if (Test-Path $Manifest) {
    $lines = @(Get-Content $Manifest)
    $merge = Join-Path $CfgDir 'hooks\merge-settings.mjs'
    foreach ($line in $lines) {
      if ($line -like 'settings:*') {
        $s = $line.Substring(9)
        if ((Test-Path $merge) -and (Have 'node')) { Invoke-Native 'remove hook' 'node' @($merge, '--settings', $s, '--remove'); Note 'hooks' $s 'hook removed' }
        else { Note 'hooks' $s 'remove the design-check.mjs entry by hand' }
      } elseif ($line -like 'plugin:*' -and (Have 'claude')) {
        try { Invoke-Native 'plugin uninstall' 'claude' @('plugin', 'uninstall', 'design-engineering@agentsorg', '-s', 'user') } catch { }
        Note 'plugin' 'claude' 'removed'
      } elseif ($line -eq 'mcp:claude' -and (Have 'claude')) {
        try { Invoke-Native 'mcp remove' 'claude' @('mcp', 'remove', 'design-engineering', '-s', 'user') } catch { }
        Note 'mcp' 'claude' 'removed'
      }
    }
    foreach ($line in $lines) {
      if ($line -like 'file:*') {
        $f = $line.Substring(5)
        $bak = Get-ChildItem $Backups -Filter "$(BKey $f).*" -ErrorAction SilentlyContinue | Sort-Object Name | Select-Object -Last 1
        if ($bak) { Act "restore $f" { Move-Item $bak.FullName $f -Force }; Note 'remove' $f 'restored your earlier copy' }
        elseif (Test-Path $f) { Act "remove $f" { Remove-Item $f -Force }; Note 'remove' $f 'removed' }
      } elseif ($line -like 'dir:*') {
        $d = $line.Substring(4)
        if (Test-Path $d) { Act "remove $d" { Remove-Item $d -Recurse -Force }; Note 'remove' $d 'removed' }
      }
    }
    Act "remove $CfgDir\hooks and manifest" { Remove-Item (Join-Path $CfgDir 'hooks'), (Join-Path $CfgDir 'hooks.off'), $Manifest -Recurse -Force -ErrorAction SilentlyContinue }
  } else { Say "No manifest at $Manifest; nothing recorded to remove." }
  Show-Summary
  Say "Skills added with 'npx skills' are removed with: npx skills remove design-engineering -g"
  return
}

# ---------- install ----------
$Src, $Mode = Get-Source
$Version = '?'
try { $Version = (Get-Content (Join-Path $Src '.claude-plugin\plugin.json') -Raw | ConvertFrom-Json).version } catch { }
Say "design-engineering $Version from $Mode"
Say "Harnesses: $(if ($Harness) { $Harness -join ',' } else { 'none detected' })"
Say "Parts:     $($Parts -join ',')"
if ($DryRun) { Say 'Dry run: nothing will be changed.' }
Say ''
if (-not $Yes -and -not $DryRun -and [Environment]::UserInteractive -and -not [Console]::IsInputRedirected) {
  $a = Read-Host 'Proceed? [Y/n]'
  if ($a -match '^(n|no)$') { Say 'Aborted.'; return }
}

$UsePlugin = (Want 'plugin') -and (UseH 'claude') -and (Have 'claude')

# skill
$SkillCopy = $false
if (Want 'skill') {
  if ($Mode -ne 'local checkout' -and (Have 'npx') -and $env:DE_USE_SKILLS_CLI -eq '1') {
    $ag = @()
    foreach ($h in $Harness) {
      switch ($h) { 'claude' { if (-not $UsePlugin) { $ag += 'claude-code' } } 'gemini' { $ag += 'gemini-cli' } default { $ag += $h } }
    }
    if ($ag.Count) {
      try {
        Invoke-Native 'skills add' 'npx' (@('-y', 'skills', 'add', $Repo, '-g', '-y', '-a') + $ag)
        Note 'skill' "npx skills ($($ag -join ' '))" 'installed'
      } catch {
        Say "npx skills failed ($($_.Exception.Message)); copying the skill from the downloaded release instead."
        $SkillCopy = $true
      }
    }
    else { Note 'skill' 'npx skills' 'skipped (plugin covers Claude Code)' }
  } else { $SkillCopy = $true }
  if ($SkillCopy) {
    $skillSrc = Join-Path $Src 'skills\design-engineering'
    $targets = @($SkillDst)
    foreach ($h in $Harness) {
      switch ($h) {
        'claude' { if (-not $UsePlugin) { $targets += Join-Path $HomeDir '.claude\skills\design-engineering' } }
        'gemini' { $targets += Join-Path $HomeDir '.gemini\skills\design-engineering' }
        'opencode' { $targets += Join-Path $HomeDir '.config\opencode\skills\design-engineering' }
      }
    }
    foreach ($d in $targets) {
      $ours = Test-Path (Join-Path $d '.de-installed')
      if ((Test-Path $d) -and -not $ours) {
        if ($d -eq $SkillDst) {
          Act "move existing $d to $Backups" { New-Item -ItemType Directory -Force $Backups | Out-Null; Move-Item $d (Join-Path $Backups "design-engineering-skill.$(Stamp)") }
        } else { Note 'skill' $d 'kept (existing, not ours)'; continue }
      }
      Act "copy $skillSrc -> $d" {
        if (Test-Path $d) { Remove-Item $d -Recurse -Force }
        New-Item -ItemType Directory -Force (Split-Path $d) | Out-Null
        Copy-Item $skillSrc $d -Recurse
        New-Item -ItemType File (Join-Path $d '.de-installed') -Force | Out-Null
      }
      Record "dir:$d"; Note 'skill' $d 'copied'
    }
  }
}

# Claude Code plugin
if ($UsePlugin) {
  $installed = $false
  if (-not $DryRun) { $installed = [bool]((claude plugin list 2>$null) -match 'design-engineering') }
  if ($installed) {
    try { & claude plugin marketplace update agentsorg *> $null } catch { }
    Note 'plugin' 'design-engineering@agentsorg' 'already installed (marketplace updated)'
  } else {
    $mk = if ($Ref -notin @('main', 'latest')) { "https://github.com/$Repo.git#$Ref" } else { $Repo }
    try { Invoke-Native 'marketplace add' 'claude' @('plugin', 'marketplace', 'add', $mk) } catch { Say "  marketplace add: $_" }
    Invoke-Native 'plugin install' 'claude' @('plugin', 'install', 'design-engineering@agentsorg', '-s', 'user')
    Note 'plugin' 'design-engineering@agentsorg' 'installed'
  }
  Record 'plugin:design-engineering@agentsorg'
} elseif ((Want 'plugin') -and (UseH 'claude')) { Note 'plugin' 'claude' 'skipped (claude CLI not on PATH)' }

# agents
if (Want 'agents') {
  foreach ($h in $Harness) {
    if ($h -eq 'claude' -and $UsePlugin) { Note 'agents' 'claude' 'from plugin'; continue }
    $agSrc = if ($h -eq 'claude') { Join-Path $Src 'plugin\agents' } else { Join-Path $Src "plugin\harness\$h\agents" }
    $ext = if ($h -eq 'codex') { '*.toml' } else { '*.md' }
    if (-not (Test-Path $agSrc)) { Note 'agents' $h 'no generated files'; continue }
    $n = 0; $c = 0
    foreach ($f in Get-ChildItem $agSrc -Filter $ext -File) {
      $r = Put-File $f.FullName (Join-Path $AgentDir[$h] $f.Name); $n++; if ($r -eq 'new') { $c++ }
    }
    Note 'agents' $AgentDir[$h] "$n files ($c new/updated)"
  }
}

# hooks
$Off = Join-Path $CfgDir 'hooks.off'
if ($NoHooks -and $UsePlugin) {
  Act "write $Off" { New-Item -ItemType Directory -Force $CfgDir | Out-Null; New-Item -ItemType File $Off -Force | Out-Null }
  Note 'hooks' 'plugin hook' "switched off ($Off)"
}
if (Want 'hooks') {
  $hd = Join-Path $CfgDir 'hooks'
  foreach ($f in 'design-check.mjs', 'merge-settings.mjs') { [void](Put-File (Join-Path $Src "plugin\hooks\$f") (Join-Path $hd $f)) }
  if (Test-Path $Off) { Act "remove $Off" { Remove-Item $Off -Force } }
  if ($UsePlugin) { Note 'hooks' 'plugin/hooks/hooks.json' 'on (PostToolUse Edit|Write)' }
  elseif (UseH 'claude') {
    $settings = Join-Path $HomeDir '.claude\settings.json'
    if (Have 'node') {
      $cmd = 'node "' + ((Join-Path $hd 'design-check.mjs') -replace '\\', '/') + '"'
      # Windows PowerShell < 7.3 drops embedded quotes when calling native tools
      if ($PSVersionTable.PSVersion -lt [version]'7.3') { $cmd = $cmd -replace '"', '\"' }
      Invoke-Native 'merge hook' 'node' @((Join-Path $hd 'merge-settings.mjs'), '--settings', $settings, '--command', $cmd)
      Record "settings:$settings"; Note 'hooks' $settings 'PostToolUse merged (backup kept)'
    } else { Note 'hooks' $settings 'skipped (node not found)' }
  }
  foreach ($h in 'codex', 'gemini', 'cursor', 'opencode') { if (UseH $h) { Note 'hooks' $h 'not wired (see docs/install.md)' } }
}

# optional eve MCP
if (Want 'mcp') {
  $url = 'http://localhost:2000/eve/v1/mcp'
  if ((UseH 'claude') -and (Have 'claude')) {
    $exists = $false
    if (-not $DryRun) { & claude mcp get design-engineering *> $null; $exists = ($LASTEXITCODE -eq 0) }
    if ($exists) { Note 'mcp' 'claude' 'already registered' }
    else { Invoke-Native 'mcp add' 'claude' @('mcp', 'add', '--transport', 'http', '-s', 'user', 'design-engineering', $url); Record 'mcp:claude'; Note 'mcp' 'claude' $url }
  }
  foreach ($h in 'codex', 'cursor', 'gemini', 'opencode') { if (UseH $h) { Note 'mcp' $h "add $url by hand (docs/install.md)" } }
}

# optional companions
if (Want 'companions') {
  if (Have 'npx') { Invoke-Native 'agentation' 'npx' @('-y', 'skills', 'add', 'benjitaylor/agentation', '-g', '-y'); Note 'companions' 'agentation' 'installed' }
  else { Note 'companions' 'agentation' 'skipped (npx not found)' }
  Note 'companions' 'stageshow' 'manual: https://benji.org/stageshow'
}

Show-Summary
Say 'Verify:'
if (UseH 'claude') { Say '  Claude Code: /design-engineering review   then  @agent-design-council (or @agent-ui-reviewer)' }
if (UseH 'codex') { Say "  Codex:       ask 'use the ui-reviewer agent on src/'  (agents in ~/.codex/agents)" }
if (UseH 'cursor') { Say '  Cursor:      /design-engineering in Agent chat; subagents from ~/.cursor/agents' }
if (UseH 'gemini') { Say '  Gemini:      gemini, then /agents list' }
if (UseH 'opencode') { Say '  OpenCode:    @ui-reviewer' }
Say "  Uninstall:   .\install.ps1 -Uninstall   (manifest: $Manifest)"
if ($DryRun) { Say ''; Say 'Dry run complete. Re-run without -DryRun to apply.' }
