angular.module('starter.controllers.company', [])

.controller('CompanyCtrl', function($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.Company = new Object();
	$scope.CompanyList = new Array();
	$scope.EditId = $stateParams.cmpid;
	
/* Start Insert data in Company */	
  $scope.Save = function() {	
	  debugger;
	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
		var _tin =  ($scope.Company.tin).toUpperCase() ;
		
	
	  	var selectquery = "SELECT * FROM CompanyInfo where tin = '" + _tin + "'" ;
	 $cordovaSQLite.execute(DATABASE, selectquery).then(function(res) {	
  debugger;
			if(res.rows.length == 0){		 
				
				var query = "INSERT INTO CompanyInfo (tin, name, address, city, contact, state, pin, email,logo) VALUES (?,?,?,?,?,?,?,?,?)";
			   
				$cordovaSQLite.execute(DATABASE, query, [ _tin, $scope.Company.name, $scope.Company.address, $scope.Company.city, $scope.Company.contact, $scope.Company.state, $scope.Company.pin, $scope.Company.email,$scope.Company.Logo ]).then(function(res) {
					console.log("insertId: " + res.insertId);
					$ionicLoading.hide();
					$ionicPopup.alert({
						title: 'Saved.',
						template: 'Data Saved successfully'
					});
					$scope.Company = null;
					$state.go('app.company_list', {}, {
					});
				}, function (err) {
				  console.error(err);
				});
			}else{
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Warning.',
					template: 'You Already Have This Tin No.'
				});
			};
			
		}, function (err) {
		  console.error(err);
		});
  };



/*Start Edit Button*/	
	$scope.Edit = function(){
		
		var query = "SELECT * FROM CompanyInfo where cid = " + $stateParams.companyid  ; // where $stateParams.productid
		$cordovaSQLite.execute(DATABASE, query).then(function(res) {
			debugger;
			for(var i = 0; i < res.rows.length; i++){
				$scope.Company =  res.rows.item(i);
				$scope.Company.contact = parseInt($scope.Company.contact);
				$scope.Company.pin = parseInt($scope.Company.pin);
				
			} 
		}, function (err) {
		  console.error(err);
		});
	
  };

    /*End Edit Button*/


    /*company logo*/
	$scope.fileNameChanged = function (input)
	{
	    
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            debugger;
	            $scope.Praveen = '';
	            $scope.Praveen = e.target.result;
	            $scope.Company.Logo = $scope.Company.logo = e.target.result;
	        }

	        reader.readAsDataURL(input.files[0]);
	    }

	}





/*Start Update Button*/

	$scope.Update = function() {
	 	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
			
			//tin, name, address, city, contact, state, pin, email
			
		var _tin =  ($scope.Company.tin).toUpperCase() ;	
		
		
			
				var query = "UPDATE CompanyInfo SET tin=?, name=?, address=?, city=?, contact=?, state=?, pin=?, email=?,logo =? WHERE id = "+ $scope.Company.id;
				$cordovaSQLite.execute(DATABASE, query, [_tin, $scope.Company.name, $scope.Company.address, $scope.Company.city, $scope.Company.contact, $scope.Company.state, $scope.Company.pin, $scope.Company.email,$scope.Company.logo]).then(function(res) {
					
					$ionicLoading.hide();
					$ionicPopup.alert({
								title: 'Updated.....',
								template: 'Data Updated successfully'
					});	
					$state.go('app.company_list', {}, {
									
					});
				});			

  };

/*End Update Button*/


$scope.SelectCompany = function() { 
	
    var query = "SELECT * FROM CompanyInfo"; // where $stateParams.rawid
  
	$cordovaSQLite.execute(DATABASE, query).then(function(res) { 
		for(var i = 0; i < res.rows.length; i++){	
			$scope.CompanyList.push(res.rows.item(i));
		}


		
    }, function (err) {
      console.error(err);
    });
	
  };


$scope.Detail = function () {
    debugger;
		var query = "SELECT * FROM CompanyInfo where id = " + $stateParams.cmpid;
		$cordovaSQLite.execute(DATABASE, query).then(function (res) {
		    debugger;
			for(var i = 0; i < res.rows.length; i++){
				$scope.Company =  res.rows.item(i);
				$scope.Company.contact = parseInt($scope.Company.contact);
				$scope.Company.pin = parseInt($scope.Company.pin);
				
			} 
		}, function (err) {
		  console.error(err);
		});
	
  };


	$scope.Selectid = function(id) { 
      $state.go('app.company_edit', {
		  cmpid:id
		  
	  }, {			//redirect to another page;
		  
       });
    };

	$scope.Delete = function(id) {
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Company Delete...',
			template: 'Are you want to be Deleted?'
		});
		confirmPopup.then(function (res) {
			if (res) {
				var query = "DELETE FROM CompanyInfo WHERE id = ?";
				
				$cordovaSQLite.execute(DATABASE, query, [id]).then(function(res) {
					
					console.log("Deleted");
					$state.go('app.company_list',{},{reload:true})
					
				}, function (err) {
				  console.error(err);
				});
			}
		})
    };
	
});