document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const contentArea = document.getElementById("content");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    function loadSection(section) {
        const contentArea = document.getElementById("content"); // Ensure this matches your actual content container
    
        // Apply fade-out effect
        contentArea.style.opacity = "0";
        
        // Wait for fade-out to complete before loading new content
        setTimeout(() => {
            fetch(`sections/${section}.html`)
                .then(response => response.text())
                .then(data => {
                    contentArea.innerHTML = data;
    
                    // Apply fade-in effect after updating content
                    contentArea.style.opacity = "1";
                })
                .catch(error => {
                    contentArea.innerHTML = "<p>Failed to load content.</p>";
                    console.error("Error loading section:", error);
                    
                    // Make sure it fades in even on error
                    contentArea.style.opacity = "1";
                });
        }, 300); // This timeout should match the CSS transition time
    }

    // Initial load
    loadSection("about");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            loadSection(button.getAttribute("data-tab"));
        });
    });

    // Dark Mode Toggle
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
