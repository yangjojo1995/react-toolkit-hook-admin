import { Layout } from "antd";
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getCollapse, setCollapse } from '@/store/features/globalSlice';
import AvatarIcon from "./components/AvatarIcon";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from '@ant-design/icons';
import "./index.less";
const LayoutHeader = (props: any) => {
	const isCollapse = useAppSelector(getCollapse);
	const dispatch = useAppDispatch();
	const { Header } = Layout;
	return (
		<Header>
			<div className="header-lf">
				<div
					className="collapsed"
					onClick={() => {
						dispatch(setCollapse(!isCollapse));
					}}
				>
					{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
				</div>
			</div>
			<div className="header-ri">
				<span className="username">user</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
