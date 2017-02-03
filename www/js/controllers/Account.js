angular.module('starter.controllers.Account', [])

.controller('AccountController',function($scope,$state,$ionicPopup, $ionicModal, $ionicLoading,DATEBASE){
    $scope.User = new Object();
    // $scope.User.UserName = 'abhishek';

  $scope.signIn = function(form)
  {

  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            
          
            DATEBASE.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password)
                .then(function (userData) {
                
                DATABASE.database().ref().child("users").child(userData.uid).set({
                    firstname: $scope.data.firstname,
                    lastname: $scope.data.lastname
                });

                DATABASE.auth().currentUser.sendEmailVerification();

                $ionicLoading.hide();
				alert("User created successfully! Please Login");
				$scope.data.email = '';
				$scope.data.password = '';
				$scope.data.firstname = '';
				$scope.data.lastname = '';
               $state.go("loginmain",{});
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            })
		// if(form.username.$modelValue == "" && form.password.$modelValue == undefiend)
		// {
	   // $state.go('app.list');
		// }else
		// {
			 // $ionicPopup.alert({
                // title: 'Alert',
                // template: 'Please Check the Credentails'
            // });
			
		// }
	// }
  // }

}
});