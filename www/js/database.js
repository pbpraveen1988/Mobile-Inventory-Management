app.factory('DATABASE', function () {
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjGmmJzh_ehu75neQh6GBbXOasxYhEM3w",
    authDomain: "inventory-8bd80.firebaseapp.com",
    databaseURL: "https://inventory-8bd80.firebaseio.com",
    storageBucket: "inventory-8bd80.appspot.com",
    messagingSenderId: "922940935912"
  };
  firebase.initializeApp(config);
  return firebase;
  });




















// /// <reference path="linq.min.js" />
// var db = null;

// app.factory('DATABASE', function ($ionicPlatform, $cordovaSQLite, deviceReady) {
    // $ionicPlatform.ready(function () {
        // deviceReady(function () {
            // $ionicPlatform.ready(function () {
                // if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {

                    // db = $cordovaSQLite.openDB({ name: 'inventory1.db', location: 0 });
                // } else if (ionic.Platform.isWebView) {
                    // //db = window.openDatabase("newone.db", "1.0", "My app", -1);
                 // db = window.openDatabase("newprab.db", "1.0", "My app", 1024 * 1024 * 100);
     // k           }

                // User Table
                // $cordovaSQLite.execute(db, 'CREATE TABLE "User" ("uid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "username" VARCHAR, "upwd" VARCHAR)');

                // RAW MATERIAL TABLE
                // $cordovaSQLite.execute(db, 'CREATE TABLE "RawMaterial" ("mid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "mname" VARCHAR, "mtype" VARCHAR,"mprice" FLOAT, "mdescription" TEXT, "vat" FLOAT)');

                // ProductsMaster TABLE
                // $cordovaSQLite.execute(db, 'CREATE TABLE "ProductsMaster" ("pid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "pname" VARCHAR, "pprice" FLOAT, "pdescription" TEXT, "vat" FLOAT)');


                // VendorMaster TABLE
                //$cordovaSQLite.execute(db, 'DROP TABLE VenderMaster');
                //$cordovaSQLite.execute(db, 'CREATE TABLE "VenderMaster" ("vid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "vname" VARCHAR, "vcontact" VARCHAR, "vaddress" TEXT, "openbalance" FLOAT)');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "VenderMaster" ("cid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "cname" VARCHAR, "caddress" TEXT, "ccity" VARCHAR, "cstate" VARCHAR, "ccontact" VARCHAR, "cpincode" VARCHAR, "cemail" VARCHAR, "openbalance" FLOAT)');

                // CustomerMaster TABLE
                // $cordovaSQLite.execute(db, 'CREATE TABLE "CustomerMaster" ("cid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "cname" VARCHAR, "caddress" TEXT, "ccity" VARCHAR, "cstate" VARCHAR, "ccontact" VARCHAR, "cpincode" VARCHAR, "cemail" VARCHAR)');

                //$cordovaSQLite.execute(db, 'DROP TABLE ChallanMaster');

                // ChallanMaster TABLE
                // $cordovaSQLite.execute(db, 'CREATE TABLE "ChallanMaster" ("challanid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL, "challanno" INTEGER, "vendorname" VARCHAR, "materialname" VARCHAR,"price" FLOAT, "nos" NUMERIC, "total" FLOAT, "created_date" DATETIME )');

                //$cordovaSQLite.execute(db, 'DROP TABLE SellTable');
                //SellTable
                // $cordovaSQLite.execute(db, 'CREATE TABLE "SellTable" ("sid" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "invoiceid" TEXT, "customername" VARCHAR, "productname" VARCHAR, "price" TEXT, "nos" TEXT, "total" TEXT, "sdate" TEXT)');

                //CompanyInfo
                //$cordovaSQLite.execute(db, 'DROP TABLE CompanyInfo');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "CompanyInfo" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "tin" VARCHAR NOT NULL  , "name" VARCHAR, "address" VARCHAR, "city" VARCHAR, "contact" VARCHAR, "state" VARCHAR, "pin" INTEGER, "email" VARCHAR,"logo" VARCHAR)');

                // SaleInfo
                //$cordovaSQLite.execute(db, 'DROP TABLE ChallanInfo');
             //  $cordovaSQLite.execute(db, 'DROP TABLE SaleInfo');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "SaleInfo" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "saleid" INTEGER, "cust_id" INTEGER, "comp_id" INTEGER, "c_date" DATETIME, "d_date" DATETIME, "salestax" FLOAT, "ship" FLOAT, "discount" FLOAT, "grandtotal" FLOAT, "payment" VARCHAR, "status" VARCHAR, "term" VARCHAR,"paidamt" FLOAT)');


                //SaleProduct
                //$cordovaSQLite.execute(db, 'DROP TABLE SaleProducts');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "SaleProducts" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "saleid" INTEGER NOT NULL , "pname" VARCHAR, "price" FLOAT, "tax" FLOAT, "nos" INTEGER, "total" FLOAT)');

                //ChallanInfo
                //$cordovaSQLite.execute(db, 'DROP TABLE ChallanInfo');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "ChallanInfo" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "challanid" INTEGER, "vend_id" INTEGER, "comp_id" INTEGER, "c_date" DATETIME, "d_date" DATETIME, "tax" FLOAT, "ship" FLOAT, "discount" FLOAT, "grandtotal" FLOAT, "payment" VARCHAR, "status" VARCHAR, "term" VARCHAR,"paidamt" FLOAT)');

                //ChallanProducts
                //$cordovaSQLite.execute(db, 'DROP TABLE ChallanProducts');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "ChallanProducts" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "challanid" INTEGER NOT NULL , "materialname" VARCHAR, "price" FLOAT, "tax" FLOAT, "nos" INTEGER, "total" FLOAT)');

                // BankDetails
                // $cordovaSQLite.execute(db, 'CREATE TABLE "InvoiceBankInfo" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,"invoiceno", "bank_name" VARCHAR, "name" VARCHAR, "accountno" VARCHAR, "checkno" VARCHAR)');
                // $cordovaSQLite.execute(db, 'CREATE TABLE "ChallanBankInfo" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,"challanno", "bank_name" VARCHAR, "name" VARCHAR, "accountno" VARCHAR, "checkno" VARCHAR)');
				
				// $cordovaSQLite.execute(db,'CREATE  TABLE  "SaleShippingAddress" ("Id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "ShippingName" VARCHAR, "ShippingAddress" VARCHAR, "ShippingDate"  DATETIME, "LRNumber" VARCHAR, "Transport" VARCHAR, "challanid" INTEGER)');
					
            // });
        // });
    // });
    // return db
// });