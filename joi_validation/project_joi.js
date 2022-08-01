const joi = require("joi");
let project_joi = new joi.object({
    "Project_name":joi.string().required(),
    "Project_description":joi.string(),
    "Email_id":joi.string().email().required(),
    "session_token":joi.string().required(),

})

module.exports={project_joi}