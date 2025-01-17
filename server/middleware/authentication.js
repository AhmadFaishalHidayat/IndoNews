const { verifToken } = require('../helpers/jwt')
const { User } = require('../models');


module.exports = async function authentication(req, res, next) {

    let access_token = req.headers.authorization;
    console.log(access_token, "Authentication");

    
    try {
        if (!access_token) {
            throw { name: "Invalid Token" }
        }
        let [bearer, token] = access_token.split(' ');

        if (bearer !== "Bearer") {
            throw { name: "Invalid Token" }
        }
        let payload = verifToken(token);
        console.log(payload);
        let user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: "Invalid Token" }
        }
        req.user = {
            id: user.id,
            email: user.email,
        };

        next()
    } catch (error) {
        // res.send(error)
        next(error)
    }
}