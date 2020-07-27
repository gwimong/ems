const connection = require("../db.js");

exports.findAll = result => {
    connection.query("SELECT * FROM view_inspace_product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("InspaceProducts: ", res);
        result(null, res);
    });
};


exports.findById = (id, result) => {
    connection.query(`SELECT * FROM view_inspace_product WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found InspaceProduct: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found InspaceProduct with the id
        result({ kind: "not_found" }, null);
    });
};

// Not Used
exports.update = (id, inspaceProduct, result) => {
    // connection.query(
    //     "UPDATE view_inspace_product SET SoftwareType = ?, IsAuthorized = ?, UpdateDate = Now() WHERE id = ?",
    //     [inspaceProduct.SoftwareType, inspaceProduct.IsAuthorized, id],
    //     (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }

    //         if (res.affectedRows == 0) {
    //             // not found InspaceProduct with the id
    //             result({ kind: "not_found" }, null);
    //             return;
    //         }

    //         console.log("updated InspaceProduct: ", { id: id, ...inspaceProduct });
    //         result(null, { id: id, ...inspaceProduct });
    //     }
    // );
};


exports.updateToSoftwareTypeAndIsAuthorized = (id, softwareType, isAuthorized, result) => {
    connection.query(
        "UPDATE view_inspace_product SET SoftwareType = ?, IsAuthorized = ?, UpdateDate = Now() WHERE id = ?",
        [softwareType, isAuthorized, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found InspaceProduct with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated InspaceProduct: ", { id: id });
            result(null, { id: id });
        }
    );
};

exports.deleteAll = result => {
    connection.query("DELETE FROM view_inspace_product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} InspaceProduct`);
        result(null, res);
    });
};

exports.deleteById = (id, result) => {
    connection.query("DELETE FROM view_inspace_product WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found InspaceProduct with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted view_inspace_product with id: ", id);
        result(null, res);
    });
};
