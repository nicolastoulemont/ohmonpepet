import { SpeciesModel } from './index'
import { queryField, idArg, arg, nonNull } from 'nexus'
import { checkFields } from '@utils/checkFields'
import { withDates, getWhere, getSort } from '../shared'
import { notFound } from '@utils/errors'

export const speciesById = queryField('speciesById', {
	type: 'SpecieResponse',
	args: {
		id: nonNull(idArg()),
	},
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const specie = await SpeciesModel.findById(args.id)
			return { specie }
		} catch {
			return notFound()
		}
	},
})

export const species = queryField('species', {
	type: 'SpeciesResponse',
	args: {
		params: arg({
			type: 'ParamsInput',
		}),
	},
	async resolve(_, args) {
		try {
			const query = { ...getWhere(args.params) }
			const species = await SpeciesModel.find(query)
				.sort(getSort(args.params))
				.skip(args.params?.offset || 0)
				.limit(args.params?.limit || 0)

			return { species }
		} catch {
			return notFound()
		}
	},
})
export const searchSpecies = queryField('searchSpecies', {
	type: 'SpeciesResponse',
	args: {
		input: nonNull(
			arg({
				type: 'SearchInput',
			}),
		),
	},
	async resolve(_, args) {
		const { input } = args
		try {
			let search = { description: { $regex: new RegExp(input.search || '', 'i') } }

			const query = withDates(input, search, 'updatedAt')

			const species = await SpeciesModel.find(query)
				.sort({ updatedAt: input.sort || 'descending' })
				.limit(input.limit || 0)

			return { species }
		} catch {
			return notFound()
		}
	},
})
