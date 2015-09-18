

var fpoly = angular.module('fpoly', []);


/*
 * fAlert : displaying notification (using bootstrap alerts) for different level
 *
 * Config object allow following configuration :
 *    - elementId : html ID of the element to add the notificaiton to - default 'messages'
 *    - moveFocus : move the focus of the page to the notification element - default true
 *    - timeout : close the notification after a timeout periode (in ms) - default 0 : no timeout
 */
fpoly.factory('fAlert', function ($timeout) {

    function defaultValue(config, key, theDefault) {
        if (config == null || config[key] == null) {
            return theDefault;
        }

        return config[key];
    }

    return {

        success: function (message, config) {
            this.message(message, 'success', config);
        },

        info: function (message, config) {
            this.message(message, 'info', config);
        },

        warning: function (message, config) {
            this.message(message, 'warning', config);
        },

        error: function (message, config) {
            this.message(message, 'danger', config);
        },

        message: function (message, type, config) {
            var elementId = defaultValue(config, 'elementId', 'messages');

            var uniqueId = _.uniqueId('-alert-');
            var id = elementId + uniqueId;

            var html = '<div class="alert alert-' + type + ' alert-dismissable fade in" id="' + id + '">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                message;

            //display detail info
            if(config != null && config.detail != null){
                var detailId = 'toggle-detail-' + uniqueId;
                html += '<br/><a data-toggle="collapse" data-target="#' + detailId + '" class="message-detail">Detail&nbsp;<span class="caret"></span></a>';
                html += '<div class="collapse" id="' + detailId + '">' + config.detail + '</div>';
            }

            html += '</div>';
            $('#' + elementId).append(html);

            //enable alert transition
            $('#' + id).alert();

            var timeout = defaultValue(config, 'timeout', 0);
            if (timeout !== 0) {
                //display it only for a period of time
                $timeout(function () {
                        $('#' + id).alert('close');
                    },
                    timeout
                );
            }

            //move up the focus
            if (defaultValue(config, 'moveFocus', true)) {
                window.scrollTo(0, 0);
            }
        }
    };
});//fAlert

//a remplacer par https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa ?

fpoly.factory('Base64', function ($log) {
      var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                /* jshint ignore:start */
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                /* jshint ignore:end */
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                $log.error('There were invalid base64 characters in the input text.\n' +
                    'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' +
                    'Expect errors in decoding.');
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                /* jshint ignore:start */
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                /* jshint ignore:end */

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';

            } while (i < input.length);

            return output;
        }
    };
});
