# Scaphold Interview Starter Kit

This project provides a starter kit for Scaphold.io interview projects. The objective of the
interview is to introduce you to GraphQL and to see how you work with web services and cloud
providers.

The objective of your interview project is to create a simple GraphQL server that interfaces with
2 different data stores and is able to read & manipulate data in both. As a bonus, show how
you would correlate data between the two data sources. For example if you had a User table in SQL
with a columns id, username, and customerID that points to a customer in Stripe, I should be able to issue a query
like this:

```graphql
query {
  users {
    id
    username
    customer {
      id
      account_balance
    }
  }
}
```

# Objectives

## The main application

1) Create a simple GraphQL server
2) Connect atleast two different data sources. One should be a database such as MySQL, MongoDB, ElasticSearch, etc and one should be a web service such as Twilio, Stripe, Facebook, Soundcloud, Youtube etc. **Please do not spend any money on these! Use open-source or the AWS free tier to get a DB and the free/dev tier for the cloud services**
3) The GraphQL server should have a subset of CRUD operations for each data source.
4) Deploy the API publicly somewhere. This might be AWS, Heroku, or a server in your basement but we should be able to see the API.

## Bonus Points

1) As a bonus, correlate objects in the DB with object in the web service.
2) As another bonus, use [the dataloader library](https://github.com/facebook/dataloader) to create a per request cache and be able to discuss how and why this works.
3) Create an authentication mechanism. Preferably with JWTs.
4) Implement some pagination mechanism for your own DB or forward the pagination mechanism from the web service.

# Example

For more context, here is an example:

Create an application that allows users to create playlists out of Soundcloud songs. The application uses SQL to manage its user information and is also able to pull music from the soundcloud API. I should be able to run queries like this:


```graphql
# Create a user
mutation {
  createUser(input: { username: "Michael", password: "ABC" }) {
    id
    username
  }
}

# Read all users
query {
  users {
    id
    username
  }
}

# Read songs from soundcloud API
query {
  tracks {
    id
    title
    permalink
  }
}

# Bonus #1: I should be able to query like this
query {
  user {
    id

    # Tracks fetched directly from soundcloud that I have favorited or added etc.
    # This takes coordination between the core DB and Soundcloud API
    tracks {
      id
      title
      permalink
    }
  }
}

# Bonus #3: you should be able to login and get a JWT
mutation {
  loginUser(input: { username: "michael", password: "ABC" }) {
    token # To be used in the header for authenticating users
  }
}

# Bonus #4: implement pagination
# See relay pagination docs: https://facebook.github.io/relay/graphql/connections.htm#sec-Forward-pagination-arguments
query {
  users(first: 10, after: "some-cursor") {
    id
    username
  }
}
```

# A few thoughts

We recommend trying to finish the project in 2-3 hours. The goal is not to give you meaningless work, but is instead here to help us understand how well you grasp web technologies at a high level. This does not need to be a full application and you should try to touch as many of the objectives and bonuses as you can so that we can have a discussion about how you approached each one.

This project is also meant to be fun! You can use any DB & Web Service that you are interested in. Here is a [non-exhaustive list that you can use for reference](https://www.reddit.com/r/webdev/comments/3wrswc/what_are_some_fun_apis_to_play_with/). Think of this as a mini-hackathon where the reward is salary, ownership, and meaningful equity :)

Thanks for taking the time to complete this project! We really appreciate it!

# Installation

From the project directory run:

`npm install`

# Running

From the project directory run:

`npm start`
