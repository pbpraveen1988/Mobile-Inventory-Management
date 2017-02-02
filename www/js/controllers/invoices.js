angular.module('starter.controllers.invoices', [])

.controller('InvoicesController', function ($scope, $cordovaPrinter,SharedDataService, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicModal, $ionicLoading, $state, InvoiceService) {

    $scope.CustomersList = new Array();   // Customers List
    $scope.Customer = new Object();  // SElected Customer
    $scope.CheckCustomer = false;
    $scope.Customermodal = new Object();   // To open the Modal (popup)
    $scope.FormValues = new Object();
    $scope.FormValues.challansno = new Date().valueOf();
     $scope.CustomersList = SharedDataService.customers;
	 $scope.ProductList = SharedDataService.Product;
    $scope.ModalForCustomersList = function () {
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            unfocusOnHide: false
        }).then(function (modaldata) {
            $scope.Customermodal = modaldata;
            $scope.Customermodal.show();
        });
    }

    $scope.LoadCustomers = function () {
        
		debugger;
	// if($scope.CustomersList.length == 0)
	{
		$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});
				debugger;
			$scope.CustomersList = [];

          DATABASE.database().ref('Customers').on('value',function(snap){

			  snap.forEach(function(s){
				 var a = new Object();
				 a.id = s.key;
				 a.val = s.val();
				$scope.CustomersList.push(a);
			  
			  });
              $ionicLoading.hide();
              SharedDataService.customers = $scope.CustomersList;
});
}
        // var query_customer = "SELECT * FROM CustomerMaster";
        // $cordovaSQLite.execute(DATABASE, query_customer, []).then(function (res) {
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.CustomersList.push(res.rows.item(i));
            // }
        // }, function (err) {
            // console.error(err);
        // });
    }

    $scope.SelectCustomer = function (customer) {
        $scope.CheckCustomer = true;
        $scope.Customer = customer;
        $scope.Customermodal.hide();
    }



    $scope.CompaniesList = new Array(); // Companies List
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
        // $scope.CompaniesList = [];
        // var query_customer = "SELECT * FROM CompanyInfo";
        // $cordovaSQLite.execute(DATABASE, query_customer).then(function (res) {
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.CompaniesList.push(res.rows.item(i));
            // }
        // }, function (err) {
            // console.error(err);
        // });
    }

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

        $scope.ProductList = [];
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
        // var query_customer = "SELECT * FROM ProductsMaster";
        // $cordovaSQLite.execute(DATABASE, query_customer).then(function (res) {
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.ProductList.push(res.rows.item(i));
            // }
        // }, function (err) {
            // console.error(err);
        // });
    }

    $scope.SelectProduct = function (product) {
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
        var total = ($scope.Product.pprice * form.nos.$modelValue) + ((($scope.Product.pprice * form.nos.$modelValue) * form.tax.$modelValue) / 100);
        // var total = ($scope.Product.mprice * form.nos.$modelValue);
        $scope.TotalAmount = $scope.TotalAmount + total;
        $scope.SelectedProducts.push
            ({
                name: $scope.Product.pname,
                price: $scope.Product.pprice,
                tax: form.tax.$modelValue,
                Qty: form.nos.$modelValue,
                total: total.toFixed(2)
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
     $scope.GrandTotal = 0;
     $scope.FormValues.Shipping = 0; $scope.FormValues.Discount = 0; $scope.FormValues.Salestax = 0;
     $scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount + (($scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount) * $scope.FormValues.Salestax / 100);

     $scope.LastSubmit = function () {
         debugger;
         var grandtotal = (($scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount + (($scope.TotalAmount + $scope.FormValues.Shipping - $scope.FormValues.Discount) * $scope.FormValues.Salestax / 100)));
        
         if ($scope.Customer.id == undefined) {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Select Customer'
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
		 
		  if ($scope.FormValues.shippingname == undefined || $scope.FormValues.shippingname == '') {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Enter Shipping Name'
             });
             return false;
         }
		 
		  if ($scope.FormValues.shippingaddress == undefined || $scope.FormValues.shippingaddress == '') {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Enter Shipping Address'
             });
             return false;
         }
		 
		 if ($scope.FormValues.shippingdate == undefined || $scope.FormValues.shippingdate == '') {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Select Shipping Date'
             });
             return false;
         }
		 
		  if ($scope.FormValues.lrnumber == undefined || $scope.FormValues.lrnumber == '') {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Enter LR Number'
             });
             return false;
         }
		 
		 if ($scope.FormValues.shippingtransport == undefined || $scope.FormValues.shippingtransport == '') {
             $ionicPopup.alert({
                 title: 'Alert',
                 template: 'Please Enter Shipping Transport'
             });
             return false;
         }
		 debugger;
$scope.FormValues.Date = $scope.FormValues.datenew.toString();
DATABASE.database().ref('Sales')
            .push($scope.FormValues).then(function(response){
		  for(var i = 0 ;i < $scope.SelectedProducts.length;i++)
		  {
		  debugger;
		  var child = angular.copy($scope.SelectedProducts[i]);
		  
		   DATABASE.database().ref('SalesTransactions').child(response.key).push(child);
		  }
		});



         // var CheckQuery = 'SELECT * FROM SaleInfo WHERE saleid = ?';;
         // $cordovaSQLite.execute(DATABASE, CheckQuery, [$scope.FormValues.challansno]).then(function (checkres) {
             // if (checkres.rows.length > 0) {
                 // $ionicLoading.hide();
                 // $ionicPopup.alert({
                     // title: 'Error.',
                     // template: 'Challan Number Already Exists'
                 // });

                 // return false;
             // } else {
                 // debugger;
                 // var query = "INSERT INTO SaleInfo (saleid ,cust_id,comp_id,c_date,d_date, salestax,ship,discount,grandtotal,payment,status,paidamt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

                 // $cordovaSQLite.execute(DATABASE, query, [
                                                         // $scope.FormValues.challansno,
                                                         // $scope.Customer.cid,
                                                         // $scope.Company.id,
                                                         // $scope.FormValues.datenew,
                                                         // $scope.FormValues.datedue,
                                                         // $scope.FormValues.Salestax,
                                                         // $scope.FormValues.Shipping,
                                                         // $scope.FormValues.Discount,
                                                         // grandtotal,
                                                         // $scope.FormValues.optionSelected,
                                                         // $scope.FormValues.status,
                                                         // $scope.FormValues.PaidAmt
                 // ])
                 // .then(function (res) {

                     // //CREATE TABLE "SaleProducts" (saleid,pname,price,tax,nos,total)

                     // var querySP = "INSERT INTO SaleProducts ( saleid ,pname ,price ,tax ,nos ,total ) VALUES (?,?,?,?,?,?)";
                     // for (var i = 0; i < $scope.SelectedProducts.length; i++) {
                         // $cordovaSQLite.execute(DATABASE, querySP, [

                                     // $scope.FormValues.challansno,
                                     // $scope.SelectedProducts[i].name,
                                     // $scope.SelectedProducts[i].price,
                                     // $scope.SelectedProducts[i].tax,
                                     // $scope.SelectedProducts[i].Qty,
                                     // $scope.SelectedProducts[i].total

                         // ]).then(function (res) {
                             // console.log("insertId: " + res.insertId);
                         // }, function (err) {
                             // console.error(err);
                         // });

                     // };
					 
					 // var query_shipping = "INSERT INTO SaleShippingAddress (ShippingName,ShippingAddress,ShippingDate,LRNumber,Transport,challanid) VALUES (?,?,?,?,?,?)";
					 
					  // $cordovaSQLite.execute(DATABASE, query_shipping, [
                                     // $scope.FormValues.shippingname,
                                     // $scope.FormValues.shippingaddress,
                                     // $scope.FormValues.shippingdate,
                                     // $scope.FormValues.lrnumber,
                                     // $scope.FormValues.shippingtransport,
									  // $scope.FormValues.challansno

                         // ]).then(function(res){
							 
							 
						 // });
					 
					 
					 
					 
                     // if ($scope.FormValues.optionSelected == "check") {
                         // // BankInfo (id ,bank_name,name,accountno,checkno)
                         // var query_bank = "INSERT INTO InvoiceBankInfo (invoiceno, bank_name, name, accountno, checkno) VALUES (?,?,?,?,?)";

                         // var str = $scope.FormValues.bankname;
                         // var res = str.toUpperCase();

                         // $cordovaSQLite.execute(DATABASE, query_bank, [
                                     // $scope.FormValues.challansno,
                                     // res,
                                     // $scope.FormValues.name,
                                     // $scope.FormValues.accountno,
                                     // $scope.FormValues.checkno

                         // ]).then(function (res) {
                             // console.log("insertId: " + res.insertId);
                         // }, function (err) {
                             // console.error(err);
                         // });
                     // };
                     // $ionicLoading.hide();
                     // $ionicPopup.alert({
                         // title: 'Saved.',
                         // template: 'Data Saved successfully'
                     // });

                     // $scope.Vendors = null;
                     // $state.go('app.sale_list', {}, {
                     // });

                 // }, function (err) {
                     // console.error(err);
                 // });

             // }

         // });


     }

})