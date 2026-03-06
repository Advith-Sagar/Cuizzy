// ==================== MODAL FUNCTIONS ====================
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    // Reset form states
    if (id === 'soloModal') {
        document.querySelectorAll('#soloSetGrid .set-select-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('startSoloBtn').disabled = true;
        currentSet = null;
    }
    if (id === 'createSetModal') {
        resetCreateSetForm();
    }
}

function initializeModalListeners() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal.id);
        });
    });
}
