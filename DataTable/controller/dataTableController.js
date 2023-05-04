const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const { faker } = require('@faker-js/faker');


const db = require('../models');
const { appendFile } = require('fs');
const User = db.User;
const Employee = db.Employee;
const Photo = db.Photo;
const oneToManyController = async (req, res) => {
    const draw = req.query.draw;
    const start = req.query.start;
    const length = req.query.length;
    let order = req.query.order;
    const search = req.query.search;
    const searchValue = search.value;
    let columns = req.query.columns;
    let ordertable;
    let orderCol = order[0].column;
    let orderDir = order[0].dir;
    let orderBy = columns[orderCol].data;
    console.log(orderBy);
    let orderSplit = orderBy.split(".");
    console.log("orderby", orderBy);
    let orderByModelName = orderSplit[0];
    let orderByCol = orderSplit[1];
    console.log("Model Name", orderByModelName);
    console.log("Col Name", orderByCol);

    if (orderByModelName == "Photos[]") {
        ordertable = ["Photos", orderByCol, orderDir];
    } else {
        ordertable = [orderBy, orderDir];
    }
    const data = await User.findAndCountAll({
        offset: parseInt(start),
        limit: parseInt(length),
        order: [ordertable],
        include: [{
            model: Photo,
            // as: 'Photo',
            attributes: ['Name', 'url'],
            require: true,

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
        }],
    });

    res.json({
        draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows
    });

}

const oneToneControlller = async (req, res) => {
    const draw = req.query.draw;
    const start = req.query.start;
    const length = req.query.length;
    let order = req.query.order;
    const search = req.query.search;
    const searchValue = search.value;
    let columns = req.query.columns;
    let ordertable;
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
    if (orderByModelName == "Employee") {
        ordertable = ["Employee", orderByCol, orderDir];
    } else {
        ordertable = [orderBy, orderDir];
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

module.exports = { oneToManyController, oneToneControlller }