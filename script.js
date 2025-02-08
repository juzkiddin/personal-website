// Function to load a section dynamically
function loadSection(section) {
    fetch(`sections/${section}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => console.error('Error loading section:', error));
}

// Load the default section (About) on page load
window.onload = () => {
    loadSection('about');
};

// Add event listeners to navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        loadSection(section);
        history.pushState(null, '', `#${section}`);
    });
});

// Handle back/forward navigation
window.onpopstate = () => {
    const section = window.location.hash.substring(1) || 'about';
    loadSection(section);
};