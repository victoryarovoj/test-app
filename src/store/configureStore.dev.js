import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import common from '../locales/en/common'

 
const translationsObject = {
  en: {
    common: common
  },
  uk: {
    common: {
        "testKey1" : "Тестовий ключ 1",
        "testKey2" : "Тестовий ключ 2",
        "downloadJwsaByRef" : "Для роботи необхідно завантажити Java Web Start Application за посиланням",
        "clientForService": "Клієнт для \"Персональний сервіс ЕЦП\"",
        "titleCipherBis" : "ТОВ Сайфер БІС",
        "serviceNotConnected" : "З'єднання з сервісом відсутнє",
        "serviceConnected" : "З'єднання з сервісом встановлено",
        "personalDsService" : "\"Персональний сервіс ЕЦП\"",
        "anotherOperations" : "Інші операції",
        "verifyDs" : "Перевірити ЕЦП",
        "createDs" : "Накласти ЕЦП",
        "signatureCertificate" : "Сертифікат ключа ЕЦП",
        "encryptionCertificate" : "Сертифікат ключа шифрування",
        "keysGeneration" : "Генерація ключів",
        "encrypt" : "Шифрувати",
        "decrypt" : "Дешифрувати",
        "timestamp" : "Позначка часу",
        "file" : "Файл",
        "chooseFile" : "Вибрати файл",
        "changeFile" : "Змінити файл",
        "cleanup" : "Очистити",
        "cleanUpForm" : "Очистити форму",
        "textData" : "Текстові дані",
        "encoding" : "Кодування:",
        "utf16LeEncoding" : "UTF-16LE",
        "utf8Encoding" : "UTF-8",
        "dsTs" : "Позначка часу підпису",
        "dataTs" : "Позначка часу даних",
        "yesUCase" : "Так",
        "noUCase" : "Ні",
        "password" : "Пароль",
        "userName" : "Ім'я користувача",
        "loginWithKey" : "Вхід з ключем",
        "loginWithoutKey" : "Вхід без ключа",

        "kredobank" : "ПАТ КРЕДОБАНК",
        "signVerifyPageTitle" : "Перевірка та накладення ЕЦП",
        "encryptDecryptPageTitle" : "Шифрування",
        "keyGenerationPageTitle" : "Генерація ключів",

        "industrialbank" : "ПАТ ІНДУСТРІАЛБАНК",

        "signerServiceClient" : "Клієнт для \"Сервер ЕЦП\"",
        "cipherServiceClient" : "Клієнт для \"Сервер шифрування\""
    }
  }
}

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );
  syncTranslationWithStore(store)
  store.dispatch(loadTranslations(translationsObject));
  store.dispatch(setLocale('uk'));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
