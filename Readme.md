# REST API BASICS USING NODE.JS.

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

## 📜 Code

```javascript

require('dotenv').config();

const users = require("./MOCK_DATA.json");
const express = require('express');
const app = express();
const fs =require('fs')

app.get('/', (req, res) => {
    res.send("<h1>This is the Home Page.</h1>");
});

app.use(express.urlencoded({ extended: false })); 

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

app.post('/api/users', (req, res) => {
    const body =req.body;
    users.push({...body, id: users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
      return  res.json({ status: "success" });
    })
});

app.post('/api/users/:id', (req, res) => {
    return res.json({ status: "pending" });
});

app.patch('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index] = { ...users[index], ...req.body, id };

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
    if (err) return res.status(500).json({ error: "Failed to update user" });
    res.json({ status: "success", user: users[index] });
  });
});



app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
    if (err) return res.status(500).json({ error: "Failed to delete user" });
    res.json({ status: "success", message: `User ${id} deleted` });
  });
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
