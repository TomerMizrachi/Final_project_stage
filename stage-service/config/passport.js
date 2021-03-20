import passportJWT from 'passport-jwt'
import User from '../models/user.js'
// const mongoose = require("mongoose");
// const User = mongoose.model("users");
import keys from './keys.js'
// const keys = require("../config/keys");

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey


const passportConfig = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    )
}

export { passportConfig }