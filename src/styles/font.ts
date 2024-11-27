const fonts = {
	PretendardBold: 'Pretendard-Bold, -apple-system, Helvetica, Arial, sans-serif',
	PretendardSemiBold: 'Pretendard-SemiBold, -apple-system, Helvetica, Arial, sans-serif',
	PretendardMedium: 'Pretendard-Medium, -apple-system, Helvetica, Arial, sans-serif',
	PretendardRegular: 'Pretendard-Regular, -apple-system, Helvetica, Arial, sans-serif',
};

interface Font {
	family: string;
	size: number;
	height: number;
	letterSpacing: number;
	fontWeight: number;
	textDecoration?: string;
}

const FONT = ({ family, size, height, letterSpacing, fontWeight, textDecoration = 'none' }: Font): string => `
	font-family: ${family};
	font-size: ${size}rem;
	line-height: ${height}%;
	letter-spacing: ${letterSpacing}%;
	font-weight: ${fontWeight};
	text-decoration: ${textDecoration};
`;

const font = {
	title01: FONT({
		family: fonts.PretendardMedium,
		size: 2.4,
		height: 100,
		letterSpacing: -3,
		fontWeight: 500,
	}),

	title02: FONT({
		family: fonts.PretendardSemiBold,
		size: 2,
		height: 140,
		letterSpacing: -1,
		fontWeight: 600,
	}),

	body01: FONT({
		family: fonts.PretendardMedium,
		size: 1.5,
		height: 140,
		letterSpacing: -1,
		fontWeight: 500,
	}),

	body02: FONT({
		family: fonts.PretendardMedium,
		size: 1.5,
		height: 140,
		letterSpacing: -1,
		fontWeight: 500,
	}),

	body03: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.4,
		height: 135,
		letterSpacing: -2,
		fontWeight: 600,
	}),

	body04: FONT({
		family: fonts.PretendardRegular,
		size: 1.4,
		height: 135,
		letterSpacing: -1,
		fontWeight: 400,
	}),

	body05: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -3,
		fontWeight: 500,
	}),

	label01: FONT({
		family: fonts.PretendardSemiBold,
		size: 2.2,
		height: 100,
		letterSpacing: 0,
		fontWeight: 600,
	}),

	label02: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.8,
		height: 100,
		letterSpacing: -4,
		fontWeight: 600,
	}),

	label03: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.6,
		height: 100,
		letterSpacing: 0,
		fontWeight: 600,
	}),

	label04: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.5,
		height: 100,
		letterSpacing: 0,
		fontWeight: 600,
	}),

	label05: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.4,
		height: 100,
		letterSpacing: 0,
		fontWeight: 600,
	}),

	caption01: FONT({
		family: fonts.PretendardMedium,
		size: 1.4,
		height: 100,
		letterSpacing: -5,
		fontWeight: 500,
	}),

	caption02: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -2,
		fontWeight: 400,
	}),

	caption03: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -2,
		fontWeight: 400,
		textDecoration: 'line-through',
	}),
};

export type FontsTypes = typeof font;
export default font;
