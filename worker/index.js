const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPorts,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

const fib = (index) => index < 2 ? 1 : fib(index - 1) + fib(index - 2);

sub.on('message', (channel, message) => {
  redisClient.hSet('values', message, fib(parseInt(message)))
});

sub.subscribe('insert');
