export function debounce(func: Function, wait: number) {
	let timeout: NodeJS.Timeout | null;

	return (...args: any[]) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}
