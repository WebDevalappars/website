const socket=io();

const form=document.getElementById('chat-form')
const messageInput=document.getElementById('msg')
const messageContainer=document.querySelector('.container')
var audio= new Audio('ting.mp3')
const name=prompt("Enter your name to join:")
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right')
    socket.emit('send-sports',message)
    messageInput.value=''
});

socket.emit('new-user-joined-sports',name);

socket.on('user-joined-sports',name=>{
    append(`${name} joined the chat`,'right')

})

socket.on('recieve-sports',data=>{
    append(`${data.name}: ${data.message}`,'left')
})



