export function switchTheme(event) {
    const bamboo = document.querySelector('.bamboo');
    const paifang = document.querySelector('.paifang');
    const sound = document.querySelector('.sound');
    bamboo.classList.remove('active');
    paifang.classList.remove('active');
    event.target.classList.add('active');
    const body = document.querySelector('body');
    if(event.target.classList[0] === 'bamboo'){
        body.classList.remove('green');
        body.classList.add('black');
        sound.classList.remove('active');
    } else {
        body.classList.remove('black');
        body.classList.add('green');
        sound.classList.add('active');
    }
}
