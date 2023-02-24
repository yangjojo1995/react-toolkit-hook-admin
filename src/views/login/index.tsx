import { useState } from 'react';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import logo from "@/assets/images/logo.png";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import "./index.less";
const Login = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const items: TabsProps['items'] = [
		{
		  key: '1',
		  label: `登录`,
		  children: <LoginForm />,
		},
		{
		  key: '2',
		  label: `注册`,
		  children: <RegisterForm />,
		}
	  ];
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-form">
					<div className="login-logo">
						<img className="login-icon" src={logo} alt="logo" />
						<span className="logo-text">React-Admin</span>
					</div>
					<Tabs defaultActiveKey="1" items={items} />
				</div>
			</div>
		</div>
	);
};

export default Login;
