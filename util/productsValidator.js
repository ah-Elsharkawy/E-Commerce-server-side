const Ajv = require('ajv');


const ajv = new Ajv();

const productSchema = {
    "type": "object",
    "properties":{
        "id":{
            "type": "integer",
            "minimum": 1
        },
    
        "title":{
            "type": "string",
            "minLength": 1,
            "maxLength": 30
        },
        "price":{
            "type": "number",
            "minimum": 1,
        },
        "description":{
            "type": "string",
            "maxLength": 200
        },
        "category":{
            "type": "string",
        },
        "image":{
            "type": "string"
        },
        "rating":{
            "type": "object",
            "properties":{
                "rate":{
                    "type": "number"
                },
                "count":{
                    "type": "integer"
                },
                
            },
            "required": ["rate", "count"]
        },
    },
    minProperties: 4, 
    maxProperties: 7,
    "required": ["id", "title", "price", "description"]
}


module.exports = ajv.compile(productSchema);







/* const productSchema = {
    "type": "object",
    "properties":{
        "id":{
            "type": "integer",
            "minimum": 1
        },
    
        "title":{
            "type": "string",
            "minLength": 1,
            "maxLength": 30
        },
        "price":{
            "type": "number",
            "minimum": 1,
        },
        "description":{
            "type": "string",
            "maxLength": 200
        },
        "category":{
            "type": "string",
        },
        "image":{
            "type": "string"
        },
        "rating":{
            "type": "object",
            "properties":{
                "rate":{
                    "type": "number"
                },
                "count":{
                    "type": "integer"
                },
                
            },
            "required": ["rate", "count"]
        },
    },
    minProperties: 4, 
    maxProperties: 8,
    "required": ["id", "title", "price", "description"]
} */