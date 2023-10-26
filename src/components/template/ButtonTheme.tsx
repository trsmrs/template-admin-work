import { DarkThemeIcon, LightThemeIcon } from "../icons"

interface ButtonThemeProps {
    theme?: string
    changeTheme?: () => void
}

export default function ButtonTheme(props: ButtonThemeProps) {
    return props.theme === 'dark' ? (
        <div onClick={props.changeTheme} className={`
                hidden sm:flex items-center cursor-pointer
                bg-gradient-to-r from-yellow-300 to-yellow-600
                w-14 lg:w-24 h-8 p-1 rounded-full
        `}>
            <div className={`
                    flex items-center justify-center
                    bg-white text-yellow-600 w-6 h-6 rounded-full
            `}>
                {LightThemeIcon(9)}
            </div>
            <div className={`
                hidden lg:flex items-center ml-3 text-white
            `}>
                <span className="text-sm">Claro</span>
            </div>
        </div>
    ) : (
        <div onClick={props.changeTheme} className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-slate-700 to-slate-900
        w-14 lg:w-24 h-8 p-1 rounded-full
`}>
            <div className={`
                   hidden lg:flex items-center mr-2 text-gray-300`}>
                <span className='text-sm'>Escuro</span>
            </div>
            <div className={`
            flex items-center justify-center
            bg-black text-blue-200 w-6 h-6 rounded-full
    `}>
                {DarkThemeIcon(9)}
            </div>
        </div>
    )


}