import { LockOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import Link from 'next/link';

export default function () {
    const onSubmit = async (firstName, lastName, email, password) => {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({firstName, lastName, email, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                alert("Sign up successful");
            }
        } catch (err) {
            console.error(err);
        }
        
    };
    const fileList = [

    ];
    return (
        <>
            <section className='center' style={{ height: '100vh', flexDirection: 'column' }}>
                <h1 className='text-violet-800'>Signup</h1>
                <div className="formBody center bg-slate-200 b-radius" style={{ height: '30rem', width: '30rem' }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item className='center'>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                defaultFileList={[...fileList]}
                            >
                                <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button bg-violet-800 width100">
                                Sign up
                            </Button>
                            Or Already have an account? <Link href="/signup">Log in!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </>
    );
}