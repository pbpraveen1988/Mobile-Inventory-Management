
var app = angular.module('starter',
						 ['ionic', 'pdf',  'ionic-modal-select',
						 'starter.controllers.rawmaterial',
						 'starter.controllers.Account',
						 'starter.controllers.vendors',
						 'starter.controllers.products',
						 'starter.controllers.customers',
						 'starter.controllers.challans',
						 'starter.controllers.invoices',
						 'starter.controllers.company',
						 'starter.controllers.Purchase',
                         'starter.controllers.Sale','chart.js',
						'ngCordova', 'ngMessages']
						);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

app.factory('deviceReady', function () {
    return function (done) {
        if (typeof window.cordova === 'object') {
            document.addEventListener('deviceready', function () {
                done();
            }, false);
        } else {
            done();
        }
    };
});

app.factory('InvoiceService', ['$q', InvoiceService]);
app.factory('InvoiceSaleService', ['$q', InvoiceSaleService]);

function InvoiceSaleService($q) {
    function createPdf(invoice) {
        return $q(function (resolve, reject) {
            var dd = createDocumentDefinitionForSale(invoice);
            debugger;
            var pdf = pdfMake.createPdf(dd);

             pdf.getBase64(function (output) {
				 debugger;
                resolve(base64ToUint8Array(output));
				debugger;
            });
            debugger;
        });
    }

    return {
        createPdf: createPdf
    };
}

function InvoiceService($q) {
    function createPdf(invoice) {
        return $q(function (resolve, reject) {
            var dd = createDocumentDefinition(invoice);
            debugger;
            var pdf = pdfMake.createPdf(dd);

            pdf.getBase64(function (output) {
                debugger;
                resolve(base64ToUint8Array(output));
                debugger;
            });
            debugger;
        });
    }

    return {
        createPdf: createPdf
    };
}


function base64ToUint8Array(base64) {
    var raw = atob(base64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
}

function createDocumentDefinition(invoice) {
    debugger;
    var items = invoice.Items.map(function (item) {
        return [item.Description, item.Quantity, item.Price, item.Tax, item.Total];
    });
    debugger;

    if (invoice.AddressFrom.Image == null || invoice.AddressFrom.Image == undefined || invoice.AddressFrom.Image == '') {
        var dd = {

            content: [

                { text: 'INVOICE', style: 'header' },
                { text: invoice.InvoiceNumber, alignment: 'right' },
                { text: invoice.Date, alignment: 'right' },
                { text: 'From', style: 'subheader' },
                invoice.AddressFrom.Name,
                invoice.AddressFrom.Address,
                invoice.AddressFrom.City,
                invoice.AddressFrom.State,
                invoice.AddressFrom.PinCode,

                { text: 'To', style: 'subheader' },
                invoice.AddressTo.Name,
                invoice.AddressTo.Address,
                invoice.AddressTo.City,
                invoice.AddressTo.State,
                invoice.AddressTo.PinCode,

				


                { text: 'Items', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        widths: ['*', 75, 75, 75, 75],
                        body: [
                            [
                                { text: 'Description', style: 'itemsTableHeader' },
                                { text: 'Quantity', style: 'itemsTableHeader' },
                                { text: 'Price', style: 'itemsTableHeader' },
                                { text: 'Tax(%)', style: 'itemsTableHeader' },
                                { text: 'Total', style: 'itemsTableHeader' }
                            ]
                        ].concat(items)
                    }
                },
                {
                    style: 'totalsTable',
                    table: {
                        widths: ['*', 75, 75, 75, 75],
                        body: [
                            [
                                '',
                                '',
                                '',
                                'Subtotal',
                                invoice.Subtotal,
                            ],
                            [
                                '',
                                 '',
                                '',
                                'Shipping',
                                invoice.Shipping,
                            ],
                              [
                                '',
                                 '',
                                '',
                                'Discount',
                                invoice.Discount,
                              ],
                                [
                                '',
                                 '',
                                '',
                                'Sales Tax(%)',
                                invoice.Tax,
                                ],
                            [
                                '',
                                 '',
                                '',
                                'Total',
                                invoice.Total,
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'right'
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 20, 0, 5]
                },
                itemsTable: {
                    margin: [0, 5, 0, 15]
                },
                itemsTableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                totalsTable: {
                    bold: true,
                    margin: [0, 30, 0, 0]
                }
            },
            defaultStyle: {
            }
        }
        return dd;
    }



    var ddimage = {

        content: [

            { text: 'INVOICE', style: 'header' },
            { text: invoice.InvoiceNumber, alignment: 'right' },
            { text: invoice.Date, alignment: 'right' },
            { text: 'From', style: 'subheader' },
           {
               image: invoice.AddressFrom.Image,
               width: 50,
               height: 50
           },
            invoice.AddressFrom.Name,
            invoice.AddressFrom.Address,
            invoice.AddressFrom.City,
            invoice.AddressFrom.State,
            invoice.AddressFrom.PinCode,

            { text: 'To', style: 'subheader' },
            invoice.AddressTo.Name,
            invoice.AddressTo.Address,
            invoice.AddressTo.City,
            invoice.AddressTo.State,
            invoice.AddressTo.PinCode,

			 { text: 'Shipping', style: 'subheader' },
                invoice.ShippingData.Name,
                invoice.ShippingData.Address,
                invoice.ShippingData.LRNumber,
                invoice.ShippingData.Transport,


            { text: 'Items', style: 'subheader' },
            {
                style: 'itemsTable',
                table: {
                    widths: ['*', 75, 75, 75, 75],
                    body: [
                        [
                            { text: 'Description', style: 'itemsTableHeader' },
                            { text: 'Quantity', style: 'itemsTableHeader' },
                            { text: 'Price', style: 'itemsTableHeader' },
                            { text: 'Tax(%)', style: 'itemsTableHeader' },
                            { text: 'Total', style: 'itemsTableHeader' }
                        ]
                    ].concat(items)
                }
            },
            {
                style: 'totalsTable',
                table: {
                    widths: ['*', 75, 75, 75, 75],
                    body: [
                        [
                            '',
                            '',
                            '',
                            'Subtotal',
                            invoice.Subtotal,
                        ],
                        [
                            '',
                             '',
                            '',
                            'Shipping',
                            invoice.Shipping,
                        ],
                          [
                            '',
                             '',
                            '',
                            'Discount',
                            invoice.Discount,
                          ],
                            [
                            '',
                             '',
                            '',
                            'Sales Tax(%)',
                            invoice.Tax,
                            ],
                        [
                            '',
                             '',
                            '',
                            'Total',
                            invoice.Total,
                        ]
                    ]
                },
                layout: 'noBorders'
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
        }
    }

    return ddimage;
}




function createDocumentDefinitionForSale(invoice) {
    debugger;
    var items = invoice.Items.map(function (item) {
        return [item.Description, item.Quantity, item.Price, item.Tax, item.Total];
    });
    debugger;

    if (invoice.AddressFrom.Image == null || invoice.AddressFrom.Image == undefined || invoice.AddressFrom.Image == '')
    {
        var dd = {

            content: [

                { text: 'INVOICE', style: 'header' },
                { text: invoice.InvoiceNumber, alignment: 'right' },
                { text: invoice.Date, alignment: 'right' },
                { text: 'From', style: 'subheader' },
                invoice.AddressFrom.Name,
                invoice.AddressFrom.Address,
                invoice.AddressFrom.City,
                invoice.AddressFrom.State,
                invoice.AddressFrom.PinCode,

                { text: 'To', style: 'subheader' },
                invoice.AddressTo.Name,
                invoice.AddressTo.Address,
                invoice.AddressTo.City,
                invoice.AddressTo.State,
                invoice.AddressTo.PinCode,
				
				 { text: 'Shipping', style: 'subheader' },
                invoice.ShippingData.Name,
                invoice.ShippingData.Address,
                invoice.ShippingData.LRNumber,
                invoice.ShippingData.Transport,
                		
				

                { text: 'Items', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        widths: ['*', 75, 75, 75, 75],
                        body: [
                            [
                                { text: 'Description', style: 'itemsTableHeader' },
                                { text: 'Quantity', style: 'itemsTableHeader' },
                                { text: 'Price', style: 'itemsTableHeader' },
                                { text: 'Tax(%)', style: 'itemsTableHeader' },
                                { text: 'Total', style: 'itemsTableHeader' }
                            ]
                        ].concat(items)
                    }
                },
                {
                    style: 'totalsTable',
                    table: {
                        widths: ['*', 75, 75, 75, 75],
                        body: [
                            [
                                '',
                                '',
                                '',
                                'Subtotal',
                                invoice.Subtotal,
                            ],
                            [
                                '',
                                 '',
                                '',
                                'Shipping',
                                invoice.Shipping,
                            ],
                              [
                                '',
                                 '',
                                '',
                                'Discount',
                                invoice.Discount,
                              ],
                                [
                                '',
                                 '',
                                '',
                                'Sales Tax(%)',
                                invoice.Tax,
                                ],
                            [
                                '',
                                 '',
                                '',
                                'Total',
                                invoice.Total,
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'right'
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 20, 0, 5]
                },
                itemsTable: {
                    margin: [0, 5, 0, 15]
                },
                itemsTableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                totalsTable: {
                    bold: true,
                    margin: [0, 30, 0, 0]
                }
            },
            defaultStyle: {
            }
        }
        return dd;
    }



    var ddimage = {

        content: [
             
            { text: 'INVOICE', style: 'header' },
            { text:  invoice.InvoiceNumber, alignment: 'right' },
            { text: invoice.Date, alignment: 'right' },
            { text: 'From', style: 'subheader' },
           {
               image: invoice.AddressFrom.Image,
               width: 50,
               height: 50
           },
            invoice.AddressFrom.Name,
            invoice.AddressFrom.Address,
            invoice.AddressFrom.City,
            invoice.AddressFrom.State,
            invoice.AddressFrom.PinCode,

            { text: 'To', style: 'subheader' },
            invoice.AddressTo.Name,
            invoice.AddressTo.Address,
            invoice.AddressTo.City,
            invoice.AddressTo.State,
            invoice.AddressTo.PinCode,
			
			 { text: 'Shipping', style: 'subheader' },
                invoice.ShippingData.Name,
                invoice.ShippingData.Address,
                invoice.ShippingData.LRNumber,
                invoice.ShippingData.Transport,
                		

            { text: 'Items', style: 'subheader' },
            {
                style: 'itemsTable',
                table: {
                    widths: ['*', 75, 75, 75, 75],
                    body: [
                        [
                            { text: 'Description', style: 'itemsTableHeader' },
                            { text: 'Quantity', style: 'itemsTableHeader' },
                            { text: 'Price', style: 'itemsTableHeader' },
                            { text: 'Tax(%)', style: 'itemsTableHeader' },
                            { text: 'Total', style: 'itemsTableHeader' }
                        ]
                    ].concat(items)
                }
            },
            {
                style: 'totalsTable',
                table: {
                    widths: ['*', 75, 75, 75, 75],
                    body: [
                        [
                            '',
                            '',
                            '',
                            'Subtotal',
                            invoice.Subtotal,
                        ],
                        [
                            '',
                             '',
                            '',
                            'Shipping',
                            invoice.Shipping,
                        ],
                          [
                            '',
                             '',
                            '',
                            'Discount',
                            invoice.Discount,
                          ],
                            [
                            '',
                             '',
                            '',
                            'Sales Tax(%)',
                            invoice.Tax,
                            ],
                        [
                            '',
                             '',
                            '',
                            'Total',
                            invoice.Total,
                        ]
                    ]
                },
                layout: 'noBorders'
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
        }
    }

    return ddimage;
}
