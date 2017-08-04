var client = io();

let player = document.getElementById('player');

const playByList = (playArr) => {
    if (playArr.length != 0) {
        player.src = `/static/video/${playArr.shift()}`;
        player.play();
        player.onended = () => {
            playByList(playArr);
        };
    }
};

let playList = [
    'loader/normal.mp4',
];

client.on('code', (data) => {
    if(data.code !== '000') {
        playList.push(`game/${data.code.substring(0, 1)}.mp4`);
    }
    playByList(playList);
});
