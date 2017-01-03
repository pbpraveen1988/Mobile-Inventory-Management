angular.module('starter.controllers.products', [])

.controller('products', function ($scope, $cordovaSQLite, SharedDataService,DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {

$scope.products = SharedDataService.product;
    $scope.Product= new Object();
	$scope.Products= new Object();
    $scope.ProductslList = new Array();
    $scope.EditId = $stateParams.productid;
    /*	New Code	*/
    //	Table
    //	"INSERT INTO ProductsMaster (pname, pprice, pdescription, vat) VALUES (?,?,?,?)";

    $scope.SelectProducts = function () {
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        // var query = "SELECT * FROM ProductsMaster"; // where $stateParams.rawid

        // $cordovaSQLite.execute(DATABASE, query).then(function (res) {
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.ProductslList.push(res.rows.item(i));
            // }}
        // , function (err) {
            // console.error(err);
        // });
debugger;
$scope.products  = [];

DATABASE.database().ref('products').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.pid = s.key;
	 a.val = s.val();
    $scope.products.push(a);
  
  }).then
  $ionicLoading.hide();
  
  SharedDataService.product = $scope.products;
});
};
    


    /* old code */

    /* Start Insert data in RawMaterial */
    $scope.Save = function (productsForm) {
        if (productsForm.$valid) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            debugger;
            // var query = "INSERT INTO ProductsMaster (pname, pprice, pdescription, vat) VALUES (?,?,?,?)";
            // alert("Ganesh");
            // $cordovaSQLite.execute(DATABASE, query, [$scope.Products.pname, $scope.Products.pprice, $scope.Products.pdescription, $scope.Products.vat]).then(function (res) {
                DATABASE.database().ref('products')
                                .push($scope.Products).then(function (res) {
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
        }
    };
    /*End Save Button.*/


    /* Select data in Products */
    $scope.Select = function () {
        var query = "SELECT * FROM ProductsMaster"; // where $stateParams.rawid
        $scope.ProductslList = new Array();
        $cordovaSQLite.execute(DATABASE, query).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {

                $scope.ProductslList.push(res.rows.item(i));

            }

        }, function (err) {
            console.error(err);
        });

    };
    /*End Select data in Products */

    /*Start Delete Button.*/

    $scope.Delete = function (pid) {
        debugger;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Product Delete...',
            template: 'Are you want to be Deleted?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                // var query = "DELETE FROM ProductsMaster WHERE pid = ?";

                // $cordovaSQLite.execute(DATABASE, query, [pid])
				DATABASE.database().ref('products').child(pid).remove()
				.then(function (res) {

                    console.log("Deleted");
                    $state.go('app.product_list', {}, { reload: true });

                }, function (err) {
                    console.error(err);
                });
            }
        })
    };

    /*End Delete Button.*/

    /*Start Selection Button*/

    $scope.Selectid = function (pid) {
        debugger;
        $state.go('app.product_edit', {
            productid: pid

        }, {			//redirect to another page;

        });
    };
    /*End Selection Button*/

    /*Start Edit Button*/
    $scope.Edit = function () {
	DATABASE.database().ref('products').child($stateParams.productid).on('value',function(snapshot){
    $scope.Products = snapshot.val();
  
  
  });
        // alert("Ganesh");
        // debugger;
        // var query = "SELECT * FROM ProductsMaster where pid = " + $stateParams.productid; // where $stateParams.productid
        // $cordovaSQLite.execute(DATABASE, query).then(function (res) {

            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.Products = res.rows.item(i);
            // }
        // }, function (err) {
            // console.error(err);
        // });

    };

    /*End Edit Button*/

    /*Start Update Button*/

    $scope.Update = function (productsForm) {
        if (productsForm.$valid) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            // var query = "UPDATE ProductsMaster SET pname =?, pdescription =?, pprice =?, vat =? WHERE pid = " + $scope.Products.pid;

            // $cordovaSQLite.execute(DATABASE, query, [$scope.Products.pname, $scope.Products.pdescription, $scope.Products.pprice, $scope.Products.vat]).then(function (res) {

                // $ionicLoading.hide();
                // $ionicPopup.alert({
                    // title: 'Updated.....',
                    // template: 'Data Updated successfully'
                // });

                // $state.go('app.product_list', {}, {
                    // reload: true
                // });
            // });
			DATABASE.database().ref('products').child($stateParams.productid)
			.set($scope.Products).then(function(e){
			$ionicLoading.hide();
	             $ionicPopup.alert({
	            title: 'Updated.....',
	                template: 'Data Updated successfully'
	            });

	             $state.go('app.product_list', {}, {

	           });
			 })
        };
    }
    /*End Update Button*/

});
