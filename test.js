import test from 'ava'
import express from 'express'
import fetch from 'node-fetch'
import fs from 'fs'
import puppeteer from 'puppeteer'
import events from 'events'

const log = console.log
const app = express()
const browserToUse = fs.existsSync('/usr/bin/google-chrome') 
  ? '/usr/bin/google-chrome' 
  : puppeteer.executablePath()

app.use(express.static('./build/'))

let chromeHandeler = new events.EventEmitter()
let chromeStatus = true // when true chrome is not in use
let chromeReady = () => {
  return new Promise(cb => {
    if (chromeStatus) {
      chromeStatus = false
      cb()
    } else {
      chromeHandeler.on('chromeReady', () => {
        chromeStatus = false
        cb()
      }, { once: true })
    }
  })
}
let chromeDune = () => {
  chromeStatus = true
  chromeHandeler.emit('chromeReady')
}

let tests = () => {
  
  test.cb('Access to webserver', t => {
    t.plan(1)
    fetch('http://localhost:4334/')
      .then(res => res.text())
      .then(body => {
        t.pass()
        t.end()
      })
      .catch(err => {
        t.fail(err)
        t.end()
      })
  })

  test('Javsacript bundel created', t => {
    t.true(fs.existsSync('./build/js/bundel.js'))
  })

  test('Bundel is less than 100KB', t => {
    let bundelSize = fs.statSync('./build/js/bundel.js').size / 1000.0
    t.true(bundelSize < 100)
  })

  test('Access site via puppeteer', async t => {
    await chromeReady()
    const browser = await puppeteer.launch({
      executablePath: browserToUse,
      headless: true
    })
    const page = await browser.newPage()
    await page.goto('http://localhost:4334/', {waitUntil: 'networkidle2'})
    const pageTitle = await page.title()
    await browser.close()
    chromeDune()
    t.true(typeof pageTitle == 'string' && !/404|500|502/.test(pageTitle))
  })

  test('Get B emoji as output from the input', async t => {
    await chromeReady()
    const browser = await puppeteer.launch({
      executablePath: browserToUse,
      headless: true
    })
    const page = await browser.newPage()
    await page.goto('http://localhost:4334/', {waitUntil: 'networkidle2'})
    await page.waitFor(500)
    await page.focus('body > div > div.input.box > div > input[type="text"]')
    await page.keyboard.type('B')
    let text = await page.evaluate(`
      document.querySelector('body > div > div.output.box > div > div').innerHTML
    `)
    await browser.close()
    chromeDune()
    t.true(
      typeof text == 'string' 
      && (
        text.indexOf('🅱️') != -1
        || text.indexOf('🅱') != -1 // this is actually a different B emoji
      )
    )
  })

}

app.listen(4334, tests)