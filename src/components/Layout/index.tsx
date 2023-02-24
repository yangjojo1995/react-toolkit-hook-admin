import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getCollapse,setCollapse } from '@/store/features/globalSlice';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
import LayoutFooter from './components/Footer';
import './index.less';

const LayoutIndex = (props: any) => {
  const isCollapse = useAppSelector(getCollapse);
  const dispatch = useAppDispatch();
  const { Sider, Content } = Layout;

  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (!isCollapse && screenWidth < 1200) dispatch(setCollapse(true));
        if (!isCollapse && screenWidth > 1200) dispatch(setCollapse(false));
      })();
    };
  };

  useEffect(() => {
    listeningWindow();
  });

  return (
    <section className="container">
      <Sider trigger={null} collapsed={isCollapse} width={220}>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content>
          <Outlet />
        </Content>
        <LayoutFooter />
      </Layout>
    </section>
  );
};
export default LayoutIndex;
