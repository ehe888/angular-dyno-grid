'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });

angular.module("myApp.directives", []).directive("hrLayout", [
    "$compile", "$q", "$parse", function($compile, $q, $parse) {
        return {
            restrict: "A",
            priority: 10001,
            scope: true,
            controller: [
                "$scope", "$timeout", function($scope, $timeout) {
                    console.log('controller', $scope.params);
                }
            ],
            compile: function(element, attrs) {
                return function(scope, element, attrs) {

                    var renderLayout = function(values) {
                        var renderedHTML = '';
                        var rowCnt = 0;
                        var subWidth = 0;
                        angular.forEach(values, function(value) {
                            renderedHTML += '<div class="row">';
                            if(Object.prototype.toString.call(value) === '[object Array]') {
                                angular.forEach(value, function(subvalue) {
                                    if(typeof subvalue === 'object') {
                                        renderedHTML += '<div class="col-md-'+subvalue.w.substring(4)+'">';
                                        renderedHTML += renderLayout(subvalue.d);
                                        renderedHTML += '</div>';
                                    } else {
                                        renderedHTML += '<div class="col-md-'+subvalue.substring(4)+'">Test content(col-'+subvalue.substring(4)+')</div>';
                                    }
                                });
                            } else {
                                if(value > 12) {
                                    value = 12;
                                } else if (value <= 0) {
                                    value = 1;
                                }
                                subWidth = Math.floor(12 / value);
                                for (var i=0; i< value-1; i++) {
                                    renderedHTML += '<div class="col-md-'+subWidth+'">Test content(col-'+subWidth+')</div>';
                                }
                                renderedHTML += '<div class="col-md-'+(12-subWidth*(value-1))+'">Test content(col-'+(12-subWidth*(value-1))+')</div>';
                            }
                            renderedHTML += '</div>';
                            rowCnt++;
                        });
                        return renderedHTML;
                    }

                    scope.$watch(attrs.hrLayout, function(value) {
                        element.html(renderLayout(value.data));
                    });
                    element.addClass("hr-layout");
                };
            }
        };
    }
]);
