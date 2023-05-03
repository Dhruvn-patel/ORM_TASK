const { Sequelize, Op, DataTypes } = require('sequelize');

const db = require('../models');
const { User, Contact, Profile, UserContact, Project, UserProject, Person, Image, Video, Comment, Tag, TagJunc } = db.models;
// const User = db.User
// const Contact = db.Contact
// const Profile = db.Profile
// const UserContact = db.UserContact;
// const Projexct = db.Project;
// const UserProject = db.UserProject
// const Person = db.Person
// const Image = db.Image
// const Video = db.Video
// const Comment = db.Comment
// const Tag = db.Tag
// const TagJunc = db.TagJunc;