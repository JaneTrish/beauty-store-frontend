# Beauty Store
Welcome to my PERN-stack e-commerce application.

You can check out the project here: https://beaty-store.herokuapp.com/.   
A link to the API docs is here: https://beauty-ecommerce-api.herokuapp.com/

## Stack
Front-end is build with **ReactJS**.
The back-end of the application is Node framework **Express.js**, connected to the **PostgreSQL** database management system.

## Functionality

1. Users can view a list of products, filter and sort it. Each product has its separate page with a more detailed info. Users can add products to their cart and manipulate the cart . No authentication for these actions required.
2. A user can register, view their profile, make changes to their profile or delete it (GET, POST, PUT and DELETE).
3. Only authenticated users are able to place orders. 

## Features
1. Frontend data is managed with React Context API.
2. Styled-components library is used for styling the application (https://styled-components.com/).
3. Custom user authentication built with a JWT bearer token ('jsonwebtoken' npm package https://www.npmjs.com/package/jsonwebtoken). 
4. Most of the routes check user authentication and authorization.
5. Users' passwords are hashed and salted with bcryptjs npm package (https://www.npmjs.com/package/bcryptjs).
6. Server is connected to the database through node-postgres client (https://www.npmjs.com/package/pg).

### Future developments of the project

-add authentication with Google/Facebook/Twitter   
-connect to a payment gateway
