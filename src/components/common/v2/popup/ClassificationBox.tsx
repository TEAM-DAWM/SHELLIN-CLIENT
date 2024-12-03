import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import Icn from '@/assets/svg/V2';
import Button from '@/components/common/v2/button/Button';
import CategoryBtn from '@/components/common/v2/popup/CategoryBtn';

interface ClassificationBoxProps {
	categoryName: string;
	label: string;
}

function ClassificationBox({ categoryName, label }: ClassificationBoxProps) {
	const [isSettingActive, setIsSettingActive] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const containerRef = useRef(null);

	const handleIconClick = () => {
		setIsClicked((prev) => !prev);
		setIsSettingActive(false);
	};

	const handleClickModify = () => {
		setIsSettingActive(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			event.target instanceof Node &&
			(containerRef.current as HTMLDivElement).contains(event.target) === false
		) {
			setIsSettingActive(true);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<ClassificationBoxContainer ref={containerRef}>
			<ClassificationBtnLayout>
				<CategoryTitleStyle>{label}</CategoryTitleStyle>
				{isClicked ? <XIconBox onClick={handleIconClick} /> : <PlusIconBox onClick={handleIconClick} />}
			</ClassificationBtnLayout>
			{isClicked && (
				<BtnLayout>
					<CategoryBtn categoryName={categoryName} isSettingActive={isSettingActive} onClick={handleClickModify} />
					{!isSettingActive && (
						<Button
							label="타임블락 색상"
							rightIcon="IcnDown"
							onClick={() => {}}
							size="medium"
							type="outlined-assistive"
							disabled={false}
						/>
					)}
				</BtnLayout>
			)}
		</ClassificationBoxContainer>
	);
}

const ClassificationBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
	justify-content: center;
	box-sizing: border-box;
	width: 37rem;
	padding: 1.6rem 0;

	color: ${({ theme }) => theme.colorToken.Text.assistive};

	border-top: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
	border-bottom: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
`;

const ClassificationBtnLayout = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: 100%;
	height: 2.4rem;
`;

const CategoryTitleStyle = styled.div`
	height: 1.3rem;
	padding: 0 0 0 1.2rem;

	${({ theme }) => theme.font.label05};
`;

const PlusIconBox = styled(Icn.IcnPlus)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;

const XIconBox = styled(Icn.IcnX)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;

const BtnLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin: 0 0 0 0.8rem;
`;
export default ClassificationBox;
