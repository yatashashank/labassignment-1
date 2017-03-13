
angular.module('app.controllers', ['ngCordova', 'ionic'])

//run configurations
  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(
          true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    //console.log("start time:" + $rootScope.startTime);
    //turning on bluetooth
    //********* USER PERMISSIONS *************
    //requesting user permissions for camera
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

    }

  })

  // controller for Home.html
  .controller('loginCtrl', function($scope, $state) {
    // ionic platform ready function

  }) //end of controller
// controller for qr code scanner
  .controller('homePageCtrl', function($scope, $state,  $ionicPlatform) {



    // ionic platform ready function
    $ionicPlatform.ready(function() {
      // open in external browser
      $scope.openInExternalBrowser = function() {
        window.open('http://law.umkc.edu/library/', '_blank', 'location=yes');
      };

      //displaying directions in external browser or google maps
      $scope.openDirections = function() {
        window.open('http://maps.google.com/maps?saddr=' + "&daddr=39.035014,-94.576526", '_system', 'location=yes');
      }; // end of open directions

      // catalog search which redirects to umkc summon website
      $scope.details = function(catalogsearch) {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'yes',
          hardwareback: 'yes'
        };

        if(!(catalogsearch == null || catalogsearch == '')) {
          $cordovaInAppBrowser.open("http://umkc.summon.serialssolutions.com/?q=" + catalogsearch +
            "&fvf=Discipline,law,f#!/search?ho=t&fvf=Discipline,law,f&l=en&q=" + catalogsearch + "", "_blank", options);
        } else {
          $scope.emptysearch = "true";
        }

      };

      //******** Beacon methods ************
      //window.plugin.backgroundMode.enable();
      document.addEventListener("deviceready", onDeviceReady, false);

      function  onDeviceReady() {

      }





    }); //end of ionic platform
  }) //end of controller
  .controller('signupCtrl', function($scope, $state) {

  }) //end of controller


