(function () {
    angular.module('starter').factory('InvoiceService', ['$q', InvoiceService]);
    var print_counter = [];
    function InvoiceService($q) {
        function createPdf(invoice) {
            return $q(function (resolve, reject) {
                var dd = createDocumentDefinition(invoice);
                var pdf = pdfMake.createPdf(dd).download();

                pdf.getBase64(function (output) {
                    resolve(base64ToUint8Array(output));
                });
            });
        }

        return {
            createPdf: createPdf
        };
    }

    function createDocumentDefinition(invoice) {
        var count = [];
     
        debugger;
        var items = invoice.Items.map(function (item) {
            return [item.Description, item.Tax, item.Quantity, item.Price, item.Total];
        });
        debugger;

        var dd = {
            content: [
                { text: 'Invoice No. : ' + invoice.invoice_no, style: 'header' },
                { text: invoice.Date, alignment: 'right' },
                { text: 'From', style: 'subheader' },
                invoice.AddressFrom.Name,
				invoice.AddressFrom.Address,
				invoice.AddressFrom.Contact,
				invoice.AddressFrom.Country,

                { text: 'To', style: 'subheader' },
                'Name			  : ' + invoice.AddressTo.Name,
                'Address	: ' + invoice.AddressTo.Address,
				'Contact	 : ' + invoice.AddressTo.Contact,
                'Country	 : ' + invoice.AddressTo.Country,

				//{ text: 'Payment', style: 'subheader' },
				//'Payment Mode	 : ' + invoice.AddressTo.Payment_Mode,
				//'Status	 : ' + invoice.AddressTo.Status,

                { text: 'Items', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        widths: ['*', '*', '*', 75, 75],
                        // widths: ['*', '*', 75, 75],
                        body: [
                            [
                                { text: 'Description', style: 'itemsTableHeader' },
                                { text: 'Tax (%)', style: 'itemsTableHeader' },
								{ text: 'Quantity', style: 'itemsTableHeader' },
                                { text: 'Price', style: 'itemsTableHeader' },
								{ text: 'Total', style: 'itemsTableHeader' },
                            ]
                        ].concat(items)
                    }
                },
                {
                    style: 'totalsTable',
                    table: {
                        widths: ['*', 75, 75],
                        body: [
                            [
                                '',
                                'Subtotal',
                                invoice.Subtotal,
                            ],

                            [
                                '',
                                'Shipping',
                                invoice.Shipping,
                            ],

							[
                                '',
                                'Discount',
                                invoice.Discount,
							],

							[
                                '',
                                'Sales Tax',
                                invoice.SalesTax,
							],

                            [
                                '',
                                'Grand Total',
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

    function base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
})();