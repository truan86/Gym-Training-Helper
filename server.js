var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var json = require('json-file');
var file = json.read('./db/data.json');
var usersDb = file.get("users");

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.post('/adduser', function (req, res) {
    if (doseExistUserName(usersDb, req.body)) {
        res.send('badUserName');
    }
    else {
        usersDb.push({"name": req.body.name, "password": req.body.password, "sessions": [], "workoutNames": []});
        file.writeSync();
        res.send(req.body);
    }
});
app.post('/login', function (req, res) {
    var user = false;
    usersDb.forEach(function (item) {
        if (req.body.name == item.name && req.body.password == item.password) {
            user = true;
            res.send({"name": item.name, "password": item.password});
        }
    });
    if (!user) {
        res.status(500).send({error: 'Something failed!'});
    }
});

app.post('/synchron', function (req, res) {
    var usersDb = file.get("users");
    var syncSessions = syncFn(req.body.sessions, sessionsDb(usersDb, req.body.name, req.body.password));
    var syncWorkoutNames = syncFn(req.body.workoutNames, workoutNamesDb(usersDb, req.body.name, req.body.password));
    res.send({"sessions": syncSessions, "workoutNames": syncWorkoutNames});
    usersDb.forEach(function (user) {
        if (user.name == req.body.name && user.password == req.body.password) {
            user.sessions = syncSessions;
            user.workoutNames = syncWorkoutNames;
        }
    });
    file.writeSync();
});


var syncFn = function (localStorage, Db) {
    var syncDb = [];
    if (localStorage.length != 0 && Db.length != 0) {
        Db.forEach(function (session) {
            syncDb.push(session);
        });
        localStorage.forEach(function (sessionLocal) {
            var count = 0;
            syncDb.forEach(function (sessionDb) {
                if (typeof(sessionDb) == "object") {
                    if (sessionDb.time == sessionLocal.time) {
                        count++;
                    }
                }
                if (typeof(sessionDb) == "string") {
                    if (sessionDb == sessionLocal) {
                        count++;
                    }
                }
            });
            if (count == 0) {
                syncDb.push(sessionLocal);
            }
        });
    }
    if (localStorage.length === 0 && Db.length != 0) {
        Db.forEach(function (session) {
            syncDb.push(session);
        });
    }
    if (localStorage.length != 0 && Db.length === 0) {
        localStorage.forEach(function (session) {
            syncDb.push(session);
        });
    }
    if (localStorage.length === 0 && Db.length === 0) {
    }
    return syncDb;
};

var workoutNamesDb = function (users, name, password) {
    var workoutNames;
    users.forEach(function (user) {
        if (user.name == name && user.password == password) {
            workoutNames = user.workoutNames;
        }
    });
    return workoutNames;
};

var sessionsDb = function (users, name, password) {
    var sessions;
    users.forEach(function (user) {
        if (user.name == name && user.password == password) {
            sessions = user.sessions;
        }
    });
    return sessions;
};

var doseExistUserName = function (dbUsers, data) {
    var existUser = false;
    dbUsers.forEach(function (item) {
        if (item.name == data.name) {
            existUser = true;
        }
    });
    if (existUser) {
        return true;
    }
    else {
        return false;
    }
};

http.listen(3000, function () {
    console.log('listening on 3000');
});
