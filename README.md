# **App Documentaion**

## Overview

basic E_Commerce app that implements CRUD operations, authentication and authorization.

## Technologies Used

* NodeJs
* ExpressJs
* MongoDB
* JSON Web Token(JWT)

## Installation

* [NodeJS](https://nodejs.org/en/download)
* [MongoDB](https://www.mongodb.com/try/download/community)
* express and other dependecies can be installed using:

```text
npm install
```

```json
"dependencies": {
    "ajv": "^8.12.0",
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.9.0",
    "nodemon": "^2.0.20",
    "validator": "^13.9.0"
  }
```

## API Endpoints

### Authentication

* `POST /login`: This endpoint is used to log in a user with their credentials and returns a JWT token in the response header `x-auth-token`.

* `POST /users/register`: This endpoint is used to register a new user with their details and hashing the password before storing in the database.

### Authorization 

* `PUT /admin/:id`: This endpoint is used to modify the authorization of a user (make him admin) ... only admins are authorized to use this endpoints.

### Products

* `GET /products`: This endpoint is used to get all the products.
* `GET /products/:id`: This endpoint is used to get a single product by its ID.
* `POST /products`: This endpoint is used to create a new product. Only admin users can access this endpoint.
* `PUT /products/:id`: This endpoint is used to update a single product by its ID. Only admin users can access this endpoint.
* `DELETE /products/:id`: This endpoint is used to delete a single product by its ID. Only admin users can access this endpoint.

## App structure

The App uses MVC(Model-View-Controller) pattern for implementing the endpoints:

### Model

```text
The model is the layer that encapsulates the data of the application and defines the behavior that governs how data can be accessed and manipulated.:
```

* Product model:

```javascript
let RatingSchema = mongoose.Schema({
    rate: Number,
    count: Number
})

let ProductSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: RatingSchema,
})
```

* User model:

```javascript
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return valid.isEmail(val);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    isAdmin:{
        type: Boolean
    }
})
```

both models follows the proprties specified for each attribute of the model, unfollowing these constraints will result in not modifying the database.

### Middlewares

```text
Middleware is a function that has access to the HTTP request and response objects and can modify or perform operations on them including terminating the request, responsing or passing it to the next middelware in the chain.
```

This app uses middelwares for two reasons:

* Data validation: validating the request body before using it for adding or updating products, ex:

```javascript
module.exports = (req, res, next) => {
    let valid = validator(req.body);
    if(valid){
        next();
    }
    else{
        res.status(403).send("forbidden");
    }
}
```

* Users permissions: check if the user is authorized for this kind of actions, ex: 

```javascript
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied..");

    try{
        const decodePayload = jwt.verify(token, "secretkey");
        if (!decodePayload.adminRole) return res.status(401).send("not authorized");
        next();
    }
    catch(err){
        res.status(400).send("Invalid token")
    }
}
```

then we use the middelware in the middelwre chain in the route to take its actions on the request, ex:

```javascript
router.post("/", auth, controller.addProduct)
```

the middleware in the above example is auth that checks if the user is authorized to do the action or not, if so the auth middleware passes the request to the controller and add the product.

### Controller

```text
the controller is responsible for handling user requests, processing input data, and updating the model and view accordingly. It acts as an intermediary between the model and the view
```

This app uses the controller with most cases but not all, examples:

* with controller: we give the callback function to the route of the request route without implementation and implemet it in another file for better code structure.

  * the route:

    ```javascript
    router.delete("/:id", auth, controller.deleteProductById)
    ```

  * the controller:

    ```javascript
    let deleteProductById = async (req, res) =>{
        try{
            let p = await Product.findOneAndDelete({id: req.params.id});
            res.send(p);
        }
        catch(err){
            res.send(err);
        }
    }
    ```

* without controller: we give the callback function to the route of the request route with the implementation.

```javascript
router.put("/:id", auth, (req, res) => {
        User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true}, function(err, data){
        if(!err){
            if(data){
                res.status(200).send("User is set to admin");
                console.log("user is set to admin");
            }
            else{
                res.status(400).send("User not found");
                console.log("user not found");

            }
        }
        else{
            res.status(500).send("internal serverr error");
            console.log("internal error");

        }
    })
})
```

## Athentication and Authorization

* the App uses basic authentication that requires users to provide email and password to obtain their JWT.
* the app uses JSON Web Token(JWT) for Authorization, it's sent only after the user is authenticated(logged in) ... the token has no expiration.

## Error Handling

The app provides error responses for various scenarios such as invalid requests, unauthorized access, and server errors. The error response follows a standardized format and contains a message field that describes the error.

## Known issues

The issue is while updating the product there is no body validation for the request before updating, though the product won't be updated because it conflicts with the product model created for the database but it will raise unhandled error.

## Workaround

the issue is simple and can be fixed easily by validating the reqest body but if we want a workaround we just have to follow the pattern we used while adding a new product.

## Conclusion

This is a simple backend app to practice common concepts of backend that implements CRUD operations, authentication, and authorization. It provides RESTful endpoints for clients to access the resources. The app uses Node.js, Express.js, MongoDB and JWT.