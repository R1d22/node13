console.log('asdasd');
const socket = new WebSocket('ws://localhost:3000');

const formEl = document.forms.test;
formEl.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const formData = new FormData(ev.target);
    const num = formData.get('num')
    socket.send(num)
    //console.log('a')
});