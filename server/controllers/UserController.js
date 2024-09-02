const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            console.log(req.body);

            let user = await User.create({ email, password })
            console.log(user)
            res.status(201).json({
                message: `user ${email} has been created!`
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: 'InvalidInput' }
            }
            if (!password) {
                throw { name: 'InvalidInput' }
            }

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                throw { name: 'InvalidUser' }
            }

            const isPasswordValid = comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw { name: 'InvalidUser' }
            }

            const access_token = signToken({ id: user.id, role: user.role })

            res.status(200).json({
                message: `${email} success login`,
                access_token

            })
        } catch (error) {
            next(error)
        };
    };

    static async googleLogin(req, res, next) {
        try {
            //cuma ambil dalmnya
            const ticket = await client.verifyIdToken({
                //id token adalah access token dari google
                idToken: req.body.googleToken,

                // audhien adalah claent id dari google
                audience: "783044947667-e0dtobejbo624ngnl35s6ldp5troglr2.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            console.log(payload);
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                hooks: false,
                defaults: {
                  email: payload.email,
                  password: Math.random().toString()
                },
              });

              //GENERATE JWT
              const access_token = signToken({ id: user.id })

              res.status(created? 201 : 200).json({
                  access_token
  
              })
        } catch (error) {
            next(error)
        }
    }


}