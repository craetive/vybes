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

})

.controller('VerseCtrl', function($scope, $stateParams) {
        $scope.verses = bibleBooks[$stateParams.playlistId-1].chapters[$stateParams.verseId-1];

})

var bibleBooks = [
    { book: 'Genesis',
        id: 1,
        chapters: [
            {name: 'Chapter 1', id: 1},
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
