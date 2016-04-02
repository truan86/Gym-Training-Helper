class SingleSessionDataController {
    constructor(Service, $state) {
        if (Service.chooseSession === false) {
            $state.go('home');
        }
        else {
            this.sessions = Service.sessions[Service.chooseSession].session;
            this.sessionTime = Service.sessions[Service.chooseSession].time;
        }


        this.labels = this.stapNames(this.sessions);
        this.series = ['Planned', 'Actual', 'Progress'];
        this.data = [
            [10, 59],
            [28, 48],
            [24, 54]
        ];
    }

    stapNames(sessions) {
        let names = [];
        sessions.forEach(function (item) {
            names.push(item.name);
        });
        return names;
    };

}
export default SingleSessionDataController;
