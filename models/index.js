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

let test = new User;
console.log(test.validate());


module.exports = {
  db,
  Page,
  User
}
