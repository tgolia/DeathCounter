(function() {
    'use strict';

    angular
        .module('death-countdown')
        .factory('deathFactory', deathFactory);

    deathFactory.$inject = ['$http'];

    function deathFactory($http) {
        var vm = this;
        var service = {
            getDeathCountdown  : getDeathCountdown,
            hideOrShowQuestion : hideOrShowQuestion,
            nextQuestion       : nextQuestion
        };

        var questions = {
            header    : true,
            question1 : false,
            question2 : false,
            question3 : false,
            question4 : false,
            question5 : false,
            question6 : false,
            question7 : false
        };

        return service;

        ///////////////////

        function getDeathCountdown(gender, dob) {
            return $http.get('https://life-left.p.mashape.com/time-left?birth=' + dob + '&gender=' + gender, {
                headers: {
                    'X-Mashape-Key': 'YOD7hj7GoXmshmDUKeE5aaZwaZa8p1llKS9jsnrSdjNjakn0tv'
                }
            }); //this returns promise that will either get fulfilled (.then) or rejected (.catch)
        }

        function hideOrShowQuestion(questionNum) {
            return questions[questionNum];
        }

        function nextQuestion(currentQuestion, nextQuestion) {
            questions[currentQuestion] = false;
            questions[nextQuestion] = true;
        }

    }

})();

//CHECK IT OUT
//"Hoisting" takes all the variables and functions from any scope and moves them to the top of their enclosing scope
