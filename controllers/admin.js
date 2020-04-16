const bcrypt = require( 'bcrypt' );

const User = require('../models/user');
const Schedule = require('../models/schedule');

// Infos
exports.getInfos = (req, res) => {
    User.countDocuments()
        .then( numUsers => {
            Schedule.countDocuments()
                .then( numSchedules => res.status(200).json({ numUsers: numUsers, numSchedules: numSchedules }) )
                .catch( error => res.status(400).json({ error }) );
        })
        .catch( error => res.status(400).json({ error }) );
};

// User
exports.create = (req, res) => {
    bcrypt.hash( req.body.password, 10 )
        .then( hash => {
            const user = new User( {
                email: req.body.email,
                password: hash,
                role: req.body.role
            });
            user.save()
                .then( () => res.status(201).json({ message: 'User created successfully' }) )
                .catch( error => { res.status(400).json({ error }) } );
        })
        .catch( error => { res.status(500).json({ error } ) } );
};

exports.readAll = (req, res) => {
    User.find()
        .then( user => res.status(200).json(user) )
        .catch( error => res.status(400).json({ error }) );
};

exports.updatePassword = (req, res) => {
    bcrypt.hash( req.body.password, 10 )
        .then( hash => {
            User.updateOne({_id: req.body.id}, {password: hash})
                .then( () => res.status(200).json({message: 'Password updated successfully'}) )
                .catch( error => res.status(400).json({error}) );
        })
        .catch( error => { res.status(500).json({ error } ) } );
};

exports.updateRole = (req, res) => {
    User.updateOne( { _id: req.body.id }, { role: req.body.role } )
        .then( () => res.status(200).json({ message: 'Role updated successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

exports.delete = (req, res) => {
    User.deleteOne({ _id: req.body.id })
        .then( () => res.status(200).json({ message: 'User deleted successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

