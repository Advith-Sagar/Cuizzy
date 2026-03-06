// ==================== INITIALIZATION ====================
function initializeApp() {
    // Initialize dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        document.documentElement.classList.toggle('dark', event.matches);
    });

    // Initialize components
    renderQuestionSets();
    renderSoloModal();
    updateAuthUI();
    initializeModalListeners();
    initializeJoinGameInput();
}

// Call init when document is ready
document.addEventListener('DOMContentLoaded', initializeApp);
