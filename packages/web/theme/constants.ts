import { isIOS } from 'react-device-detect'

export const MOBILE_DRAWER_CONTAINER_HEIGHT = isIOS ? 'calc(100vh - 120px)' : 'calc(100vh - 60px)'
export const MOBILE_DRAWER_HEADER_HEIGHT = isIOS ? 120 : 60
