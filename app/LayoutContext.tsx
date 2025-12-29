"use client"; // Делаем этот компонент клиентским

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const authRoutes = ["/login", "/signup", "/forgot"];
    const isAuthPage = authRoutes.includes(pathname);

    return (
        <>
            {/* Показываем Navbar, только если мы НЕ на странице логина/регистрации */}
            {!isAuthPage && <Navbar />}

            <div className={!isAuthPage ? "pt-20" : ""}>
                {children}
            </div>

            {!isAuthPage && <Footer />}
        </>
    );
}