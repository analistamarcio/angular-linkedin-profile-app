linkedInProfileApp.controller('profileCtrl', function profileCtrl($scope, $location, $rootScope, $http) {
	$scope.getLinkedInData = function() {
		if(!$scope.hasOwnProperty("userprofile")){
			IN.API.Profile("me").fields(
					[ "id", "firstName", "lastName", "pictureUrl",
							"publicProfileUrl" ]).result(function(result) {
				// set the model
				$rootScope.$apply(function() {
					var userprofile = result.values[0]
					$rootScope.userprofile = userprofile;
					$rootScope.loggedUser = true;
			    	//go to profile
					$location.path("/profile");
				});
			}).error(function(err) {
				$scope.error = err;
			});
		}
	};
    
    //logout and go to login screen
	$scope.logoutLinkedIn = function() {
        //reset values from LinkedIn
		IN.User.logout();
		delete $rootScope.userprofile;
		$rootScope.loggedUser = false;
		$location.path("/login");
	};
});