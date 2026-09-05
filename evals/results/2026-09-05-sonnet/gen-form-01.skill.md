# Mobile-first login form

## HTML + CSS + JS

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Log in</title>
<style>
  :root {
    /* Duolingo-forked palette (pov.md §2) — remapped for light by default */
    --color-primary: #2E7D02;        /* darkened Feather Green — passes 4.5:1 with white text (accessibility-baseline overrides pov's #58CC02) */
    --color-primary-lip: #245F02;    /* paired lip, ~15% darker than fill */
    --color-primary-hover: #368F02;  /* hover: fill lightens slightly */
    --color-info: #1CB0F6;           /* Macaw — focus ring, links */
    --color-danger: #FF4B4B;         /* Cardinal — errors */
    --color-danger-lip: #EA2B2B;
    --text-body: #4B4B4B;            /* Eel */
    --text-secondary: #777777;       /* Wolf */
    --text-placeholder: #AFAFAF;     /* Hare */
    --surface-page: #FFFFFF;         /* Snow */
    --surface-inset: #F7F7F7;        /* Polar */
    --border-default: #E5E5E5;       /* Swan */
    --radius-control: 12px;
    --radius-card: 16px;
    --font-body: "Nunito", ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text-body: #F1F7FB;
      --text-secondary: #AFAFAF;
      --text-placeholder: #7A7A7A;
      --surface-page: #131F24;
      --surface-inset: #202F36;
      --border-default: #2E3E45;
      /* --color-primary and --color-danger are semantic; they don't flip (pov.md's -always- convention) */
    }
  }

  * { box-sizing: border-box; }

  html, body {
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    overscroll-behavior: none; /* stop pull-to-refresh from hijacking the screen */
  }

  body {
    margin: 0;
    background: var(--surface-page);
    color: var(--text-body);
    font: 400 16px/1.4 var(--font-body);
  }

  .login-screen {
    min-height: 100dvh; /* not 100vh — see touch-and-focus mobile-native fixes */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px calc(20px + env(safe-area-inset-right)) calc(24px + env(safe-area-inset-bottom)) calc(20px + env(safe-area-inset-left));
  }

  .login-form {
    width: 100%;
    max-width: 400px; /* narrow column holds even on a wide viewport — forms stay single-column at every breakpoint */
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .login-title {
    margin: 0;
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text-body);
  }

  .login-sub {
    margin: -12px 0 4px;
    font-size: 15px;
    color: var(--text-secondary);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-body);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    height: 50px;
    padding: 0 44px 0 16px; /* room for the trailing icon so it overlays, never sits beside */
    font: 600 16px/1 var(--font-body); /* 16px stops iOS auto-zoom on focus */
    color: var(--text-body);
    background: var(--surface-inset);
    border: 2px solid var(--border-default);
    border-radius: var(--radius-control);
    touch-action: manipulation;
    transition: border-color 120ms var(--ease-out-quart), background-color 120ms var(--ease-out-quart);
  }

  input::placeholder { color: var(--text-placeholder); }

  input:focus-visible {
    outline: none;
    border-color: var(--color-info);
    box-shadow: 0 0 0 3px rgba(28, 176, 246, 0.25);
  }

  /* form inputs get border/background feedback on active, never scale — responsive-feedback gotcha */
  input:active { background: var(--surface-page); }

  .field.is-valid input {
    border-color: var(--color-primary);
  }

  .field.is-error input {
    border-color: var(--color-danger);
    background: rgba(255, 75, 75, 0.04);
  }

  .field-icon {
    position: absolute;
    right: 12px;
    width: 20px;
    height: 20px;
    pointer-events: none;
    color: var(--color-primary);
    opacity: 0;
    transition: opacity 120ms var(--ease-out-quart);
  }

  .field.is-valid .field-icon { opacity: 1; }

  /* password-visibility toggle overlays the input as a real, focusable, 44px control */
  .toggle-visibility {
    position: absolute;
    right: 2px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    color: var(--text-secondary);
    cursor: pointer;
    touch-action: manipulation;
  }

  .toggle-visibility:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-info);
    border-radius: 8px;
  }

  .toggle-visibility svg { width: 20px; height: 20px; }

  .error {
    margin: 0;
    min-height: 18px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-danger);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .error:empty { display: none; }

  .error svg { width: 14px; height: 14px; flex-shrink: 0; }

  /* Physical button — pov.md §1: lip reserved by a transparent bottom border, fill on ::before */
  .btn-primary {
    position: relative;
    height: 50px;
    margin-top: 4px;
    border: none;
    border-bottom: 4px solid transparent;
    border-radius: var(--radius-control);
    background: none;
    padding: 0;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-user-select: none;
    user-select: none;
  }

  .btn-primary::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: var(--radius-control);
    background: var(--color-primary);
    box-shadow: 0 4px 0 0 var(--color-primary-lip);
    transition: transform 100ms var(--ease-out-quart), box-shadow 100ms var(--ease-out-quart), background-color 120ms var(--ease-out-quart);
  }

  @media (hover: hover) and (pointer: fine) {
    .btn-primary:hover:not(:disabled)::before { background: var(--color-primary-hover); }
  }

  .btn-primary:active:not(:disabled)::before {
    transform: translateY(4px);
    box-shadow: 0 0 0 0 var(--color-primary-lip);
  }

  .btn-primary:focus-visible {
    outline: none;
  }
  .btn-primary:focus-visible::before {
    box-shadow: 0 4px 0 0 var(--color-primary-lip), 0 0 0 3px rgba(28, 176, 246, 0.4);
  }

  .btn-primary:disabled {
    cursor: not-allowed;
  }
  .btn-primary:disabled::before {
    background: var(--border-default);
    box-shadow: 0 4px 0 0 #C9C9C9;
  }
  .btn-primary:disabled .btn-label { color: var(--text-secondary); }

  .btn-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    font: 700 15px/1 var(--font-body);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #fff;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    animation: spin 700ms linear infinite;
    display: none;
  }

  .btn-primary[data-loading="true"] .spinner { display: inline-block; }

  @keyframes spin { to { transform: rotate(360deg); } }

  .form-status {
    margin: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-danger);
    min-height: 16px;
  }

  .forgot-link {
    align-self: center;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-info);
    text-decoration: none;
    padding: 10px; /* pads a small link up to a real hit target without growing the visible text */
  }
  .forgot-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-info);
    border-radius: 6px;
  }
  @media (hover: hover) and (pointer: fine) {
    .forgot-link:hover { text-decoration: underline; }
  }

  /* prefers-reduced-motion: drop the lip-press translation and the spinner spin,
     keep the border/background/opacity changes that carry the actual state */
  @media (prefers-reduced-motion: reduce) {
    .btn-primary::before,
    input,
    .field-icon {
      transition-duration: 1ms;
    }
    .btn-primary:active:not(:disabled)::before {
      transform: none;
    }
    .spinner {
      animation-duration: 1.4s;
    }
  }
</style>
</head>
<body>

<main class="login-screen">
  <form class="login-form" id="login-form" novalidate>
    <div>
      <h1 class="login-title">log in</h1>
      <p class="login-sub">welcome back — enter your details.</p>
    </div>

    <div class="field" id="email-field">
      <label for="email">Email</label>
      <div class="input-wrap">
        <input
          id="email"
          name="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="name@example.com"
          required
          aria-describedby="email-error"
        />
        <svg class="field-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p class="error" id="email-error" role="alert"></p>
    </div>

    <div class="field" id="password-field">
      <label for="password">Password</label>
      <div class="input-wrap">
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          minlength="8"
          required
          aria-describedby="password-error"
        />
        <button type="button" class="toggle-visibility" id="toggle-password" aria-label="Show password" aria-pressed="false" data-1p-ignore data-lpignore="true">
          <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
      <p class="error" id="password-error" role="alert"></p>
    </div>

    <button type="submit" class="btn-primary" id="submit-btn">
      <span class="btn-label">
        <span class="spinner" aria-hidden="true"></span>
        <span class="btn-label-text">Log in</span>
      </span>
    </button>

    <p class="form-status" id="form-status" role="status" aria-live="polite"></p>

    <a href="#" class="forgot-link">forgot password?</a>
  </form>
</main>

<script>
(function () {
  const form = document.getElementById('login-form');
  const emailField = document.getElementById('email-field');
  const passwordField = document.getElementById('password-field');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = submitBtn.querySelector('.btn-label-text');
  const formStatus = document.getElementById('form-status');
  const toggleBtn = document.getElementById('toggle-password');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Soft signal while typing: only ever clears an error or lights up "valid" —
  // never fires a red border mid-keystroke (forms-validation cadence).
  function softCheck(field, input, isValidFn) {
    if (isValidFn(input.value)) {
      field.classList.add('is-valid');
      field.classList.remove('is-error');
    } else {
      field.classList.remove('is-valid');
    }
  }

  function hardValidateEmail() {
    const value = emailInput.value.trim();
    if (value === '') {
      setError(emailField, emailError, 'Email is required.');
      return false;
    }
    if (!EMAIL_RE.test(value)) {
      setError(emailField, emailError, 'Email looks invalid. Try the format name@example.com.');
      return false;
    }
    clearError(emailField, emailError);
    return true;
  }

  function hardValidatePassword() {
    const value = passwordInput.value;
    if (value === '') {
      setError(passwordField, passwordError, 'Password is required.');
      return false;
    }
    if (value.length < 8) {
      setError(passwordField, passwordError, 'Password must be at least 8 characters.');
      return false;
    }
    clearError(passwordField, passwordError);
    return true;
  }

  function setError(field, errorEl, message) {
    field.classList.add('is-error');
    field.classList.remove('is-valid');
    errorEl.textContent = message;
  }

  function clearError(field, errorEl) {
    field.classList.remove('is-error');
    errorEl.textContent = '';
  }

  emailInput.addEventListener('input', () => softCheck(emailField, emailInput, v => EMAIL_RE.test(v.trim())));
  emailInput.addEventListener('blur', hardValidateEmail);

  passwordInput.addEventListener('input', () => softCheck(passwordField, passwordInput, v => v.length >= 8));
  passwordInput.addEventListener('blur', hardValidatePassword);

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.setAttribute('aria-pressed', String(isPassword));
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    passwordInput.focus({ preventScroll: true });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '';

    const emailOk = hardValidateEmail();
    const passwordOk = hardValidatePassword();

    if (!emailOk || !passwordOk) {
      // Focus the first invalid field — final-pass rule from forms-validation.
      (emailOk ? passwordInput : emailInput).focus();
      return;
    }

    // Disable + relabel while the request is in flight (forms-behavior double-submit fix).
    submitBtn.disabled = true;
    submitBtn.setAttribute('data-loading', 'true');
    submitLabel.textContent = 'Logging in…';

    setTimeout(() => {
      // Replace with the real request. On failure: re-enable, keep values, show a
      // specific server message here (forms-validation "server-side validation").
      submitBtn.disabled = false;
      submitBtn.removeAttribute('data-loading');
      submitLabel.textContent = 'Log in';
      formStatus.textContent = 'Logged in.';
    }, 1200);
  });
})();
</script>

</body>
</html>
```

## Rationale

Built mobile-first per **[[viewport-custom-design]]** — a single narrow column (`max-width: 400px`, `100dvh`, `env(safe-area-inset-*)`) that never gains a desktop breakpoint, since "forms stay single-column, no exceptions." Field behavior follows **[[forms-validation]]**'s cadence exactly: soft positive-only signals while typing, hard validation with specific fix-it copy on blur, and a final pass on submit that focuses the first invalid field. **[[forms-behavior]]** drove the platform wiring — `for`/`id` labels, `type="email"`, 16px input font to block iOS zoom, a real `<form>` so Enter submits, the submit button disabling and relabeling to "Logging in…" while in flight, and the password-visibility icon overlaying the input as its own control rather than a decorative sibling. **[[touch-and-focus]]** and **[[accessibility-baseline]]** set the floor beneath the brand: 44px hit areas on the toggle and the forgot-password link, hover gated behind `(hover: hover) and (pointer: fine)`, `:focus-visible` rings instead of bare `outline: none`, `aria-live="polite"` status, and `aria-label`s on the icon-only toggle. **[[responsive-feedback]]** and **[[prefers-reduced-motion]]** shaped the button press (`translateY` compress, dropped under reduced motion while the color/border state change stays legible) — inputs deliberately get border/background feedback on `:active`, never `scale`, per that node's own gotcha. Finally, this install's **[[pov]]** (forked to Duolingo) supplied the physical button construction — a reserved 4px lip that the fill compresses into on press, paired fill/lip colors, ALL CAPS button label, lowercase sentence-case heading — with one deliberate override of the POV itself: **[[accessibility-baseline]]** outranks brand, so the button fill is darkened from Duolingo's literal Feather Green to a value that clears 4.5:1 with white text, per the POV's own explicit escape hatch for that exact conflict.
