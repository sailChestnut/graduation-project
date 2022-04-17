import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, LeftOutlined } from '@ant-design/icons';
import "./login.less";
import { Link } from 'react-router-dom';
import { history } from 'umi';

const NormalLoginForm = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="login">
            <Form name="normal_login" className="login_form" initialValues={{ remember: true }} onFinish={onFinish}   >
                <Form.Item className='login_back' onClick={() => { history.push('/dashborad') }}><LeftOutlined /></Form.Item>
                <Form.Item name="username" className="username login-input" rules={[{ required: true, message: 'Please input your Username!' }]}   >
                    <p className='login_form_text'>用户登录</p>
                    <Input className='login_input' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" className="password login-input" rules={[{ required: true, message: 'Please input your Password!' }]}  >
                    <Input className='login_input' prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">  Forgot password </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NormalLoginForm