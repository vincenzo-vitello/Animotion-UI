import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
