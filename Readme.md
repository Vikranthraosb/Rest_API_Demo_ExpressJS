# REST API Learning

## Some examples of HTTP methods

On the same page, we can send different data for the same HTTP method for best practices. Example:

* **GET /users** - List all users  
  - When the client is sure to be a browser, return data in HTML form.  
* **GET /api/users** - List all users  
  - When the client can be React, or other clients, send data in JSON. They will render it how they want.  
* **GET /users/1** - Get user with specific ID  
* **GET /users/2** - Get user with specific ID  
  - So we make the path: `/api/users/:id`

* **POST /api/users** - Create new user  
* **PATCH /api/users/:id** - Edit the user with specific ID  
* **DELETE /api/users/:id** - Delete the user with specific ID

# REST API Demo

A simple REST API demo built with Node.js and Express, showcasing basic CRUD operations.  
Perfect for beginners to understand API fundamentals.

## 📜 Code

```javascript
require('dotenv').config();

const users = require("./MOCK_DATA.json");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>This is the Home Page.</h1>");
});

// Creating the actual API
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const HTML = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(HTML);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
});

app.post('/api/users/:id', (req, res) => {
    return res.json({ status: "pending" });
});

app.patch('/api/users/:id', (req, res) => {
    return res.json({ status: "pending" });
});

app.delete('/api/users/:id', (req, res) => {
    return res.json({ status: "pending" });
});

app.listen(process.env.PORT, () => {
    console.log(`app is listening on ${process.env.PORT}`);
});

// since /api/users/:id has the same path for different HTTP requests,
// we can also write this as:

// app.route("/api/users/:id")
//     .get((req, res) => {
//         console.log("this is get request");
//     })
//     .post((req, res) => {
//         console.log("this is post request");
//     })
//     .patch((req, res) => {
//         console.log("this is patch request");
//     })
//     .delete((req, res) => {
//         console.log("this is delete request");
//     });
