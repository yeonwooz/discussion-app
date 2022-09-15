const { localStorage } = window;

function setItem(key, value) {
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

function getItem(key) {
  return localStorage.getItem(key);
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}
