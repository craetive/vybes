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
            getFile : function() {
               return $http({
                    url: 'lib/Mezmur.json',
                    method: 'GET'
                })
            }
        };
})

.controller('PlaylistsCtrl', function($scope, $http) {
        $http.get('lib/Mezmur.json').success(function(data){
            $scope.artists = data;
        })
        .error(function() {
            $scope.artists = 'could not find Mezmur.json';
        });

        $scope.isSearch = false;
})

.controller('PlaylistCtrl', function($scope, $stateParams, theService) {
        theService.getFile().success(function(data){
            $scope.artists = data;
            $scope.artist = $scope.artists[$stateParams.booklistId-1];
            $scope.albums = $scope.artists[$stateParams.booklistId-1].albums;
        });

})

.controller('SongsCtrl', function($scope, $stateParams, theService) {
        theService.getFile().success(function(data){
            $scope.artists = data;
            $scope.artist = $scope.artists[$stateParams.booklistId-1];
            $scope.albums = $scope.artists[$stateParams.booklistId-1].albums;
            $scope.album = $scope.artists[$stateParams.booklistId-1].albums[$stateParams.chapterId-1];
            $scope.songs = $scope.artists[$stateParams.booklistId-1].albums[$stateParams.chapterId-1].songs;
        });

        $scope.showSongs = true;
        $scope.Playing = false ;
        $scope.showAlbumDetail = true;


        $scope.isPlaying = function(value) {
            $scope.currentPlaying = value+1;
            $scope.Playing = true;
            $scope.currentSong = $scope.songs[value].song

        };

        $scope.isShowSongs = function() {
            $scope.showSongs = !$scope.showSongs;
        };
        $scope.isShowAlbumDetail = function() {
            $scope.showAlbumDetail = !$scope.showAlbumDetail;
        };


})

.controller('VerseCtrl', function($scope, $stateParams, theService) {
    theService.getFile().success(function(data){
        $scope.artists = data;
        $scope.artist = $scope.artists[$stateParams.booklistId-1];
        $scope.album = $scope.artists[$stateParams.booklistId-1].albums[$stateParams.chapterId-1];
        $scope.songs = $scope.artists[$stateParams.booklistId-1].albums[$stateParams.chapterId-1].songs;
        $scope.song = $scope.artists[$stateParams.booklistId-1].albums[$stateParams.chapterId-1].songs[$stateParams.verseId-1];
    });

    $scope.nextVerse = function(){
        alert("Hello");
    };

});