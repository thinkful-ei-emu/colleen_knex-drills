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
  .select('category')
  .from('shopping_list')
  .groupBy('category')
  .sum('price')
  .then(result=>{
    console.log(result)
  })
}

getTotalCostForCategory()