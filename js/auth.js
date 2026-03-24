// ===== Marencello Auth Module =====
// Handles sign-in modal, social logins, and nav state

(function() {
  'use strict';

  // ===== Inject Auth Modal HTML =====
  function injectAuthModal() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
      <div class="auth-modal-backdrop"></div>
      <div class="auth-modal-container">
        <button class="auth-modal-close" aria-label="Close">&times;</button>

        <div class="auth-modal-header">
          <div class="auth-modal-logo">Marencello</div>
          <p class="auth-modal-subtitle">Sign in to save trips, manage bookings, and get personalized recommendations.</p>
        </div>

        <div class="auth-modal-body">
          <!-- Social Login Buttons -->
          <div class="auth-social-buttons">
            <button class="auth-social-btn auth-google" id="auth-google-btn">
              <svg class="auth-social-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button class="auth-social-btn auth-apple" id="auth-apple-btn">
              <svg class="auth-social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>

            <button class="auth-social-btn auth-facebook" id="auth-facebook-btn">
              <svg class="auth-social-icon" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div class="auth-divider">
            <span>or</span>
          </div>

          <!-- Email/Password Form -->
          <form class="auth-email-form" id="auth-email-form">
            <div class="auth-input-group">
              <input type="email" id="auth-email" class="auth-input" placeholder="Email address" required>
            </div>
            <div class="auth-input-group">
              <input type="password" id="auth-password" class="auth-input" placeholder="Password" required>
            </div>
            <button type="submit" class="auth-submit-btn">Sign In</button>
          </form>

          <div class="auth-toggle">
            <span id="auth-toggle-text">Don't have an account?</span>
            <button id="auth-toggle-btn" class="auth-toggle-link">Create one</button>
          </div>

          <p class="auth-legal">By continuing, you agree to Marencello's Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ===== Inject User Dropdown =====
  function injectUserDropdown() {
    const dropdown = document.createElement('div');
    dropdown.id = 'user-dropdown';
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
      <a href="#" class="user-dropdown-item">My Trips</a>
      <a href="#" class="user-dropdown-item">Saved Yachts</a>
      <a href="#" class="user-dropdown-item">Settings</a>
      <div class="user-dropdown-divider"></div>
      <button class="user-dropdown-item user-dropdown-signout" id="signout-btn">Sign Out</button>
    `;
    document.body.appendChild(dropdown);
  }

  // ===== Modal Controls =====
  let isSignUp = false;

  function openModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function toggleAuthMode() {
    isSignUp = !isSignUp;
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const submitBtn = document.querySelector('.auth-submit-btn');

    if (isSignUp) {
      toggleText.textContent = 'Already have an account?';
      toggleBtn.textContent = 'Sign in';
      submitBtn.textContent = 'Create Account';
    } else {
      toggleText.textContent = "Don't have an account?";
      toggleBtn.textContent = 'Create one';
      submitBtn.textContent = 'Sign In';
    }
  }

  // ===== Update Nav for Auth State =====
  function updateNavUI(user) {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    // Remove existing auth elements
    const existingAvatar = navRight.querySelector('.nav-user-avatar');
    const existingSignIn = navRight.querySelector('.nav-signin-btn');
    if (existingAvatar) existingAvatar.remove();
    if (existingSignIn) existingSignIn.remove();

    // Find the account icon and hide/replace it
    const accountIcon = navRight.querySelector('a[title="Account"]');

    if (user) {
      // Signed in — show avatar
      if (accountIcon) accountIcon.style.display = 'none';

      const avatarBtn = document.createElement('button');
      avatarBtn.className = 'nav-user-avatar';
      avatarBtn.title = user.displayName || user.email || 'Account';

      if (user.photoURL) {
        avatarBtn.innerHTML = `<img src="${user.photoURL}" alt="Profile" referrerpolicy="no-referrer">`;
      } else {
        const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
        avatarBtn.innerHTML = `<span class="nav-user-initial">${initial}</span>`;
      }

      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(avatarBtn);
      });

      const menuToggle = navRight.querySelector('.mobile-menu-toggle');
      navRight.insertBefore(avatarBtn, menuToggle);
    } else {
      // Signed out — show sign-in button
      if (accountIcon) {
        accountIcon.style.display = '';
        accountIcon.addEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      }
    }
  }

  // ===== User Dropdown Toggle =====
  function toggleDropdown(anchor) {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains('active');
    if (isOpen) {
      dropdown.classList.remove('active');
      return;
    }

    const rect = anchor.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + 8) + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    dropdown.classList.add('active');
  }

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.remove('active');
  });

  // ===== Firebase Auth Handlers =====
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => closeModal())
      .catch(handleAuthError);
  }

  function signInWithApple() {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    auth.signInWithPopup(provider)
      .then(() => closeModal())
      .catch(handleAuthError);
  }

  function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => closeModal())
      .catch(handleAuthError);
  }

  function handleEmailAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    const authFn = isSignUp
      ? auth.createUserWithEmailAndPassword(email, password)
      : auth.signInWithEmailAndPassword(email, password);

    authFn
      .then(() => closeModal())
      .catch(handleAuthError);
  }

  function signOut() {
    auth.signOut();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.remove('active');
  }

  function handleAuthError(error) {
    console.error('Auth error:', error.code, error.message);
    // Show a user-friendly message
    let message = 'Something went wrong. Please try again.';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Try signing in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Invalid email or password.';
        break;
      case 'auth/popup-closed-by-user':
        return; // User closed popup, no error needed
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with this email using a different sign-in method.';
        break;
    }
    alert(message);
  }

  // ===== Initialize =====
  function init() {
    injectAuthModal();
    injectUserDropdown();

    // Modal event listeners
    const backdrop = document.querySelector('.auth-modal-backdrop');
    const closeBtn = document.querySelector('.auth-modal-close');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const emailForm = document.getElementById('auth-email-form');

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (toggleBtn) toggleBtn.addEventListener('click', toggleAuthMode);
    if (emailForm) emailForm.addEventListener('submit', handleEmailAuth);

    // Social login buttons
    document.getElementById('auth-google-btn').addEventListener('click', signInWithGoogle);
    document.getElementById('auth-apple-btn').addEventListener('click', signInWithApple);
    document.getElementById('auth-facebook-btn').addEventListener('click', signInWithFacebook);

    // Sign out button
    document.getElementById('signout-btn').addEventListener('click', signOut);

    // Account icon opens modal (for signed-out state)
    const accountIcon = document.querySelector('a[title="Account"]');
    if (accountIcon) {
      accountIcon.addEventListener('click', (e) => {
        e.preventDefault();
        // Only open modal if user is not signed in
        if (!auth.currentUser) {
          openModal();
        }
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
      updateNavUI(user);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
