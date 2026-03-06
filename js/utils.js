// ==================== UTILITY FUNCTIONS ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/'/g, "\\'");
}

function getCategoryColor(category) {
    const colors = {
        greetings: '#2196f3, #1976d2',
        numbers: '#4caf50, #388e3c',
        colors: '#ff9800, #f57c00',
        animals: '#e91e63, #c2185b',
        food: '#00bcd4, #0097a7',
        family: '#9c27b0, #7b1fa2',
        custom: '#607d8b, #455a64'
    };
    return colors[category] || colors.custom;
}
