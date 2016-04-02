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
        else{
            this.namesWorkout = [];
        }
        this.chooseSession = false;
    }
}
export default Service;