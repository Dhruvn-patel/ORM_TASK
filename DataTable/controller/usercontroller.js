const db = require('../models');
const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const { faker } = require('@faker-js/faker');
const {User,Employee,Photo} = db;
const {addDataFunction} = require('../repository/addata.repository');
const userController = async (req, res) => {
    // console.log('Hello from UserController');
    return res.render('totaldata')
}

const addDataController = async (req, res) => {
    try {
        let data;
        for(let i = 0; i <10;i++) {
           data= await addDataFunction({
                firstName:faker.name.firstName(),
                lastName: faker.name.lastName(),
                 email: faker.internet.email(),
                 position: faker.name.jobType(),
                  office: faker.address.country(),
                   startDate: faker.date.recent(),
                  salary: faker.datatype.number({
                    min: 50000
                 }),
                 Name: faker.vehicle.manufacturer(),
                 url: faker.image.abstract()     
            })
        }
       return  res.status(200).json(data);

    } catch (error) {
        console.log(error.message);
    }
}


const showDataController = async (req, res) => {
    return res.render('index');
}

module.exports = { showDataController, userController, addDataController}