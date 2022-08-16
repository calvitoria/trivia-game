// import Login from "../../pages/Login";
import App from "../../App";
import React, { useReducer } from "react";
import { Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import rootReducer from "../../reducer";
import { legacy_createStore as createStore } from 'redux';
import userEvent from "@testing-library/user-event";


describe(
  'Testa o componente Login', () => {
    test(
      'Ao renderizar a tela os Inputs são mostrados', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const name = screen.getByPlaceholderText('name');
        const email = screen.getByPlaceholderText('email');

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
      }
    );
    test(
      'Ao renderizar a tela os Botões são mostrados', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const play = screen.getByRole('button', {
          name: /play/i
        })
        const settings = screen.getByRole('button', {
          name: /settings/i
        })

        expect(play).toBeInTheDocument();
        expect(settings).toBeInTheDocument();
      }
    );

    test(
      'O usuário consegue digitar nos inputs', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const name = screen.getByPlaceholderText('name');
        const email = screen.getByPlaceholderText('email');
        userEvent.type(name, 'sandy');
        expect(name).toHaveValue('sandy');

        userEvent.type(email, 'sandy@betrybe.com');
        expect(email).toHaveValue('sandy@betrybe.com');
      }
    );

    test(
      'Ao clicar no botão Play o fetch é chamado', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const token = 'aisjgdporepwrwejkfdnmdfkmsdlk256955'
        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(token) });
        
        const play = screen.getByRole('button', {
          name: /play/i
        });

        userEvent.click(play);
        expect(global.fetch).toHaveBeenCalled();   
        
      }
    );


    test(
      'Ao entrar na página o botão "Play" deve estar desabilitado', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const play = screen.getByRole('button', { name: /play/i });
        expect(play).toHaveAttribute('disabled');
      }
    );

    test(
      'Ao clicar no botão "Play" o usuário é redirecionado à pg "/game"', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const name = screen.getByPlaceholderText('name');
        const email = screen.getByPlaceholderText('email');
        userEvent.type(name, 'sandy');
        userEvent.type(email, 'sandy@betrybe.com');
        const play = screen.getByRole('button', { name: /play/i });
        userEvent.click(play);
        expect(history.location.pathname).toBe('/game');
      }
    )

    test(
      'Ao clicar no botão "Settings" o usuário é redirecionado à pg "/settings"', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const settings = screen.getByRole('button', { name: /settings/i });
        userEvent.click(settings);
        expect(history.location.pathname).toBe('/settings');
      }
    );
    

    test(
      'Ao renderizar a página o usuário está na url terminada em "/"', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );        
        expect(history.location.pathname).toBe('/');
      }
    )

    test(
      'Ao clicar no botão "Settings" o usuário é redirecionado à pg "/settings"', () => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <App />
            </Router>
          </Provider>,
        );

        const image = screen.getByAltText(/logo/i);
        expect(image).toBeInTheDocument();
      }
    )
    
  }
)