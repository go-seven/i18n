import read from 'read-file-utf8'
import write from 'write-file-utf8'

const defaultLocale = process.argv[2]

function flattenValuesFromTree (inputObject, baseKey) {
  const separator = '.'

  const outputObject = {}

  for (const [key, node] of Object.entries(inputObject)) {
    const flattenValue = `${baseKey ? `${baseKey}${separator}` : ''}${key}`

    if (typeof node === 'string') {
      outputObject[key] = flattenValue
    } else {
      outputObject[key] = {}

      const nestedValues = flattenValuesFromTree(node, flattenValue)

      for (const [nestedKey, nestedValue] of Object.entries(nestedValues)) {
        outputObject[key][nestedKey] = nestedValue
      }
    }
  }

  return outputObject
}

async function generateMessageIds () {
  const messages = await read(`${defaultLocale}.json`).then(JSON.parse)

  const flattenMessages = flattenValuesFromTree(messages)


  await write(
    'dist/messageIds.ts',
    `export default ${JSON.stringify(flattenMessages, null, 2)}`
  )
}

generateMessageIds()
