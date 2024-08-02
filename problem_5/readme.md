# CRUD server

## Description

Example server using expressjs, TS and MongoDB

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

run with nodejs

1. require install Nodejs
2. npm i
3. npm start
4. url of api => http://localhost:3000/

---

run with docker

1. require install Docker
2. docker build -t my-app .
3. docker run -d -p 3000:3000 --name my-running-app my-app
4. url of api => http://localhost:3000/

## Usage

You should import the file postman to more detail each api.

API supported:

1. Get coins:[GET] http://localhost:3000/api/coins
2. Get detail coin:[GET] http://localhost:3000/api/coins/:coinCode
3. Create a coin:[POST] http://localhost:3000/api/coins
4. Update a coin:[PATCH] http://localhost:3000/api/coins/:coinCode
5. Delete a coin:[DELETE] http://localhost:3000/api/coins/:coinCode
