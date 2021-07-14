import { PubSub } from 'apollo-server-express'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'
import { __prod__ } from '../constants'

// Redis config src: https://github.com/davidyaha/graphql-redis-subscriptions
const options = {
	host: '127.0.0.1',
	port: 6379,
	retryStrategy: (times: number) => Math.min(times * 50, 2000)
}

export const pubsub = __prod__
	? new RedisPubSub({
			publisher: new Redis(options),
			subscriber: new Redis(options)
	  })
	: new PubSub()
