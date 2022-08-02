const joi = require("joi");
let project_status_joi = new joi.object({
    "Email_id":joi.string().required(),
    "Project_id":joi.number().required(),
    "session_token":joi.string().required(),
    "Status":joi.string().required()

})

module.exports={project_status_joi}