/// <reference path="../App.js" />
/// <reference path="../Port.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            if (Office.context.document.setSelectedDataAsync) {
                $('#btnCyrlToLatn').click(function () { trans(Port.cyrlToLatn); });
                $('#btnLatnToCyrl').click(function () { trans(Port.latnToCyrl); });
            }
            else {
                $('#btnCyrlToLatn').remove();
                $('#btnLatnToCyrl').remove();
            }
        });
    };

    function trans(f) {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Ooxml,
        function (result) {
            if (result.status === 'succeeded') {
               Office.context.document.setSelectedDataAsync(f(result.value), Office.CoercionType.Ooxml);
                Office.context.document.setSelectedDataAsync(result.value.replace('Azure', 'Srki'), { coercionType: Office.CoercionType.Ooxml });
            }
        });
    }

    function trans(f) {
        app.hideNotification();
        switch (Office.context.host) {
            case 'Word':
                transOoxml(f);
                break;
            case 'Excel':
                transMatrix(f);
                break;
            default:
                transText(f);
                break;
        }
    }

    function transOoxml(f) {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Ooxml,
            function (result) {
                if (result.status === 'succeeded') {

                    var parser = new DOMParser();
                    var ooxmlDoc = parser.parseFromString(result.value, "text/xml");

                    var textElements = ooxmlDoc.getElementsByTagNameNS("http://schemas.openxmlformats.org/wordprocessingml/2006/main", "t");

                    for (var i = 0; i < textElements.length; i++) {
                        var textElement = textElements[i];
                        textElement.innerHTML = f(textElement.innerHTML);
                    }

                    var oSerializer = new XMLSerializer();
                    var ooXml = oSerializer.serializeToString(ooxmlDoc);

                    Office.context.document.setSelectedDataAsync(ooXml, { coercionType: Office.CoercionType.Ooxml });
                }
                else {
                    app.showNotification(result.error.message)
                }
            });
    }

    function transMatrix(f) {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Matrix,
            function (result) {
                if (result.status === 'succeeded') {

                    var table = result.value;

                    for (var i = 0; i < table.length; i++) {
                        var row = table[i];
                        for (var j = 0; j < row.length; j++) {
                            row[j] = f(row[j].toString());
                        }
                    }

                    Office.context.document.setSelectedDataAsync(table, { coercionType: Office.CoercionType.Matrix });
                }
                else {
                    app.showNotification(result.error.message)
                }
            });
    }

    function transText(f) {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === 'succeeded') {
                    Office.context.document.setSelectedDataAsync(f(result.value), { coercionType: Office.CoercionType.Text });
                }
                else {
                    app.showNotification(result.error.message)
                }
            });
    }
})();