import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <div className={"h-full"}>
            <Outlet />
        </div>
    )
}