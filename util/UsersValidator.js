const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "name":{
            "type":"string",
            "pattern":"^[A-Za-z]+$"
        },
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
            "minLength":5
        },
        "isAdmin":{
            "type":"boolean"
        }
    },
    "required":["name", "email", "password"]
}


module.exports = ajv.compile(schema);