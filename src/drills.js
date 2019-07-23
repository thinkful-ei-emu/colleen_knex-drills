require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const searchTerm = 'phony'
function searchItemName(searchTerm){
  knexInstance  
  .select('item_name')
  .from('shopping_list')
  .where('item_name', 'ILIKE', `%${searchTerm}%`)
  .then(result=>{
    console.log(result)
  })
};
searchItemName(searchTerm)

function paginateItems(pageNumber){
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber -1)
  knexInstance
  .select('item_name')
  .from('shopping_list')
  .limit(productsPerPage)
  .offset(offset)
  .then(results => {
    console.log(results)
  })
}

paginateItems(2)

function getItemsAddedAfterDate(days){
  knexInstance
  .select('item_name')
  .from('shopping_list')
  .where('date_added', '>', knexInstance.raw(`now() - '?? days' :: INTERVAL`, days))
  .then(result => {
    console.log(result)
  })
};

getItemsAddedAfterDate(2)

function getTotalCostForCategory(){
  knexInstance
  //show category
  .select('category')
  .from('shopping_list')
  //group items by category
  .groupBy('category')
  //to show price as 'total' for the category
  .sum('price AS total')
  .then(result=>{
    console.log(result)
  })
}

getTotalCostForCategory()