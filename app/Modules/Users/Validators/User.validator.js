const checkUser = (req, res, next) => {
    console.log('is username is correct?')
    next()
}

module.exports = { checkUser }