const ArticlesService = require("../src/articles-service");
const knex = require("knex");

describe("Articles service object", function() {
  it("should run the tests", () => {
    expect(true).to.eql(true);
  });
});

let db;
//create test data
let testArticles = [
  {
    id: 1,
    date_published: new Date("2029-01-22T16:28:32.615Z"),
    title: "First test post!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?"
  },
  {
    id: 2,
    date_published: new Date("2029-01-22T16:28:32.615Z"),
    title: "Second test post!",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum."
  },
  {
    id: 3,
    date_published: new Date("2029-01-22T16:28:32.615Z"),
    title: "Third test post!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat."
  }
];
//before runs before any IT block
//before any test, make knex instance and connect to database
before(() => {
  db = knex({
    client: "pg",
    connection: process.env.TEST_DB_URL
  });
});
//truncate removes all data from table
before(() => db("blogful_articles").truncate());
//after each test runs in scope, remove table
afterEach(() => db("blogful_articles").truncate());
//after tests are all finished, disconnect from database
after(() => db.destroy());

context('Given "blogful_articles" has data', () => {
  beforeEach(() => {
    //add test articles to db being tested for each instance
    return db.into("blogful_articles").insert(testArticles);
  });

  it('getAllArticles() resolves all articles from "blogful_articles"', () => {
    return ArticlesService.getAllArticles(db).then(actual => {
      expect(actual).to.eql(testArticles);
    });
  });

  it("getById() resolves an article by id from blogful_articles", () => {
    const thirdId = 3;
    const thirdTestArticle = testArticles[thirdId - 1];
    return ArticlesService.getById(db, thirdId).then(actual => {
      expect(actual).to.eql({
        id: thirdId,
        title: thirdTestArticle.title,
        content: thirdTestArticle.content,
        date_published: thirdTestArticle.date_published
      });
    });
  });

  it("deleteArticle() removes article by id from blogful_articles", () => {
    const articleId = 3;
    return ArticlesService.deleteArticle(db, articleId)
      .then(() => ArticlesService.getAllArticles(db))
      .then(allArticles => {
        const expected = testArticles.filter(
          article => article.id !== articleId
        );
        expect(allArticles).to.eql(expected);
      });
  });

  it("updateArticle() updates article from blogful_articles", () => {
    const idOfArticleToUpdate = 1;
    const newArticleData = {
      title: "updated title",
      content: "updated content",
      date_published: new Date()
    };
    return ArticlesService.updateArticle(
      db,
      idOfArticleToUpdate,
      newArticleData
    )
      .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
      .then(article => {
        expect(article).to.eql({
          id: idOfArticleToUpdate,
          ...newArticleData
        });
      });
  });
});

context('Given "blogful_articles" has no data', () => {
  it("getAllArticles() resolves an empty array", () => {
    return ArticlesService.getAllArticles(db).then(actual => {
      expect(actual).to.eql([]);
    });
  });

  it("insertArticle() inserts an article and resolves the new article with an id", () => {
    const newArticle = {
      title: "Test title",
      content: "Test new content",
      date_published: new Date("2020-01-01T00:00:00.000Z")
    };
    return ArticlesService.insertArticle(db, newArticle).then(actual => {
      expect(actual).to.eql({
        id: 1,
        title: newArticle.title,
        content: newArticle.content,
        date_published: newArticle.date_published
      });
    });
  });
});
