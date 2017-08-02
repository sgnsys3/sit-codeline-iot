let player = document.getElementById('player');

let playList = [
    'loader/normal.mp4',
    'game/kirby.mp4',
    'codeline/song.mp4',
];

player.webkitEnterFullscreen();

const playByList = (playArr) => {
    if (playArr.length != 0) {
        player.src = `/static/video/${playArr.shift()}`;
        player.play();
        player.onended = () => {
            playByList(playArr);
        }
    }
};

playByList(playList);