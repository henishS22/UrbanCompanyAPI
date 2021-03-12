const Service = require('../models/service');

exports.addService = async (req, res) => { // only allowed for 'admin'
    try {
        const isAlreadyPresent = await Service.findOne({ name: req.body.name });
        if (isAlreadyPresent) {
            throw new Error('Service alreday exists');
        }
        const service = await Service.create(req.body);
        res.status(200).json({message: 'Service Added', data: service});

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.listServices = async (req, res) => { // public API
    try{
        const service = await Service.find({}).populate({
            path: 'vendorID'
        }).populate({
            path: 'categoryID'
        });
        res.status(200).json({data: service});

    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.updateService = async (req, res) =>{
    try{
        const _id = req.param('id');
        await Service.findByIdAndUpdate(_id, req.body);;
        const service = await Service.find({ _id });
        if (!service){
            throw new Error('No such service Found');
        }
        res.status(200).json({
            message: 'Service Updated',
            data: service
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.getService = async (req, res) => {
    try{
        const _id = req.param('id');
        const service = await Service.findById(_id).populate({
            path: 'vendorID'
        }).populate({
            path: 'categoryID'
        });
        if (!service){
            throw new Error('No such service Found');
        }
        res.status(200).json({
            message: 'Service data',
            data: service
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.getServiceOfCategory = async (req, res) =>{
    try {
        const categoryID = req.param('id');
        const services = await Service.find({categoryID});
        if (!services){
            throw new Error('No such service Found');
        }
        res.status(200).json({
            message: 'Services data',
            data: services
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const _id = req.param('id');
        const service = await Service.findByIdAndDelete(_id);
        res.status(200).json({message: 'Service Deleted', data: service});
    } catch (e) {
        res.status(501).json({message: e.message});
    }
};