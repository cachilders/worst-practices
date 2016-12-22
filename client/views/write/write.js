angular.module('app.write', ['ngclipboard'])

.controller('Write', ['$scope', '$http', '$location', function($scope, $http, $location) {

  const coinToss = function() {
	  return Math.random() < .5 ? true : false;
  };

  // TODO: Drop that in the session storage and load it elsewhere
  const emoji = {};
  getEmoji();

  function getEmoji() {
    $http({
      method: 'GET',
      url: '/emoji',
    })
    .then(function(resp) {
      Object.assign(emoji, resp.data.lib);
    })
  }

  $scope.viewToggle = function() {
    if ($scope.appView !== 'resultView') {
      $scope.transform();
      $scope.appView = 'resultView';
    } else {
      $scope.appView = null;
    }
  }

  $scope.shareMissive = function() {
    var req = {
      method: 'POST',
      url: '/save',
      data: { scope: $scope.printArea }
    }
    $http(req)
    .then(function(resp) {
      $scope.editArea = '';
      $location.path('/show');
      return resp;
    })
  };

  $scope.transform = function() {
    let editorInput = $scope.editArea;
    if ($scope.trans2 === true) {
      const temp = editorInput.split('');
      temp.forEach((v, i) => {
        if (v === '.' || v === ',') { if (coinToss()) { temp[i] = ''; } }
      });
      editorInput = temp.join('')
    }
    if ($scope.trans3 === true) {
      const temp = editorInput.split('');
      temp.forEach((v, i) => {
        if (v === '.') { temp[i] = '!'.repeat(Math.round(Math.random() * (5 - 1) + 1)) }
      });
      editorInput = temp.join('')
    }
    if ($scope.trans4 === true) {
      editorInput = editorInput.replace(/[\s] *\b/g, '  ');
    } 
    if ($scope.trans7 === true) {
      const temp = editorInput.split(' ');
      temp.forEach((v, i) => {
        let word = v.replace(/[\s,.!?]/g, '').toLowerCase();
        if (emoji[word]) {
          if (emoji[word].category !== 'flags' && word !== 'a') {
            temp[i] = v.toLowerCase().replace(word, emoji[word].char);
          };
        }
      });
      editorInput = temp.join(' ');
    }
    if ($scope.trans5 === true) {
      editorInput = editorInput.replace(/\./g, String.fromCharCode(8230));
    }
    if ($scope.trans6 === true) {
      const chill = ['Yo!', 'Sup!', 'My Man!', 'Hola.', 'Hey!', 'What\s good!?', 'Up top!', 'Bruh!', 'What it is?!', 'How\'s it hangin?!']
      editorInput = '' + chill[Math.floor(Math.random() * (chill.length - 1) + 1)] + ' ' + editorInput;
    }
    if ($scope.trans9 === true) {
      const temp = editorInput.split(' ');
      temp.forEach((v, i) => {
        let current = v.toLowerCase();
        if (spelling[current]) {
          temp[i] = spelling[current];
        }
      });
      editorInput = temp.join(' ');
    }
    $scope.printArea = editorInput;
    if ($scope.trans1 === true) {
      editorInput = editorInput.toUpperCase();
    } 
    if ($scope.trans10 === true) {
      editorInput = editorInput.toLowerCase()
        .split('')
        .map(function(char) {
          console.log(char)
          return hacks[char] ? hacks[char] : char;
        })
        .join('');
    }
    if ($scope.trans11 === true) {
      editorInput = [''].concat(editorInput.split(' '), ['']).join('👏');
    }
    if ($scope.trans8 === true) {
      let max = ascii.length;
      let art = ascii[Math.floor(Math.random() * (max - 1) + 1)];
      editorInput = coinToss() ? editorInput + ' ' + art : art + ' ' + editorInput;
    }
    $scope.printArea = editorInput;
  };
  
const spelling = {
  'its': 'it\'s',
  'it\'s': 'its',
  'a lot': 'alot',
  'allot': 'a lot',
  'their': 'there',
  'there': 'they\'re',
  'they\'re': 'their',
  'your': 'you\'re',
  'you\'re': 'yore',
  'yore': 'you\re',
  'would of': 'would have',
  'would have': 'would of',
  'were': 'we\'re',
  'we\'re': 'were',
  'fuck': 'duck',
  'to': 'too',
  'too': 'two',
  'two': 'to',
  'one': 'won',
  'won': 'one',
  'sun': 'son',
  'son': 'sun'
}

const ascii = [
	'ʘ‿ʘ',
	'ಠ_ಠ',
	'(╯°□°）╯︵ ┻━┻',
	'┬─┬﻿ ノ( ゜-゜ノ)',
	'┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻',
	'( ﾟ∀ﾟ)ｱﾊﾊ八八ﾉヽﾉヽﾉヽﾉ ＼＼ / ＼/ ＼',
	'ლ(｀ー´ლ)',
	'ʕ•ᴥ•ʔ',
	'(｡◕‿◕｡)',
	'（　ﾟДﾟ ）',
	'¯\\_(ツ)_/¯',
	'¯\\(°_o)/¯',
	'(`･ω･´)',
	'(╬ ಠ益ಠ)',
	'☜(⌒▽⌒)☞',
	'ε=ε=ε=┌(;*´Д`)ﾉ',
	'ヽ(´▽`)/',
	'ヽ(´ー｀)ノ',
	'ᵒᴥᵒ#',
	'V●ᴥ●V',
	'ฅ^•ﻌ•^ฅ',
	'（ ^_^）o自自o（^_^ ）',
	'ಠ‿ಠ',
	'( ͡° ͜ʖ ͡°)',
	'ಥ_ಥ',
	'ಥ﹏ಥ',
	'٩◔̯◔۶',
	'ᕙ(⇀‸↼‶)ᕗ',
	'ᕦ(ò_óˇ)ᕤ',
	'⊂(◉‿◉)つ',
	'q(❂‿❂)p',
	'⊙﹏⊙',
	'¯\\_(⊙︿⊙)_/¯',
	'°‿‿°',
	'¿ⓧ_ⓧﮌ',
	'(⊙.☉)7',
	'(´･_･`)',
	'щ（ﾟДﾟщ）',
	'٩(͡๏̯͡๏)۶',
	'ఠ_ఠ',
	'ᕕ( ᐛ )ᕗ',
	'(⊙_◎)',
	'ミ●﹏☉ミ',
	'ヽ༼ ಠ益ಠ ༽ﾉ',
	't(-_-t)',
	'(ಥ⌣ಥ)',
	'(づ￣ ³￣)づ',
	'(づ｡◕‿‿◕｡)づ',
	'(ノಠ ∩ಠ)ノ彡( \\o°o)\\',
	'｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡',
	'༼ ༎ຶ ෴ ༎ຶ༽',
	'“ヽ(´▽｀)ノ”',
	'┌(ㆆ㉨ㆆ)ʃ',
	'눈_눈',
	'( ఠൠఠ )ﾉ',
	'乁( ◔ ౪◔)「      ┑(￣Д ￣)┍',
	'(๑•́ ₃ •̀๑)',
	'⁽⁽ଘ( ˊᵕˋ )ଓ⁾⁾',
	'◔_◔',
	'♥‿♥',
	'ԅ(≖‿≖ԅ)',
	'( ˘ ³˘)♥',
	'( ˇ෴ˇ )',
	'ヾ(-_- )ゞ',
	'ʕ •́؈•̀ ₎',
	'ლ(•́•́ლ)',
	'{•̃_•̃}',
	'(ᵔᴥᵔ)',
	'(Ծ‸ Ծ)',
	'¯\\_(ツ)_/¯',
	'(ಠ_ಠ)',
	'ᕕ( ᐛ )ᕗ',
	'(╯°□°）╯︵ ┻━┻',
	'ʕ •ᴥ•ʔ',
	'/ᐠ-ꞈ-ᐟ\\'
]

const hacks = {a: 'α', b: 'ь', c: 'ҁ', d: 'ƌ', e: 'ε', f: 'ƒ', g: 'ǥ', h: 'һ', i: 'í', j: 'ȷ', k: 'ӄ', l: 'Ŀ', m: 'м', n: 'ƞ', o: 'ο', p: 'Ϸ', q: 'Ϥ', r: 'ɼ', s: 'ϩ', t: 'Ƭ', u: 'ȗ', v: 'ν', w: 'ᾡ', x: 'ӽ', y: 'ү', z: 'ɀ'}

}]);