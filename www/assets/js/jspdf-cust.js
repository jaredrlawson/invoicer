output = function (type, options) {
            var undef, data, length, array, i, blob;
            switch (type) {
            case undef:
                return buildDocument();
            case 'save':
                if (navigator.getUserMedia) {
                    if (window.URL === undefined) {
                        return API.output('dataurlnewwindow');
                    } else if (window.URL.createObjectURL === undefined) {
                        return API.output('dataurlnewwindow');
                    }
                }
                data = buildDocument();
                write(data, options);                    
                break;
            case 'datauristring':
            case 'dataurlstring':
                return 'data:application/pdf;base64,' + btoa(buildDocument());
            case 'datauri':
            case 'dataurl':
                document.location.href = 'data:application/pdf;base64,' + btoa(buildDocument());
                break;
            case 'dataurlnewwindow':
                window.open('data:application/pdf;base64,' + btoa(buildDocument()));
                break;
            default:
                throw new Error('Output type "' + type + '" is not supported.');
            }
            // @TODO: Add different output options
        };
