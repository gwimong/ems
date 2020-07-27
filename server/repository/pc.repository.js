const connection = require("../db.js");

exports.findAll = result => {
    connection.query("SELECT * FROM view_pc", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("PCs: ", res);
        result(null, res);
    });
};
