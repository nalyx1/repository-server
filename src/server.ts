import server from './app';

server.listen(process.env.PORT || 5000, () => {
    console.log('Server listening');
});
