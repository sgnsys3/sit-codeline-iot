var path = require('path');

module.exports = {
    index: (req, res) => {
        res.sendFile(path.resolve('./resource/page/index.html'));
    },
};