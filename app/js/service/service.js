class Service {
    constructor() {
        let here = this;
        this.user = {};
        this.areYouLogin = false;
        if (localStorage.user) {
            this.areYouLogin = true;
            this.user = angular.fromJson(localStorage.user);
        }
        if (localStorage.sessions) {
            this.sessions = angular.fromJson(localStorage.sessions);
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

        if (localStorage.chooseSession) {
            this.chooseSession = angular.fromJson(localStorage.chooseSession)
        }
        else {
            this.chooseSession = false;
        }
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
            let date = new Date(session.time);
            var curr_date = date.getDate();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();

            time.push(curr_date + ":" + curr_month + ":" + curr_year);
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
                        values.push({"value": steps.actual, "option": steps.option});
                        count++;
                    }
                });
                if (count == 0) {
                    values.push({"value": null, "option": null});
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