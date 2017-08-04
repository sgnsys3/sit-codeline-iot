var client = io();

let player = document.getElementById('player');

const playByList = (playArr) => {
    if (playArr.length != 0) {
        player.src = `/static/video/${playArr.shift()}`;
        player.play();
        player.onended = () => {
            playByList(playArr);
        };
    } else {
        client.emit('finish');
        console.log('firefinish');
    }
};

client.on('code', (data) => {
    let playList = [
        'loader/normal.mp4',
    ];
    if(data.code != '000') {
        playList.push(`game/${data.code.substring(0, 1)}.mp4`);
    }
    playByList(playList);
});

client.on('off', () => {
    player.pause();
});