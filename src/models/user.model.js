module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING, 
      unique: true, 
      allowNull: false
    },
    cpf: {
      type: Sequelize.STRING, 
      primaryKey: true
    },
    address: {
      type: Sequelize.JSON
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
