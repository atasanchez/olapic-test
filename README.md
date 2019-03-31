# Olapic Test

Front-End engineer test for olapic Inc, by Atahualpa Herrera.

Live demo: https://olapic-app.atasanchez.com/


## Prerequisites

This is the unique obligatory dependency for this project.

* Node 8.X


## Getting Started
This project is a monorepo, made with lerna. I recommend to use lerna for test this project.

> *This README use yarn for the examples, but you can use npm if you like.*

1) First, install base dependencies:

```
yarn
```

2) Install the dependencies of each project:

```
yarn bootstrap
```

3) Start the projects:

```
yarn dev
```

This will run a small node server in port 3000, and a React app in the port 9000.

4) Ready, it's over.

## Build the project

#### With lerna:

```
yarn build
```

## How to work this project?

This project has two apps, a API with Node/Express and a FrontEnd app in ReactJS. I had severals problems with CORS and SSL in the communication between React app and the endpoints, thus I implemented a small API for overcome these problems.

The communication work in this way: the node microservice work as a brich between React app and the endpoints of ISS and Geobytes, translating and unifying the answers of the endpoints in one simple to use for my React app and finally the app process this answer for show the data in the browser without the problems of CORS and SSL.

## How was this project deployed?

1) First, in my personal server configured two subdomains for the two apps.

2) I configured two new site in Nginx for serve the two apps.

3) With Git, I transfered the code to the server in a specific path.

4) In the root directory of the app, in the server:

```
yarn bootstrap
```

The command `yarn bootstrap` install all dependecies in each project.

```
yarn build
```

This command, run the npm script "build" in each project.

```
yarn start
```

Finally, run the npm script start in each project. Both projects are excecuted with PM2.

**NOTE: I use the npm scripts for automatize this process.**

> Of course, this process can be automatized with a tool of CI o a simple bash script, but in this case I prefer to keep the processes simple and focus on the quality of my code.