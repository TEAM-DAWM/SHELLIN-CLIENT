import color from './color';

const colorToken = {
	Primary: {
		normal: color.Blue.Blue6,
		strong: color.Blue.Blue7,
		heavy: color.Blue.Blue8,
		strongVariant: color.Blue.Blue2,
		heavyVariant: color.Blue.Blue3,
	},
	Neutral: {
		normal: color.Grey.White,
		strong: color.Grey.Grey2,
		heavy: color.Grey.Grey3,
		accent: color.Grey.Grey4,
		light: color.Grey.Grey8,
	},
	Text: {
		primary: color.Blue.Blue7,
		primaryVariant: color.Blue.Blue3,
		neutralDark: color.Grey.White,
		neutralLight: color.Grey.Grey8,
		assistive: color.Grey.Grey6,
		assistiveLight: color.Grey.Grey5,
		disable: color.Grey.Grey4,
	},
	Outline: {
		primaryNormal: color.Blue.Blue4,
		primaryStrong: color.Blue.Blue7,
		neutralNormal: color.Grey.Grey3,
		neutralStrong: color.Grey.Grey4,
	},
	Divider: {
		neutral: color.Grey.Grey4,
		primary: color.Blue.Blue3,
	},
	Component: {
		normal: color.Grey.White,
		strong: color.Blue.Blue2,
		heavy: color.Blue.Blue3,
		accent: color.Blue.Blue4,
		assistive: color.Blue.Blue1,
	},
	Icon: {
		normal: color.Grey.Grey5,
		strong: color.Grey.Grey7,
		heavy: color.Grey.Grey8,
		primary: color.Blue.Blue7,
		inverse: color.Grey.White,
	},
};

export default colorToken;
