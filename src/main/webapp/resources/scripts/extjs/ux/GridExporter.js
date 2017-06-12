/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = (function() {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    // public method for encoding
    return {
        //This was the original line, which tries to use Firefox's built in Base64 encoder, but this kept throwing exceptions....
        // encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) {
        
        
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }
    };
})();

Ext.define("Ext.ux.GridExporter", {
dateFormat : 'Y-m-d g:i',

exportGrid: function(grid) {
    if (Ext.isIE) {
        this._ieToExcel(grid);

    } else {
        var data = this._getCSV(grid);        
        console.log(data);        
        /*window.location = 'data:application/vnd.ms-excel;charset=UTF-8,' + encodeURIComponent(data);*/
        window.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(data);
        
        
        
    }
},

_escapeForCSV: function(string) {
    if (string.match(/,/)) {
        if (!string.match(/"/)) {
            string = '"' + string + '"';
        } else {
            string = string.replace(/,/g, ''); // comma's and quotes-- sorry, just loose the commas
        }
    }
    return string;
},

_getFieldText: function(fieldData) {
    var text;

    if (fieldData == null || fieldData == undefined) {
        text = '';

    } else if (fieldData._refObjectName && !fieldData.getMonth) {
        text = fieldData._refObjectName;

    } else if (fieldData instanceof Date) {
        text = Ext.Date.format(fieldData, this.dateFormat);

    } else if (!fieldData.match) { // not a string or object we recognize...bank it out
        text = '';

    } else {
        text = fieldData;
    }

    return text;
},

_getFieldTextAndEscape: function(fieldData) {
    var string  = this._getFieldText(fieldData);

    return this._escapeForCSV(string);
},

_getCSV: function (grid) {
    var cols    = grid.columns;
    var store   = grid.store;
    var data    = '';

    var that = this;
    Ext.Array.each(cols, function(col, index) {
        if (col.hidden != true) {
            data += that._getFieldTextAndEscape(col.text) + ',';
        }
    });
    data += "\n";

    store.each(function(record) {
        var entry       = record.getData();
        Ext.Array.each(cols, function(col, index) {
            if (col.hidden != true) {
                var fieldName   = col.dataIndex;
                var text        = entry[fieldName];

                data += that._getFieldTextAndEscape(text) + ',';
            }
        });
        data += "\n";
    });

    return data;
},

_ieGetGridData : function(grid, sheet) {
    var that            = this;
    var resourceItems   = grid.store.data.items;
    var cols            = grid.columns;

    Ext.Array.each(cols, function(col, colIndex) {
        if (col.hidden != true) {
            console.log('header: ', col.text);
            sheet.cells(1,colIndex + 1).value = col.text;
        }
    });

    var rowIndex = 2;
    grid.store.each(function(record) {
        var entry   = record.getData();

        Ext.Array.each(cols, function(col, colIndex) {
            if (col.hidden != true) {
                var fieldName   = col.dataIndex;
                var text        = entry[fieldName];
                var value       = that._getFieldText(text);

                sheet.cells(rowIndex, colIndex+1).value = value;
            }
        });
        rowIndex++;
    });
},

_ieToExcel: function (grid) {
    if (window.ActiveXObject){
        var  xlApp, xlBook;
        try {
            xlApp = new ActiveXObject("Excel.Application"); 
            xlBook = xlApp.Workbooks.Add();
        } catch (e) {
            Ext.Msg.alert('Error', 'For the export to work in IE, you have to enable a security setting called "Initialize and script ActiveX control not marked as safe" from Internet Options -> Security -> Custom level..."');
            return;
        }

        xlBook.worksheets("Sheet1").activate;
        var XlSheet = xlBook.activeSheet;
        xlApp.visible = true; 

       this._ieGetGridData(grid, XlSheet);
       XlSheet.columns.autofit; 
    }
}});