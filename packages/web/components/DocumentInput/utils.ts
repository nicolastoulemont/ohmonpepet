import { format } from 'date-fns'
// Convert a Base64-encoded string to a File object
export function base64StringtoFile(base64String: string, filename: string) {
	let arr = base64String.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, { type: mime })
}

// Download a Base64-encoded file
export function downloadBase64File(base64Data: string, filename: string) {
	let link = document.createElement('a')
	link.setAttribute('href', base64Data)
	link.setAttribute('download', filename)
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data: string) {
	return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

export function formatFileName(filename) {
	const date = format(new Date(), 'dd-MM-yyyy')
	const randomString = Math.random().toString(36).substring(2, 15)
	const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
	const newFileName = `${date}_${randomString}_${cleanFileName}`
	return newFileName.substring(0, 60)
}
