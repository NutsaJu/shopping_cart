import enTrans from './en.json'
import kaTrans from './ka.json'
import i18n from 'i18next'
import { initReactI18next } from "react-i18next";


const resources = {
    en: {
        translation: enTrans
    },
    ka : {
        translation: kaTrans
    }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });