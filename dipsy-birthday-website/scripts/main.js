import { Navigation } from './navigation.js';

// Simple Confetti Controller
const confettiController = {
    start: function() {
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 5 + 2,
                speedY: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            };
        }
        
        particles = Array.from({ length: 150 }, createParticle);
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.x += Math.sin(p.y * 0.01) * 0.5;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                if (p.y > canvas.height) particles[i] = createParticle();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch Data
        const response = await fetch('./data/messages.json');
        const pages = await response.json();

        // Initialize App
        const app = new Navigation(pages, confettiController);
        app.init();

        // Handle Start Overlay
        const overlay = document.getElementById('startOverlay');

        window.startExperience = () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
            
            // Start the first song
            app.audioPlayer.play(pages[0].videoId);
        };
        
    } catch (error) {
        console.error("Failed to load birthday data:", error);
        alert("Please run this project using 'Live Server' in VS Code to load the data file.");
    }
});
