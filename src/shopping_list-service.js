const ShoppingListService = {
  getItems(knex){

    return knex.select('*').from('shopping_list')
  },
  addItem(knex, newItem){
    return knex
    .insert(newItem)
    .into('shopping_list')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
  },
  updateItem(){},
  deleteItem(){}
}

module.exports = ShoppingListService