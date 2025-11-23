export class AudioPlayer {
    constructor() {
        this.player = null;
        this.isReady = false;
        this.init();
    }

    init() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            this.player = new YT.Player('globalPlayer', {
                height: '100',
                width: '100',
                videoId: '',
                playerVars: {
                    'autoplay': 1,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'rel': 0,
                    'playsinline': 1,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': (event) => {
                        console.log("Audio Engine Ready");
                        this.isReady = true;
                        event.target.setVolume(100);
                    },
                    'onStateChange': (event) => {
                        // If video is cued (5), force it to play. This fixes the 'stopping' issue.
                        if (event.data === YT.PlayerState.CUED) {
                            event.target.playVideo();
                        }
                    },
                    'onError': (e) => {
                        console.error("YouTube Player Error:", e.data);
                        // Optional: trigger next page or alert user
                    }
                }
            });
        };
    }

    play(videoId) {
        if (this.isReady && this.player && this.player.loadVideoById) {
            console.log("Loading song:", videoId);
            // Using object syntax is often more reliable
            this.player.loadVideoById({
                'videoId': videoId,
                'startSeconds': 0,
                'suggestedQuality': 'small'
            });
        } else {
            console.log("Player not ready, retrying...");
            setTimeout(() => this.play(videoId), 500);
        }
    }
}
