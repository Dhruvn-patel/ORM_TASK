const db = require('../models');
const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const {Selectmaster,Optionmaster}=db

/** user enter name  and  values */
const generateComboController = async (req, res) => { 

   try {
    const {name,type,options}=req.body;
    console.log(name,options);
    const user = await Selectmaster.create({
          name,
          type,
          Optionmasters:options
        },{
            include:[Optionmaster]
        });
    return res.status(200).json(user);
   } catch (error) {
      console.log(error.message);
      return res.status(404).json({message: error.message});
   }
}

const displayController=async(req, res) => {
try {
  const {type,fields} = req.body;
  console.log(type ,fields);
  const selectData=await Selectmaster.findAll({
    attributes:['id','name'],
    where: {name: fields}
  });

  const referenceData=await Optionmaster.findAll({
    attributes:['values'],
    where: {
      state_id: selectData[0].dataValues.id
    }
  });
  let optionvalue = [];

  referenceData.forEach((element) => {
    optionvalue.push(element.values);
  });
  console.log(optionvalue);

  let dataform = "";

  if (type == "radio" || type == "checkbox") {
    optionvalue.forEach((element) => {
      dataform += `${element}:<input type="${type}" name="${element}" id="${element}"><br>`;
    });
  }

  if (type == "dropdown") {
    dataform += `<select name="${fields}" id="${fields}">`;

    optionvalue.forEach((element) => {
      dataform += `<option value="${element}">${element}</option><br>`;
    });

    dataform += `</select>`;
  }
 return res.render('index',{dataform, optionvalue})


} catch (error) {
  console.log(error.message);
  return res.status(404).json({message: error.message});
}

}

const updateController=async(req, res) =>{

  try {
  const select_id=parseInt(req.params.id);
  const {name,type} = req.body;
  const findValues = await Selectmaster.update({
   name:name,
   type:type,
  },
  {
    where:{
      id:select_id,
    }
  })


  const alldata = await Optionmaster.findAll({
    where: {
      state_id: select_id,
    },
  });

  return res.status(200).json({message:"update success"})
  } catch (error) {
      console.log(error.message);
      return res.status(404).json({message: error.message});
  }
 
}


const dataFieldsController=async(req,res) =>{
  const selectData=await Selectmaster.findAll({
    attributes:['name']
  });
  const listFeilds=[];
  selectData.forEach((data) => {
    listFeilds.push(data.name);
  })

// return res.status(200).json(listFeilds);
return res.render('data',{listFeilds})

}

const deleteDataController=async(req,res) =>{
  const optionId=parseInt(req.params.id);
 await Optionmaster.destroy(
  {
    where:{id:optionId}
  }
  )

  return res.status(200).json({message:`${optionId} is deleted`});
}
module.exports = { generateComboController,displayController,updateController,dataFieldsController ,deleteDataController}