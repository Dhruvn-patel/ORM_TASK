const { json } = require('body-parser');
const { Sequelize, Op, QueryTypes } = require('sequelize');
const db = require('../models')
const { faker } = require('@faker-js/faker');
const UserModel = db.User;

// const ContactModel = db.contact;
const postAddController = async (req, res) => {

    const body = req.body;
    let storeData;
    if (body.length > 1) {
        storeData = await PostModel.bulkCreate(body);
    }
    else {
        storeData = await PostModel.create(body);
    }
    // const storeData = await UserModel.create(body);
    return res.status(201).json(storeData);
}

const userAddController = async (req, res) => {

    // ! create instance of user
    const jane = await UserModel.create({ fName: "Yash" });
    // console.log(jane); // true
    // console.log(JSON.stringify(jane)); //
    // console.log('Jane was saved to the database!');


    // ! update instance of user
    // const jane = await UserModel.create({ fName: "harsh" })
    // jane.lName = "";
    // await jane.save();
    // await jane.update({ fName: "yax" })
    // jane.set({
    //     fName: "Sima",
    // })
    // await jane.save()


    // ! delete instance of user
    await jane.destroy();
    return res.status(201).json(jane)
}

const usersController = async (req, res) => {
    // ? allUsers gets
    const getUsers = await UserModel.findAll({});
    return res.status(200).json(getUsers);
}


const usersByIdController = async (req, res) => {
    // ? singleUser get
    const getUsers = await UserModel.findOne({
        where: { id: req.params.id }
    });
    return res.status(200).json(getUsers);
}



const postDataController = async (req, res) => {

    const body = req.body;
    let storeData;
    if (body.length > 1) {
        storeData = await UserModel.bulkCreate(body);
    }
    else {
        storeData = await UserModel.create(body);
    }
    // const storeData = await UserModel.create(body);
    return res.status(201).json(storeData);

}
const deleteUserByIdController = async (req, res) => {
    const data = await UserModel.destroy({ where: { id: req.params.id } })
    return res.status(200).json({ msg: 'data deleted' })
}
const patchUserByIdController = async (req, res) => {
    const data = await UserModel.update(req.body, { where: { id: req.params.id } });
    return res.status(200).json({ data, id: req.params.id })

}
const queryController = async (req, res) => {
    //     // res.setHeader('X-create', "create query");
    //     // const user = await UserModel.create({
    //     //     fName: 'alice',
    //     // }, { fields: ['lName', 'fName'] });

    //     const user = await UserModel.findAll({
    //         attributes: {
    //             include: [
    //                 [Sequelize.fn('COUNT', Sequelize.col('fName')), 'n_hats']
    //             ]
    //         }

    //     })
    //     return res.status(201).json(user);
}

//faker data insertion
const getSetController = async (req, res) => {

    let jane = [];

    for (let i = 0; i < 10; i++) {
        jane.push(new Object({
            fName: faker.name.firstName(), lName: faker.name.lastName(), email: faker.internet.email()
        }))
    }

    const data = await UserModel.bulkCreate(jane);
    return res.status(200).json(data)
}


const paginationController = async (req, res) => {

    //     // pagination with sorting 
    const { id, attributeName, direction } = req.body;
    const limit = 3;
    const offset = (id - 1) * limit;
    try {
        const data = await UserModel.findAll({
            offset: offset, limit: limit,
            order: [[`${attributeName}`, `${direction}`]],
        })
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ message: "please add valid values !" });
    }

}

const searchController = async (req, res) => {
    const { fName, lName, email } = req.body;
    const data = await UserModel.findAll({
        where: {
            // [Op.like]: [{ fName: `%${fName}`, lName: `%${lName}` }]
            [Op.or]: [{
                fName: {
                    [Op.like]: `%${fName}`
                }
            }, {
                lName: {
                    [Op.like]: `%${lName}`
                }
            }]

        }
    })
    return res.status(200).json(data);
}

const rawqueryController = async (req, res) => {

    const data = await db.sequelize.query(`SELECT * from Users where fName =$fName`, {
        type: QueryTypes.SELECT,

        // replacements: { searchName: "r%" }  //where fName :=fName 
        // replacements: { fName: ["Dhruv", "ritu"] }  //where fName IN(:fName)
        // replacements: ["Dhruv"]  //where fName =?
        bind: { fName: "O" }  //where fName =$fName


    })
    return res.status(200).json(data);
}




module.exports = { userAddController, usersController, usersByIdController, postDataController, deleteUserByIdController, patchUserByIdController, queryController, getSetController, paginationController, searchController, rawqueryController, postAddController }