const bcrypt = require( 'bcrypt' );
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Schedule = require('../models/schedule');

// User

exports.readAll = ( req, res, next ) => {
    User.find()
        .then( user => res.status(200).json(user) )
        .catch( error => res.status(400).json({ error }) );
};

exports.readOne = ( req, res, next ) => {
    User.findOne( { _id: req.params.id } )
        .then( user => res.status(200).json(user) )
        .catch( error => res.status(404).json({ error }) );
};

exports.delete = ( req, res, next ) => {
    User.deleteOne({ _id: req.params.id })
        .then( () => res.status(200).json({ message: 'User deleted successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

// Authentication

exports.signup = ( req, res, next ) => {
    bcrypt.hash( req.body.password, 10 )
        .then( hash => {
            const user = new User( {
                email: req.body.email,
                password: hash,
                role: req.body.role
            });
            user.save()
                .then( () => res.status(201).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                }) )
                .catch( error => { res.status(400).json({ error }) } );
        })
        .catch( error => { res.status(500).json({ error } ) } );
};

exports.login = (req, res, next) => {
    User.findOne( { email: req.body.email } )
        .then( user => {
            if ( ! user ) {
                return res.status(401).json({ error: 'User not found' });
            }
            bcrypt.compare( req.body.password, user.password )
                .then( valid => {
                    if ( ! valid ) {
                        return res.status(401).json({ error: 'Invalid password' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch( error => { res.status(500).json({ error }) } );
        })
        .catch(error => res.status(500).json({ error }) );
};

// Schedules

exports.addSchedule = (req, res, next) => {
    User.findOne( { _id: req.body.userId } )
        .then( user => {
            const
                userToChange = user,
                newSchedule = new Schedule( { schedule: req.body.schedule, user: userToChange._id } );

            newSchedule.save()
                .then( () => {
                    userToChange.schedules.push( newSchedule );

                    userToChange.save()
                        .then( () => res.status(201).json({
                            message: 'Schedule added successfully',
                            scheduleId: newSchedule._id
                        }))
                        .catch( error => { res.status(400).json({ error }) } )
                })
                .catch( error => { res.status(400).json({ error }) } );
        })
        .catch( error => res.status(404).json({ error }) );
};

exports.getSchedule = (req, res, next) => {
    User.findOne( { _id: req.body.userId } )
        .then( user => {
            user.schedules.forEach( el => {
                if ( String(el) === String(req.body.id) ) {
                    Schedule.findOne( { _id: el } )
                        .then( sch => res.status(200).json({ schedule: sch }) )
                        .catch( error => res.status(404).json({ error }) )
                }
            });
        })
        .catch( error => { res.status(400).json({ error }) } );
};

exports.getSchedulesInfos = (req, res, next) => {
    User.findOne( { _id: req.body.userId } )
        .then( user => {
            let
                promises = [],
                result = [];

            user.schedules.forEach( el => {
                promises.push(
                    Schedule.findOne( { _id: el } )
                        .then( sch => result.push( {
                            name: sch.schedule.settings.infos.name,
                            id: sch._id,
                            createdAt: sch.createdAt,
                            updatedAt: sch.updatedAt
                        }))
                        .catch( error => res.status(404).json({ error }) )
                )
            });

            Promise.all( promises )
                .then( () => { res.status(200).json({ schedules: result }) } )
                .catch( error => { res.status(400).json({ error }) } );
        })
        .catch( error => { res.status(400).json({ error }) } );
};

exports.removeSchedule = (req, res, next) => {
    User.findOne( { _id: req.body.userId } )
        .then( user => {
            const userToChange = user;

            for( let i=0; i<user.schedules.length; i++ ) {
                if ( String(user.schedules[i]) === String(req.body.id) ) {
                    userToChange.schedules.splice(i, 1);

                    userToChange.save()
                        .then( () => {
                            Schedule.deleteOne( { _id: req.body.id } )
                                .then( () => res.status(200).json({ message: 'Schedule deleted successfully'}) )
                                .catch( error => res.status(400).json({ error }) );
                        })
                        .catch( error => { res.status(400).json({ error }) } );
                }
            }
        })
        .catch( error => res.status(404).json({ error }) );
};

exports.updateSchedule = (req, res, next) => {
    User.findOne( { _id: req.body.userId } )
        .then( user => {
            for( let i=0; i<user.schedules.length; i++ ) {
                if ( String(user.schedules[i]) === String(req.body.id) ) {
                    Schedule.updateOne( { _id: req.body.id }, { schedule: req.body.schedule, _id: req.body.id } )
                        .then( () => res.status(200).json({ message: 'Schedule updated successfully'}) )
                        .catch( error => res.status(400).json({ error }) );
                }
            }
        })
        .catch( error => res.status(404).json({ error }) );
};
