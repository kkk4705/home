const abc = [
  [ 'a', 'a' ],  [ 'б', 'b' ],  [ 'в', 'v' ],
  [ 'г', 'g' ],  [ 'д', 'd' ],  [ 'е', 'e' ],
  [ 'ё', 'e' ],  [ 'ж', 'zh' ], [ 'з', 'z' ],
  [ 'и', 'i' ],  [ 'й', 'i' ],  [ 'к', 'k' ],
  [ 'л', 'l' ],  [ 'м', 'm' ],  [ 'н', 'n' ],
  [ 'о', 'o' ],  [ 'п', 'p' ],  [ 'р', 'r' ],
  [ 'с', 's' ],  [ 'т', 't' ],  [ 'у', 'u' ],
  [ 'ф', 'f' ],  [ 'х', 'kh' ], [ 'ц', 'ts' ],
  [ 'ч', 'ch' ], [ 'ш', 'sh' ], [ 'щ', 'shch' ],
  [ 'ы', 'y' ],  [ 'ъ', 'ie' ], [ 'э', 'e' ],
  [ 'ю', 'iu' ], [ 'я', 'ia' ],
  [ 'A', 'A' ],  [ 'Б', 'B' ],  [ 'В', 'V' ],    [ 'Г', 'G' ],
  [ 'Д', 'D' ],  [ 'Е', 'E' ],  [ 'Ё', 'E' ],    [ 'Ж', 'ZH' ],
  [ 'З', 'Z' ],  [ 'И', 'I' ],  [ 'Й', 'I' ],    [ 'К', 'K' ],
  [ 'Л', 'L' ],  [ 'М', 'M' ],  [ 'Н', 'N' ],    [ 'О', 'O' ],
  [ 'П', 'P' ],  [ 'Р', 'R' ],  [ 'С', 'S' ],    [ 'Т', 'T' ],
  [ 'У', 'U' ],  [ 'Ф', 'F' ],  [ 'Х', 'KH' ],   [ 'Ц', 'TS' ],
  [ 'Ч', 'CH' ], [ 'Ш', 'SH' ], [ 'Щ', 'SHCH' ], [ 'Ы', 'Y' ],
  [ 'Ъ', 'IE' ], [ 'Э', 'E' ],  [ 'Ю', 'IU' ],   [ 'Я', 'IA' ]
]

// принимает РУ букву
// ищет её по массиву
// возвращает индекс вложенного массива с буквой, либо false
function searchABC(a) {
  let indexA = 0
  for (let i = 0; i < abc.length; i++) {
    if (abc[i].includes(a)) {
      indexA = i
      return indexA
    }
  }
  return false
}

// принимает строку на РУ
// отправляет в функцию searchABC(), РУ буквы переводит на ЛАТ. Остальные символы просто копирует в строку
// возвращает строку на ЛАТ
function translitRuEn(wordIn) {
  let wordOut = ''
  for (let i = 0; i < wordIn.length; i++) {
    let abcIndexOrFalse = searchABC(wordIn[i])
    if (abcIndexOrFalse) {
      wordOut += abc[abcIndexOrFalse][1]
    } else {
      wordOut += wordIn[i]
    }
  }
  return wordOut
}

// принимает строку с названием тега, строку с содержимым тега и массив с атрибутами и значениями по очереди
// возвращает созданный тег с атрибутами и содержимым
function addTag(tag, content, arr) {
  const newTag = document.createElement(tag)
  for (let i = 0; i < arr.length; i += 2) {
    newTag.setAttribute(arr[i], arr[i + 1])
  }
  newTag.innerText = content
  return newTag
}



// Кнопка добавить
const butAdd = document.querySelector('#add')
const inText = document.querySelector('#enterText')
const olRu = document.querySelector('.wordBoxRu>ol')
const olEn = document.querySelector('.wordBoxEn>ol')
butAdd.addEventListener('click', () => {
  // Добавление в РУ контейнер
  let cutText = inText.value.slice(0, 8) + '...'
  if ((inText.value.length) > 8) {
    olRu.appendChild(addTag('li', cutText, ['class', 'word longWord', 'data-tooltip', inText.value]))
  } else {
    olRu.appendChild(addTag('li', inText.value, ['class', 'word']))
  }
  // Добавление в ЛАТ контейнер
  let enWord = translitRuEn(inText.value)
  let enWordCut = enWord.slice(0, 8) + '...'
  if ((enWord.length) > 8) {
    olEn.appendChild(addTag('li', enWordCut, ['class', 'word longWord', 'data-tooltip', enWord]))
  } else {
    olEn.appendChild(addTag('li', enWord, ['class', 'word']))
  }
})



// Кнопка очистить
const butClear = document.querySelector('#delete')
butClear.addEventListener('click', () => {
  document.querySelector('.olRu').innerHTML = ''
  document.querySelector('.olEn').innerHTML = ''
})



// Кнопка ночной режим
const butNightMode = document.querySelector('#nightMode')
butNightMode.addEventListener('click', () => {
  if (document.querySelector('.nightModeLink')) {
    const deleteCSS = document.querySelector('.nightModeLink')
    deleteCSS.remove()
  } else {
    const addCSS = document.createElement('link')
    addCSS.setAttribute('rel', 'stylesheet')
    addCSS.setAttribute('href', 'css/nightMode.css')
    addCSS.setAttribute('class', 'nightModeLink')
    document.head.appendChild(addCSS)
  }
})