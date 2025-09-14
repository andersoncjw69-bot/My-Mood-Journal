const moodButtons = document.querySelectorAll('.mood');
const note = document.getElementById('note');
const saveBtn = document.getElementById('save');
const entriesList = document.getElementById('entries');
const quoteBlock = document.getElementById('quote');
const themeToggle = document.getElementById('theme-toggle');
let selectedMood = '';

const quotes = [
    "Every day may not be good, but there's something good in every day.",
    "You are stronger than you think.",
    "Progress, not perfection.",
    "Feelings are just visitors, let them come and go.",
    "Small steps every day.",
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it."
];

function showRandomQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteBlock.textContent = quotes[random];
}

moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.dataset.mood;
    });
});

saveBtn.addEventListener('click', () => {
    const text = note.value.trim();
    if (!selectedMood || !text) {
        alert('Please select a mood and enter your notes.');
        return;
    }
    const entry = {
        mood: selectedMood,
        text,
        date: new Date().toLocaleString()
    };
    addEntry(entry);
    saveEntry(entry);
    note.value = '';
    moodButtons.forEach(b => b.classList.remove('selected'));
    selectedMood = '';
});

function addEntry(entry) {
    const li = document.createElement('li');
    li.textContent = `${entry.date} - ${entry.mood} - ${entry.text}`;
    entriesList.prepend(li);
}

function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    entriesList.innerHTML = '';
    entries.forEach(addEntry);
}

showRandomQuote();
loadEntries();

function setTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    // Update all themed elements
    document.querySelectorAll('header, footer, main, .mood, .mood.selected, #note, #save, #entries li, blockquote').forEach(el => {
        el.classList.remove('light', 'dark');
        el.classList.add(theme);
    });
    // Save preference
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}
// Load theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});