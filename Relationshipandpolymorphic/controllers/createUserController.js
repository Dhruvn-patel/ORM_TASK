const { Sequelize, Op, DataTypes, useInflection } = require('sequelize');

const db = require('../models');
const User = db.User
const Contact = db.Contact
const Profile = db.Profile
const UserContact = db.UserContact;
const Projexct = db.Project;
const UserProject = db.UserProject
const Person = db.Person
const Image = db.Image
const Video = db.Video
const Comment = db.Comment
const Tag = db.Tag
const TagJunc = db.TagJunc;

// console.log(db.contactuser);
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
    // const data = await User.create({
    //     FirstName: FirstName,
    //     LastName: LastName,
    //     email: email

    // })

    // let contact;
    // if (data && data.dataValues.id) {
    //     contact = await Contact.create({
    //         address: address,
    //         contactNumber: contactNumber,
    //         user_id: data.dataValues.id
    //     })
    //     return res.status(201).json({data, contact})
    // }
    // else
    // {
    //     return res.status(404).json({msg: "user data not valid"})
    // }

    // async function createUserWithContact() {
    //     try {
    //       const user = await User.create({
    //         FirstName: 'John',
    //         LastName: 'Doe',
    //         email: 'johndoe@example.com',
    //         Contacts: [{
    //           address: '123 Main St.',
    //           contactNumber: 5515315,
    //         }]
    //       }, {
    //         include: [Contact]
    //       });
    //       console.log(user.toJSON());
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //   createUserWithContact();

    // !association one to many
    const user = await User.create({
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        Contacts: [{
            address: address,
            contactNumber: contactNumber,
        }]
    }, {
        include: [Contact]
    });
    console.log(user);
    return res.status(200).json(user);
    //lazy loading
    // const getdta = await data.getContacts();


    const getdta = await User.findAll({
        attributes: ["id", "FirstName"]
        , include: [{
            model: Contact,
        }],
        where: {
            email: email
        }
    })

    /*
    {"email":"Nirali@gmail.com"}
    */
    return res.status(200).json(getdta);


}

const manytmanyController = async (req, res) => {
    const { FirstName, LastName, email, ProjectName, id } = req.body;
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
    // const data = await User.create({
    //     FirstName: FirstName,
    //     LastName: LastName,
    //     email: email

    // })

    // let projectData;
    // if (data && data.dataValues.id) {
    //     projectData = await Project.create({
    //         Name: ProjectName,
    //     })
    // }
    // else {
    //     return res.status(404).json({ msg: "user data not valid" })
    // }

    // // console.log(projectData.dataValues.id);
    // if (projectData.dataValues.id && data.dataValues.id) {
    //     await UserProject.create({
    //         UserId: data.dataValues.id,
    //         ProjectId: projectData.dataValues.id
    //     })
    //     return res.status(201).json(data);
    // }
    // else
    //     return res.status(404).json({ msg: "project data not valid" })



    const getdta = await User.findAll({
        attributes: ["id", "FirstName"]
        , include: [{
            model: Project,
        }],
        where: {
            id: id
        }
    })

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

const polyonetomany = async (req, res) => {

    // ! inserted data into comments table
    // // const imageAdd={};
    // const videoAdd = {};
    // const imageAdd = await Image.create({
    //     title: 'img 3',
    //     url: "img3.jpg"
    // })

    // const videoAdd = await Video.create({
    //     title: 'Video 2',
    //     text: "Video 2 is available"
    // })
    // if (imageAdd.id) {
    //     await Comment.create({
    //         title: "Comments image 2 added",
    //         commentableId: imageAdd.id,
    //         commentableType: 'image'
    //     })
    // }
    // if (videoAdd.id) {
    //     await Comment.create({
    //         title: "Comments video 2 added ",
    //         commentableId: videoAdd.id,
    //         commentableType: 'video'
    //     })
    // }


    // !img to comments table
    // const imgComments = await Image.findAll({
    //     include: [{
    //         model: Comment
    //     }]
    // })

    // !comments to img  table
    // const videoComments = await Video.findAll({

    //     include: [{
    //         model: Comment
    //     }]
    // })
    // // // !comment to img table
    // const CommentData = await Comment.findAll({
    //     include: [{
    //         model: Image
    //     }]
    // })

    // return res.status(200).json(videoComments);
}


const manytomanypoly = async (req, res) => {
    // ! inserted data into comments table
    // // const imageAdd={};
    // const videoAdd = {};
    const imageAdd = await Image.create({ title: 'img1', url: "img1.jpg" })
    const videoAdd = await Video.create({ title: 'Video 1', text: "Video 1 is available" })
    const tagAdd = await Tag.create({ name: 'Fullstack Tag' });
    console.log(imageAdd);
    if (imageAdd.id && tagAdd.id) {
        await TagJunc.create({
            tagId: tagAdd.id,
            taggableId: imageAdd.id,
            taggableType: 'image',
        })

    }
    if (videoAdd.id && tagAdd.id) {
        await TagJunc.create({
            tagId: tagAdd.id,
            taggableId: videoAdd.id,
            taggableType: 'video',
        })

    }

    // !img to comments table
    // const imgComments = await Image.findAll({
    //     include: [{
    //         model: Comment
    //     }]
    // })

    // !comments to img  table
    // const videoComments = await Video.findAll({

    //     include: [{
    //         model: Comment
    //     }]
    // })

    return res.status(200).json({ imageAdd, videoAdd, tagAdd })
}
module.exports = { UserController, onetmanyController, eagerController, onetoneProfile, manytmanyController, scopeUser, hooksController, polyonetomany, manytomanypoly }

