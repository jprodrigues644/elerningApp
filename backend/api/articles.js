const queries = require('./queries')

module.exports = app => {
const {existOrError, notExistOrError, equalsOrError} = app.api.validation;
 
const save = async ( req, res )=> {
    const article = {...req.body}
 
 
    if(req.params.id) {article.id = req.params.id;
        console.log("Categorie ID Test " , article.id)
    }

    try {
        console.log('Checking existence of name:', article.name);
        existOrError(article.name, "Name of the article not given");

        console.log('Checking existence of description:', article.description);
        existOrError(article.description, "Description of the article not given");

        console.log('Checking existence of content:', article.content);
         existOrError(article.content, "Content of the article not given");

        console.log('Checking existence of userId:', article.userId);
        existOrError(article.userId, "User of the article not given");

        console.log('Checking existence of categoriesId:', article.categoriesId);
        existOrError(article.categoriesId, " Category of the article not given");

    }
        catch(errorMessage) {
            return res.status(400).send(errorMessage)
        }

        if(article.id){
            // Save sert à inserer et à modifier l'user dans la bd
            app.db('articles')
            .update(article)
            .where ({id : article.id})
            .then( _ =>res.status(204).send())
            .catch(err =>res.status(500).send(err))
        } 
        else {
            app.db('articles')
            .insert(article)
            .then( _ =>res.status(204).send())
            .catch(err =>res.status(500).send(err))
        }


} 


const remove = async (req , res) => {
    //const article = {...req.body}
    const articleId = req.params.id;
    try{ 
        console.log('validation Id article supp')
        existOrError(articleId, " article id not given") ;
        const articleDeleted = await app.db('articles').where({ id: articleId }).del();
        existOrError( articleDeleted , "article not finded");
        console.log('detected article', articleDeleted)
        res.status(204).send()
    } catch(errorMessage){
            return res.status(400).send(errorMessage)

    }
}


const limit = 10 // limites d'articles affichées par page

const get = async function(req , res) {
    const page = req.query.page || 1 
    const countPgDb = await app.db('articles').count('id').first();
    const count = parseInt(countPgDb.count)

    app.db('articles').select('id','name','description')
    .limit(limit)
    .offset(page * limit-limit)
    .then(articles => res.json({data : articles, count , limit}))
    .catch(err => res.status(500).send(err))
}

const getArticleById = async (req, res) => {
    app.db('articles').where({id : req.params.id}).first()
    .then(article => {
        article.content = article.content.toString()
        return res.json(article)
    }).catch(err => res.status(500).send(err))
}


const getArticleByCategory = async(req, res) => {
    const categoryId = req.params.id ; 
    const page = req.query.page || 1 ;
    const categories = await app.db.raw(queries.categoryWithChildren , categoryId)
    const ids = categories.rows.map(c =>c.id)

    app.db('articles').where({categoriesId : ids})

}

return { save , remove , get, getArticleById, getArticleByCategory}

}