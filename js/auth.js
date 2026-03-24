// ===== Marencello Auth Module (Stitch/Tailwind) =====
// Handles sign-in modal, social logins, and nav state

(function() {
  'use strict';

  // ===== Inject Auth Modal HTML (Tailwind classes matching Stitch design) =====
  function injectAuthModal() {
    var modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center opacity-0 invisible transition-all duration-300';
    modal.innerHTML = '\
      <div class="absolute inset-0 bg-sky-950/60 backdrop-blur-sm" id="auth-backdrop"></div>\
      <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 p-10 transform translate-y-5 scale-[0.97] transition-all duration-300 max-h-[90vh] overflow-y-auto" id="auth-container">\
        <button class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all text-2xl" id="auth-close">&times;</button>\
        <div class="text-center mb-8">\
          <div class="font-headline text-3xl font-bold text-primary tracking-tight mb-2">Marencello</div>\
          <p class="text-sm text-slate-500 leading-relaxed max-w-[300px] mx-auto">Sign in to save trips, manage bookings, and get personalized recommendations.</p>\
        </div>\
        <div class="flex flex-col gap-3">\
          <button class="flex items-center justify-center gap-3 w-full py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium text-[15px] transition-all cursor-pointer font-body" id="auth-google-btn">\
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>\
            Continue with Google\
          </button>\
          <button class="flex items-center justify-center gap-3 w-full py-3 px-4 border border-black rounded-xl bg-black hover:bg-gray-900 text-white font-medium text-[15px] transition-all cursor-pointer font-body" id="auth-apple-btn">\
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>\
            Continue with Apple\
          </button>\
          <button class="flex items-center justify-center gap-3 w-full py-3 px-4 border border-[#1877F2] rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium text-[15px] transition-all cursor-pointer font-body" id="auth-facebook-btn">\
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>\
            Continue with Facebook\
          </button>\
        </div>\
        <div class="flex items-center gap-4 my-6 text-slate-400 text-sm">\
          <div class="flex-1 h-px bg-slate-200"></div><span>or</span><div class="flex-1 h-px bg-slate-200"></div>\
        </div>\
        <form class="flex flex-col gap-3" id="auth-email-form">\
          <input type="email" id="auth-email" class="w-full py-3 px-4 border border-slate-200 rounded-xl text-[15px] text-slate-700 font-body placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors" placeholder="Email address" required>\
          <input type="password" id="auth-password" class="w-full py-3 px-4 border border-slate-200 rounded-xl text-[15px] text-slate-700 font-body placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors" placeholder="Password" required>\
          <button type="submit" class="w-full py-3 bg-primary hover:bg-primary-container text-white rounded-xl text-[15px] font-semibold font-body transition-colors cursor-pointer">Sign In</button>\
        </form>\
        <div class="text-center mt-6 text-sm text-slate-500">\
          <span id="auth-toggle-text">Don\'t have an account?</span>\
          <button id="auth-toggle-btn" class="text-primary font-semibold underline ml-1 bg-transparent border-none cursor-pointer font-body text-sm hover:text-primary-container">Create one</button>\
        </div>\
        <p class="text-center mt-4 text-xs text-slate-400 leading-relaxed">By continuing, you agree to Marencello\'s Terms of Service and Privacy Policy.</p>\
      </div>';
    document.body.appendChild(modal);
  }

  // ===== Inject User Dropdown =====
  function injectUserDropdown() {
    var dropdown = document.createElement('div');
    dropdown.id = 'user-dropdown';
    dropdown.className = 'fixed z-[10000] bg-white rounded-xl shadow-xl min-w-[200px] py-2 opacity-0 invisible -translate-y-2 transition-all duration-200';
    dropdown.innerHTML = '\
      <a href="#" class="block px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-body no-underline">My Trips</a>\
      <a href="#" class="block px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-body no-underline">Saved Yachts</a>\
      <a href="#" class="block px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-body no-underline">Settings</a>\
      <div class="h-px bg-slate-100 my-1"></div>\
      <button class="block w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-body bg-transparent border-none cursor-pointer" id="signout-btn">Sign Out</button>';
    document.body.appendChild(dropdown);
  }

  // ===== Modal Controls =====
  var isSignUp = false;

  function openModal() {
    var modal = document.getElementById('auth-modal');
    var container = document.getElementById('auth-container');
    if (modal) {
      modal.classList.remove('opacity-0', 'invisible');
      modal.classList.add('opacity-100', 'visible');
      container.classList.remove('translate-y-5', 'scale-[0.97]');
      container.classList.add('translate-y-0', 'scale-100');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    var modal = document.getElementById('auth-modal');
    var container = document.getElementById('auth-container');
    if (modal) {
      modal.classList.add('opacity-0', 'invisible');
      modal.classList.remove('opacity-100', 'visible');
      container.classList.add('translate-y-5', 'scale-[0.97]');
      container.classList.remove('translate-y-0', 'scale-100');
      document.body.style.overflow = '';
    }
  }

  function toggleAuthMode() {
    isSignUp = !isSignUp;
    var toggleText = document.getElementById('auth-toggle-text');
    var toggleBtn = document.getElementById('auth-toggle-btn');
    var submitBtn = document.querySelector('#auth-email-form button[type="submit"]');
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
    var signInBtn = findSignInButton();
    if (!signInBtn) return;

    var existingAvatar = document.getElementById('nav-user-avatar');
    if (existingAvatar) existingAvatar.remove();

    if (user) {
      signInBtn.style.display = 'none';
      var avatarBtn = document.createElement('button');
      avatarBtn.id = 'nav-user-avatar';
      avatarBtn.className = 'w-9 h-9 rounded-full overflow-hidden cursor-pointer border-2 border-white/50 hover:border-white bg-primary flex items-center justify-center transition-all p-0';
      avatarBtn.title = user.displayName || user.email || 'Account';
      if (user.photoURL) {
        avatarBtn.innerHTML = '<img src="' + user.photoURL + '" alt="Profile" class="w-full h-full object-cover" referrerpolicy="no-referrer">';
      } else {
        var initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
        avatarBtn.innerHTML = '<span class="text-white font-body text-sm font-bold">' + initial + '</span>';
      }
      avatarBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(avatarBtn);
      });
      signInBtn.parentNode.insertBefore(avatarBtn, signInBtn);
    } else {
      signInBtn.style.display = '';
    }
  }

  function findSignInButton() {
    var buttons = document.querySelectorAll('nav button');
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.trim() === 'Sign In') return buttons[i];
    }
    return null;
  }

  // ===== User Dropdown Toggle =====
  function toggleDropdown(anchor) {
    var dropdown = document.getElementById('user-dropdown');
    if (!dropdown) return;
    var isOpen = !dropdown.classList.contains('invisible');
    if (isOpen) {
      dropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
      dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
      return;
    }
    var rect = anchor.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + 8) + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    dropdown.classList.remove('opacity-0', 'invisible', '-translate-y-2');
    dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
  }

  document.addEventListener('click', function() {
    var dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
      dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
    }
  });

  // ===== Firebase Auth Handlers =====
  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function() { closeModal(); }).catch(handleAuthError);
  }

  function signInWithApple() {
    var provider = new firebase.auth.OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    auth.signInWithPopup(provider).then(function() { closeModal(); }).catch(handleAuthError);
  }

  function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(function() { closeModal(); }).catch(handleAuthError);
  }

  function handleEmailAuth(e) {
    e.preventDefault();
    var email = document.getElementById('auth-email').value;
    var password = document.getElementById('auth-password').value;
    var authFn = isSignUp
      ? auth.createUserWithEmailAndPassword(email, password)
      : auth.signInWithEmailAndPassword(email, password);
    authFn.then(function() { closeModal(); }).catch(handleAuthError);
  }

  function signOut() {
    auth.signOut();
    var dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.classList.add('opacity-0', 'invisible');
      dropdown.classList.remove('opacity-100', 'visible');
    }
  }

  function handleAuthError(error) {
    console.error('Auth error:', error.code, error.message);
    var message = 'Something went wrong. Please try again.';
    switch (error.code) {
      case 'auth/email-already-in-use': message = 'This email is already registered. Try signing in instead.'; break;
      case 'auth/invalid-email': message = 'Please enter a valid email address.'; break;
      case 'auth/weak-password': message = 'Password should be at least 6 characters.'; break;
      case 'auth/user-not-found':
      case 'auth/wrong-password': message = 'Invalid email or password.'; break;
      case 'auth/popup-closed-by-user': return;
      case 'auth/account-exists-with-different-credential': message = 'An account already exists with this email using a different sign-in method.'; break;
    }
    alert(message);
  }

  // ===== Initialize =====
  function init() {
    injectAuthModal();
    injectUserDropdown();

    document.getElementById('auth-backdrop').addEventListener('click', closeModal);
    document.getElementById('auth-close').addEventListener('click', closeModal);
    document.getElementById('auth-toggle-btn').addEventListener('click', toggleAuthMode);
    document.getElementById('auth-email-form').addEventListener('submit', handleEmailAuth);
    document.getElementById('auth-google-btn').addEventListener('click', signInWithGoogle);
    document.getElementById('auth-apple-btn').addEventListener('click', signInWithApple);
    document.getElementById('auth-facebook-btn').addEventListener('click', signInWithFacebook);
    document.getElementById('signout-btn').addEventListener('click', signOut);

    var signInBtn = findSignInButton();
    if (signInBtn) {
      signInBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!auth.currentUser) openModal();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });

    auth.onAuthStateChanged(function(user) {
      updateNavUI(user);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
