var rpio = require('rpio');
var codelineArr = [
    'R01', 'R02', 'R03', 'R04', 'R05', 'R06', 'R07', 'R08', 'R09', 'R10',
    'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20',
    'R21', 'R22', 'R23',
    'G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07', 'G08', 'G09', 'G10',
    'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20',
    'G21', 'G22', 'G23',
    'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10',
    'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20',
    'B21', 'B22',
    'Y01', 'Y02', 'Y03', 'Y04', 'Y05', 'Y06', 'Y07', 'Y08', 'Y09', 'Y10',
    'Y11', 'Y12', 'Y13', 'Y14', 'Y15', 'Y16', 'Y17', 'Y18', 'Y19', 'Y20',
    'Y21', 'Y22', 'Y23',
    'O01', 'O02', 'O03', 'O04', 'O05', 'O06', 'O07', 'O08', 'O09', 'O10',
    'O11', 'O12', 'O13', 'O14', 'O15', 'O16', 'O17', 'O18', 'O19', 'O20',
    'O21', 'O22', 'O23', 'O24',
    'P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08', 'P09', 'P10',
    'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20',
    'P21', 'P22', 'P23'
];

module.exports = (io) => {
    // rpio.close(11);
    rpio.open(11, rpio.INPUT, rpio.PULL_UP);
    rpio.poll(11, () => {
        let sendItem = {
            code: '000',
            left: codelineArr.length,
        };
        let luck = Math.floor((Math.random() * 5) + 1);
        console.log(`Luck: ${luck}`);
        if (luck != 1) {
            let range = codelineArr.length;
            let start = 1;
            let randArr = Math.floor((Math.random() * range) + start);
            sendItem = {
                code: codelineArr.splice(randArr, 1)[0],
                left: codelineArr.length,
            };
        }
        console.log(sendItem);
        io.emit('code', sendItem);
    }, rpio.POLL_LOW);
    
    rpio.poll(11, () => {
        io.emit('stop');
    }, rpio.POLL_HIGH);
};