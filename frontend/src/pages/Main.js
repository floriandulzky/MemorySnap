import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./Home/Layout";
import {Home} from "./Home/Home";
import {WeddingLayout} from "./Wedding/WeddingLayout";
import {Overview} from "./Wedding/Challange/Overview";
import {Detail} from "./Wedding/Challange/Detail";

export function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index={true} element={<Home />} />
                </Route>
                <Route path="/wedding/:id" element={<WeddingLayout />} >
                    <Route index={true} element={<Overview />} />
                    <Route path={":challenge"} element={<Detail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
