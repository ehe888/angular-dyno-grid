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
      restrict: "A",    // This allows following type of directive : <div hr-layout="exp"></div>
      priority: 10001,  // If one DOM element has multiple directives, by this value the directive is applied.
      scope: true,      // create new scope for this directive.,
      // for more information http://docs.angularjs.org/guide/directive
      controller: [
        "$scope", "$timeout", function($scope, $timeout) {
          console.log('controller', $scope.params);
        }
      ],
      compile: function(element, attrs) {
        return function(scope, element, attrs) {
          var contentCount = 0;
          var renderTemplate = function(value, content) {
            if (typeof content === 'undefined' || content.length <= contentCount)
              var cellContent = 'Test content(col-'+value+')';
            else if (Object.prototype.toString.call(content) === '[object Array]')
              var cellContent = content[contentCount];
            else
              var cellContent = content;
              
            contentCount++;
            return '<div class="col-md-'+value+'">'+cellContent+'</div>';
          };
          
          var renderLayout = function(values, content) {
            var renderedHTML = '';
            var rowCnt = 0;
            var subWidth = 0;
            
            angular.forEach(values, function(value) {
              renderedHTML += '<div class="row">';
              if(Object.prototype.toString.call(value) === '[object Array]') {
                angular.forEach(value, function(subvalue) {
                  if(typeof subvalue === 'object') {
                    renderedHTML += renderTemplate(subvalue.w.substring(4), renderLayout(subvalue.d, content));
                  } else {
                    renderedHTML += renderTemplate(subvalue.substring(4), content[contentCount]);
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
                  renderedHTML += renderTemplate(subWidth, content);
                }
                renderedHTML += renderTemplate((12-subWidth*(value-1)), content);
              }
              renderedHTML += '</div>';
              rowCnt++;
            });
            return renderedHTML;
          };
  
          scope.$watch(attrs.hrLayout, function(value) {
            element.html(renderLayout(value.data, value.content));
          });
          element.addClass("hr-layout");
        };
      }
    };
  }
]);