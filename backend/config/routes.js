const adminMiddleware = require('./adminMiddleware');

module.exports = app => {
    // User Routes
    app.route('/signup')
        .post(app.api.user.save);

    app.route('/signin')
        .post(app.api.auth.signin);

    app.route('/validateToken')
        .post(app.api.auth.validateToken);

    // User-specific Routes requiring Authentication
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(adminMiddleware(app.api.user.save))
        .get(adminMiddleware(app.api.user.get))
       

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(adminMiddleware(app.api.user.save))
        .get(app.api.user.getUserById)  // No admin check here; open to all authenticated users
        .delete(adminMiddleware(app.api.user.remove));
    // Category Routes
    app.route('/categories')
        .get(app.api.categories.get)  // Public access to list categories
        .post(app.config.passport.authenticate(), adminMiddleware(app.api.categories.save));

    app.route('/categories/tree')
        .get(app.api.categories.getTree);

    app.route('/categories/:id')
        .get(app.api.categories.getCategoryById)
        .put(app.config.passport.authenticate(), adminMiddleware(app.api.categories.save))
        .delete(app.config.passport.authenticate(), adminMiddleware(app.api.categories.remove));

    // Article Routes
    app.route('/articles')
        .get(app.api.articles.get)
        .post(app.config.passport.authenticate(), adminMiddleware(app.api.articles.save));

    app.route('/articles/:id')
        .get(app.api.articles.getArticleById)
        .put(app.config.passport.authenticate(), adminMiddleware(app.api.articles.save))
        .delete(app.config.passport.authenticate(), adminMiddleware(app.api.articles.remove));

    // Articles by Category
    app.route('/categories/:id/articles')
        .get(app.api.articles.getArticleByCategory);  // Public access

    app.route('/stats').get(app.api.stats.get)
        

    };

