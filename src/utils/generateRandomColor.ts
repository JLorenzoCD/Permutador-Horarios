export default function generateRandomColor() {
	// const r = Math.floor(Math.random() * 256);
	// const g = Math.floor(Math.random() * 256);
	// const b = Math.floor(Math.random() * 256);

	// const rgbColor = `rgb(${r},${g},${b})`;

	// return rgbColor;

	const maxVal = 0xffffff; // 16777215
	const randomNumber = Math.floor(Math.random() * maxVal).toString(16);
	const randColor = randomNumber.padStart(6, '0');

	const hexColor = `#${randColor.toUpperCase()}`;
	return hexColor;
}
