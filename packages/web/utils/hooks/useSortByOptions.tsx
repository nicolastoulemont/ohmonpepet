import { useI18n } from 'utils/hooks/useI18n'
import sortByOptions from 'statics/components/sortByOptions.json'

export function useSortByOptions() {
	const { t } = useI18n(sortByOptions)

	const options = [
		{
			key: '1',
			value: 'priceWithApplicationFee',
			text: t('price')
		},
		{
			key: '2',
			value: 'startDate',
			text: t('startDate')
		},
		{
			key: '3',
			value: 'endDate',
			text: t('endDate')
		}
	]

	return options
}
