class HomeController {
    constructor(Service, $state) {
        this.sessions = Service.sessions;

        this.chooseSession = function (id) {
            Service.chooseSession = id;
            $state.go('singleSessionData');
        };


        this.dellSession = function (id) {
            Service.sessions.splice(id, 1);
            this.sessions = Service.sessions;
            localStorage.sessions = angular.toJson(Service.sessions);
        }
    }
}
export default HomeController;
