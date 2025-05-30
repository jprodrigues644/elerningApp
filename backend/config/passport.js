const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const  {ExtractJwt, Strategy} = require('passport-jwt')

module.exports = app => {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = authSecret;
    // opts.issuer = 'accounts.examplesoft.com';  
    // opts.audience = 'yoursite.net';           

    passport.use(new Strategy(opts, function(payload, done) {
        
        app.db('users')  
            .where({ id: payload.id })  
            .first()  
            .then(user => {
                if (user) {
                    return done(null, user);  
                } else {
                    return done(null, false);  // No user found
                    
                }
            })
            .catch(err => {
                return done(err, false);  // Database or other error
            });
    }));


    const authenticate = () => passport.authenticate('jwt', { session: false });

    // Return the authenticate function for use in routes
    return { authenticate };

}