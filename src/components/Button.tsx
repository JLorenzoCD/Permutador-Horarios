import type { ButtonHTMLAttributes } from 'react';

import { themeButton } from '../utils/components/Button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'default' | 'outline';
	color?: 'blue' | 'red' | 'purple' | 'yellow' | 'green' | 'light' | 'dark';
}
function Button({ className, theme = 'default', color = 'blue', ...props }: Props) {
	let buttonStyles = 'font-bold py-2 px-4 rounded mr-2 mb-2';

	if (theme === 'outline') {
		buttonStyles += ` ${className} ${themeButton.outline.styleBase} ${themeButton.outline[color]}`;
	} else {
		buttonStyles += ` ${className} ${themeButton.default[color]}`;
	}

	return <button className={buttonStyles} {...props} />;
}

export default Button;
