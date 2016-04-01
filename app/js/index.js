import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';

import homeTemplate from '../partials/home.html';
import newSessionTemplate from '../partials/newSession.html';
import singleSessionDataTemplate from '../partials/SingleSessonData.html';

import HomeController from '../js/home/home.js';
import NewSessionController from '../js/newSession/session';
import SingleSessionDataController from '../js/singleSessionData/singleSessionData';
import Service from '../js/service/service.js';


angular.module('app', [angularUiRouter, angularUiBootstrap])
    .controller('HomeController', HomeController)
    .controller('NewSessionController', NewSessionController)
    .controller('SingleSessionDataController', SingleSessionDataController)
    .service('Service', Service)

    .config(function ($stateProvider, $urlRouterProvider) {
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

    });
