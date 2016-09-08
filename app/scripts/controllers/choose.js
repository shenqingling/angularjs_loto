'use strict';
// angular模块定义
var myAppModule = angular.module('lotoApp', []);

// $scope : 上下文对象
// 双色球机选控制器
myAppModule.controller('chooseCtrl', function($scope) {
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
        for (v in obj) {
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
            } else if ($scope.next == 8) {
                // 设定篮球数字
                $scope.balls[ball] = num;
            }

            // 超时
            if ($scope.isReady >= time) {
                clearInterval($scope.intval);
                $scope.whichBall = 'redBall' + $scope.next;
                if ($scope.next == 8) {
                    $scope.isStart = false;
                }
                $scope.next++;
            }
        };

        // 每100ms更新输入框的值
        $scope.intval = setInterval(function() {
            $scope.$apply(updateball);
            $scope.isReady = $scope.isReady + 100;
        }, 100);
        updateball();
    };

    // 当自动执行至下一个文本框时执行
    function watchFun(newValue, oldValue, scope) {
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
});
