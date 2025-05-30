const bcrypt = require('bcrypt')

module.exports = app => {
    const {existOrError, notExistOrError, equalsOrError} = app.api.validation;
    const encryptPassword = function(password){
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds); //generate salt
        return bcrypt.hashSync(password , salt)
    }
    const save = async (req, res) => {
        const user = {...req.body};
        if (req.params.id) user.id = req.params.id;
        if (!req.originalUrl.startsWith('/users')) user.admin = false;
        if (!req.user || !req.user.admin) user.admin = false;
    
        try {
            existOrError(user.name, "Name is required.");
            existOrError(user.email, "Email is required.");
            existOrError(user.password, "Password is required.");
            existOrError(user.confirmationPassword, "Password confirmation is required.");
            equalsOrError(user.password, user.confirmationPassword, "Passwords do not match.");
    
            const userDB = await app.db('users').where({ email: user.email }).first();
    
            if (!user.id) {
                notExistOrError(userDB, "User already exists with this email.");
            }
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    
        user.password = encryptPassword(user.password);
        delete user.confirmationPassword;
    
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('delectedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).json({ error: err }));
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).json({ error: err }));
        }
    }
    
    const get = function (req, res) {
        app.db('users').select('id','name','email','admin','password')
        .whereNull('delectedAt')
        .then(users => res.json(users))
        .catch(err=>res.status(500).send(err))
    }

    const getUserById = (req, res )=>{
        
        app.db('users')
        .select('id','name','email','admin')
        .first()
        .where({id : req.params.id})
        .whereNull('delectedAt')
        .then(user => res.json(user))
        .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles').where({ userId: req.params.id });
            notExistOrError(articles, 'User has articles');
    
            const rowsUpdated = await app.db('users')
                .update({ delectedAt: new Date() })  // Correct the field name here
                .where({ id: req.params.id });
    
            existOrError(rowsUpdated, 'User not found');
            res.status(204).send();
        } catch (e) {
            res.status(400).send(e.toString());  // Send the error as a string for clarity
        }
    };
    
    return {save, get , getUserById,remove}
}