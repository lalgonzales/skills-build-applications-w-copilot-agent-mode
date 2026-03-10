// helper to construct the API URL
export function getApiUrl(path) {
  const cs = process.env.REACT_APP_CODESPACE_NAME;
  if (cs) {
    return `https://${cs}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
}

// legacy authenticated fetch helper
export function authFetch(url, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = options.headers || {};
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  return fetch(url, {...options, headers});
}
