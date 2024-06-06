module.exports = app =>{
    app.route('/users')
    .post(app.api.user.save) 
    .get(app.api.user.get)
    
    app.route('/users/:id')
    .put(app.api.user.save)
    .get(app.api.user.getUserById)


    app.route('/categories')
    .post(app.api.categories.save)
    .get(app.api.categories.get)
    
    app.route('/categories/tree')
    .get(app.api.categories.getTree)

    app.route('/categories/:id')
    .put(app.api.categories.save)
    .get(app.api.categories.getCategoryById)
    .delete(app.api.categories.remove)

    app.route('/articles')
    .get(app.api.articles.get)
    .post(app.api.articles.save)

    app.route('/articles/:id')
    .get(app.api.articles.getArticleById)
    .put(app.api.articles.save)
    .delete(app.api.articles.remove)

}