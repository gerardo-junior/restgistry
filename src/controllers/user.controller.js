const db = require("../models")
,     User = db.users
,     Op = db.Sequelize.Op
,     Validator = require('validatorjs');

// Create and Save a new User
exports.create = async (req, res) => {
  
  let data = req.body
  
  let rules = {
    name: 'required',
    email: 'required|email',
    cpf: 'min:11|max:11',
    job: 'required',
    zipcode: 'required'
  };
  
  let validation = new Validator(data, rules);
  
  // Validate request
  if (!validation.passes()) {
    res.status(400).send(validation.errors);
    return;
  }

  // check if exists zipcode on database
  if (await User.count({ where: [{ 'address.zipcode' : data.zipcode }]})) {
    res.status(400).send('{"error": "Address already registered with another user"}');
    return;    
  }
  
  // zipcode serach
  data.address = await require('../services/ziprest').resolver(data.zipcode)

  console.log(data.address)

  if (!data.address) {
    res.status(400).send('{"error": "zipcode not found"}');
    return;
  }
  
  delete data.zipcode

  // Save User in the database
  User.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an cpf
exports.findOne = (req, res) => {
  const cpf = req.params.cpf;

  User.findByPk(cpf)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with cpf=" + cpf
      });
    });
};

// Update a User by the cpf in the request
exports.update = (req, res) => {
  
  let cpf = req.params.cpf
  ,   data = req.body
  
  let rules = {
    email: 'email',
  };
  
  let validation = new Validator(data, rules);
  
  // Validate request
  if (!validation.passes() || cpf === '') {
    res.status(400).send(validation.errors);
    return;
  }

  User.update(data, {
    where: { cpf: cpf }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with cpf=${cpf}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with cpf=" + cpf
      });
    });
};

// Delete a User with the specified cpf in the request
exports.delete = (req, res) => {
  const cpf = req.params.cpf;

  User.destroy({
    where: { cpf: cpf }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with cpf=${cpf}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with cpf=" + cpf
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// find all public User
exports.findAllPublic = (req, res) => {
  User.findAll({ where: { public: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
