const item = document.querySelectorAll('.item');
const toggle = document.getElementById('toggle');

const sexObj = [
  {
    id: 1,
    type: 'オス',
    class: 'is-male',
  },
  {
    id: 2,
    type: 'メス',
    class: 'is-female',
  },
];
const ageObj = [
  {
    id: 1,
    type: '子猫',
    class: 'is-kitten',
  },
  {
    id: 2,
    type: '大人猫',
    class: 'is-adult',
  },
];
const colorObj = [
  {
    id: 1,
    type: '白',
    class: 'is-white',
  },
  {
    id: 2,
    type: '黒',
    class: 'is-black',
  },
  {
    id: 3,
    type: 'グレー',
    class: 'is-gray',
  },
  {
    id: 4,
    type: '白黒',
    class: 'is-shirokuro',
  },
  {
    id: 5,
    type: 'キジトラ',
    class: 'is-kijitora',
  },
  {
    id: 6,
    type: 'サバトラ',
    class: 'is-sabatora',
  },
  {
    id: 7,
    type: '茶トラ',
    class: 'is-chatora',
  },
  {
    id: 8,
    type: '白キジ',
    class: 'is-shirokiji',
  },
  {
    id: 9,
    type: '白サバ',
    class: 'is-shirosaba',
  },
  {
    id: 10,
    type: '白茶',
    class: 'is-shirocha',
  },
  {
    id: 11,
    type: '三毛',
    class: 'is-mike',
  },
  {
    id: 12,
    type: 'サビ',
    class: 'is-sabi',
  },
  {
    id: 13,
    type: 'その他',
    class: 'is-other',
  },
];

//class付与関数
const addClass = () => {
  item.forEach((elm) => {
    const sexTxt = elm.querySelector('.detailSex .detailValue').textContent;
    const ageTxt = elm.querySelector('.detailAge .detailValue').textContent;
    const colorTxt = elm.querySelector('.detailColor .detailValue').textContent;
    const repAgeTxt = ageTxt
      .replace(/[0-9]/g, '')
      .replace('歳', '大人猫')
      .replace('ヶ月', '子猫');
    const sex = sexObj.find((obj) => obj.type === sexTxt);
    const age = ageObj.find((obj) => obj.type === repAgeTxt);
    const color = colorObj.find((obj) => obj.type === colorTxt);
    elm.classList.add(sex.class, age.class, color.class, 'is-show');
  });
};

//class付与関数を実行
addClass();

//フィルター用のclassを格納する変数
let currentFilterClass = '';

//表示切り替えの関数
const updateDisplay = () => {
  item.forEach((elm) => {
    elm.classList.remove('is-show');
  });

  if (!currentFilterClass) {
    currentFilterClass = 'item';
  }

  const displayItem = document.querySelectorAll('.' + currentFilterClass);

  if (toggle.checked) {
    displayItem.forEach((elm) => {
      if (!elm.classList.contains('is-decided')) {
        elm.classList.add('is-show');
      }
    });
  } else {
    displayItem.forEach((elm) => {
      elm.classList.add('is-show');
    });
  }
};

const filterBySelect = (className) => {
  currentFilterClass = className;
  updateDisplay();
};

//セレクトメニュー切り替えイベント
const select = document.getElementById('filtering');
select.addEventListener('change', () => {
  const selectVal = select.value;
  if (selectVal !== '全部見たい！') {
    const matchObj =
      sexObj.find((obj) => obj.type === selectVal) ||
      ageObj.find((obj) => obj.type === selectVal) ||
      colorObj.find((obj) => obj.type === selectVal);
    const filterClass = matchObj.class;
    filterBySelect(filterClass);
  } else {
    filterBySelect();
  }
});

//譲渡決定にゃん表示、非表示切り替え
toggle.addEventListener('change', updateDisplay);
