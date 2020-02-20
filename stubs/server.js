const hotClient = require('webpack-hot-client');
const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('../webpack.config');
const app = require('../stubs');
const compiler = webpack(config);
const { publicPath } = config.output;

const client = hotClient(compiler, {});
const { server } = client;
server.on('listening', () => {
 app.use(middleware(compiler, { publicPath }));
});