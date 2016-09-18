'use strict';

/**
 * @ngdoc function
 * @name lotoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lotoApp
 */
angular.module('lotoApp')
    .controller('MainCtrl', function() {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .controller('chooseCtrl', function($scope, $interval) {
        // 变量初始化
        // 双色球
        $scope.balls = {};
        // 双色球是否滚动
        $scope.isStart = false;
        // 预备操作双色球
        $scope.next = 1;
        $scope.whichBall = '';

        // 点击 开始 按钮
        $scope.start = function() {
            // 清空数字
            $scope.balls = {};
            // 按钮置灰
            $scope.isStart = true;
            // 当前操作双色球
            $scope.next = 1;
            $scope.whichBall = 'redBall' + $scope.next;
            // 下一个操作双色球
            $scope.next++;
        };

        // 判断某值是否已经是某对象的value值
        function in_obj(value, obj) {
            for (var v in obj) {
                if (obj[v] == value) {
                    return true;
                }
            }
            return false;
        }

        // 球的编号不断变化
        var calcBall = function(ball, maxValue, time) {
            // 初始为0
            $scope.balls[ball] = 0;
            $scope.isReady = 0;

            // 设定按照某频率做某事
            var updateball = function() {
                // 获取随机数
                var num = Math.floor(Math.random(0, 1) * maxValue) + 1;

                if ($scope.next < 8 && !in_obj(num, $scope.balls)) {
                    // 红球数字，不重复
                    $scope.balls[ball] = num;
                } else if ($scope.next === 8) {
                    // 设定篮球数字
                    $scope.balls[ball] = num;
                }

                // 超时
                if ($scope.isReady >= time) {
                    // clearInterval($scope.intval);
                    $interval.cancel($scope.intval);
                    $scope.whichBall = 'redBall' + $scope.next;
                    if ($scope.next === 8) {
                        $scope.isStart = false;
                    }
                    $scope.next++;
                }
            };

            // 每100ms更新输入框的值
            // $scope.intval = setInterval(function() {
            //     $scope.$apply(updateball);
            //     $scope.isReady = $scope.isReady + 100;
            // }, 100);
            $scope.intval = $interval(function() {
                updateball();
                $scope.isReady = $scope.isReady + 100;
            }, 100);
            updateball();

        };

        // 当自动执行至下一个文本框时执行
        function watchFun(newValue) {
            if (newValue != '') {
                // 截取到球的编号
                if (newValue.substring(7) < 7) {
                    // 红球
                    calcBall(newValue, 33, 2000);
                } else if (newValue.substring(7) == 7) {
                    // 篮球
                    calcBall(newValue, 16, 2000);
                }
            }
        }

        // $watch : $scope 的内置函数，检测变量的变化，自动回调
        // 有3个参数，第三个是：deepWatch
        $scope.$watch('whichBall', watchFun);
    })
    .controller('historyCtrl', function($scope, $http) {
        $scope.showAll = true;

        /*var url = '';
        $http.get(url).success(function(data,status,headers,config){
            $scope.historyList = data;
        })*/

        var url = '../../data/data.txt';
        $http.get(url).success(function(data, status, headers, config) {
            var dataArr = data.split('\n');
            $scope.historyList = [];
            for (var i = 0; i < dataArr.length; i++) {
                var ball = dataArr[i].split(',');
                var item = {};
                item['firstBall'] = ball[0];
                item['sencondBall'] = ball[1];
                item['thirdBall'] = ball[2];
                item['fifthBall'] = ball[3];
                item['fifthBall'] = ball[4];
                item['sixBall'] = ball[5];
                item['blueBall'] = ball[6];
                $scope.historyList[i] = item;
            }
        });

        // 历史纪录 初始化
        // $scope.historyList = [
        //     { openDate: '20160921', firstBall: 2, sencondBall: 3, thirdBall: 6, forthBall: 16, fifthBall: 17, sixBall: 26, blueBall: 8 },
        //     { openDate: '20160915', firstBall: 4, sencondBall: 5, thirdBall: 9, forthBall: 16, fifthBall: 26, sixBall: 31, blueBall: 5 },
        //     { openDate: '20160913', firstBall: 4, sencondBall: 9, thirdBall: 13, forthBall: 18, fifthBall: 20, sixBall: 28, blueBall: 10 }
        // ];

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
            for (var v in item) {
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

        $scope.showRedBlueFunc = function(argument) {
            $scope.showAll = true;
            $scope.showRed = false;
        }

        $scope.showRedFunc = function(argument) {
            $scope.showAll = false;
            $scope.showRed = true;
        }

        $scope.showBlueFunc = function(argument) {
            $scope.showAll = false;
            $scope.showRed = false;
        }
    });
