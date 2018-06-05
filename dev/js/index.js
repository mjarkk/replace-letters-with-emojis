import {html, render} from 'lit-html/lib/lit-extended'
import escapeRegexp from 'escape-string-regexp'
import '../style/index.styl'

const log = console.log

log('Hey... it looks like you want to have more fun with this app')
log('The full source code in on github: https://github.com/mjarkk/replace-letters-with-emojis')

let textInput = ''

let replaceLetters = input => {
  let blue = 'blue'
  let red = 'red'
  let normal = 'normal'
  let toReplace = [
    ['b','\uD83C\uDD71',red],
    ['a','\uD83C\uDD70',red],
    ['abc','\uD83D\uDD24',blue],
    ['1234','\uD83D\uDD22',blue],
    ['100','\uD83D\uDCAF',normal],
    ['abcd','\uD83D\uDD20',blue],
    ['ab','\uD83C\uDD8E',red],
    ['cl','\uD83C\uDD91',red],
    ['cool','\uD83C\uDD92',normal],
    ['free','\uD83C\uDD93',normal],
    ['id','\uD83C\uDD94',blue],
    ['o','\uD83C\uDD7E',red],
    ['ok','\uD83C\uDD97',blue],
    ['p','\uD83C\uDD7F',blue],
    ['sos','\uD83C\uDD98',red],
    ['up!','\uD83C\uDD99',blue],
    ['vs','\uD83C\uDD9A',red],
    ['10','\uD83D\uDD1F',blue],
    ['9','9\uFE0F\u20E3',blue],
    ['8','8\uFE0F\u20E3',blue],
    ['7','7\uFE0F\u20E3',blue],
    ['6','6\uFE0F\u20E3',blue],
    ['5','5\uFE0F\u20E3',blue],
    ['4','4\uFE0F\u20E3',blue],
    ['3','3\uFE0F\u20E3',blue],
    ['2','2\uFE0F\u20E3',blue],
    ['1','1\uFE0F\u20E3',blue],
    ['0','0\uFE0F\u20E3',blue],
    ['*','*\uFE0F\u20E3',blue],
    ['#','#\uFE0F\u20E3',blue],
    ['tm','\u2122',normal],
    ['!','\u2757',red],
    ['?','\u2753',red],
    ['!?','\u2049',red],
    ['!!','\u203C',red],
    ['t','\u271D',blue],
    ['wc','\uD83D\uDEBE',blue]
  ]
  return toReplace.reduce((acc, el) => 
    acc.replace(new RegExp(escapeRegexp(el[0]), 'ig'), el[1])
  ,input)
}

let input = () => html`
  <div class='input box'>
    <h2>Input:</h2>
    <div class='holder'>
      <input autofocus type='text' oninput="${ev => {
        textInput = ev.target.value
        r()
      }}" placeholder='To change'/>
    </div>
  </div>
`

let output = () =>  html`
  <div class='output box'>
    <h2>Output:</h2>
    <div class='holder extraPadd'>
      <p class='outputText'>${textInput ? replaceLetters(textInput) : 'Start typing to see result'}</p>
    </div>
  </div>
`

let info = () => html`
  <div class='info box'>
    <h2>Info:</h2>
    <p class='headP'>
      This website makes it easy to replace all letters that are availibe as emojis to those emojis, 
      made by <a href='https://github.com/mjarkk'>mjarkk</a>.
    </p>
    <p class='headP'>If you find a 🐛 you can make an <a href='https://github.com/mjarkk/replace-letters-with-emojis/issues/new'>issue</a></p>
  </div>
`

let toRender = () => html`
  <h1 class='header'>Letters ➡️ emojis</h1>
  <div class='wrapper'>
    ${input()}
    ${output()}
    ${info()}
  </div>
`

let r = () =>
  render(toRender(), document.body)
r()