const db = require('../models');
const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const { faker } = require('@faker-js/faker');
const User = db.User;
const Employee = db.Employee;
const Photo = db.Photo;
const UserController = async (req, res) => {
    // console.log('Hello from UserController');

    return res.render('Totaldata')
}

const addDataController = async (req, res) => {
    let arr = [];
    let emp = [];
    let photo_arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(new Object({
            firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email()
        }))
    }
    const data = await User.bulkCreate(arr);
    data.map((data) => {

        if (data && data.id) {
            emp.push(new Object({
                position: faker.name.jobType(), office: faker.address.country(), startDate: faker.date.recent(), salary: faker.datatype.number({
                    min: 50000
                }), user_id: data.id

            }))

            photo_arr.push(
                new Object({
                    Name: faker.vehicle.manufacturer(), url: faker.image.abstract(), user_id: data.id
                })
            )
        }
    })
    const empData = await Employee.bulkCreate(emp);
    const photoData = await Photo.bulkCreate(photo_arr);


    return res.status(200).json(data)
}

const paginationController = async (req, res) => {

    const draw = req.query.draw;
    const start = req.query.start;
    const length = req.query.length;
    var order = req.query.order;



    const search = req.query.search;
    const searchValue = search.value;
    console.log(searchValue);


    if (order) {
        var column = order[0].column;
        var dir = order[0].dir;
        var colName = req.query.columns[column].data;
        console.log("column", column);
        console.log("dir", dir);
        console.log(colName);
        var orderBy = [[colName, dir]];
    } else {
        var orderBy = ["id"];
    }
    const data = await User.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    lastName: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    email: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                , {
                    '$Photo.Name$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$Photo.url$': {
                        [Op.like]: `${searchValue}%`,
                    }
                }
            ],

        },
        include: [{
            model: Photo,
            as: 'Photo',
            attributes: ['Name', 'url'],
        }]
        ,
        offset: parseInt(start),
        limit: parseInt(length),
        order: [orderBy],

    });
    // console.log(data);
    res.json({
        draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows
    });

}


const jqueryDataController = async (req, res) => {


    const draw = req.query.draw;
    const start = req.query.start;
    const length = req.query.length;
    var order = req.query.order;



    console.log("draw", draw);
    console.log("start", start);
    console.log("length", length);
    console.log("order", order);


    const search = req.query.search;
    const searchValue = search.value;
    console.log(searchValue);


    if (order) {
        var column = order[0].column;
        var dir = order[0].dir;
        var colName = req.query.columns[column].data;
        console.log("column", column);
        console.log("dir", dir);
        console.log(colName);
        var orderBy = [[colName, dir]];
    } else {
        var orderBy = ["id"];
    }
    const data = await User.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    firstName: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    lastName: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    email: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$Employee.position$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$Employee.office$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$Employee.startDate$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$Employee.salary$': {
                        [Op.like]: `${searchValue}%`,
                    }
                }
            ],


        },
        include: [
            {
                model: Employee,
                // as: 'Employee',
                attributes: ['position', 'office', 'startDate', 'salary']
            }
        ]
        ,
        offset: parseInt(start),
        limit: parseInt(length),
        order: [orderBy],


    });
    // console.log(data);
    res.json({
        draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows
    });
}

const showDataController = async (req, res) => {
    return res.render('index');
}

module.exports = { showDataController, UserController, addDataController, paginationController, jqueryDataController }