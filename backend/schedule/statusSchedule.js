const schedule = require('node-schedule')
module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function(){
        let usersResult = await app.db('users').count('id').first();
        let categoriesResult = await app.db('categories').count('id').first();
        let articlesResult = await app.db('articles').count('id').first();

        const usersCount = parseInt(usersResult.count, 10); 
        const categoriesCount = parseInt(categoriesResult.count, 10); 
        const articlesCount = parseInt(articlesResult.count, 10); 

        const { Stat } = app.api.stats;

        const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } });

        const stat = new Stat({
            users: usersCount || 0, 
            categories: categoriesCount || 0,
            articles: articlesCount || 0, 
            createdAt: new Date()
        });

        const userChange = !lastStat || stat.users !== lastStat.users;
        const categoriesChange = !lastStat || stat.categories !== lastStat.categories;
        const articlesChange = !lastStat || stat.articles !== lastStat.articles;

        if (userChange || categoriesChange || articlesChange) {
            stat.save().then(() => console.log("Status Updated"));
        }
    });
};
