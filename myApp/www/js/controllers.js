angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('theService', function($http) {
        return {
            thing : function() {
               return $http({
                    url: 'lib/bible.json',
                    method: 'GET'
                })
            }
        };
})

.controller('PlaylistsCtrl', function($scope, $http) {
        $http.get('lib/bible.json').success(function(data){
            $scope.books = data;
        })
        .error(function() {
            $scope.books = 'could not find someFile.json';
        });
})

.controller('PlaylistCtrl', function($scope, $stateParams, theService) {
        theService.thing().success(function(data){
            $scope.books = data;
            $scope.book = $scope.books[$stateParams.booklistId-1];
            $scope.chapters = $scope.books[$stateParams.booklistId-1].chapters;
        });

})

.controller('ChapterCtrl', function($scope, $stateParams, theService) {
        theService.thing().success(function(data){
            $scope.books = data;
            $scope.book = $scope.books[$stateParams.booklistId-1];
            $scope.chapter = $scope.books[$stateParams.booklistId-1].chapters[$stateParams.chapterId-1];
        });

})

.controller('VerseCtrl', function($scope, $stateParams, theService) {
    theService.thing().success(function(data){
        $scope.books = data;
        $scope.book = $scope.books[$stateParams.booklistId-1];
        $scope.chapter = $scope.books[$stateParams.booklistId-1].chapters[$stateParams.chapterId-1];
        $scope.verse = $scope.books[$stateParams.booklistId-1].chapters[$stateParams.chapterId-1].verses[$stateParams.verseId-1];
    });

        $scope.nextVerse = function(){
            alert("Hello");
        }

})

