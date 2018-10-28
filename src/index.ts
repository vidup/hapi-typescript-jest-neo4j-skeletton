import 'dotenv/config';
import Hapi from 'hapi';

import routes from './routes';

// Create a server with a host and port
const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});

server.route(routes);

(async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
