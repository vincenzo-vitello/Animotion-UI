import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <nav style={{ width: "100vw", height: "50px", backgroundColor: "#255" }}>
        Navbar
      </nav>
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
      <footer
        style={{ width: "100vw", height: "50px", backgroundColor: "#255" }}
      >
        Footer
      </footer>
    </div>
  );
};

export default Layout;
