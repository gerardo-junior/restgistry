module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    job: {
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
    public: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};
