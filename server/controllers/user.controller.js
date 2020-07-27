const execSync = require("child_process").execSync;

const LdapModel = require("../models/ldap.model.js");
const UserRepository = require("../repository/user.repository.js");
const ldapService = require("../service/ldap.service");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    UserRepository.create(req.body.email, (err, uid) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the server."
            });
        else {
            ldapService.createEntiry(new LdapModel(req.body, uid))
                .then((data) => {
                    res.status(200).send({
                        message: "User account creation success",
                        log: data
                    });
                }).catch((err) => {
                    UserRepository.deleteById(req.body.email);
                    console.log(err);
                    res.status(500).send({
                        message: err
                    });
                });
        }
    });
};

exports.readAll = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ldapService.getEntiryByCn()
        .then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the server."
            });
        })
};

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    ldapService.authenticate(req.body.email, req.body.userPassword)
        .then((data) => {
            res.status(200).send({
                message: "Success authenticate.",
                data: data
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message: err || "Some error occurred while creating the server."
            });
        })
};


exports.updateUserPassword = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    ldapService.changePassword(req.params.id, req.body.userPassword, req.body.userNewPassword)
        .then((data) => {
            res.status(200).send({
                message: "Changed password success.",
                log: data
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the server."
            });
        })
};
