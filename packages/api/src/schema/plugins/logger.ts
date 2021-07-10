import { plugin } from 'nexus'

export const OperationLoggerPlugin = plugin({
	name: 'OperationLoggerPlugin',
	onCreateFieldResolver() {
		return async (root, args, ctx, info, next) => {
			const startTimeMs = new Date().valueOf()
			const value = await next(root, args, ctx, info)
			const endTimeMs = new Date().valueOf()

			if (endTimeMs - startTimeMs > 5) {
				console.log(
					`${
						info?.operation?.name?.value
							? `${info.operation.operation} ${info?.operation?.name?.value}`
							: `Unamed ${info.operation.operation}`
					} took ${endTimeMs - startTimeMs} ms`
				)
			}
			return value
		}
	}
})
