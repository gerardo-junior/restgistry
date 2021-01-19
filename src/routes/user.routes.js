module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  /**
   * Retrieve all Users
   * @route GET /users
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.get("/", users.findAll);

  /**
   * Create a new User
   * @route POST /users
   * @group Operations about user
   * @returns {object} 200 - User created with success
   * @returns {Error}  default - Unexpected error
   */
  router.post("/", users.create);

  /**
   * Retrieve all public Users
   * @route GET /users/public
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.get("/public", users.findAllPublic);

  /**
   * Retrieve a single User with cpf
   * @route GET /users/$cpf
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.get("/:cpf", users.findOne);

  /**
   * Update a User with cpf
   * @route PUT /users/$cpf
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.put("/:id", users.update);

  /**
   * Delete a User with id
   * @route DELETE /users/$cpf
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.delete("/:id", users.delete);

  /**
   * Delete all Users
   * @route DELETE /users/$cpf
   * @group Operations about user
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
