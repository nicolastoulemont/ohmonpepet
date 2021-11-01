import React, { useState } from 'react'
import DayPicker from 'react-day-picker'
import { FormControl, FormLabel, Box } from '@chakra-ui/react'
import {
	Select,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody
} from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { localeUtils } from 'utils/dates'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'

interface UniqueDayPickerMobileProps {
	state: any
	setState: React.Dispatch<React.SetStateAction<any>>
	setErrors?: React.Dispatch<React.SetStateAction<any>> | undefined
	closeFn: () => void
	name: string
	isDrawerOpen: boolean
	onDrawerClose: () => void
	label: string
}

const maxDateInPast = 1940
const currentYear = new Date().getFullYear()
const fromMonth = new Date(maxDateInPast, 0)
const currentYearMonth = new Date(currentYear, 0)
const toMonth = new Date(currentYear + 10, 11)

function YearMonthForm({ date, localeUtils, onChange, locale }) {
	const months = localeUtils.getMonths(locale)

	const years = []
	for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
		years.push(i)
	}

	function handleChange(e) {
		const { year, month } = e.target.form
		onChange(new Date(year.value, month.value))
	}

	return (
		<Box
			mb={6}
			display='table-caption'
			fontWeight={500}
			fontSize='1.15em'
			textAlign='left'
			as='form'
		>
			<Select name='month' onChange={handleChange} value={date.getMonth()} size='md' mb={3}>
				{months.map((month, i) => (
					<option key={month} value={i}>
						{month}
					</option>
				))}
			</Select>
			<Select name='year' onChange={handleChange} value={date.getFullYear()} size='md'>
				{years.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</Select>
		</Box>
	)
}

const DRAWER_HEADER_HEIGHT = 56

export function UniqueDayPickerMobile({
	state,
	setState,
	setErrors,
	closeFn,
	name,
	isDrawerOpen,
	onDrawerClose,
	label
}: UniqueDayPickerMobileProps) {
	const [internal, setInternal] = useState({
		selectedDay: null,
		month: currentYearMonth
	})
	const { lang } = useI18n()

	function handleDayClick(day) {
		setInternal({ ...internal, selectedDay: day })
		setState({
			...state,
			[name]: new Date(day).getTime()
		})
		setErrors && setErrors((errors) => ({ ...errors, [name]: undefined }))
		closeFn()
	}

	function handleYearMonthchange(month) {
		setInternal({ ...internal, month })
	}

	const isClient = typeof window !== 'undefined'
	const maxWeekWidth = isClient ? window.innerWidth - 24 : undefined
	const dayDimensions = isClient ? maxWeekWidth / 7 : undefined

	return (
		<>
			<Drawer isOpen={isDrawerOpen} placement='bottom' onClose={onDrawerClose}>
				<DrawerOverlay>
					<DrawerContent
						width='100%'
						height={MOBILE_DRAWER_CONTAINER_HEIGHT}
						borderTopRadius='25px'
					>
						<FormControl height={MOBILE_DRAWER_CONTAINER_HEIGHT}>
							<DrawerHeader
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								px={4}
								py={3}
							>
								<FormLabel>{label}</FormLabel>
								<DrawerCloseButton />
							</DrawerHeader>
							<DrawerBody
								p={3}
								height={`calc(100vh - ${
									DRAWER_HEADER_HEIGHT + MOBILE_DRAWER_HEADER_HEIGHT
								}px)`}
								overflowY='auto'
							>
								<DayPicker
									className='Range'
									locale={lang}
									// @ts-ignore
									localeUtils={localeUtils}
									numberOfMonths={1}
									month={internal.month}
									fromMonth={toMonth}
									toMonth={toMonth}
									selectedDays={[internal.selectedDay]}
									onDayClick={handleDayClick}
									onDayKeyDown={(_, __, event) =>
										event.key === 'Tab' ? closeFn() : null
									}
									// @ts-ignore
									captionElement={({ date, localeUtils }) => (
										<YearMonthForm
											date={date}
											localeUtils={localeUtils}
											onChange={handleYearMonthchange}
											locale={lang}
										/>
									)}
								/>
							</DrawerBody>
						</FormControl>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
			<style>{`

	.DayPicker {
		width:100%;
		height:auto;
		display: inline-block;
		font-size: 1rem;
	}
  
  .DayPicker-wrapper {
	width:100%;
	height:auto;
	position: relative;
	flex-direction: row;
	padding-bottom: 1em;
  
	-webkit-user-select: none;
  
	   -moz-user-select: none;
  
		-ms-user-select: none;
  
			user-select: none;
  }
  
  .DayPicker-Months {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
  }
  
  .DayPicker-Month {
	display: table;
	margin: 0 1em;
	margin-top: 1em;
	border-spacing: 0;
	border-collapse: collapse;
  
	-webkit-user-select: none;
  
	   -moz-user-select: none;
  
		-ms-user-select: none;
  
			user-select: none;
  }
  
  .DayPicker-NavBar {
  }
  
  .DayPicker-NavButton {
	position: absolute;
	top: 1em;
	right: 1.5em;
	left: auto;
  
	display: inline-block;
	margin-top: 2px;
	width: 1.25em;
	height: 1.25em;
	background-position: center;
	background-size: 50%;
	background-repeat: no-repeat;
	color: #8B9898;
	cursor: pointer;
  }
  
  .DayPicker-NavButton:hover {
	opacity: 0.8;
  }
  
  .DayPicker-NavButton--prev {
	margin-right: 1.5em;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
  }
  
  .DayPicker-NavButton--next {
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
  }
  
  .DayPicker-NavButton--interactionDisabled {
	display: none;
  }
   
  .DayPicker-Weekdays {
	display: table-header-group;
	margin-top: 1em;
  }
  
  .DayPicker-WeekdaysRow {
	display: table-row;
  }
  
  .DayPicker-Weekday {
	display: table-cell;
	padding: 0.5em;
	color: #8B9898;
	text-align: center;
	font-size: 0.875em;
  }
  
  .DayPicker-Weekday abbr[title] {
	border-bottom: none;
	text-decoration: none;
  }
  
  .DayPicker-Body {
	display: table-row-group;
  }
  
  .DayPicker-Week {
	display: table-row;
  }
  
  .DayPicker-Day {
	display: table-cell;
	border-radius: 50%;
	vertical-align: middle;
	text-align: center;
	cursor: pointer;
	width: ${dayDimensions}px;
	height: ${dayDimensions}px;
  }
  
  .DayPicker-WeekNumber {
	display: table-cell;
	padding: 0.5em;
	min-width: 1em;
	border-right: 1px solid #EAECEC;
	color: #8B9898;
	vertical-align: middle;
	text-align: right;
	font-size: 0.75em;
	cursor: pointer;
  }
  
  .DayPicker--interactionDisabled .DayPicker-Day {
	cursor: default;
  }
  
  .DayPicker-Footer {
	padding-top: 0.5em;
  }
  
  .DayPicker-TodayButton {
	border: none;
	background-color: transparent;
	background-image: none;
	box-shadow: none;
	color: #4A90E2;
	font-size: 0.875em;
	cursor: pointer;
  }
  
  /* Default modifiers */
  
  .DayPicker-Day--today {
	color: #D0021B;
	font-weight: 700;
  }
  
  .DayPicker-Day--outside {
	color: #8B9898;
	cursor: default;
  }
  
  .DayPicker-Day--disabled {
	color: #DCE0E0;
	cursor: default;
	/* background-color: #eff1f1; */
  }
  
  /* Example modifiers */
  
  .DayPicker-Day--sunday {
	background-color: #F7F8F8;
  }
  
  .DayPicker-Day--sunday:not(.DayPicker-Day--today) {
	color: #DCE0E0;
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
	position: relative;
	background-color: #4A90E2;
	color: #F0F8FF;
	border-radius: 100%;
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
	background-color: #51A0FA;
  }
  
  .DayPicker:not(.DayPicker--interactionDisabled)
	.DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
	background-color: #F0F8FF;
  }
  
  /* DayPickerInput */
  
  .DayPickerInput {
	display: inline-block;
  }
  
  .DayPickerInput-OverlayWrapper {
	position: relative;
  }
  
  .DayPickerInput-Overlay {
	position: absolute;
	left: 0;
	z-index: 1;
  
	background: white;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
  
  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Range .DayPicker-Day {
    border-radius: 0 !important;
  }
`}</style>
		</>
	)
}
