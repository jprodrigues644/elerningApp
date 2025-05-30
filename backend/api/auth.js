const {authSecret} =  require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {
    const signin =  async (req , res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Insert the user email and the password');
        }
        

            //Check l'utilisateur dans la base de données
            const user  = await app.db('users')
            .where({email : req.body.email})
            .first()

            if (!user) {
                return res.status(400).send('User not found')
            }

            // On compare le password dans la requete avec le password stocké encrypté
            bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
                if (err) {
                    return res.status(500).send('Encryption error');
                }
                if (!isMatch) {
                    return res.status(401).send('Invalid password!');
                }
    
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    iat: currentTime,
                    exp: currentTime + (60 * 60 * 4) // Token expires in 4 hours
                };
    
                // Respond with the token and the payload
                res.json({
                    ...payload,
                    token: jwt.encode(payload, authSecret)
                });
            });
        };

    const validateToken = async (req , res) => {
        const userData = req.body ||null

        try {
            if(userData) {
                const token = jwt.decode(userData.token , authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
         } catch (e) {
            console.error('Token validation failed:', e);
            res.status(400).send('Invalid token');
        }
        

         res.send(false)
    }

    return {signin, validateToken}
}