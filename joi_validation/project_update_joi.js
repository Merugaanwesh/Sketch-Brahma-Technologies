const joi = require("joi");
let project_update_joi = new joi.object({
    
    
    "Project_id":joi.number().required(),
    "Email_id":joi.string().required(),
    "session_token":joi.string().required(),
    "Project_name":joi.string(),
    "Project_description":joi.string(),

})

module.exports = {project_update_joi}