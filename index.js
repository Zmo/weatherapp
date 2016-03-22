var weatherApp = angular.module("weatherApp", []);

weatherApp.controller("weatherCtrl", "$http", function($http) {

    this.savedCities = [];

    this.searchCity = function(city) {
        // Really bad to include apikey here, but without any server side code there are no other options
        $http.get("http://api.wunderground.com/api/c8d1b9e930ae1150/geolookup/q/"+city+".json").then(function(result) {
            console.log(result);
        }, function(error) {
            this.errorMessage = error;
        };
    };

    this.searchWeather = function(country, city) {
        // Really bad to include apikey here, but without any server side code there are no other options
        $http.get("http://api.wunderground.com/api/c8d1b9e930ae1150/geolookup/q/"+country+"/"+city+".json").then(function(result) {
            console.log(result);
        }, function(error) {
            this.errorMessage = error;
        };
    };

    this.saveCity = function(city) {
        this.savedCities.push(city);
    };
});
