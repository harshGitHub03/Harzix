const jwt = require("jsonwebtoken")

exports.generateToken = (data) => {
    return jwt.sign({
        id: data.id,
        email: data.email
    }, process.env.JWT_SECRET)
}