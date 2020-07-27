const connection = require("../db.js");

exports.create = (newUserEmail, result) => {
    connection.query("INSERT INTO tb_user("
    +   "email,"
    +   "create_date,"
    +   "update_date) values(?, Now(), Now())",
        [ newUserEmail ],
        (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created user: ", { id: res.insertId, name: newUserEmail });
            result(null, res.insertId);
        });
};

exports.deleteById = (name) => {
    connection.query("DELETE FROM tb_user WHERE name = ?", name, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            return;
        }
        console.log("deleted tb_server with name: ", name);
    });
};
