angular.module('starter.controllers.rawmaterial', [])

  .controller('rawmaterial', function ($scope, $cordovaSQLite, DATABASE, SharedDataService, $stateParams, $ionicPopup, $ionicLoading, $state) {


    $scope.RawMaterial = new Object();
    $scope.CompaniesList = new Array();
    $scope.RawMaterialList = new Array();
    $scope.EditId = $stateParams.rawid;
    $scope.RawMaterials = SharedDataService.RawMaterial;
    /* Insert data in RawMaterial */
    $scope.Save = function (rawmaterialForm) {

      if (rawmaterialForm.$valid) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        if ($scope.RawMaterial.checkProducts) {
          $scope.RawMaterial.checkProducts = null;
          var stockValue = $scope.RawMaterial.openstock;
          $scope.RawMaterial.openstock = null;
          DATABASE.database().ref('rawmaterials')
            .push($scope.RawMaterial)
            .then(function (snap) {
              DATABASE.database().ref('stock').child('rawmaterials')
                .child(snap.key).set(stockValue);
              DATABASE.database().ref('products')
                .push($scope.RawMaterial).then(function (snapshot) {
                  DATABASE.database().ref('stock').child('products')
                    .child(snapshot.key).set(stockValue);
                });
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'Saved.',
                template: 'Data Saved successfully'
              });

              $scope.RawMaterial = null;
              $scope.RawMaterial = new Object();
              $state.go('app.material_list', {}, {
                reload: true
              });



            })
        } else {

          var stockValue = $scope.RawMaterial.openstock;
          $scope.RawMaterial.openstock = null;

          $scope.RawMaterial.checkProducts = null;
          DATABASE.database().ref('rawmaterials')
            .push($scope.RawMaterial)
            .then(function (snap) {
              debugger;
              DATABASE.database().ref('stock').child('rawmaterials')
                .child(snap.key).set(stockValue);
              console.log("fdfdfd");
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'Saved.',
                template: 'Data Saved successfully'
              });

              $scope.RawMaterial = null;
              $scope.RawMaterial = new Object();
              $state.go('app.material_list', {}, {
                reload: true
              });
            }).catch(function (er) {});
        }

      }
    };

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
        .orderByChild('raw').equalTo($stateParams.rawid)
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

    $scope.Select = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      debugger;
      $scope.RawMaterials = [];

      DATABASE.database().ref('rawmaterials').on('value', function (snap) {

        snap.forEach(function (s) {
          var a = new Object();
          a.mid = s.key;
          a.val = s.val();
          $scope.RawMaterials.push(a);

        }).then
        $ionicLoading.hide();

        SharedDataService.RawMaterial = $scope.RawMaterials;
      });
    }

    $scope.SelectCompany = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      debugger;


      DATABASE.database().ref('Company').on('value', function (snap) {

        snap.forEach(function (s) {
          var a = new Object();
          a.mid = s.key;
          a.val = s.val();
          $scope.CompaniesList.push(a);

        }).then
        $ionicLoading.hide();


      });
    }

    $scope.Selectid = function (mid) {

      $state.go('app.material_edit', {
        rawid: mid

      }, { //redirect to another page;

      });
    };



    $scope.DisplayData = function () {
      debugger;
      DATABASE.database().ref('rawmaterials')
        .child($stateParams.rawid).on('value',
          function (snapshot) {


            $scope.RawMaterial = snapshot.val();


          });



    }


    $scope.Delete = function (audi) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete...',
        template: 'Are you want to be Deleted?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          // var query = "DELETE FROM RawMaterial WHERE mid = ?";

          // $cordovaSQLite.execute(DATABASE, query, [mid])
          DATABASE.database().ref('rawmaterials').child(audi).remove().then(function (res) {

            console.log("Deleted");
            $state.go('app.material_list', {}, {
              reload: true
            });

          }, function (err) {
            console.error(err);
          });
        }
      })
    }






    $scope.Update = function (rawmaterialForm) {
      if (rawmaterialForm.$valid) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        DATABASE.database().ref('rawmaterials').child($stateParams.rawid)
          .set($scope.RawMaterial).then(function (e) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Updated.....',
              template: 'Data Updated successfully'
            });

            $state.go('app.material_list', {}, {

            });
          })


      }
    }





  });
