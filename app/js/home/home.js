class HomeController {
    constructor($http, Service, $state) {
        let here = this;
        this.user = Service.user;
        this.areYouLogin = Service.areYouLogin;
        this.sessions = Service.sessions;
        this.showRegistrationWindow = false;
        this.logOut = function () {
            Service.user = {};
            this.user = Service.user;
            localStorage.clear();
            Service.areYouLogin = false;
            here.areYouLogin = Service.areYouLogin;
            Service.namesWorkout = [];
            here.namesWorkout = Service.namesWorkout
            Service.sessions = [];
            here.sessions = Service.sessions;
        };
        this.login = function () {
            $http.post('/login', {'name': this.loginName, 'password': this.loginPassword})
                .success(function (data) {
                    Service.user = data;
                    here.user = Service.user;
                    localStorage.user = angular.toJson(Service.user);
                    Service.areYouLogin = true;
                    here.areYouLogin = Service.areYouLogin;
                    here.showRegistrationWindow = false;
                    here.sync()
                })
                .error(function (data) {
                    alert(data.error);
                })
        };
        this.openRegistration = function () {
            (this.showRegistrationWindow == false) ? this.showRegistrationWindow = true : this.showRegistrationWindow = false;
        };

        this.chooseSession = function (id) {
            Service.chooseSession = id;
            localStorage.chooseSession = angular.toJson(id);
            $state.go('singleSessionData');
        };

        this.submitAddUser = function () {
            $http.post('/adduser', {"name": here.addUserName, "password": here.addUserPassword})
                .success(function (data) {
                    Service.user = data;
                    here.user = Service.user;
                    localStorage.user = angular.toJson(Service.user);
                    Service.areYouLogin = true;
                    here.areYouLogin = Service.areYouLogin;
                    here.showRegistrationWindow = false;
                    localStorage.clear();

                })

        };

        this.sync = function () {
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
                    here.sessions = Service.sessions;
                })
                .error(function () {
                    console.log('err');
                })
        };
    }
}
export default HomeController;
