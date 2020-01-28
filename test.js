const assert = require('assert')

const en = require('./dist/en.json')
const it = require('./dist/it.json')

const defaultLanguage = en
const translations = [it]

assert.equal(Object.keys(defaultLanguage).sort().join(), 'locale,messages', 'translation keys')

translations.forEach(translation => {
  Object.keys(translation.messages).forEach(key => {
    if (Object.keys(defaultLanguage.messages).includes(key)) return

    assert.fail(`locale ${translation.locale} has extraneous message ${key}`)
  })

  Object.keys(defaultLanguage.messages).forEach(key => {
    if (Object.keys(translation.messages).includes(key)) return

    assert.fail(`locale ${translation.locale} has missing message ${key}`)
  })
})
