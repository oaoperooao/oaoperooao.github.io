$(() => {
        var fightCount = 0

        $('.choice').on('click', () => {
            $('#foe').empty();
            $('#me').empty();
            //清空骰區
            $('#foedice').empty();
            $('#mydice').empty();
            var loadCount = 0
            let $input = $(event.target);
            var $character = load($input.attr('value'));
            $character.addClass('me')
            do {
                var foeNumber = '' + rand(1, 8)
            } while (foeNumber == $input.attr('value'));
            var $foe = load(foeNumber);
            $foe.addClass('foe')
            onstage($character, $foe);
        })

        $('#fight').on('click', () => {
            //清空骰區
            $('#foedice').empty();
            $('#mydice').empty();
            // 骰骰子
            var r1, r2
            if (fightCount % 2 == 0) {
                r1 = RollATK('#mydice', $('.me').attr('ATK'))
                r2 = RollDEF('#foedice', $('.foe').attr('DEF'))
            } else {
                r1 = RollDEF('#mydice', $('.me').attr('DEF'))
                r2 = RollATK('#foedice', $('.foe').attr('ATK'))
            }
            determine($('.me'), $('.foe'), r1, r2, fightCount)
            fightCount++
        })
        $('#restart1').on('click', () => {
            $('#popup2').removeClass('enable')
        })
        $('#restart2').on('click', () => {
            $('#popup3').removeClass('enable')
        })
        $('#next').on('click', () => {
            $('#popup3').removeClass('enable')
            do {
                var foeNumber = '' + rand(1, 8)
            } while (foeNumber == $('.me').attr('value'));
            var $foe = load(foeNumber);
            $foe.addClass('foe')
            restage($foe);
        })
    }) // 產生 div 的 jQuery 物件在變數 $div

var rand = (start, end) => {
    var r
    n = end - start + 1 //求亂數的範圍 
    r = Math.random() * n // 放大
    r = Math.floor(r) // 去除小數點
    r += start // 位移
    return r
}

var RollATK = (target, r) => {
    // 產生 img 的 jQuery 物件在變數 $img
    var sum = 0
    for (var i = 0; i < r; i++) {
        var a = rand(0, 1)
        sum = sum + a
        if (a == 1) {
            var $ATK = $('<img>').attr('src', './img/diceATK.png').addClass('dice')
            $(target).append($ATK)
        } else {
            var $dice = $('<img>').attr('src', './img/dice.png').addClass('dice')
            $(target).append($dice)
        }
    }
    return sum
}
var RollDEF = (target, r) => {
    // 產生 img 的 jQuery 物件在變數 $img
    var sum = 0
    for (var i = 0; i < r; i++) {
        var a = rand(0, 1)
        sum = sum + a
        if (a == 1) {
            var $DEF = $('<img>').attr('src', './img/diceDEF.png').addClass('dice')
            $(target).append($DEF)
        } else {
            var $dice = $('<img>').attr('src', './img/dice.png').addClass('dice')
            $(target).append($dice)
        }
    }
    return sum
}



var load = (num) => {
    var $img = $('<img>').attr('src', './img/font' + num + '.png').attr('value', num)
    switch (num) {
        case '1':
            $img.attr('HP', 9).attr('ATK', 11).attr('DEF', 5)
            break;
        case '2':
            $img.attr('HP', 10).attr('ATK', 8).attr('DEF', 7)
            break;
        case '3':
            $img.attr('HP', 7).attr('ATK', 10).attr('DEF', 8)
            break;
        case '4':
            $img.attr('HP', 8).attr('ATK', 6).attr('DEF', 10)
            break;
        case '5':
            $img.attr('HP', 11).attr('ATK', 9).attr('DEF', 6)
            break;
        case '6':
            $img.attr('HP', 12).attr('ATK', 4).attr('DEF', 8)
            break;
        case '7':
            $img.attr('HP', 8).attr('ATK', 8).attr('DEF', 9)
            break;
        case '8':
            $img.attr('HP', 9).attr('ATK', 7).attr('DEF', 8)
            break;
        default:
    }
    return $img
}

var onstage = (me, foe) => {
    $('#me').empty().append(me)
    $('#myHP').empty().append(me.attr('HP'))
    $('#myATK').empty().append(me.attr('ATK'))
    $('#myDEF').empty().append(me.attr('DEF'))
    $('#foe').empty().append(foe)
    $('#foeHP').empty().append(foe.attr('HP'))
    $('#foeATK').empty().append(foe.attr('ATK'))
    $('#foeDEF').empty().append(+foe.attr('DEF'))
}

var restage = (foe) => {
    //清空骰區
    $('#foedice').empty();
    $('#mydice').empty();
    $('#foe').empty().append(foe)
    $('#foeHP').empty().append(foe.attr('HP'))
    $('#foeATK').empty().append(foe.attr('ATK'))
    $('#foeDEF').empty().append(foe.attr('DEF'))
}


var determine = (me, foe, r1, r2, count) => {
    var damage = 0
    if (count % 2 == 0) {
        damage = Number(r1 - r2)
        if (damage > 0) {
            foe.attr('HP', Number(foe.attr('HP') - damage))
            $('#foeHP').empty().append(foe.attr('HP'))
        }
    } else {
        damage = Number(r2 - r1)
        if (damage > 0) {
            me.attr('HP', Number(me.attr('HP') - damage))
            $('#myHP').empty().append(me.attr('HP'))
        }
    }
    if (me.attr('HP') <= 0) {
        lose()
    } else if (foe.attr('HP') <= 0) {
        win()
    }
}

var lose = () => {
    $('#popup2').addClass('enable')
}

var win = () => {
    $('#popup3').addClass('enable')
}