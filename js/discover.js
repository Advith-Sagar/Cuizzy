// ==================== DISCOVER PAGE ====================
function renderDiscoverSets() {
    const grid = document.getElementById('discoverGrid');
    const searchQuery = document.getElementById('discoverSearch').value.toLowerCase();

    // Combine built-in and custom sets
    let allSets = [];

    // Add built-in sets
    Object.entries(builtInSets).forEach(([id, set]) => {
        allSets.push({ id, ...set, isBuiltIn: true });
    });

    // Add custom sets
    customSets.forEach(set => {
        allSets.push({ ...set, isBuiltIn: false });
    });

    // Filter by category
    if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom') {
            allSets = allSets.filter(s => !s.isBuiltIn);
        } else {
            allSets = allSets.filter(s => s.category === selectedCategory);
        }
    }

    // Filter by search
    if (searchQuery) {
        allSets = allSets.filter(s =>
            s.name.toLowerCase().includes(searchQuery) ||
            s.category.toLowerCase().includes(searchQuery)
        );
    }

    if (allSets.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search"></i>
                <h3>No sets found</h3>
                <p>Try a different search or category</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = allSets.map(set => `
        <div class="discover-card" onclick="playDiscoverSet('${set.id}', ${!set.isBuiltIn})">
            <div class="discover-card-header">
                <div class="discover-card-icon" style="background: linear-gradient(135deg, ${getCategoryColor(set.category)});">
                    ${set.icon}
                </div>
                <div class="discover-card-info">
                    <h3>${set.name}</h3>
                    <div class="author">by ${set.author || 'Anonymous'}</div>
                    <div class="description">${set.questions.length} questions • ${set.category}</div>
                </div>
            </div>
            <div class="discover-card-footer">
                <div class="discover-card-stats">
                    <span><i class="fas fa-play"></i> ${set.plays || 0}</span>
                    <span><i class="fas fa-question-circle"></i> ${set.questions.length}</span>
                </div>
                ${set.isBuiltIn ? '<span class="discover-card-badge popular">Official</span>' : '<span class="discover-card-badge user">Community</span>'}
            </div>
        </div>
    `).join('');
}

function filterByCategory(btn, category) {
    selectedCategory = category;
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderDiscoverSets();
}

function filterDiscoverSets() {
    renderDiscoverSets();
}

function playDiscoverSet(setId, isCustom) {
    if (isCustom) {
        const set = customSets.find(s => s.id === setId);
        if (set) {
            currentQuestions = [...set.questions];
            currentSet = setId;
        }
    } else {
        currentQuestions = [...builtInSets[setId].questions];
        currentSet = setId;
    }
    goHome();
    startGame(setId, 'gold-quest', isCustom);
}
