angular.module('starter.controllers.customers', [])

.controller('customers', function($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.Customers = new Object();
	$scope.CustomersList = new Array();
	//$scope.CustomersList = new Array();
	$scope.EditId = $stateParams.customerid;
	
/* Start Insert data in Customers */	
  $scope.Save = function() {
	  
	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

	  //cid cname caddress ccity cstate ccontact cpincode cemail
	  
    var query = "INSERT INTO CustomerMaster (cname, caddress, ccity, cstate, ccontact, cpincode, cemail) VALUES (?,?,?,?,?,?,?)";
   
	$cordovaSQLite.execute(DATABASE, query, [$scope.Customers.cname, $scope.Customers.caddress,$scope.Customers.ccity, $scope.Customers.cstate, $scope.Customers.ccontact, $scope.Customers.cpincode, $scope.Customers.cemail]).then(function(res) {
		
		console.log("insertId: " + res.insertId);
		
		$ionicLoading.hide();
		$ionicPopup.alert({
			title: 'Saved.',
			template: 'Data Saved successfully'
		});
		
		$scope.Customers =null;
		$state.go('app.customer_list', {}, {
			
		});
		
    }, function (err) {
      console.error(err);
    });
	
  };
/*End Save Button.*/


/* Select data in Customers */  
    $scope.Select = function() {
	
	$scope.CustomersList = new Array();
	
    var query = "SELECT * FROM CustomerMaster"; // where $stateParams.rawid
  
	$cordovaSQLite.execute(DATABASE, query).then(function(res) { 
debugger;	
		for(var i = 0; i < res.rows.length; i++){	 
			$scope.CustomersList.push(res.rows.item(i));
		} 
		
		
		if($scope.CustomersList.length == 0){
			$state.go('app.customer_add', {
			});		
		}else{
			$state.go('app.customer_list', {
			});	
		}
		
    }, function (err) {
      console.error(err);
    });
	
  };
/*End Select data in Customers */ 

/*Start Delete Button.*/

	$scope.Delete = function(cid) {
		 
		var confirmPopup = $ionicPopup.confirm({
			title: 'Customers Delete...',
			template: 'Are you want to be Deleted?'
		});
		confirmPopup.then(function (res) {
			if (res) {
				var query = "DELETE FROM CustomerMaster WHERE cid = ?";
				
				$cordovaSQLite.execute(DATABASE, query, [cid]).then(function(res) {
					
					console.log("Deleted");
					$state.go('app.customer_list',{},{reload:true});
					
				}, function (err) {
				  console.error(err);
				});
			}
		})
    };

/*End Delete Button.*/

/*Start Selection Button*/

	$scope.Selectid = function(cid) {  
      $state.go('app.customer_edit', {
		  customerid:cid
		  
	  }, {			//redirect to another page;
		  
       });
    };
/*End Selection Button*/

/*Start Edit Button*/	
	$scope.Edit = function(){
	debugger;
		var query = "SELECT * FROM CustomerMaster where cid = " + $stateParams.customerid  ; // where $stateParams.productid
		$cordovaSQLite.execute(DATABASE, query).then(function(res) {
			debugger;
			for(var i = 0; i < res.rows.length; i++){
				$scope.Customers =  res.rows.item(i);
				$scope.Customers.ccontact = parseInt($scope.Customers.ccontact);
				$scope.Customers.cpincode = parseInt($scope.Customers.cpincode);
			} 
		}, function (err) {
		  console.error(err);
		});
	
  };

/*End Edit Button*/

/*Start Update Button*/

	$scope.Update = function() {
	 	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
		var query = "UPDATE CustomerMaster SET cname =?, caddress =?, ccity =?, cstate =?, ccontact =?, cpincode =?, cemail =? WHERE cid = "+ $scope.Customers.cid;
		    
		$cordovaSQLite.execute(DATABASE, query, [$scope.Customers.cname, $scope.Customers.caddress, $scope.Customers.ccity, $scope.Customers.cstate, $scope.Customers.ccontact, $scope.Customers.cpincode, $scope.Customers.cemail]).then(function(res) {
			
			$ionicLoading.hide();
			$ionicPopup.alert({
                        title: 'Updated.....',
                        template: 'Data Updated successfully'
            });
					
			$state.go('app.customer_list', {}, {
							
			});
		});
  };

/*End Update Button*/
	
	
	
	
$scope.SelectCustomers = function() {  
	 debugger;	
    var query = "SELECT * FROM CustomerMaster"; // where $stateParams.rawid
  
	$cordovaSQLite.execute(DATABASE, query).then(function(res) {  
	debugger;	
		for(var i = 0; i < res.rows.length; i++){	 
			$scope.CustomersList.push(res.rows.item(i));
		}
		
		}

		
    , function (err) {
      console.error(err);
    });
	
  };	
	
	
	
	
	
	
});