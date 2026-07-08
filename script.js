document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('chen');
    if (image) {
        image.tabIndex = 0;

        const audio = new Audio('se_cat01.ogg');
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
    const images = ['chen.jpg', 'Marisa.png', 'Suwako.png'];
    
    images.forEach((fileName) => {
        const img = document.createElement('img');
        img.src = `collection/${fileName}`;
        img.alt = fileName;
        showcaseList.appendChild(img);
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