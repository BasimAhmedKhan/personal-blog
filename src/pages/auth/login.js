import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import Link from 'next/link';

export default function SignIn() {
    const router = useRouter()
    const onSubmit = async (email, password) => {
        const data = await signIn('credentials', { redirect: false, email, password });
        console.log(data);
        if (data.status === 200) {
            router.push("/");
        }
    };
    return (
        <section className='center' style={{ height: '100vh', flexDirection: 'column' }}>
            <h1 className='text-violet-800'>Login</h1>
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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link className="login-form-forgot" href="">
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button bg-violet-800 width100">
                            Log in
                        </Button>
                        Or Don't have an account? <Link href="/login">Register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }
}