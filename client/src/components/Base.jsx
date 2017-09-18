import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import FontAwesome from 'react-fontawesome';

const styles = {
    icon: {
        marginRight: 15,
    }
};

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/"><FontAwesome name='cutlery' style={styles.icon} />Comparte Tu Mesa</IndexLink>
      </div> 

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Cerrar sesión</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/signup">Crear cuenta</Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
