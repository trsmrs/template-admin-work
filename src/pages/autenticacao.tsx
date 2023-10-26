import AuthInput from "@/components/auth/AuthInput";
import { IconGoogle, IconWarning } from "@/components/icons";
import Image from "next/image";
import bglogin from '../../public/images/bg-login.jpg'
import { useState } from 'react'
import useAuth from "@/data/hook/useAuth";


export default function Autenticacao() {
    const { login, cadastrar, loginGoogle } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)


    async function submeter() {
        try{

            if (modo === 'login') {
              await login!(email, senha)   
            }
            else {
                await cadastrar!(email, senha)  
            }
        } catch(e:any){
          showError(e?.message)
        }
    }

    function showError(msg: any, time = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), (time * 1000))
    }


    return (
        <div className={`flex h-screen items-center justify-center`}>
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <Image src={bglogin} alt="imagem-Login"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-xl font-bold mb-5
            `}>
                    {modo === 'login' ? 'Entre com a sua Conta' : 'Cadastre-se'}
                </h1>
                {erro ? (
                    <div className={` flex justify-center items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                        
                    `}>
                        {IconWarning(6)}
                        <span className="ml-3">{erro}</span>
                    </div>

                ) : null}

                <AuthInput
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />

                <button onClick={submeter}
                    className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6 
                `}
                >
                    {modo === 'login' ? 'Entrar' : 'Cadastre-se'}
                </button>
                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle}
                    className={`
                flex justify-center items-center
                w-full bg-red-300 hover:bg-red-400
                text-white rounded-lg px-4 py-3 
                `}
                >
                    Login com o<Image src={IconGoogle} alt="google-icon"
                        className={`h-6 w-6 ml-1`}
                    />oogle
                </button>
                {modo === 'login' ? (
                    <p className="ml-5 py-2">
                        Não tem uma conta? &nbsp;
                        <a onClick={() => setModo('cadastro')}
                            className={`
                            text-blue-500 hover:text-blue-700
                            font-semibold cursor-pointer

                        `}>Criar uma conta</a>
                    </p>
                ) : (
                    <p className="ml-5 py-2">
                        Já tem uma conta? &nbsp;
                        <a onClick={() => setModo('login')}
                            className={`
                        text-blue-500 hover:text-blue-700
                        font-semibold cursor-pointer`}
                        >Efetue o login</a>
                    </p>
                )}
            </div>
        </div>
    )
}