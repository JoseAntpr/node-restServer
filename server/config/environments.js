const prod = {
    mongoURL: 'mongodb://joseantpr:123456jose@ds125322.mlab.com:25322/jose-cafe'
};

const dev = {
    mongoURL: process.env.MONGO_URI
}

module.exports = {
    prod,
    dev
} 
