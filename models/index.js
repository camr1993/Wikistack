const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  // Removes SQL from terminal output
  logging: false
});


// Page is naming the class. title, slug, etc are properties. Think about it
// like this:

// class Page {
//   constructor(arg1, arg2) {
//      this.property = property;
//   }
// }

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});


// beforeValidate hook automatically uses the title field to generate slug
// before any page instance is validated

// first argument of beforeValidate is the instance of page, we want to
// attach slug to this instance
Page.beforeValidate(page => {
  if (!page.slug) {
  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

// This adds methods to 'Page' such as '.setAuthor.' It also creates a foreign key attribute
// on the Page table pointing to the User table
Page.belongsTo(User, {as: 'author'});

module.exports = {
  db,
  Page,
  User
}
