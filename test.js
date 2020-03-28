import assert from 'assert'
import read from 'read-file-utf8'

async function test () {
  const en = await read('dist/en.json').then(JSON.parse)
  const it = await read('dist/it.json').then(JSON.parse)

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
}
