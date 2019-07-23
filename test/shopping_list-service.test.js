require('dotenv').config()
const ShoppingListService = require('../src/shopping_list-service')
const knex = require('knex');

let db;
let testListItems = [
  {
    id:1,
    item_name: 'apple',
    price: 1.00,
    category: 'Snack',
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false
  },
  {
    id:2,
    item_name: 'lasagna',
    price: 10.00,
    category: 'Main',
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false
  },
  {
    id:3,
    item_name: 'pop tart',
    price: 3.50,
    category: 'Breakfast',
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false
  }
]
//connect to db before test
before(()=>{
  db = knex({
    client : 'pg',
    connection: process.env.TEST_DB_URL
  })
})
//remove table shopping_list before test
before(()=>db("shopping_list").truncate())
//after each individual test remove table
beforeEach(()=>db("shopping_list").truncate())
//after all tests remove connection to db
after(()=> db.destroy())

context('given shopping_list has no data', ()=>{
  it("getItems() resolves an empty array", ()=>{
    return ShoppingListService.getItems(db)
    .then(res => {
      expect(res).to.eql([])
    })
  })
  it("addItem() inserts an item and resolves the new item with an id", ()=>{
    const newItem = {
      item_name: 'bababar',
      price: '4.50',
      category: 'Breakfast',
      date_added: new Date("2020-01-01T00:00:00.000Z"),
      checked: true,
    }
    return ShoppingListService.addItem(db, newItem)
    .then(actual => {
      expect(actual).to.eql({
        item_id: 1,
        item_name: newItem.item_name,
        price: newItem.price,
        date_added: newItem.date_added,
        category: newItem.category,
        checked: newItem.checked
      })
    })
  })
})

context('given shopping_list has data', ()=>{
  beforeEach(()=>{ 
    return db.into('shopping_list').insert(testListItems)
   })
  })