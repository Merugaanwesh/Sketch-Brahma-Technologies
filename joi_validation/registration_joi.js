const joi = require("joi")

const registration_joi = new joi.object({
    "Email_id":joi.string().email().required(),
    "Password":joi.string().required().min(8).max(16),
    "First_name":joi.string().required(),
    "Last_name":joi.string(),
})
module.exports = {registration_joi}