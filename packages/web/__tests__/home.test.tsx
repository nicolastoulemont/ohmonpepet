import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Index from '../pages/index'

afterEach(cleanup)

describe('App', () => {
	it('Render without crashing', () => {
		render(<Index species={[]} />)
		const index = renderer.create(<Index species={[]} />).toJSON()
		// expect(index).toMatchSnapshot()
		// expect(screen.getAllByRole('heading'))
	})
})
