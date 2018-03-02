    (function () {
        var
            form = $('#piInvoice_pdf'),
            cache_width = form.width(),
            a4 = [595.28, 841.89];  // for a4 size paper width and height
        //alert(cache_width);
        $('#create_pdf').on('click', function () {
            //$('#create_pdf').hide();
            $('body').scrollTop(0);
            createPDF();
            // $('#create_pdf').hide();
        });
        //create pdf
        function createPDF() {
            getCanvas().then(function (canvas) {
            
                //canvas.scale = 2;
                //canvas.dpi = 144;
                
                var
                    img = canvas.toDataURL("image/png"),
                    doc = new jsPDF({
                        unit: 'px',
                        format: 'a4'
                    });
                doc.addImage(img, 'PNG', 24, 60);
                doc.save('invoice1.pdf');
                form.width(cache_width);
                var pdfOutput = doc.output();
                
                
                
            });
        }

        // create canvas object
        function getCanvas() {
            form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
            return html2canvas(form, {
                imageTimeout: 2000,
                removeContainer: true
            });
            
        }

    }());
