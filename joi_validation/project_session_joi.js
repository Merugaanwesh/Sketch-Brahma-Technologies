const joi = require("joi")
const project_session_joi  = new joi.object({
    "Email_id":joi.string().email().required(),
    "session_token":joi.string().required(),
    "Project_id":joi.number()
})
module.exports={project_session_joi}