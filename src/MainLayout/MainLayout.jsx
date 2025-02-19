import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location?.pathname.includes("/")
    return (
        <div>
            {noHeaderFooter || <h1>NAVBAR</h1>}
            <Outlet></Outlet>
            {noHeaderFooter || <h1>Footer</h1>}
        </div>
    );
};

export default MainLayout;