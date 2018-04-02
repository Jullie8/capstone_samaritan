var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/charity_info';
var db = pgp(connectionString);
const authHelpers = require('../auth/helpers');
const passport = require('../auth/local');

function getAllCharities(req, res, next) {
    db.any('select * from charity_name')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL charities'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleCharity(req, res, next) {
    db.any('select * from charity_name where charity_name = ${charity}',
        req.params)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Fetched one charity'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateSingleUser(req, res, next) {
    db.none('update users set username = ${newName} where username = ${username}',
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Changed one charity'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    registerUser: registerUser,
    updateSingleUser: updateSingleUser
};
