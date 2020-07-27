import React from "react";

export const LoginContext = React.createContext({
  isAuthenticated: false,
  authenticatedUser: null,
  login: () => {},
  logout: () => {},
  session: () => {}
});

export default LoginContext;