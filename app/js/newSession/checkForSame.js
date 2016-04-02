let checkForSame = function (staps, namesWorkout) {
    let count = 0;
    staps.forEach(function (stap) {
        namesWorkout.forEach(function (name) {
            if (stap.name == name) {
                return;
            }
            else {
                count++;
            }
        });
        if (count == namesWorkout.length) {
            namesWorkout.push(stap.name)
        }
    });
    localStorage.namesWorkout = angular.toJson(namesWorkout);
};

export default checkForSame;