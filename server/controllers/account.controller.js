
const AccountModel = require("../models/account.model.js");
const AccountRepository = require("../repository/account.repository.js");
const exec = require("child_process").exec;

const EC_CHECKING = 1;
const EC_ALIVE = 2;
const EC_DEAD = 9

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        AccountRepository
            .create(new AccountModel(req.body))
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
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        AccountRepository
            .update(req.params.id, new AccountModel(req.body))
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err || "Some error occurred while update the account."
                });
            });
    }
};

exports.readAll = (req, res) => {
    AccountRepository
        .findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some error occurred while retrieving account list."
            });
        });
};

exports.read = (req, res) => {
    AccountRepository
        .findById(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving account."
            });
        });
};

exports.updateListToSsh = (req, res) => {
    if ((!req.body) || (req.body.ids < 1)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        console.log(req.body.ids);
        const promiseArr = [];
        asyncForEach(req.body.ids, (num) => {
            promiseArr
                .push(
                    AccountRepository
                        .findById(num)
                        .then((data) => {
                            AccountRepository
                                .updateToHealth(num, EC_CHECKING)
                                .catch(err => {
                                    console.log(err);
                                });
                            const cmd = "./script/expect_autocommand.pl -id " + data.id + " -h " + data.server_ip + " -u " + data.server_account + " -p " + data.server_password;
                            console.log("Run command : " + cmd);
                            const { stdout, stderr } = exec(cmd, { shell: true });
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
                    res.status(200).send("Success update : " + result.toString());
                }).catch((error) => {
                    res.status(500).json({ error: error.toString() });
                });
        });
    }
};

exports.updateListToPasswd = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        console.log(req.body.ids);
        const promiseArr = [];
        asyncForEach(req.body.ids, (num) => {
            promiseArr.push(
                AccountRepository.findById(num).then((data) => {
                    AccountRepository
                        .updateToHealth(num, EC_CHECKING)
                        .catch(err => {
                            console.log(err);
                        });
                    const cmd = "./script/expect_autocommand.pl -C -id " + data.id + " -h " + data.server_ip + " -u " + data.server_account + " -p " + data.server_password;
                    console.log("Run command : " + cmd);
                    const { stdout, stderr } = exec(cmd, { shell: true });
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
                AccountRepository.deleteById(num)
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