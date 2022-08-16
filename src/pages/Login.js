/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchEmailGravatarThunk } from '../actions';
import '../styles/login.css';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
    }

    // onclick para fazer a requisição à API
    handleClick = async () => {
      const { history, fetchToken } = this.props;
      const { email, name } = this.state;
      const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
      const response = await apiData.json();
      const { token } = response;
      localStorage.setItem('name', name);
      await fetchToken(email, name);
      localStorage.setItem('token', token);
      history.push('/game');
    };

    // handleChange para ver os inputs
    handleChange = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
    }

    validateBtn = () => {
      const { email, name } = this.state;
      let validation = true;
      if (email.length !== 0 && name.length !== 0) {
        validation = false;
      }
      return validation;
    }

    render() {
      const { name, email } = this.state;
      return (
        <main>
          <form>
            <h3>Login</h3>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              data-testid="input-player-name"
              value={ name }
              name="name"
              id="name"
              onChange={ this.handleChange }
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              data-testid="input-gravatar-email"
              value={ email }
              id="email"
              name="email"
              onChange={ this.handleChange }
            />
            <div className="btns">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ this.validateBtn() }
                onClick={ this.handleClick }
                id="play"
                className="play"
              >
                Play
              </button>
              <Link to="/settings">
                <span
                  data-testid="btn-settings"
                  className="settings material-symbols-outlined"
                >
                  settings
                </span>
              </Link>
            </div>
          </form>
        </main>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (email, name) => { dispatch(fetchEmailGravatarThunk(email, name)); },
});

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  // nameRedux: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);