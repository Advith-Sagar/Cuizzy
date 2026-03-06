// ==================== GAME LOGIC ====================
function startGame(setId, mode, isCustom = false) {
    gameMode = mode;

    if (isCustom) {
        const set = customSets.find(s => s.id === setId);
        if (set) {
            currentQuestions = shuffleArray([...set.questions]);
            set.plays = (set.plays || 0) + 1;
        }
    } else {
        currentQuestions = shuffleArray([...builtInSets[setId].questions]);
    }

    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    correctCount = 0;

    const container = document.getElementById('gameContainer');
    container.className = 'game-container active ' + mode;
    document.body.style.overflow = 'hidden';

    updateGameUI();
    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = `What is "${question.q}" in French?`;
    document.getElementById('progressFill').style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;

    const answers = shuffleArray([question.a, ...question.wrong]);
    const grid = document.getElementById('answersGrid');
    grid.innerHTML = answers.map(ans => `
        <button class="answer-btn" onclick="checkAnswer(this, '${escapeHtml(ans)}', '${escapeHtml(question.a)}')">
            <span class="answer-color"></span>${ans}
        </button>
    `).join('');
}

function checkAnswer(btn, selected, correct) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(b => b.classList.add('disabled'));

    if (selected === correct) {
        btn.classList.add('correct');
        streak++;
        correctCount++;
        const points = 100 + (streak * 25);
        score += points;

        if (streak >= 3 && streak % 3 === 0) {
            showStreakPopup(streak);
        }

        showToast(`+${points} points! 🎉`);
    } else {
        btn.classList.add('incorrect');
        streak = 0;
        buttons.forEach(b => {
            if (b.textContent.trim() === correct) {
                b.classList.add('show-correct');
            }
        });
        showToast(`Correct answer: ${correct}`);
    }

    updateGameUI();

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function updateGameUI() {
    document.getElementById('scoreDisplay').textContent = score;
    document.getElementById('streakDisplay').textContent = streak;
    document.getElementById('correctDisplay').textContent = `${correctCount}/${currentQuestions.length}`;
}

function showStreakPopup(streakNum) {
    const popup = document.getElementById('streakPopup');
    popup.textContent = `🔥 ${streakNum} Streak!`;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1500);
}

function endGame() {
    document.getElementById('gameContainer').classList.remove('active');
    document.getElementById('progressFill').style.width = '100%';

    // Update user stats
    if (userStore.currentUser) {
        userStore.currentUser.points += score;
        userStore.currentUser.gamesPlayed++;
        document.getElementById('userPointsNav').textContent = userStore.currentUser.points;
    }

    const percentage = (correctCount / currentQuestions.length) * 100;
    let icon = '🏆';
    let title = 'Fantastique!';

    if (percentage < 50) { icon = '📚'; title = 'Keep Practicing!'; }
    else if (percentage < 70) { icon = '👍'; title = 'Bon Travail!'; }
    else if (percentage < 90) { icon = '🌟'; title = 'Très Bien!'; }

    document.getElementById('gameOverIcon').textContent = icon;
    document.querySelector('.game-over-title').textContent = title;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverDetail').textContent = `You got ${correctCount}/${currentQuestions.length} correct!`;

    document.getElementById('gameOver').classList.add('active');
}

function exitGame() {
    document.getElementById('gameContainer').classList.remove('active');
    document.body.style.overflow = '';
}

function playAgain() {
    document.getElementById('gameOver').classList.remove('active');
    const isCustom = currentSet && currentSet.startsWith('custom_');
    startGame(currentSet || 'greetings', gameMode, isCustom);
}
