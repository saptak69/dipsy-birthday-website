import { AudioPlayer } from './audio-player.js';

export class Navigation {
    constructor(pages, confettiController) {
        this.pages = pages;
        this.currentPage = 0;
        this.container = document.getElementById('cardContainer');
        this.audioPlayer = new AudioPlayer();
        this.confetti = confettiController;
        
        // Bind methods
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.playCurrentSong = this.playCurrentSong.bind(this);
    }

    init() {
        this.renderCards();
        // Make functions available globally for HTML onclick attributes
        window.nextPage = this.nextPage;
        window.prevPage = this.prevPage;
        window.playSong = this.playCurrentSong;
    }

    renderCards() {
        this.container.innerHTML = '';
        this.pages.forEach((page, index) => {
            const card = document.createElement('div');
            // Add animation classes
            if (index === this.currentPage) {
                card.className = 'card active fade-enter-active';
            } else {
                card.className = 'card';
            }
            
            card.id = `card-${index}`;
            
            const progressWidth = ((index + 1) / this.pages.length) * 100;
            
            card.innerHTML = `
                <div class="progress-bar" style="width: ${progressWidth}%"></div>
                <div class="page-number">Page ${index + 1} of ${this.pages.length}</div>
                <div class="text-6xl text-pink-400 mb-4">
                    <i class="fas fa-heart"></i>
                </div>
                <h1>${page.title}</h1>
                <p>${page.msg}</p>
                
                <button onclick="playSong('${page.videoId}')" class="song-btn">
                    <i class="fab fa-youtube"></i> Play "${page.song}"
                </button>
                
                <div class="music-indicator">
                    <div class="music-bars">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <span>Now Playing: ${page.song}</span>
                </div>

                <div class="nav-buttons">
                    <button class="nav-btn" onclick="prevPage()" ${index === 0 ? 'style="opacity:0; pointer-events:none"' : ''}>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <button class="nav-btn primary" onclick="nextPage()">
                        ${index === this.pages.length - 1 ? 'Finish <i class="fas fa-gift"></i>' : 'Next <i class="fas fa-arrow-right"></i>'}
                    </button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.transitionPage(this.currentPage, this.currentPage + 1);
            this.currentPage++;
            
            // Auto play next song using the persistent player
            this.audioPlayer.play(this.pages[this.currentPage].videoId);
            
            if (this.currentPage === this.pages.length - 1) {
                this.confetti.start();
            }
        } else {
            alert("Happy Birthday Dipsy! ❤️");
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.transitionPage(this.currentPage, this.currentPage - 1);
            this.currentPage--;
            this.audioPlayer.play(this.pages[this.currentPage].videoId);
        }
    }
    
    playCurrentSong(videoId) {
        // If called from button, use the passed ID, otherwise use current page
        const id = videoId || this.pages[this.currentPage].videoId;
        this.audioPlayer.play(id);
    }

    transitionPage(fromIndex, toIndex) {
        const fromCard = document.getElementById(`card-${fromIndex}`);
        const toCard = document.getElementById(`card-${toIndex}`);

        // Reset classes
        fromCard.className = 'card fade-exit-active';
        toCard.className = 'card fade-enter-active active';
    }
}
