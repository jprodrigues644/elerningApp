function existOrError(value, errorMessage) {
    if(!value)throw errorMessage
    if(Array.isArray(value)&& value.length===0) throw errorMessage
    if(typeof value ==='string' && !value.trim()) throw errorMessage //verif string vide ou espaces blancs seulement
}


function notExistOrError(value, errorMessage) {
    if (value === undefined || value === null) return;
    console.log(!!value)
    //if (value) throw errorMessage;
    if (Array.isArray(value) && value.length > 0) throw errorMessage;
    if (typeof value === 'string' && value.trim()) throw errorMessage; // vérifie si la chaîne n'est pas vide et n'a pas que des espaces blancs
}


function equalsOrError(valueF , valueS , errorMessage) {
    console.log(valueF !== valueS);
    if(valueF !== valueS ) throw errorMessage;

}

module.exports = { existOrError, notExistOrError, equalsOrError}