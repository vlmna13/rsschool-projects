export function wheelView(main: HTMLElement) {
  while (main.children.length > 1) {
    main.removeChild(main.lastChild!);
  }
  main.classList.remove('main-home-container');
  main.className = 'main-wheel-container';
}
