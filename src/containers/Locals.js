import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import reducers from '../reducers';
import {en} from '../locales/en'
 
const translationsObject = {
  en: en,
  uk: {
    common: {
      {
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
};
 
const store =  createStore(
  combineReducers({
    ...reducers,
    i18n: i18nReducer
  }),
  applyMiddleware(thunk)
);
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('uk'));