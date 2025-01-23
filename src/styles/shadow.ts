import { css } from '@emotion/react';

const shadow = {
	FloatingAction1: css`
		box-shadow:
			0 6px 12px 0 rgb(0 0 0 / 12%),
			0 4px 8px 0 rgb(0 0 0 / 8%),
			0 0 4px 0 rgb(0 0 0 / 8%);
	`,
	FloatingAction2: css`
		box-shadow:
			0 -4px 4px 0 rgb(23 59 134 / 5%),
			0 2px 4px 0 rgb(23 59 134 / 5%),
			0 4px 12px 0 rgb(23 59 134 / 60%);
	`,
	FloatingAction3: css`
		box-shadow:
			0 0 8px 0 #00000014,
			0 8px 16px 0 #00000014,
			0 16px 20px 0 #0000001f;
	`,
};

export default shadow;
