class SingleSessionDataController {
    constructor(Service, $state) {
        if (Service.chooseSession === false) {
            $state.go('home');
        }
        else {
            this.session = Service.sessions[Service.chooseSession].session;
            this.sessionTime = Service.sessions[Service.chooseSession].time;
        }


        this.labels = this.namesOfSteps(this.session);
        this.series = ['Planned', 'Actual', 'Difference'];
        this.data = this.dataSession(this.session);
    }

    dataSession(sessions) {
        let planned = [];
        let actual = [];
        let progress = [];
        sessions.forEach(function (item) {
            progress.push(Math.abs(item.planned - item.actual));
            planned.push(item.planned);
            actual.push(item.actual);
        });
        let data = [planned, actual, progress];
        return data;
    }

    namesOfSteps(session) {
        let names = [];
        session.forEach(function (item) {
            names.push(item.name);
        });
        return names;
    };

}
export default SingleSessionDataController;
