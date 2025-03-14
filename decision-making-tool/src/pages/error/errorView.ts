export function errorView() {
  const main = document.createElement('main');
  const heading = document.createElement('h1');
  heading.textContent = '404 - Page Not Found';
  main.appendChild(heading);

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.body.appendChild(main);
}
