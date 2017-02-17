angular.module('starter.controllers.challans', [])

.controller('challans', function ($scope, $cordovaSQLite, DATABASE, $stateParams,SharedDataService, $ionicPopup, $ionicLoading, $state, $ionicModal, $cordovaDialogs) {


    //CUSTOMERS

    $scope.VendorsList = new Array();   // Customers List
    $scope.Vendor = new Object();  // SElected Customer
    $scope.CheckVendor = false;
    $scope.Vendormodal = new Object();   // To open the Modal (popup)
    $scope.FormValues = new Object();
    $scope.VendorsList = SharedDataService.Vendors;
    $scope.CompanyList = SharedDataService.Company;
    $scope.ProductList = SharedDataService.Product;
    $scope.stocks = SharedDataService.stock;
	
    // select customer event
    $scope.ModalForVendorsList = function () {
    debugger;
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.Vendormodal = modaldata;
            $scope.Vendormodal.show();
        });
    };

    //Load Customers for Modal
    $scope.LoadVendors = function () {
	debugger;
	if($scope.VendorsList.length == 0)
	{
		$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});
				debugger;
			$scope.VendorsList  = [];

          DATABASE.database().ref('Vendors').on('value',function(snap){

			  snap.forEach(function(s){
				 var a = new Object();
				 a.id = s.key;
				 a.val = s.val();
				$scope.VendorsList.push(a);
			  
			  });
              $ionicLoading.hide();
              SharedDataService.Vendors = $scope.VendorsList;
});
}
}
 




    //select customer from Modal
    $scope.SelectVendor = function (vendor) {

        $scope.CheckVendor = true;
        $scope.Vendor = vendor;
        $scope.Vendormodal.hide();


    };



    // COMPANIES

    // $scope.CompanyList = new Array(); // Companies List
    $scope.Company = new Object(); // Selected Company
    $scope.CheckCompany = false;
    $scope.CompanyModal = new Object();  // To Open the Comapny Modal

    $scope.ModalForCompaniesList = function () {

        $ionicModal.fromTemplateUrl('my-company.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.CompanyModal = modaldata;
            $scope.CompanyModal.show();
        });
    };


    //Load Companies for Modal
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
    //select Company from Modal
    $scope.SelectCompany = function (company) {

        $scope.CheckCompany = true;
        $scope.Company = company;
        $scope.CompanyModal.hide();
    }

    // PRODUCTS

    $scope.ProductList = new Array(); // Product list
    $scope.Product = new Object();  // SElected Product
    $scope.ProductModal = new Object(); // Modal for Product
    $scope.ProductNos = new Object(); // Modal for Quantity
    $scope.SelectedProducts = new Array(); // Selected Products

    $scope.TotalAmount = 0;   // Total Amount
    $scope.Discount = 0;
    $scope.Shipping = 0;
    $scope.Sales = 0;
    $scope.GrandTotal = $scope.TotalAmount + $scope.Shipping - $scope.Discount + (($scope.TotalAmount + $scope.Shipping - $scope.Discount) * $scope.Sales / 100);



    // Load Modal for Products
    $scope.ModalForProductsList = function () {

        $ionicModal.fromTemplateUrl('product.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.ProductModal = modaldata;
            $scope.ProductModal.show();
        });
    };


    // Load Products 
    $scope.LoadProducts = function () {

      
	$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
						
				debugger;
				$scope.ProductList  = [];
				$scope.Product = new Object();
				DATABASE.database().ref('products').on('value',function(snap){

				  snap.forEach(function(s){
					 var a = new Object();
					 a.pid = s.key;
					 a.val = s.val();
					$scope.ProductList.push(a);
				  
				  }).then
				  $ionicLoading.hide();
				  
				  SharedDataService.Product = $scope.ProductList;
				});
};


    //  Quantity Modal
    $scope.SelectProduct = function (product) {
	debugger;
	console.log(product);
        $scope.Product = product;
        $ionicModal.fromTemplateUrl('nos.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.ProductNos = modaldata;
            $scope.ProductNos.show();
        });
    }


    // Insert items after selection 
    $scope.addListItem = function (form) {
        debugger;
        var total = (form.price.$modelValue * form.nos.$modelValue) + (((form.price.$modelValue * form.nos.$modelValue) * form.tax.$modelValue) / 100);
        // var total = ($scope.Product.mprice * form.nos.$modelValue);
        $scope.TotalAmount = $scope.TotalAmount + total;
        $scope.SelectedProducts.push
            ({
			    pid  : $scope.Product.pid,
                name: $scope.Product.val.name,
                price: $scope.Product.val.price,
                tax: form.tax.$modelValue,
                Qty: form.nos.$modelValue,
                total: total
            });
        $scope.ProductNos.hide();
        $scope.ProductModal.hide();
        $scope.CheckProduct = true;
    }


    // remove product from list
    $scope.RemoveProductCount = function (list) {

        var index = $scope.SelectedProducts.indexOf(list);
        $scope.SelectedProducts.splice(index, 1);
        $scope.TotalAmount = $scope.TotalAmount - list.total;
    }
    $scope.FormValues.Shipping = 0; $scope.FormValues.Discount = 0; $scope.FormValues.Salestax = 0;

    // Final SAve to database
    $scope.LastSubmit = function () {
        debugger;
        var grandtotal = (($scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount + (($scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount) * $scope.FormValues.Salestax / 100)));
       
        if ($scope.FormValues.Vendor == undefined) {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Select Vendor'
            });
            return false;
        }
		
		if ($scope.Company == undefined) {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Select Company'
            });
            return false;
        }
		
		
		if ($scope.FormValues.datenew == undefined || $scope.FormValues.datenew == '') {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Enter Purchase Date'
            });
            return false;
        }
		if ($scope.FormValues.status == undefined || $scope.FormValues.status == '') {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Enter Status'
            });
            return false;
        }
		
        if ($scope.SelectedProducts.length == 0) {
            $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Select Products'
             });
             return false;
        }

        if ($scope.FormValues.challansno == undefined || $scope.FormValues.challansno == '') {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Enter Challan Number'
            });
            return false;
        }
		 if ($scope.FormValues.PaidAmt == undefined || $scope.FormValues.PaidAmt == '') {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Enter Paid Amount'
            });
            return false;
        }
		 if ($scope.FormValues.optionSelected == undefined || $scope.FormValues.optionSelected == '') {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Enter Payment Option'
            });
            return false;
        }
debugger;
$scope.FormValues.Date = $scope.FormValues.datenew.toString();
DATABASE.database().ref('Purchase')
            .push($scope.FormValues).then(function(response){
		  for(var i = 0 ;i < $scope.SelectedProducts.length;i++)
		  {
		  debugger;
		  var child = angular.copy($scope.SelectedProducts[i]);
		  
		   DATABASE.database().ref('PurchaseTransactions').child(response.key).push(child);
		  }
		});
    }


    $scope.SaleProductList = [];
    $scope.SelectSale = function () {
        $scope.SaleInfoList = [];
        var query_sale = "SELECT * FROM ChallanInfo";
        $cordovaSQLite.execute(DATABASE, query_sale).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.SaleInfoList.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });


        var query_SP = "SELECT * FROM ChallanProducts";
        $cordovaSQLite.execute(DATABASE, query_SP).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.SaleProductList.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });
        $scope.LoadVendors();
        $scope.LoadCompaniesList();
    };
	 $scope.SelectStock = function () {
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
       
debugger;
$scope.stocks  = [];

DATABASE.database().ref('stock').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.pid = s.key;
	 a.val = s.val();
    $scope.stocks.push(a);
  
  }).then
  $ionicLoading.hide();
  
  SharedDataService.stock = $scope.stocks;
});
};
});

