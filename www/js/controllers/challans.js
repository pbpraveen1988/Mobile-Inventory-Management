angular.module('starter.controllers.challans', [])

.controller('challans', function ($scope, $cordovaSQLite, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state, $ionicModal, $cordovaDialogs) {


    //CUSTOMERS

    $scope.VendorsList = new Array();   // Customers List
    $scope.Vendor = new Object();  // SElected Customer
    $scope.CheckVendor = false;
    $scope.Vendormodal = new Object();   // To open the Modal (popup)
    $scope.FormValues = new Object();

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
        $scope.VendorsList = [];
        var query_vendor = "SELECT * FROM VenderMaster";
        $cordovaSQLite.execute(DATABASE, query_vendor, []).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.VendorsList.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });

    };





    //select customer from Modal
    $scope.SelectVendor = function (vendor) {

        $scope.CheckVendor = true;
        $scope.Vendor = vendor;
        $scope.Vendormodal.hide();


    };



    // COMPANIES

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
        $scope.CompaniesList = [];
        var query_customer = "SELECT * FROM CompanyInfo";
        $cordovaSQLite.execute(DATABASE, query_customer).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                $scope.CompaniesList.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });
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
        var query_customer = "SELECT * FROM RawMaterial";
        $cordovaSQLite.execute(DATABASE, query_customer).then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {

                $scope.ProductList.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });
    }

    //  Quantity Modal
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
        var total = (form.mprince.$modelValue * form.nos.$modelValue) + (((form.mprince.$modelValue * form.nos.$modelValue) * form.tax.$modelValue) / 100);
        // var total = ($scope.Product.mprice * form.nos.$modelValue);
        $scope.TotalAmount = $scope.TotalAmount + total;
        $scope.SelectedProducts.push
            ({
                name: $scope.Product.mname,
                price: $scope.Product.mprice,
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
        alert(grandtotal);
        if ($scope.Vendor.cid == undefined) {
            $ionicPopup.alert({
                title: 'Alert',
                template: 'Please Select Vendor'
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



        var CheckQuery = 'SELECT * FROM ChallanInfo WHERE challanid = ?';;
        $cordovaSQLite.execute(DATABASE, CheckQuery, [$scope.FormValues.challansno]).then(function (checkres) {
            if (checkres.rows.length > 0) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error.',
                    template: 'Challan Number Already Exists'
                });

                return false;
            } else {

                var query = "INSERT INTO ChallanInfo (challanid ,vend_id,comp_id,c_date,d_date, tax,ship,discount,grandtotal,payment,status,term,paidamt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

                $cordovaSQLite.execute(DATABASE, query, [
                                                        $scope.FormValues.challansno,
                                                        $scope.Vendor.cid,
                                                        $scope.Company.id,
                                                        $scope.FormValues.datenew,
                                                        $scope.FormValues.datedue,
                                                        $scope.FormValues.Salestax,
                                                        $scope.FormValues.Shipping,
                                                        $scope.FormValues.Discount,
                                                        grandtotal,
                                                        $scope.FormValues.optionSelected,
                                                        $scope.FormValues.status,
                                                        $scope.FormValues.term,
                                                         $scope.FormValues.PaidAmt
                ])
                .then(function (res) {

                    //CREATE TABLE "SaleProducts" (saleid,pname,price,tax,nos,total)

                    var querySP = "INSERT INTO ChallanProducts ( challanid ,materialname ,price ,tax ,nos ,total ) VALUES (?,?,?,?,?,?)";
                    for (var i = 0; i < $scope.SelectedProducts.length; i++) {
                        $cordovaSQLite.execute(DATABASE, querySP, [

                                    $scope.FormValues.challansno,
                                    $scope.SelectedProducts[i].name,
                                    $scope.SelectedProducts[i].price,
                                    $scope.SelectedProducts[i].tax,
                                    $scope.SelectedProducts[i].Qty,
                                    $scope.SelectedProducts[i].total

                        ]).then(function (res) {
                            console.log("insertId: " + res.insertId);
                        }, function (err) {
                            console.error(err);
                        });

                    };
                    if ($scope.FormValues.optionSelected == "check") {
                        // BankInfo (id ,bank_name,name,accountno,checkno)
                        var query_bank = "INSERT INTO ChallanBankInfo (challanno, bank_name, name, accountno, checkno) VALUES (?,?,?,?,?)";

                        var str = $scope.FormValues.bankname;
                        var res = str.toUpperCase();

                        $cordovaSQLite.execute(DATABASE, query_bank, [
                                    $scope.FormValues.challansno,
                                    res,
                                    $scope.FormValues.name,
                                    $scope.FormValues.accountno,
                                    $scope.FormValues.checkno

                        ]).then(function (res) {
                            console.log("insertId: " + res.insertId);
                        }, function (err) {
                            console.error(err);
                        });
                    };
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Saved.',
                        template: 'Data Saved successfully'
                    });

                    $scope.Vendors = null;
                    $state.go('app.purchase_list', {}, {
                    });

                }, function (err) {
                    console.error(err);
                });

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
});

