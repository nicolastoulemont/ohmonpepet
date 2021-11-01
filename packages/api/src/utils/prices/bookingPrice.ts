import { getPercentage, getIntervalDaysAsStrings } from '../index'

interface BookingPriceParams {
	coreServicePrice: number
	startDate: string
	endDate: string
	selectedOptions?: any
}

const SERVICE_FEE_PERCENTAGE = Number(process.env.SERVICE_FEE_PERCENTAGE) || 8

export async function useBookingPrice({
	coreServicePrice,
	startDate,
	endDate,
	selectedOptions = []
}: BookingPriceParams) {
	const selectedDays = getIntervalDaysAsStrings(startDate, endDate)

	let totalWithoutApplicationFee = coreServicePrice * selectedDays.length
	selectedOptions.forEach((option: any) => (totalWithoutApplicationFee += option.price))

	const applicationFeeAmount =
		Math.round(
			(getPercentage(totalWithoutApplicationFee, SERVICE_FEE_PERCENTAGE) + Number.EPSILON) *
				100
		) / 100

	return {
		priceWithOutApplicationFee: totalWithoutApplicationFee,
		applicationFeeAmount
	}
}
