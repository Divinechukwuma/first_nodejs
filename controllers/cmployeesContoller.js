const data = {};
data.employees = require("../model/employees.json");

//The logic of ur code in every language should alwyas be in the contoller

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployees = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const updateEmployees = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteEmployees = (req, res) => {
    res.json({ "id": req.body.id })
}

const getEmployees = (req, res) => {
    res.json({ "id": req.params.id })
}

module.exports = {
    getAllEmployees,
    createNewEmployees,
    updateEmployees,
    deleteEmployees,
    getEmployees
};