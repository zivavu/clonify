/**
 * Formats milliseconds into a string representing minutes and seconds.
 *
 * @param milliseconds - The number of milliseconds to format.
 * @param useMinSecLiterals - Whether to use the words "min" and "sec" for the units.
 * @returns A string representing the formatted time.
 */
export function formatTime(
	milliseconds: number,
	useMinSecLiterals = false
): string {
	const minutes = Math.floor(milliseconds / 60000);
	const seconds = Math.floor((milliseconds % 60000) / 1000);

	const minutesString = useMinSecLiterals ? ' min ' : ':';
	const secondsString = useMinSecLiterals ? ' sec' : '';

	return `${minutes}${minutesString}${seconds
		.toString()
		.padStart(2, '0')}${secondsString}`;
}
