import useAppData from "@/data/hook/useAppData"
import ButtonTheme from "./ButtonTheme"
import Titulo from "./Titulo"
import AvatarUsuario from "./AvatarUsuaro"


interface CabecalhoProps {
    titulo: string
    subtitulo: string

}

export default function Layout(props: CabecalhoProps) {
    const { tema, changeTheme } = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonTheme theme={tema} changeTheme={changeTheme} />
                <AvatarUsuario className="ml-3"/>
            </div>
        </div>
    )
}