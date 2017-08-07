var client = io();

let standBy = document.getElementById('standBy');
let player = document.getElementById('player');
let container = document.getElementById('container');
let showId = document.getElementById('showId');

const listSound = {
    '0': 'fail.mp3',
    'R' : 'Level-Complete.mp3', 
    'P': 'kirby.mp3',
    'B': 'Sonic.mp3',
    'G': 'FFlvUp2.mp3',
    'O': 'dockey.mp3',
    'Y': 'vitoyric.mp3',
};

var playSound = new Audio();

var dataGlobal;

const playByList = (playArr, firstLoadTime, code) => {
    console.log('playArr', playArr);
    console.log('firstLoadTime', firstLoadTime);
    firstLoadTime = firstLoadTime || 0;
    if (playArr.length != 0) {
        standBy.style.display = 'none';
        container.style.display = 'flex';
        showId.style.display = 'none';
        player.src = `/static/video/${playArr.shift()}`;
        player.play();
        player.onended = () => {
            setTimeout(() => {
                playByList(playArr, 0, code);
            }, firstLoadTime * 1000);
        };
        // playSound.pause();
    } else {
        client.emit('finish');
        console.log('firefinish');
        container.style.display = 'none';
        showId.style.display = 'flex';
        showId.innerHTML = `<span>${dataGlobal.code}</span>`;
        let soundCode = dataGlobal.code.substring(0,1);
        playSound = new Audio((`../static/sound/${listSound[soundCode]}`)).play();
        endPlay(code);
    }
};

const endPlay = (code) => {
    container.style.display = 'none';
    showId.style.display = 'flex';
    if (code == '000') {
        showId.innerHTML = '<span style="font-size: 0.8em;">Please Insert Card</span>';
    } else {
        showId.innerHTML = `<span>${code}</span>`;
    }
    client.emit('finish');
    console.log('firefinish');
};

client.on('code', (data) => {
    console.log(data);
    dataGlobal = data;
    let playList = [
        'loader/normal.mp4',
    ];
    if(data.code != '000') {
        playList.push(`game/${data.code.substring(0, 1)}.mp4`);
    }
    playByList([], data.bootTime, data.code);
});

client.on('off', () => {
    player.pause();
});