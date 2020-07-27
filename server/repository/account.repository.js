const connection = require("../db.js");


exports.create = (newAccount, result) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO tb_account("
            + "server_id,"
            + "health,"
            + "use_ssh,"
            + "server_account,"
            + "server_password,"
            + "comment,"
            + "create_date,"
            + "update_date) values(?,?,?,?,?,?,Now(), Now())",
            [
                newAccount.server_id,
                newAccount.health,
                newAccount.use_ssh,
                newAccount.server_account,
                newAccount.server_password,
                newAccount.comment
            ],
            (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.insertId < 1) {
                    reject("Not created data : " + id);
                } else {
                    console.log({
                        result: res,
                        data: newAccount
                    });
                    resolve(newAccount);
                }
            });
    });
};

exports.findAll = result => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT s.id as server_id, s.server_name as server_name, s.server_ip as server_ip, a.* "
            + " FROM tb_account a, tb_server s WHERE a.server_id = s.id", (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
};

exports.findById = (accountId, result) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT s.id as server_id, s.server_name as server_name, s.server_ip as server_ip, a.* "
            + " FROM tb_account a, tb_server s WHERE a.server_id = s.id AND a.id = ?", [accountId], (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.length) {
                    resolve(res[0]);
                } else {
                    reject("Not found " + accountId);
                }
            });
    });
};

exports.update = (id, accountObj, result) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE tb_account SET "
            + "use_ssh=?,"
            + "server_id=?,"
            + "server_account=?,"
            + "server_password=?,"
            + "comment=?,"
            + "update_date=Now() "
            + "WHERE id=?",
            [
                accountObj.use_ssh,
                accountObj.server_id,
                accountObj.server_account,
                accountObj.server_password,
                accountObj.comment,
                id
            ],
            (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.changedRows < 1) {
                    reject("Not found matched row : " + id);
                } else {
                    console.log({
                        result: res,
                        data: accountObj
                    });
                    resolve(accountObj);
                }
            });
    });
};

exports.updateToHealth = (id, healthCode, result) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE tb_account SET "
            + "health=?,"
            + "update_date=Now() "
            + "WHERE id=?",
            [healthCode, id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("updated account health code: ", { id: id, healthCode });
                    console.log({
                        result: res,
                        data: { id: id, healthCode }
                    });
                    resolve({
                        result: res,
                        data: { id: id, healthCode: healthCode }
                    });
                }
            });
    });
};


exports.deleteById = (id, result) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM tb_account WHERE id = ?", id, (err, res) => {
            if (err) {
                reject(err);
            } else if (res.affectedRows == 0) {
                // not found LicenseProduct with the id
                reject("not_found account id : " + id);
            } else {
                console.log("deleted account : " + id);
                resolve({
                    result: res,
                    data: id
                });
            }
        });
    });
};
