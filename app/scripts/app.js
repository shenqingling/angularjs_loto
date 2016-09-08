'use strict';

/**
 * @ngdoc overview
 * @name lotoApp
 * @description
 * # lotoApp
 *
 * Main module of the application.
 */
angular
  .module('lotoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // 主页
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      // 双色球机选
      .when('/view/choose', {
        templateUrl: 'views/choose.html',
        controller: 'chooseCtrl',
        controllerAs: 'main'
      })
      // 双色球历史趋势
      .when('/view/history', {
        templateUrl: 'views/history.html',
        controller: 'historyCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
