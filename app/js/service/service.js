class Service {
    constructor() {
        if (localStorage.sessions) {
            this.sessions = angular.fromJson(localStorage.sessions)
        }
        else {
            this.sessions = [];
        }
        this.chooseSession = false;
    }
}
export default Service;