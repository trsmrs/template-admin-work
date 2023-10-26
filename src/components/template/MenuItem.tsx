import Link from "next/link"

interface MenuItemProps {
    url?: string
    texto: string
    icone?: any
    className?: string
    onClick?: (ev: any) => void
}


export default function MenuItem(props: MenuItemProps) {

    function renderLink() {
        return (
            <p className={`flex flex-col justify-center items-center
            h-20 w-20  dark:text-gray-200
            ${props.className}
        `}>
                {props.icone}
                <span className={`text-xs font-light`}>{props.texto}</span>
            </p>
        )
    }


    return (
        <li onClick={props.onClick} className={`hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-800`}>
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link>

            ) :
                renderLink()
            }
        </li>
    )
}