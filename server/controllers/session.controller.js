const LdapModel = require("../models/ldap.model.js");
const UserRepository = require("../repository/user.repository.js");
const ldapService = require("../service/ldap.service");
const session = require('express-session');

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    ldapService.authenticate(req.body.email, req.body.userPassword)
        .then((data) => {

            //req.session.userId = req.body.email
            req.session.loginUser = data;
            req.session.save(() => {
                res.status(200).send({
                    message: "Success authenticate.",
                    loginUser: data
                });
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the server."
            });
        })
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send();
        }
    });
};

exports.getSession = (req, res) => {
    
    if(req.session.loginUser) {
        res.status(200).send({
            loginUser: req.session.loginUser
        });
    } else {
        res.status(404).send();
    }
    
};