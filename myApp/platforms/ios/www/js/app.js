// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider

            .state('app', {
              url: "/app",
              abstract: true,
              templateUrl: "templates/menu.html",
              controller: 'AppCtrl'
            })

            .state('app.search', {
              url: "/search",
              views: {
                'menuContent' :{
                  templateUrl: "templates/search.html",
                    controller: 'SearchCtrl'
                }
              }
            })
            .state('app.video', {
              url: "/video",
              views: {
                'menuContent' :{
                  templateUrl: "templates/youtubeVideo.html",
                    controller: 'YoutubeCtrl'
                }
              }
            })

            .state('app.bible', {
              url: "/bible",
              views: {
                'menuContent' :{
                  templateUrl: "templates/browse.html",
                    controller: 'BibleCtrl'
                }
              }
            })

            .state('app.home', {
              url: "/home",
              views: {
                'menuContent' :{
                  templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
              }
            })

            .state('app.music', {
              url: "/home/music",
              views: {
                'menuContent' :{
                  templateUrl: "templates/playlists.html",
                  controller: 'PlaylistsCtrl'
                }
              }
            })

            .state('app.albumlists', {
              url: "/booklists/:booklistId",
              views: {
                'menuContent' :{
                  templateUrl: "templates/chapter.html",
                  controller: 'SongsCtrl'
                }
              }
            })
            .state('app.songs', {
              url: "/booklists/:booklistId/:chapterId",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/chapter.html",
                      controller: 'SongsCtrl'
                  }
              }
            })
            .state('app.verses', {
              url: "/booklists/:booklistId/:chapterId/:verseId",
              views: {
                'menuContent' :{
                  templateUrl: "templates/youtubeVideo.html",
                  controller: 'YoutubeCtrl'
                }
              }
            });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
    });

