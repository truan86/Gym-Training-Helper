class NewSessionController {
    constructor(Service, $state) {
        this.showFormNewStep = false;
        this.showAddNewStepButton = true;
        this.showInputNewStep = true;
        this.disableStart = true;
        this.showFinishBtn = false;

        if (localStorage.stepsNewSession) {
            this.staps = angular.fromJson(localStorage.stepsNewSession);
        }
        else {
            this.staps = [];
        }
        this.finish = function () {
            Service.sessions.push({"session": this.staps, "time": new Date()});
            localStorage.sessions = angular.toJson(Service.sessions);
            localStorage.removeItem("stepsNewSession");
            $state.go('home');
        }
    }

    formSubmit() {
        if (this.stapWeight == undefined) {
            this.stapWeight = 0;
        }
        this.addNewStep(this.stapName, this.stapPlanned, this.stapWeight, this.stapOption, this.stapActual);
        this.showFormNewStep = false;
        this.showInputNewStep = true;
        this.showAddNewStepButton = true;
        this.showFinishBtn = true;
    };


    addNewStep(name, planned, weight, option, actual) {
        this.staps.push({
            "name": name,
            "planned": planned,
            "option": option,
            "weight": weight + "KG",
            "actual": actual
        });
        this.save(this.staps);
        this.showEndStep = false;
    }

    start() {
        this.showInputNewStep = false;
    }

    save(data) {
        localStorage.stepsNewSession = angular.toJson(data);
    }

    showNewStep() {
        this.showFormNewStep = true;
        this.showAddNewStepButton = false;
        this.showFinishBtn = false;
    }

    getAllWorkoutStep() {
        let allWoroutName = [];
        this.staps.forEach(function (item) {
            allWoroutName.push(item.name);
        });
        return allWoroutName;
    }

}
export default NewSessionController;
