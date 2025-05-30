module.exports = {

    categoryWithChildren : `WITH RECURSIVE subcategories (id) AS 
    (
        SELECT id FROM categories WHERE id = ?
        UNION ALL
         SELECT c.id From subcategories, categories c
         WHERE "Idparent" = subcategories.id
    )

        SELECT id FROM subcategories
    
    
    `
}


