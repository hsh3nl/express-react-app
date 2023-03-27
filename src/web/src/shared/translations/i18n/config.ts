import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
        returnNull: false;
    }
}

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    returnNull: false,
    resources: {
        en: {
            translations: require('./locales/en.json'),
        },
        bm: {
            translations: require('./locales/bm.json'),
        },
        jp: {
            translations: require('./locales/jp.json'),
        },
        zh: {
            translations: require('./locales/zh.json'),
        },
    },
    ns: ['translations'],
    defaultNS: 'translations',
});

i18n.languages = ['en', 'bm', 'jp', 'zh'];

export default i18n;
