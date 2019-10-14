// Setup config with token - helper function

// eslint-disable-next-line import/prefer-default-export
export const tokenConfig = (getState) => {
  // Get token from state
  const {
    token,
  } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // if token, add to headers config
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    if (getState().auth.user) {
      config.headers.userid = getState().auth.user._id;
    }
  }

  return config;
};
