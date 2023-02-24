import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Spin } from 'antd';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import { useAppSelector } from '@/hooks';
import { getMenuList } from '@/api/modules/login';
import { getCollapse } from '@/store/features/globalSlice';
import logo from '@/assets/images/logo.png';
import './index.less';

const LayoutMenu = () => {
  let isCollapse = useAppSelector(getCollapse);

  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const getOpenKeys = (path: any) => {
    let newStr: string = '';
    let newArr: any = [];
    let arr = path.split('/').map((i: number) => '/' + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    return newArr;
  };

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    if (name) {
      return React.createElement(customIcons[name]);
    }
  };
  // 定义 menu 类型
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoop = (menuList: [], newArr: any = []) => {
    menuList.forEach((item: any) => {
      if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoop(item.children)));
    });
    return newArr;
  };
  // 获取菜单列表并处理成 antd menu 需要的格式
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMenuData = async () => {
    setLoading(true);
    try {
      const { data } = await getMenuList();
      if (!data) return;
      setMenuList( deepLoop(data.list));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setOpenKeys(['/project']);
    getMenuData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname]);
  // 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		setOpenKeys(openKeys);
	};
  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <div className="menu">
      <Spin spinning={loading} tip="Loading...">
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapse ? <h2 className="logo-text">React</h2> : null}
        </div>
        <Menu theme="dark" mode="inline" openKeys={openKeys} defaultSelectedKeys={selectedKeys} items={menuList} onClick={clickMenu} onOpenChange={onOpenChange} />
      </Spin>
    </div>
  );
};
export default LayoutMenu;
