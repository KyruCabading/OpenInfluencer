# OpenInfluencer

Learning project: HTML5 website built on a MongoDB using ExpressJS complete with RESTful API routing with Authentication features using PassportJS. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See running locally for notes on how to deploy the server locally on your machine.

### Prerequisites

1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. [Node](https://nodejs.org/en/)
1. MongoDB: See [MongoDB Installation Documentation](https://docs.mongodb.com/manual/installation/)
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [OpenInfluencer repo](https://github.com/KyruCabading/OpenInfluencer) on your local machine

### Installation

1. `cd OpenInfluencer` to go into the project root
1. `yarn` to install the websites npm dependencies
1. `nano .bash_profile` to create a local .bash_profile
1. Add PORT & IP values in your .bash_profile
```
IP = "127.0.0.1"
PORT = 8080
```
1. `control + x`, `y`, `enter` to save your profile
1. `source .bash_profile` to load your settings

### Running locally

1. `cd OpenInfluencer` to go into the project root
1. `node app.js` to start the node server.
1. open http://localhost:8080 to open the site in your favorite browser

## Built With

* [mongoDB](https://www.mongodb.com/) - database
* [express](https://expressjs.com/) - web application framework
* [node](https://nodejs.org/en/) - server framework
* [Bootstrap](https://getbootstrap.com/) - css framework
* [Passport.js](http://www.passportjs.org/) - authentication framework
* [body-parser](https://www.npmjs.com/package/body-parser) - body parsing middleware

## Contributing

#### Create a branch

1. `git checkout master` from any folder in your local `OpenInfluencer` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

## Authors

* **Kyru Cabading** [KyruCabading](https://github.com/KyruCabading)

See also the [baby contributor](https://web.facebook.com/JanaVacaro) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
