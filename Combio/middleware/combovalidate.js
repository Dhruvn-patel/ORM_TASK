const Joi=require('joi');


const selectValidate =async (req,res,next) => {
     const option = Joi.object().keys({
        values: Joi.string().required()
      });

    const schema = Joi.object().keys({
        type: Joi.string().required(),
        name:Joi.string().required(),
        options:Joi.array().items(option).messages({
            "string.required": "option is required"
        })
    })
    const {error}=schema.validate(req.body,{abortEarly:false})  ;
    if(error)
    {
        const {details}=error;
        return res.status(404).json({error:details});
    }
    else
    {
        next()
    }
}


const showValidate =async (req,res,next) => {

   const schema = Joi.object().keys({
       type: Joi.string().valid('checkbox','radio','text','dropdown').required(),
       fields:Joi.string().required(),
   })
   const {error}=schema.validate(req.body,{abortEarly:false})  ;
   if(error)
   {
       const {details}=error;
       return res.status(404).json({error:details});
   }
   else
   {
       next()
   }
}


module.exports={selectValidate,showValidate}