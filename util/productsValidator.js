const Ajv = require('ajv');


const ajv = new Ajv();

const productSchema = {

    id:{
        type: "integer",
        minimum: 1
    },

    title:{
        type: "string",
        minLength: 1,
        maxLength: 30
    },
    price:{
        type: "number",
        minimum: 1,
    },
    description:{
        type: "string",
        maxLength: 200
    },
    category:{
        type: "string",
    },
    image:{
        type: "string"
    },
    rating:{
        type: "object",
        properities:{
            rate:{
                type: "number"
            },
            count:{
                type: "integer"
            },
            required: [rate, count]
        }
    },
    minProperties: 4, 
    maxProperties: 7,
    required: [id, title, price, description]

}


module.exports = ajv.compile(productSchema);