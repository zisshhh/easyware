import { Outlet } from "react-router-dom"
import { Appbar } from "./Appbar"

export const Layout = () => {
    return (
        <div>
            <Appbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}