const path = require('path');
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const { faker } = require('@faker-js/faker');
const {findCntOneTOneFun,findCntOneTManyFun} = require('../repository/findresult.repository');
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
    // console.log(orderBy);
    let orderSplit = orderBy.split(".");
    // console.log("orderby", orderBy);
    let orderByModelName = orderSplit[0];
    let orderByCol = orderSplit[1];
    // console.log("Model Name", orderByModelName);
    // console.log("Col Name", orderByCol);

    if (orderByModelName == "Photos[]") {
        ordertable = ["Photos", orderByCol, orderDir];
    } else {
        ordertable = [orderBy, orderDir];
    }
    const data=await findCntOneTManyFun({
        searchValue:searchValue,
        offset: parseInt(start),
        limit: parseInt(length),
        order: [ordertable],
    })

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
    if (order) {
        let orderCol = order[0].column;
        let orderDir = order[0].dir;
        let orderBy = columns[orderCol].data;
        // console.log(orderBy);
        let orderSplit = orderBy.split(".");
        // console.log("orderby", orderBy);
        let orderByModelName = orderSplit[0];
        let orderByCol = orderSplit[1];
  
        // console.log("Col Name", orderByCol);
        if (orderByModelName == "Employee") {
            ordertable = ["Employee", orderByCol, orderDir];
        } else {
            ordertable = [orderBy, orderDir];
        }
    }
    else {
        ordertable = ["id"]
    }
    const data=await findCntOneTOneFun({
        searchValue:searchValue,
        offset: parseInt(start),
        limit: parseInt(length),
        order: [ordertable],
    })
    res.json({
        draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows
    });

}

module.exports = { oneToManyController, oneToneControlller }