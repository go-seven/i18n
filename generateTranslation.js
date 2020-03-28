import read from 'read-file-utf8'
import write from 'write-file-utf8'

const locale = process.argv[2]

function flattenKeysFromTree (inputObject, baseKey) {
  const separator = '.'

  const outputObject = {}

  for (const [key, value] of Object.entries(inputObject)) {
    const flattenKey = `${baseKey ? `${baseKey}${separator}` : ''}${key}`

    if (typeof value === 'string') {
      outputObject[flattenKey] = value
    } else {
      const nested = flattenKeysFromTree(value, flattenKey)

      for (const [nestedKey, nestedValue] of Object.entries(nested)) {
        outputObject[nestedKey] = nestedValue
      }
    }
  }

  return outputObject
}

async function generateTranslation () {
  const messages = await read(`${locale}.json`).then(JSON.parse)

  await write(
    `dist/${locale}.json`,
    JSON.stringify({
      locale,
      messages: flattenKeysFromTree(messages)
    }, null, 2)
  )
}

generateTranslation()
