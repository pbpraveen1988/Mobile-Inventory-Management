angular.module('starter.controllers.rawmaterial', [])

.controller('rawmaterial', function($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.RawMaterial = new Object();
	$scope.RawMaterialList = new Array();
	$scope.EditId = $stateParams.rawid;
	
/* Insert data in RawMaterial */	
  $scope.Save = function() {   
	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
    var query = "INSERT INTO RawMaterial (mname,mtype,mprice,mdescription,vat) VALUES (?,?,?,?,?)";
	$cordovaSQLite.execute(DATABASE, query, [$scope.RawMaterial.mname, $scope.RawMaterial.mtype,$scope.RawMaterial.mprice,$scope.RawMaterial.mdescription,$scope.RawMaterial.mvat])
	              .then(function(res) {					
					console.log("insertId: " + res.insertId);
                     $ionicLoading.hide();
					 $ionicPopup.alert({
									title: 'Saved.',
									template: 'Data Saved successfully'
								});
					
					$scope.RawMaterial = null;
					$scope.RawMaterial = new Object();
					$state.go('app.material_list', {},  { reload: true });
				}, function (err) {
				  console.error(err);
				});
  };
  
  
/* Select data in RawMaterial */  
    $scope.Select = function() { 

    var query = "SELECT * FROM RawMaterial"; // where $stateParams.rawid
    $scope.RawMaterialList = new Array();
	$cordovaSQLite.execute(DATABASE, query).then(function(res) {
		for(var i = 0; i < res.rows.length; i++){			
			$scope.RawMaterialList.push(res.rows.item(i));
		}
    }, function (err) {
      console.error(err);
    });
  };
  

    $scope.Selectid = function(mid) {
			 
      $state.go('app.material_edit', {
		  rawid:mid
		  
	  }, {			//redirect to another page;
		  
       });
    };

  
  
  $scope.DisplayData = function(){
	 var query = "SELECT * FROM RawMaterial where mid = " + $stateParams.rawid  ; // where $stateParams.rawid
	    $cordovaSQLite.execute(DATABASE, query).then(function(res) {
		
		for(var i = 0; i < res.rows.length; i++){
			$scope.RawMaterial =  res.rows.item(i);
		} 
    }, function (err) {
      console.error(err);
    });
	
  };
  
  
  
/* Delete data in RawMaterial */

//	DELETE FROM table_name WHERE some_column=some_value;

    $scope.Delete = function(mid) {
		 
		var confirmPopup = $ionicPopup.confirm({
                            title: 'Delete...',
                            template: 'Are you want to be Deleted?'
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                var query = "DELETE FROM RawMaterial WHERE mid = ?";
								
								$cordovaSQLite.execute(DATABASE, query, [mid]).then(function(res) {
									
									console.log("Deleted");
									$state.go('app.material_list',{},{reload:true});
									
								}, function (err) {
								  console.error(err);
								});
                            }
                        })
  };
  
  
  
  
  
/* Update data in RawMaterial */
    
	$scope.Update = function() {
	   
	 	  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
		var query = "UPDATE RawMaterial SET mname =?,mtype =?,mprice =?,mdescription =?,vat =? WHERE mid = "+ $scope.RawMaterial.mid;
		
		$cordovaSQLite.execute(DATABASE, query, [$scope.RawMaterial.mname, $scope.RawMaterial.mtype,$scope.RawMaterial.mprice,$scope.RawMaterial.mdescription,$scope.RawMaterial.vat]).then(function(res) {
			
			$ionicLoading.hide();
			$ionicPopup.alert({
                        title: 'Updated.....',
                        template: 'Data Updated successfully'
            });
					
			$state.go('app.material_list', {}, {
							
			});
		});
  };
  
});