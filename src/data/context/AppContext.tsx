import { createContext, useEffect, useState } from "react";

// type Theme = 'dark' | ''

interface AppContextProps {
    tema?: string
    changeTheme?: () => void
}



const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {
    const [tema, setTema] = useState('dark')


    function changeTheme() {
        const newTheme = tema === '' ? 'dark' : ''
        setTema(newTheme)
        localStorage.setItem('tema', newTheme)
    }

    useEffect(() => {
        const themeSaved = localStorage.getItem('tema')
        setTema(themeSaved!)
        if (themeSaved === null) {
            localStorage.setItem('tema', '')
        }

    }, [])
    return (
        <AppContext.Provider value={{
            tema,
            changeTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
export const AppConsumer = AppContext.Consumer