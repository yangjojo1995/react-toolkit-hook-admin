import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { Login } from '@/api/interface';
import { loginApi } from '@/api/modules/login';
import { HOME_URL } from '@/config';
import { setToken } from '@/store/features/tokenSlice';

const LoginForm = (props: any) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  // 登录
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      const { data } = await loginApi(loginForm);
      dispatch(setToken(data?.access_token));
      message.success('登录成功！');
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large" autoComplete="off">
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名：admin" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password autoComplete="new-password" placeholder="密码：123456" />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button type="primary" style={{ width: '100%' }} htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
