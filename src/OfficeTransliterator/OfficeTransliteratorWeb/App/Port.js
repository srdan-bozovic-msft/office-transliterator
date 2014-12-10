var Port = {};

(function (ns) {

    //var lang = {
    //    cir: 1,
    //    lat: 2,
    //    ysl: 3,
    //    csc: 4,
    //    nol: 5
    //};

    var cirStr = ['Џ', 'Љ', 'Њ',
        'Џ', 'Љ', 'Њ', 'Ђ', 'А',
        'Б', 'В', 'Г', 'Д', 'Е',
        'Ж', 'З', 'И', 'Ј', 'К',
        'Л', 'М', 'Н', 'О', 'П',
        'Р', 'С', 'Т', 'Ћ', 'У',
        'Ф', 'Х', 'Ц', 'Ч', 'Ш',
        'џ', 'љ', 'њ', 'ђ', 'а',
        'б', 'в', 'г', 'д', 'е',
        'ж', 'з', 'и', 'ј', 'к',
        'л', 'м', 'н', 'о', 'п',
        'р', 'с', 'т', 'ћ', 'у',
        'ф', 'х', 'ц', 'ч', 'ш'
    ];

    var latStr = ['Dž', 'Lj', 'Nj',
        'DŽ', 'LJ', 'NJ', 'Đ', 'A',
        'B', 'V', 'G', 'D', 'E',
        'Ž', 'Z', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P',
        'R', 'S', 'T', 'Ć', 'U',
        'F', 'H', 'C', 'Č', 'Š',
        'dž', 'lj', 'nj', 'đ', 'a',
        'b', 'v', 'g', 'd', 'e',
        'ž', 'z', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p',
        'r', 's', 't', 'ć', 'u',
        'f', 'h', 'c', 'č', 'š'
    ];

    var yslStr = ['D@', 'LJ', 'NJ',
        'D`', 'Lj', 'Nj', '\\', 'A',
        'B', 'V', 'G', 'D', 'E',
        '@', 'Z', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P',
        'R', 'S', 'T', ']', 'U',
        'F', 'H', 'C', '^', '[',
        'd`', 'lj', 'nj', '|', 'a',
        'b', 'v', 'g', 'd', 'e',
        '`', 'z', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p',
        'r', 's', 't', '}', 'u',
        'f', 'h', 'c', '~', '{'
    ];

    var cscStr = ['X', 'Q', 'W',
        'X', 'Q', 'W', '\\', 'A',
        'B', 'V', 'G', 'D', 'E',
        '@', 'Z', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P',
        'R', 'S', 'T', ']', 'U',
        'F', 'H', 'C', '^', '[',
        'x', 'q', 'w', '|', 'a',
        'b', 'v', 'g', 'd', 'e',
        '`', 'z', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p',
        'r', 's', 't', '}', 'u',
        'f', 'h', 'c', '~', '{'
    ];

    var ldbSStr = ['Dž', 'Lj', 'Nj'];
    var ldbCStr = ['DŽ', 'LJ', 'NJ'];
    var smgStr = ['A', 'E', 'I', 'O', 'U'];

    var nolStr = ['Dzz', 'LJ', 'NJ',
        'Dzz', 'Lj', 'Nj', 'Dj', 'A',
        'B', 'V', 'G', 'D', 'E',
        'Zz', 'Z', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P',
        'R', 'S', 'T', 'Cc', 'U',
        'F', 'H', 'C', 'Ch', 'Ss',
        'dzz', 'lj', 'nj', 'dj', 'a',
        'b', 'v', 'g', 'd', 'e',
        'zz', 'z', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p',
        'r', 's', 't', 'cc', 'u',
        'f', 'h', 'c', 'ch', 'ss'
    ];

    function cir2Lat(sText) {
        return rpl(sText, cirStr, latStr);
    }

    function lat2Cir(sText) {
        return rplNj(rpl(sText, latStr, cirStr));
    }



    function rpl(sText, strIz, strU) {
        var sLetter;
        var dLetter = '';
        var rText = '';
        var lIndex = 0;

        while (lIndex < sText.length) {
            sLetter = sText[lIndex];
            switch (sLetter) {
                case 'l':
                case 'n':
                case 'd':
                case 'L':
                case 'N':
                case 'D':
                    dLetter = sText.substring(lIndex, lIndex + 2);
                    if (dLetter == strIz[0] ||
                        dLetter == 'lj' ||
                        dLetter == 'nj' ||
                        dLetter == strIz[30] ||
                        dLetter == 'LJ' ||
                        dLetter == 'NJ' ||
                        dLetter == strIz[33] ||
                        dLetter == 'Lj' ||
                        dLetter == 'Nj') {
                        sLetter = dLetter;
                    } else {
                        dLetter = "";
                    }
                    break;
                default:
                    break;
            }
            for (var n = 0; n < strIz.length; n++) {
                if (strIz[n] == sLetter) {
                    sLetter = strU[n];
                    break;
                }
            }
            rText = rText + sLetter;
            lIndex++;
            if (dLetter.length == 2) {
                dLetter = "";
                lIndex++;
            }
        }

        return rText;
    }

    function rplNj(sText) {
        var rText = sText;
        var strIz = ['тањуг', 'Тањуг', 'аџиве', 'наџе', 'оџиве',
            'оџвака', 'оџури', 'џубори', 'оњукциј', 'оњугациј',
            'њукциј', 'њекциј', 'ТАЊУГ', 'НАЏИВЕ', 'НАЏЕ',
            'ОЏИВЕ', 'ОЏВАКА', 'ОЏУРИ', 'ЏУБОРИ', 'ОЊУКЦИЈ',
            'ОЊУГАЦИЈ', 'ЊУКЦИЈ', 'ЊЕКЦИЈ', 'АЊЕЗИЧН', 'ањезичн'
        ];
        var strU = ['танјуг', 'Танјуг', 'адживе', 'надже', 'одживе',
            'оджвака', 'оджури', 'джубори', 'онјукциј', 'онјугациј',
            'нјукциј', 'нјекциј', 'ТАНЈУГ', 'НАДЖИВЕ', 'НАДЖЕ',
            'ОДЖИВЕ', 'ОДЖВАКА', 'ДЖУРИ', 'ОДЖУБОРИ', 'ОНЈУКЦИЈ',
            'ОНЈУГАЦИЈ', 'НЈУКЦИЈ', 'НЈЕКЦИЈ', 'АНЈЕЗИЧН', 'анјезичн'
        ];

        for (var i = 0; i < strIz.length; i++) {
            var p = new RegExp(strIz[i], "g");
            rText = rText.replace(p, strU[i]);
        }

        return rText;
    }

    ns.cyrlToLatn = cir2Lat;
    ns.latnToCyrl = lat2Cir;
})(Port);

