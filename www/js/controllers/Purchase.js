angular.module('starter.controllers.Purchase', [])

.controller('PurchaseController', function ($scope, $cordovaPrinter, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicModal, $ionicLoading, $state, $ionicPlatform, InvoiceService, $cordovaInAppBrowser, deviceReady) {
    debugger;
    $scope.PurchaseList = new Array();
    $scope.Purchase = new Object();
	$scope.VendorsList  = [];
	$scope.CompanyList  = [];
	
    var vm = this;
    setDefaultsForPdfViewer($scope);
    $scope.pdfUrl = null;
    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up',
        reload : true
    }).then(function (modal) {
        vm.modal = modal;
    });
    

    // $scope.List = function () {
      // //  $state.go($state.current, {}, { reload: true });

        // var query = "SELECT * FROM ChallanInfo as CI,VenderMaster as VM WHERE CI.vend_id == VM.cid";
        // debugger;
        // $cordovaSQLite.execute(DATABASE, query).then(function (res) {
            // debugger;
            // var pur = []; var ven = [];
            // for (var i = 0; i < res.rows.length; i++) {
                // $scope.PurchaseList.push(res.rows.item(i));
            // }
            // debugger;

            // debugger;

        // }, function (err) {
            // console.error(err);
        // });
    // }
    $scope.InvoiceItems = new Object();
    $scope.CreateInvoice = function (chalanid) {

        debugger;
        $ionicLoading.show();
       
        var query = 'SELECT * FROM ChallanInfo as CI,VenderMaster as VI,CompanyInfo as ComI   WHERE  '+
                    'CI.vend_id = VI.cid AND CI.comp_id = ComI.id  AND  challanid = ?'

        $cordovaSQLite.execute(DATABASE, query, [chalanid]).then(function (chalaninfo) {
           // debugger;
            $scope.InvoiceItems = chalaninfo.rows.item(0);

           $cordovaSQLite.execute(DATABASE, 'SELECT * FROM ChallanProducts WHERE challanid = ?', [chalanid]).then(function (chalanproducts) {
                var prodlist = [];
                for (var i = 0; i < chalanproducts.rows.length; i++) {
                    prodlist.push(chalanproducts.rows.item(i));
                }
           //     debugger;
                $scope.InvoiceItems.Products = prodlist;

                var invoice = getDummyData($scope.InvoiceItems);

                InvoiceService.createPdf(invoice)
                                .then(function (pdf) {
                                    var blob = new Blob([pdf], { type: 'application/pdf' });
                                    $scope.pdfUrl = URL.createObjectURL(blob);
                                    debugger;
									vm.modal.show();
									debugger;
									$ionicLoading.hide();
									var d = document.getElementById('pdf').toDataURL();
									var doc = '<html><img src="'+d+'"</html>';
									$cordovaPrinter.print(doc);									
                                });

                // createDocumentDefinition($scope.InvoiceItems);
            });
        });

        debugger;
    }

    $scope.print = function () {
        debugger;
        var d = document.getElementById('pdf').toDataURL();
        console.log(d);
        var doc = '<html><img src="'+d+'"</html>';
        $cordovaPrinter.print(doc);
    }

    function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.onError = function (error) {
            console.error("Error " +error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log(progress);
        };
    }


    function getDummyData(data) {
      //  debugger;
        var prod = [];
        var subtotal = 0;
        for (var i = 0; i < data.Products.length; i++) {
            subtotal = subtotal + data.Products[i].total;
            prod.push({
                'Description': data.Products[i].materialname,
                'Quantity': data.Products[i].nos.toString(),
                'Price': data.Products[i].price.toString(),
                'Tax': data.Products[i].tax.toString(),
                'Total': data.Products[i].total.toString()
            });
        }
        return {
            type:'PURCHASE',
            Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),
            AddressFrom: {
                Name: data.cname,
                Address: data.caddress,
                City: data.ccity,
                State: data.cstate,
                PinCode: data.cpincode
            },
            AddressTo: {
                Name: data.name,
                Address: data.address,
                City: data.city,
                State: data.state,
                PinCode: data.pin
            },
            InvoiceNumber: data.challanid.toString(),
            Items: prod,
            Subtotal: subtotal.toString(),
            Shipping: data.ship.toString(),
            Discount: data.discount.toString(),
            Tax: data.tax.toString(),
            Total: data.grandtotal.toString()
        };
    }

    $scope.Test = function ()
    {
       // alert("praveen");
    }

	$scope.List = function()
{
debugger;
// $scope.data.Vendorname = DATABASE.database().currentUser.uid;
   DATABASE.database().ref('Purchase').on('value',function(snap){

  snap.forEach(function(s){
     var a = new Object();
	 a.Id = s.key;
	 a.val = s.val();
    $scope.PurchaseList.push(a);
  
  });
  
  // SharedDataService.customer = $scope.customers;
});
 }
 
 // $scope.LoadVendorslist = function () {
        
			// $ionicLoading.show({
							// content: 'Loading',
							// animation: 'fade-in',
							// showBackdrop: true,
							// maxWidth: 200,
							// showDelay: 0
						// });
			// debugger;
			// $scope.CompanyList  = [];
			// DATABASE.database().ref('Vendors').on('value',function(snap){
			  // snap.forEach(function(s){
				 // var a = new Object();
				 // a.id = s.key;
				 // a.val = s.val();
				// $scope.VendorsList.push(a);
			  
			  // })
			  
			    // $ionicLoading.hide();
			// })
			  
			  
    // };
	
	// $scope.LoadCompanylist = function () {
        
		
			// $ionicLoading.show({
							// content: 'Loading',
							// animation: 'fade-in',
							// showBackdrop: true,
							// maxWidth: 200,
							// showDelay: 0
						// });
			// debugger;
			
			// DATABASE.database().ref('Company').on('value',function(snap){
			  // snap.forEach(function(s){
				 // var a = new Object();
				 // a.id = s.key;
				 // a.val = s.val();
			// $scope.CompanyList.push(a);
			
			  // })
			  
			// })
			  // DATABASE.database().ref('Vendors').on('value',function(snap){
			  // snap.forEach(function(s1){
				 // var a1 = new Object();
				 // a1.id = s1.key;
				 // a1.val = s1.val();
				// $scope.VendorsList.push(a1);
			  
			   // })
			  
			    
			// })			 
			 // $ionicLoading.hide(); 
    // };
	$scope.LoadCompanylist = function () {
 // alert($scope.data.Company) this will show true or false means this model is selected or not
		if(!$scope.data.Company)
		 {
		 return false;
		 }	
		// if (!$scope.data.Company == true) {
            // $ionicPopup.alert({
                // title: 'Alert',
                // template: 'Please Select Company'
            // });
            // return false;
        // }
		// alert("after if");
			$ionicLoading.show({
							content: 'Loading',
							animation: 'fade-in',
							showBackdrop: true,
							maxWidth: 200,
							showDelay: 0
						});
			debugger;
			$scope.CompanyList = [];
			DATABASE.database().ref('Company').on('value',function(snap){
			  snap.forEach(function(s){
				 var a = new Object();
debugger;
				 a.id = s.key;
				 a.val = s.val();
			$scope.CompanyList.push(a);
			
			  })
			  
			})
			  // DATABASE.database().ref('Vendors').on('value',function(snap){
			  // snap.forEach(function(s1){
				 // var a1 = new Object();
				 // a1.id = s1.key;
				 // a1.val = s1.val();
				// $scope.VendorsList.push(a1);
			  
			   // })
			  
			    
			// })			 
			 $ionicLoading.hide(); 
    }; 
	$scope.LoadVendors = function () {
         if(!$scope.data.Vendors)
		 {
		 return false;
		 }
		
		
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
			  snap.forEach(function(s1){
				 var a1 = new Object();
				 a1.id = s1.key;
				 a1.val = s1.val();
				$scope.VendorsList.push(a1);
			  
			   })
			  
			    
			})			 
			 $ionicLoading.hide(); 
    };
	
	
	$scope.CheckProducts = function () {
	if(!$scope.data.Product)
		 {
		 return false;
		 }
$ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
       
debugger;
$scope.ProductsList  = [];

DATABASE.database().ref('products').on('value',function(snap){
$scope.Products  = [];
  snap.forEach(function(s){
     var a = new Object();
	 a.pid = s.key;
	 a.val = s.val();
    $scope.ProductsList.push(a);
  
  }).then
  $ionicLoading.hide();
  
  
});
};
	
	$scope.viewvendor = function () {
            debugger;
			
			
            $scope.Vendor = Enumerable.From($scope.VendorsList)
                  .Where(function (x) { return x.Id == $stateParams.Vendorid })
                  .FirstOrDefault();
				  
				 
				  }
				  
				  $scope.GetVendor = function() {
	debugger;
		
					
		$scope.data.Vendor = Enumerable.From($scope.VendorList)
					  .Where(function (x) { return x.id == $scope.Vendor.id })
					  .SingleOrDefault();
					// $scope.data.StockValue = $scope.data.Stock.val.stock;  
					
 
  }
})


.controller('TestCtrl', function ($scope)
{
    $scope.Test = function ()
    {
       // alert("test");
    }

}
);


