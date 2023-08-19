import Link from "next/link";
import styles from './Header.module.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Header() {
    return (
        <header className={`${styles.header} bg-violet-800`}>
            <nav className={`${styles.nav} margin bg-violet-800`}>
                <ul>
                    <li><h2>PERSONAL BLOGGING APP</h2></li>
                </ul>
                <ul className='center'>
                    <li><Link className="white" href="/">
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Link></li>
                    <li><Link className="white" href="/">Sign up</Link></li>
                    <li><Link className="white" href="/">Log out</Link></li>
                </ul>
            </nav>
        </header>
    );
}