import { Footer } from "../Footer";
import { Header } from "../Header";

export function DefaultLayout({ children }: { children: React.ReactNode }){
    return(
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}