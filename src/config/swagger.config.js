const package = require('../../package.json');

module.exports = {
    swaggerDefinition: {
        info: {
            description: package.description,
            title: package.name,
            version: package.version,
        },
        basePath: '/api',
        produces: [
            "application/json"
        ],
        consumes : [
            "application/json"
        ],
    },
    basedir: './', //app absolute path
    files: ['./src/routes/**/*.js'] //Path to the API handle folder
}