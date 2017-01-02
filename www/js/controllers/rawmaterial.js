angular.module('starter.controllers.rawmaterial', [])

.controller('rawmaterial', function($scope, $cordovaSQLite, DATABASE,SharedDataService, $stateParams, $ionicPopup, $ionicLoading, $state) {
	
	
	$scope.RawMaterial = new Object();
	$scope.RawMaterialList = new Array();
	$scope.EditId = $stateParams.rawid;
	$scope.RawMaterials = SharedDataService.RawMaterial;
/* Insert data in RawMaterial */	
	$scope.Save = function (rawmaterialForm) {
	    if (rawmaterialForm.$valid) {
	        $ionicLoading.show({
	            content: 'Loading',
	            animation: 'fade-in',
	            showBackdrop: true,
	            maxWidth: 200,
	            showDelay: 0
	        });
	        DATABASE.database().ref('rawmaterials')
                                .push($scope.RawMaterial)
	        
			        .then(function () {
                               console.log("fdfdfd");
                              $ionicLoading.hide();
                              $ionicPopup.alert({
                                  title: 'Saved.',
                                  template: 'Data Saved successfully'
                              });

                              $scope.RawMaterial = null;
                              $scope.RawMaterial = new Object();
                              $state.go('app.material_list', {}, { reload: true });
                          }, function (err) {
                              console.error(err);
                          });
	    }
  };
  
  
/* Select data in RawMaterial */  
    // $scope.Select = function() { 

    // var query = "SELECT * FROM RawMaterial"; // where $stateParams.rawid
    // $scope.RawMaterialList = new Array();
	// $cordovaSQLite.execute(DATABASE, query).then(function(res) {
		// for(var i = 0; i < res.rows.length; i++){			
			// $scope.RawMaterialList.push(res.rows.item(i));
		// }
    // }, function (err) {
      // console.error(err);
    // });
  // };
  $scope.Select = function()
{
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
debugger;
$scope.RawMaterials  = [];

DATABASE.database().ref('rawmaterials').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.mid = s.key;
	 a.val = s.val();
    $scope.RawMaterials.push(a);
  
  }).then
  $ionicLoading.hide();
  
  SharedDataService.RawMaterial = $scope.RawMaterials;
});
}

    $scope.Selectid = function(mid) {
			 
      $state.go('app.material_edit', {
		  rawid:mid
		  
	  }, {			//redirect to another page;
		  
       });
    };

  
  
  $scope.DisplayData = function(){
  DATABASE.database().ref('rawmaterials').child($stateParams.rawid).on('value',function(snapshot){
    $scope.RawMaterial = snapshot.val();
  
  
  });
  
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
    
    $scope.Update = function (rawmaterialForm) {
        if (rawmaterialForm.$valid) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            var query = "UPDATE RawMaterial SET mname =?,mtype =?,mprice =?,mdescription =?,vat =? WHERE mid = " + $scope.RawMaterial.mid;

            $cordovaSQLite.execute(DATABASE, query, [$scope.RawMaterial.mname, $scope.RawMaterial.mtype, $scope.RawMaterial.mprice, $scope.RawMaterial.mdescription, $scope.RawMaterial.vat]).then(function (res) {

                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Updated.....',
                    template: 'Data Updated successfully'
                });

                $state.go('app.material_list', {}, {

                });
            });
        };
    }
});