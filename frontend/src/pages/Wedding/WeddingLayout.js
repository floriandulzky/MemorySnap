import {Outlet} from "react-router-dom";

export function WeddingLayout() {
    return (
        <div className="h-full min-h-screen bg-image">
            <div className="flex flex-row">
                <Outlet />
            </div>
        </div>
    )
}
