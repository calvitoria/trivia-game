// import Login from "../../pages/Login";
import App from "../../App";
import React from "react";
import { Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import rootReducer from "../../reducer";
import { legacy_createStore as createStore } from 'redux';
import userEvent from "@testing-library/user-event";
import Feedback from "../../pages/Feedback";


describe(
  'Testa o componente Login', () => {
    beforeEach(() => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <Feedback />
            </Router>
          </Provider>,
        );
      });
    test(
      'Ao carregar a página, a imagem de perfil (gravatar) deve ser mostrada', () => {
        const image = screen.getByAltText(/seu gravatar/i);
        expect(image).toBeInTheDocument();
      }
    );

    test(
        'Ao carregar a página, o nome do jogador deve ser mostrado', () => {
          const image = screen.getByAltText(/seu gravatar/i);
          expect(image).toBeInTheDocument();
        }
    );

    test(
        'O componente que conta os pontos do jogador está na tela', () => {
          const score = screen.getByTestId(/header-score/i);
          expect(score).toBeInTheDocument();
        }
    );

    test(
        'Ao clicar no botão "Play Again" o usuário é redirecionado à rota "/"', () => {
            const playAgain = screen.getByRole('button', { name: /play/i });
            userEvent.click(playAgain);
            expect(history.location.pathname).toBe('/game');
        }
    );

  }
)