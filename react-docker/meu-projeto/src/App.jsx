import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. Estado único para guardar os dados do veículo
  const [veiculo, setVeiculo] = useState({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    cor: ''
  })

  // 2. Estado para controlar se o botão está habilitado ou não
  const [isFormValido, setIsFormValido] = useState(false)

  // 3. Função chamada a cada digitação (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target
    // Atualiza o estado do veículo dinamicamente
    setVeiculo({ ...veiculo, [name]: value })
  }

  // 4. useEffect: Executa sempre que 'veiculo' mudar
  // Ele vai validar tudo e decidir se habilita o botão
  useEffect(() => {
    const { marca, modelo, ano, placa, cor } = veiculo

    // Regras de validação simples (todas as condições devem ser verdadeiras)
    const marcaValida = marca.trim().length > 0
    const modeloValido = modelo.trim().length > 0
    const anoValido = ano >= 1900 && ano <= new Date().getFullYear() + 1
    // Regex simples para placa (aceita ABC1234 ou ABC1D23)
    const placaValida = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa.toUpperCase().replace('-', ''))
    const corValida = cor.trim().length > 0

    // Se TODAS forem válidas, o botão é habilitado
    setIsFormValido(marcaValida && modeloValido && anoValido && placaValida && corValida)
    
  }, [veiculo]) // O array [veiculo] diz ao React para rodar isso só quando veiculo mudar

  // 5. Função para mostrar o JSON no momento do envio
  const handleSubmit = (e) => {
    e.preventDefault() // Impede a página de recarregar
    alert("Requisição POST seria enviada com o seguinte JSON:\n\n" + JSON.stringify(veiculo, null, 2))
  }

  return (
    <div className="container">
      <h1>Cadastro de Veículos</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Marca:</label>
          <input type="text" name="marca" value={veiculo.marca} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Modelo:</label>
          <input type="text" name="modelo" value={veiculo.modelo} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Ano:</label>
          <input type="number" name="ano" value={veiculo.ano} onChange={handleChange} />
        </div>

        <div className="campo">
          <label>Placa:</label>
          <input type="text" name="placa" value={veiculo.placa} onChange={handleChange} maxLength="7" />
        </div>

        <div className="campo">
          <label>Cor:</label>
          <input type="text" name="cor" value={veiculo.cor} onChange={handleChange} />
        </div>

        {/* O botão só é habilitado se isFormValido for true */}
        <button type="submit" disabled={!isFormValido}>
          Salvar Veículo
        </button>
      </form>

      {/* Mostra o JSON na tela apenas para visualização */}
      <div className="preview">
        <h3>Preview do JSON (POST):</h3>
        <pre>{JSON.stringify(veiculo, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App