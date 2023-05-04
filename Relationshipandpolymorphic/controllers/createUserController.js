const { Sequelize, Op, DataTypes, useInflection } = require('sequelize');

const db = require('../models');
const { User, Contact, Profile, UserContact, Project, UserProject, Person, Image, Video, Comment, Tag, TagJunc } = db;

const UserController = async (req, res) => {


    // const data = await User.findAll({
    //     attributes: ["id", "FirstName"],
    //     include: [{
    //         model: Contact,
    //         attributes: ["address", "contactNumber"]
    //     }]
    // })


    const data = await Contact.findAll({
        attributes: ["address", "contactNumber"],
        include: [{
            model: User,
            attributes: ["id", "FirstName"],
        }]
    })


    return res.status(200).json(data);
}


const onetmanyController = async (req, res) => {
    const { FirstName, LastName, email, address, contactNumber } = req.body;
    console.log(FirstName);
    /*
    {
    "FirstName":"Shima",
    "LastName":"Patel",
    "email":"Shima@gmail.com",
    "address":"Delhi",
    "contactNumber":"16516"
    }
    */
    // ! insert data
    // !association one to many
    // const user = await User.create({
    //     FirstName: FirstName,
    //     LastName: LastName,
    //     email: email,
    //     Contacts: [{
    //         address: address,
    //         contactNumber: contactNumber,
    //     }]
    // }, {
    //     include: [Contact]
    // });
    // // console.log(user);
    // return res.status(200).json(user);
    //lazy loading
    // const getdta = await data.getContacts();


    // ! get data
    // const getdta = await User.findAll({
    //     attributes: ["id", "FirstName"]
    //     , include: [{
    //         model: Contact,
    //     }],
    //     where: {
    //         email: email
    //     }
    // })

    /*
    {"email":"Nirali@gmail.com"}
    */
    // return res.status(200).json(getdta);

    //!update data

    // const updateData = await User.update({
    //     email: 'a@gmail.com',
    // },
    //     {
    //         where: { id: 1 }
    //     })
    // if (updateData) {
    //     await Contact.update({
    //         address: '2323'
    //     }, {
    //         where: { user_id: '2' }
    //     })
    // }

    //! update only second table
    const updateData = await User.findByPk(3);
    //  if (updateData) {
    //     await Contact.update({
    //         address: '684984'
    //     }, {
    //         where: { user_id: '1' }
    //     })
    // }
    const setData = await updateData.setContacts({
        address: 'fsvsd'
    })
    console.log(setData);
    return res.status(200).json(updateData)



    //!Delete data
    // const deleteData = await User.findByPk(3)
    //delete all contact for particular user id =1 and user_id set null

    //delete particular contact with address
    // const rolesToBeRemoved = await deleteData.getContacts({ where: { address: 'ram' } })
    // console.log(rolesToBeRemoved);
    // await deleteData.removeContacts(rolesToBeRemoved)
    // Contact.destroy({ where: { user_id: null } })
    // return res.status(200).json(deleteData)
}

const manytmanyController = async (req, res) => {
    const { FirstName, LastName, email, ProjectName } = req.body;
    /*
    {
    "FirstName":"Shima",
    "LastName":"Patel",
    "email":"Shima@gmail.com",
    "address":"Delhi",
    "contactNumber":"16516"
    }
    */
    // ! insert data
    // // console.log(projectData.dataValues.id);
    //! insert data
    const user = await User.create({
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        //Projects is table Name
        Projects: [{
            Name: ProjectName,
        }]
    }, {
        include: [Project]
    });
    console.log(user);
    return res.status(200).json(user);



    // const getdta = await User.findAll({
    //     attributes: ["id", "FirstName"]
    //     , include: [{
    //         model: Project,
    //     }],
    //     where: {
    //         id: id
    //     }
    // })

    return res.status(200).json(getdta);


}

const onetoneProfile = async (req, res) => {
    // //! Data inserted
    const { Name, email, pancard, bio } = req.body;
    // const addData = await Person.create({
    //     Name: Name, email: email
    // })

    /*
    {
    "Name":"Nirali",
    "email":"Nirali@gmail.com",
    "pancard":"123211",
    "bio":"SDE Intern"
   }
    */

    // if (addData.dataValues.id) {
    //     const ProfileData = await Profile.create({
    //         pancard: pancard,
    //         bio: bio,
    //         user_id: addData.dataValues.id
    //     })
    //     return res.json({ addData, ProfileData })
    // }
    // else {
    //     return res.json({ msg: "user data not valid" })
    // }

    //!insert data
    // const profileName = Person.belongsTo(Profile, { as: 'profile' });
    // const user = await Person.create({
    //     Name: Name,
    //     email: email,
    //     Profiles: [{
    //         pancard: pancard,
    //         bio: bio,
    //     }]
    // }, {
    //     association: Product.User,
    //     include: [profileName]
    // });
    // return res.json(user)
    // !get data
    /*
 {
     "Name":"Nirali",

 }
 */
    const fetchData = await Person.findOne({
        attributes: ["id", "Name"],
        include: [{
            model: Profile
        }],
        where: {
            Name: req.body.Name
        }
    })

    // lazy loading 
    // const data = await Person.findOne({
    //     where: {
    //         Name: req.body.Name
    //     }
    // });
    // const fetchData = await data.getProfile();

    return res.json(fetchData)
}

const eagerController = async (req, res) => {

    // const data = await User.findAll({
    //     include: [
    //         {
    //             model: Contact,
    //             attributes: ["permanent_add"],
    //             // required: false,  // ? inner JOIN     `Users` AS `User` INNER JOIN `contacts` AS `contacts`
    //             // right: true     // RIGHT OUTER JOIN
    //         }
    //     ]
    // })


    const data = await User.findAll({
        include: [{
            model: Contact,
        }]
    })
    return res.status(200).json(data);
}


const scopeUser = async (req, res) => {

    User.addScope('checklastname', {
        where: {
            LastName: "Patel"
        }
    })

    User.addScope('checkemail', {
        where: {
            email: "johndoe@example.com"
        }
    })

    User.addScope('userAttribute', {
        attributes: ['FirstName', 'LastName', 'email']
    })
    // Contact.addScope('ContactAttribute', {
    //     attributes: ['contactNumber']
    // })

    User.addScope('ContactModel', {
        include: [{
            model: Contact,
            attributes: ['contactNumber']
        }]
    })
    const data = await User.scope(['checkemail', 'checklastname', 'userAttribute', 'ContactModel']).findAll({})
    return res.status(200).json(data);
}

const hooksController = async (req, res) => {
    const data = await User.create({
        FirstName: 'Sita',
        LastName: 'Panchal',
        email: 'Panchal@gmail.com',
    })
    return res.status(200).json(data);
}




module.exports = { UserController, onetmanyController, eagerController, onetoneProfile, manytmanyController, scopeUser, hooksController }

