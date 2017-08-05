var client = io();

let player = document.getElementById('player');

const playByList = (playArr, firstLoadTime) => {
    console.log('playArr', playArr);
    console.log('firstLoadTime', firstLoadTime);
    firstLoadTime = firstLoadTime || 0;
    if (playArr.length != 0) {
        player.src = `/static/video/${playArr.shift()}`;
        player.play();
        player.onended = () => {
            setTimeout(() => {
                playByList(playArr);
            }, firstLoadTime * 1000);
        };
    } else {
        client.emit('finish');
        console.log('firefinish');
    }
};

client.on('code', (data) => {
    console.log(data);
    let playList = [
        'loader/normal.mp4',
    ];
    if(data.code != '000') {
        playList.push(`game/${data.code.substring(0, 1)}.mp4`);
    }
    playByList(playList, data.bootTime);
});

client.on('off', () => {
    player.pause();
});


client.on('finish', (data) => {
    console.log(data);
    let container = document.getElementById('container');
    let showId = document.getElementById('showId');
    container.style.display = 'none';
    showId.style.display = 'flex';
    showId.innerHTML = `<span>${data.code}</span>`;
});