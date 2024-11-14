const fonts = {
	PretendardBold: 'Pretendard-Bold',
	PretendardSemiBold: 'Pretendard-SemiBold',
	PretendardMedium: 'Pretendard-Medium',
	PretendardRegular: 'Pretendard-Regular',
};

interface Font {
	family: string;
	size: number;
	height: number;
	letterSpacing: number;
	textDecoration?: string;
}

const FONT = ({ family, size, height, letterSpacing, textDecoration = 'none' }: Font): string => `
          font-family:${family};
          font-size:${size}rem;
          line-height:${height}%;
          letter-spacing: ${letterSpacing}%;
          text-decoration: ${textDecoration};
      `;
const font = {
	title01: FONT({
		family: fonts.PretendardMedium,
		size: 2.4,
		height: 100,
		letterSpacing: -3,
	}),

	title02: FONT({
		family: fonts.PretendardSemiBold,
		size: 2,
		height: 140,
		letterSpacing: -1,
	}),

	body01: FONT({
		family: fonts.PretendardMedium,
		size: 1.5,
		height: 140,
		letterSpacing: -1,
	}),

	body02: FONT({
		family: fonts.PretendardMedium,
		size: 1.5,
		height: 140,
		letterSpacing: -1,
	}),

	body03: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.4,
		height: 135,
		letterSpacing: -2,
	}),

	body04: FONT({
		family: fonts.PretendardRegular,
		size: 1.4,
		height: 135,
		letterSpacing: -1,
	}),

	body05: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -3,
	}),

	label01: FONT({
		family: fonts.PretendardSemiBold,
		size: 2.2,
		height: 100,
		letterSpacing: 0,
	}),

	label02: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.8,
		height: 100,
		letterSpacing: -4,
	}),

	label03: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.6,
		height: 100,
		letterSpacing: 0,
	}),

	label04: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.5,
		height: 100,
		letterSpacing: 0,
	}),

	label05: FONT({
		family: fonts.PretendardSemiBold,
		size: 1.4,
		height: 100,
		letterSpacing: 0,
	}),

	caption01: FONT({
		family: fonts.PretendardMedium,
		size: 1.4,
		height: 100,
		letterSpacing: -5,
	}),

	caption02: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -2,
	}),

	caption03: FONT({
		family: fonts.PretendardRegular,
		size: 1.2,
		height: 100,
		letterSpacing: -2,
		textDecoration: 'line-through',
	}),
};

export type FontsTypes = typeof font;
export default font;
