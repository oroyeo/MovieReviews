# MovieReviews

## Description
A Movie Review web application that allows for users to register, login, and rate pre-existing movies. 

This application was built for ACIT 2520 - Developing Web Applications.

## Technologies Used

**Built Using:**
  - Node.JS
  - MongoDB
  - HTML
  - EJS

## Installation

**_Required_**

[NodeJS](https://nodejs.org/en/)
[MongoDB](https://www.mongodb.com/try/download/community)

**_Dependencies_**

Install EJS by navigating to app.js folder and running `npm install express --save`

## Usage

Before we begin, you'll need to enter some data into your Database. 

Create a database by navigating to your MongoDB bin folder (x.x is the version number). 

For Windows `C:\Program Files\MongoDB\Server\x.x\bin`


Next type the following commands:

```
mongod
mongo
use testdb
```


Below we will be adding some data to our database:

```
db.movies.insert(
    [
        { _id:1, movieName:'It 2' },
        { _id:2, movieName:'Casino Royale'  },
        { _id:3, movieName:'Akira' },
        { _id:4, movieName:'Insidious 2'  },
    ]
)
```

Next, use your shell to navigate to the app.js folder again and enter `node app.js`.

You can now write your own reviews by accessing `localhost:1337`. 

All reviews are viewable by any user, however you need to register and login to write and edit your reviews.
