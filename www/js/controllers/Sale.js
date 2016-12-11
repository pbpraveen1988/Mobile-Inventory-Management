angular.module('starter.controllers.Sale', [])

.controller('SaleController', function ($scope, $cordovaPrinter, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicModal, $ionicLoading, $state, $ionicPlatform, InvoiceSaleService, $cordovaInAppBrowser, deviceReady) {
    debugger;
    $scope.SaleList = new Array();
    $scope.Sale = new Object();
    var vm = this;

    setDefaultsForPdfViewer($scope);

    $scope.pdfUrl = null;

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up',
        reload: true
    }).then(function (modal) {
        vm.modal = modal;
    });


    // LIST of sales 
    $scope.List = function () {
        //  $state.go($state.current, {}, { reload: true });

        var query = "SELECT * FROM SaleInfo as SI,CustomerMaster as CM WHERE SI.cust_id == CM.cid";
        debugger;
        $cordovaSQLite.execute(DATABASE, query).then(function (res) {
            debugger;
            var pur = []; var ven = [];
            for (var i = 0; i < res.rows.length; i++) {
                $scope.SaleList.push(res.rows.item(i));
            }
            debugger;

        }, function (err) {
            console.error(err);
        });
    }

    $scope.InvoiceItems = new Object();

    $scope.CreateInvoice = function (chalanid) {

        // debugger;
        $ionicLoading.show();



        var query = 'SELECT * FROM SaleInfo as SI,CustomerMaster as CI,CompanyInfo as ComI,SaleShippingAddress as SSA   WHERE  SI.cust_id = CI.cid AND SI.comp_id = ComI.id  AND  SSA.challanid = SI.saleid  AND saleid = ?'

        $cordovaSQLite.execute(DATABASE, query, [chalanid]).then(function (chalaninfo) {
            // debugger;
            $scope.InvoiceItems = chalaninfo.rows.item(0);

            $cordovaSQLite.execute(DATABASE, 'SELECT * FROM SaleProducts WHERE saleid = ?', [chalanid]).then(function (chalanproducts) {
                var prodlist = [];
                for (var i = 0; i < chalanproducts.rows.length; i++) {
                    prodlist.push(chalanproducts.rows.item(i));
                }
                //     debugger;
                $scope.InvoiceItems.Products = prodlist;

                var invoice = getDummyData($scope.InvoiceItems);

                InvoiceSaleService.createPdf(invoice)
                                .then(function (pdf) {
                                    var blob = new Blob([pdf], { type: 'application/pdf' });
                                    $scope.pdfUrl = URL.createObjectURL(blob);
                                    debugger;
                                    vm.modal.show();
                                    $ionicLoading.hide();
                                    debugger;
                                    var d = document.getElementById('pdf').toDataURL();
                                    var doc = '<html><img src="' + d + '"</html>';
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
        var doc = '<html><img src="' + d + '"</html>';
        $cordovaPrinter.print(doc);
    }

    function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.onError = function (error) {
            console.error("Error " + error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log("progress" + progress);
        };
    }


    function getDummyData(data) {
         debugger;
        var prod = [];
        var subtotal = 0;
        for (var i = 0; i < data.Products.length; i++) {
            subtotal = subtotal + data.Products[i].total;
            prod.push({
                'Description': data.Products[i].pname,
                'Quantity': data.Products[i].nos.toString(),
                'Price': data.Products[i].price.toString(),
                'Tax': data.Products[i].tax.toString(),
                'Total': data.Products[i].total.toString()
            });
        }

        if (data.logo != null && data.logo != undefined && data.logo != '' && data.logo != "undefined") {
			debugger;
            return {
                type: 'SALE',
                Date: new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" }),
                AddressFrom: {
                    Image: data.logo,
                    Name: data.cname,
                    Address: data.caddress,
                    City: data.ccity,
                    State: data.cstate,
                    PinCode: data.cpincode
                },
				ShippingData :{
					Name : data.ShippingName,
					Address : data.ShippingAddress,
					LRNumber : data.LRNumber,
					Transport : data.Transport
					
				},
                AddressTo: {
                    Name: data.name,
                    Address: data.address,
                    City: data.city,
                    State: data.state,
                    PinCode: data.pin
                },
                InvoiceNumber: data.saleid.toString(),
                Items: prod,
                Subtotal: subtotal.toString(),
                Shipping: data.ship.toString(),
                Discount: data.discount.toString(),
                Tax: data.salestax.toString(),
                Total: data.grandtotal.toString()
            };
	} else if (data.logo == null || data.logo== undefined || data.logo == '' || data.logo =="undefined" ) {
			debugger;
            return {
                type: 'SALE',
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
				ShippingData :{
					Name : data.ShippingName,
					Address : data.ShippingAddress,
					LRNumber : data.LRNumber,
					Transport : data.Transport
					
				},
                InvoiceNumber: data.saleid.toString(),
                Items: prod,
                Subtotal: subtotal.toString(),
                Shipping: data.ship.toString(),
                Discount: data.discount.toString(),
                Tax: data.salestax.toString(),
                Total: data.grandtotal.toString()
            };
        }
    }

})



