---
title: sound-licensing
summary: A launch film is commercial, edited and published where audio is scanned, so every recording needs a licence that allows all three — read on the item's own page, recorded, audited and credited. CC0 and CC BY yes; NC, ND and SA no; Content ID is its own trap.
tags: [sound, licensing, launch-video, music, credits, freesound, cc0]
---

# Sound licensing

A recording in a launch film is used **commercially**, **edited** (trimmed, layered and synced to picture is a derivative in law) and **published** on platforms that scan audio. Its licence has to allow all three, and you only know that from the item's own page. When in doubt, leave it out: there is always another recording.

## Allowed and forbidden

| Licence | Film use | Why | Credit |
|---|---|---|---|
| CC0, Public Domain Mark | yes | no conditions | courtesy |
| CC BY 2.0–4.0 | yes | commercial use and edits allowed | **required**: title, author, source link, licence link, "edited" |
| Mixkit SFX / Stock Music Free License | yes | commercial video, no attribution | courtesy; never redistribute the raw files, never register the film with Content ID |
| Pixabay Content License | yes | commercial, no attribution; blocks scripted downloads, so the user fetches it | courtesy |
| CC BY-NC (any version) | **no** | a launch film is commercial | — |
| CC BY-ND | **no** | trimming and syncing are derivatives | — |
| CC BY-SA | **no** | the whole film would have to ship under CC BY-SA | — |
| "personal use", "free with credit on social", "royalty free" with no text, rips | **no** | not a licence an audit can trust | — |
| Two sources disagree | **no** | the strictest reading wins | — |

AI-generated sound follows its model's terms instead ([[sound-generation-elevenlabs]], [[sound-generation-open-source]]): Stability's licence flips at US $1 M revenue, and AudioGen's weights are non-commercial.

## Verify on the item's page

- **Freesound** licences are per sound, not per user: read the sidebar of `freesound.org/people/<user>/sounds/<id>/`. Read the description too, because some authors ask for an exact credit line or forbid uploading the raw file.
- **Aggregators are not authoritative.** earshot's real-sound skill caught a track an aggregator listed as CC BY 3.0 whose artist page said "free with credit on social media" — copyrighted, so rejected.
- **Record what you read**: the licence text as shown, the URL, the page's author and title, and the date, in a manifest next to the file. A licence remembered from an earlier session is not a licence read.

## Content ID

Some composers register their CC BY tracks with Content ID through a distributor, so a correct use can still draw an automatic claim. Credit the track in the description, dispute any claim citing the licence, and pick composers who explain this on their site. Mixkit and Pixabay forbid the reverse: never register a film containing their items.

## Credits

A complete CC BY credit names the title, the author, the source link, the licence and its link, and says the recording was edited. It goes in the video description; it never needs to be on screen. Effects you rendered in code are yours: MotionVideo's launch film credits its forged effects as CC0, made in code, beside its Mixkit track.

## Gotcha

The audit is bookkeeping as much as law. The Clawd film, scored with earshot's real-sound skill, shipped four celesta notes added after the hand audit with no audit record. The licences had been read; the record was missing. Re-run the audit on what the *final* mix uses, not on what the brief listed.

## Sources

- Leon Lin, earshot (MIT, HEAD 925ebe5): `skills/real-sound/references/licences.md` (the table, per-site verification, Content ID, the audit and the Clawd film's four unrecorded notes).
- Creative Commons licence deeds (BY, BY-NC, BY-ND, BY-SA 4.0); mixkit.co/license; pixabay.com/service/license-summary.
- Aniket Pawar, MotionVideo (MIT): `launch-video/CREDITS.md`.
- Related: [[earshot-reconciliation]], [[launch-video-music]], [[sound-generation-open-source]].
