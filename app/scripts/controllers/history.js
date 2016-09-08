'use strict';
// angular模块定义
var myAppModule = angular.module('lotoApp', []);

// $http：用于和服务器的交互
// 双色球历史趋势控制器
myAppModule.controller('historyCtrl', function($scope, $http) {
    var url = '';
    /*$http.get(url).success(function(data,status,headers,config){
        $scope.historyList = data;
    })*/
    // 历史纪录 初始化
    $scope.historyList = [
        { openDate: '20160921', firstBall: 2, sencondBall: 3, thirdBall: 6, forthBall: 16, fifthBall: 17, sixBall: 26, blueBall: 8 },
        { openDate: '20160915', firstBall: 4, sencondBall: 5, thirdBall: 9, forthBall: 16, fifthBall: 26, sixBall: 31, blueBall: 5 },
        { openDate: '20160913', firstBall: 4, sencondBall: 9, thirdBall: 13, forthBall: 18, fifthBall: 20, sixBall: 28, blueBall: 10 }
    ];

    // 红球初始化 33个
    $scope.redList = [];
    for (var i = 0; i < 33; i++) {
        $scope.redList[i] = i + 1;
    };

    // 蓝球初始化 16个
    $scope.blueList = [];
    for (var i = 0; i < 16; i++) {
        $scope.blueList[i] = i + 1;
    };

    // num - ball number
    // item - history
    // type - red / blue
    $scope.isSelected = function(num, item, type) {
        for (v in item) {
            if (type === 'redBall') {
                if (num == item[v] && v != 'blueBall') {
                    return true;
                }
            } else if (type === 'blueBall') {
                if (num == item[v] && v == 'blueBall') {
                    return true;
                }
            }
        }
    };
});
