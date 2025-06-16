// script.js - Complete OneTap Mood Journal
let moods = JSON.parse(localStorage.getItem("moods")) || [];
let password = localStorage.getItem("moodPassword") || null;
let isLocked = false;

const form = document.getElementById("moodForm");
const input = document.getElementById("mood");
const notesInput = document.getElementById("notes");
const moodList = document.getElementById("moodList");
const calendar = document.getElementById("calendar");
const lockPassword = document.getElementById("lockPassword");
const lockToggle = document.getElementById("lockToggle");

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing app...");
    checkPasswordProtection();
    setupEventListeners();
    renderMoods();
    initializeChart();
    updateChart();
});

// Initialize empty chart
function initializeChart() {
    const ctx = document.getElementById("moodChart");
    if (ctx) {
        console.log("Initializing chart...");
        // Destroy existing chart if it exists
        if (window.moodChart) {
            window.moodChart.destroy();
        }
        
        try {
            window.moodChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["No data yet"],
                    datasets: [{
                        label: "Mood Frequency",
                        data: [0],
                        backgroundColor: "#e9ecef",
                        borderColor: "#198754",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
            console.log("Chart initialized successfully");
        } catch (error) {
            console.error("Error initializing chart:", error);
        }
    } else {
        console.error("Chart canvas element not found");
    }
}

// Setup all event listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Emoji button clicks
    const emojiButtons = document.querySelectorAll(".emoji-btn");
    console.log("Found", emojiButtons.length, "emoji buttons");
    
    emojiButtons.forEach((btn, index) => {
        btn.addEventListener("click", handleEmojiClick);
        console.log("Event listener added to emoji button", index);
    });

    // Form submission
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
        console.log("Form event listener added");
    }

    // Calendar change
    if (calendar) {
        calendar.addEventListener("change", handleCalendarChange);
        console.log("Calendar event listener added");
    }

    // Lock/Unlock button
    if (lockToggle) {
        lockToggle.addEventListener("click", toggleLock);
        console.log("Lock toggle event listener added");
    }
}

// Handle emoji button clicks
function handleEmojiClick(e) {
    console.log("Emoji button clicked:", e.target.textContent, e.target.dataset.mood);
    
    const moodText = e.target.dataset.mood;
    const emoji = e.target.textContent;
    const note = notesInput ? notesInput.value.trim() : "";
    
    if (moodText) {
        addMoodEntry(moodText, emoji, note);
        if (notesInput) {
            notesInput.value = "";
        }
    } else {
        console.error("No mood data found on button");
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    
    const moodText = input ? input.value.trim() : "";
    const note = notesInput ? notesInput.value.trim() : "";
    
    if (moodText !== "") {
        addMoodEntry(moodText, "🙂", note);
        if (input) input.value = "";
        if (notesInput) notesInput.value = "";
    } else {
        alert("Please enter a mood!");
    }
}

// Add mood entry to storage
function addMoodEntry(mood, emoji, note) {
    console.log("Adding mood entry:", mood, emoji, note);
    
    const moodEntry = {
        id: Date.now(),
        mood: mood,
        emoji: emoji,
        note: note || "",
        timestamp: new Date().toLocaleString(),
        date: new Date().toISOString().split('T')[0]
    };
    
    moods.push(moodEntry);
    localStorage.setItem("moods", JSON.stringify(moods));
    console.log("Mood saved. Total moods:", moods.length);
    
    renderMoods();
    updateChart();
}

// Render mood entries
function renderMoods() {
    console.log("Rendering moods. Total count:", moods.length);
    
    if (!moodList) {
        console.error("Mood list element not found");
        return;
    }

    if (moods.length === 0) {
        moodList.innerHTML = "<p class='text-muted text-center'>No mood entries yet. Add your first mood!</p>";
        return;
    }

    moodList.innerHTML = moods.slice().reverse().map(m => `
        <div class='card mb-2 shadow-sm'>
            <div class='card-body'>
                <div class='d-flex justify-content-between align-items-start'>
                    <div>
                        <h5 class='mb-1'>${m.emoji} ${m.mood}</h5>
                        <small class='text-muted'>${m.timestamp}</small>
                        ${m.note ? `<p class='mt-2 mb-0'>📝 ${m.note}</p>` : ""}
                    </div>
                    <button class='btn btn-sm btn-outline-danger' onclick='deleteMood(${m.id})'>×</button>
                </div>
            </div>
        </div>
    `).join("");
    
    console.log("Moods rendered successfully");
}

// Delete mood entry
function deleteMood(id) {
    console.log("Deleting mood with ID:", id);
    
    if (confirm("Are you sure you want to delete this mood entry?")) {
        moods = moods.filter(m => m.id !== id);
        localStorage.setItem("moods", JSON.stringify(moods));
        console.log("Mood deleted. Remaining moods:", moods.length);
        renderMoods();
        updateChart();
    }
}

// Handle calendar date selection
function handleCalendarChange(e) {
    const selectedDate = e.target.value;
    console.log("Calendar date selected:", selectedDate);
    
    const filteredMoods = moods.filter(m => m.date === selectedDate);
    console.log("Filtered moods for date:", filteredMoods.length);
    
    if (!moodList) return;
    
    if (filteredMoods.length > 0) {
        moodList.innerHTML = filteredMoods.map(m => `
            <div class='card mb-2 shadow-sm border-primary'>
                <div class='card-body'>
                    <h5 class='mb-1'>${m.emoji} ${m.mood}</h5>
                    <small class='text-muted'>${m.timestamp}</small>
                    ${m.note ? `<p class='mt-2 mb-0'>📝 ${m.note}</p>` : ""}
                </div>
            </div>
        `).join("");
    } else {
        moodList.innerHTML = `<p class='text-muted text-center'>No mood entries for ${selectedDate}</p>`;
    }
}

// Chart.js mood frequency chart
function updateChart() {
    console.log("Updating chart...");
    
    const chartData = {};
    moods.forEach(m => {
        chartData[m.mood] = (chartData[m.mood] || 0) + 1;
    });
    
    const labels = Object.keys(chartData);
    const values = Object.values(chartData);
    
    console.log("Chart data:", chartData);

    if (window.moodChart) {
        window.moodChart.destroy();
    }

    const ctx = document.getElementById("moodChart");
    if (ctx && labels.length > 0) {
        try {
            window.moodChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Mood Frequency",
                        data: values,
                        backgroundColor: [
                            "#198754", "#20c997", "#0dcaf0", "#6f42c1", 
                            "#d63384", "#fd7e14", "#ffc107", "#dc3545"
                        ],
                        borderColor: "#198754",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
            console.log("Chart updated successfully");
        } catch (error) {
            console.error("Error updating chart:", error);
        }
    } else if (labels.length === 0) {
        // Show empty chart
        initializeChart();
    }
}

// Password protection functions
function checkPasswordProtection() {
    console.log("Checking password protection...");
    
    if (password && !sessionStorage.getItem("moodJournalUnlocked")) {
        isLocked = true;
        const entered = prompt("🔒 Enter your mood journal password:");
        if (entered === password) {
            sessionStorage.setItem("moodJournalUnlocked", "true");
            isLocked = false;
            console.log("Password correct, access granted");
        } else if (entered !== null) { // User didn't cancel
            document.body.innerHTML = `
                <div class="container text-center mt-5">
                    <h3>🔒 Access Denied</h3>
                    <p>Incorrect password. Please refresh and try again.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                </div>
            `;
            return;
        }
    }
    
    // Prompt to set password if not set (delayed to not interfere with loading)
    if (!password) {
        setTimeout(() => {
            const setPwd = confirm("🔐 Do you want to set a password for your mood journal?");
            if (setPwd) {
                const newPwd = prompt("Set your password:");
                if (newPwd && newPwd.trim() !== "") {
                    localStorage.setItem("moodPassword", newPwd.trim());
                    password = newPwd.trim();
                    console.log("Password set successfully");
                }
            }
        }, 2000); // Wait 2 seconds before prompting
    }
}

// Toggle lock/unlock functionality
function toggleLock() {
    console.log("Lock toggle clicked");
    
    const inputPassword = lockPassword ? lockPassword.value.trim() : "";
    
    if (!password) {
        // Set new password
        if (inputPassword !== "") {
            localStorage.setItem("moodPassword", inputPassword);
            password = inputPassword;
            alert("Password set successfully!");
            if (lockPassword) lockPassword.value = "";
        } else {
            alert("Please enter a password to set.");
        }
    } else {
        // Verify existing password
        if (inputPassword === password) {
            const action = confirm("Password correct! Do you want to remove the password protection?");
            if (action) {
                localStorage.removeItem("moodPassword");
                sessionStorage.removeItem("moodJournalUnlocked");
                password = null;
                alert("Password protection removed!");
            }
            if (lockPassword) lockPassword.value = "";
        } else if (inputPassword !== "") {
            alert("Incorrect password!");
            if (lockPassword) lockPassword.value = "";
        } else {
            alert("Please enter your current password.");
        }
    }
}

// Debug function to check if everything is working
function debugApp() {
    console.log("=== DEBUG INFO ===");
    console.log("Total moods:", moods.length);
    console.log("Password set:", !!password);
    console.log("Chart exists:", !!window.moodChart);
    console.log("Elements found:");
    console.log("- Form:", !!form);
    console.log("- Input:", !!input);
    console.log("- Notes:", !!notesInput);
    console.log("- Mood List:", !!moodList);
    console.log("- Calendar:", !!calendar);
    console.log("- Lock Toggle:", !!lockToggle);
    console.log("- Emoji buttons:", document.querySelectorAll(".emoji-btn").length);
}

// Optional: Call debug function to check everything is working
// Uncomment the line below if you want to see debug info in console
// setTimeout(debugApp, 3000);

// Optional: Mood reminder (commented out by default to avoid annoyance)
// Uncomment and modify interval as needed
/*
setInterval(() => {
    if (document.visibilityState === 'visible' && moods.length > 0) {
        // Only remind if user hasn't added a mood today
        const today = new Date().toISOString().split('T')[0];
        const todayMoods = moods.filter(m => m.date === today);
        if (todayMoods.length === 0) {
            if (confirm("🧠 Don't forget to log your mood today! Would you like to add one now?")) {
                document.getElementById("mood").focus();
            }
        }
    }
}, 3600000); // Every hour
*/

// Make functions globally available for onclick handlers
window.deleteMood = deleteMood;
window.toggleLock = toggleLock;