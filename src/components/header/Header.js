import Link from "next/link";
import styles from "./Header.module.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const session = useSession();
  const currentPath = useRouter().asPath;

  console.log(session);
  return (
    <header className={`${styles.header} bg-violet-800`}>
      <nav className={`${styles.nav} margin bg-violet-800`}>
        <ul>
          <li>
            <Link href="/">
              <h2>PERSONAL BLOGGING APP</h2>
            </Link>
          </li>
        </ul>
        <ul className="center">
          {session.status === "authenticated" ? (
            <>
              <li>
                <Link className="white" href="/">
                  <Avatar size="large" icon={<UserOutlined />} />
                </Link>
              </li>
              <li>
                <span>{}</span>
              </li>
              <li>
                <button
                  className="white"
                  onClick={async (e) => {
                    await signOut({
                      redirect: false,
                    });
                  }}
                >
                  Log out
                </button>
              </li>
            </>
          ) : currentPath === "/auth/login" ? (
            <li>
              <Link className="white" href="/auth/signup">
                Sign up
              </Link>
            </li>
          ) : (
            <li>
              <Link className="white" href="/auth/login">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
