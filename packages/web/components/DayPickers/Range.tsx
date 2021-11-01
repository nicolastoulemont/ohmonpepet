import React, { useState, useEffect } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { useColorMode, chakra } from '@chakra-ui/react'
import { shadow, borderRadius } from 'theme/colors'
import { useI18n } from 'utils/hooks/useI18n'
import { localeUtils } from 'utils/dates'
import { motion } from 'framer-motion'

const MotionBox = chakra(motion.div)

interface RangeDayPickerProps {
	state: any
	setState: React.Dispatch<React.SetStateAction<any>>
	closeFn: () => void
	disabledDays?: Array<string>
	openTop?: boolean
	canChangeMonth?: boolean
}

export function RangeDayPicker({
	state,
	setState,
	closeFn,
	disabledDays = [],
	openTop,
	canChangeMonth = true
}: RangeDayPickerProps) {
	const { colorMode } = useColorMode()
	const { lang } = useI18n()
	const [internal, setInternal] = useState({
		from: null,
		to: null,
		enteredTo: null // Keep track of the last day for mouseEnter.
	})

	useEffect(() => {
		if (
			state &&
			state['startDate'] &&
			state['endDate'] &&
			internal['from'] !== new Date(state['startDate']) &&
			internal['to'] !== new Date(state['endDate'])
		) {
			setInternal({
				from: new Date(state['startDate']),
				to: new Date(state['endDate']),
				enteredTo: new Date(state['endDate'])
			})
		}
	}, [state])

	function isSelectingFirstDay(from, to, day) {
		const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
		const isRangeSelected = from && to
		return !from || isBeforeFirstDay || isRangeSelected
	}

	function handleDayClick(day, modifiers: any = {}) {
		if (modifiers.disabled) {
			handleResetClick()
			return
		}
		if (from && to && day >= from && day <= to) {
			handleResetClick()
			return
		}
		if (isSelectingFirstDay(from, to, day)) {
			setInternal({ from: day, to: null, enteredTo: null })
			setState({
				...state,
				startDate: new Date(day),
				endDate: null
			})
		} else {
			setInternal({ ...internal, to: day, enteredTo: day })
			setState({
				...state,
				endDate: new Date(day)
			})
			closeFn()
		}
	}

	function handleDayMouseEnter(day) {
		if (!isSelectingFirstDay(from, to, day)) {
			setInternal({ ...internal, enteredTo: day })
		}
	}

	function handleResetClick() {
		setInternal({
			from: null,
			to: null,
			enteredTo: null
		})
	}

	const { from, to, enteredTo } = internal
	const modifiers = { start: from, end: enteredTo }
	const selectedDays = [from, { from, to: enteredTo }]
	const disabledDates =
		disabledDays && disabledDays.length > 0
			? disabledDays.map((day) => new Date(day))
			: { before: from }

	return (
		<MotionBox
			position='absolute'
			display='flex'
			alignItems='center'
			justifyContent='center'
			zIndex={10}
			backgroundColor='white'
			boxShadow={shadow[colorMode]}
			p={[0, 4]}
			height='355px'
			width='315px'
			top={openTop ? '-325px' : '75px'}
			borderRadius={borderRadius}
			boxSizing='border-box'
			initial='pageInitial'
			animate='pageAnimate'
			variants={{
				pageInitial: {
					opacity: 0
				},
				pageAnimate: {
					opacity: 1
				}
			}}
		>
			<DayPicker
				className='Range'
				locale={lang}
				// @ts-ignore
				localeUtils={localeUtils}
				numberOfMonths={1}
				fromMonth={from}
				selectedDays={selectedDays}
				disabledDays={disabledDates}
				modifiers={modifiers}
				onDayClick={handleDayClick}
				onDayMouseEnter={handleDayMouseEnter}
				canChangeMonth={canChangeMonth}
			/>
			<style>{`

.DayPicker {
	display: inline-block;
	font-size: 1rem;
  }
  
  .DayPicker-wrapper {
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
  
  .DayPicker-Caption {
	display: table-caption;
	margin-bottom: 0.5em;
	padding: 0 0.5em;
	text-align: left;
  }
  
  .DayPicker-Caption > div {
	font-weight: 500;
	font-size: 1.15em;
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
	padding: 0.5em;
	border-radius: 50%;
	vertical-align: middle;
	text-align: center;
	cursor: pointer;
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
		</MotionBox>
	)
}
