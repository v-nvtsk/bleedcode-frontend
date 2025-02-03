// файл vue.config.js должен быть расположен в корневом каталоге проекта

export default {publicPath: process.env.NODE_ENV === 'production'
  ? '/bleedcode-frontend/'
  : '/'};
