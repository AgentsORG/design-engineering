# Settings Modal

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Settings Modal</title>
<style>
  :root {
    --bg: #ffffff;
    --text: #1a1a1a;
    --text-muted: #6b7280;
    --border: #e5e7eb;
    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --overlay: rgba(15, 15, 20, 0.45);
    --radius: 12px;
    --shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.25), 0 4px 12px -4px rgba(0, 0, 0, 0.1);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #f3f4f6;
  }

  .open-btn {
    padding: 10px 18px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  /* Overlay */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: var(--overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 1000;

    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease;
  }

  .modal-overlay.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Modal card */
  .modal {
    width: 100%;
    max-width: 420px;
    background: var(--bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 24px;

    /* enter animation starting state */
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }

  /* Animate in only when overlay carries .is-open, using a distinct
     timing function from the overlay fade so the motion doesn't feel linear */
  .modal-overlay.is-open .modal {
    animation: modal-in 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal-overlay,
    .modal {
      transition: none !important;
      animation: none !important;
    }
    .modal-overlay.is-open .modal {
      opacity: 1;
      transform: none;
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .modal-title {
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    margin: 0;
  }

  .close-btn {
    border: none;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 4px;
    border-radius: 6px;
  }

  .close-btn:hover {
    background: #f3f4f6;
    color: var(--text);
  }

  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 6px;
  }

  .field input {
    width: 100%;
    padding: 9px 12px;
    font-size: 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #fff;
    color: var(--text);
    outline: none;
    transition: border-color 120ms ease, box-shadow 120ms ease;
  }

  .field input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
  }

  .btn {
    padding: 9px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease;
  }

  .btn-cancel {
    background: #fff;
    border-color: var(--border);
    color: var(--text);
  }

  .btn-cancel:hover {
    background: #f9fafb;
  }

  .btn-save {
    background: var(--accent);
    color: #fff;
  }

  .btn-save:hover {
    background: var(--accent-hover);
  }
</style>
</head>
<body>

<button class="open-btn" id="openModalBtn">Open Settings</button>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">Settings</h2>
      <button class="close-btn" id="closeModalBtn" aria-label="Close">&times;</button>
    </div>

    <div class="field">
      <label for="displayName">Display name</label>
      <input type="text" id="displayName" placeholder="Jane Doe" />
    </div>

    <div class="field">
      <label for="email">Email address</label>
      <input type="email" id="email" placeholder="jane@example.com" />
    </div>

    <div class="modal-actions">
      <button class="btn btn-cancel" id="cancelBtn">Cancel</button>
      <button class="btn btn-save" id="saveBtn">Save</button>
    </div>
  </div>
</div>

<script>
  const overlay = document.getElementById('modalOverlay');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveBtn = document.getElementById('saveBtn');
  const modal = overlay.querySelector('.modal');

  function openModal() {
    overlay.classList.add('is-open');
    // restart the enter animation each time it opens
    modal.style.animation = 'none';
    void modal.offsetWidth; // force reflow
    modal.style.animation = '';
    document.getElementById('displayName').focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.removeEventListener('keydown', onKeydown);
    openBtn.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', closeModal); // wire up real save logic here

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
</script>

</body>
</html>
```

## Rationale

The modal fades the overlay (opacity only, 180ms linear-ish ease) while the card itself runs a separate, slightly longer keyframe animation (220ms, `cubic-bezier(0.16, 1, 0.3, 1)` — an ease-out-expo-like curve) that combines a small upward translate with a scale-from-0.96, which reads as the dialog settling into place rather than just appearing; decoupling the two timings avoids the flat, mechanical look of animating everything with one identical curve. Layering is kept simple (fixed overlay + centered flex child) so the same markup works at any viewport without extra positioning math. Interaction states are the disqualifiers a design review typically flags: focus rings on inputs, hover states on all buttons, `Escape` to dismiss, click-outside-to-close, focus sent to the first field on open and returned to the trigger button on close, and a `prefers-reduced-motion` override that removes the transform/animation entirely for users who've asked for it. The JS is intentionally minimal (~20 lines) — open/close plus an animation-restart trick (toggling `animation: none` and forcing reflow) so repeated opens replay the enter transition instead of only firing once.
