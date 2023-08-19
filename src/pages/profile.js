import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Button, Form, Input, Upload } from 'antd';
import { getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const { Meta } = Card;

export default function Profile ({ session }) {
    const onFinish = async ({ oldPassword, password, confirmPassword }) => {
        console.log('Received values of form: ', oldPassword, password, confirmPassword);
        if (oldPassword.match(/[A-Z]/) === null) {
            toast.error("Old Password must contain at least one uppercase letter");
            return;
        }
        if (oldPassword.match(/[a-z]/) === null) {
            toast.error("Old Password must contain at least one lowercase letter");
            return;
        }
        if (password.match(/[A-Z]/) === null) {
            toast.error("New Password must contain at least one uppercase letter");
            return;
        }
        if (password.match(/[a-z]/) === null) {
            toast.error("New Password must contain at least one lowercase letter");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/auth/changepassword", {
                method: "POST",
                body: JSON.stringify({
                    email: session.user.email,
                    oldPassword,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                console.log("Success");
                toast.success("Password changed successfully");
                return true;
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fileList = [

    ];
    return (
        <>
            <div className="profile center marginTB flex-col">
                <h1 className='text-violet-800'>Profile</h1>
                <div className="profileBody center bg-slate-200 b-radius flex-col" style={{ height: '50rem', width: '40rem' }}>
                    <Card
                        style={{ width: '30rem' }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                defaultFileList={[...fileList]}
                                key='upload'
                            >
                                <Button icon={<EditOutlined key="edit" />}></Button>
                            </Upload>
                        ]}
                    >
                        {/* <Meta
                            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                            title="Usename"
                            description="This is the description"
                        /> */}
                    </Card>
                    <h2>{session?.user.name}</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{width: '30rem', margin: '2rem'}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your old Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Old Password"
                            />
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
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'password must match',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button bg-violet-800 width100">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (!session) {
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