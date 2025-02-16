import { Global, css } from '@emotion/react';

const fonts = {
	Pretendard: 'Pretendard-Medium',
};

const style = css`
	/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video,
	button {
		margin: 0;
		padding: 0;

		font: inherit;
		font-size: 100%;
		vertical-align: baseline;

		border: 0;
	}

	/* HTML5 display-role reset for older browsers */
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	body {
		font-family: ${fonts.Pretendard};
		line-height: 1;

		user-select: none;
	}

	ol,
	ul {
		list-style: none;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote::before,
	blockquote::after,
	q::before,
	q::after {
		content: '';
		content: none;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	html {
		font-size: 62.5%;
	}

	@media (width <= 1440px) {
		html {
			font-size: 50%;
		}
	}

	:root {
		--fc-highlight-color: #dfe9ff;
		--fc-event-border-color: #ffff;
	}

	button {
		cursor: pointer;
	}
`;

function GlobalStyle() {
	return <Global styles={style} />;
}

export default GlobalStyle;
