import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';
import angularChart from 'angular-chart.js';

import homeTemplate from '../partials/home.html';
import newSessionTemplate from '../partials/newSession.html';
import singleSessionDataTemplate from '../partials/SingleSessonData.html';

import HomeController from '../js/home/home.js';
import NewSessionController from '../js/newSession/session';
import SingleSessionDataController from '../js/singleSessionData/singleSessionData';
import Service from '../js/service/service.js';


angular.module('app', [angularUiRouter, angularUiBootstrap, "chart.js"])
    .controller('HomeController', ['Service', '$state', HomeController]) //'Service','$state' for uglyfy Js
    .controller('NewSessionController', ['Service', '$state', NewSessionController])
    .controller('SingleSessionDataController', ['Service', '$state', SingleSessionDataController])
    .service('Service', Service)
    .config(appConfig)
    .config(['ChartJsProvider', function (ChartJsProvider) {
        ChartJsProvider.setOptions({
            colours: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: false
        });
    }]);


appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];//for ugly js

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
}
