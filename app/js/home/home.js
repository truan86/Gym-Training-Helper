class HomeController {
    constructor(Service,$state) {
        this.sessions = Service.sessions;

        this.chooseSession = function(id){
            Service.chooseSession = id;
            $state.go('singleSessionData');
        }
    }
}
export default HomeController;
