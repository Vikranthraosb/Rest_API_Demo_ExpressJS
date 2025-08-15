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
