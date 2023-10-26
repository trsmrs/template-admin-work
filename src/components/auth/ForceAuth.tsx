import Head from 'next/head'
import logIcon from '../../../public/images/Spinner-1s.gif'
import Image from "next/image"
import useAuth from "@/data/hook/useAuth"
import Router from "next/router"

export default function ForceAuth(props:any) {
    const { usuario, carregando } = useAuth()


    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie?.includes("admin-trsm-auth")){
                                window.localtion.href = "/autenticacao"
                            }
                        `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center
                h-screen
            `}>
                <Image src={logIcon} alt="loadingimg" />
            </div>
        )
    }

    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        Router.push('/autenticacao')
        return null
    }


}