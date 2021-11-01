import React, { useState, useEffect } from 'react'

export const useObjectState = <Object>(
	initialObject: Object
): [
	Object,
	React.Dispatch<React.SetStateAction<Object>>,
	(e: React.ChangeEvent<HTMLInputElement>) => void
] => {
	const [object, setObject] = useState<Object>(initialObject)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.persist()
		setObject(() => ({ ...object, [e.target.name]: e.target.value }))
	}

	return [object, setObject, handleChange]
}

export function useDimensions(ref?: React.MutableRefObject<any>) {
	const [width, setWidth] = useState(null)
	const [height, setHeight] = useState(null)

	function getDimensions() {
		if (ref?.current) {
			setWidth(ref.current.clientWidth)
			setHeight(ref.current.clientHeight)
		} else if (!ref) {
			if (window) {
				setWidth(window.innerWidth)
				setHeight(window.innerHeight)
			}
		}
	}

	function handleHotReload(event) {
		const message = event.data
		message?.payload?.payload?.hasOwnProperty('rendererID') && getDimensions()
	}

	useEffect(() => {
		if (window) {
			window.addEventListener('load', getDimensions)
			window.addEventListener('message', handleHotReload)
			window.addEventListener('resize', getDimensions)
		}
		return () => {
			if (window) {
				window.removeEventListener('load', getDimensions)
				window.removeEventListener('message', handleHotReload)
				window.removeEventListener('resize', getDimensions)
			}
		}
	}, [ref])

	return [width, height]
}
