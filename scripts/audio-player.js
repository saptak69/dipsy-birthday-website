export class AudioPlayer {
    constructor() {
        this.player = null;
        this.isReady = false;
        this.init();
    }

    init() {
        // 1. Load the official YouTube IFrame API script asynchronously
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 2. Define the global callback that YouTube API looks for
        window.onYouTubeIframeAPIReady = () => {
            this.player = new YT.Player('globalPlayer', {
                height: '100', // Small but not 0 to avoid browser blocking
                width: '100',
                videoId: '',   // Init empty
                playerVars: {
                    'autoplay': 1,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'rel': 0,
                    'playsinline': 1, // Crucial for mobile
                    'origin': window.location.origin
                },
                events: {
                    'onReady': (event) => {
                        console.log("Audio Engine Ready");
                        this.isReady = true;
                        event.target.setVolume(100);
                    },
                    'onError': (e) => console.error("YouTube Player Error:", e)
                }
            });
        };
    }

    play(videoId) {
        if (this.isReady && this.player && this.player.loadVideoById) {
            console.log("Loading song:", videoId);
            this.player.loadVideoById(videoId);
        } else {
            console.log("Player not ready, retrying in 500ms...");
            setTimeout(() => this.play(videoId), 500);
        }
    }
}
