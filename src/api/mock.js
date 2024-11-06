import  Mock  from "mockjs";
import homeApi from './mockData/home'
//1.拦截路径   2.方法    3.制造出的假数据
// home 的 api
Mock.mock(/api\/home\/getTableData/, 'get', homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, 'get', homeApi.getCountData);
Mock.mock(/api\/home\/getEcharData/, 'get', homeApi.getChartData);

// user 的 api
import userApi from './mockData/user'
Mock.mock(/api\/user\/getUserData/, 'get', userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/, 'get', userApi.deleteUser);
Mock.mock(/api\/user\/addUser/, 'post', userApi.createUser);
Mock.mock(/api\/user\/editUser/, 'post', userApi.updateUser);

//login 的 api
import loginApi from './mockData/login'
Mock.mock(/api\/permission\/getMenu/, 'post', loginApi.getMenu);


