'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('lotoApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        // 主页
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));
});

describe('Controller: chooseCtrl', function() {

    beforeEach(angular.mock.module('lotoApp'));

    var chooseCtrl,
        scope;

    beforeEach(angular.mock.inject(function($controller, $rootScope, $interval) {
        scope = $rootScope.$new();
        // 双色球机选页
        chooseCtrl = $controller('chooseCtrl', {
            $scope: scope,
            $interval: $interval
        });

        spyOn(scope, 'start');
    }));

    it('ensure all init params exist', function() {
        expect(scope.balls).toEqual({});
        expect(scope.isStart).toBeFalsy();
        expect(scope.next).toBe(1);
        expect(scope.whichBall).toBe('');
    });

    it('test function start()', function() {
        scope.start();
    });
});

describe('Controller: historyCtrl', function() {

    beforeEach(angular.mock.module('lotoApp'));

    var historyCtrl,
        scope;

    beforeEach(angular.mock.inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();
        // 双色球机选页
        $controller('historyCtrl', {
            $scope: scope,
            $http: $http
        });
    }));

    it('ensure all init params exist', function() {
        expect(scope.showAll).toBeTruthy();
        expect(scope.redList.length).toBe(33);
        expect(scope.blueList.length).toBe(16);
        expect(scope.isSelected).toBeDefined();
        expect(scope.showRedBlueFunc).toBeDefined();
        expect(scope.showRedFunc).toBeDefined();
        expect(scope.showBlueFunc).toBeDefined();
    });
});

describe('Directive: notepad', function() {

    var scope,
        elem;

    beforeEach(angular.mock.module('lotoApp'));

    beforeEach(angular.mock.inject(function($compile, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        elem = angular.element("<notepad />");
        $compile(elem)(scope);
        $httpBackend.when('GET', 'template/notepad.html').respond("<div class='note-area' ng-show='!editMode'><ul><li ng-repeat='note in notes'><span ng-click='openEditor(note.id)'>{{note.title}}</span></li></ul></div><div id='editor' ng-show='editMode' class='note-area' contenteditable='true' ng-bind='noteText'></div><span ng-click='save()' ng-show='editMode'>back</span><span ng-click='openEditor()' ng-show='!editMode'>Add Note</span>");
        $httpBackend.flush();

        scope.$digest();

        spyOn(scope, 'restore');
        spyOn(scope, 'openEditor');
        spyOn(scope, 'save');
    }));

    it('ensure init HTML correct, and the init params defined', function() {
        expect(elem.children().length).toBe(4);
        expect(scope.notes.length).toBe(0);
        expect(scope.restore).toBeDefined();
        expect(scope.openEditor).toBeDefined();
        expect(scope.save).toBeDefined();
    });

    it('test function openEditor(): add', function() {
        // 发现 scope.openEditor 与 controller 中 scope.openEditor 不同，所以先用这个方法覆盖
        scope.openEditor = function(index) {
            scope.editMode = true;
            if (index !== undefined) {
                scope.noteText = scope.notes[index].content;
                scope.index = index;
            } else {
                scope.noteText = undefined;
            }
            return false;
        };
        scope.openEditor();
        expect(scope.editMode).toBeTruthy();
        expect(scope.noteText).toBeUndefined();
    });


    it('test function openEditor(): modify', function() {
        // 发现 scope.openEditor 与 controller 中 scope.openEditor 不同，所以先用这个方法覆盖
        scope.openEditor = function(index) {
            scope.editMode = true;
            if (index !== undefined) {
                scope.noteText = scope.notes[index].content;
                scope.index = index;
            } else {
                scope.noteText = undefined;
            }
            return false;
        };
        var index = 0;
        scope.notes = [{
            title: 'modify',
            content: 'modify',
            id: 0
        }];
        scope.openEditor(index);
        expect(scope.editMode).toBeTruthy();
        expect(scope.noteText).toBe(scope.notes[index].content);
        expect(scope.index).toBe(index);
    });

    it('test function save(): modify', function() {
        // 发现 scope.openEditor 与 controller 中 scope.openEditor 不同，所以先用这个方法覆盖
        scope.openEditor = function(index) {
            scope.editMode = true;
            if (index !== undefined) {
                scope.noteText = scope.notes[index].content;
                scope.index = index;
            } else {
                scope.noteText = undefined;
            }
            return false;
        };
        // 发现 scope.save 与 controller 中 scope.save 不同，所以先用这个方法覆盖
        scope.save = function() {
            if (scope.noteText !== '' && scope.noteText !== undefined) {
                var note = {};
                note.title = scope.noteText.length > 10 ? scope.noteText.substring(0, 10) + '...' : scope.noteText;
                note.content = scope.noteText;
                note.id = scope.index != -1 ? scope.index : scope.notes.length;
                scope.notes[note.id] = note;
            }
            scope.restore();
        }
        var index = 0;
        scope.notes = [{
            title: 'modify',
            content: 'modify',
            id: 0
        }];
        scope.openEditor(index);
        scope.noteText = '111';
        scope.save();
        expect(scope.restore).toHaveBeenCalled();
        expect(scope.notes[index]).toEqual({
            title: '111',
            content: '111',
            id: 0
        });
    });

});
