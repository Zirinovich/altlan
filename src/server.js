import express  from 'express';
import * as bodyParser from 'body-parser';
import React    from 'react';
import ReactDom from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from './routes';

import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';

const app = express();

app.use((req, res) => {
    const store = configureStore();
    const state = store.getState(); // функция возвращает актуальное глобальное состояние хранилища

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => { // функция match принимает в качестве первого параметра JavaScript объект с ключами routes и location { routes: routes, location: req.url}
        if (redirectLocation) { // Если необходимо сделать redirect
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) { // Произошла ошибка любого рода
            return res.status(500).send(error.message);
        }

        if (!renderProps) { // Мы не определили путь, который бы подошел для URL
            return res.status(404).send('Not found');
        }

        const componentHTML = ReactDom.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        return res.end(renderHTML(componentHTML, state)); // вторым параметром передаем состояние текущего store (серверный рендер)
    });

});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : '/';

function renderHTML(componentHTML, initialState) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <div id="dev-tools"></div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
