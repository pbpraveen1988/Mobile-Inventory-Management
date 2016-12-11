angular.module('starter.controllers.products', [])

.controller('products', function($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.Products = new Object();
	$scope.ProductslList = new Array();
	$scope.EditId = $stateParams.productid;
/*	New Code	*/	
//	Table
//	"INSERT INTO ProductsMaster (pname, pprice, pdescription, vat) VALUES (?,?,?,?)";
	
$scope.SelectProducts = function() {
	
    var query = "SELECT * FROM ProductsMaster"; // where $stateParams.rawid
  
	$cordovaSQLite.execute(DATABASE, query).then(function(res) {
		for(var i = 0; i < res.rows.length; i++){
			$scope.ProductslList.push(res.rows.item(i));
		}	
    }, function (err) {
      console.error(err);
    });
	
  };

	
/* old code */	
	
/* Start Insert data in RawMaterial */	
  $scope.Save = function() {
	  
	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
	  debugger;
    var query = "INSERT INTO ProductsMaster (pname, pprice, pdescription, vat) VALUES (?,?,?,?)";
    // alert("Ganesh");
	$cordovaSQLite.execute(DATABASE, query, [$scope.Products.pname, $scope.Products.pprice,$scope.Products.pdescription,$scope.Products.vat]).then(function(res) {
		
		console.log("insertId: " + res.insertId);
		
		$ionicLoading.hide();
		$ionicPopup.alert({
			title: 'Saved.',
			template: 'Data Saved successfully'
		});
		
		$scope.Products = new Object();
		$state.go('app.product_list', {}, {
			
		});
		
    }, function (err) {
      console.error(err);
    });
	
  };
/*End Save Button.*/


/* Select data in Products */  
    $scope.Select = function() { 
    var query = "SELECT * FROM ProductsMaster"; // where $stateParams.rawid
    $scope.ProductslList = new Array();
	$cordovaSQLite.execute(DATABASE, query).then(function(res) {
		for(var i = 0; i < res.rows.length; i++){
			
			$scope.ProductslList.push(res.rows.item(i));
			
		} 
		
    }, function (err) {
      console.error(err);
    });
	
  };
/*End Select data in Products */ 

/*Start Delete Button.*/

	$scope.Delete = function(pid) {
		debugger;
		var confirmPopup = $ionicPopup.confirm({
			title: 'Product Delete...',
			template: 'Are you want to be Deleted?'
		});
		confirmPopup.then(function (res) {
			if (res) {
				var query = "DELETE FROM ProductsMaster WHERE pid = ?";
				
				$cordovaSQLite.execute(DATABASE, query, [pid]).then(function(res) {
					
					console.log("Deleted");
					$state.go('app.product_list',{},{reload:true});
					
				}, function (err) {
				  console.error(err);
				});
			}
		})
    };

/*End Delete Button.*/

/*Start Selection Button*/

	$scope.Selectid = function(pid) { debugger;
      $state.go('app.product_edit', {
		  productid:pid
		  
	  }, {			//redirect to another page;
		  
       });
    };
/*End Selection Button*/

/*Start Edit Button*/	
	$scope.Edit = function(){
		// alert("Ganesh");
		debugger;
		var query = "SELECT * FROM ProductsMaster where pid = " + $stateParams.productid  ; // where $stateParams.productid
		$cordovaSQLite.execute(DATABASE, query).then(function(res) {
			
			for(var i = 0; i < res.rows.length; i++){
				$scope.Products =  res.rows.item(i);
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
		var query = "UPDATE ProductsMaster SET pname =?, pdescription =?, pprice =?, vat =? WHERE pid = "+ $scope.Products.pid;
		
		$cordovaSQLite.execute(DATABASE, query, [$scope.Products.pname, $scope.Products.pdescription, $scope.Products.pprice, $scope.Products.vat]).then(function(res) {
			
			$ionicLoading.hide();
			$ionicPopup.alert({
                        title: 'Updated.....',
                        template: 'Data Updated successfully'
            });
					
			$state.go('app.product_list', {}, {
							reload:true
			});
		});
  };

/*End Update Button*/
	
});
