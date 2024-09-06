
// YouTube 播放器对象
let ytPlayer;
let updateInterval;

// 当 YouTube API 准备好时，初始化播放器
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('iframe-container', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('controls').style.display = 'block'; // 显示控制按钮
    document.getElementById('player-status').style.display = 'block'; // 显示播放状态
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        // 启动定时器，每秒更新播放时间
        updateInterval = setInterval(updatePlayerTime, 1000);
    } else {
        clearInterval(updateInterval); // 停止更新
    }
}

// 更新当前播放时间和总时长
function updatePlayerTime() {
    const currentTime = ytPlayer.getCurrentTime();
    const totalTime = ytPlayer.getDuration();
    
    document.getElementById('current-time').innerText = formatTime(currentTime);
    document.getElementById('total-time').innerText = formatTime(totalTime);
}

// 格式化时间为 mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function playMusic(platform) {
    const iframeContainer = document.getElementById('iframe-container');
    let embedCode = '';

    if (platform === 'spotify') {
        embedCode = '<iframe src="https://open.spotify.com/embed/track/2TpxZ7JUBn3uw46aR7qd6V" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
        document.getElementById('controls').style.display = 'none';
        document.getElementById('player-status').style.display = 'none'; // 隐藏状态
    } else if (platform === 'apple-music') {
        embedCode = '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/song/1535135607?app=music"></iframe>';
        document.getElementById('controls').style.display = 'none';
        document.getElementById('player-status').style.display = 'none';
    } else if (platform === 'youtube-music') {
        embedCode = '<iframe id="ytplayer" width="560" height="315" src="https://www.youtube.com/embed/ScMzIvxBSi4?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        document.getElementById('controls').style.display = 'block'; // 显示播放/暂停按钮
        document.getElementById('player-status').style.display = 'block'; // 显示状态
    }

    iframeContainer.innerHTML = embedCode;
}

function play() {
    if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
    }
}

function pause() {
    if (ytPlayer && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
    }
}
