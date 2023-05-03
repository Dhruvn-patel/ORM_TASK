const db = require('../models');
const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const { faker } = require('@faker-js/faker');
const User = db.User;
const Employee = db.Employee;
const Photo = db.Photo;
const userController = async (req, res) => {
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


    const data = await Photo.findAndCountAll({
        offset: parseInt(start),
        limit: parseInt(length),
        order: [orderBy],
        where: {
            [Op.or]: [
                {
                    '$User.firstName$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$User.lastName$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    '$User.email$': {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                , {
                    Name: {
                        [Op.like]: `${searchValue}%`,
                    }
                },
                {
                    url: {
                        [Op.like]: `${searchValue}%`,
                    }
                }
            ],

        }

        ,
        include: [{
            model: User,
            // as: 'Photo',
            attributes: ['firstName', 'lastName', 'email'],

        }],
    });
    // console.log(data);


    // data.forEach(e => {
    //     console.log(e.Name, e.url);
    // });
    res.json({
        draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows
    });

}


const oneToneDataTableControlller = async (req, res) => {
    const draw = req.query.draw;
    const start = req.query.start;
    const length = req.query.length;
    let order = req.query.order;
    const search = req.query.search;
    const searchValue = search.value;
    let columns = req.query.columns;
    let ordertable;
    if (order) {
        let orderCol = order[0].column;
        let orderDir = order[0].dir;
        // console.log("columns", columns);
        // console.log("orderColumns", orderCol);
        let orderBy = columns[orderCol].data;
        console.log(orderBy);
        let orderSplit = orderBy.split(".");
        console.log("orderby", orderBy);
        let orderByModelName = orderSplit[0];
        let orderByCol = orderSplit[1];
        console.log("Model Name", orderByModelName);
        console.log("Col Name", orderByCol);
        console.log(slice);
        if (orderByModelName == "Employee") {
            ordertable = ["Employee", orderByCol, orderDir];
        } else {
            ordertable = [orderBy, orderDir];
        }
    }
    else {
        ordertable = ["id"]
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
                require: true,
                attributes: ['position', 'office', 'startDate', 'salary']
            }
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        order: [ordertable],
    });

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

module.exports = { showDataController, userController, addDataController, paginationController, oneToneDataTableControlller }