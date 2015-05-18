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

exports.userLogout = function(request, response) {

}

exports.insertDate = function(request, response) {
    leaveDao.applyLeave(leaveDate, leaveCollection, function(error, result) {
        response.json({
            "result": result
        });
        response.end();
    });
}
