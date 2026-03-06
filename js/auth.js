// ==================== AUTHENTICATION ====================
function openAuthModal(tab) {
    openModal('authModal');
    switchAuthTab(tab);
}

function switchAuthTab(tab) {
    document.getElementById('loginTab').classList.toggle('active', tab === 'login');
    document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
    document.getElementById('loginContent').classList.toggle('active', tab === 'login');
    document.getElementById('signupContent').classList.toggle('active', tab === 'signup');
}

function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('passwordStrength');

    strengthBar.className = 'password-strength-fill';
    if (password.length === 0) {
        strengthBar.style.width = '0';
    } else if (password.length < 6) {
        strengthBar.classList.add('weak');
    } else if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

function validateSignupForm() {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirmPassword').value;

    const isValid = username.length >= 3 &&
                   email.includes('@') &&
                   password.length >= 6 &&
                   password === confirm;

    document.getElementById('signupBtn').disabled = !isValid;
}

function handleSignup() {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    // Check if user exists
    const existingUser = userStore.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
        showToast('Username or email already exists!');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        points: 0,
        gamesPlayed: 0,
        setsCreated: 0,
        createdAt: new Date().toISOString()
    };

    userStore.users.push(newUser);
    userStore.currentUser = newUser;

    closeModal('authModal');
    updateAuthUI();
    showToast(`Welcome to Cuizzy, ${username}! 🎉`);

    // Clear form
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';
}

function handleLogin() {
    const emailOrUsername = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = userStore.users.find(u =>
        (u.email === emailOrUsername || u.username === emailOrUsername) &&
        u.password === password
    );

    if (user) {
        userStore.currentUser = user;
        closeModal('authModal');
        updateAuthUI();
        showToast(`Welcome back, ${user.username}! 🎉`);

        // Clear form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showToast('Invalid email/username or password');
    }
}

function handleLogout() {
    userStore.currentUser = null;
    closeModal('profileModal');
    updateAuthUI();
    showToast('Logged out successfully');
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const mySetsSection = document.getElementById('mySetsSection');

    if (userStore.currentUser) {
        authButtons.style.display = 'none';
        userProfileBtn.style.display = 'flex';
        mySetsSection.style.display = 'block';

        const initial = userStore.currentUser.username.charAt(0).toUpperCase();
        document.getElementById('userAvatarNav').textContent = initial;
        document.getElementById('userNameNav').textContent = userStore.currentUser.username;
        document.getElementById('userPointsNav').textContent = userStore.currentUser.points;

        renderMySets();
    } else {
        authButtons.style.display = 'block';
        userProfileBtn.style.display = 'none';
        mySetsSection.style.display = 'none';
    }
}

function openProfileModal() {
    if (!userStore.currentUser) return;

    const user = userStore.currentUser;
    document.getElementById('profileAvatar').textContent = user.username.charAt(0).toUpperCase();
    document.getElementById('profileName').textContent = user.username;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profilePoints').textContent = user.points;
    document.getElementById('profileGames').textContent = user.gamesPlayed;
    document.getElementById('profileSets').textContent = user.setsCreated;

    openModal('profileModal');
}
