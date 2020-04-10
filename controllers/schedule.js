const Schedule = require( '../models/schedule' );

// CRUD

exports.create = (req, res, next) => {
    const sch = new Schedule( {
        schedule: req.body.schedule
    });
    sch.save()
        .then( () => { res.status(201).json({ message: 'Schedule created successfully' }) } )
        .catch( ( error ) => { res.status(400).json({ error: error }) } );
};

exports.readAll = ( req, res, next ) => {
    Schedule.find()
        .then( sch => res.status(200).json(sch) )
        .catch( error => res.status(400).json({ error }) );
};

exports.readOne = ( req, res, next ) => {
    Schedule.findOne( { _id: req.params.id } )
        .then( sch => res.status(200).json(sch) )
        .catch( error => res.status(404).json({ error }) );
};

exports.update = ( req, res, next ) => {
    Schedule.updateOne( { _id: req.params.id }, { schedule: req.body.schedule, _id: req.params.id } )
        .then( () => res.status(200).json({ message: 'Schedule updated successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};

exports.delete = ( req, res, next ) => {
    Schedule.deleteOne({ _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Schedule deleted successfully'}) )
        .catch( error => res.status(400).json({ error }) );
};
