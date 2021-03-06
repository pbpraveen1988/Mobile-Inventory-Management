angular.module('starter.controllers.Account', [])

  .controller('AccountController', function ($scope, $state, $ionicPopup, $ionicModal, $ionicLoading, DATABASE) {
    $scope.User = new Object();
    // $scope.User.email = 'abhishek';
    $scope.data = new Object();
    $scope.signIn = function (form) {
      if ($scope.User.email == '' || $scope.User.email == undefined) {

        $ionicPopup.alert({
          title: 'Error.',
          template: "Please enter email"
        });
        return false;
      }

      if ($scope.User.Password == '' || $scope.User.Password == undefined) {

        $ionicPopup.alert({
          title: 'Error',
          template: "Please enter password"
        });
        return false;
      }

      // if($scope.data.email == 'suraj' && $scope.User.Password == 'suraj')

      //  $state.go('app.playlists', {}, { reload: true });
      // }else 
      //{/

      //$ionicPopup.alert({
      //title: 'Alert',
      //template: 'Invalid Credentials'
      //    });
      //};


      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      var pp = $scope.User.email;
      var pwd = $scope.User.Password;

      DATABASE.auth().signInWithemailAndPassword($scope.User.email, $scope.User.Password)
        .then(function (authData) {


          if (authData.emailVerified) {
            DATABASE.database().ref().child("users").child(authData.uid)
              .on('value', function (snapshot) {

                var val = snapshot.val();

                $scope.User = val;
                debugger;
                $ionicLoading.hide();
                $state.go('app.list', {}, {
                  reload: true
                });

              });

          } else {
            $ionicPopup.alert({
              title: 'Invalid',
              template: 'Please Activate your Account, we sent an email to You'
            });
            $ionicLoading.hide();
            return false;
          }
        }).catch(function (error) {
          $ionicPopup.alert({
            title: 'Invalid',
            template: error.message
          });
          $ionicLoading.hide();
          return false;
        });

    }
    // $scope.signIn = function(form)
    // {

    // $ionicLoading.show({
    // content: 'Loading',
    // animation: 'fade-in',
    // showBackdrop: true,
    // maxWidth: 200,
    // showDelay: 0
    // });



    // DATABASE.auth().createUserWithemailAndPassword($scope.data.email, $scope.User.Password)
    // .then(function (userData) {

    // DATABASE.database().ref().child("users").child(userData.uid).set({
    // firstname: $scope.data.firstname,
    // lastname: $scope.data.lastname
    // });

    // DATABASE.auth().currentUser.sendemailVerification();

    // $ionicLoading.hide();
    // alert("User created successfully! Please Login");
    // $scope.data.email = '';
    // $scope.User.Password = '';
    // $scope.data.firstname = '';
    // $scope.data.lastname = '';
    // $state.go("loginmain",{});
    // }).catch(function (error) {
    // alert("Error: " + error);
    // $ionicLoading.hide();
    // })
    // // if(form.email.$modelValue == "" && form.password.$modelValue == undefiend)
    // // {
    // // $state.go('app.list');
    // // }else
    // // {
    // // $ionicPopup.alert({
    // // title: 'Alert',
    // // template: 'Please Check the Credentails'
    // // });

    // // }
    // // }
    // // }

    // }


    $scope.register = function () {
      debugger;

      if ($scope.data.firstname == '' || $scope.data.firstname == undefined) {

        $ionicPopup.alert({
          title: 'Error.',
          template: "Please enter first Name"
        });
        return false;
      }

      if ($scope.data.lastname == '' || $scope.data.lastname == undefined) {

        $ionicPopup.alert({
          title: 'Error',
          template: "Please enter Last Name"
        });
        return false;
      }
      if ($scope.data.email == '' || $scope.data.email == undefined) {

        $ionicPopup.alert({
          title: 'Error',
          template: "Please enter Valid email Address"
        });
        return false;
      }
      if ($scope.data.password == '' || $scope.data.password == undefined) {

        $ionicPopup.alert({
          title: 'Error',
          template: "Please enter Valid Password"
        });
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

      DATABASE.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password)
        .then(function (userData) {
          debugger;
          DATABASE.database().ref().child("users").child(userData.uid).set({
            firstname: $scope.data.firstname,
            lastname: $scope.data.lastname
          });

          DATABASE.auth().currentUser.sendEmailVerification();

          $ionicLoading.hide();
          alert("User created successfully! Please Login");
          $scope.data.email = '';
          $scope.User.Password = '';
          $scope.data.firstname = '';
          $scope.data.lastname = '';
          $state.go("login", {});
        }).catch(function (error) {
          alert("Error: " + error);
          $ionicLoading.hide();
        })






    }


    $scope.forgetpassword = function () {
      debugger;
      if ($scope.data.email == '' || $scope.data.email == undefined) {

        $ionicPopup.alert({
          title: 'Error.',
          template: "Please enter Email"
        });
        return false;
      }
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      DATABASE.auth().sendPasswordResetEmail($scope.data.email)
        .then(function () {

          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Success',
            template: 'Kindly! Check the Email '
          });
       
        }).catch(function (err) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Error',
            template: 'Invalid Email'
          });

        });

    }


    $scope.signIn = function (form) {
      if ($scope.User.email == '' || $scope.User.email == undefined) {

        $ionicPopup.alert({
          title: 'Error.',
          template: "Please enter Email"
        });
        return false;
      }

      if ($scope.User.Password == '' || $scope.User.Password == undefined) {

        $ionicPopup.alert({
          title: 'Error',
          template: "Please enter password"
        });
        return false;
      }




      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      var pp = $scope.User.email;
      var pwd = $scope.User.Password;

      DATABASE.auth().signInWithEmailAndPassword($scope.User.email, $scope.User.Password)
        .then(function (authData) {


          if (authData.emailVerified) {
            DATABASE.database().ref().child("users").child(authData.uid)
              .on('value', function (snapshot) {

                var val = snapshot.val();
                $scope.User = val;
                debugger;
                $ionicLoading.hide();
                $state.go('app.list', {}, {
                  reload: true
                });

              });

          } else {
            $ionicPopup.alert({
              title: 'Invalid',
              template: 'Please Activate your Account, we sent an Email to You'
            });
            $ionicLoading.hide();
            return false;
          }
        }).catch(function (error) {
          $ionicPopup.alert({
            title: 'Invalid',
            template: error.message
          });
          $ionicLoading.hide();
          return false;
        });

    }
    $scope.logout = function () {


      DATABASE.auth().signOut().then(function (evt) {
        $scope.User.email = '';
        $scope.User.password = '';
        $scope.data.firstname = '';
        $scope.data.lastname = '';
        $state.transitionTo('login', $state.$current.params, {
          reload: true
        });
      });

    }

  });
