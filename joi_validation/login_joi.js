const joi = require("joi")
const login_joi = new joi.object({
    "Email_id":joi.string().required(),
    "Password":joi.string().required().min(8).max(16),
})

const input_schema = new joi.object({
    token:joi.string().required()
})
module.exports={
    login_joi,
    input_schema

}
