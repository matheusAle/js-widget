import html from './message.html';
import './message.scss';

let elements = [];
let body;

export function show(configurations) {
    let temporary = document.createElement('div');
    temporary.innerHTML = html;

    const wrapper = temporary.getElementsByClassName('wp-contacts-widget')[0]

    // if (configurations.style) {
    //     Object.entries(configurations.style).forEach(([prop, value]) => {
    //         wrapper.style[prop] = value;
    //     });
    // }

    for (let contact of configurations.contacts) {

        let a = document.createElement('a');
        a.innerText = contact.name;
        a.classList.add('wp-contacts-widget__contact');
        a.href = `https://api.whatsapp.com/send?phone=${contact.phone}&=text=${encodeURI(contact.message)}`
        a.target = '_black';
        
        wrapper.appendChild(a);
    }


    body = document.getElementsByTagName('body')[0];

    elements.push(wrapper);
    body.appendChild(wrapper);

    console.log(wrapper.getClientRects(), wrapper.clientWidth, wrapper.scrollWidth);

    const width = wrapper.clientWidth;
    const openWidth = wrapper.scrollWidth + 15;
    let opened = false;

    const open = (e) => {
        console.log('open', opened);
        if (opened) return;

        opened = true;

        e.stopPropagation();

        wrapper.style.width = `${openWidth}px`

        document.addEventListener('click', close);
        document.addEventListener('scroll', close);
    };

    const close = (e) => {
        console.log('close', opened);
        if (!opened) return;

        opened = false;
        e.stopPropagation();
        wrapper.style.width = `${width}px`

        document.removeEventListener('click', close);
        document.removeEventListener('scroll', close);
    };

    wrapper.addEventListener('click', open);
    wrapper.addEventListener('mouseout', close);
    wrapper.addEventListener('mouseover', open);
}

export function close() {
    while (elements.length > 0) {
        elements.pop().remove();
    }
    body.removeEventListener('click', close);
}