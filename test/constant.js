const testConfig = 'mongodb://james_test:password@ds121189.mlab.com:21189/spoiled-tomatillos-test';

const options = {
  server: {
    socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 },
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000
  }
};

module.exports = {
  testConfig,
  options,
};