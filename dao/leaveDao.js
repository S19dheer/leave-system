var mongo = require("mongoskin");
var db = mongo.db("mongodb://localhost:27017/leaveSystemData");

exports.authenticatLeave = function(username, leaveCollection, callback) {
    db.collection(leaveCollection).findOne({
        "username": username
    }, function(error, user) {
        callback(error, user);
        db.close();
    });
}

exports.applyLeave = function(leavedate, leaveCollection, callback) {
    var userLeaveData = {
        "_id": mongo.helper.toObjectID(leavedate.user._id)
    };

    var setLeaveData = {
        'leaveData.date': leavedate.leavedata.date,
        'leaveData.leave': leavedate.leavedata.leave
    };
    db.collection(leaveCollection).update(userLeaveData, {
        $set: setLeaveData
    }, function(error, result) {
        callback(error, result);
        db.close();
    });
}

exports.showLeave = function(user, leaveCollection, callback) {
    var uid = {
        "_id":mongo.helper.toObjectID(user._id)
    };
    db.collection(leaveCollection).find(uid).toArray(function(error, result) {
        callback(error, result);
        db.close();
    });
}

exports.cancilLeave = function(leavedate, leaveCollection, callback) {
    db.collection(leaveCollection).insert(leavedate, function(error, result) {
        callback(error, result);
        db.close();
    });
}
