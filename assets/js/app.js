/**
 * APP INATEL - AGENDAMENTO DE ATENDIMENTOS COM PROFESSORES
 * Lógica da Interface Interativa - Protótipo Funcional
 * Aluna: Ana Julia de Souza | Matrícula: 1048
 * Engenharia de Software - Inatel (Disciplina S05 - Interação Homem-Máquina)
 */

// v5: mudou a estrutura de dados (locais, "Atendimento", sem tags, monitores). Trocar a chave
// evita que dados antigos salvos no navegador sobrescrevam os novos.
const STORAGE_KEY = "inatel_s05_state_v5";

// ==========================================================================
// LOCAIS DE ATENDIMENTO
// - Sala do professor (Prédio 3, 2º piso): local padrão. Cada professor tem a
//   sua, então nunca há conflito entre professores diferentes.
// - Prédio 1: salas numeradas de 1 a 22 (compartilhadas, uso exclusivo por horário)
// - Laboratórios: cada um tem as áreas de professores que podem reservá-lo e diz
//   se é de uso exclusivo (um professor por horário) ou espaço de convivência.
// Fonte dos laboratórios: Guia de Visita do Inatel (inatel.br).
// ==========================================================================
const PREDIO_1_TOTAL_SALAS = 22;
const LOCAL_SALA_PROFESSOR = "Sala do professor - Prédio 3, 2º piso";
const LOCAL_REMOTO = "Remoto (Microsoft Teams)";
const DURACAO_PADRAO_MIN = 30;
const PROFESSOR_DEMO_ID = 1; // professor usado no "Modo Professor" da demo
const salaPredio1 = n => `Sala ${n} - Prédio 1`;

const LOCAL_CDG_HUB = "CDG Hub - Prédio 4";
const LOCAL_LTI_2 = "LTI-2 - Prédio 6, 1º piso";

// areas: software, redes, ia, eletronica, fisica, quimica, matematica, inovacao
const LABORATORIOS = [
  // Software e programação
  { local: LOCAL_CDG_HUB, rotulo: "CDG Hub (convivência)", areas: ["software"], exclusivo: false },
  { local: LOCAL_LTI_2, rotulo: "LTI-2 (Tratamento da Informação)", areas: ["software"], exclusivo: true },
  { local: "LTI-3 - Prédio 6, 1º piso", rotulo: "LTI-3 (Tratamento da Informação)", areas: ["software"], exclusivo: true },
  { local: "LTI-4 - Prédio 6, 1º piso", rotulo: "LTI-4 (Tratamento da Informação)", areas: ["software"], exclusivo: true },
  // Redes e IA
  { local: "Lab de Redes - Prédio 2", rotulo: "Lab de Redes", areas: ["redes"], exclusivo: true },
  { local: "Lab de Redes de Acesso e Transporte - Prédio 2", rotulo: "Lab de Redes de Acesso e Transporte", areas: ["redes"], exclusivo: true },
  { local: "WAI Lab - Prédio 2", rotulo: "WAI Lab (Redes sem fio e IA)", areas: ["redes", "ia"], exclusivo: true },
  { local: "Lab de Robótica e IA - Prédio 4", rotulo: "Lab de Robótica e IA", areas: ["ia"], exclusivo: true },
  // Eletrônica, física e química
  { local: "Lab de Eletrônica - Prédio 3", rotulo: "Lab de Eletrônica Digital, Analógica e Circuitos", areas: ["eletronica"], exclusivo: true },
  { local: "Lab de Física I - Prédio 3", rotulo: "Lab de Física I", areas: ["fisica"], exclusivo: true },
  { local: "Lab de Física II - Prédio 3", rotulo: "Lab de Física II", areas: ["fisica"], exclusivo: true },
  { local: "Lab de Química e Materiais - Prédio 1", rotulo: "Lab de Química e Ciências dos Materiais", areas: ["quimica"], exclusivo: true },
  // Gestão e inovação
  { local: "Lab de Ideação - Prédio 4", rotulo: "Lab de Ideação (convivência)", areas: ["inovacao"], exclusivo: false }
];

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
      areas: ["software"],
      disciplinas: [
        "S05 - Interação Homem-Máquina",
        "Engenharia de Software",
        "Ergonomia e Usabilidade"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "lotado" },
          { hora: "15:00", status: "lotado" },
          { hora: "15:30", status: "livre", local: salaPredio1(7) },
          { hora: "16:00", status: "livre", local: salaPredio1(7) },
          { hora: "16:30", status: "livre", local: salaPredio1(7) }
        ],
        "2026-11-13": [
          { hora: "10:00", status: "lotado" },
          { hora: "10:30", status: "livre", local: LOCAL_CDG_HUB },
          { hora: "11:00", status: "lotado" }
        ],
        "2026-11-17": [
          { hora: "14:00", status: "livre", local: salaPredio1(12) },
          { hora: "15:00", status: "livre", local: salaPredio1(12) },
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
      areas: ["software"],
      disciplinas: [
        "C06 - Programação Orientada a Objetos com Java",
        "C14 - Engenharia de Software",
        "S06 - Engenharia de Produto de Software",
        "S07 - Qualidade, Gerência de Config. e Evolução de Software"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "15:00", status: "livre", local: LOCAL_LTI_2 },
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
      areas: ["software"],
      disciplinas: [
        "C11 - Ciência de Dados com Python",
        "Algoritmos e Programação Web",
        "Maratona de Programação"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre", local: salaPredio1(3) },
          { hora: "16:00", status: "livre" }
        ],
        "2026-11-17": [
          { hora: "16:00", status: "lotado" }
        ]
      }
    },
    {
      id: 4,
      nome: "Prof. Jonas Lopes de Vilas Boas",
      depto: "Engenharia de Software e Computação",
      email: "jonas@inatel.br",
      iniciais: "JV",
      areas: ["software"],
      disciplinas: [
        "C04 - Algoritmos e Estrutura de Dados III",
        "C07 - Bancos de Dados",
        "C12 - Sistemas Operacionais",
        "M10 - Matemática Discreta",
        "S02 - Bancos de Dados II (NoSQL)",
        "S03 - Arquiteturas de Software"
      ],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["software", "ia"],
      disciplinas: [
        "C14 - Engenharia de Software (Prática)",
        "C24 - Inteligência Artificial (Prática)",
        "S07 - Qualidade e Evolução de Software (Prática)"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["software"],
      disciplinas: [
        "C01 - Introdução à Engenharia",
        "C02 - Algoritmos e Estrutura de Dados I",
        "C09 - Computação Gráfica e Multimídia",
        "S01 - Paradigmas de Programação"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["software"],
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "C03 - Algoritmos e Estrutura de Dados II"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["software", "eletronica"],
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "C05 - Linguagens de Programação e Compiladores",
        "E09 - Sistemas Microcontrolados e Microprocessados"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["software", "redes", "matematica"],
      disciplinas: [
        "C02 - Algoritmos e Estrutura de Dados I",
        "M02 - Álgebra e Geometria Analítica",
        "T02 - Redes de Dados I",
        "T03 - Redes de Dados II"
      ],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["redes"],
      disciplinas: ["T03 - Redes de Dados II", "Sistemas Distribuídos e IoT"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["ia", "redes"],
      disciplinas: ["C24 - Inteligência Artificial", "Aprendizado de Máquina"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["ia"],
      disciplinas: ["C24 - Inteligência Artificial", "Redes Neurais"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["inovacao"],
      disciplinas: ["G04 - Fundamentos de Gestão de Projetos", "Gestão Ágil"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["inovacao"],
      disciplinas: ["Projetos Integradores e Fetin", "Inovação e Startups", "C15 - Sistemas Distribuídos"],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["eletronica"],
      disciplinas: [
        "E07 - Eletrônica Digital Básica",
        "E08 - Eletrônica Digital Aplicada a Contadores e Sequenciadores"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["eletronica"],
      disciplinas: ["E09 - Sistemas Microcontrolados e Microprocessados"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["eletronica"],
      disciplinas: ["E09 - Sistemas Microcontrolados e Microprocessados"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["eletronica"],
      disciplinas: ["E01 - Circuitos Elétricos em Corrente Contínua"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica"],
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "M05 - Cálculo Aplicado a Séries e Equações Diferenciais"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica", "fisica"],
      disciplinas: [
        "M02 - Álgebra e Geometria Analítica",
        "M05 - Cálculo Aplicado a Séries e Equações Diferenciais",
        "F01 - Física Newtoniana Clássica",
        "F03 - Física Aplicada na Eletricidade e Eletromagnetismo"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica"],
      disciplinas: ["M04 - Cálculo Aplicado a Engenharia II"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica"],
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "M11 - Probabilidade e Processos Estocásticos"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica", "fisica"],
      disciplinas: [
        "M06 - Cálculo Numérico e Estatística",
        "F01 - Física Newtoniana Clássica"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["matematica", "fisica"],
      disciplinas: [
        "M01 - Matemática Aplicada a Engenharia",
        "M03 - Cálculo Aplicado a Engenharia I",
        "F01 - Física Newtoniana Clássica"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["fisica"],
      disciplinas: [
        "F02 - Física Ondulatória, Óptica e Termodinâmica",
        "F03 - Física Aplicada na Eletricidade e Eletromagnetismo"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      areas: ["quimica"],
      disciplinas: [
        "E10 - Desenho Técnico",
        "Q01 - Química e Ciências dos Materiais"
      ],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: LOCAL_SALA_PROFESSOR,
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
      titulo: "Atendimento - S05 Interação Homem-Máquina",
      tipo: "Atendimento",
      disciplina: "S05 - Interação Homem-Máquina",
      professor: "Prof. Raphael Cardoso Mota Pereira",
      data: "Qui, 12/11/2026",
      horario: "14:30 – 15:00",
      local: LOCAL_SALA_PROFESSOR,
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
      local: LOCAL_SALA_PROFESSOR,
      status: "PENDENTE",
      assunto: "Validação do protótipo funcional e avaliação heurística",
      lembrete: "1 hora antes",
      periodoGrupo: "Esta semana",
      ehFuturo: true
    },
    {
      id: 103,
      professorId: 3,
      titulo: "Atendimento - C11 Ciência de Dados com Python",
      tipo: "Atendimento",
      disciplina: "C11 - Ciência de Dados com Python",
      professor: "Prof. Renzo Paranaiba Mesquita",
      data: "Ter, 17/11/2026",
      horario: "16:00 – 16:30",
      local: salaPredio1(15),
      status: "CONFIRMADO",
      assunto: "Análise exploratória e visualização de dados",
      lembrete: "30 min antes",
      periodoGrupo: "Próxima semana",
      ehFuturo: true
    },
    {
      id: 104,
      professorId: 21,
      titulo: "Atendimento - M04 Cálculo Aplicado a Engenharia II",
      tipo: "Atendimento",
      disciplina: "M04 - Cálculo Aplicado a Engenharia II",
      professor: "Prof. Estevan Marcelo Lopes",
      data: "Qui, 22/10/2026",
      horario: "15:00 – 15:30",
      local: salaPredio1(12),
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
      mensagem: `Seu atendimento de S05 começa em 30 minutos na ${LOCAL_SALA_PROFESSOR}.`,
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

  // Monitores também são alunos: por privacidade, não há exemplos. Fica vazio.
  monitores: [],

  listaEspera: []
};

const clonar = obj => JSON.parse(JSON.stringify(obj));

function loadInitialState() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    console.warn("Erro ao carregar estado:", e);
  }

  return {
    currentUser: clonar(DEFAULT_DATA.currentUser),
    currentScreen: "screen-home",
    previousScreen: null,
    activeFilter: "todos",
    searchQuery: "",
    rescheduleId: null,
    profTab: "pedidos",
    bookingDraft: {
      professorId: 1,
      tipo: "Atendimento",
      modalidade: "Presencial",
      data: "2026-11-12",
      dataTexto: "Qui, 12/11/2026",
      horario: "14:30 – 15:00",
      horarioInicio: "14:30",
      disciplina: "S05 - Interação Homem-Máquina",
      assunto: "",
      lembreteMin: 30,
      local: LOCAL_SALA_PROFESSOR
    },
    selectedAppointment: null,
    professores: saved.professores || clonar(DEFAULT_DATA.professores),
    monitores: saved.monitores || clonar(DEFAULT_DATA.monitores),
    agendamentos: saved.agendamentos || clonar(DEFAULT_DATA.agendamentos),
    notificacoes: saved.notificacoes || clonar(DEFAULT_DATA.notificacoes),
    listaEspera: saved.listaEspera || []
  };
}

const AppState = loadInitialState();

function persistState() {
  try {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          professores: AppState.professores,
          monitores: AppState.monitores,
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
// UTILITÁRIOS DE DADOS (horários e locais)
// ==========================================================================
function escapeHtml(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// "Qui, 12/11/2026" -> "2026-11-12"
function dataTextoParaISO(texto) {
  const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(texto || "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

function getSlot(prof, dia, hora) {
  return (prof && prof.horarios && prof.horarios[dia] && prof.horarios[dia].find(s => s.hora === hora)) || null;
}

// Local onde o atendimento acontece: remoto, o local definido no horário
// publicado pelo professor, ou o local padrão do professor.
function getLocalAtendimento(prof, dia, hora, modalidade) {
  if (modalidade === "Remoto") return LOCAL_REMOTO;
  const slot = getSlot(prof, dia, hora);
  return (slot && slot.local) || (prof ? prof.localPadrao : LOCAL_SALA_PROFESSOR);
}

// ---- Conflito de locais compartilhados -----------------------------------
const hhmmParaMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

const getLaboratorio = local => LABORATORIOS.find(l => l.local === local) || null;

// Uso exclusivo = só um professor por horário: salas do Prédio 1 e laboratórios
// exclusivos. Não são exclusivos: a sala do professor, o remoto e os espaços de
// convivência (ex.: CDG Hub).
function ehLocalExclusivo(local) {
  if (!local || local === LOCAL_SALA_PROFESSOR || local === LOCAL_REMOTO) return false;
  const lab = getLaboratorio(local);
  return lab ? lab.exclusivo : true;
}

// Laboratórios são restritos às áreas dos professores (ex.: CDG Hub só para software).
function professorPodeUsarLocal(prof, local) {
  const lab = getLaboratorio(local);
  if (!lab) return true;
  return !!prof && (prof.areas || []).some(a => lab.areas.includes(a));
}

// Devolve { professor, slot } se OUTRO professor já usa esse local em horário
// que se sobrepõe; senão null. A duração padrão é 30 min.
function encontrarConflitoDeLocal(professorId, dia, hora, duracaoMin, local) {
  if (!ehLocalExclusivo(local)) return null;
  const ini = hhmmParaMin(hora);
  const fim = ini + (duracaoMin || DURACAO_PADRAO_MIN);

  for (const outro of AppState.professores) {
    if (outro.id === professorId) continue;
    for (const slot of (outro.horarios && outro.horarios[dia]) || []) {
      if ((slot.local || outro.localPadrao) !== local) continue;
      const sIni = hhmmParaMin(slot.hora);
      const sFim = sIni + (slot.duracao || DURACAO_PADRAO_MIN);
      if (ini < sFim && sIni < fim) return { professor: outro, slot };
    }
  }
  return null;
}

// Libera o horário que um agendamento ocupava (só na data certa).
function liberarSlotDoAgendamento(ag) {
  const prof = AppState.professores.find(p => p.id === ag.professorId);
  const dia = ag.dataISO || dataTextoParaISO(ag.data);
  const hora = (ag.horario || "").split("–")[0].trim();
  const slot = getSlot(prof, dia, hora);
  if (slot) slot.status = "livre";
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  ensureGradeBanner();
  populateLocaisSelect();
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
  } else if (screenId === "screen-professor-disponibilidade") {
    populateLocaisSelect();
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

function matchBusca(pessoa) {
  const q = AppState.searchQuery;
  if (!q) return true;
  return (
    pessoa.nome.toLowerCase().includes(q) ||
    pessoa.depto.toLowerCase().includes(q) ||
    pessoa.disciplinas.some(d => d.toLowerCase().includes(q))
  );
}

function updateFilterChipCounts() {
  const total = AppState.professores.length + AppState.monitores.length;
  const chips = {
    chipTodos: `Todos (${total})`,
    chipProfessores: `Professores (${AppState.professores.length})`,
    chipMonitores: `Monitores (${AppState.monitores.length})`
  };
  Object.entries(chips).forEach(([id, texto]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = texto;
  });
}

function renderProfessores() {
  const listContainer = document.getElementById("professorListContainer");
  if (!listContainer) return;

  updateFilterChipCounts();

  const filtro = AppState.activeFilter;

  // Aba de monitores sem ninguém cadastrado: mensagem fixa (sem exemplos, por privacidade).
  if (filtro === "monitores" && AppState.monitores.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 48px 24px; color: var(--text-muted);">
        <p style="font-weight: 600;">Horários de monitores aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  const fonte =
    filtro === "professores" ? AppState.professores :
    filtro === "monitores"   ? AppState.monitores :
    [...AppState.professores, ...AppState.monitores];

  const filtrados = fonte.filter(matchBusca);

  if (filtrados.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <p style="font-weight: 600; margin-bottom: 6px;">Nenhum resultado encontrado</p>
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
  const horarios = (prof.horarios && prof.horarios[dia]) || [];
  const livres = horarios.filter(s => s.status === "livre");

  if (livres.length === 0) {
    // Sem horário livre neste dia: nada fica selecionado e o avanço é bloqueado.
    AppState.bookingDraft.horarioInicio = null;
    AppState.bookingDraft.horario = "";
  } else if (!livres.some(s => s.hora === AppState.bookingDraft.horarioInicio)) {
    updateTimeSlotSelection(livres[0].hora);
  }

  if (horarios.length === 0) {
    slotsGrid.innerHTML = `
      <p style="grid-column: 1 / -1; font-size: 12px; color: var(--text-muted); padding: 8px 0;">
        Este professor não abriu horários neste dia. Escolha outra data.
      </p>
    `;
  } else {
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
  }

  updateGradeCompatibilityBanner(AppState.bookingDraft.horarioInicio);
  updateSlotLocalInfo();
}

function updateTimeSlotSelection(hora, btnElement) {
  AppState.bookingDraft.horarioInicio = hora;
  const profAtual = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const slotAtual = getSlot(profAtual, AppState.bookingDraft.data, hora);
  const duracaoMin = (slotAtual && slotAtual.duracao) || (AppState.bookingDraft.tipo === "Atendimento" ? 30 : 45);
  const [h, m] = hora.split(":").map(Number);
  const totalMin = h * 60 + m + duracaoMin;
  const endH = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const endM = String(totalMin % 60).padStart(2, "0");
  AppState.bookingDraft.horario = `${hora} – ${endH}:${endM}`;

  document.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("selected"));
  if (btnElement) btnElement.classList.add("selected");

  updateGradeCompatibilityBanner(hora);
  updateSlotLocalInfo();
}

// Mostra, abaixo dos horários, onde será o atendimento no horário selecionado.
function updateSlotLocalInfo() {
  const el = document.getElementById("slotLocalInfo");
  if (!el) return;

  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const { data, horarioInicio } = AppState.bookingDraft;

  if (!prof || !horarioInicio) {
    el.style.display = "none";
    return;
  }

  const local = getLocalAtendimento(prof, data, horarioInicio, "Presencial");
  AppState.bookingDraft.local = local;
  el.style.display = "block";
  el.innerHTML = `<strong>Local (${horarioInicio}):</strong> ${local}`;
}

function updateGradeCompatibilityBanner(hora) {
  const banner = document.getElementById("gradeCompatBanner");
  if (!banner) return;
  if (!hora) {
    banner.style.display = "none";
    return;
  }
  banner.style.display = "block";

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

  if (!AppState.bookingDraft.horarioInicio) {
    showToast("Escolha um horário disponível para continuar.");
    return;
  }

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
  document.getElementById("confirmLocal").innerText = getLocalAtendimento(
      prof,
      AppState.bookingDraft.data,
      AppState.bookingDraft.horarioInicio,
      AppState.bookingDraft.modalidade
  );

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
    el.innerText = getLocalAtendimento(
        prof,
        AppState.bookingDraft.data,
        AppState.bookingDraft.horarioInicio,
        novaModalidade
    );
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

  const localFinal = getLocalAtendimento(
      prof,
      AppState.bookingDraft.data,
      AppState.bookingDraft.horarioInicio,
      modInput
  );

  const slotObj = getSlot(prof, AppState.bookingDraft.data, AppState.bookingDraft.horarioInicio);
  if (slotObj) slotObj.status = "lotado";

  if (AppState.rescheduleId) {
    const antigo = AppState.agendamentos.find(a => a.id === AppState.rescheduleId);
    if (antigo) {
      liberarSlotDoAgendamento(antigo);
      antigo.dataISO = AppState.bookingDraft.data;
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
    dataISO: AppState.bookingDraft.data,
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
  AppState.bookingDraft.tipo = item.tipo || "Atendimento";
  AppState.bookingDraft.disciplina = item.disciplina || prof.disciplinas[0];
  AppState.bookingDraft.local = prof.localPadrao;
  AppState.bookingDraft.modalidade = "Presencial";

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

  liberarSlotDoAgendamento(item);

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
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Local: ${req.local} · Assunto: ${escapeHtml(req.assunto)}</div>
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
                            `<span class="status-badge ${s.status === "livre" ? "livre" : "lotado"}" title="${escapeHtml(s.local || prof.localPadrao)}">${s.hora} (${s.status})</span>`
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

    liberarSlotDoAgendamento(ag);

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
  const prof = AppState.professores.find(p => p.id === PROFESSOR_DEMO_ID);
  const dataVal = document.getElementById("profNewData")?.value || "2026-11-12";
  const horaVal = document.getElementById("profNewHora")?.value || "17:00";
  const duracaoVal = parseInt(document.getElementById("profNewDuracao")?.value, 10) || DURACAO_PADRAO_MIN;
  const discVal = document.getElementById("profNewDisciplina")?.value || "S05 - Interação Homem-Máquina";
  const localVal = document.getElementById("profNewLocal")?.value || LOCAL_SALA_PROFESSOR;

  if (!prof) return;

  if (!professorPodeUsarLocal(prof, localVal)) {
    showToast(`${localVal} é restrito a professores de outra área.`);
    return;
  }

  const conflito = encontrarConflitoDeLocal(prof.id, dataVal, horaVal, duracaoVal, localVal);
  if (conflito) {
    showToast(`${localVal} já está em uso nesse horário (${conflito.professor.nome.split(" ").slice(0, 2).join(" ")}, ${conflito.slot.hora}). Escolha outro local.`);
    populateLocaisSelect();
    return;
  }

  if (!prof.horarios[dataVal]) prof.horarios[dataVal] = [];
  if (prof.horarios[dataVal].some(s => s.hora === horaVal)) {
    showToast(`Você já abriu um horário às ${horaVal} neste dia.`);
    return;
  }
  prof.horarios[dataVal].push({ hora: horaVal, status: "livre", local: localVal, duracao: duracaoVal });
  prof.horarios[dataVal].sort((a, b) => a.hora.localeCompare(b.hora));

  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Novo horário aberto pelo docente",
    mensagem: `Prof. Raphael disponibilizou o horário ${horaVal} (${dataVal.split("-").reverse().join("/")}) para ${discVal} (${localVal}).`,
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
// Preenche o seletor de local do professor. Salas/laboratórios exclusivos já usados por
// outro professor no mesmo dia e horário ficam desabilitados; laboratórios só aparecem
// para professores das áreas autorizadas.
function populateLocaisSelect() {
  const select = document.getElementById("profNewLocal");
  if (!select) return;

  const prof = AppState.professores.find(p => p.id === PROFESSOR_DEMO_ID);
  const dia = document.getElementById("profNewData")?.value || "2026-11-12";
  const hora = document.getElementById("profNewHora")?.value || "17:00";
  const duracao = parseInt(document.getElementById("profNewDuracao")?.value, 10) || DURACAO_PADRAO_MIN;
  const anterior = select.value;

  const opcao = (valor, rotulo) => {
    const ocupado = !!encontrarConflitoDeLocal(PROFESSOR_DEMO_ID, dia, hora, duracao, valor);
    return `<option value="${valor}" ${ocupado ? "disabled" : ""}>${rotulo}${ocupado ? " (ocupado neste horário)" : ""}</option>`;
  };

  const salas = Array.from({ length: PREDIO_1_TOTAL_SALAS }, (_, i) => i + 1)
    .map(n => opcao(salaPredio1(n), `Sala ${n}`))
    .join("");

  const labs = LABORATORIOS
    .filter(l => professorPodeUsarLocal(prof, l.local))
    .map(l => opcao(l.local, l.rotulo))
    .join("");

  select.innerHTML = `
    <optgroup label="Prédio 3">
      <option value="${LOCAL_SALA_PROFESSOR}">Minha sala (2º piso)</option>
    </optgroup>
    ${labs ? `<optgroup label="Laboratórios da sua área">${labs}</optgroup>` : ""}
    <optgroup label="Prédio 1 (salas 1 a ${PREDIO_1_TOTAL_SALAS})">${salas}</optgroup>
  `;

  const opAnterior = [...select.options].find(o => o.value === anterior && !o.disabled);
  select.value = opAnterior ? anterior : LOCAL_SALA_PROFESSOR;
}

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
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Erro ao limpar estado:", e);
  }
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