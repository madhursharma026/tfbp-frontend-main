import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className='main-layout'>
            <Header />
            <div className="bg-white">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}