
const LicenseProductModel = require("../models/inspaceproduct.model.js");
const LicenseProductRepository = require("../repository/inspaceproduct.repository.js");
//import LicenseProductModel from '../models/licenseproduct.model';
//import LicenseProductRepository from '../repository/LicenseProduct.repository'

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save Customer in the database
    LicenseProductRepository.create(licenseProduct, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the LicenseProduct."
            });
        else res.send(data);
    });
};

exports.readAll = (req, res) => {
    LicenseProductRepository.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving licenseProduct."
            });
        else {
            res.send(data);
        }
    });
};

exports.readOne = (req, res) => {
    LicenseProductRepository.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Not found LicenseProduct with id ${req.params.id}.'
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving LicenseProduct with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    LicenseProductRepository.update(
        req.params.id,
        new LicenseProductModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found LicenseProduct with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating LicenseProduct with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateListSoftwareTypeAndIsAuthorized = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const softwareType = req.params.softwareType;
    const isAuthorized = req.params.isAuthorized

    req.body.ids.forEach(element => {
        LicenseProductRepository.updateToSoftwareTypeAndIsAuthorized(
            element,
            softwareType,
            isAuthorized,
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: "Not found LicenseProduct with ids " + req.body.ids
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating LicenseProduct with ids " + req.body.ids
                        });
                    }
                    res.send(data);
                }
            }
        );
    });
    res.send("Success update");
};

exports.delete = (req, res) => {
    LicenseProductRepository.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found LicenseProduct with id " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Could not delete LicenseProduct with id " + req.params.id
                });
            }
        } else {
            res.send({ message: `LicenseProduct was deleted successfully!` });
        } 
    });
};


exports.deleteList = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    req.body.ids.forEach(element => {
        LicenseProductRepository.deleteById(
            element,
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: "Not found LicenseProduct with id " + element
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating LicenseProduct with id " + element
                        });
                    }
                }
            }
        );
    });
    res.send("Success delete");
}

exports.deleteAll = (req, res) => {
    LicenseProductRepository.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all LicenseProduct."
            });
        else res.send({ message: `All LicenseProduct were deleted successfully!` });
    });
};