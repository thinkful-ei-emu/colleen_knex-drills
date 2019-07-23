const ArticlesService = {
  //methods for all of our transactions go in here
  getAllArticles(knex){
    return knex.select("*").from('blogful_articles')
  },

  insertArticle(knex, newArticle){
    return knex
    .insert(newArticle)
    .into('blogful_articles')
    .returning('*')
    //to only get thing added-refer to test
    .then(rows => {
      return rows[0]
    })
  },
  getById(knex, id) {
    return knex
    .from('blogful_articles')
    .select('*')
    .where("id", id)
    .first()
  },
  deleteArticle(knex, id){
    return knex
    .from('blogful_articles')
    .where( {id})
    .delete()
  },
  updateArticle(knex, id, newArticleFields){
    return knex
    .from('blogful_articles')
    .where({ id })
    .update(newArticleFields)
  }
}

module.exports = ArticlesService