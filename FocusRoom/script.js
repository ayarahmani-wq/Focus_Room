// ===== CONTACT =====
function saveContact() {
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    let list = JSON.parse(localStorage.getItem("contacts")) || [];
    list.push({ email, message, date: new Date().toISOString() });
    localStorage.setItem("contacts", JSON.stringify(list));
    alert("Message envoyé !");
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
}

// ===== INSCRIPTION =====
function register(event) {
    event.preventDefault(); // empêche le rechargement

    const u = document.getElementById("regUser").value;
    const p = document.getElementById("regPass").value;
    const e = document.getElementById("regEmail").value;
    const d = document.getElementById("dateNais").value;

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);
    localStorage.setItem("email", e);
    localStorage.setItem("dateNais", d);

    alert("Inscription réussie !");
    window.location.href = "login.html";
}
function verif_mdp(mdp) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(mdp)) {
        document.getElementById("alert_mdp").textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
        
    } 
}
function verif_mail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        document.getElementById("alert_email").textContent = "Veuillez entrer une adresse e-mail valide.";
    } else {
        document.getElementById("alert_email").textContent = "";
    }
}
// ===== CONNEXION =====
function login(event) {
    event.preventDefault();

    const e = document.getElementById("regEmail").value;
    const p = document.getElementById("logPass").value;

    if (e === localStorage.getItem("email") &&
        p === localStorage.getItem("pass")) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", e);
        window.location.href = "app.html";
    } else {
        alert("Identifiants incorrects");
    }
}

// ===== VERIFICATION =====
function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}

// ===== DECONNEXION =====
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
// ===== TÂCHES =====
const taskInput = document.getElementById("taskInput");

// return the identifier for the currently logged user
function getCurrentUser() {
    return localStorage.getItem("currentUser") || localStorage.getItem("email") || 'default';
}


function saveTasks() {
    const tasks = [];
    const key = `tasks_${getCurrentUser()}`;

    document.querySelectorAll("#sideTaskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const done = li.querySelector("input").checked;

        tasks.push({ text, done });
    });

    localStorage.setItem(key, JSON.stringify(tasks));
}

function loadTasks() {
    const key = `tasks_${getCurrentUser()}`;
    const tasks = JSON.parse(localStorage.getItem(key)) || [];
    sideTaskList.innerHTML = "";

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

const sideTaskList = document.getElementById("sideTaskList");

function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "sideTaskList";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.done) {
        span.classList.add("task-done");
    }

    checkbox.addEventListener("change", () => {
        span.classList.toggle("task-done");
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    // ✅ AJOUTER DANS LE MENU GAUCHE
    sideTaskList.appendChild(li);
}
function addTask() {
    const value = taskInput.value.trim();

    if (value.length < 3) {
        alert("La tâche doit contenir au moins 3 caractères.");
        return;
    }

    const task = { text: value, done: false };
    createTaskElement(task);
    saveTasks();
    taskInput.value = "";
}
// ===== POMODORO =====
let time = 1500; // 25 min
let interval = null;
let timerRunStart = null; // legacy timestamp (kept for compatibility)
let timerStartRemaining = null; // remaining seconds when a run starts

const timer = document.getElementById("timer");
const workTime = document.getElementById("workTime");

function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timer.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function startTimer() {
    // Enter fullscreen mode for the timer
    const timerCard = document.querySelector(".card:nth-child(2)");
    if (!timerCard.classList.contains('fullscreen')) {
        timerCard.classList.add("fullscreen");
        document.body.classList.add('fullscreen-active');
    }

    if (interval) return;

    // mark run start for partial time accounting
    timerRunStart = Date.now();
    timerStartRemaining = time;

    interval = setInterval(() => {
        time--;
        updateDisplay();

        if (time <= 0) {
            clearInterval(interval);
            interval = null;
            addWorkTime(25);
            // on finish: clear run start and remove fullscreen then reset
            timerRunStart = null;
            timerStartRemaining = null;
            const card = document.querySelector(".card:nth-child(2)");
            if (card) card.classList.remove('fullscreen');
            document.body.classList.remove('fullscreen-active');
            resetTimer();
            getQuote(); // 🔥 appel API
}
    }, 1000);
}

function pauseTimer() {
    // exit fullscreen on pause
    const card = document.querySelector(".card:nth-child(2)");
    if (card) card.classList.remove('fullscreen');
    document.body.classList.remove('fullscreen-active');
    // compute elapsed using remaining seconds if available, fallback to timerRunStart
    if (timerStartRemaining !== null) {
        const elapsedSeconds = timerStartRemaining - time;
        const elapsedMins = Math.round(elapsedSeconds / 60);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerStartRemaining = null;
        timerRunStart = null;
    } else if (timerRunStart) {
        const elapsedMs = Date.now() - timerRunStart;
        const elapsedMins = Math.round(elapsedMs / 60000);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerRunStart = null;
    }

    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    // ensure fullscreen is removed and timer reset; add partial elapsed time if running
    const card = document.querySelector(".card:nth-child(2)");
    if (card) card.classList.remove('fullscreen');
    document.body.classList.remove('fullscreen-active');

    if (timerStartRemaining !== null) {
        const elapsedSeconds = timerStartRemaining - time;
        const elapsedMins = Math.round(elapsedSeconds / 60);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerStartRemaining = null;
        timerRunStart = null;
    } else if (timerRunStart) {
        const elapsedMs = Date.now() - timerRunStart;
        const elapsedMins = Math.round(elapsedMs / 60000);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerRunStart = null;
    }

    clearInterval(interval);
    interval = null;
    time = 1500;
    updateDisplay();
}

// ===== TEMPS TRAVAILLE PAR JOUR =====
function todayKey() {
    const d = new Date();
    return "work_" + d.toLocaleDateString();
}

function addWorkTime(minutes) {
    let total = parseInt(localStorage.getItem(todayKey())) || 0;
    total += minutes;
    localStorage.setItem(todayKey(), total);
    displayWorkTime();
}

function displayWorkTime() {
    let total = localStorage.getItem(todayKey()) || 0;
    workTime.textContent = total + " min";
}

// ===== MODE SOMBRE =====
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark"));
}

function loadTheme() {
    if (localStorage.getItem("theme") === "true") {
        document.body.classList.add("dark");
    }
}
// ===== API QUOTES (fetch + async/await) =====
const fallbackQuotes = [
    { content: "La concentration est la clé du succès.", author: "Inconnu" },
    { content: "Un esprit discipliné construit des résultats durables.", author: "Inconnu" },
    { content: "Le progrès commence lorsque tu te mets au travail.", author: "Inconnu" },
];

function getRandomQuote(quotes) {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

async function getQuote() {
    const quoteEl = document.getElementById("quote");
    if (!quoteEl) return;

    try {
        const response = await fetch("https://type.fit/api/quotes");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const quotes = await response.json();
        if (Array.isArray(quotes) && quotes.length > 0) {
            const quote = getRandomQuote(quotes);
            quoteEl.textContent = `"${quote.text || quote.content}" `;
        } else {
            throw new Error("Aucune citation reçue");
        }
    } catch (error) {
        console.error("Quote loading error:", error);
        const quote = getRandomQuote(fallbackQuotes);
        quoteEl.textContent = `"${quote.content}"`;
    }
}

function initApp() {
    loadTasks();
    updateDisplay();
    displayWorkTime();
    loadTheme();
    getQuote();
}

// ===== TEMPS DE SESSION (sessionStorage) =====
let sessionStart = Date.now();

window.addEventListener("beforeunload", () => {
    const spent = Math.floor((Date.now() - sessionStart) / 60000);
    sessionStorage.setItem("sessionTime", spent);
});

// Add any partial timer time if the user closes the page while timer is running
window.addEventListener('beforeunload', () => {
    if (timerStartRemaining !== null) {
        const elapsedSeconds = timerStartRemaining - time;
        const elapsedMins = Math.round(elapsedSeconds / 60);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerStartRemaining = null;
        timerRunStart = null;
    } else if (typeof timerRunStart !== 'undefined' && timerRunStart) {
        const elapsedMs = Date.now() - timerRunStart;
        const elapsedMins = Math.round(elapsedMs / 60000);
        if (elapsedMins > 0) addWorkTime(elapsedMins);
        timerRunStart = null;
    }
});