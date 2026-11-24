/**
 * APP INATEL - AGENDAMENTO DE ATENDIMENTOS COM PROFESSORES
 * Lógica da Interface Interativa - Protótipo Funcional
 * Aluna: Ana Julia de Souza | Matrícula: 1048
 * Engenharia de Software - Inatel (Disciplina S05 - Interação Homem-Máquina)
 */

const STORAGE_KEY = "inatel_s05_state_v3";

const DEFAULT_DATA = {
  currentUser: {
    id: 1048,
    nome: "Ana Julia de Souza",
    matricula: "1048",
    curso: "Engenharia de Software",
    periodo: 4,
    turno: "noturno",
    email: "ana.aj@ges.inatel.br",
    role: "aluno"
  },

  professores: [
    {
      id: 1,
      nome: "Prof. Raphael Cardoso Mota Pereira",
      depto: "Engenharia de Software e Computação",
      email: "raphael.pereira@inatel.br",
      iniciais: "RP",
      disciplinas: [
        "S05 - Interação Homem-Máquina",
        "Engenharia de Software",
        "Ergonomia e Usabilidade"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala 204 - Prédio Central",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" },
          { hora: "15:00", status: "lotado" },
          { hora: "15:30", status: "livre" },
          { hora: "16:00", status: "livre" },
          { hora: "16:30", status: "livre" }
        ],
        "2026-11-13": [
          { hora: "10:00", status: "livre" },
          { hora: "10:30", status: "livre" },
          { hora: "11:00", status: "lotado" }
        ],
        "2026-11-17": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 2,
      nome: "Prof. Christopher de Souza Lima Francisco",
      depto: "Engenharia de Software e Computação",
      email: "christopher@inatel.br",
      iniciais: "CF",
      disciplinas: [
        "C06 - Programação Orientada a Objetos com Java",
        "C14 - Engenharia de Software",
        "S06 - Engenharia de Produto de Software",
        "S07 - Qualidade, Gerência de Config. e Evolução de Software"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-16 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 3,
      nome: "Prof. Renzo Paranaiba Mesquita",
      depto: "Coordenação de Engenharia de Software e Computação",
      email: "renzo@inatel.br",
      iniciais: "RM",
      disciplinas: [
        "C11 - Ciência de Dados com Python",
        "Algoritmos e Programação Web",
        "Maratona de Programação"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-15 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 4,
      nome: "Prof. Jonas Lopes de Vilas Boas",
      depto: "Engenharia de Software e Computação",
      email: "jonas@inatel.br",
      iniciais: "JV",
      disciplinas: [
        "C04 - Algoritmos e Estrutura de Dados III",
        "C07 - Bancos de Dados",
        "C12 - Sistemas Operacionais",
        "M10 - Matemática Discreta",
        "S02 - Bancos de Dados II (NoSQL)",
        "S03 - Arquiteturas de Software"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: "Sala I-20 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "15:30", status: "lotado" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 5,
      nome: "Prof. Marcelo Vinícius Cysneiros Aragão",
      depto: "Engenharia de Software e Computação",
      email: "marcelo.cysneiros@inatel.br",
      iniciais: "MC",
      disciplinas: [
        "C14 - Engenharia de Software (Prática)",
        "C24 - Inteligência Artificial (Prática)",
        "S07 - Qualidade e Evolução de Software (Prática)"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Lab de Software - CDG Hub",
      horarios: {
        "2026-11-12": [
          { hora: "15:00", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 6,
      nome: "Prof. Ruan Patrick de Souza",
      depto: "Engenharia de Software e Computação",
      email: "ruan@inatel.br",
      iniciais: "RS",
      disciplinas: [
        "C01 - Introdução à Engenharia",
        "C02 - Algoritmos e Estrutura de Dados I",
        "C09 - Computação Gráfica e Multimídia",
        "S01 - Paradigmas de Programação"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-15 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 7,
      nome: "Prof. Carlos Alberto Ynoguti",
      depto: "Computação e Telecomunicações",
      email: "ynoguti@inatel.br",
      iniciais: "CY",
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "C03 - Algoritmos e Estrutura de Dados II"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-15 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "10:00", status: "livre" },
          { hora: "11:00", status: "livre" }
        ]
      }
    },
    {
      id: 8,
      nome: "Prof. Daniel Andrade Nunes",
      depto: "Computação e Sistemas Embarcados",
      email: "daniel.nunes@inatel.br",
      iniciais: "DN",
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "C05 - Linguagens de Programação e Compiladores",
        "E09 - Sistemas Microcontrolados e Microprocessados"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-17 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:30", status: "livre" },
          { hora: "15:30", status: "livre" }
        ]
      }
    },
    {
      id: 9,
      nome: "Prof. Edson Josias Cruz Gimenez",
      depto: "Redes, Computação e Matemática",
      email: "edson@inatel.br",
      iniciais: "EG",
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "M02 - Álgebra e Geometria Analítica",
        "T02 - Redes de Dados I",
        "T03 - Redes de Dados II"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: "Sala I-20 / Lab II-2",
      horarios: {
        "2026-11-12": [
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 10,
      nome: "Prof. Guilherme Pedro Aquino",
      depto: "Redes de Computadores e IoT",
      email: "guilherme.aquino@inatel.br",
      iniciais: "GA",
      disciplinas: ["T03 - Redes de Dados II", "Sistemas Distribuídos e IoT"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-18 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 11,
      nome: "Prof. Felipe Augusto Pereira de Figueiredo",
      depto: "Inteligência Artificial e Telecomunicações",
      email: "felipe.figueiredo@inatel.br",
      iniciais: "FF",
      disciplinas: ["C24 - Inteligência Artificial", "Aprendizado de Máquina"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-19 / WAI Lab",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" }
        ]
      }
    },
    {
      id: 12,
      nome: "Profª. Victoria Dala Pegorara Souto",
      depto: "Inteligência Artificial e Telecomunicações",
      email: "victoria.souto@inatel.br",
      iniciais: "VS",
      disciplinas: ["C24 - Inteligência Artificial", "Redes Neurais"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-16 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "15:00", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 13,
      nome: "Profª. Milena de Oliveira Arantes",
      depto: "Gestão e Empreendedorismo",
      email: "milena.arantes@inatel.br",
      iniciais: "MA",
      disciplinas: ["G04 - Fundamentos de Gestão de Projetos", "Gestão Ágil"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-15 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 14,
      nome: "Prof. Guilherme Augusto Barucke Marcondes",
      depto: "Coordenação de Projetos e P&D",
      email: "marcondes@inatel.br",
      iniciais: "GM",
      disciplinas: ["Projetos Integradores e Fetin", "Inovação e Startups", "C15 - Sistemas Distribuídos"],
      tags: ["Projetos"],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: "Inatel Startups / CDG Hub",
      horarios: {
        "2026-11-12": [
          { hora: "16:30", status: "livre" }
        ]
      }
    },
    {
      id: 15,
      nome: "Prof. Bruno de Oliveira Monteiro",
      depto: "Eletrônica Digital e Sistemas Embarcados",
      email: "bruno.monteiro@inatel.br",
      iniciais: "BM",
      disciplinas: [
        "E07 - Eletrônica Digital Básica",
        "E08 - Eletrônica Digital Aplicada a Contadores e Sequenciadores"
      ],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Lab III-4 / Prédio III",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 16,
      nome: "Prof. João Pedro Magalhães de Paula Paiva",
      depto: "Sistemas Microcontrolados e Hardware",
      email: "joaopedro@inatel.br",
      iniciais: "JP",
      disciplinas: ["E09 - Sistemas Microcontrolados e Microprocessados"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Lab III-7 / Sala I-15",
      horarios: {
        "2026-11-12": [
          { hora: "14:30", status: "livre" },
          { hora: "15:30", status: "livre" }
        ]
      }
    },
    {
      id: 17,
      nome: "Prof. Yvo Marcelo Chiaradia Masselli",
      depto: "Sistemas Microcontrolados e Hardware",
      email: "yvo@inatel.br",
      iniciais: "YM",
      disciplinas: ["E09 - Sistemas Microcontrolados e Microprocessados"],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-22 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 18,
      nome: "Prof. Antônio Alves Ferreira Junior",
      depto: "Engenharia Elétrica e Circuitos",
      email: "antonio.alves@inatel.br",
      iniciais: "AA",
      disciplinas: ["E01 - Circuitos Elétricos em Corrente Contínua"],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-6 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 19,
      nome: "Prof. Luiz Felipe Simões de Godoy",
      depto: "Núcleo de Matemática",
      email: "luiz.godoy@inatel.br",
      iniciais: "LG",
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "M05 - Cálculo Aplicado a Séries e Equações Diferenciais"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-2 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" }
        ]
      }
    },
    {
      id: 20,
      nome: "Prof. Felipe Emanoel Chaves",
      depto: "Núcleo de Matemática e Física",
      email: "felipe.chaves@inatel.br",
      iniciais: "FC",
      disciplinas: [
        "M02 - Álgebra e Geometria Analítica",
        "M05 - Cálculo Aplicado a Séries e Equações Diferenciais",
        "F01 - Física Newtoniana Clássica",
        "F03 - Física Aplicada na Eletricidade e Eletromagnetismo"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-6 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:30", status: "livre" }
        ]
      }
    },
    {
      id: 21,
      nome: "Prof. Estevan Marcelo Lopes",
      depto: "Núcleo de Matemática",
      email: "estevan@inatel.br",
      iniciais: "EL",
      disciplinas: ["M04 - Cálculo Aplicado a Engenharia II"],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-12 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 22,
      nome: "Prof. Renan Sthel Duque",
      depto: "Núcleo de Matemática e Estatística",
      email: "renan.duque@inatel.br",
      iniciais: "RD",
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "M11 - Probabilidade e Processos Estocásticos"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-9 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:30", status: "livre" },
          { hora: "16:00", status: "livre" }
        ]
      }
    },
    {
      id: 23,
      nome: "Profª. Karina Perez Mokarzel Carneiro",
      depto: "Núcleo de Matemática e Física",
      email: "karina@inatel.br",
      iniciais: "KC",
      disciplinas: [
        "M06 - Cálculo Numérico e Estatística",
        "F01 - Física Newtoniana Clássica"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-17 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 24,
      nome: "Profª. Daniela Barude Fernandes",
      depto: "Núcleo de Matemática e Física",
      email: "daniela.barude@inatel.br",
      iniciais: "DB",
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "F01 - Física Newtoniana Clássica"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-15 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" }
        ]
      }
    },
    {
      id: 25,
      nome: "Prof. Breno Monteiro dos Santos",
      depto: "Núcleo de Física",
      email: "breno.monteiro@inatel.br",
      iniciais: "BS",
      disciplinas: [
        "F02 - Física Ondulatória, Óptica e Termodinâmica",
        "F03 - Física Aplicada na Eletricidade e Eletromagnetismo"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala I-8 - Prédio I",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre" }
        ]
      }
    },
    {
      id: 26,
      nome: "Profª. Débora Costanti Justino Ribeiro & Profª. Maysa Costa Alves",
      depto: "Núcleo de Desenho, Química e Materiais",
      email: "debora.justino@inatel.br",
      iniciais: "DM",
      disciplinas: [
        "E10 - Desenho Técnico",
        "Q01 - Química e Ciências dos Materiais"
      ],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Prédio VI (Sala 1.3) / Lab I-29",
      horarios: {
        "2026-11-12": [
          { hora: "15:00", status: "livre" }
        ]
      }
    }
  ],

  agendamentos: [
    {
      id: 101,
      professorId: 1,
      titulo: "Monitoria - S05 Interação Homem-Máquina",
      tipo: "Monitoria",
      disciplina: "S05 - Interação Homem-Máquina",
      professor: "Prof. Raphael Cardoso Mota Pereira",
      data: "Qui, 12/11/2026",
      horario: "14:30 – 15:00",
      local: "Sala 204 - Prédio Central",
      status: "CONFIRMADO",
      assunto: "Ergonomia cognitiva e testes de usabilidade",
      lembrete: "30 min antes",
      periodoGrupo: "Esta semana",
      ehFuturo: true
    },
    {
      id: 102,
      professorId: 1,
      titulo: "Projeto - S05 Interação Homem-Máquina",
      tipo: "Projeto",
      disciplina: "S05 - Interação Homem-Máquina",
      professor: "Prof. Raphael Cardoso Mota Pereira",
      data: "Sex, 13/11/2026",
      horario: "10:00 – 10:45",
      local: "Sala 204 - Prédio Central",
      status: "PENDENTE",
      assunto: "Validação do protótipo funcional e avaliação heurística",
      lembrete: "1 hora antes",
      periodoGrupo: "Esta semana",
      ehFuturo: true
    },
    {
      id: 103,
      professorId: 3,
      titulo: "Monitoria - C11 Ciência de Dados com Python",
      tipo: "Monitoria",
      disciplina: "C11 - Ciência de Dados com Python",
      professor: "Prof. Renzo Paranaiba Mesquita",
      data: "Ter, 17/11/2026",
      horario: "16:00 – 16:30",
      local: "Sala I-15 - Prédio I",
      status: "CONFIRMADO",
      assunto: "Análise exploratória e visualização de dados",
      lembrete: "30 min antes",
      periodoGrupo: "Próxima semana",
      ehFuturo: true
    },
    {
      id: 104,
      professorId: 21,
      titulo: "Monitoria - M04 Cálculo Aplicado a Engenharia II",
      tipo: "Monitoria",
      disciplina: "M04 - Cálculo Aplicado a Engenharia II",
      professor: "Prof. Estevan Marcelo Lopes",
      data: "Qui, 22/10/2026",
      horario: "15:00 – 15:30",
      local: "Sala I-12 - Prédio I",
      status: "REALIZADO",
      assunto: "Integrais múltiplas e funções de várias variáveis",
      lembrete: "Sem lembrete",
      periodoGrupo: "Anteriores",
      ehFuturo: false
    }
  ],

  notificacoes: [
    {
      id: 1,
      titulo: "Agendamento confirmado",
      mensagem: "Prof. Raphael confirmou: Qui 12/11, 14:30 (S05 - Interação Homem-Máquina)",
      tempo: "há 20 min",
      tipo: "confirm",
      lida: false
    },
    {
      id: 2,
      titulo: "Lembrete de Atendimento",
      mensagem: "Seu atendimento de S05 começa em 30 minutos na Sala 204 - Prédio Central.",
      tempo: "há 2 h",
      tipo: "lembrete",
      lida: false
    },
    {
      id: 3,
      titulo: "Novos horários disponíveis",
      mensagem: "Prof. Christopher abriu novos horários para Engenharia de Software e POO.",
      tempo: "há 1 dia",
      tipo: "aviso",
      lida: true
    }
  ],

  listaEspera: []
};

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        currentUser: JSON.parse(JSON.stringify(DEFAULT_DATA.currentUser)),
        currentScreen: "screen-home",
        previousScreen: null,
        activeFilter: "todos",
        searchQuery: "",
        rescheduleId: null,
        profTab: "pedidos",
        bookingDraft: {
          professorId: 1,
          tipo: "Monitoria",
          modalidade: "Presencial",
          data: "2026-11-12",
          dataTexto: "Qui, 12/11/2026",
          horario: "14:30 – 15:00",
          horarioInicio: "14:30",
          disciplina: "S05 - Interação Homem-Máquina",
          assunto: "",
          lembreteMin: 30,
          local: "Sala 204 - Prédio Central"
        },
        selectedAppointment: null,
        professores: parsed.professores || JSON.parse(JSON.stringify(DEFAULT_DATA.professores)),
        agendamentos: parsed.agendamentos || JSON.parse(JSON.stringify(DEFAULT_DATA.agendamentos)),
        notificacoes: parsed.notificacoes || JSON.parse(JSON.stringify(DEFAULT_DATA.notificacoes)),
        listaEspera: parsed.listaEspera || []
      };
    }
  } catch (e) {
    console.warn("Erro ao carregar estado:", e);
  }

  return {
    currentUser: JSON.parse(JSON.stringify(DEFAULT_DATA.currentUser)),
    currentScreen: "screen-home",
    previousScreen: null,
    activeFilter: "todos",
    searchQuery: "",
    rescheduleId: null,
    profTab: "pedidos",
    bookingDraft: {
      professorId: 1,
      tipo: "Monitoria",
      modalidade: "Presencial",
      data: "2026-11-12",
      dataTexto: "Qui, 12/11/2026",
      horario: "14:30 – 15:00",
      horarioInicio: "14:30",
      disciplina: "S05 - Interação Homem-Máquina",
      assunto: "",
      lembreteMin: 30,
      local: "Sala 204 - Prédio Central"
    },
    selectedAppointment: null,
    professores: JSON.parse(JSON.stringify(DEFAULT_DATA.professores)),
    agendamentos: JSON.parse(JSON.stringify(DEFAULT_DATA.agendamentos)),
    notificacoes: JSON.parse(JSON.stringify(DEFAULT_DATA.notificacoes)),
    listaEspera: []
  };
}

const AppState = loadInitialState();

function persistState() {
  try {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          professores: AppState.professores,
          agendamentos: AppState.agendamentos,
          notificacoes: AppState.notificacoes,
          listaEspera: AppState.listaEspera
        })
    );
  } catch (e) {
    console.warn("Erro ao salvar estado:", e);
  }
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  ensureGradeBanner();
  renderHomeNextBooking();
  renderProfessores();
  renderAgendamentos("proximos");
  renderNotificacoes("todas");
  renderProfessorView();
  setupEventListeners();
  updateTimeSlotSelection("14:30");
  updateBottomNav("screen-home");
});

function ensureGradeBanner() {
  const slotsGrid = document.getElementById("timeSlotsGrid");
  if (slotsGrid && !document.getElementById("gradeCompatBanner")) {
    const banner = document.createElement("div");
    banner.id = "gradeCompatBanner";
    banner.style.cssText =
        "margin-top: 12px; padding: 10px 12px; border-radius: 6px; font-size: 12px; line-height: 1.4; background: var(--status-livre-bg); color: var(--status-livre-text); border: 1px solid rgba(27,94,32,0.15);";
    slotsGrid.parentNode.insertBefore(banner, slotsGrid.nextSibling);
  }
}

// ==========================================================================
// ROTEAMENTO
// ==========================================================================
function navigateTo(screenId, recordHistory = true) {
  const current = document.querySelector(".screen.active");
  const target = document.getElementById(screenId);
  if (!target) return;

  if (recordHistory && current) {
    AppState.previousScreen = current.id;
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  target.classList.add("active");
  AppState.currentScreen = screenId;

  updateBottomNav(screenId);

  if (screenId === "screen-escolher-horarios") {
    renderTimeSlotsForSelectedDay();
  } else if (screenId === "screen-professor-agenda") {
    renderProfessorView();
  }

  const viewport = document.getElementById("appViewport");
  if (viewport) viewport.scrollTop = 0;
}

// ==========================================================================
// TELA 2: HOME
// ==========================================================================
function renderHomeNextBooking() {
  const container = document.getElementById("homeNextBookingContainer");
  if (!container) return;

  const proximo = AppState.agendamentos.find(a => a.ehFuturo && a.status !== "CANCELADO");

  if (proximo) {
    container.innerHTML = `
      <div class="next-booking-card" onclick="viewAppointmentDetail(${proximo.id})">
        <div class="booking-card-main">
          <div class="booking-title">${proximo.titulo}</div>
          <div class="booking-time">${proximo.data} - ${proximo.horario.split("–")[0].trim()}</div>
          <div class="booking-location">${proximo.local} - ${proximo.professor}</div>
        </div>
        <div class="status-badge ${proximo.status === "CONFIRMADO" ? "livre" : "vagas"}">
          ${proximo.status}
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="next-booking-card" onclick="navigateTo('screen-escolher-professor')">
        <div class="booking-card-main">
          <div class="booking-title">Nenhum atendimento agendado</div>
          <div class="booking-location">Toque aqui para encontrar horários com professores</div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--inatel-blue-600)" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </div>
    `;
  }
}

// ==========================================================================
// TELA 3: ESCOLHER PROFESSOR
// ==========================================================================
function filterProfessores(tipo, chipElement) {
  AppState.activeFilter = tipo;
  document.querySelectorAll("#screen-escolher-professor .filter-chip").forEach(c => c.classList.remove("active"));
  if (chipElement) chipElement.classList.add("active");
  renderProfessores();
}

function handleSearch(query) {
  AppState.searchQuery = query.toLowerCase().trim();
  renderProfessores();
}

function renderProfessores() {
  const listContainer = document.getElementById("professorListContainer");
  if (!listContainer) return;

  const filtrados = AppState.professores.filter(prof => {
    if (AppState.activeFilter === "monitoria" && !prof.tags.includes("Monitoria")) return false;
    if (AppState.activeFilter === "projetos" && !prof.tags.includes("Projetos")) return false;

    if (AppState.searchQuery) {
      const matchNome = prof.nome.toLowerCase().includes(AppState.searchQuery);
      const matchDepto = prof.depto.toLowerCase().includes(AppState.searchQuery);
      const matchDisc = prof.disciplinas.some(d => d.toLowerCase().includes(AppState.searchQuery));
      return matchNome || matchDepto || matchDisc;
    }
    return true;
  });

  if (filtrados.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-weight: 600; margin-bottom: 6px;">Nenhum professor encontrado</p>
        <p style="font-size: 12px;">Tente pesquisar por outro nome, disciplina ou sigla (ex: S05, C06, Cálculo).</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtrados.map(prof => `
    <div class="professor-card" onclick="selectProfessor(${prof.id})">
      <div class="professor-card-left">
        <div class="professor-avatar">${prof.iniciais}</div>
        <div class="professor-info">
          <h4>${prof.nome}</h4>
          <div class="depto">${prof.depto}</div>
          <div class="disciplinas-tags">
            ${prof.disciplinas.map(d => `<span class="disc-tag">${d}</span>`).join("")}
          </div>
        </div>
      </div>
      <div>
        <span class="status-badge ${prof.status}">${prof.statusTexto}</span>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// TELA 4: PERFIL DO PROFESSOR
// ==========================================================================
function selectProfessor(id) {
  const prof = AppState.professores.find(p => p.id === id);
  if (!prof) return;

  AppState.rescheduleId = null;
  AppState.bookingDraft.professorId = prof.id;
  AppState.bookingDraft.disciplina = prof.disciplinas[0] || "S05 - Interação Homem-Máquina";
  AppState.bookingDraft.local = prof.localPadrao;
  AppState.bookingDraft.modalidade = "Presencial";

  document.getElementById("profDetailAvatar").innerText = prof.iniciais;
  document.getElementById("profDetailNome").innerText = prof.nome;
  document.getElementById("profDetailDepto").innerText = prof.depto;
  document.getElementById("profDetailEmail").innerText = prof.email;
  document.getElementById("profDetailLocal").innerText = prof.localPadrao;

  const discTags = document.getElementById("profDetailDisciplinas");
  if (discTags) {
    discTags.innerHTML = prof.disciplinas
        .map(d => `<span class="disc-tag" style="font-size: 12px; padding: 4px 10px;">${d}</span>`)
        .join("");
  }

  navigateTo("screen-perfil-professor");
}

function selectServiceType(tipo, element) {
  AppState.bookingDraft.tipo = tipo;
  document.querySelectorAll(".service-option-radio").forEach(el => el.classList.remove("selected"));
  if (element) element.classList.add("selected");
  updateTimeSlotSelection(AppState.bookingDraft.horarioInicio);
}

// ==========================================================================
// TELA 5: DATA E HORÁRIOS
// ==========================================================================
function selectCalendarDay(dayNumber, dayElement) {
  document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));
  if (dayElement) dayElement.classList.add("selected");

  const formattedDay = dayNumber < 10 ? `0${dayNumber}` : dayNumber;
  AppState.bookingDraft.data = `2026-11-${formattedDay}`;

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const dateObj = new Date(2026, 10, dayNumber);
  const diaSemanaTexto = diasSemana[dateObj.getDay()] || "Qui";

  AppState.bookingDraft.dataTexto = `${diaSemanaTexto}, ${formattedDay}/11/2026`;
  const label = document.getElementById("selectedDateLabel");
  if (label) label.innerText = `${diaSemanaTexto}, ${formattedDay}/11`;

  renderTimeSlotsForSelectedDay();
}

function renderTimeSlotsForSelectedDay() {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const slotsGrid = document.getElementById("timeSlotsGrid");
  if (!slotsGrid || !prof) return;

  ensureGradeBanner();

  const dia = AppState.bookingDraft.data;
  const horarios = (prof.horarios && prof.horarios[dia]) || [
    { hora: "14:00", status: "livre" },
    { hora: "14:30", status: "livre" },
    { hora: "15:00", status: "lotado" },
    { hora: "15:30", status: "livre" },
    { hora: "16:00", status: "livre" }
  ];

  const primeiroLivre = horarios.find(s => s.status === "livre");
  if (primeiroLivre && !horarios.some(s => s.hora === AppState.bookingDraft.horarioInicio && s.status === "livre")) {
    updateTimeSlotSelection(primeiroLivre.hora);
  }

  slotsGrid.innerHTML = horarios
      .map(slot => {
        const isLotado = slot.status === "lotado";
        const isSelected = slot.hora === AppState.bookingDraft.horarioInicio && !isLotado;

        if (isLotado) {
          return `
          <button
            type="button"
            class="time-slot-btn disabled"
            style="opacity: 0.72; cursor: pointer; border-style: dashed;"
            title="Horário lotado - toque para entrar na lista de espera"
            onclick="joinWaitlist('${slot.hora}')">
            ${slot.hora} · Fila
          </button>
        `;
        }

        return `
        <button
          type="button"
          class="time-slot-btn ${isSelected ? "selected" : ""}"
          onclick="updateTimeSlotSelection('${slot.hora}', this)">
          ${slot.hora}
        </button>
      `;
      })
      .join("");

  updateGradeCompatibilityBanner(AppState.bookingDraft.horarioInicio);
}

function updateTimeSlotSelection(hora, btnElement) {
  AppState.bookingDraft.horarioInicio = hora;
  const duracaoMin = AppState.bookingDraft.tipo === "Monitoria" ? 30 : 45;
  const [h, m] = hora.split(":").map(Number);
  const totalMin = h * 60 + m + duracaoMin;
  const endH = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const endM = String(totalMin % 60).padStart(2, "0");
  AppState.bookingDraft.horario = `${hora} – ${endH}:${endM}`;

  document.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("selected"));
  if (btnElement) btnElement.classList.add("selected");

  updateGradeCompatibilityBanner(hora);
}

function updateGradeCompatibilityBanner(hora) {
  const banner = document.getElementById("gradeCompatBanner");
  if (!banner || !hora) return;

  const [h, m] = hora.split(":").map(Number);
  const minutos = h * 60 + m;
  const conflitaNoturno = minutos >= 19 * 60 + 15 && minutos <= 22 * 60 + 20;

  if (conflitaNoturno) {
    banner.style.background = "var(--status-vagas-bg)";
    banner.style.color = "var(--status-vagas-text)";
    banner.innerHTML = `<strong>⚠ Atenção à grade horária:</strong> O horário <strong>${hora}</strong> coincide com o turno das suas aulas do 4º período noturno (19h30–22h20).`;
  } else {
    banner.style.background = "var(--status-livre-bg)";
    banner.style.color = "var(--status-livre-text)";
    banner.innerHTML = `<strong>✓ Compatível com sua grade (4º período noturno):</strong> Horário livre antes das aulas (19h30). <em>Toque em horários lotados para lista de espera.</em>`;
  }
}

function joinWaitlist(hora) {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  if (!prof) return;

  const chave = `${prof.id}-${AppState.bookingDraft.data}-${hora}`;
  if (AppState.listaEspera.includes(chave)) {
    showToast("Você já está na lista de espera para este horário.");
    return;
  }

  AppState.listaEspera.push(chave);
  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Lista de espera ativada",
    mensagem: `Você será notificada se abrir vaga com ${prof.nome} em ${AppState.bookingDraft.dataTexto} às ${hora}.`,
    tempo: "Agora mesmo",
    tipo: "aviso",
    lida: false
  });

  persistState();
  renderNotificacoes("todas");
  showToast(`Adicionada à lista de espera (${hora})!`);
}

// ==========================================================================
// TELA 6: CONFIRMAR AGENDAMENTO
// ==========================================================================
function prepareConfirmationScreen() {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  if (!prof) return;

  const discSelect = document.getElementById("confirmInputDisciplina");
  if (discSelect) {
    discSelect.innerHTML = prof.disciplinas.map(d => `<option value="${d}">${d}</option>`).join("");
    if (prof.disciplinas.includes(AppState.bookingDraft.disciplina)) {
      discSelect.value = AppState.bookingDraft.disciplina;
    } else {
      AppState.bookingDraft.disciplina = prof.disciplinas[0];
      discSelect.value = AppState.bookingDraft.disciplina;
    }
  }

  const modSelect = document.getElementById("confirmInputModalidade");
  if (modSelect) modSelect.value = AppState.bookingDraft.modalidade || "Presencial";

  const tipoSelect = document.getElementById("confirmInputTipo");
  if (tipoSelect) tipoSelect.value = AppState.bookingDraft.tipo;

  document.getElementById("confirmProfNome").innerText = prof.nome;
  document.getElementById("confirmTipoDisciplina").innerText = `${AppState.bookingDraft.tipo} - ${AppState.bookingDraft.disciplina}`;
  document.getElementById("confirmDataHorario").innerText = `${AppState.bookingDraft.dataTexto} - ${AppState.bookingDraft.horario}`;
  document.getElementById("confirmLocal").innerText =
      AppState.bookingDraft.modalidade === "Remoto"
          ? "Remoto (Microsoft Teams)"
          : prof.localPadrao;

  navigateTo("screen-confirmar-agendamento");
}

function handleConfirmDisciplinaChange(novaDisciplina) {
  AppState.bookingDraft.disciplina = novaDisciplina;
  const el = document.getElementById("confirmTipoDisciplina");
  if (el) el.innerText = `${AppState.bookingDraft.tipo} - ${novaDisciplina}`;
}

function handleConfirmModalidadeChange(novaModalidade) {
  AppState.bookingDraft.modalidade = novaModalidade;
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const el = document.getElementById("confirmLocal");
  if (el) {
    el.innerText =
        novaModalidade === "Remoto"
            ? "Remoto (Microsoft Teams)"
            : prof
                ? prof.localPadrao
                : "Sala 204 - Prédio Central";
  }
}

function setQuickTopic(topic) {
  const input = document.getElementById("confirmInputAssunto");
  if (input) {
    input.value = topic;
    AppState.bookingDraft.assunto = topic;
  }
}

function submitBooking() {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const tipoInput = document.getElementById("confirmInputTipo")?.value || AppState.bookingDraft.tipo;
  const discInput = document.getElementById("confirmInputDisciplina")?.value || AppState.bookingDraft.disciplina;
  const modInput = document.getElementById("confirmInputModalidade")?.value || AppState.bookingDraft.modalidade;
  const assunto = document.getElementById("confirmInputAssunto")?.value.trim() || "Dúvidas gerais da disciplina";
  const lembreteMin = document.getElementById("confirmInputLembrete")?.value || "30";

  const localFinal =
      modInput === "Remoto"
          ? "Remoto (Microsoft Teams)"
          : prof
              ? prof.localPadrao
              : "Sala 204 - Prédio Central";

  if (prof && prof.horarios && prof.horarios[AppState.bookingDraft.data]) {
    const slotObj = prof.horarios[AppState.bookingDraft.data].find(
        s => s.hora === AppState.bookingDraft.horarioInicio
    );
    if (slotObj) slotObj.status = "lotado";
  }

  if (AppState.rescheduleId) {
    const antigo = AppState.agendamentos.find(a => a.id === AppState.rescheduleId);
    if (antigo) {
      antigo.titulo = `${tipoInput} - ${discInput}`;
      antigo.tipo = tipoInput;
      antigo.disciplina = discInput;
      antigo.data = AppState.bookingDraft.dataTexto;
      antigo.horario = AppState.bookingDraft.horario;
      antigo.local = localFinal;
      antigo.assunto = assunto;
      antigo.lembrete = `${lembreteMin} min antes`;
      antigo.status = "PENDENTE";
    }
    AppState.rescheduleId = null;

    AppState.notificacoes.unshift({
      id: Date.now(),
      titulo: "Atendimento reagendado!",
      mensagem: `${tipoInput} - ${discInput} remarcado para ${AppState.bookingDraft.dataTexto} às ${AppState.bookingDraft.horario.split("–")[0].trim()}.`,
      tempo: "Agora mesmo",
      tipo: "confirm",
      lida: false
    });

    persistState();
    renderHomeNextBooking();
    renderAgendamentos("proximos");
    renderNotificacoes("todas");
    renderProfessorView();

    document.getElementById("successDetailTitulo").innerText = `${tipoInput} - ${discInput}`;
    document.getElementById("successDetailData").innerText = `${AppState.bookingDraft.dataTexto} - ${AppState.bookingDraft.horario.split("–")[0].trim()}`;
    document.getElementById("successDetailStatus").innerText = "PENDENTE DE CONFIRMAÇÃO";

    showToast("Horário reagendado e enviado ao professor!");
    navigateTo("screen-agendamento-sucesso");
    return;
  }

  const novoAgendamento = {
    id: Date.now(),
    professorId: prof ? prof.id : 1,
    titulo: `${tipoInput} - ${discInput}`,
    tipo: tipoInput,
    disciplina: discInput,
    professor: prof ? prof.nome : "Professor Inatel",
    data: AppState.bookingDraft.dataTexto,
    horario: AppState.bookingDraft.horario,
    local: localFinal,
    status: "PENDENTE",
    assunto: assunto,
    lembrete: `${lembreteMin} min antes`,
    periodoGrupo: "Esta semana",
    ehFuturo: true
  };

  AppState.agendamentos.unshift(novoAgendamento);

  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Solicitação enviada!",
    mensagem: `${novoAgendamento.titulo} solicitado para ${novoAgendamento.data} às ${novoAgendamento.horario.split("–")[0].trim()}.`,
    tempo: "Agora mesmo",
    tipo: "confirm",
    lida: false
  });

  document.getElementById("successDetailTitulo").innerText = novoAgendamento.titulo;
  document.getElementById("successDetailData").innerText = `${novoAgendamento.data} - ${novoAgendamento.horario.split("–")[0].trim()}`;
  document.getElementById("successDetailStatus").innerText = "PENDENTE DE CONFIRMAÇÃO";

  persistState();
  renderHomeNextBooking();
  renderAgendamentos("proximos");
  renderNotificacoes("todas");
  renderProfessorView();

  showToast("Agendamento solicitado!");
  navigateTo("screen-agendamento-sucesso");
}

// ==========================================================================
// TELA 8: MEUS AGENDAMENTOS
// ==========================================================================
function switchAppointmentsTab(tab, tabElement) {
  document.querySelectorAll(".app-tab").forEach(t => t.classList.remove("active"));
  if (tabElement) tabElement.classList.add("active");
  renderAgendamentos(tab);
}

function renderAgendamentos(tab) {
  const container = document.getElementById("appointmentsListContainer");
  if (!container) return;

  let filtrados = [];
  if (tab === "proximos") {
    filtrados = AppState.agendamentos.filter(a => a.ehFuturo && a.status !== "CANCELADO");
  } else if (tab === "anteriores") {
    filtrados = AppState.agendamentos.filter(a => !a.ehFuturo && a.status !== "CANCELADO");
  } else if (tab === "cancelados") {
    filtrados = AppState.agendamentos.filter(a => a.status === "CANCELADO");
  }

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; color: var(--text-muted);">
        <p style="font-weight: 600; margin-bottom: 4px;">Nenhum agendamento nesta categoria</p>
        <p style="font-size: 12px;">Seus compromissos aparecerão aqui quando marcados.</p>
      </div>
    `;
    return;
  }

  const grupos = {};
  filtrados.forEach(a => {
    const grupo = a.periodoGrupo || "Próximos";
    if (!grupos[grupo]) grupos[grupo] = [];
    grupos[grupo].push(a);
  });

  let html = "";
  for (const [nomeGrupo, itens] of Object.entries(grupos)) {
    html += `<div class="app-group-title">${nomeGrupo}</div>`;
    itens.forEach(item => {
      const statusClass =
          item.status === "CONFIRMADO" || item.status === "REALIZADO"
              ? "livre"
              : item.status === "PENDENTE"
                  ? "vagas"
                  : "lotado";
      html += `
        <div class="appointment-card" onclick="viewAppointmentDetail(${item.id})">
          <div class="appointment-card-info">
            <h4>${item.titulo}</h4>
            <div class="app-datetime">${item.data} - ${item.horario}</div>
            <div class="app-prof">${item.professor} - ${item.local}</div>
          </div>
          <span class="status-badge ${statusClass}">${item.status}</span>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

// ==========================================================================
// TELA 9 E 10: DETALHE, REAGENDAMENTO E CANCELAMENTO
// ==========================================================================
function viewAppointmentDetail(id) {
  const item = AppState.agendamentos.find(a => a.id === id);
  if (!item) return;

  AppState.selectedAppointment = item;

  document.getElementById("detailItemTitulo").innerText = item.titulo;
  document.getElementById("detailItemStatus").innerText = item.status;

  const statusPill = document.getElementById("detailItemStatus");
  statusPill.className = "detail-status-pill";
  if (item.status === "CONFIRMADO" || item.status === "REALIZADO") {
    statusPill.style.background = "var(--status-livre-bg)";
    statusPill.style.color = "var(--status-livre-text)";
  } else if (item.status === "PENDENTE") {
    statusPill.style.background = "var(--status-vagas-bg)";
    statusPill.style.color = "var(--status-vagas-text)";
  } else {
    statusPill.style.background = "var(--status-lotado-bg)";
    statusPill.style.color = "var(--status-lotado-text)";
  }

  document.getElementById("detailItemProf").innerText = item.professor;
  document.getElementById("detailItemData").innerText = item.data;
  document.getElementById("detailItemHorario").innerText = item.horario;
  document.getElementById("detailItemLocal").innerText = item.local;
  document.getElementById("detailItemAssunto").innerText = item.assunto || "Dúvidas de disciplina";
  document.getElementById("detailItemLembrete").innerText = item.lembrete || "30 min antes";
  const mapLocal = document.getElementById("detailMapLocal");
  if (mapLocal) mapLocal.innerText = item.local;

  const btnCancelar = document.getElementById("btnOpenCancelModal");
  const btnReagendar = document.getElementById("btnRescheduleAppointment");
  const esconderAcoes = item.status === "CANCELADO" || !item.ehFuturo;

  if (btnCancelar) btnCancelar.style.display = esconderAcoes ? "none" : "block";
  if (btnReagendar) btnReagendar.style.display = esconderAcoes ? "none" : "block";

  navigateTo("screen-detalhe-agendamento");
}

function startRescheduleAppointment() {
  const item = AppState.selectedAppointment;
  if (!item) return;

  const prof =
      AppState.professores.find(p => p.id === item.professorId) ||
      AppState.professores.find(p => p.nome === item.professor) ||
      AppState.professores[0];

  AppState.rescheduleId = item.id;
  AppState.bookingDraft.professorId = prof.id;
  AppState.bookingDraft.tipo = item.tipo || "Monitoria";
  AppState.bookingDraft.disciplina = item.disciplina || prof.disciplinas[0];
  AppState.bookingDraft.local = prof.localPadrao;

  showToast("Escolha a nova data e horário para reagendar.");
  navigateTo("screen-escolher-horarios");
}

function openCancelModal() {
  const item = AppState.selectedAppointment;
  if (!item) return;

  document.getElementById("cancelModalTitulo").innerText = item.titulo;
  document.getElementById("cancelModalData").innerText = `${item.data} - ${item.horario}`;
  document.getElementById("modalCancelar").classList.add("active");
}

function closeCancelModal() {
  document.getElementById("modalCancelar").classList.remove("active");
}

function confirmCancellation() {
  const item = AppState.selectedAppointment;
  if (!item) return;

  item.status = "CANCELADO";
  item.periodoGrupo = "Cancelados";

  const prof = AppState.professores.find(p => p.id === item.professorId || p.nome === item.professor);
  const horaInicio = item.horario.split("–")[0].trim();
  if (prof && prof.horarios) {
    Object.values(prof.horarios).forEach(listaSlots => {
      const slot = listaSlots.find(s => s.hora === horaInicio);
      if (slot) slot.status = "livre";
    });
  }

  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Agendamento cancelado",
    mensagem: `Você cancelou ${item.titulo} do dia ${item.data}. A vaga foi liberada automaticamente.`,
    tempo: "Agora mesmo",
    tipo: "cancel",
    lida: false
  });

  closeCancelModal();
  persistState();
  showToast("Agendamento cancelado. Vaga liberada!");

  renderHomeNextBooking();
  renderAgendamentos("cancelados");
  renderNotificacoes("todas");
  renderProfessorView();
  navigateTo("screen-meus-agendamentos");
}

// ==========================================================================
// TELA 11: NOTIFICAÇÕES
// ==========================================================================
function filterNotificacoes(tipo, chipElement) {
  document.querySelectorAll(".notif-chip").forEach(c => c.classList.remove("active"));
  if (chipElement) chipElement.classList.add("active");
  renderNotificacoes(tipo);
}

function renderNotificacoes(filtro) {
  const container = document.getElementById("notificationsListContainer");
  if (!container) return;

  let filtradas = AppState.notificacoes;
  if (filtro === "nao-lidas") {
    filtradas = AppState.notificacoes.filter(n => !n.lida);
  }

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-weight: 600;">Nenhuma notificação no momento</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtradas
      .map(n => {
        let iconSvg = "";
        if (n.tipo === "confirm") {
          iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else if (n.tipo === "lembrete") {
          iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
        } else if (n.tipo === "cancel") {
          iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        } else {
          iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path></svg>`;
        }

        return `
        <div class="notif-card ${!n.lida ? "unread" : ""}">
          <div class="notif-icon-circle ${n.tipo}">
            ${iconSvg}
          </div>
          <div class="notif-content">
            <h5>${n.titulo}</h5>
            <p>${n.mensagem}</p>
            <div class="notif-time">${n.tempo}</div>
          </div>
        </div>
      `;
      })
      .join("");

  const unreadCount = AppState.notificacoes.filter(n => !n.lida).length;
  const badge = document.getElementById("navNotifBadge");
  if (badge) {
    if (unreadCount > 0) {
      badge.innerText = unreadCount;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
}

function markAllNotificationsRead() {
  AppState.notificacoes.forEach(n => (n.lida = true));
  persistState();
  renderNotificacoes("todas");
  showToast("Todas as notificações foram marcadas como lidas.");
}

// ==========================================================================
// VISÃO DO PROFESSOR (TELAS 13 E 14 - 100% LIMPA E SINCRONIZADA)
// ==========================================================================
function toggleUserRole() {
  if (AppState.currentUser.role === "aluno") {
    AppState.currentUser.role = "professor";
    const btnText = document.getElementById("btnToggleRoleText");
    if (btnText) btnText.innerText = "Alternar para Aluna";
    const roleText = document.getElementById("roleIndicatorText");
    if (roleText) roleText.innerText = "Modo: Prof. Raphael Pereira";
    AppState.profTab = "pedidos";
    renderProfessorView();
    navigateTo("screen-professor-agenda");
    showToast("Modo Professor ativado!");
  } else {
    AppState.currentUser.role = "aluno";
    const btnText = document.getElementById("btnToggleRoleText");
    if (btnText) btnText.innerText = "Alternar para Professor (Raphael)";
    const roleText = document.getElementById("roleIndicatorText");
    if (roleText) roleText.innerText = "Modo: Aluna";
    renderHomeNextBooking();
    renderAgendamentos("proximos");
    navigateTo("screen-home");
    showToast("Modo Aluna ativado.");
  }
}

function switchProfessorTab(tab, chipEl) {
  AppState.profTab = tab;
  document.querySelectorAll(".prof-tab").forEach(c => c.classList.remove("active"));
  if (chipEl) chipEl.classList.add("active");
  renderProfessorView();
}

function renderProfessorView() {
  const container = document.getElementById("professorAgendaContainer");
  if (!container) return;

  // Filtra apenas agendamentos destinados ao Prof. Raphael (professorId === 1)
  const meusAtendimentos = AppState.agendamentos.filter(
      a => a.professorId === 1 && a.ehFuturo && a.status !== "CANCELADO"
  );
  const pendentes = meusAtendimentos.filter(a => a.status === "PENDENTE");
  const aceitos = meusAtendimentos.filter(a => a.status === "CONFIRMADO");

  const tabPedidos = document.getElementById("profTabPedidos");
  if (tabPedidos) tabPedidos.innerText = `Pedidos (${pendentes.length})`;

  // Garantir estado visual da aba ativa
  document.querySelectorAll(".prof-tab").forEach(t => t.classList.remove("active"));
  const activeTabEl =
      AppState.profTab === "aceitos"
          ? document.getElementById("profTabAceitos")
          : AppState.profTab === "horarios"
              ? document.getElementById("profTabHorarios")
              : document.getElementById("profTabPedidos");
  if (activeTabEl) activeTabEl.classList.add("active");

  if (AppState.profTab === "pedidos") {
    if (pendentes.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 36px 16px; color: var(--text-muted);">
          <p style="font-weight:700; margin-bottom:4px;">Nenhuma solicitação pendente</p>
          <p style="font-size:12px;">Novos pedidos de agendamento dos alunos aparecerão aqui.</p>
        </div>
      `;
      return;
    }

    container.innerHTML =
        `<span class="section-title">Pendentes de resposta</span>` +
        pendentes
            .map(
                req => `
          <div class="request-card">
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--text-title);">Ana Julia de Souza (Mat. 1048) · ${req.tipo}</h4>
              <div style="font-size: 12px; color: var(--inatel-blue-700); font-weight: 600;">${req.data} - ${req.horario} · ${req.disciplina}</div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Local: ${req.local} · Assunto: ${req.assunto}</div>
            </div>
            <div class="request-actions">
              <button type="button" class="btn-refuse" onclick="refuseStudentRequest(${req.id})">Recusar</button>
              <button type="button" class="btn-accept" onclick="acceptStudentRequest(${req.id})">Aceitar</button>
            </div>
          </div>
        `
            )
            .join("");
  } else if (AppState.profTab === "aceitos") {
    if (aceitos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 36px 16px; color: var(--text-muted);">
          <p style="font-weight:700;">Nenhum atendimento confirmado</p>
        </div>
      `;
      return;
    }

    container.innerHTML =
        `<span class="section-title">Atendimentos confirmados</span>` +
        aceitos
            .map(
                item => `
          <div class="appointment-card" style="cursor: default;">
            <div class="appointment-card-info">
              <h4>${item.titulo}</h4>
              <div class="app-datetime">${item.data} - ${item.horario}</div>
              <div class="app-prof">Aluna: Ana Julia de Souza · ${item.local}</div>
            </div>
            <span class="status-badge livre">CONFIRMADO</span>
          </div>
        `
            )
            .join("");
  } else if (AppState.profTab === "horarios") {
    const prof = AppState.professores.find(p => p.id === 1);
    const dias = prof && prof.horarios ? Object.entries(prof.horarios) : [];

    container.innerHTML =
        `<span class="section-title">Grade de disponibilidade publicada</span>` +
        dias
            .map(
                ([dataKey, slots]) => `
          <div class="profile-card-block">
            <h5>Data: ${dataKey.split("-").reverse().join("/")}</h5>
            <div class="disciplinas-tags">
              ${slots
                    .map(
                        s =>
                            `<span class="status-badge ${s.status === "livre" ? "livre" : "lotado"}">${s.hora} (${s.status})</span>`
                    )
                    .join("")}
            </div>
          </div>
        `
            )
            .join("") +
        `<button class="btn-action-primary" onclick="navigateTo('screen-professor-disponibilidade')">+ Abrir novo horário</button>`;
  }
}

function acceptStudentRequest(appointmentId) {
  const ag = AppState.agendamentos.find(a => a.id === appointmentId);
  if (ag) {
    ag.status = "CONFIRMADO";
    AppState.notificacoes.unshift({
      id: Date.now(),
      titulo: "Agendamento confirmado pelo docente!",
      mensagem: `${ag.professor} aceitou seu atendimento (${ag.titulo}) para ${ag.data} às ${ag.horario.split("–")[0].trim()}.`,
      tempo: "Agora mesmo",
      tipo: "confirm",
      lida: false
    });
    persistState();
    renderHomeNextBooking();
    renderNotificacoes("todas");
    renderProfessorView();
    showToast("Solicitação aceita! A aluna foi notificada.");
  }
}

function refuseStudentRequest(appointmentId) {
  const ag = AppState.agendamentos.find(a => a.id === appointmentId);
  if (ag) {
    ag.status = "CANCELADO";
    ag.periodoGrupo = "Cancelados";

    // Liberar slot novamente
    const prof = AppState.professores.find(p => p.id === ag.professorId);
    const horaInicio = ag.horario.split("–")[0].trim();
    if (prof && prof.horarios) {
      Object.values(prof.horarios).forEach(listaSlots => {
        const slot = listaSlots.find(s => s.hora === horaInicio);
        if (slot) slot.status = "livre";
      });
    }

    AppState.notificacoes.unshift({
      id: Date.now(),
      titulo: "Solicitação recusada pelo docente",
      mensagem: `${ag.professor} não pôde atender no horário ${ag.data} (${ag.horario}). Escolha outro horário disponível.`,
      tempo: "Agora mesmo",
      tipo: "cancel",
      lida: false
    });
    persistState();
    renderHomeNextBooking();
    renderNotificacoes("todas");
    renderProfessorView();
    showToast("Solicitação recusada. Vaga liberada.");
  }
}

function handleProfessorSaveSlot() {
  const prof = AppState.professores.find(p => p.id === 1);
  const dataVal = document.getElementById("profNewData")?.value || "2026-11-12";
  const horaVal = document.getElementById("profNewHora")?.value || "17:00";
  const discVal = document.getElementById("profNewDisciplina")?.value || "S05 - Interação Homem-Máquina";

  if (prof) {
    if (!prof.horarios[dataVal]) prof.horarios[dataVal] = [];
    const existe = prof.horarios[dataVal].some(s => s.hora === horaVal);
    if (!existe) {
      prof.horarios[dataVal].push({ hora: horaVal, status: "livre" });
      prof.horarios[dataVal].sort((a, b) => a.hora.localeCompare(b.hora));
    }
  }

  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Novo horário aberto pelo docente",
    mensagem: `Prof. Raphael disponibilizou o horário ${horaVal} (${dataVal.split("-").reverse().join("/")}) para ${discVal}.`,
    tempo: "Agora mesmo",
    tipo: "aviso",
    lida: false
  });

  persistState();
  renderNotificacoes("todas");
  AppState.profTab = "horarios";
  renderProfessorView();
  showToast(`Horário ${horaVal} publicado para os alunos!`);
  navigateTo("screen-professor-agenda");
}

// ==========================================================================
// UTILITÁRIOS E MENU LATERAL
// ==========================================================================
function showToast(message) {
  const toast = document.getElementById("toastAlert");
  const msgElement = document.getElementById("toastMsg");
  if (!toast || !msgElement) return;

  msgElement.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3400);
}

function toggleDeviceMode() {
  document.body.classList.toggle("fullscreen-mode");
  const isFullscreen = document.body.classList.contains("fullscreen-mode");
  const btnText = document.getElementById("btnToggleDeviceText");
  const icon = document.getElementById("deviceIcon");

  if (isFullscreen) {
    if (btnText) btnText.innerText = "Ver na Moldura do Celular";
    if (icon) {
      icon.innerHTML =
          '<rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>';
    }
  } else {
    if (btnText) btnText.innerText = "Ver em Tela Cheia";
    if (icon) {
      icon.innerHTML =
          '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>';
    }
  }
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.clear();
  window.location.reload();
}

function setupEventListeners() {
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCancelModal();
      toggleDrawer(false);
    }
  });
}

function toggleDrawer(open) {
  document.querySelector(".device-screen")?.classList.toggle("drawer-open", open);
}

function updateBottomNav(screenId) {
  toggleDrawer(false);

  const map = {
    "screen-home": "dr-home",
    "screen-notificacoes": "dr-avisos",
    "screen-escolher-professor": "dr-novo",
    "screen-perfil-professor": "dr-novo",
    "screen-escolher-horarios": "dr-novo",
    "screen-confirmar-agendamento": "dr-novo",
    "screen-meus-agendamentos": "dr-agenda",
    "screen-detalhe-agendamento": "dr-agenda",
    "screen-agendamento-sucesso": "dr-agenda",
    "screen-perfil": "dr-perfil"
  };
  document.querySelectorAll(".drawer-item").forEach(i => i.classList.remove("active"));
  document.getElementById(map[screenId])?.classList.add("active");
}

function tickClock() {
  const el = document.getElementById("statusTime");
  if (el) el.innerText = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
tickClock();
setInterval(tickClock, 15000);