angular.module('starter.controllers.stock', [])

.controller('stock', function ($scope,$ionicModal, $cordovaSQLite,SharedDataService, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {
    $scope.Company = new Object();	// Selected Company
    $scope.stock = new Object();
	 $scope.product = new Object();
	 $scope.stock = new Object();
	 $scope.StockType = '';
	$scope.CheckCompany = false;
    $scope.CompanyModal = new Object();
	 $scope.StockModal = new Object();
	 $scope.data = {};
	$scope.CompanyList = SharedDataService.Company;
	$scope.products = SharedDataService.product;
	$scope.stocks = SharedDataService.stock;
	$scope.stocks = SharedDataService.stock;	
	$scope.RawMaterials = SharedDataService.RawMaterial;	

	$scope.Selectstock1 = function(type)
	{
	// alert(type);
	if(type == 'products')
	{
 $scope.StockType = "Products";
debugger;
$scope.stocks  = [];
$scope.stocktype = new Object();
// $scope.stocktype = $scope.FinishedProducts;
DATABASE.database().ref('products').on('value',function(snap){
// $scope.products  = [];
  snap.forEach(function(s){
     var a = new Object();
	 a.id = s.key;
	 a.val = s.val();
    $scope.stocks.push(a);
  
  }).then
  // $ionicLoading.hide();
  
  SharedDataService.stock = $scope.stocks;
  
});
	}else if(type == 'raw'){
	$scope.StockType = "Raw Materials";
	 // $ionicLoading.show({
                // // content: 'Loading',
                // // animation: 'fade-in',
                // // showBackdrop: true,
                // // maxWidth: 200,
                // // showDelay: 0
            // // });
debugger;
$scope.RawMaterials  = [];
$scope.stocks  = [];
DATABASE.database().ref('rawmaterials').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.id = s.key;
	 a.val = s.val();
    $scope.stocks.push(a);
  
  }).then
  // $ionicLoading.hide();
  
  SharedDataService.stock = $scope.stocks;
});
	
	}
	 $scope.StockModal.hide();
	}
	
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

	
	$scope.SelectCompany = function (customer) {

        // $scope.CheckCompany = true;
        $scope.Company = customer;
         $scope.CompanyModal.hide();
    };
    
	// $scope.Selectstock = function(stock) {
	// // $scope.CheckStock = true;
        // $scope.stock = stock;
         // $scope.StockModal.hide();
    // };

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

 $scope.StockValue = 0;
$scope.GetStock = function() {
 if($scope.StockType == "Raw Materials")
  {
  $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

  $scope.StockValue = 0;
  DATABASE.database().ref('stock').child("rawmaterials").child($scope.data.selectedstock).on('value',function(snap){
  debugger;
  var s = snap.val();
  if(s == null || s == undefined)
  {
  
$scope.StockValue = 0;
   debugger;
  }else 
  {
   $scope.StockValue =  s;
  }
  
  }).then
  $ionicLoading.hide();
  }
  else if($scope.StockType == "Products")
  {
  DATABASE.database().ref('stock').child("products").child($scope.data.selectedstock).on('value',function(snap){
  debugger;
  var s = snap.val();
  if(s == null || s == undefined)
  {
  
$scope.StockValue = 0;
   debugger;
  }else 
  {
   $scope.StockValue =  s;
  }
  
  }).then
  $ionicLoading.hide();
  
  }}
   
   
   
   $scope.updatestock = function(StockValue)
     
{debugger;
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

if($scope.StockType == "Raw Materials")
  {
  // $scope.StockValue = new object;
  //var pp = $scope.StockValue;
  $scope.StockValue = [];
  debugger;
  DATABASE.database().ref('stock').child("rawmaterials").child($scope.data.selectedstock).set(StockValue).then
  $ionicLoading.hide();

  
  }else
  { 
   DATABASE.database().ref('stock').child("products").child($scope.data.selectedstock).set(StockValue).then
  $ionicLoading.hide();
   
  }}
  
    
  






// end of controller
});