// ==================== QUESTION SETS RENDERING ====================
function renderQuestionSets() {
    const grid = document.getElementById('questionSetsGrid');
    grid.innerHTML = Object.entries(builtInSets).map(([id, set]) => `
        <div class="set-card" onclick="startSoloGame('${id}')">
            <div class="set-icon ${id}">${set.icon}</div>
            <div class="set-info">
                <h3>${set.name}</h3>
                <p>${set.questions[0].q} → ${set.questions[0].a}...</p>
                <div class="set-meta">
                    <span><i class="fas fa-question-circle"></i> ${set.questions.length} Qs</span>
                    <span><i class="fas fa-play"></i> ${set.plays}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSoloModal() {
    const grid = document.getElementById('soloSetGrid');
    let html = '';

    // Built-in sets
    Object.entries(builtInSets).forEach(([id, set]) => {
        html += `
            <div class="set-select-card" onclick="selectSoloSet(this, '${id}', false)">
                <div class="set-select-icon" style="background: linear-gradient(135deg, ${getCategoryColor(set.category)});">${set.icon}</div>
                <div class="set-select-info"><h4>${set.name}</h4><p>${set.questions.length} Questions</p></div>
            </div>
        `;
    });

    // Custom sets
    customSets.forEach(set => {
        html += `
            <div class="set-select-card" onclick="selectSoloSet(this, '${set.id}', true)">
                <div class="set-select-icon" style="background: linear-gradient(135deg, ${getCategoryColor(set.category)});">${set.icon}</div>
                <div class="set-select-info"><h4>${set.name}</h4><p>${set.questions.length} Questions (Custom)</p></div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

function renderMySets() {
    const grid = document.getElementById('mySetsGrid');
    const userSets = customSets.filter(s => s.authorId === (userStore.currentUser?.id || 0));

    if (userSets.length === 0) {
        grid.innerHTML = `
            <div class="my-sets-empty" style="grid-column: 1/-1;">
                <i class="fas fa-folder-open"></i>
                <h3>No sets yet</h3>
                <p>Create your first question set to see it here!</p>
                <button class="btn-primary btn-pink" onclick="openCreateSetModal()" style="width: auto; margin-top: 10px;">
                    <i class="fas fa-plus"></i> Create Set
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = userSets.map(set => `
        <div class="set-card" onclick="startSoloGame('${set.id}', true)">
            <div class="set-icon" style="background: linear-gradient(135deg, ${getCategoryColor(set.category)});">${set.icon}</div>
            <div class="set-info">
                <h3>${set.name}</h3>
                <p>${set.questions.length} questions</p>
                <div class="set-meta">
                    <span><i class="fas fa-play"></i> ${set.plays || 0}</span>
                    <span><i class="fas fa-user"></i> My Set</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== CREATE SET ====================
function openCreateSetModal() {
    if (!userStore.currentUser) {
        showToast('Please log in to create sets');
        openAuthModal('signup');
        return;
    }
    resetCreateSetForm();
    openModal('createSetModal');
}

function resetCreateSetForm() {
    newSetQuestions = [];
    selectedSetEmoji = '📚';
    document.getElementById('setName').value = '';
    document.getElementById('setCategory').value = 'greetings';
    document.getElementById('newQuestionText').value = '';
    document.getElementById('newCorrectAnswer').value = '';
    document.getElementById('wrongAnswer1').value = '';
    document.getElementById('wrongAnswer2').value = '';
    document.getElementById('wrongAnswer3').value = '';
    document.querySelectorAll('.emoji-option').forEach(e => e.classList.remove('selected'));
    document.querySelector('.emoji-option').classList.add('selected');
    updateQuestionsListUI();
}

function selectEmoji(btn, emoji) {
    document.querySelectorAll('.emoji-option').forEach(e => e.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSetEmoji = emoji;
}

function addQuestionToSet() {
    const questionText = document.getElementById('newQuestionText').value.trim();
    const correctAnswer = document.getElementById('newCorrectAnswer').value.trim();
    const wrong1 = document.getElementById('wrongAnswer1').value.trim();
    const wrong2 = document.getElementById('wrongAnswer2').value.trim();
    const wrong3 = document.getElementById('wrongAnswer3').value.trim();

    if (!questionText || !correctAnswer || !wrong1 || !wrong2 || !wrong3) {
        showToast('Please fill in all fields');
        return;
    }

    if (newSetQuestions.length >= 20) {
        showToast('Maximum 20 questions per set');
        return;
    }

    newSetQuestions.push({
        q: questionText,
        a: correctAnswer,
        wrong: [wrong1, wrong2, wrong3]
    });

    // Clear inputs
    document.getElementById('newQuestionText').value = '';
    document.getElementById('newCorrectAnswer').value = '';
    document.getElementById('wrongAnswer1').value = '';
    document.getElementById('wrongAnswer2').value = '';
    document.getElementById('wrongAnswer3').value = '';

    updateQuestionsListUI();
    showToast('Question added!');
}

function removeQuestion(index) {
    newSetQuestions.splice(index, 1);
    updateQuestionsListUI();
}

function updateQuestionsListUI() {
    const list = document.getElementById('questionsList');
    const count = document.getElementById('questionCount');
    const saveBtn = document.getElementById('saveSetBtn');

    count.textContent = newSetQuestions.length;
    saveBtn.disabled = newSetQuestions.length < 4;

    if (newSetQuestions.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="padding: 30px;">
                <i class="fas fa-clipboard-list"></i>
                <p style="margin-bottom: 0;">No questions added yet. Add your first question below!</p>
            </div>
        `;
        return;
    }

    list.innerHTML = newSetQuestions.map((q, i) => `
        <div class="question-item">
            <div class="question-item-header">
                <span class="question-item-number">Q${i + 1}</span>
                <button class="question-item-delete" onclick="removeQuestion(${i})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="question-item-content">
                <strong>${q.q}</strong> → ${q.a}
            </div>
        </div>
    `).join('');
}

function saveQuestionSet() {
    const name = document.getElementById('setName').value.trim();
    const category = document.getElementById('setCategory').value;

    if (!name) {
        showToast('Please enter a set name');
        return;
    }

    if (newSetQuestions.length < 4) {
        showToast('Add at least 4 questions');
        return;
    }

    const newSet = {
        id: 'custom_' + Date.now(),
        name,
        icon: selectedSetEmoji,
        category,
        author: userStore.currentUser.username,
        authorId: userStore.currentUser.id,
        plays: 0,
        questions: [...newSetQuestions],
        createdAt: new Date().toISOString()
    };

    customSets.push(newSet);
    userStore.currentUser.setsCreated++;

    closeModal('createSetModal');
    renderMySets();
    renderSoloModal();
    showToast('Set created successfully! 🎉');
}

let selectedSoloSetIsCustom = false;

function selectSoloSet(card, setId, isCustom) {
    document.querySelectorAll('#soloSetGrid .set-select-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    currentSet = setId;
    selectedSoloSetIsCustom = isCustom;
    document.getElementById('startSoloBtn').disabled = false;
}

function startSoloFromModal() {
    if (!currentSet) {
        showToast('Please select a topic first');
        return;
    }
    closeModal('soloModal');
    startGame(currentSet, 'gold-quest', selectedSoloSetIsCustom);
}

function startSoloGame(setId, isCustom = false) {
    currentSet = setId;
    startGame(setId, 'gold-quest', isCustom);
}

// ==================== JOIN && SOLO ====================
function openJoinModal() {
    openModal('joinModal');
    document.getElementById('gameIdInput').focus();
}

function openSoloModal() {
    renderSoloModal();
    openModal('soloModal');
}

function initializeJoinGameInput() {
    document.getElementById('gameIdInput').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

function submitGameId() {
    const gameId = document.getElementById('gameIdInput').value;
    if (gameId.length === 6) {
        showToast('Joining game ' + gameId + '...');
        closeModal('joinModal');
        document.getElementById('gameIdInput').value = '';
    } else {
        showToast('Please enter a valid 6-digit Game ID');
    }
}
