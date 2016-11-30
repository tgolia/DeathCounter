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
            nextQuestion       : nextQuestion,
            rotateFacts        : rotateFacts,
            hideOrShowFact     : hideOrShowFact
        };

        var questions = {
            header: true,
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
            question6: false,
            question7: false,
        };

        var facts = [true, false, false, false];
        var i = 0;

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

        function rotateFacts() {
            facts[i%facts.length] = false;
            if (i%facts.length === 3) {
                facts[i%facts.length - 3] = true;
            } else {
                facts[i%facts.length + 1] = true;
            }
            i++;
        }
            //         setTimeout(function() {
            //     console.log(i);
            //     facts[i%facts.length] = false;
            //     facts[i%facts.length + 1] = true;
            //     i++;
            //     if (i<rotations) {
            //         rotateFacts(rotations)
            //     }
            // }, 2000)
            // facts[i % facts.length] = false;
            // facts[i % facts.length + 1] = true;

        function hideOrShowFact(index) {
            return facts[index];
        }
    }
})();

//CHECK IT OUT
//"Hoisting" takes all the variables and functions from any scope and moves them to the top of their enclosing scope
