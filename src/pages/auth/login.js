import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function SignIn() {
    const router = useRouter()
    const onSubmit = async ({ email, password }) => {
        const data = await signIn('credentials', { redirect: false, email, password });
        console.log(data);
        if (data.status === 200) {
            router.push("/");
        } else {
            toast.error(data.error)
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
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
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
                        <Button type="primary" htmlType="submit" className="login-form-button bg-violet-800 width100">
                            Log in
                        </Button>
                        <div className='mt-2'>
                        {"Or Don't have an account? "}<Link href="/auth/signup">Register now!</Link>
                        </div>
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