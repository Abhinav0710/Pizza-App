# Pizza-App
This is a pizza app where customers can place orders and see the real-time status of pizza delivery.

# Features of the App
* Customers need to register first using their name, email and set a password.![pizza1](https://user-images.githubusercontent.com/47085868/126479870-cc5d9813-c800-4576-8e65-27a269ae8083.PNG)
* Customers can add their orders which would be visible in the cart.![Order being placed by user](https://user-images.githubusercontent.com/47085868/126481420-ab8561a2-c9d1-4189-84e0-e32fd65a17a1.PNG)
* In the cart page, they need to give the address and their phone no.Then they can place the order.
* The order would be visible in the order page along with previous orders(if any).![Various orders by a user](https://user-images.githubusercontent.com/47085868/126481084-89de0298-e25e-42d5-8659-78448ea3c28a.PNG)
* The admin would be simutaneously notified about the new orders being placed.![Order visible to admin](https://user-images.githubusercontent.com/47085868/126480186-957cf553-1986-4264-a28c-2dd6e4e0eb11.PNG)
* Admin would be able to set the status of order which would be visible to the customer for that particular order.

# Tech Stack used

* Nodejs
* Express
* MongoDb Atlas
* Laravel mix
* EJS

# Important node modules used

* Axios -- For ajax requests
* Express --for creating various routes
* EJS-- Creating the front-end.
* Laravel mix-- compiling and optimising assets
* Mongoose-- for creating the models
* Noty -- For the notifications
* Passport -- For authentication
* Socket.io -- For realtime environment

# To run the app in nodejs
Use "node run dev" to run the nodemon
Use "node run watch" to build the assests using laravel-mix.
To learn more read the scripts in package.json

# For running the live model
Navigate to URL http://localhost:3300
