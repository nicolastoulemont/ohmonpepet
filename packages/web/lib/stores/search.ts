import create from 'zustand'
import { getFirstDayOfLastMonth } from 'utils/dates'

type RangePayload = {
	startDate: number | undefined
	endDate: number | undefined
}

type SortValue = 'ascending' | 'descending'

type SearchStore = {
	filterByService?: string
	sortKey?: string
	sortValue?: SortValue
	includeFinished?: boolean
	startDate: number | undefined
	endDate: number | undefined
	fns: {
		showAscending: () => boolean
		showDescending: () => boolean
		changeRange: (payload: RangePayload) => void
		changeIncluded: () => void
		changeSortValue: (value: SortValue) => void
		changeSortKey: (value: string) => void
		changefilterByService: (value: string) => void
	}
}

export const useOwnerStore = create<SearchStore>((set, get) => ({
	includeFinished: true,
	startDate: getFirstDayOfLastMonth(),
	endDate: new Date().getTime(),
	fns: {
		showAscending: () => get().sortKey && get().sortValue === 'ascending',
		showDescending: () => get().sortKey && get().sortValue === 'descending',
		changeRange: ({ startDate, endDate }: RangePayload) => set({ startDate, endDate }),
		changeIncluded: () => set({ includeFinished: !get().includeFinished }),
		changeSortValue: (value) => set({ sortValue: value }),
		changeSortKey: (value) => set({ sortKey: value }),
		changefilterByService: (value) => set({ filterByService: value })
	}
}))

export const useSitterStore = create<SearchStore>((set, get) => ({
	includeFinished: true,
	startDate: getFirstDayOfLastMonth(),
	endDate: new Date().getTime(),
	fns: {
		showAscending: () => get().sortKey && get().sortValue === 'ascending',
		showDescending: () => get().sortKey && get().sortValue === 'descending',
		changeRange: ({ startDate, endDate }: RangePayload) => set({ startDate, endDate }),
		changeIncluded: () => set({ includeFinished: !get().includeFinished }),
		changeSortValue: (value) => set({ sortValue: value }),
		changeSortKey: (value) => set({ sortKey: value }),
		changefilterByService: (value) => set({ filterByService: value })
	}
}))
