module.exports = app => {
    const {existOrError, notExistOrError, equalsOrError} = app.api.validation; 
    const save = async ( req, res )=> {
        const category = {...req.body}
     
     
        if(req.params.id) {category.id = req.params.id;
            console.log("Categorie ID Test " , category.id)
        }
   
        try {
            console.log('Checking existence of name:', category.name);
           
            existOrError(category.name, "Name of the category not given");
        }
            catch(errorMessage) {
                return res.status(400).send(errorMessage)
            }

            if(category.id){
                // Save sert à inserer et à modifier l'user dans la bd
                app.db('categories')
                .update(category)
                .where ({id : category.id})
                .then( _ =>res.status(204).send())
                .catch(err =>res.status(500).send(err))
            } 
            else {
                app.db('categories')
                .insert(category)
                .then( _ =>res.status(204).send())
                .catch(err =>res.status(500).send(err))
            }


    }  

    const remove = async (req , res) => {
        //const category = {...req.body}
        const categoryId = req.params.id;
        try{ 
            existOrError(categoryId, " Category id not given") ;
            // Validation subcategories

            const subcategories = await app.db('categories').where({Idparent: categoryId});
            console.log(subcategories);
            notExistOrError(subcategories, "This category has at least one subcategory");
            //Validation articles associes

            const articles = await app.db('articles').where({categoriesId: categoryId});
            notExistOrError(articles, "This category has at least one article remove the articles before perform the category suppression");
            
            const categoryDeleted = await app.db('categories').where({ id: categoryId }).del();

            notExistOrError( categoryDeleted , "Category not finded");
            console.log('deted cate', categoryDeleted)
            res.status(204).send()
        } catch(errorMessage){
                return res.status(400).send(errorMessage)

        }
    }

   
    

    const WihtPath = function (categories) {

        
        const getParent = (categories, Idparent) =>{
            let parent = categories.filter ( parent => parent.id === Idparent );
            return parent.length? parent[0] : null;
        }
         

        const categoriesWihtPath = categories.map(category => {
            let path = category.name ;
            let parent = getParent( categories , category.Idparent );

            while(parent) {

                path = `${parent.name} > ${path}`;
                parent = getParent(categories, parent.Idparent)
             }
             return {...category, path}
        })

        categoriesWihtPath.sort((a, b) => {
            const pathA = a.path.toLowerCase();
            const pathB = b.path.toLowerCase();
        
            if (pathA < pathB) {
                return -1;
            }
            if (pathA > pathB) {
                return 1;
            }
            return 0;
        });

        return categoriesWihtPath;
}

    const get = function (req, res) {
        app.db('categories')
        .then(categories => res.json(WihtPath(categories)))
        .catch(err=>res.status(500).send(err))
    }
    

    const getCategoryById = (req, res) => {
        app.db('categories')
            .where({id: req.params.id}).first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const toTree = function (categories, tree) {
        if (!tree) {
            tree = categories.filter(c => !c.Idparent);
        }
        tree = tree.map(parentNode => {
            const isChild = node => node.Idparent === parentNode.id; // Use === instead of =
            parentNode.children = toTree(categories, categories.filter(isChild));
            return parentNode;
        });
        return tree;
    }
    

    const getTree = function (req, res) {
        app.db('categories')
            .then(categories => {
                const tree = toTree(WihtPath(categories));
                res.json(tree);
            })
            .catch(err => res.status(500).send(err));
    }
    
   

    return { save, remove, get, getTree, getCategoryById };

}
