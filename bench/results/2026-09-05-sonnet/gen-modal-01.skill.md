# Settings modal — enter animation

```html
<!-- Trigger button (for context/demo only — remove in real usage) -->
<button type="button" id="openSettings" class="btn btn--secondary">Open settings</button>

<dialog id="settingsModal" class="modal" aria-labelledby="settingsTitle">
  <form method="dialog" class="modal__form">
    <header class="modal__header">
      <h2 id="settingsTitle" class="modal__title">settings</h2>
      <button type="button" class="icon-btn" data-close aria-label="Close settings">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </header>

    <div class="modal__body">
      <div class="field">
        <label for="displayName">Display name</label>
        <input id="displayName" name="displayName" type="text" autocomplete="name" placeholder="Ada Lovelace" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" placeholder="ada@example.com" />
      </div>
    </div>

    <footer class="modal__footer">
      <button type="button" class="btn btn--secondary" data-close>CANCEL</button>
      <button type="submit" class="btn btn--primary" value="save">SAVE</button>
    </footer>
  </form>
</dialog>
```

```css
:root {
  /* Duolingo-forked tokens — light */
  --color-feather: #58cc02;
  --color-feather-lip: #58a700;
  --color-save-fill: #367f00;      /* darkened from Feather Green so white text clears 4.5:1 (pov §8) */
  --color-save-lip: #2e6c00;
  --color-eel: #4b4b4b;
  --color-wolf: #777777;
  --color-hare: #afafaf;
  --color-swan: #e5e5e5;
  --color-polar: #f7f7f7;
  --color-snow: #ffffff;
  --color-macaw: #1cb0f6;

  --radius-modal: 16px;
  --radius-control: 12px;
  --radius-input: 8px;

  --shadow-lg:
    0 2px 4px rgba(17, 17, 17, 0.06),
    0 8px 16px rgba(17, 17, 17, 0.06),
    0 16px 48px rgba(17, 17, 17, 0.06);

  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --dur-enter: 220ms;
  --dur-exit: 160ms; /* ~72% of enter — asymmetric enter/exit */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-eel: #f1f7fb;      /* text remap, not #fff */
    --color-swan: #2f3d44;
    --color-polar: #202f36;
    --color-snow: #131f24;     /* ground remap, not #000 */
    --color-wolf: #9aa7ad;
  }
}

* { box-sizing: border-box; }

body {
  font: 15px/1.4 "Nunito", system-ui, sans-serif;
  color: var(--color-eel);
}

/* ---------- Modal shell ---------- */

.modal {
  padding: 0;
  border: none;
  border-radius: var(--radius-modal);
  background: var(--color-snow);
  color: var(--color-eel);
  box-shadow: var(--shadow-lg); /* floating layer keeps whisper shadow, not the pressable lip */
  width: min(420px, calc(100vw - 32px));

  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity var(--dur-exit) var(--ease-out-quart),
    transform var(--dur-exit) var(--ease-out-quart),
    display var(--dur-exit) allow-discrete,
    overlay var(--dur-exit) allow-discrete;
}

.modal[open] {
  opacity: 1;
  transform: scale(1);
  transition-duration: var(--dur-enter);
}

@starting-style {
  .modal[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity var(--dur-exit) var(--ease-out-quart), display var(--dur-exit) allow-discrete, overlay var(--dur-exit) allow-discrete;
}

.modal[open]::backdrop {
  opacity: 1;
  transition-duration: var(--dur-enter);
}

@starting-style {
  .modal[open]::backdrop { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    transform: none;
    transition: opacity 120ms linear, display 120ms allow-discrete, overlay 120ms allow-discrete;
  }
  .modal[open] { transition-duration: 120ms; }
  @starting-style { .modal[open] { transform: none; opacity: 0; } }
}

/* ---------- Header ---------- */

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0 24px;
}

.modal__title {
  margin: 0;
  font: 800 24px/1.1 "Baloo 2", "Nunito", system-ui, sans-serif; /* display-face stand-in */
  letter-spacing: -0.02em;
  text-transform: lowercase; /* display face is always lowercase per pov */
  color: var(--color-eel);
}

.icon-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: var(--color-wolf);
  cursor: pointer;
  touch-action: manipulation;
}

.icon-btn::before {
  content: "";
  position: absolute;
  inset: -10px; /* grows the 24px glyph to a 44px hit area without changing the visual */
}

.icon-btn:hover { color: var(--color-eel); }
.icon-btn:focus-visible { outline: 2px solid var(--color-macaw); outline-offset: 2px; border-radius: 4px; }

/* ---------- Body / fields ---------- */

.modal__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font: 700 13px/1.2 "Nunito", system-ui, sans-serif;
  color: var(--color-wolf);
}

.field input {
  height: 44px;
  padding: 0 14px;
  font-size: 16px; /* prevents iOS zoom-on-focus */
  font-family: "Nunito", system-ui, sans-serif;
  color: var(--color-eel);
  background: var(--color-polar);
  border: 2px solid var(--color-swan);
  border-radius: var(--radius-input);
  transition: border-color 150ms var(--ease-out-quart), background 150ms var(--ease-out-quart);
}

.field input::placeholder { color: var(--color-hare); }

.field input:hover { border-color: var(--color-hare); }

.field input:focus-visible {
  outline: none;
  border-color: var(--color-macaw);
  background: var(--color-snow);
}

/* ---------- Footer / buttons (physical, pressable) ---------- */

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 4px 24px 24px;
}

.btn {
  position: relative;
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: var(--radius-control);
  border-bottom: 4px solid transparent; /* reserves the lip, no reflow on press */
  font: 700 14px/1 "Nunito", system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  touch-action: manipulation;
  transition: transform 100ms var(--ease-out-quart);
}

.btn:focus-visible { outline: 2px solid var(--color-macaw); outline-offset: 2px; }

.btn--primary {
  color: var(--color-snow); /* stays white in both themes — an "always-light" token */
}
.btn--primary::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: var(--radius-control);
  background: var(--color-save-fill);
  box-shadow: 0 4px 0 0 var(--color-save-lip);
  transition: box-shadow 100ms var(--ease-out-quart);
}
.btn--primary:active {
  transform: translateY(4px);
}
.btn--primary:active::before {
  box-shadow: 0 0 0 0 var(--color-save-lip);
}

.btn--secondary {
  color: var(--color-wolf);
  background: var(--color-snow);
  border: 2px solid var(--color-swan);
  border-bottom-width: 2px; /* secondary keeps a 2px lip, not 4px */
}
.btn--secondary::before {
  content: "";
  position: absolute;
  left: -2px; right: -2px; bottom: -4px;
  height: 2px;
  background: var(--color-swan);
  z-index: -1;
}
.btn--secondary:active { transform: translateY(2px); }

@media (prefers-reduced-motion: reduce) {
  .btn, .modal__title, .field input { transition: none; }
}
```

```js
const dialog = document.getElementById('settingsModal');
const openBtn = document.getElementById('openSettings');
let trigger = null;

openBtn.addEventListener('click', () => {
  trigger = document.activeElement;
  dialog.showModal();

  // Autofocus the first input on desktop only — never shove the keyboard
  // into the user's face on touch (forms-behavior).
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFinePointer) {
    dialog.querySelector('#displayName')?.focus();
  }
});

// Cancel and the header X both just close — no data changes.
dialog.querySelectorAll('[data-close]').forEach((el) =>
  el.addEventListener('click', () => dialog.close('cancel'))
);

// Click on the backdrop (the <dialog> element itself, outside its content box) dismisses.
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close('cancel');
});

// Esc-to-close and focus trap are native to <dialog> — nothing to wire up.

dialog.addEventListener('close', () => {
  // Return focus to whatever opened the modal (touch-and-focus rule 7).
  trigger?.focus();

  if (dialog.returnValue === 'save') {
    // Read dialog.querySelector('#displayName').value / #email.value here
    // and persist. Left as a stub — no backend specified.
  }
});
```

## Rationale

The shell is a native `<dialog>` (accessibility-baseline: platform semantics before ARIA), which gives focus trapping, `Esc`-to-close, and a `::backdrop` for free instead of hand-rolled JS — [[dependency-discipline]] and [[touch-and-focus]] rule 7 (focus moves in, and returns to the trigger on close, wired explicitly in the `close` handler). The enter animation follows [[never-scale-from-zero]] exactly: `scale(0.95) + opacity` via `@starting-style`, never `scale(0)`; [[duration-table]]'s modal row (200–300ms) and its asymmetric-enter/exit rule (220ms in, 160ms out, ~72%) set the timing; [[easing-curves]]' `--ease-out-quart` drives it; [[prefers-reduced-motion]] strips the scale and keeps a 120ms opacity fade rather than killing motion outright. Because the modal is a floating layer rather than something pressed, it takes [[shadows-whisper]]'s layered `--shadow-lg` and [[border-radius]]'s `xl` (16px) token — per `pov.md` §1, the opaque 4px "lip" construction is reserved for the two buttons (Save gets the full 4px pressable lip, Cancel the 2px secondary variant), not the modal shell itself. Buttons, color, and type follow `pov.md`'s Duolingo fork: ALL CAPS button labels, a lowercase sentence-case display title, Feather Green for Save — darkened to `#367f00` per the POV's own accessibility override (§8, since white-on-`#58CC02` fails 4.5:1 and the label isn't large-bold enough to qualify for the AA large-text exception). Inputs follow [[forms-behavior]] (wired `label[for]`, 16px font to block iOS zoom, `type="email"` for native validation/keyboard, autofocus gated to desktop pointers only) and [[accessibility-baseline]] (`:focus-visible` rings in Macaw, not bare `outline:none`, real `<button>` elements, `aria-label` on the icon-only close button, its hit area grown to 44px via an inset pseudo-element per [[touch-and-focus]]). Title-plus-dismiss and overlay-not-navigate are the two [[tray-rules]] principles that generalize past tray stacks to any single-purpose overlay; its stacking- and height-variance rules don't apply since this is one non-stacked modal, not a tray sequence.
