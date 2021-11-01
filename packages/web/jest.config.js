module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
	},
	transform: {
		'^.+\\.(js|ts|tsx)$': 'ts-jest',
		'^.+\\.(scss|css)$': '<rootDir>/config/jest/cssTransform.js'
	},
	testMatch: ['**/__tests__/*.(ts|tsx)'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	roots: ['<rootDir>'],
	modulePaths: ['<rootDir>'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json'
		}
	}
}
