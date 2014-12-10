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
            }
            else {
                $('#btnCyrlToLatn').remove();
            }

            if (Office.context.document.setSelectedDataAsync) {
                $('#btnLatnToCyrl').click(function () { trans(Port.latnToCyrl); });
            }
            else {
                $('#btnLatnToCyrl').remove();
            }
        });
    };

    function trans(f) {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
        function (result) {
            if (result.status === 'succeeded') {
                Office.context.document.setSelectedDataAsync(f(result.value));
            }
        });
    }
})();