'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here
        $scope.layoutOptions = {
            data: [3, 4]
        }
        $scope.layoutOptions2 = {
            data: [['span3','span9'], [ 'span6', 'span6']]
        }
        $scope.layoutOptions3 = {
            data: [
                ['span9', { w: 'span3', d: [1, 1, 1]}],
                [ 'span4', 'span4', 'span2', 'span2'],
                3
            ]
        }
        $scope.layoutOptions4 = {
            data: [
                ['span3','span9'],
                [
                    'span3',
                    'span3',
                    {
                        w: 'span6',
                        d: [
                            2,
                            [
                                {
                                    w:'span9',
                                    d: [
                                        3,
                                        ['span7','span5']
                                    ]
                                },
                                'span3'
                            ]
                        ]
                    }
                ]
            ]
        }
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
