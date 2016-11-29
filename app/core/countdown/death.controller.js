(function() {
    'use strict';

    angular
        .module('death-countdown')
        .controller('DeathController', DeathController);

    DeathController.$inject = ['deathFactory', 'toastr','$timeout'];

    /* @ngInject */
    function DeathController(deathFactory, toastr, $timeout) {
        var vm = this;

        vm.getCountdown = getCountdown;

        vm.header = 'Start your death timer!';
        vm.subHeader = 'Answer a few questions to learn about your impending doom.';

        vm.gender = '';
        vm.dob = '';

        vm.showHome = showHome;
        vm.showLoading = showLoading;
        vm.showResults = showResults;

        vm.showHomeStatus = true;
        vm.showLoadingStatus = false;
        vm.showResultsStatus = false;

        ////////////////

        function getCountdown(gender, dob) {
            deathFactory
                .getDeathCountdown(gender, dob)
                .then(function(response) {
                    vm.results = response.data.data;
                    vm.hoursWaiting = vm.results.date.years*14;
                    vm.hoursFacebook = ((vm.results.date.days*50)+(vm.results.date.years*50*365))/60;
                    vm.hoursWorking = 7.6*260*vm.results.date.years;
                    vm.hoursSelfies = 5*52*vm.results.date.years;
                    console.log(vm.results);
                })
                .catch(function(error) {
                    //toastr.error("That you suck","We're sorry");
                    console.log("error");
                })




        }

        function showHome() {
            vm.showHomeStatus = true;
            vm.showLoadingStatus = false;
            vm.showResultsStatus = false;
            vm.homeHeader = 'Start your death timer!';
            vm.subHeader = 'Answer a few questions to learn about your impending doom.';
        }


        function showLoading() {
            vm.showHomeStatus = false;
            vm.showLoadingStatus = true;
            vm.showResultsStatus = false;
            vm.header = 'Talking to death, brb...';
            vm.subHeader = 'I like turtles.';
            $timeout(function() {
                showResults();
            },5000);
            console.log(vm.gender);
        }

        function showResults() {
            vm.showHomeStatus = false;
            vm.showLoadingStatus = false;
            vm.showResultsStatus = true;
            vm.header = 'Your death time has been calculated precisely!';
            vm.subHeader = 'Down to the second.';
        }
    }
})();
