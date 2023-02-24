import serve from "../index";

/**
 * @name 项目模块
 */
// * 用户项目列表
export const projectList = (params: any) => {
	return serve.post(`/temp/list`, params);
};
   