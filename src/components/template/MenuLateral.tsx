import useAuth from "@/data/hook/useAuth";
import { BellIcon, HomeIcon, LogoutIcon, SettingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    const {logout} = useAuth()
    return (
        <aside className={`
           flex flex-col
           bg-gray-200 text-gray-600
           dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-purple-600 to-purple-900
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url="/" texto="Início" icone={HomeIcon} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={SettingsIcon} />
                <MenuItem url="/notificacao" texto="Notificações" icone={BellIcon} />
            </ul>
            <ul className="mb-2">
                <MenuItem onClick={logout} 
                texto="Logout" 
                icone={LogoutIcon}
                className={`text-red-600 dark:text-red-400
                    hover:bg-red-400 hover:text-white dark:hover:text-white
                `}
                />

            </ul>

        </aside>
    )
}