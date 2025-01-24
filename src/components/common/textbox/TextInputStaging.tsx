import styled from '@emotion/styled';
import { useRef, useState } from 'react';

import BtnDate from '../BtnDate/BtnDate';
import BtnStagingDate from '../BtnDate/BtnStagingDate';
import EnterBtn from '../button/EnterBtn';

import useCreateTask from '@/apis/tasks/createTask/query';
import { formatDatetoLocalDate, formatDatetoString } from '@/utils/formatDateTime';

function TextInputStaging() {
	const [taskName, setTaskName] = useState('');
	const [date, setDate] = useState<Date | null>(null);
	const [time, setTime] = useState<string | null>(null);
	const nameRef = useRef<HTMLTextAreaElement>(null);

	const handleArrangeBtnClick = () => {
		setDate(new Date());
	};

	const handleDate = (newDate: string) => {
		setDate(new Date(newDate));
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTaskName(e.target.value);
	};

	const { mutate } = useCreateTask();

	/** 태스크 쏟아내기 전송 */
	const onSubmit = () => {
		const formattedDate = date ? formatDatetoLocalDate(date) : null;
		if (taskName && taskName.trim() !== '') {
			mutate({
				name: taskName,
				deadLine: {
					date: formattedDate,
					time,
				},
			});
		}
		setTaskName('');
		if (nameRef.current) nameRef.current.value = '';
		setDate(null);
		setTime(null);
	};

	/** 엔터키로 쏟아내기 전송 */
	const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			e.preventDefault();
			onSubmit();
		}
	};

	return (
		<StagingLayout>
			<TextArea
				placeholder="해야하는 일들을 쏟아내보세요."
				maxLength={20}
				value={taskName}
				onChange={onChange}
				ref={nameRef}
				onKeyDown={handleEnterPress}
			/>
			<BtnWrapper>
				<SetDeadLineContainer>
					{time || date ? (
						<BtnDate date={formatDatetoString(date)} time={time} handleDate={handleDate} size={{ type: 'default' }} />
					) : (
						<BtnStagingDate onClick={handleArrangeBtnClick} />
					)}
				</SetDeadLineContainer>

				<EnterBtn onClick={onSubmit} />
			</BtnWrapper>
		</StagingLayout>
	);
}

const StagingLayout = styled.div`
	position: absolute;
	bottom: 2.8rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	width: 31rem;
	height: 7.4rem;
	padding: 0.8rem;

	border: solid 1px ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 8px;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 100%;

	border: none;

	${({ theme }) => theme.fontTheme.LABEL_03};
	&:focus {
		outline: none;
	}
	resize: none;
`;

const BtnWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
`;

const SetDeadLineContainer = styled.div`
	position: relative;
`;

export default TextInputStaging;
