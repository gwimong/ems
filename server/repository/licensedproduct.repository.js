const connection = require("../db.js");

exports.create = (newLicenseProduct, result) => {
    connection.query("INSERT INTO tb_licensed_product(Name, Description, LogoImage, InfoURL, DownloadURL, CreateDate, UpdateDate) values(?, ?, ?, ?, ?, Now(), Now())",
        [newLicenseProduct.Name, newLicenseProduct.Description, newLicenseProduct.LogoImage, newLicenseProduct.InfoURL, newLicenseProduct.DownloadURL],
        (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created LicenseProduct: ", { id: res.id, ...newLicenseProduct });
            result(null, { id: res.id, ...newLicenseProduct });
        });
};

exports.findAll = result => {
    connection.query("SELECT * FROM tb_licensed_product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("LicenseProducts: ", res);
        result(null, res);
    });
};


exports.findById = (LicenseProductId, result) => {
    connection.query(`SELECT * FROM tb_licensed_product WHERE Id = ${LicenseProductId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found LicensedProduct: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found LicenseProduct with the id
        result({ kind: "not_found" }, null);
    });
};


exports.update = (id, LicenseProduct, result) => {
    connection.query(
        "UPDATE tb_licensed_product SET SoftwareType = ?, IsAuthorized = ? WHERE Id = ?",
        [LicenseProduct.SoftwareType, LicenseProduct.IsAuthorized, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found LicenseProduct with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated LicenseProduct: ", { id: id, ...LicenseProduct });
            result(null, { id: id, ...LicenseProduct });
        }
    );
};

exports.deleteAll = result => {
    connection.query("DELETE FROM tb_licensed_product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} LicenseProducts`);
        result(null, res);
    });
};

exports.deleteById = (id, result) => {
    connection.query("DELETE FROM tb_licensed_product WHERE Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found LicenseProduct with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tb_licensed_product with Id: ", id);
        result(null, res);
    });
};
