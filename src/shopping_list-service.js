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
  getItemById(knex, itemId){
    return knex
    .select('*')
    .from('shopping_list')
    .where('item_id', itemId)
    .first()
  },
  updateItem(knex, item_id, updatedInfo){
    return knex
    .from('shopping_list')
    .where({item_id})
    .update(updatedInfo)
    
  },
  deleteItem(knex, item_id){
    return knex
    .from('shopping_list')
    .where({item_id})
    .delete()
  }
}

module.exports = ShoppingListService