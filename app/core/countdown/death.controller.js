(function() {
    'use strict';

    angular
        .module('death-countdown')
        .controller('DeathController', DeathController);

    DeathController.$inject = ['deathFactory', 'toastr', '$timeout', '$interval'];

    /* @ngInject */
    function DeathController(deathFactory, toastr, $timeout, $interval) {
        var vm = this;

        vm.getDeathCountdown = getDeathCountdown;
        vm.hideOrShowQuestion = hideOrShowQuestion;
        vm.nextQuestion = nextQuestion;
        vm.hideOrShowFacts = hideOrShowFacts;
        vm.rotateFacts = rotateFacts;

        vm.header = 'Start your death timer!';
        vm.subHeader = 'Answer a few questions to learn about your impending doom.';

        vm.gender = '';
        vm.dob = '';

        vm.showHome = showHome;
        vm.showLoading = showLoading;
        vm.showResults = showResults;
        vm.initializeClock = initializeClock;

        vm.showHomeStatus = true;
        vm.showLoadingStatus = false;
        vm.showResultsStatus = false;

        vm.f1Status = true;
        vm.f2Status = false;
        vm.f3Status = false;
        vm.f4Status = false;

        ////////////////

        function getDeathCountdown(gender, dob) {
            deathFactory
                .getDeathCountdown(gender, dob)
                .then(function(response) {
                    vm.results = response.data.data;
                    vm.hoursWaiting = vm.results.date.years * 14;
                    vm.hoursFacebook = ((vm.results.date.days * 50) + (vm.results.date.years * 50 * 365)) / 60;
                    vm.hoursWorking = 7.6 * 260 * vm.results.date.years;
                    vm.hoursSelfies = 5 * 52 * vm.results.date.years;
                    vm.nextQuestion('question2','question3')
                    vm.error = false;
                    console.log(vm.results);
                })
                .catch(function(error) {
                    toastr.error('Ex: "1/1/60" or "1/1/1960"', 'Please enter a valid date format');
                })
        }

        function hideOrShowQuestion(questionNum) {
            return deathFactory.hideOrShowQuestion(questionNum);
        }

        function nextQuestion(currentQuestion, nextQuestion) {
            return deathFactory.nextQuestion(currentQuestion, nextQuestion);
        }

        function showHome() {
            vm.showHomeStatus = true;
            vm.showLoadingStatus = false;
            vm.showResultsStatus = false;
            vm.homeHeader = 'Start your death timer!';
            vm.subHeader = 'Answer a few questions to learn about your impending doom.';
        }


        function showLoading(id, timeObject) {
            vm.showHomeStatus = false;
            vm.showLoadingStatus = true;
            vm.showResultsStatus = false;
            vm.header = 'Talking to death, brb...';
            vm.subHeader = 'I like turtles.';
            $timeout(function() {
                showResults(id, timeObject);
            }, 5000);
        }

        function showResults(id, timeObject) {
            vm.showHomeStatus = false;
            vm.showLoadingStatus = false;
            vm.showResultsStatus = true;
            vm.header = 'Your death time has been calculated precisely!';
            vm.subHeader = 'Down to the second.';
            vm.initializeClock(id, timeObject);
            vm.rotateFacts();
        }

        function initializeClock(id, timeObject) {
            var clock = document.getElementById(id);
            var yearsSpan = clock.querySelector('.years');
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                yearsSpan.innerHTML = timeObject.years;
                daysSpan.innerHTML = timeObject.days;
                hoursSpan.innerHTML = timeObject.hours;
                minutesSpan.innerHTML = timeObject.minutes;
                secondsSpan.innerHTML = timeObject.seconds;
            }
            updateClock();

            setInterval(function() {
                if (timeObject.seconds === 0) {
                    timeObject.seconds = 59;
                    if (timeObject.minutes === 0) {
                        timeObject.minutes = 59;
                        timeObject.hours = timeObject.hours - 1;
                    } else {
                        timeObject.minutes = timeObject.minutes - 1;
                    }
                } else {
                    timeObject.seconds = timeObject.seconds - 1;
                }
                updateClock();
            },1000);
        }

        function rotateFacts() {
            $interval(function() {
                deathFactory.rotateFacts();
                vm.hideOrShowFacts();
            },4000);
        }

        function hideOrShowFacts() {
            vm.f1Status = deathFactory.hideOrShowFact(0);
            vm.f2Status = deathFactory.hideOrShowFact(1);
            vm.f3Status = deathFactory.hideOrShowFact(2);
            vm.f4Status = deathFactory.hideOrShowFact(3);
        }
    }
})();
