[![Build Status](https://travis-ci.org/PascalUlor/politico-app.svg?branch=develop)](https://travis-ci.org/PascalUlor/politico-app) [![Coverage Status](https://coveralls.io/repos/github/PascalUlor/politico-app/badge.png?branch=develop)](https://coveralls.io/github/PascalUlor/politico-app?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b7f72eb60c31a3b328bf/maintainability)](https://codeclimate.com/github/PascalUlor/politico-app/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b7f72eb60c31a3b328bf/test_coverage)](https://codeclimate.com/github/PascalUlor/politico-app/test_coverage)


# POLITICO

**POLITICO** is a is a fullstack javascript enables citizens give their mandate to politicians running for different government offices
while building trust in the process through transparency.


<br />
<br />
<img width="1000" height="400" alt="politico-app-screenshot" src="/screenshot/home2.PNG">
<img width="1000" height="400" alt="politico-app-screenshot" src="/screenshot/homeland.PNG">
<img width="1000" height="400" alt="politico-app-screenshot" src="/screenshot/homedrop.PNG">
<img width="200" height="400" alt="politico-app-screenshot" src="/screenshot/hprof2.PNG"> <img width="200" height="400" alt="politico-app-screenshot" src="/screenshot/homemobile.PNG">
<img width="1000" height="400" alt="politico-app-screenshot" src="/screenshot/newmodal.PNG">
<img width="1000" height="400" alt="politico-app-screenshot" src="/screenshot/part2table.PNG">

<br />


# Table Of Content
1. [Getting Started](#getting-started "Getting Started")
   ..*[prerequisites](#prerequisites "Prerequisites")
   ..*[Installation](#installation "Installation")
2. [Technology Stack](#technology-stack)
   ..* [Dependencies](#dependencies)
2. [Features](#features "Features")
3. [Built With](#built-with "Built With")
4. [Deployment](#deployment "Deployment")
5. [Useful Links](#author "Useful Links")
6. [Acknowledgment](#acknowledgment "Acknowledgment")


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Prerequisites

To get started with this project you need a basic knowledge of :

```
Javascript (ES6)
NodeJs
SQL (Postgres)
Version Control (Git)
```

### Installation
The follwing instructions will install the project on your local machine

```
1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**Postgres**](https://www.postgresql.org/) .
3. Clone the [**repository here**](https://github.com/PascalUlor/politico-app.git)
4. [**cd**] into the root directory of the project.
5. Run `npm install` on the terminal to install Dependecies and Dev-Dependecies
```

## Technology Stack
**UI & Templates**
1. HTML & CSS
2. Javascript

**Server Side**
1. NodeJS
2. Express

**Client Side**
1. Javascript

### Dependencies
* Postgres
* Node


## Features
The user interface is built for easy navigation and use of the application. It includes the following:

1. The users should be able to vote.
3. Users can create an account and log in.
2. The users should be able to register as candidate.
4. The admin should be able to view all users
5. The user can view election result

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will be pre-seeded into the application with administrative priviledges


## Deployment
This Application will be deployed on [Heroku Deploy](https://the-politico.herokuapp.com/)

## Useful Links

1. [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2238882)
2. [Github Repo](https://github.com/PascalUlor/politico-app)
3. [GH-PAGES](https://pascalulor.github.io/politico-app/)


## Acknowledgment
- Andela