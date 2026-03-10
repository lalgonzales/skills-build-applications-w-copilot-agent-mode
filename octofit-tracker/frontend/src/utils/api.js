// helper to construct the API URL
export function getApiUrl(path) {
  // If we're running inside a GitHub Codespace, the frontend hostname
  // looks like "<name>-3000.app.github.dev".  Build the backend
  // equivalent by swapping the port segment for 8000.
  const host = window.location.host;
  let url;
  if (host.endsWith('.app.github.dev')) {
    const base = host.replace(/-3000(?=\.app\.github\.dev$)/, '-8000');
    url = `${window.location.protocol}//${base}${path}`;
  } else {
    // otherwise assume local development on port 8000
    url = `http://localhost:8000${path}`;
  }
  console.log('Resolved API URL for', path, '=>', url);
  return url;
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
