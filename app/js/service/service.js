class Service {
    constructor() {
        if (localStorage.sessions) {
            this.sessions = angular.fromJson(localStorage.sessions)
        }
        else {
            this.sessions = [];
        }
        if (localStorage.namesWorkout) {
            this.namesWorkout = angular.fromJson(localStorage.namesWorkout)
        }
        else {
            this.namesWorkout = [];
        }
        this.chooseSession = false;

        this.checkForSame = function (steps, namesWorkout) {
            steps.forEach(function (step) {
                let count = 0;
                namesWorkout.forEach(function (name) {
                    if (name == step.name) {
                        count++;
                    }
                });
                if (count == 0) {
                    namesWorkout.push(step.name)
                }
            });
            localStorage.namesWorkout = angular.toJson(namesWorkout);
        };
    }

    times(sessions) {
        let time = [];
        sessions.forEach(function (session) {
            let dateFormat = session.time.toString().slice(0, 10);
            time.push(dateFormat)
        });
        return time;
    }

    chooseByTime(sessions, namesWorkout) {
        let results = [];
        namesWorkout.forEach(function (name) {
            let values = [];
            sessions.forEach(function (session) {
                let count = 0;
                session.session.forEach(function (steps) {
                    if (name == steps.name) {
                        values.push({"value": steps.actual});
                        count++;
                    }
                });
                if (count == 0) {
                    values.push({"value": null});
                }
            });
            results.push({"name": name, "values": values})
        });
        return results;
    };

    dataForLineChart(results) {
        let data = [];
        results.forEach(function (result) {
            let valuesByName = [];
            result.values.forEach(function (value) {
                valuesByName.push(value.value)
            });
            data.push(valuesByName)
        });
        return data;
    }
}
export default Service;