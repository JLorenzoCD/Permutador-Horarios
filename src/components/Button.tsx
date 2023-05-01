import type { ButtonHTMLAttributes } from 'react';

import { themeButton } from '../utils/components/Button';

import type { IButtonTheme, IButtonColors } from '../types/Button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: IButtonTheme;
	color?: IButtonColors;
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
