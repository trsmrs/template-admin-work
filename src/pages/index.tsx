import Layout from "@/components/template/Layout"

export default function Home() {
  return (
    <>
      <Layout titulo="Página inicial" subtitulo="Estamos construindo um template-admin" >
        <h3 className="font-bold text-2xl">Conteúdo</h3>
        <div className={`mt-3`}>
          <p>Este projeto é um <strong>template</strong> de Login com e-mail e validação com o google.</p> <br />
          <p>Ele está ligado ao firebase.</p><br />
          <p>Sistema de alterar tema está ligado ao localStorage, e o login está registrado em um cookie.</p>
        </div>
      </Layout>

    </>
  )
}
