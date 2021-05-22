import express from 'express';
import { Server, Socket } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
const ENV = new Map<string,string>();

if(process.env.NODE_ENV === 'dev'){
    dotenv.config({
        path: path.resolve(process.cwd(), 'env', ".env.dev")
    });
} else {
    dotenv.config({
        path: path.resolve(process.cwd(), 'env', ".env")
    });
}

ENV.set('front', path.resolve(process.cwd(), process.env.front));

const app = express();

app.use(cors());

app.use('/public', express.static(path.resolve(ENV.get('front'), 'dist')))

app.get('/', (req, res) => {
    console.log('왔음');
    res.redirect('/public/index.html');
});

const server = app.listen(4000);


const io = new Server(server);
io.of('/api').on('connection', socket => {
    console.log('연결 성공');
    socket.on('echo', e => {
        socket.emit('echo', {
            data : e.data,
            date : Date.now()
        });
    });
    socket.on('disconnect', e => {
        console.log('연결이 끊김');
    });
});