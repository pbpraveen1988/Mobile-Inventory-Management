app.controller("ReportsCtrl", function ($scope, $cordovaSQLite,DATABASE) {
    var salecount = 0;
    var purchasecount = 0;

    $scope.List = function ()
    {
        
        var query = "SELECT * FROM SaleInfo ";
        debugger;
        $cordovaSQLite.execute(DATABASE, query).then(function (res) {
            debugger;
            salecount = res.rows.length;
            
        }, function (err) {
            console.error(err);
        });

        $cordovaSQLite.execute(DATABASE, 'SELECT * FROM ChallanInfo').then(function (res) {
            debugger;
            purchasecount = res.rows.length;
            $scope.labels = ["Sales Count", "Purchase Count"];
            $scope.data = [salecount, purchasecount];

        }, function (err) {
            console.error(err);
        });


    }

  
});