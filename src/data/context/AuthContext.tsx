import { createContext, useState, useEffect } from 'react'
import firebase from '@/firebase/config';
import Usuario from '@/model/Usuario';
import Router from 'next/router';
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})


async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName!,
        email: usuarioFirebase.email!,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemURL: usuarioFirebase.photoURL!
    }
}

function gerenciarCookier(logado: any) {
    if (logado) {
        Cookies.set('admin-trsm-auth',logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-trsm-auth')
    }
}



export function AuthProvider(props: any) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null!)

    async function configurarSessao(usuarioFirebase: any) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookier(true)
            setCarregando(false)

        } else {
            setUsuario(null!)
            gerenciarCookier(false)
            setCarregando(false)

            return false
        }
    }

    async function login(email: any, senha: any) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)

            await configurarSessao(resp.user)
            Router.push('/')

        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email:any, senha: any) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)

           await configurarSessao(resp.user)
            Router.push('/')

        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider())
          await configurarSessao(resp.user)
            Router.push('/')

        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-trsm-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            cadastrar,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext