import Images from '@/assets/images/index';
import Icons from '@/assets/svg/V1/index';

const SUMMARY_INFO = [
	{
		name: 'completeTasks',
		text: '완료한 할 일 갯수',
		data: 0,
		unit: '개',
		icon: Icons.Dashboard_Complete,
		imagePate: Images.DASHBOARD.upcoming,
	},
	{
		name: 'avgDeferredRate',
		text: '평균 지연율',
		data: 0,
		unit: '%',
		icon: Icons.DashboardPostpone,
		imagePate: Images.DASHBOARD.postpone,
	},
	{
		name: 'avgInprogressTasks',
		text: '평균 진행중인 할 일 갯수',
		data: 0,
		unit: '개',
		icon: Icons.DashboardProgress,
		imagePate: Images.DASHBOARD.inprogress,
	},
];

export default SUMMARY_INFO;
