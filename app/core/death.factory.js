(function() {
    'use strict';

    angular
        .module('death-countdown')
        .factory('deathFactory', deathFactory);

    deathFactory.$inject = ['$http'];

    function deathFactory($http) {
        var service = {
            getDeathCountdown: getDeathCountdown,
            getById: getById
        };

        return service;

        ///////////////////

        function getDeathCountdown(gender, dob) {
            console.log("countdown function");
            return $http.get('https://life-left.p.mashape.com/time-left?birth=' + dob + '&gender=' + gender, {
                headers: {
                    'X-Mashape-Key': 'YOD7hj7GoXmshmDUKeE5aaZwaZa8p1llKS9jsnrSdjNjakn0tv'
                }
            }); //this returns promise that will either get fulfilled (.then) or rejected (.catch)
        }

        function getById(imdbId) {
            console.log("getById function");
            return $http.get('http://omdbapi.com/?i=' + imdbId);
        }
    }

})();

//CHECK IT OUT
//"Hoisting" takes all the variables and functions from any scope and moves them to the top of their enclosing scope