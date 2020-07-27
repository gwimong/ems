const connection = require("../db.js");

exports.create = (newServer) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO tb_server("
            + "used,"
            + "health,"
            + "server_name,"
            + "server_ip,"
            + "purpose,"
            + "owner,"
            + "device_div,"
            + "device_manufacturer,"
            + "device_model,"
            + "device_type,"
            + "device_location,"
            + "device_size,"
            + "storage,"
            + "memory,"
            + "gpu,"
            + "ipmi_ip,"
            + "ipmi_account,"
            + "ipmi_password,"
            + "os_type,"
            + "os_name,"
            + "comment,"
            + "create_date,"
            + "update_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,Now(), Now())",
            [
                newServer.used,
                newServer.health,
                newServer.server_name,
                newServer.server_ip,
                newServer.purpose,
                newServer.owner,
                newServer.device_div,
                newServer.device_manufacturer,
                newServer.device_model,
                newServer.device_type,
                newServer.device_location,
                newServer.device_size,
                newServer.storage,
                newServer.memory,
                newServer.gpu,
                newServer.ipmi_ip,
                newServer.ipmi_account,
                newServer.ipmi_password,
                newServer.os_type,
                newServer.os_name,
                newServer.comment
            ],
            (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.insertId < 1) {
                    reject("Not create data : " + id);
                } else {
                    console.log({
                        result: res,
                        data: newServer
                    });
                    resolve(newServer);
                }
            });
    })
};

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM tb_server", (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.findById = (serverId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM tb_server WHERE id = ${serverId}`, (err, res) => {
            if (err) {
                reject(err);
            } else if (res.length) {
                resolve(res[0]);
            } else {
                reject("Not found " + serverId);
            }
        });
    })
};

exports.update = (id, serverObj) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE tb_server SET "
            + "used=?,"
            + "health=?,"
            + "server_name=?,"
            + "server_ip=?,"
            + "purpose=?,"
            + "owner=?,"
            + "device_div=?,"
            + "device_manufacturer=?,"
            + "device_model=?,"
            + "device_type=?,"
            + "device_location=?,"
            + "device_size=?,"
            + "storage=?,"
            + "memory=?,"
            + "gpu=?,"
            + "ipmi_ip=?,"
            + "ipmi_account=?,"
            + "ipmi_password=?,"
            + "os_type=?,"
            + "os_name=?,"
            + "comment=?,"
            + "update_date=Now() "
            + "WHERE id=?",
            [
                serverObj.used,
                serverObj.health,
                serverObj.server_name,
                serverObj.server_ip,
                serverObj.purpose,
                serverObj.owner,
                serverObj.device_div,
                serverObj.device_manufacturer,
                serverObj.device_model,
                serverObj.device_type,
                serverObj.device_location,
                serverObj.device_size,
                serverObj.storage,
                serverObj.memory,
                serverObj.gpu,
                serverObj.ipmi_ip,
                serverObj.ipmi_account,
                serverObj.ipmi_password,
                serverObj.os_type,
                serverObj.os_name,
                serverObj.comment,
                id
            ],
            (err, res) => {
                if (err) {
                    reject(err);
                } else if(res.changedRows < 1) {
                    reject("Not found matched row : " + id);
                } else {
                    console.log({
                        result: res,
                        data: serverObj
                    });
                    resolve(serverObj);
                }
            });
    });
};



exports.deleteById = (id, result) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM tb_server WHERE id = ?", id, (err, res) => {
            if (err) {
                reject(err);
            } else if (res.affectedRows == 0) {
                // not found LicenseProduct with the id
                reject("not_found server id : " + id);
            } else {
                console.log("deleted server: " + id);
                resolve({
                    result : res,
                    data : id
                });
            }
        });
    });
};
