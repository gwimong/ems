
const PCModel = require("../models/pc.model.js");
const PCRepository = require("../repository/pc.repository.js");

exports.readAll = (req, res) => {
    PCRepository.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pc list."
            });
        else {
            res.send(data);
        }
    });
};
