angular.module('starter.controllers', ['mydirectives'])

.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            alert("scroll");
            scope.$apply();
        });
    };
})

.service('playListService', function() {
    var currentAlbum = [];
    var myPlayList = [];

    var addAlbum = function(newObj) {
        currentAlbum = [];
        currentAlbum.push(newObj);
    };

    var getAlbum = function(){
        return currentAlbum;
    };

    return {
        addAlbum: addAlbum,
        getAlbum: getAlbum
    };
})

.service('videoListService', function() {
    var currentVideos = [];
    var videoPlayList = [];

    var addVideos = function(newObj) {
        currentVideos = [];
        currentVideos.push(newObj);
    };

    var getVideos = function(){
        return currentVideos;
    };

    return {
        addVideos: addVideos,
        getVideos: getVideos
    };
})



.controller('AppCtrl', function($scope, $ionicModal, $timeout, playListService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
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

        $ionicModal.fromTemplateUrl('templates/verses.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.musicPlayerModal = modal;
        });

        $scope.openMusicModal = function() {
            $scope.musicPlayerModal.show();

        };

        $scope.closeMusicModal = function() {
            $scope.musicPlayerModal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.musicPlayerModal.remove();
        });
        // Execute action on hide modal
        $scope.$on('musicPlayerModal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('musicPlayerModal.removed', function() {
            // Execute action
        });
        $scope.$on('musicPlayerModal.shown', function() {


            console.log('Modal is shown!');
        });
        $scope.show1 = true;



        $scope.playing = false;

    $scope.$on("tabHide", function (event, arg) {
        $scope.playing = arg;
    });

    $scope.$on("myAlbum", function (event, args) {
        $scope.album = playListService.getAlbum();
        $scope.currentIndex = 0;
        $scope.select($scope.currentIndex);
        $scope.audio.play();
        $scope.playing = true;
    });
    $scope.$on("mySong", function (event, args) {
            $scope.currentIndex = args;
            $scope.select($scope.currentIndex);
            $scope.audio.play();
            $scope.playing = true;
        });


    $scope.audio = document.createElement('audio');
    $scope.select = function(value){
        $scope.currentPlaying = value+1;
        $scope.currentSong = $scope.album[0][value].song;
        $scope.audio.src = 'http://www.getatube.com/mp3/'+$scope.currentSong;
        $scope.currentIndex = value;

    };

    $scope.playOrPauseButton = "button button-clear button-light icon ion-pause";
    $scope.rootPlay = function(){
        if($scope.audio.paused){
            $scope.audio.play();
            $scope.playing = true;
            $scope.playOrPauseButton = "button button-clear button-light icon ion-pause";
        }else {
            $scope.audio.pause();
            $scope.playOrPauseButton = "button button-clear button-light icon ion-play";
        }
    };

    $scope.hideOrShowPlayer = function(){
        $scope.playing = !$scope.playing;
    };

    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };

    $scope.nextSong = function(){
        if($scope.currentIndex < $scope.album[0].length-1){
            $scope.currentIndex++;
            $scope.select($scope.currentIndex);
            $scope.audio.play();
        }
    };

    $scope.previousSong = function(){
        if($scope.currentIndex > 0){
            $scope.currentIndex--;
            $scope.select($scope.currentIndex);
            $scope.audio.play();
        }
    };

    $scope.audioProgress = function(){
        var audioDuration = $scope.audio.duration;
        var currentTime = $scope.audio.currentTime;
        var progressInPercent = (currentTime / audioDuration)*100;
        return  $scope.formatTime(currentTime)

    };

    $scope.audio.addEventListener('ended', function() {
        $scope.nextSong()
    });

    $scope.audio.addEventListener('timeupdate', function() {
        $scope.$apply(function() {
            $scope.audioProgress()
        });
    });

    $scope.formatTime = function (seconds) {
        if (seconds === Infinity) {
            return '∞'; // If the data is streaming
        }
        var hours = parseInt(seconds / 3600, 10) % 24,
            minutes = parseInt(seconds / 60, 10) % 60,
            secs = parseInt(seconds % 60, 10),
            result,
            fragment = (minutes < 10 ? '0' + minutes : minutes) + ':' + (secs < 10 ? '0' + secs : secs);
        if (hours > 0) {
            result = (hours < 10 ? '0' + hours : hours) + ':' + fragment;
        } else {
            result = fragment;
        }
        return result;
    };
})
.directive('horizontalSlider', function ($ionicGesture) {
    return function(scope, element, attr) {
        var left = 0;
        var handleDrag = function(e) {
            element.css({
                '-webkit-transform': 'translate3d(' + (left + Math.round(e.gesture.deltaX)) + 'px, 0, 0)'
            });
            if (element.hasClass('slider-bounce')) {
                element.removeClass('slider-bounce');
            }
        };

        var releaseFn = function(e) {
            var pattern = new RegExp('translate3d\\((-?[0-9]*)px, 0, 0\\)'),
                pattern2 = new RegExp('(-?[0-9]*)px');
            var transformMatches = pattern.exec(element.css('-webkit-transform')),
                widthMatches = pattern2.exec(element.css('width'));
            left = Math.round(transformMatches[1]);
            var width = widthMatches[1];
            if(left < (320 - width)) left = 320 - width;
            if(left > 0) left = 0;
            element.addClass('slider-bounce');
            element.css({
                '-webkit-transform': 'translate3d(' + left + 'px, 0, 0)'
            });
        };

        var releaseGesture = $ionicGesture.on('release', releaseFn, element);
        var dragGesture = $ionicGesture.on('drag', handleDrag, element);
        scope.$on('$destroy', function() {
            $ionicGesture.off(dragGesture, 'drag', handleDrag);
        });
    }
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

.controller('SearchCtrl', ["$scope", "$http", function($scope, $http, videoListService) {
        $scope.$emit("tabHide", false);


        $scope.youTubeCode = 'IytNBm8WA1c';

        $scope.url = 'http://www.getatube.com/vids.php'; // The url of our search

        // The function that will be executed on button click (ng-click="search()")
        $scope.search = function() {
            $scope.youTubeCode = 'BYjna3kjmRE';

            // Create the http post request
            // the data holds the keywords
            // The request is a JSON request.
            $http.get($scope.url)
                .success(function(data, status) {
                    $scope.status = status;
                    $scope.youTubeVideos = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element
                })
                .error(function(data, status) {
                    $scope.youTubeVideos = data || "Request failed";
                    $scope.status = status;
                });

        };
        $scope.search();

        $scope.selectYoutubeVideo = function(value){
            $scope.youTubeCode = $scope.youTubeVideos[value].yt_id;
        }
}])

.controller('YoutubeCtrl', function($scope, $http, $sce) {
        $scope.$emit("tabHide", false);
        $scope.youTubeCode = $sce.trustAsResourceUrl("http://www.youtube.com/embed/IytNBm8WA1c");

        $scope.url = 'http://www.getatube.com/vids.php'; // The url of our search

        // The function that will be executed on button click (ng-click="search()")
        $scope.search = function() {
            $scope.youTubeCode = $sce.trustAsResourceUrl("http://www.youtube.com/embed/BYjna3kjmRE");

            // Create the http post request
            // the data holds the keywords
            // The request is a JSON request.
            $http.get($scope.url)
                .success(function(data, status) {
                    $scope.status = status;
                    $scope.youTubeVideos = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element
                })
                .error(function(data, status) {
                    $scope.youTubeVideos = data || "Request failed";
                    $scope.status = status;
                });
        };

        $scope.selectYoutubeVideo = function(value){
            $scope.youTubeCode = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+value);
        }



    })

.controller('BibleCtrl', function($scope) {

        $scope.$emit("tabHide", false);

})

.controller('HomeCtrl', function($scope) {

        $scope.$emit("tabHide", false);

})

.controller('PlaylistsCtrl', function($scope, $http) {
        if (!$scope.artists){
                $http.get('lib/Mezmur.json').success(function(data){
                    $scope.artists = data;
                })
                .error(function() {
                    $scope.artists = 'could not find Mezmur.json';
                });
        }
        $scope.tab = 1;
        $scope.tab2 = 1;

        $scope.setTab = function(value){
            $scope.tab = value;
        };
        $scope.isTab = function(value){
            return  $scope.tab === value;
        };

        $scope.setTab2 = function(value){
            $scope.tab2 = value;
        };
        $scope.isSet = function(value){
            return  $scope.tab2 === value;
        };
})

.controller('PlaylistCtrl', function($scope, $http, $stateParams, theService, $timeout) {
        theService.getFile().success(function(data){
            $scope.artists = data;
            $scope.artist = $scope.artists[$stateParams.booklistId-1];
            $scope.albums = $scope.artists[$stateParams.booklistId-1].albums;
        });

        $scope.url = 'http://www.getatube.com/vids.php'; // The url of our search

        // The function that will be executed on button click (ng-click="search()")
        $scope.search = function() {

            // Create the http post request
            // the data holds the keywords
            // The request is a JSON request.
            $http.get($scope.url).
                success(function(data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element
                })
                .
                error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        };



        var INTERVAL = 3000;

        $scope.images = [{
            src: 'http://www.wongelnet.com/imageRotator2/images/1001.jpg',
            title: 'Pic 1'
        }, {
            src: 'http://www.wongelnet.com/imageRotator2/images/1002.jpg',
            title: 'Pic 2'
        }, {
            src: 'http://www.wongelnet.com/imageRotator2/images/1003.jpg',
            title: 'Pic 3'
        }, {
            src: 'http://www.wongelnet.com/imageRotator2/images/1004.jpg',
            title: 'Pic 4'
        }, {
            src: 'http://www.wongelnet.com/imageRotator2/images/1006.jpg',
            title: 'Pic 5'
        }];

        $scope.slideStop = false;
        $scope.playOrStop = "Stop";
        function nextSlide() {
            if(!$scope.slideStop){
                $scope.currentIndex = ($scope.currentIndex < $scope.images.length - 1) ? ++$scope.currentIndex : 0;
                $scope.currentImage = $scope.images[$scope.currentIndex].src;
                $timeout(nextSlide, INTERVAL);
            }
        }
        $scope.stopSlide = function(){
            $scope.slideStop = !$scope.slideStop;
            $scope.playOrStop = "Play";
            if(!$scope.slideStop){
                $timeout(nextSlide, 1000);
                $scope.playOrStop = "Stop";
            }
        };

        $timeout(nextSlide, 10);

})

.controller('SongsCtrl', function($scope, $stateParams, theService, $rootScope, playListService) {

        $scope.currenartist = $stateParams.booklistId-1
        $scope.currentAlbum = 0;
        $scope.selectedSong = 0;

        theService.getFile().success(function(data){
            $scope.artists = data;
            $scope.artist = $scope.artists[$stateParams.booklistId-1];
            $scope.albums = $scope.artists[$stateParams.booklistId-1].albums;
            $scope.album = $scope.artists[$stateParams.booklistId-1].albums[$scope.currentAlbum];
            $scope.songs = $scope.artists[$stateParams.booklistId-1].albums[$scope.currentAlbum].songs;
        });

        $scope.showSongs = true;
        $scope.playing = false;
        $scope.paused = false;
        $scope.currentIndex = 0;
        $scope.showAlbumDetail = true;
        $scope.upOrDownArrow = "ion-chevron-up";

        $scope.searchText = $rootScope.searchText;

        $scope.isShowSongs = function() {
            $scope.showSongs = !$scope.showSongs;
            if(!$scope.showSongs){
                $scope.upOrDownArrow = "ion-chevron-down";
            }else {
                $scope.upOrDownArrow = "ion-chevron-up";
            }
        };

        $scope.isShowAlbumDetail = function() {
            $scope.showAlbumDetail = !$scope.showAlbumDetail;
        };

        $scope.selectAlbum = function(value){
            $scope.currentAlbum = value;
            playListService.addAlbum($scope.artists[$stateParams.booklistId-1].albums[$scope.currentAlbum].songs);
            $scope.$emit("myAlbum", value);
        };

        $scope.selectSong = function(value){
            playListService.addAlbum($scope.songs);
            $scope.$emit("mySong", value);
        };
})

.controller('PlayerController', ['$scope', function($scope) {
        $scope.playing = false;
        $scope.audio = document.createElement('audio');
        $scope.audio.src = 'http://www.getatube.com/mp3/30.mp3'
        $scope.play = function() {
            $scope.audio.play();
            $scope.playing = true;
        };
        $scope.stop = function() {
            $scope.audio.pause();
            $scope.playing = false;
        };
        $scope.audio.addEventListener('ended', function() {
            $scope.$apply(function() {
                $scope.stop()
            });
        });
}])

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
