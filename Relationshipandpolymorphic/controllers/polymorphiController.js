const { Sequelize, Op, DataTypes } = require('sequelize');

const db = require('../models');
const { User, Contact, Profile, UserContact, Project, UserProject, Person, Image, Video, Comment, Tag, TagJunc } = db;

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

module.exports = { polyonetomany, manytomanypoly }