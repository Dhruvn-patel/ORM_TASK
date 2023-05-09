const Joi=require('joi');


const validatemiddlware =async (req,res,next) => {

    const schema = Joi.object().keys({
        FirstName: Joi.string().required(),
        LastName:Joi.string().required(),
        email:Joi.string().email().required(),
        address:Joi.string().required(),
        contactNumber:Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
            'number.min': 'Mobile number should be 10 digit.',
            'number.max': 'Mobile number should be 10 digit'
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


module.exports={validatemiddlware}