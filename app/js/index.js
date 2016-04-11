import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';
import angularChart from 'angular-chart.js';

import homeTemplate from '../partials/home.html';
import newSessionTemplate from '../partials/newSession.html';
import singleSessionDataTemplate from '../partials/SingleSessonData.html';
import resultsTemplate from '../partials/results.html';

import HomeController from '../js/home/home';
import NewSessionController from '../js/newSession/session';
import SingleSessionDataController from '../js/singleSessionData/singleSessionData';
import ResultsController from '../js/results/results'
import Service from '../js/service/service';


angular.module('app', [angularUiRouter, angularUiBootstrap, "chart.js"])
    .controller('HomeController', ['$http', 'Service', '$state', HomeController]) //for uglyfy Js
    .controller('NewSessionController', ['$http','Service', '$state', NewSessionController])
    .controller('SingleSessionDataController', ['Service', '$state', SingleSessionDataController])
    .controller('ResultsController', ['Service', '$state', ResultsController])
    .service('Service', Service)
    .config(appConfig)
    .config(['ChartJsProvider', function (ChartJsProvider) {
        ChartJsProvider.setOptions({
            colours: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: true
        });
    }]);


appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];//for uglyfy js

function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: "/",
            template: homeTemplate,
            controller: 'HomeController as home'
        })
        .state('newsession', {
            url: '/new',
            template: newSessionTemplate,
            controller: 'NewSessionController as new'
        })
        .state('singleSessionData', {
            url: '/single',
            template: singleSessionDataTemplate,
            controller: 'SingleSessionDataController as single'
        })
        .state('results', {
            url: '/results',
            template: resultsTemplate,
            controller: 'ResultsController as results'
        })
}
