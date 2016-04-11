class ResultsController {
    constructor(Service, $state) {
        let here = this;
        this.namesWorkout = [];
        Service.namesWorkout.forEach(function (item) {
            here.namesWorkout.push({"name": item})
        });
        this.sessions = Service.sessions;
        this.sessionsResults = Service.chooseByTime(this.sessions, Service.namesWorkout);
        this.labels = Service.times(this.sessions);
        this.series = Service.namesWorkout;
        this.data = Service.dataForLineChart(this.sessionsResults);
    }
}
export default ResultsController;