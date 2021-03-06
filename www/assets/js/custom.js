    new Vue({

        el: '#invoice_create',
        data: {

            invoice_form: {

                invoice_from: {

                    name: '',
                    addr_line1: '',
                    addr_line2: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: '',
                    website: '',
                    email: ''

                },

                bill_to: {

                    name: '',
                    addr_line1: '',
                    addr_line2: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: '',
                    website: '',
                    email: ''

                },

                ship_to: {

                    name: '',
                    addr_line1: '',
                    addr_line2: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    phone: '',
                    website: '',
                    email: ''

                },

                //invoice_from: 'Your business details',
                imageSrc: '',
                invoice_title: '',
                invoice_summary: '',

                from_email: '',

                //bill_to_addr: '',
                //ship_to_addr: '',

                customer_name: '',
                customer_email: '',

                id: '',

                status_id: '',
                poso_number: '',

                invoice_date: moment().format('YYYY-MM-DD'),
                due_date: moment().add(15, 'days').format('YYYY-MM-DD'),

                //currency_id: '$',
                //company_currency_id: 840,

                items: [{
                    id: '',
                    open_id: '',
                    item_id: '',
                    name: '',
                    price: 0,
                    qty: 0,
                    disc: 0,
                    disc_amt: 0,
                    tax: 0,
                    tax_amt: 0,
                    total: 0,
                    total_with_tax: 0,
                    credit_gl: 0
                }],

                //tax_temp: [],
                tax_items: [],

                tax_rate1: 0,
                discount_rate1: 0,
                sub_total: 0,
                sub_total_with_tax: 0,
                tax_total: 0,
                disc_total: 0,
                amount_paid: 0,
                balance: 0,
                total_amount: 0,

                //currency_rate: 0,
                currency_id: '$',

                notes: '',
                footer: ''
            },

            converted_amount: 0,
            currency_code: '',
            diff_curr: false,

        },

        methods: {

            previewThumbnail: function (event) {
                var input = event.target;

                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    var vm = this;

                    reader.onload = function (e) {
                        vm.invoice_form.imageSrc = e.target.result;
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            },

            addLine: function () {
                this.invoice_form.items.push({
                    id: '',
                    name: '',
                    price: 0,
                    qty: 0,
                    disc: 0,
                    disc_amt: 0,
                    tax: 0,
                    tax_amt: 0,
                    total: 0,
                    credit_gl: 0
                });
            },

            removeLine: function (items, index) {

                this.invoice_form.items.splice(index, 1);

            }

        },

        computed: {

            invoiceDate: function () {
              
                return moment(this.invoice_form.invoice_date).format('dddd, MMMM DD YYYY');
                
            },
            dueDate: function () {
            
                return moment(this.invoice_form.due_date).format('dddd, MMMM DD YYYY');
                
            },
            
            discTotal: function () {

                this.invoice_form.disc_total = this.invoice_form.items.reduce(function (carry, item) {
                    var disc_total = carry + (item.qty * item.price * item.disc / 100);
                    return parseFloat(disc_total.toFixed(2));
                }, 0);

                return this.invoice_form.disc_total.toFixed(2);

            },

            subTotal: function () {

                this.invoice_form.sub_total = this.invoice_form.items.reduce(function (carry, item) {
                    var sub_total = carry + (item.qty * item.price) * (1 - item.disc / 100);
                    return parseFloat(sub_total.toFixed(2));
                }, 0);

                return this.invoice_form.sub_total.toFixed(2);

            },


            taxTotal: function () {

                this.invoice_form.tax_total = this.invoice_form.items.reduce(function (carry, item) {
                    var tax_total = carry + (((item.qty * item.price) * (1 - item.disc / 100)) * item.tax / 100);
                    return parseFloat(tax_total.toFixed(2));
                }, 0);

                return this.invoice_form.tax_total.toFixed(2);

            },


            totalAmount: function () {

                this.invoice_form.total_amount = this.invoice_form.sub_total + this.invoice_form.tax_total;

                return this.invoice_form.total_amount.toFixed(2);

            },

            discountAmount: function () {


                this.invoice_form.discount_amount = ( parseFloat(this.invoice_form.sub_total) * parseFloat(this.invoice_form.discount_rate1) / 100 );
                return this.invoice_form.discount_amount.toFixed(2);

            }

        }
    })