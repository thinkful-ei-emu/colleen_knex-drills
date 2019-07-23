require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

const searchTerm = "holo";

function searchbyProduct(searchTerm) {
  knexInstance
    .from("amazong_products")
    .select("product_id", "name", "price")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}
searchbyProduct(searchTerm);

function paginateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("product_id", "name", "price", "category")
    .from("amazong_products")
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

function getProductsWithImages() {
  knexInstance
    .select("product_id", "name", "price", "category", "image")
    .from("amazong_products")
    .whereNotNull("image")
    .then(result => {
      console.log(result);
    });
}
function mostPopularVideosForDays(days) {
  knexInstance
    .select("video_name", "region")
    .from("whopipe_video_views")
    .count("date_viewed AS views")
    //need instance.raw to input SQL as knex doesnt have timestamp
    /* 
  An extra security measure is to tell the raw method that the raw SQL contains user input. We used ?? to tell knex that this is the position in the raw SQL that will contain user input. We then specify the value for the user input as the second argument to .raw(). This is called a prepared statement */
    .where(
      "date_viewed",
      ">",
      knexInstance.raw(`now() - '?? days' :: INTERVAL`, days)
    )
    .groupBy("video_name", "region")
    .orderBy([
      //{column: 'region', order: 'ASC'},
      { column: "views", order: "DESC" }
    ])
    .then(result => {
      console.log(result);
    });
}
paginateProducts(2);

getProductsWithImages();

mostPopularVideosForDays(30);
