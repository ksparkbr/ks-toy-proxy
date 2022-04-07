require('dotenv').config();

module.exports = {
    port: process.env.APP_PORT,
    cors: {
        origin: [process.env.FRONT_ADDR1, process.env.FRONT_ADDR2],
        credentials: true,
    },
}