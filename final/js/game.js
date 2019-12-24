$(() => {
        var fightCount = 0

        $('.choice').on('click', () => {
            $('#foe').empty();
            $('#me').empty();
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
            let r1 = rand(1, 6)
                // 展現我的骰子

            // 骰骰子
            r2 = rand(1, 6)
                // 展現對方骰子
            Rolldice(r1, r2)
            determine($('.me'), $('.foe'), r1, r2, fightCount)
            fightCount++
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

var Rolldice = (r1, r2) => {
    // 產生 img 的 jQuery 物件在變數 $img
    var $img1 = $('<img>').attr('src', './img/dice' + r1 + '.png').addClass('dice')
    $img1.attr('dice-value', r1)

    // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#mydice').append($img1)

    // 產生 img 的 jQuery 物件在變數 $img
    var $img2 = $('<img>').attr('src', './img/dice' + r2 + '.png').addClass('dice')
    $img2.attr('dice-value', r2)

    // 將 $div 插入到網頁 id=data 的html element 裡面
    $('#foedice').append($img2)
}


var load = (num) => {
    console.log(num)
    var $img = $('<img>').attr('src', './img/font' + num + '.png')
    switch (num) {
        case '1':
            $img.attr('HP', 100).attr('ATK', 6).attr('DEF', 1)
            console.log(typeof(Number($img.attr('HP'))))
            break;
        case '2':
            $img.attr('HP', 110).attr('ATK', 3).attr('DEF', 3)
            break;
        case '3':
            $img.attr('HP', 90).attr('ATK', 4).attr('DEF', 4)
            break;
        case '4':
            $img.attr('HP', 100).attr('ATK', 5).attr('DEF', 2)
            break;
        case '5':
            $img.attr('HP', 100).attr('ATK', 4).attr('DEF', 3)
            break;
        case '6':
            $img.attr('HP', 100).attr('ATK', 3).attr('DEF', 4)
            break;
        case '7':
            $img.attr('HP', 130).attr('ATK', 2).attr('DEF', 2)
            break;
        case '8':
            $img.attr('HP', 120).attr('ATK', 2).attr('DEF', 3)
            break;
        default:
    }
    return $img
}

var onstage = (me, foe) => {
    $('#me').empty().append(me)
    $('#myHP').empty().append("<p>" + me.attr('HP') + "</p>")
    $('#myATK').empty().append("<p>" + me.attr('ATK') + "</p>")
    $('#myDEF').empty().append("<p>" + me.attr('DEF') + "</p>")
    $('#foe').empty().append(foe)
    $('#foeHP').empty().append("<p>" + foe.attr('HP') + "</p>")
    $('#foeATK').empty().append("<p>" + foe.attr('ATK') + "</p>")
    $('#foeDEF').empty().append("<p>" + foe.attr('DEF') + "</p>")
}

var determine = (me, foe, r1, r2, count) => {
    var damage = 0
    if (count % 2 == 0) {
        damage = Number(me.attr('ATK')) + r1 - r2 - Number(foe.attr('DEF'))
        if (damage > 0) {
            foe.attr('HP', Number(foe.attr('HP') - damage))
            $('#foeHP').empty().append("<p>" + foe.attr('HP') + "</p>")
        }
    } else {
        damage = Number(foe.attr('ATK')) + r2 - r1 - Number(me.attr('DEF'))
        if (damage > 0) {
            me.attr('HP', Number(me.attr('HP') - damage))
            $('#myHP').empty().append("<p>" + me.attr('HP') + "</p>")
        }
    }

}