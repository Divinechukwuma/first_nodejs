const express = require('express');
const router = express.Router();
const employeesContoller = require("../../controllers/cmployeesContoller");

router.route('/')
    .get(employeesContoller.getAllEmployees)
    .post(employeesContoller.createNewEmployees)
    .put(employeesContoller.updateEmployees)
    .delete(employeesContoller.deleteEmployees);

router.route("/:id")
    .get(employeesContoller.getEmployees);

module.exports = router;