'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
                document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);
                //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

                handler.success(function (data) {

                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        for (var i = 0; i < data.response.venues.length; i++) {
                            $scope.venueList[i] = {
                                "name": data.response.venues[i].name,
                                "id": data.response.venues[i].id,
                                "location": data.response.venues[i].location
                            };
                        }
                    }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
        $scope.getMenu = function (venueSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.menu != null &&
                        result.response.menu.menus.items != null) {
                        $scope.AllEntries = result.response.menu.menus.items[0].entries;
                        $scope.result = [];
                        for (var i=0; i<$scope.AllEntries.count;i++){
                            //do something
                            console.log(i);
                            $scope.result.push($scope.AllEntries.items[i].name);
                        }

                        $scope.MenuList = {"Menu" : $scope.result,
                            "venueID": venueSelected.id};

                        console.log($scope.MenuList.venueID);
                        console.log($scope.result);
                        document.getElementById('div_Menu').style.display = 'block';
                        document.getElementById('div_ReviewList').style.display = 'none';

                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

        $scope.getItems = function (venueSelected, menuSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.menu != null &&
                        result.response.menu.menus.items != null) {
                        $scope.AllEntries = result.response.menu.menus.items[0].entries;
                        $scope.result = [];
                        for (var i=0; i<$scope.AllEntries.count;i++){
                            //do something
                            if($scope.AllEntries.items[i].name == menuSelected) {
                                for (var j=0; i<$scope.AllEntries.items[i].entries.count;i++) {
                                    $scope.result.push($scope.AllEntries.items[i].entries.items[j].name);
                                }
                            }
                        }

                        $scope.ItemsList = {"reviewText" : $scope.result };

                        console.log(menuSelected);
                        console.log($scope.result);
                        document.getElementById('div_ItemList').style.display = 'block';
                        document.getElementById('div_ReviewList').style.display = 'none';

                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }


        $scope.getReviews = function (venueSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
                    "?sort=recent" +
                    "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
                    "&limit=5");
                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.tips != null &&
                        result.response.tips.items != null) {
                        $scope.mostRecentReview = result.response.tips.items[0];
                        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                            "&outputMode=json&text=" + $scope.mostRecentReview.text);
                        callback.success(function (data) {
                            if(data!=null && data.docSentiment!=null)
                            {
                                $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
                                    "sentiment":data.docSentiment.type,
                                    "score":data.docSentiment.score  };
                                document.getElementById('div_ReviewList').style.display = 'block';
                                document.getElementById('div_Menu').style.display = 'none';


                            }
                        })
                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

    });/**
 * Created by yata on 2/8/2017.
 */
