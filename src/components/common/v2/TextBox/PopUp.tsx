import styled from '@emotion/styled';
import { useState } from 'react';

import Icon from '../../Icon';

import { theme } from '@/styles/theme';

const TYPE = {
	TITLE: 'title',
	DESC: 'description',
} as const;

const STATE = {
	PLACEHOLDER: 'placeholder',
	DEFAULT: 'default',
	TYPING: 'typing',
	FIELD: 'field',
} as const;

type PopUpProps = {
	type: (typeof TYPE)[keyof typeof TYPE];
};

function PopUp({ type }: PopUpProps) {
	const [state, setState] = useState<(typeof STATE)[keyof typeof STATE]>(STATE.DEFAULT);

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setState(STATE.PLACEHOLDER);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setState(STATE.FIELD);
		} else {
			setState(STATE.DEFAULT);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setState(STATE.TYPING);
		}
	};

	return (
		<PopUpContainer>
			{type === TYPE.DESC && state === STATE.DEFAULT && <Icon name="IcnDescription" size="tiny" />}
			<StyledInput
				type={type}
				state={state}
				placeholder="제목을 입력하세요"
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
		</PopUpContainer>
	);
}

export default PopUp;

const PopUpContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
	align-items: center;
`;

const StyledInput = styled.input<{ type: Props['type']; state: (typeof STATE)[keyof typeof STATE] }>`
	${({ type }) => (type === TYPE.TITLE ? theme.font.title02 : theme.font.body03)};
	caret-color: ${theme.color.Blue.Blue7};

	color: ${({ state }) => {
		switch (state) {
			case STATE.DEFAULT:
				return theme.color.Grey.Grey6;
			case STATE.PLACEHOLDER:
				return theme.color.Grey.Grey4;
			case STATE.TYPING:
			case STATE.FIELD:
				return theme.color.Grey.Grey8;
			default:
				return theme.color.Grey.Grey6;
		}
	}};

	outline: none;
	border-width: 0;

	&::placeholder {
		color: ${({ state }) => (state === STATE.DEFAULT ? theme.color.Grey.Grey6 : theme.color.Grey.Grey4)};
	}
`;
