const express = require('express');
const routes = require('./src/app');

const server = express();

server.use(routes);

function formatListener(address) {
	return address.address + ':' + address.port;
}

const listener = server.listen(process.env.PORT, () => {
	console.log('Now listening on', formatListener(listener.address());
});
