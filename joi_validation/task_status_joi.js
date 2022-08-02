const joi = require("joi");
let task_status_joi = new joi.object({
    "Email_id":joi.string().required(),
    "Project_id":joi.number().required(),
    "session_token":joi.string().required(),
    "Task_id":joi.number().required(),
    "Status":joi.string().regex(/^(Completed|inprograss)$/).required()

})

module.exports={task_status_joi}