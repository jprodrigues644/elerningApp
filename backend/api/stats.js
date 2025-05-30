module.exports = app =>{
    const Stat = app.dbMg.model('Stat', {
        users: Number,
        categories : Number,
        articles : Number ,
        createdAt: Date 

    })
    
    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                if (!stat) {
                    // Return default values if no stat document is found
                    res.json({ users: 0, categories: 0, articles: 0, createdAt: new Date() });
                } else {
                    res.json(stat);
                }
            })
            .catch(err => res.status(500).json({ error: err.message }));
    };
    
    return {Stat, get}
}