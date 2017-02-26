app.config(function ($stateProvider,
   $urlRouterProvider) {
    $stateProvider

  .state('app', { url: "/app", cache: false,abstract: true, templateUrl: "templates/sidemenu.html", controller: 'AccountController' })

  //login
  .state('login', { url: '/login', templateUrl: 'templates/login.html', controller: 'AccountController', cache: false })
  .state('app.list', { url: '/list', cache: false, views: { 'menuContent': { templateUrl: 'templates/list.html' } } })
  .state('registration', { url: '/registration', templateUrl: 'templates/registration.html', controller: 'AccountController', cache: false })
  .state('forgetpassword', { url: '/forgetpassword', templateUrl: 'templates/forgetpassword.html', controller: 'AccountController', cache: false })
  //Raw Material

  .state('app.material_list', { url: '/material_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/raw_material/list.html' } } })
  .state('app.material_details', { url: '/material_details/:rawid', cache: false, views: { 'menuContent': { templateUrl: 'templates/raw_material/details.html' } } })
  .state('app.material_add', { url: '/material_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/raw_material/add.html' } } })
  .state('app.material_edit', { url: '/material_edit/:rawid', cache: false, views: { 'menuContent': { templateUrl: 'templates/raw_material/edit.html' } } })

  //finished goods

  .state('app.product_list', { url: '/product_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/product/list.html' } } })
  .state('app.product_add', { url: '/product_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/product/add.html' } } })
  .state('app.product_edit', { url: '/product_edit/:productid', cache: false, views: { 'menuContent': { templateUrl: 'templates/product/edit.html' } } })
  .state('app.product_details', { url: '/product_details/:productid', cache: false, views: { 'menuContent': { templateUrl: 'templates/product/details.html' } } })

  //Cusomters
  .state('app.customer_list', { url: '/customer_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/customer/list.html' } } })
  .state('app.customer_add', { url: '/customer_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/customer/add.html' } } })
  .state('app.customer_edit', { url: '/customer_edit/:customerid', cache: false, views: { 'menuContent': { templateUrl: 'templates/customer/edit.html' } } })
  .state('app.customer_details', { url: '/customer_details/:customerid', cache: false, views: { 'menuContent': { templateUrl: 'templates/customer/details.html' } } })

  //company
  .state('app.company_list', { url: '/company_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/company/list.html' } } })
  .state('app.company_add', { url: '/company_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/company/add.html' } } })
  .state('app.company_edit', { url: '/company_edit/:cmpid', cache: false, views: { 'menuContent': { templateUrl: 'templates/company/edit.html' } } })
  .state('app.company_details', { url: '/company_details/:cmpid', cache: false, views: { 'menuContent': { templateUrl: 'templates/company/details.html' } } })

  //vendor
  .state('app.vender_list', { url: '/vender_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/vender/list.html' } } })
  .state('app.vender_add', { url: '/vender_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/vender/add.html' } } })
  .state('app.vender_edit', { url: '/vender_edit/:vendorid', cache: false, views: { 'menuContent': { templateUrl: 'templates/vender/edit.html' } } })
  .state('app.vender_details', { url: '/vender_details/:vendorid', cache: false, views: { 'menuContent': { templateUrl: 'templates/vender/details.html' } } })

  //purchase
   .state('app.purchase_list', { url: '/purchase_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/purchase/list.html' } } })
   .state('app.purchase_add', { url: '/purchase_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/purchase/add.html' } } })
   .state('app.purchase_ListofTransaction', { url: '/purchase_ListofTransaction/:Companyid/:Vendorid/:Productid', cache: false, views: { 'menuContent': { templateUrl: 'templates/purchase/ListofTransaction.html' } } })
  // stock
   .state('app.stock_list', { url: '/stock_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/stock/list.html' } } })
  //sale
   .state('app.sale', { url: '/sale_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/sale/list.html' } } })
   .state('app.sales', { url: '/sales_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/sale/add.html' } } })
   
       //.state('app.tab', { url: "/tab",  views: { 'menuContent': { templateUrl: "templates/tab.html" } } })
        //reports
        .state('app.reports', {
            url: '/reports', cache: false, views: {
                'menuContent': {
                    templateUrl: 'templates/reports/report.html',
                    view: { 'sale': { templateUrl: 'templates/reports/salehtml.html' } }
                }
            }
        })



  //sale
   .state('app.sale_list', { url: '/sale_list', cache: false, views: { 'menuContent': { templateUrl: 'templates/sale/list.html' } } })
   .state('app.sale_add', { url: '/sale_add', cache: false, views: { 'menuContent': { templateUrl: 'templates/sale/add.html' } } })



    $urlRouterProvider.otherwise('/login');
});