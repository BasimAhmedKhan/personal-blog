import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Button, Form, Input, Upload } from 'antd';

const { Meta } = Card;

export default function () {
    const onFinish = () => {
        return true;
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
                            >
                                <Button icon={<EditOutlined key="edit" />}></Button>
                            </Upload>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                            title="Usename"
                            description="This is the description"
                        />
                    </Card>
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
                            name="changePassword"
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