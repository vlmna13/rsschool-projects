export function switchTheme(event) {
    const bamboo = document.querySelector('.bamboo');
    const paifang = document.querySelector('.paifang');
    bamboo.classList.remove('active');
    paifang.classList.remove('active');
    event.target.classList.add('active');
    const body = document.querySelector('body');
    if(event.target.classList[0] === 'bamboo'){
        body.classList.remove('green');
        body.classList.add('black');
    } else {
        body.classList.remove('black');
        body.classList.add('green');
    }
}


// 274649
// 597b7d