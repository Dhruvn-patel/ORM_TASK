const db=require('../models');
const { User, Employee, Photo } = db;
const { Sequelize, Op, QueryTypes, where } = require('sequelize');
const findCntOneTOneFun=async({searchValue,offset,limit,order})=>{
    
    return await User.findAndCountAll({
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
        offset,
        limit,
        order,

    })
}

const findCntOneTManyFun=async({searchValue,offset,limit,order})=>{
    
    return await User.findAndCountAll({
        offset,
        limit,
        order,
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
    })
}




module.exports={findCntOneTOneFun,findCntOneTManyFun}
