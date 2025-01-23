import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Icons from '@/assets/svg/V1/index';
import { theme } from '@/styles/theme';
import checkDateFormat from '@/utils/checkDateFormat';
import checkTimeFormat from '@/utils/checkTimeFormat';
import dotFormatDate from '@/utils/dotFormatDate';
import dotFormatTime from '@/utils/dotFormatTime';
import { blurRef, focusRef, warnRef } from '@/utils/refStatus';

interface TextboxInputProps {
	variant: 'date' | 'time' | 'smallDate';
	onDateChange?: (date: Date | null) => void;
	onTimeChange?: (time: string | null) => void;
	dateTextRef?: React.RefObject<HTMLInputElement>;
	placeholder?: string;
	currentTime?: string | null;
}
function TextboxInput({
	variant,
	onDateChange,
	onTimeChange,
	dateTextRef,
	placeholder,
	currentTime,
}: TextboxInputProps) {
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const formattedInput = variant === 'time' ? dotFormatTime(value) : dotFormatDate(value);
		e.target.value = formattedInput;
		if (dateTextRef) focusRef(dateTextRef);
		if (formattedInput && formattedInput.length > (variant === 'time' ? 4 : 9)) {
			const isValid = variant === 'time' ? checkTimeFormat(formattedInput) : checkDateFormat(formattedInput);
			if (!isValid && dateTextRef) {
				// 유효하지 않음
				warnRef(dateTextRef);
				// 유효하지 않은 경우 인풋 삭제
				e.target.value = '';
			} else if ((variant === 'date' || variant === 'smallDate') && onDateChange) {
				// 유효하고 date 인 경우
				const valueDate = new Date(formattedInput);
				if (dateTextRef) blurRef(dateTextRef);
				onDateChange(valueDate);
			} else if (dateTextRef) {
				// 유효하고 time 인 경우
				blurRef(dateTextRef);
				if (onTimeChange) onTimeChange(e.target.value);
			}
		}
	};
	return (
		<InputContainer variant={variant} ref={dateTextRef}>
			{variant === 'time' && <ClockIcon />}
			<StyledInput
				type="text"
				placeholder={variant === 'time' ? '시간 없음' : placeholder}
				maxLength={10}
				variant={variant}
				onChange={handleDateChange}
				defaultValue={currentTime ?? undefined}
			/>
		</InputContainer>
	);
}
const smallDateStyle = css`
	width: 7.5rem;
	padding: 0;
`;
const smallDateInputStyle = css`
	padding: 0;

	text-align: center;

	&:focus {
		outline: solid 1px ${theme.palette.Primary};
	}
`;
const InputContainer = styled.div<{ variant: 'date' | 'time' | 'smallDate' }>`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	box-sizing: border-box;
	width: 15.4rem;
	height: 2.6rem;
	padding: 0.3rem 1rem;

	background-color: ${({ theme }) => theme.palette.Grey.Grey1};
	border-radius: 8px;

	${({ variant }) => variant === 'smallDate' && smallDateStyle}
`;
const StyledInput = styled.input<{ variant: 'date' | 'time' | 'smallDate' }>`
	width: 100%;
	height: 100%;

	${({ theme }) => theme.fontTheme.CAPTION_01};
	background-color: transparent;
	border: none;
	border-radius: 8px;

	&:focus {
		outline: none;
	}

	${({ variant }) => variant === 'smallDate' && smallDateInputStyle}
`;

const ClockIcon = styled(Icons.Icn_clock)`
	width: 1.4rem;
	height: 1.4rem;
`;

export default TextboxInput;
