var weatherApp = angular.module("weatherApp", []);

weatherApp.controller("weatherCtrl", ["$http", function($http) {

    var vm = this;
    vm.cities = [];
    vm.savedCities = [];

    vm.searchCity = function(city) {
        vm.cities = [];
        // Really bad to include apikey here, but without any server side code there are no other options
        $http.get("http://api.wunderground.com/api/c8d1b9e930ae1150/geolookup/q/"+city+".json").then(function(result) {
            if (result.data.response.error) {
                vm.errorMessage = result.data.response.error;
            } else if(result.data.location) {
                vm.getCityWeather(result.data.location.country, result.data.location.state, result.data.location.city);
            } else {
                result.data.response.results.forEach(function(city) {
                    city.displayName = generateDisplayName(city);
                });
                vm.cities = result.data.response.results;
            }
        }, function(error) {
            vm.errorMessage = error;
        });
    };

    vm.getCityWeather = function(country, state, city) {
        var locParam = state ? state : country;
        // Really bad to include apikey here, but without any server side code there are no other options
        $http.get("http://api.wunderground.com/api/c8d1b9e930ae1150/conditions/q/"+locParam+"/"+city+".json").then(function(result) {
            if (result.data.response.error) {
                vm.errorMessage = result.data.response.error.description;
            } else {
                vm.currentWeather = result.data.current_observation;
                vm.currentWeather.city = city;
            }
        }, function(error) {
            vm.errorMessage = error;
        });
    };

    vm.saveCity = function(weatherObs) {
        var temp = vm.savedCities;
        temp.push({displayName: weatherObs.display_location.full, city: weatherObs.observation_location.city,
        state: weatherObs.observation_location.state, country: weatherObs.observation_location.country});
        temp.sort(function(a,b) { return a.displayName.localeCompare(b.displayName); });
        vm.savedCities = temp;
    };

    function generateDisplayName(loc) {
        var ret = loc.city+", ";
        ret += loc.state ? loc.state+", " : "";
        ret += loc.country_name;
        return ret;
    }
}]);
