# Node.js + Mongodb Rest API Boilerplate

## Structure

### package.json
Contains all the dependencies and dev-dependencies

### index.js
Sets up mongodb server and starts node.js server for the specified port

### test/
Folder for test scripts

### config/
Directory Structure
  - env
    - all.js
    - dev.js
    - prod.js
    - stage.js
    - test.js
  - config.js
  - cors.js
  - express.js
  - init.js
  - morgan.js
  - winston.js

NODE_ENV (values) = `test` , `dev`, `stage`, `prod`

* `env/` folder contains environment based config for all environments
* `config.js` Combines all the configs and ahs functions for globbing files
* `cors.js` For settings cors policies
* `express.js` For Configuring Express server which gets used in index.js in root of project
* `init.js` Has function to get env files
* `morgan.js` & `winston.js` For Logging

### app/
Directory Structure

- app
  - controllers
    - module
      - module.controller.js
  - dbo
    - module
      - module.dbo.js
  - middlewares
    - authentication.middleware.js
    - authorization.middleware.js
  - models 
    - module
      - module.model.js
  - routes
    - module
      - module.routes.js
  - utils
    - authCodes.js
    - bcrypt.js
    - jwt.js
    - responses.js
    - sendgrid.js


Note: This is just for reference. You dont need to follow everything here. You can change directory structure if you don't like. You can add utilities files. (You can do anything as long as the code works :D )
