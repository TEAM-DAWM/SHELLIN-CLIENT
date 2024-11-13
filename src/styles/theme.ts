import button from './buttonTheme';
import color from './color';
import font from './font';
import fontTheme from './fontTheme';
import palette from './palette';
import textButton from './textButtonTheme';

export const theme = {
	color,
	font,
	textButton,
	button,
	palette,
	fontTheme,
};

export type ThemeType = typeof theme;
