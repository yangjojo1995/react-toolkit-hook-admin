import serve from "../index";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: any) => {
	return serve.post(`/login`, params);
};
   

// * 获取按钮权限
export const getAuthorButtons = () => {
	return serve.get(`/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return serve.post(`/menu/list`);
};