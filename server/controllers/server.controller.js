
const ServerModel = require("../models/server.model.js");
const ServerRepository = require("../repository/server.repository.js");
const exec = require("child_process").exec;
const ping = require("ping");

const EC_CHECKING = 1;
const EC_ALIVE = 2;
const EC_DEAD = 9;
const EC_UNKNOWN = 99;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    } else {
        // Save Customer in the database
        ServerRepository
            .create(new ServerModel(req.body))
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err || "Some error occurred while creating the server."
                });
            });
    }
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        // Save Customer in the database
        ServerRepository
            .update(req.params.id, new ServerModel(req.body))
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err || "Some error occurred while update the server."
                });
            });
    }
};

exports.readAll = (req, res) => {
    ServerRepository
        .findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some error occurred while retrieving server list."
            });
        });
};

exports.read = (req, res) => {
    ServerRepository
        .findById(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving server."
            });
        });
};

exports.updateListToPing = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        const promiseArr = [];
        asyncForEach(req.body.ids, (num) => {
            console.log(num);
            promiseArr.push(
                ServerRepository.findById(num).then((data) => {
                    console.log("Servcer IP : " + data.server_ip);
                    ServerRepository
                                .updateToHealth(data.id, EC_CHECKING)
                                .catch(err => {
                                    console.log(err);
                                });
                    ping.promise.probe(data.server_ip).then(function (res) {
                        if (res.alive) {
                            console.log("[" + data.server_ip + "] is alive...");
                            ServerRepository
                                .updateToHealth(data.id, EC_ALIVE)
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            console.log("[" + data.server_ip + "] is dead...");
                            ServerRepository
                                .updateToHealth(data.id, EC_DEAD)
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    });
                    return data.server_ip;
                }, (err) => {
                    return err;
                }).catch(err => {
                    console.log(err);
                    throw err;
                })
            )
        }).then(() => {
            Promise
                .all(promiseArr)
                .then((result) => {
                    console.log("result : " + result);
                    res.status(200).send("Success update : " + result.toString());
                }).catch((error) => {
                    res.status(500).json({ error: error.toString() });
                });
        });
    }
};

exports.deleteList = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        const promiseArr = [];
        asyncForEach(req.body.ids, (num) => {
            promiseArr.push(
                ServerRepository.deleteById(num)
            );
        }).then(() => {
            Promise
                .all(promiseArr)
                .then((result) => {
                    res.status(200).send("Success delete : " + result.toString());
                }).catch((error) => {
                    res.status(500).json({ error: error.toString() });
                });
        });
    }
}