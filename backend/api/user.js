const bcrypt = require('bcrypt')

module.exports = app => {
    const {existOrError, notExistOrError, equalsOrError} = app.api.validation;
    const encryptPassword = function(password){
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds); //generate salt
        return bcrypt.hashSync(password , salt)
    }
    const save = async ( req, res )=> {
    const user = {...req.body}
    if(req.params.id) {user.id = req.params.id;}

    try {
        console.log('Checking existence of name:', user.name);
       
        existOrError(user.name, "Name not given");
        console.log('Checking existence of email:', user.email);
        existOrError(user.email, "Email not given");
        console.log('Checking existence of password:', user.password);
        existOrError(user.password, "Password not given");
        console.log('Checking existence of confirmation password:', user.confirmationPassword);
        existOrError(user.confirmationPassword, "Invalid password confirmation");
        console.log('Comparing passwords');
        equalsOrError(user.password, user.confirmationPassword, 'Doesnt match');
        //console.log(equalsOrError(user.password, user.confirmationPassword, 'Doesnt match'));
        console.log("Comparation Donne");
        const userDB = await app.db('users').where({email: user.email}).first();
        console.log("User DB", userDB ,userDB.id);
        console.log(!user.id);
        
        if(!user.id) {
        console.log("User before test not exist",user.id)
        notExistOrError(userDB,"User already exist"); 
        }
    }
    catch(errorMessage) {
        return res.status(400).send(errorMessage)
    }
    user.password = encryptPassword(user.password)
    delete user.confirmationPassword;
    if(user.id){
        // Save sert à inserer et à modifier l'user dans la bd
        app.db('users')
        .update(user)
        .where ({id : user.id})
        .then(_ =>res.status(204).send())
        .catch(err =>res.status(500).send(err))
    } 
    else {
        app.db('users')
        .insert(user)
        .then(_ =>res.status(204).send())
        .catch(err =>res.status(500).send(err))
    }
    }
    const get = function (req, res) {
        app.db('users').select('id','name','email','admin','password')
        .then(users => res.json(users))
        .catch(err=>res.status(500).send(err))
    }

    const getUserById = (req, res )=>{
        
        app.db('users')
        .select('id','name','email','admin')
        .first()
        .where({id : req.params.id})
        .then(user => res.json(user))
        .catch(err=>res.status(500).send(err))
    }
    return {save, get , getUserById}
}