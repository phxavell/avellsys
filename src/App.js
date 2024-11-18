import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FaClipboardList, FaCogs, FaWindows, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import './App.css';

// Tela de Gerenciamento de Processo
function GerenciamentoDeProcesso() {
  const [laptops, setLaptops] = useState([
    { serial: 'ABC123', status: ['', '', '', ''] },
    { serial: 'XYZ456', status: ['Separação', 'Montagem', '', ''] },
    { serial: 'LMN789', status: ['Separação', '', '', ''] },
    { serial: 'DEF111', status: ['', '', 'Gravação da Imagem Windows', ''] },
    { serial: 'GHI222', status: ['Separação', 'Montagem', 'Gravação da Imagem Windows', ''] },
  ]);

  const [etapaFiltro, setEtapaFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const avançarEtapa = (index) => {
    const newLaptops = [...laptops];
    const laptop = newLaptops[index];

    const etapas = ['Separação', 'Montagem', 'Gravação da Imagem Windows', 'Teste Funcional'];
    for (let i = 0; i < laptop.status.length; i++) {
      if (laptop.status[i] === '') {
        laptop.status[i] = etapas[i];
        break;
      }
    }

    setLaptops(newLaptops);
  };

  const laptopsFiltrados = laptops.filter((laptop) => {
    if (etapaFiltro === '') {
      return true;
    }
    return laptop.status.includes(etapaFiltro);
  });

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const laptopsPaginated = laptopsFiltrados.slice(indexInicial, indexFinal);

  const irParaPagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  const totalPaginas = Math.ceil(laptopsFiltrados.length / itensPorPagina);

  return (
    <div className="App">
      <h1>Gestão de Processo</h1>

      {/* Filtro de Etapa */}
      <div className="filtro">
        <label htmlFor="etapaFiltro">Filtrar por Etapa:</label>
        <select
          id="etapaFiltro"
          value={etapaFiltro}
          onChange={(e) => setEtapaFiltro(e.target.value)}
        >
          <option value="">Todas as Etapas</option>
          <option value="Separação">Separação</option>
          <option value="Montagem">Montagem</option>
          <option value="Gravação da Imagem Windows">Gravação da Imagem Windows</option>
          <option value="Teste Funcional">Teste Funcional</option>
        </select>
      </div>

      {/* Exibição de Laptops */}
      <div className="laptops-container">
        {laptopsPaginated.map((laptop, index) => (
          <div className="laptop-card" key={laptop.serial}>
            <h3>Número de Série: {laptop.serial}</h3>
            <div className="status">
              {laptop.status.map((status, i) => (
                <div
                  className={`status-step ${status ? 'completed' : 'pending'}`}
                  key={i}
                >
                  {status ? (
                    <>
                      <FaCheckCircle className="status-icon" />
                      <span>{status}</span>
                    </>
                  ) : (
                    <>
                      <FaSpinner className="status-icon spinning" />
                      <span>Pendente</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button className="advance-btn" onClick={() => avançarEtapa(index)}>
              Avançar
            </button>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button
          disabled={paginaAtual === 1}
          onClick={() => irParaPagina(paginaAtual - 1)}
        >
          Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => irParaPagina(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

// Tela Home com Logo e Abas
function Home() {
  return (
    <div className="home">
      <header className="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c6/AvellLogo.png" alt="Logo Avell" className="logo" />
        <h1>Bem-vindo ao Sistema de Gestão Avell</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li><Link to="/gerenciamento-processo">Gerenciamento de Processo</Link></li>
          <li><Link to="#">Outra Função 1</Link></li>
          <li><Link to="#">Outra Função 2</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* A tela Home será a tela inicial */}
        <Route path="/" element={<Home />} />
        {/* A tela de Gerenciamento de Processo */}
        <Route path="/gerenciamento-processo" element={<GerenciamentoDeProcesso />} />
      </Routes>
    </Router>
  );
}

export default App;
