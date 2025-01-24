import inprogress from './Dashboard_Inprogress.png';
import postpone from './Dashboard_Postpone.png';
import upcoming from './Dashboard_Upcoming.png';
import categoryImg from './Empty_Category.png';
import postponeImg from './Empty_Postpone.png';
import taskImg from './Empty_Task.png';
import googleCalendar from './google_calendar.png';
import googleIcon from './googleIcon.png';
import LoginBg from './loginBg.png';
import notFountBg from './notFoundBg.png';
import smallLogo from './smallLogo.png';
import titleIcon from './titleIcon.png';

const Images = {
	BG: {
		LoginBg,
		notFountBg,
	},
	smallLogo,
	titleIcon,
	googleIcon,
	EMPTY: {
		taskImg,
		postponeImg,
		categoryImg,
	},
	googleCalendar,
	DASHBOARD: {
		inprogress,
		postpone,
		upcoming,
	},
};

export default Images;
