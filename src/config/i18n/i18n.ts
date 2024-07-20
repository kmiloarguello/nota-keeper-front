import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translation/en.json';
import fr from './translation/fr.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
