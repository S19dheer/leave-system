var leaveDao = require("../dao/leaveDao");
var leaveCollection = "userleaveData";

exports.userLogin = function(username, password, done) {
    leaveDao.authenticatLeave(username, leaveCollection, function(error, user) {
        if (error) {
            return done(error);
        };

        if (!user) {
            return done(null, false, {
                message: "Incurrect User"
            });
        };

        if (user.password != password) {
            return done(null, false, {
                message: "Incurrect Password"
            });
        };

        return done(null, user);
    });
}

exports.userApply = function(request, response) {
    var dateForLeave = {
        leavedata: request.body,
        user: request.user
    };
    leaveDao.applyLeave(dateForLeave, leaveCollection, function(error, result) {
        response.json({
            "result": result
        });
        response.end();
    });
}

exports.showApplyDate = function(request, response) {
    var user = request.user;
    leaveDao.showLeave(user, leaveCollection, function(error, result) {
        response.json({
            "result":result
        });
    });
}

exports.insertDate = function(request, response) {
    leaveDao.applyLeave(leaveDate, leaveCollection, function(error, result) {
        response.json({
            "result": result
        });
        response.end();
    });
}
