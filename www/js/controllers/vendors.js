angular.module('starter.controllers.vendors', [])

.controller('vendors', function($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.Vendors = new Object();
	$scope.VendorsList = new Array();
	$scope.EditId = $stateParams.vendorid;
	
/* Start Insert data in Vendors */	
	$scope.Save = function (vendorsForm) {
      if (vendorsForm.$valid) {
          $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
          });

          var query = "INSERT INTO VenderMaster (cname, caddress, ccity, cstate, ccontact, cpincode, cemail, openbalance) VALUES (?,?,?,?,?,?,?,?)";

          $cordovaSQLite.execute(DATABASE, query, [$scope.Vendors.cname, $scope.Vendors.caddress, $scope.Vendors.ccity, $scope.Vendors.cstate, $scope.Vendors.ccontact.toString(), $scope.Vendors.cpincode, $scope.Vendors.cemail, $scope.Vendors.openbalance]).then(function (res) {

              console.log("insertId: " + res.insertId);

              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Saved.',
                  template: 'Data Saved successfully'
              });

              $scope.Vendors = null;
              $state.go('app.vender_list', {}, {

              });

          }, function (err) {
              console.error(err);
          });
      }
  };
/*End Save Button.*/


/* Select data in Vendors */  
    $scope.Select = function() {
	$scope.VendorsList = new Array();
	
    var query = "SELECT * FROM VenderMaster";
  
	$cordovaSQLite.execute(DATABASE, query).then(function(res) {
		for(var i = 0; i < res.rows.length; i++){
			$scope.VendorsList.push(res.rows.item(i));
		} 
		
    }, function (err) {
      console.error(err);
    });
	
  };
/*End Select data in Vendors */ 

/*Start Delete Button.*/

	$scope.Delete = function(cid) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Vendors Delete...',
			template: 'Are you want to be Deleted?'
		});
		confirmPopup.then(function (res) {
			if (res) {
				var query = "DELETE FROM VenderMaster WHERE cid = ?";
				
				$cordovaSQLite.execute(DATABASE, query, [cid]).then(function(res) {
					
					console.log("Deleted");
					$scope.Select();
					
				}, function (err) {
				  console.error(err);
				});
			}
		})
    };

/*End Delete Button.*/

/*Start Selection Button*/

	$scope.Selectid = function(cid) {
      $state.go('app.vender_edit', {
		  vendorid:cid
		  
	  }, {			//redirect to another page;
		  
       });
    };
/*End Selection Button*/

/*Start Edit Button*/	
	$scope.Edit = function(){
		var query = "SELECT * FROM VenderMaster where cid = " + $stateParams.vendorid  ; // where $stateParams.productid
		$cordovaSQLite.execute(DATABASE, query).then(function(res) {
			
			for(var i = 0; i < res.rows.length; i++){
				$scope.Vendors =  res.rows.item(i);
				$scope.Vendors.cpincode = parseInt($scope.Vendors.cpincode);
				$scope.Vendors.ccontact = parseInt($scope.Vendors.ccontact);
			} 
		}, function (err) {
		  console.error(err);
		});
	
  };

/*End Edit Button*/

/*Start Update Button*/

	$scope.Update = function (vendorsForm) {
	    if (vendorsForm.$valid) {
	        $ionicLoading.show({
	            content: 'Loading',
	            animation: 'fade-in',
	            showBackdrop: true,
	            maxWidth: 200,
	            showDelay: 0
	        });
	        var query = "UPDATE VenderMaster SET cname =?, caddress =?, ccity =?, cstate =?, ccontact =?, cpincode =?, cemail =?, openbalance =? WHERE cid = " + $scope.Vendors.cid;

	        $cordovaSQLite.execute(DATABASE, query, [$scope.Vendors.cname, $scope.Vendors.caddress, $scope.Vendors.ccity, $scope.Vendors.cstate, $scope.Vendors.ccontact.toString(), $scope.Vendors.cpincode, $scope.Vendors.cemail, $scope.Vendors.openbalance]).then(function (res) {

	            $ionicLoading.hide();
	            $ionicPopup.alert({
	                title: 'Updated.....',
	                template: 'Data Updated successfully'
	            });

	            $state.go('app.vender_list', {}, {

	            });
	        });
	    };
	}
/*End Update Button*/
	
});
