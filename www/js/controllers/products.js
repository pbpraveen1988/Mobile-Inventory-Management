angular.module('starter.controllers.products', [])

  .controller('products', function ($scope, $cordovaSQLite, SharedDataService, DATABASE, $stateParams, $ionicPopup, $ionicLoading, $state) {

    $scope.products = SharedDataService.product;
    $scope.Product = new Object();
    $scope.Products = new Object();
    $scope.ProductslList = new Array();
    $scope.EditId = $stateParams.productid;
    /*	New Code	*/
    //	Table
    //	"INSERT INTO ProductsMaster (pname, pprice, pdescription, vat) VALUES (?,?,?,?)";


    $scope.CompaniesListWithStock = [];
    $scope.ShowStock = function () {
      debugger;
      $scope.CompaniesListWithStock = [];
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      DATABASE.database().ref("stock")
        .orderByChild('product').equalTo($stateParams.productid)
        .on("value", function (snap) {
          debugger;
          snap.forEach(function (snapshot) {
            var CompanyObject = snapshot.val();
            DATABASE.database().ref("Company").child(snapshot.val().company)
              .on('value', function (companyName) {
                CompanyObject.companyName = companyName.val().name;
                $scope.CompaniesListWithStock.push(CompanyObject);
                debugger;
              });
            $ionicLoading.hide();
          });
          $ionicLoading.hide();
          debugger;
        });
    }





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
      $scope.products = [];

      DATABASE.database().ref('products').on('value', function (snap) {
        $scope.products = [];
        snap.forEach(function (s) {
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
    // $scope.Save = function (productsForm) {
    // if (productsForm.$valid) {
    // $ionicLoading.show({
    // content: 'Loading',
    // animation: 'fade-in',
    // showBackdrop: true,
    // maxWidth: 200,
    // showDelay: 0
    // });
    // debugger;

    // var StockValue = $scope.Products.openstock;
    // $scope.Products.openstock = null;

    // DATABASE.database().ref('products')
    // .push($scope.Products).then(function (res) {

    // DATABASE.database().ref('stock').child('products').child(res.key).set(StockValue);
    // $ionicLoading.hide();
    // $ionicPopup.alert({
    // title: 'Saved.',
    // template: 'Data Saved successfully'
    // });

    // $scope.Products = new Object();
    // $state.go('app.product_list', {}, {

    // });

    // }, function (err) {
    // console.error(err);
    // });
    // }
    // };
    /*End Save Button.*/
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

        var StockValue = $scope.Products.openingstock;
        $scope.Products.openingstock = null;

        DATABASE.database().ref('products')
          .push($scope.Products)
          .then(function (res) {
            debugger;
            var newobje = new Object();
            newobje.product = res.key;
            newobje.stock = StockValue;
            newobje.company = $scope.Products.companyName
            $scope.newobject = newobje;
            debugger;
            DATABASE.database().ref('stock').push($scope.newobject);

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
              $state.go('app.product_list', {}, {
                reload: true
              });

            }, function (err) {
              console.error(err);
            });
        }
      })
    };
    $scope.LoadCompanylist = function () {
      // alert($scope.data.Company) this will show true or false means this model is selected or not

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
      DATABASE.database().ref('Company').on('value', function (snap) {
        snap.forEach(function (s) {
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
    /*End Delete Button.*/

    /*Start Selection Button*/

    $scope.Selectid = function (pid) {
      debugger;
      $state.go('app.product_edit', {
        productid: pid

      }, { //redirect to another page;

      });
    };
    /*End Selection Button*/

    /*Start Edit Button*/
    $scope.Edit = function () {
      DATABASE.database().ref('products').child($stateParams.productid).on('value', function (snapshot) {
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
          .set($scope.Products).then(function (e) {
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
