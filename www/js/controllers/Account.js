angular.module('starter.controllers.Account', [])

.controller('AccountController',function($scope,$state,$ionicPopup, $ionicModal, $ionicLoading){
    $scope.User = new Object();
    $scope.User.UserName = 'abhishek';

  $scope.signIn = function(form)
  {
    if(form.$valid)
	{
		if(form.username.$modelValue == "abhishek" && form.password.$modelValue == "abhishek")
		{
	   $state.go('app.list');
		}else
		{
			 $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Check the Credentails'
            });
			
		}
	}
  }

})