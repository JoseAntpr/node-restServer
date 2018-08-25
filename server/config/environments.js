const prod = {
    mongoURL: process.env.MONGO_URI
};

const dev = {
    mongoURL: 'mongodb://localhost:27017/cafe'
}

module.exports = {
    prod,
    dev
} 
