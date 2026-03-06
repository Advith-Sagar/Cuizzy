// ==================== NAVIGATION ====================
function goHome() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('discoverPage').classList.remove('active');
    document.getElementById('mainFooter').style.display = 'block';
    document.getElementById('gameOver').classList.remove('active');
    document.getElementById('gameContainer').classList.remove('active');
    document.body.style.overflow = '';
}

function showDiscover() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('discoverPage').classList.add('active');
    document.getElementById('mainFooter').style.display = 'none';
    renderDiscoverSets();
}
