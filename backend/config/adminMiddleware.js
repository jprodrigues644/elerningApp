
module.exports = (middleware) => {
    return (req, res, next) => {
        if (req.user && req.user.admin) {
            middleware(req, res, next);
        } else {
            res.status(403).send('Access denied. Admin rights required.');
        }
    };
};
