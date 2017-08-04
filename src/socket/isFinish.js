module.exports = (io, callback) => {
    io.on('finish', callback);
}