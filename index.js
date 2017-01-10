const express = require('express');

const app = express();
app.use(express.static('public'))
app.set('view engine', 'pug')

// if (process.env.NODE_ENV != 'production') {
//   const webpackMiddleware = require('webpack-dev-middleware');
//   const webpack = require('webpack');
//   const webpackConfig = require('./webpack.config.js');
//   app.use( webpackMiddleware( webpack(webpackConfig), {
//     stats: {
//       colors: true
//     },
//   } ) );
// }

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000!');
});
