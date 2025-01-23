import styled from '@emotion/styled';

import Icon from '../../Icon';

import useInputHandler from '@/hooks/useInputHandler';
import { INPUT_STATE, InputState } from '@/types/inputStateType';

const TYPE = {
	TITLE: 'title',
	DESC: 'description',
} as const;

type PopUpProps = {
	type: (typeof TYPE)[keyof typeof TYPE];
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PopUp({ type, defaultValue, onChange = () => {} }: PopUpProps) {
	const { state, handleFocus, handleBlur, handleChange } = useInputHandler();
	const placeholder = type === TYPE.TITLE ? '제목을 입력하세요' : '설명을 추가하세요';

	const handlePopUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		handleChange(e);
	};
	return (
		<PopUpContainer>
			{type === TYPE.DESC && state === INPUT_STATE.DEFAULT && <Icon name="IcnDescription" size="tiny" />}
			<StyledInput
				type={type}
				state={state}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={(e) => {
					handlePopUpChange(e);
				}}
				defaultValue={defaultValue}
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

const StyledInput = styled.input<{ type: PopUpProps['type']; state: InputState }>`
	${({ type, theme }) => (type === TYPE.TITLE ? theme.font.title02 : theme.font.body03)};
	caret-color: ${({ theme }) => theme.color.Blue.Blue7};

	color: ${({ state, theme }) => {
		switch (state) {
			case INPUT_STATE.DEFAULT:
				return theme.color.Grey.Grey6;
			case INPUT_STATE.PLACEHOLDER:
				return theme.color.Grey.Grey4;
			case INPUT_STATE.TYPING:
			case INPUT_STATE.FIELD:
				return theme.color.Grey.Grey8;
			default:
				return theme.color.Grey.Grey6;
		}
	}};

	outline: none;
	border-width: 0;

	&::placeholder {
		color: ${({ state, theme }) => (state === INPUT_STATE.DEFAULT ? theme.color.Grey.Grey6 : theme.color.Grey.Grey4)};
	}
`;
