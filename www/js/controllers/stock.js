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
	 $scope.StockValue = 0;
	$scope.Selectstock1 = function(type)
	{
		if(type == 'products')
		{
			$scope.StockType = "Products";
			debugger;
			$scope.stocks  = [];
			$scope.stocktype = new Object();
            $ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
		    });
			DATABASE.database().ref('products')
			.on('value',function(snap){$scope.stocks  = [];
				  snap.forEach(function(s){
					 var a = new Object();
					 a.id = s.key;
					 a.val = s.val();
					$scope.stocks.push(a);
			})
             SharedDataService.stock = $scope.stocks;
			 $ionicLoading.hide();		
            });
	           
			
		}
		else if(type == 'raw')
		{
	     $scope.StockType = "Raw Materials";
		 $ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
		 });
			debugger;
			$scope.stocks  = [];
			DATABASE.database().ref('rawmaterials').on('value',function(snap){
            $scope.stocks  = [];
			  snap.forEach(function(s){
				 var a = new Object();
				 a.id = s.key;
				 a.val = s.val();
				$scope.stocks.push(a);
			  })
			  SharedDataService.stock = $scope.stocks;
			  $ionicLoading.hide();
			});
			   
			  
	    }
	    $scope.StockModal.hide();
	}
	
	$scope.LoadCompaniesList = function () {
        
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
			  
			  })
			  SharedDataService.Company = $scope.CompanyList;
			    $ionicLoading.hide();
			})
			  
			  
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

        $scope.Company = company;
         $scope.CompanyModal.hide();
    };
  
	$scope.GetStock = function() {
	debugger;
		
					
		$scope.data.Stock = Enumerable.From($scope.stocks)
					  .Where(function (x) { return x.id == $scope.data.selectedstock })
					  .SingleOrDefault();
					$scope.data.StockValue = $scope.data.Stock.val.stock;  
					
 
  }
   
   
   $scope.updatestock = function()
   {
   debugger;
		$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});

$scope.data.Stock = Enumerable.From($scope.stocks)
					  .Where(function (x) { return x.id == $scope.data.selectedstock })
					  .SingleOrDefault();
					   $scope.data.Stock.val.stock = $scope.data.StockValue;
if($scope.StockType == "Raw Materials")
  {
 
  
  DATABASE.database().ref('rawmaterials')
  .child($scope.data.selectedstock).set($scope.data.Stock.val)
  .then(function(e){
  
  $ionicPopup.alert({
                                  title: 'Saved.',
                                  template: 'Stock Updated  successfully'
                              });
							  
							  })

  
  }else
  {  
   
  DATABASE.database().ref('products')
  .child($scope.data.selectedstock).set($scope.data.Stock.val).then(function(e){
           $ionicLoading.hide();
                $ionicPopup.alert({
                                  title: 'Saved.',
                                  template: 'Stock Updated successfully'
                              });
   
   });
 
  }}
  
    
  






// End of controller
});