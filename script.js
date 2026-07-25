document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('chen');
    if (image) {
        image.tabIndex = 0;

        const audio = new Audio('/static/se_cat01.ogg');
        audio.preload = 'auto';

        function playSound() {
            try {
                audio.currentTime = 0;
                audio.play();
            } catch (e) {
                console.error('Audio play failed', e);
            }
        }

        image.addEventListener('click', playSound);
        image.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playSound();
            }
        });
    }

const showcaseList = document.getElementById('showcase-list');
if (!showcaseList) return;

// Image list from collection folder
fetch('/images')
    .then((response) => response.json())
    .then((images) => {
        images.forEach((fileName) => {
            const img = document.createElement('img');
            img.src = `/static/collection/${fileName}`;
            img.alt = fileName;
            showcaseList.appendChild(img);
        });
    })
    .catch((error) => {
        console.error('Error fetching images:', error);
    });
});

window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.theme-toggle').forEach(button => {
         button.addEventListener('click', function() {
            const theme = button.getAttribute('data-theme');
            document.body.classList.remove('light-mode', 'dark-mode');
            document.body.classList.add(theme + '-mode');
            localStorage.setItem('theme', theme);
        });
    });
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-mode');
});

async function loadSection(sectionName, elementId) {
    const response = await fetch(`/content/${sectionName}`);
    const data = await response.json();
    document.getElementById(elementId).textContent = data.text;
}

loadSection('about', 'about-text');
loadSection('projects', 'projects-text');
loadSection('languages', 'languages-text');
loadSection('contact', 'contact-text');