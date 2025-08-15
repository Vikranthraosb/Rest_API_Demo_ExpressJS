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
