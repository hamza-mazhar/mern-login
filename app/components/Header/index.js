import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { Logout } from '../../containers/Logout';

function isUserLoggedIn() {
  return localStorage.getItem('login') === 'true';
}

function Header() {
  const userLoggedIn = isUserLoggedIn();
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      {userLoggedIn ? (
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          <HeaderLink onClick={Logout}>
            <FormattedMessage {...messages.logout} />
          </HeaderLink>
        </NavBar>
      ) : (
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          <HeaderLink to="/login">
            <FormattedMessage {...messages.login} />
          </HeaderLink>
          <HeaderLink to="/register">
            <FormattedMessage {...messages.register} />
          </HeaderLink>
        </NavBar>
      )}
    </div>
  );
}

export default Header;
