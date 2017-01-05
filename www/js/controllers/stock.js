angular.module('starter.controllers.stock', [])

.controller('stock', function ($scope,$ionicModal, $cordovaSQLite,SharedDataService, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
    $scope.Company = new Object();	// Selected Company
    $scope.stock = new Object();
	 $scope.product = new Object();
	 
	$scope.CheckCompany = false;
    $scope.CompanyModal = new Object();
	 $scope.StockModal = new Object();
$scope.CompanyList = SharedDataService.Company;
$scope.products = SharedDataService.product;	
	
	$scope.LoadCompaniesList = function () {
        // $scope.CompaniesList = [];
        // var query_customer = "SELECT * FROM CompanyInfo";
        // $cordovaSQLite.execute(DATABASE, query_customer).then(function (res) {
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.CompaniesList.push(res.rows.item(i));
            // }
        // }, function (err) {
            // console.error(err);
        // });
    // }
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
debugger;
$scope.CompanyList  = [];

DATABASE.database().ref('Company').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.id = s.key;
	 a.val = s.val();
    $scope.CompanyList.push(a);
  
  }).then
  $ionicLoading.hide();
  
  SharedDataService.Company = $scope.CompanyList;
});
    };
    
	$scope.ModalForCompaniesList = function () {

        $ionicModal.fromTemplateUrl('my-company.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.CompanyModal = modaldata;
            $scope.CompanyModal.show();
        });
    };
	$scope.ModalForStockType = function () {

        $ionicModal.fromTemplateUrl('my-stocktype.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.StockModal = modaldata;
            $scope.StockModal.show();
        });
    };

	
	$scope.SelectCompany = function (company) {

        $scope.CheckCompany = true;
        $scope.Company = company;
         $scope.CompanyModal.hide();
    };
    
	$scope.Selectstock = function(stock) {
	// $scope.CheckStock = true;
        $scope.stock = stock;
         $scope.StockModal.hide();
    };

	$scope.SelectProducts = function () {
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
      
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

// end of controller
});