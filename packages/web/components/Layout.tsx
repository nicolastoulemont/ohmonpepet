import { Main } from './Main'
type Props = {
	maxWidth?: string
	headerFocusComponent?: React.ReactElement | null | undefined
}

export const Layout: React.FunctionComponent<Props> = ({
	children,
	maxWidth = '1250px',
	headerFocusComponent
}) => {
	return (
		<>
			<style jsx global>
				{`
					* {
						box-sizing: border-box;
					}

					html,
					body,
					#__next {
						min-height: 100vh;
						height: auto;
						width: 100%;
					}

					.marker-focus {
						z-index: 101;
					}
				`}
			</style>

			<Main maxWidth={maxWidth} headerFocusComponent={headerFocusComponent}>
				{children}
			</Main>
		</>
	)
}
