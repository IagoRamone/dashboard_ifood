import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

function HomePage(){
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <main className="flex-1 p-8">
        <section className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Bem-vindo ao Dashboard</h1>
          <p className="mb-6 text-lg">
            O Dashboard é a central de controle onde você pode gerenciar todos os aspectos do seu sistema.
            A plataforma oferece uma visão abrangente de todos os dados essenciais para a tomada de decisões rápidas e eficazes.
          </p>
          <p className="mb-6 text-lg">
            Através deste painel, você pode monitorar atividades, visualizar relatórios detalhados e acessar ferramentas de análise.
            Tudo isso de uma forma simples e intuitiva, garantindo que você esteja sempre atualizado e preparado.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Funcionalidades Principais</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Visão geral em tempo real dos dados mais importantes</li>
              <li>Relatórios detalhados sobre suas operações</li>
              <li>Ferramentas de análise para insights profundos</li>
              <li>Integração com outras plataformas e APIs</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Dashboard preview" 
              className="mx-auto rounded-lg"
            />
          </div>
        </section>
      </main>
    </div>  
  )
}
