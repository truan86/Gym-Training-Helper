class SingleSessionDataController {
    constructor(Service, $state) {
        if (Service.chooseSession === false) {
            $state.go('home');
        }
        else {
            this.sessions = Service.sessions[Service.chooseSession].session;
        }
    }
}
export default SingleSessionDataController;
