# Mobile-First Login Form

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign in</title>
<style>
  :root {
    --color-bg: #f7f7f8;
    --color-surface: #ffffff;
    --color-text: #1a1a1e;
    --color-text-muted: #6b6b74;
    --color-border: #d9d9e0;
    --color-border-focus: #4f46e5;
    --color-primary: #4f46e5;
    --color-primary-hover: #4338ca;
    --color-primary-active: #3730a3;
    --color-error: #d92d20;
    --color-error-bg: #fef3f2;
    --radius: 10px;
    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #101014;
      --color-surface: #1a1a20;
      --color-text: #f2f2f5;
      --color-text-muted: #9a9aa5;
      --color-border: #2e2e37;
      --color-border-focus: #818cf8;
      --color-primary: #6366f1;
      --color-primary-hover: #7476f2;
      --color-primary-active: #5254d6;
      --color-error: #f87171;
      --color-error-bg: #3a1a1a;
    }
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    font-family: var(--font);
    color: var(--color-text);
    padding: 24px 16px;
  }

  .card {
    width: 100%;
    max-width: 400px;
    background: var(--color-surface);
    border-radius: 16px;
    padding: 32px 24px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
  }

  @media (min-width: 480px) {
    .card { padding: 40px 32px; }
  }

  .card__header {
    margin-bottom: 28px;
    text-align: left;
  }

  .card__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }

  .card__subtitle {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--color-text-muted);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    font-size: 16px; /* prevents iOS zoom-on-focus */
    font-family: inherit;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    min-height: 46px;
  }

  input::placeholder {
    color: var(--color-text-muted);
    opacity: 0.8;
  }

  input:focus-visible {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-border-focus) 20%, transparent);
  }

  input[aria-invalid="true"] {
    border-color: var(--color-error);
  }

  input[aria-invalid="true"]:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 18%, transparent);
  }

  .toggle-visibility {
    position: absolute;
    right: 6px;
    background: none;
    border: none;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    cursor: pointer;
    border-radius: 6px;
  }

  .toggle-visibility:hover { color: var(--color-text); }

  .toggle-visibility:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  .toggle-visibility svg { width: 20px; height: 20px; }

  .error-text {
    font-size: 0.8125rem;
    color: var(--color-error);
    min-height: 1em;
    display: none;
  }

  .error-text.visible { display: block; }

  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -4px;
  }

  .checkbox-field {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .checkbox-field input {
    width: 18px;
    height: 18px;
    accent-color: var(--color-primary);
    margin: 0;
  }

  .link {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }

  .link:hover { text-decoration: underline; }

  .submit-btn {
    margin-top: 6px;
    width: 100%;
    min-height: 48px;
    background: var(--color-primary);
    color: #fff;
    font-size: 0.9375rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.05s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-btn:hover { background: var(--color-primary-hover); }
  .submit-btn:active { background: var(--color-primary-active); transform: scale(0.99); }

  .submit-btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: none;
  }

  .submit-btn.loading .spinner { display: inline-block; }
  .submit-btn.loading .btn-label { display: none; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .footer-text {
    margin: 20px 0 0;
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  @media (prefers-reduced-motion: reduce) {
    .submit-btn, input, .spinner {
      transition: none;
      animation-duration: 0.001ms !important;
    }
  }
</style>
</head>
<body>

  <main class="card">
    <div class="card__header">
      <h1 class="card__title">Welcome back</h1>
      <p class="card__subtitle">Sign in to continue to your account.</p>
    </div>

    <form id="login-form" novalidate>
      <div class="field">
        <label for="email">Email</label>
        <div class="input-wrap">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autocomplete="email"
            inputmode="email"
            required
            aria-describedby="email-error"
          />
        </div>
        <span class="error-text" id="email-error" role="alert">Enter a valid email address.</span>
      </div>

      <div class="field">
        <label for="password">Password</label>
        <div class="input-wrap">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            required
            minlength="8"
            aria-describedby="password-error"
          />
          <button type="button" class="toggle-visibility" id="toggle-password" aria-label="Show password" aria-pressed="false">
            <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <span class="error-text" id="password-error" role="alert">Password must be at least 8 characters.</span>
      </div>

      <div class="row-between">
        <label class="checkbox-field">
          <input type="checkbox" id="remember" name="remember" />
          Remember me
        </label>
        <a href="#" class="link">Forgot password?</a>
      </div>

      <button type="submit" class="submit-btn" id="submit-btn">
        <span class="btn-label">Sign in</span>
        <span class="spinner" aria-hidden="true"></span>
      </button>
    </form>

    <p class="footer-text">Don't have an account? <a href="#" class="link">Sign up</a></p>
  </main>

<script>
  (function () {
    const form = document.getElementById('login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-password');

    const eyeOpen = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>';
    const eyeClosed = '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.62 21.62 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';

    toggleBtn.addEventListener('click', function () {
      const isPassword = password.type === 'password';
      password.type = isPassword ? 'text' : 'password';
      toggleBtn.setAttribute('aria-pressed', String(isPassword));
      toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      document.getElementById('eye-icon').innerHTML = isPassword ? eyeClosed : eyeOpen;
    });

    function validateEmail() {
      const valid = email.validity.valid;
      email.setAttribute('aria-invalid', String(!valid));
      emailError.classList.toggle('visible', !valid);
      return valid;
    }

    function validatePassword() {
      const valid = password.value.length >= 8;
      password.setAttribute('aria-invalid', String(!valid));
      passwordError.classList.toggle('visible', !valid);
      return valid;
    }

    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailValid = validateEmail();
      const passwordValid = validatePassword();
      if (!emailValid || !passwordValid) {
        (emailValid ? password : email).focus();
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulated submit — replace with real auth call
      setTimeout(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }, 1200);
    });
  })();
</script>

</body>
</html>
```

## Rationale

The layout is mobile-first by default rather than adapted for it: a single-column card centered in the viewport with generous 44–48px tap targets, 16px input font size to prevent iOS auto-zoom on focus, and padding/spacing that only grows at a `min-width: 480px` breakpoint rather than shrinking down from a desktop layout. Inputs use semantic `type="email"`/`type="password"` with matching `autocomplete` and `inputmode` values so mobile keyboards and password managers behave correctly, and validation is deferred to `blur`/`submit` (not `input`) so users aren't scolded mid-keystroke. The password field's show/hide toggle and the submit button's loading state address two of the most common real-world login frustrations — mistyped passwords and uncertainty about whether a tap registered — while `prefers-color-scheme` and `prefers-reduced-motion` support keep it comfortable across device and accessibility settings without adding a framework dependency.
