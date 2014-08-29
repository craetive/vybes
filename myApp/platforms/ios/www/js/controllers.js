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

.controller('PlaylistsCtrl', function($scope) {
  $scope.books = bibleBooks;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
        $scope.book = bibleBooks[$stateParams.playlistId-1];
        $scope.chapters = bibleBooks[$stateParams.playlistId-1].chapters;
        currentBook = bibleBooks[$stateParams.playlistId-1];
        currentChapter = bibleBooks[$stateParams.playlistId-1].chapters;

})

.controller('VerseCtrl', function($scope, $stateParams) {
        $scope.chapter = currentChapter[$stateParams.verseId-1];

})

var currentBook = '';
var currentChapter = '';
var bibleBooks = [
    { book: 'Genesis',
        id: 1,
        chapters: [
            {name: 'Chapter 1',
                id: 1,
                verses: [
                    {text: 'In the beginning God created the heavens and the earth.', id: 1},
                    {text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.', id: 2},
                    {text: 'And God said, “Let there be light,” and there was light.', id: 3},
                    {text: 'God saw that the light was good, and he separated the light from the darkness.', id: 4},
                    {text: 'God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.', id: 5}
                ]

            },
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]
    },
    { book: 'Exodus',
        id: 2,
        chapters: [
            {name: 'Chapter 1', id: 1},
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]

    },
    { book: 'Leviticus',
        id: 3,
        chapters: [
            {name: 'Chapter 1', id: 1},
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]
    },
    { book: 'Numbers',
        id: 4,
        chapters: [
            {name: 'Chapter 1', id: 1},
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]
    },
    { book: 'Deuteronomy',
        id: 5,
        chapters: [
            {name: 'Chapter 1', id: 1},
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]
    },
    { book: 'Joshua',
        id: 6,
        chapters: [
            {name: 'Chapter 1', id: 1},
            {name: 'Chapter 2', id: 2},
            {name: 'Chapter 3', id: 3},
            {name: 'Chapter 4', id: 4},
            {name: 'Chapter 5', id: 5}
        ]

    }
];
