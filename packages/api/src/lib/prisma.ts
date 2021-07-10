import { PrismaClient } from '@prisma/client'
import { __prod__ } from '../constants'

const prisma = __prod__ ? new PrismaClient() : new PrismaClient({ log: ['query', 'info'] })

export default prisma
