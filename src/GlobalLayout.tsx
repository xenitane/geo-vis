import Header from "@/Header";
import { FC, HTMLProps, Suspense } from "react";
import PageSkeleton from "@/PageSekleton";
import Footer from "@/Footer";
import ScrollToTop from "@/ScrollToTop";
import { cn } from "%/utils";

const GlobalLayout: FC<HTMLProps<HTMLElement>> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main
                className={cn(
                    "relative flex-[1_0_auto] bg-white p-4 text-neutral-950",
                    "dark:bg-neutral-900 dark:text-neutral-50"
                )}
            >
                <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
            </main>
            <Footer
                appVersion={__my_consts__.__APP_VERSION__}
                repo={__my_consts__.__GIT_REPO__}
                user={__my_consts__.__USER_PROFILE__}
            />
        </div>
    );
};

export default GlobalLayout;
