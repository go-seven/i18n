import * as en from "./en.json"
import * as it from "./it.json"

export const defaultLocale = en.locale

export const config = {
  en,
  it,
}

export const locales = [
  {
    code: en.locale,
    name: "English",
  },
  {
    code: it.locale,
    name: "Italiano",
  }
]

export const localeCodes = locales.map(({ code }) => code)
export const localeNames = locales.map(({ name }) => name)
