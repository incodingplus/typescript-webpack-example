import { io } from 'socket.io-client';
import { Shape, Cal } from './module';
const $:typeof document.querySelector = document.querySelector.bind(document);
const $$:typeof document.querySelectorAll = document.querySelectorAll.bind(document);
const inp = $<HTMLInputElement>('input');
const btn = $<HTMLButtonElement>('#btn');
const res = $<HTMLDivElement>('#res');
const socket = io('/api');

btn.addEventListener('click', e => {
    console.log('보내기');
    socket.emit('echo', {
        data:inp.value
    });
});


// const arr:{x:number, y:number}[] = [
//     { x: 10, y: 20 },
//     { x: 20, y: 30 }
// ];

const arr:Shape[] = [
    { x: 10, y: 20 },
    { x: 20, y: 30 }
];

// let add:(a:number, b:number)=>number;

// add = (a, b) => {
//     return a + b;
// };

// const add = (a:number, b:number):number => {
//     return a + b;
// } 

const add:Cal = (a, b) => {
    return a + b;
};

for(let i of arr){
    console.log(add(i.x, i.y));
}

socket.on('echo', e => {
    const div = document.createElement('div');
    div.textContent = `${new Date(e.date).toLocaleString()} : ${e.data}`;
    res.appendChild(div);
});