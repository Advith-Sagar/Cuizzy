// ==================== DATA STORE ====================
// User data (simulating database)
const userStore = {
    users: [],
    currentUser: null
};

// French Question Sets (built-in)
const builtInSets = {
    greetings: {
        name: 'Greetings & Phrases',
        icon: '👋',
        category: 'greetings',
        author: 'Cuizzy',
        plays: 1250,
        questions: [
            { q: "Hello", a: "Bonjour", wrong: ["Merci", "Au revoir", "Oui"] },
            { q: "Goodbye", a: "Au revoir", wrong: ["Bonjour", "Merci", "S'il vous plaît"] },
            { q: "Thank you", a: "Merci", wrong: ["S'il vous plaît", "Pardon", "Bonjour"] },
            { q: "Please", a: "S'il vous plaît", wrong: ["Merci", "Pardon", "De rien"] },
            { q: "Yes", a: "Oui", wrong: ["Non", "Peut-être", "Merci"] },
            { q: "No", a: "Non", wrong: ["Oui", "Peut-être", "Pardon"] },
            { q: "Excuse me", a: "Excusez-moi", wrong: ["Pardon", "Merci", "Bonjour"] },
            { q: "Good night", a: "Bonne nuit", wrong: ["Bon matin", "Bonsoir", "Bonjour"] },
            { q: "Good evening", a: "Bonsoir", wrong: ["Bonjour", "Bonne nuit", "Bon après-midi"] },
            { q: "How are you?", a: "Comment allez-vous?", wrong: ["Où êtes-vous?", "Qui êtes-vous?", "Que faites-vous?"] }
        ]
    },
    numbers: {
        name: 'Numbers 1-20',
        icon: '🔢',
        category: 'numbers',
        author: 'Cuizzy',
        plays: 980,
        questions: [
            { q: "One", a: "Un", wrong: ["Deux", "Trois", "Quatre"] },
            { q: "Two", a: "Deux", wrong: ["Un", "Trois", "Cinq"] },
            { q: "Three", a: "Trois", wrong: ["Deux", "Quatre", "Cinq"] },
            { q: "Five", a: "Cinq", wrong: ["Quatre", "Six", "Sept"] },
            { q: "Ten", a: "Dix", wrong: ["Neuf", "Onze", "Douze"] },
            { q: "Twelve", a: "Douze", wrong: ["Onze", "Treize", "Quatorze"] },
            { q: "Fifteen", a: "Quinze", wrong: ["Quatorze", "Seize", "Dix-sept"] },
            { q: "Seventeen", a: "Dix-sept", wrong: ["Seize", "Dix-huit", "Quinze"] },
            { q: "Twenty", a: "Vingt", wrong: ["Dix-neuf", "Dix-huit", "Trente"] },
            { q: "Zero", a: "Zéro", wrong: ["Un", "Dix", "Cent"] }
        ]
    },
    colors: {
        name: 'Colors',
        icon: '🎨',
        category: 'colors',
        author: 'Cuizzy',
        plays: 1100,
        questions: [
            { q: "Red", a: "Rouge", wrong: ["Bleu", "Vert", "Jaune"] },
            { q: "Blue", a: "Bleu", wrong: ["Rouge", "Vert", "Violet"] },
            { q: "Green", a: "Vert", wrong: ["Bleu", "Jaune", "Rouge"] },
            { q: "Yellow", a: "Jaune", wrong: ["Orange", "Vert", "Rouge"] },
            { q: "Black", a: "Noir", wrong: ["Blanc", "Gris", "Marron"] },
            { q: "White", a: "Blanc", wrong: ["Noir", "Gris", "Beige"] },
            { q: "Orange", a: "Orange", wrong: ["Jaune", "Rouge", "Marron"] },
            { q: "Pink", a: "Rose", wrong: ["Rouge", "Violet", "Blanc"] },
            { q: "Purple", a: "Violet", wrong: ["Bleu", "Rose", "Rouge"] },
            { q: "Brown", a: "Marron", wrong: ["Orange", "Noir", "Gris"] }
        ]
    },
    animals: {
        name: 'Animals',
        icon: '🐾',
        category: 'animals',
        author: 'Cuizzy',
        plays: 890,
        questions: [
            { q: "Cat", a: "Chat", wrong: ["Chien", "Oiseau", "Souris"] },
            { q: "Dog", a: "Chien", wrong: ["Chat", "Loup", "Renard"] },
            { q: "Bird", a: "Oiseau", wrong: ["Poisson", "Papillon", "Abeille"] },
            { q: "Fish", a: "Poisson", wrong: ["Oiseau", "Tortue", "Crabe"] },
            { q: "Horse", a: "Cheval", wrong: ["Vache", "Mouton", "Cochon"] },
            { q: "Cow", a: "Vache", wrong: ["Cheval", "Taureau", "Mouton"] },
            { q: "Rabbit", a: "Lapin", wrong: ["Souris", "Écureuil", "Hamster"] },
            { q: "Lion", a: "Lion", wrong: ["Tigre", "Léopard", "Guépard"] },
            { q: "Elephant", a: "Éléphant", wrong: ["Girafe", "Hippopotame", "Rhinocéros"] },
            { q: "Butterfly", a: "Papillon", wrong: ["Abeille", "Mouche", "Coccinelle"] }
        ]
    },
    food: {
        name: 'Food & Drinks',
        icon: '🍽️',
        category: 'food',
        author: 'Cuizzy',
        plays: 760,
        questions: [
            { q: "Bread", a: "Pain", wrong: ["Fromage", "Beurre", "Lait"] },
            { q: "Cheese", a: "Fromage", wrong: ["Pain", "Beurre", "Jambon"] },
            { q: "Water", a: "Eau", wrong: ["Lait", "Jus", "Vin"] },
            { q: "Milk", a: "Lait", wrong: ["Eau", "Café", "Thé"] },
            { q: "Apple", a: "Pomme", wrong: ["Orange", "Banane", "Poire"] },
            { q: "Coffee", a: "Café", wrong: ["Thé", "Chocolat", "Lait"] },
            { q: "Wine", a: "Vin", wrong: ["Bière", "Eau", "Jus"] },
            { q: "Croissant", a: "Croissant", wrong: ["Baguette", "Pain", "Brioche"] },
            { q: "Egg", a: "Œuf", wrong: ["Fromage", "Beurre", "Lait"] },
            { q: "Chicken", a: "Poulet", wrong: ["Bœuf", "Porc", "Poisson"] }
        ]
    },
    family: {
        name: 'Family Members',
        icon: '👨‍👩‍👧‍👦',
        category: 'family',
        author: 'Cuizzy',
        plays: 650,
        questions: [
            { q: "Mother", a: "Mère", wrong: ["Père", "Sœur", "Tante"] },
            { q: "Father", a: "Père", wrong: ["Mère", "Frère", "Oncle"] },
            { q: "Brother", a: "Frère", wrong: ["Sœur", "Père", "Cousin"] },
            { q: "Sister", a: "Sœur", wrong: ["Frère", "Mère", "Cousine"] },
            { q: "Grandmother", a: "Grand-mère", wrong: ["Grand-père", "Mère", "Tante"] },
            { q: "Grandfather", a: "Grand-père", wrong: ["Grand-mère", "Père", "Oncle"] },
            { q: "Aunt", a: "Tante", wrong: ["Oncle", "Mère", "Cousine"] },
            { q: "Uncle", a: "Oncle", wrong: ["Tante", "Père", "Cousin"] },
            { q: "Son", a: "Fils", wrong: ["Fille", "Frère", "Neveu"] },
            { q: "Daughter", a: "Fille", wrong: ["Fils", "Sœur", "Nièce"] }
        ]
    }
};

// User-created sets
let customSets = [];
let newSetQuestions = [];
let selectedSetEmoji = '📚';

// Game state
let currentSet = null;
let currentSetName = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let correctCount = 0;
let gameMode = 'gold-quest';
let selectedCategory = 'all';
