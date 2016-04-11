class NewSessionController {
    constructor($http, Service, $state) {
        if (localStorage.stepsNewSession) {
            this.showFinishBtn = true;
            this.showTableSteps = true;
        }
        else {
            this.showFinishBtn = false;
            this.showTableSteps = false;
        }
        this.showFormNewStep = false;
        this.showAddNewStepButton = true;
        this.showFormFinishStep = false;
        this.stapOption = 'Minutes';

        if (localStorage.stepsNewSession) {
            this.staps = angular.fromJson(localStorage.stepsNewSession);
        }
        else {
            this.staps = [];
        }
        this.finish = function () {
            Service.checkForSame(this.staps, Service.namesWorkout);
            Service.sessions.push({"session": this.staps, "time": new Date()});
            localStorage.sessions = angular.toJson(Service.sessions);
            localStorage.removeItem("stepsNewSession");

            $http.post('/synchron', {
                    "sessions": Service.sessions,
                    "workoutNames": Service.namesWorkout,
                    "name": Service.user.name,
                    "password": Service.user.password
                })
                .success(function (data) {
                    localStorage.sessions = angular.toJson(data.sessions);
                    localStorage.namesWorkout = angular.toJson(data.workoutNames);
                    Service.sessions = data.sessions;
                    Service.namesWorkout = data.workoutNames;
                })
                .error(function () {
                    console.log('err');
                });
            $state.go('home');
        };
        this.getAllWorkoutNames = Service.namesWorkout;
    }

    formSubmit() {
        if (this.stapWeight == undefined) {
            this.stapWeight = 0;
        }
        this.addNewStep(this.stapName, this.stapPlanned, this.stapOption, this.stapActual);
        this.showTableSteps = true;
        this.showFormNewStep = false;
        this.showFormFinishStep = false;
        this.showAddNewStepButton = true;
        this.showFinishBtn = true;
        this.stapName = "";
        this.stapPlanned = "";
        this.stapActual = "";
    };

    addNewStep(name, planned, option, actual) {
        this.staps.push({
            "name": name,
            "planned": planned,
            "option": option,
            "actual": actual
        });
        this.save(this.staps);
        this.showEndStep = false;
    }

    start() {
        this.showFormNewStep = false;
        this.showFormFinishStep = true;
    }

    save(data) {
        localStorage.stepsNewSession = angular.toJson(data);
    }

    showNewStep() {
        this.showFormNewStep = true;
        this.showAddNewStepButton = false;
        this.showFinishBtn = false;
    }
}
export default NewSessionController;
