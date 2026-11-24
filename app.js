/**
 * APP INATEL - AGENDAMENTO DE PROFESSORES E MONITORES
 * Lógica da Interface Interativa
 * Aluna: Ana Julia de Souza | Matrícula: 1048
 * Engenharia de Software - Inatel
 */

// Estado global da aplicação
const AppState = {
  currentUser: {
    id: 1048,
    nome: "Ana Julia de Souza",
    matricula: "1048",
    curso: "Engenharia de Software",
    periodo: 4,
    email: "anajulia.souza@gec.inatel.br",
    role: "aluno" // 'aluno' ou 'professor'
  },
  
  currentScreen: "screen-home",
  previousScreen: null,
  
  // Filtros de busca de professores
  activeFilter: "todos", // 'todos', 'monitoria', 'projetos'
  searchQuery: "",
  
  // Seleção atual para o fluxo de agendamento
  bookingDraft: {
    professorId: 1,
    tipo: "Monitoria", // 'Monitoria' ou 'Projeto'
    data: "2026-11-12",
    dataTexto: "Qui, 12/11/2026",
    horario: "14:30 – 15:00",
    horarioInicio: "14:30",
    disciplina: "Interface Homem-Máquina",
    assunto: "Ergonomia cognitiva e testes de usabilidade",
    observacao: "",
    lembreteMin: 30,
    local: "Sala 204 · Prédio Central (ou Teams)",
    vagas: 1
  },

  // Agendamento selecionado para ver detalhes ou cancelar
  selectedAppointment: null,

  // Lista de Professores & Monitores cadastrados no sistema (Dados Oficiais Inatel)
  professores: [
    {
      id: 1,
      nome: "Prof. Raphael Pereira",
      depto: "Coordenação de Engenharia de Software",
      email: "raphael.pereira@inatel.br",
      iniciais: "RP",
      disciplinas: ["Interface Homem-Máquina", "Engenharia de Software", "Ergonomia"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala 204 · Prédio Central (ou Teams)",
      bio: "Docente das disciplinas de Interface Homem-Máquina, Ergonomia e Engenharia de Software no Inatel. Orientador de projetos de usabilidade, prototipagem e interação humano-computador.",
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
      nome: "Prof. Marcelo Cysneiros Aragão",
      depto: "Coordenação de Engenharia de Software e Computação",
      email: "marcelo.cysneiros@inatel.br",
      iniciais: "MC",
      disciplinas: ["Engenharia de Software", "Arquitetura de Software", "Inteligência Artificial"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Lab de Software · CDG Hub / Bloco 2",
      bio: "Mestre em Ciência e Tecnologia da Computação, professor titular de Engenharia de Software e coordenador de programas tecnológicos no Inatel.",
      horarios: {
        "2026-11-12": [
          { hora: "15:00", status: "livre" },
          { hora: "16:00", status: "livre" }
        ],
        "2026-11-13": [
          { hora: "09:00", status: "livre" },
          { hora: "10:00", status: "livre" }
        ]
      }
    },
    {
      id: 3,
      nome: "Prof. Renzo Paranaiba Mesquita",
      depto: "Coordenação de Engenharia de Software e Computação",
      email: "renzo@inatel.br",
      iniciais: "RM",
      disciplinas: ["Algoritmos e Estruturas", "Programação Web", "Bancos de Dados"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala 114 · Bloco 1 (ou remoto)",
      bio: "Docente especialista em Desenvolvimento Web, Algoritmos, Estruturas de Dados e Programação Orientada a Objetos. Orientador de maratona de programação.",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" },
          { hora: "16:00", status: "livre" }
        ],
        "2026-11-13": [
          { hora: "15:00", status: "livre" },
          { hora: "15:30", status: "livre" }
        ]
      }
    },
    {
      id: 4,
      nome: "Prof. Guilherme Augusto Barucke Marcondes",
      depto: "Coordenação de Projetos e P&D",
      email: "marcondes@inatel.br",
      iniciais: "GM",
      disciplinas: ["Gestão de Projetos de Software", "Metodologias Ágeis", "Inovação"],
      tags: ["Projetos"],
      status: "vagas",
      statusTexto: "Poucas vagas",
      localPadrao: "Inatel Startups / CDG Hub",
      bio: "Doutor em Engenharia pelo Inatel, especialista em gestão ágil de projetos, inovação tecnológica e mentoria de projetos integradores e IC.",
      horarios: {
        "2026-11-12": [
          { hora: "16:30", status: "livre" }
        ],
        "2026-11-13": [
          { hora: "14:00", status: "lotado" },
          { hora: "14:30", status: "livre" }
        ]
      }
    },
    {
      id: 5,
      nome: "Prof. Carlos Alberto Ynoguti",
      depto: "Coordenação de Engenharia de Telecomunicações",
      email: "ynoguti@inatel.br",
      iniciais: "CY",
      disciplinas: ["Redes de Computadores", "Comunicações Digitais", "IoT"],
      tags: ["Monitoria", "Projetos"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Lab de Telecomunicações · Bloco 3",
      bio: "Doutor em Engenharia Elétrica, pesquisador e docente de redes de comunicação de dados, conectividade e sistemas distribuídos.",
      horarios: {
        "2026-11-12": [
          { hora: "10:00", status: "livre" },
          { hora: "11:00", status: "livre" }
        ],
        "2026-11-17": [
          { hora: "14:00", status: "livre" }
        ]
      }
    },
    {
      id: 6,
      nome: "Prof. Alexandre Baratella Lugli",
      depto: "Coordenação de Automação e Sistemas Computacionais",
      email: "baratella@inatel.br",
      iniciais: "AB",
      disciplinas: ["Sistemas Inteligentes", "Automação", "Robótica"],
      tags: ["Projetos"],
      status: "lotado",
      statusTexto: "Lotado",
      localPadrao: "Lab de Robótica · Bloco 2",
      bio: "Pesquisador em robótica móvel, sistemas embarcados e inteligência artificial aplicada. Atendimentos de projetos e orientação de TCC.",
      horarios: {
        "2026-11-12": [
          { hora: "14:00", status: "lotado" },
          { hora: "14:30", status: "lotado" }
        ]
      }
    },
    {
      id: 7,
      nome: "Monitor Lucas Prado",
      depto: "Programa de Monitoria Acadêmica - Inatel",
      email: "monitoria.software@inatel.br",
      iniciais: "LP",
      disciplinas: ["Cálculo II", "Álgebra Linear"],
      tags: ["Monitoria"],
      status: "livre",
      statusTexto: "Livre",
      localPadrao: "Sala de Monitoria · Prédio Central",
      bio: "Monitor oficial do Inatel para suporte acadêmico de Cálculo II e Álgebra Linear, resolução de listas de exercícios e preparação para provas.",
      horarios: {
        "2026-11-12": [
          { hora: "13:30", status: "livre" },
          { hora: "14:00", status: "livre" },
          { hora: "14:30", status: "livre" }
        ]
      }
    }
  ],

  // Agendamentos cadastrados (conforme Wireframes 8 e 9)
  agendamentos: [
    {
      id: 101,
      titulo: "Monitoria · Interface Homem-Máquina",
      tipo: "Monitoria",
      professor: "Prof. Raphael Pereira",
      data: "Qui, 12/11/2026",
      horario: "14:30 – 15:00",
      local: "Sala 204 · Prédio Central",
      status: "CONFIRMADO", // 'CONFIRMADO', 'PENDENTE', 'CANCELADO'
      assunto: "Ergonomia cognitiva e testes de usabilidade",
      lembrete: "30 min antes",
      periodoGrupo: "Esta semana",
      ehFuturo: true
    },
    {
      id: 102,
      titulo: "Orientação · Projeto de Software",
      tipo: "Projeto",
      professor: "Prof. Guilherme Marcondes",
      data: "Sex, 13/11/2026",
      horario: "10:00 – 10:45",
      local: "CDG Hub · Inatel Startups",
      status: "PENDENTE",
      assunto: "Revisão do backlog ágil e entregáveis da sprint",
      lembrete: "1 hora antes",
      periodoGrupo: "Esta semana",
      ehFuturo: true
    },
    {
      id: 103,
      titulo: "Monitoria · Programação Web",
      tipo: "Monitoria",
      professor: "Prof. Renzo Mesquita",
      data: "Ter, 17/11/2026",
      horario: "16:00 – 16:30",
      local: "Sala 114 · Bloco 1",
      status: "CONFIRMADO",
      assunto: "Arquitetura REST e consumo de APIs",
      lembrete: "30 min antes",
      periodoGrupo: "Próxima semana",
      ehFuturo: true
    },
    {
      id: 104,
      titulo: "Monitoria · Cálculo II",
      tipo: "Monitoria",
      professor: "Monitor Lucas Prado",
      data: "Qui, 22/10/2026",
      horario: "15:00 – 15:30",
      local: "Sala de Monitoria",
      status: "REALIZADO",
      assunto: "Integrais duplas e equações diferenciais",
      lembrete: "Sem lembrete",
      periodoGrupo: "Anteriores",
      ehFuturo: false
    }
  ],

  // Notificações (conforme Wireframe 11)
  notificacoes: [
    {
      id: 1,
      titulo: "Agendamento confirmado",
      mensagem: "Prof. Raphael confirmou: Qui 12/11, 14:30 (Cálculo II)",
      tempo: "há 20 min",
      tipo: "confirm",
      lida: false
    },
    {
      id: 2,
      titulo: "Lembrete de Monitoria",
      mensagem: "Sua monitoria de Cálculo II começa em 30 minutos na Sala 204.",
      tempo: "há 2 h",
      tipo: "lembrete",
      lida: false
    },
    {
      id: 3,
      titulo: "Novos horários disponíveis",
      mensagem: "Prof. Carlos Alberto abriu novos horários para Orientação de Projeto.",
      tempo: "há 1 dia",
      tipo: "aviso",
      lida: true
    },
    {
      id: 4,
      titulo: "Agendamento cancelado",
      mensagem: "A monitoria de Cálculo I do dia 28/10 foi cancelada pelo aluno.",
      tempo: "há 3 dias",
      tipo: "cancel",
      lida: true
    }
  ]
};

// ==========================================================================
// INICIALIZAÇÃO DA INTERFACE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderHomeNextBooking();
  renderProfessores();
  renderAgendamentos("proximos");
  renderNotificacoes("todas");
  setupEventListeners();
  updateTimeSlotSelection("14:30");
});

// ==========================================================================
// ROTEAMENTO DE TELAS
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

  // Atualizar abas inferiores da bottom-nav de acordo com a tela
  updateBottomNav(screenId);

  // Rolar para o topo da tela
  const viewport = document.getElementById("appViewport");
  if (viewport) viewport.scrollTop = 0;
}

function goBack() {
  if (AppState.previousScreen) {
    navigateTo(AppState.previousScreen, false);
  } else {
    navigateTo("screen-home", false);
  }
}

function updateBottomNav(screenId) {
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

  if (screenId === "screen-home") {
    document.getElementById("nav-home")?.classList.add("active");
  } else if (screenId === "screen-meus-agendamentos" || screenId === "screen-detalhe-agendamento") {
    document.getElementById("nav-agenda")?.classList.add("active");
  } else if (screenId === "screen-notificacoes") {
    document.getElementById("nav-avisos")?.classList.add("active");
  } else if (screenId === "screen-perfil") {
    document.getElementById("nav-perfil")?.classList.add("active");
  }
}

// ==========================================================================
// TELA 2: INÍCIO (HOME)
// ==========================================================================
function renderHomeNextBooking() {
  const container = document.getElementById("homeNextBookingContainer");
  if (!container) return;

  // Encontrar o próximo agendamento futuro ativo
  const proximo = AppState.agendamentos.find(a => a.ehFuturo && a.status !== "CANCELADO");

  if (proximo) {
    container.innerHTML = `
      <div class="next-booking-card" onclick="viewAppointmentDetail(${proximo.id})">
        <div class="booking-card-main">
          <div class="booking-title">${proximo.titulo}</div>
          <div class="booking-time">${proximo.data} · ${proximo.horario.split("–")[0]}</div>
          <div class="booking-location">${proximo.local} · ${proximo.professor}</div>
        </div>
        <div class="status-badge ${proximo.status === 'CONFIRMADO' ? 'livre' : 'vagas'}">
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
// TELA 3: ESCOLHER PROFESSOR (LISTA E BUSCA)
// ==========================================================================
function filterProfessores(tipo, chipElement) {
  AppState.activeFilter = tipo;
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  if (chipElement) chipElement.classList.add("active");
  renderProfessores();
}

function handleSearch(query) {
  AppState.searchQuery = query.toLowerCase();
  renderProfessores();
}

function renderProfessores() {
  const listContainer = document.getElementById("professorListContainer");
  if (!listContainer) return;

  let filtrados = AppState.professores.filter(prof => {
    // Filtro por categoria (Todos, Monitoria, Projetos)
    if (AppState.activeFilter === "monitoria" && !prof.tags.includes("Monitoria")) return false;
    if (AppState.activeFilter === "projetos" && !prof.tags.includes("Projetos")) return false;

    // Filtro por texto (Nome, Disciplina ou Depto)
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
        <p style="font-size: 12px;">Tente pesquisar por outro nome ou disciplina (ex: Cálculo, Prog).</p>
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
// TELA 4: PERFIL DO PROFESSOR SELECIONADO
// ==========================================================================
function selectProfessor(id) {
  const prof = AppState.professores.find(p => p.id === id);
  if (!prof) return;

  AppState.bookingDraft.professorId = prof.id;
  AppState.bookingDraft.disciplina = prof.disciplinas[0] || "Cálculo II";
  AppState.bookingDraft.local = prof.localPadrao;

  // Preencher dados na tela de perfil
  document.getElementById("profDetailAvatar").innerText = prof.iniciais;
  document.getElementById("profDetailNome").innerText = prof.nome;
  document.getElementById("profDetailDepto").innerText = prof.depto;
  document.getElementById("profDetailEmail").innerText = prof.email;
  
  // Tags de disciplinas
  const discTags = document.getElementById("profDetailDisciplinas");
  if (discTags) {
    discTags.innerHTML = prof.disciplinas.map(d => `<span class="disc-tag" style="font-size: 12px; padding: 4px 10px;">${d}</span>`).join("");
  }

  document.getElementById("profDetailLocal").innerText = prof.localPadrao;

  navigateTo("screen-perfil-professor");
}

function selectServiceType(tipo, element) {
  AppState.bookingDraft.tipo = tipo;
  document.querySelectorAll(".service-option-radio").forEach(el => el.classList.remove("selected"));
  if (element) element.classList.add("selected");
}

// ==========================================================================
// TELA 5: ESCOLHA DE DATA E HORÁRIO
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
  document.getElementById("selectedDateLabel").innerText = `${diaSemanaTexto}, ${formattedDay}/11`;

  // Atualizar horários dinamicamente
  renderTimeSlotsForSelectedDay();
}

function renderTimeSlotsForSelectedDay() {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  const slotsGrid = document.getElementById("timeSlotsGrid");
  if (!slotsGrid || !prof) return;

  const dia = AppState.bookingDraft.data;
  const horarios = (prof.horarios && prof.horarios[dia]) || [
    { hora: "14:00", status: "livre" },
    { hora: "14:30", status: "livre" },
    { hora: "15:00", status: "lotado" },
    { hora: "15:30", status: "livre" },
    { hora: "16:00", status: "livre" }
  ];

  slotsGrid.innerHTML = horarios.map(slot => {
    const isSelected = slot.hora === AppState.bookingDraft.horarioInicio && slot.status === "livre";
    return `
      <button 
        class="time-slot-btn ${slot.status === 'lotado' ? 'disabled' : ''} ${isSelected ? 'selected' : ''}"
        ${slot.status === 'lotado' ? 'disabled' : ''}
        onclick="updateTimeSlotSelection('${slot.hora}', this)">
        ${slot.hora}
      </button>
    `;
  }).join("");
}

function updateTimeSlotSelection(hora, btnElement) {
  AppState.bookingDraft.horarioInicio = hora;
  // Duração conforme o tipo
  const duracaoMin = AppState.bookingDraft.tipo === "Monitoria" ? 30 : 45;
  const [h, m] = hora.split(":").map(Number);
  const totalMin = h * 60 + m + duracaoMin;
  const endH = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const endM = String(totalMin % 60).padStart(2, "0");
  AppState.bookingDraft.horario = `${hora} – ${endH}:${endM}`;

  document.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("selected"));
  if (btnElement) btnElement.classList.add("selected");
}

// ==========================================================================
// TELA 6: CONFIRMAR AGENDAMENTO (REVISÃO & INPUTS)
// ==========================================================================
function prepareConfirmationScreen() {
  const prof = AppState.professores.find(p => p.id === AppState.bookingDraft.professorId);
  if (!prof) return;

  document.getElementById("confirmProfNome").innerText = prof.nome;
  document.getElementById("confirmTipoDisciplina").innerText = `${AppState.bookingDraft.tipo} · ${AppState.bookingDraft.disciplina}`;
  document.getElementById("confirmDataHorario").innerText = `${AppState.bookingDraft.dataTexto} · ${AppState.bookingDraft.horario}`;
  document.getElementById("confirmLocal").innerText = prof.localPadrao;

  // Atualizar select de tipo
  const tipoSelect = document.getElementById("confirmInputTipo");
  if (tipoSelect) tipoSelect.value = AppState.bookingDraft.tipo;

  navigateTo("screen-confirmar-agendamento");
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
  const assunto = document.getElementById("confirmInputAssunto")?.value || "Dúvidas gerais";
  const obs = document.getElementById("confirmInputObs")?.value || "";
  const lembreteMin = document.getElementById("confirmInputLembrete")?.value || "30";

  // Criar novo Agendamento
  const novoAgendamento = {
    id: Date.now(),
    titulo: `${AppState.bookingDraft.tipo} · ${AppState.bookingDraft.disciplina}`,
    tipo: AppState.bookingDraft.tipo,
    professor: prof ? prof.nome : "Professor Inatel",
    data: AppState.bookingDraft.dataTexto,
    horario: AppState.bookingDraft.horario,
    local: prof ? prof.localPadrao : "Sala 204 · Bloco 1",
    status: "CONFIRMADO", // De acordo com a regra de negócio do app
    assunto: assunto,
    observacao: obs,
    lembrete: `${lembreteMin} min antes`,
    periodoGrupo: "Esta semana",
    ehFuturo: true
  };

  // Adicionar ao estado
  AppState.agendamentos.unshift(novoAgendamento);

  // Criar Notificação correspondente
  const novaNotif = {
    id: Date.now(),
    titulo: "Agendamento confirmado!",
    mensagem: `${novoAgendamento.titulo} marcado com sucesso para ${novoAgendamento.data} às ${novoAgendamento.horario.split("–")[0]}.`,
    tempo: "Agora mesmo",
    tipo: "confirm",
    lida: false
  };
  AppState.notificacoes.unshift(novaNotif);

  // Atualizar Tela 7 (Sucesso)
  document.getElementById("successDetailTitulo").innerText = novoAgendamento.titulo;
  document.getElementById("successDetailData").innerText = `${novoAgendamento.data} · ${novoAgendamento.horario.split("–")[0]}`;
  document.getElementById("successDetailStatus").innerText = "CONFIRMADO";

  // Atualizar componentes
  renderHomeNextBooking();
  renderAgendamentos("proximos");
  renderNotificacoes("todas");

  // Exibir toast rápido
  showToast("Agendamento realizado e adicionado à sua agenda!");

  // Navegar para a tela de Sucesso
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

  // Agrupar por semana
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
      const statusClass = item.status === "CONFIRMADO" ? "livre" : item.status === "PENDENTE" ? "vagas" : "lotado";
      html += `
        <div class="appointment-card" onclick="viewAppointmentDetail(${item.id})">
          <div class="appointment-card-info">
            <h4>${item.titulo}</h4>
            <div class="app-datetime">${item.data} · ${item.horario}</div>
            <div class="app-prof">${item.professor} · ${item.local}</div>
          </div>
          <span class="status-badge ${statusClass}">${item.status}</span>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

// ==========================================================================
// TELA 9: DETALHE DO AGENDAMENTO & CANCELAMENTO
// ==========================================================================
function viewAppointmentDetail(id) {
  const item = AppState.agendamentos.find(a => a.id === id);
  if (!item) return;

  AppState.selectedAppointment = item;

  document.getElementById("detailItemTitulo").innerText = item.titulo;
  document.getElementById("detailItemStatus").innerText = item.status;
  
  const statusPill = document.getElementById("detailItemStatus");
  statusPill.className = "detail-status-pill";
  if (item.status === "CONFIRMADO") {
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

  // Desabilitar botões de ação se já estiver cancelado
  const btnCancelar = document.getElementById("btnOpenCancelModal");
  if (btnCancelar) {
    if (item.status === "CANCELADO") {
      btnCancelar.style.display = "none";
    } else {
      btnCancelar.style.display = "block";
    }
  }

  navigateTo("screen-detalhe-agendamento");
}

function openCancelModal() {
  const item = AppState.selectedAppointment;
  if (!item) return;

  document.getElementById("cancelModalTitulo").innerText = item.titulo;
  document.getElementById("cancelModalData").innerText = `${item.data} · ${item.horario}`;
  document.getElementById("modalCancelar").classList.add("active");
}

function closeCancelModal() {
  document.getElementById("modalCancelar").classList.remove("active");
}

function confirmCancellation() {
  const item = AppState.selectedAppointment;
  if (!item) return;

  // Atualizar status do agendamento
  item.status = "CANCELADO";
  item.periodoGrupo = "Cancelados";

  // Gerar notificação de cancelamento
  AppState.notificacoes.unshift({
    id: Date.now(),
    titulo: "Agendamento cancelado",
    mensagem: `Você cancelou o agendamento de ${item.titulo} do dia ${item.data}. A vaga foi liberada.`,
    tempo: "Agora mesmo",
    tipo: "cancel",
    lida: false
  });

  closeCancelModal();
  showToast("Agendamento cancelado com sucesso. Vaga liberada!");

  // Atualizar visualizações
  renderHomeNextBooking();
  renderAgendamentos("cancelados");
  renderNotificacoes("todas");
  navigateTo("screen-meus-agendamentos");
}

// ==========================================================================
// TELA 11: AVISOS E NOTIFICAÇÕES
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

  container.innerHTML = filtradas.map(n => {
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
      <div class="notif-card ${!n.lida ? 'unread' : ''}">
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
  }).join("");

  // Atualizar badge de não lidas na bottom nav
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
  AppState.notificacoes.forEach(n => n.lida = true);
  renderNotificacoes("todas");
  showToast("Todas as notificações foram marcadas como lidas.");
}

// ==========================================================================
// VISÃO DO PROFESSOR (TELAS 13 E 14 - WIREFRAME BONUS)
// ==========================================================================
function toggleUserRole() {
  if (AppState.currentUser.role === "aluno") {
    AppState.currentUser.role = "professor";
    const btnText = document.getElementById("btnToggleRoleText");
    if (btnText) btnText.innerText = "Alternar para Aluna (Ana Julia)";
    const roleText = document.getElementById("roleIndicatorText");
    if (roleText) roleText.innerText = "Modo: Prof. Raphael Pereira";
    navigateTo("screen-professor-agenda");
    showToast("Modo Professor ativado! Visualizando solicitações recebidas.");
  } else {
    AppState.currentUser.role = "aluno";
    const btnText = document.getElementById("btnToggleRoleText");
    if (btnText) btnText.innerText = "Alternar para Professor (Raphael)";
    const roleText = document.getElementById("roleIndicatorText");
    if (roleText) roleText.innerText = "Modo: Aluna (Ana Julia)";
    navigateTo("screen-home");
    showToast("Modo Aluna ativado.");
  }
}

function acceptStudentRequest(button) {
  const card = button.closest(".request-card");
  if (card) {
    card.style.background = "var(--status-livre-bg)";
    card.innerHTML = `
      <div style="font-weight: 700; color: var(--status-livre-text); font-size: 13px; text-align: center; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Solicitação aceita! O aluno recebeu a notificação.</span>
      </div>
    `;
  }
}

function refuseStudentRequest(button) {
  const card = button.closest(".request-card");
  if (card) {
    card.style.opacity = "0.5";
    card.innerHTML = `
      <div style="font-weight: 600; color: var(--text-muted); font-size: 12px; text-align: center; padding: 10px;">
        Solicitação recusada. Vaga mantida livre.
      </div>
    `;
  }
}

// ==========================================================================
// UTILITÁRIOS: TOAST, MODAL E FULLSCREEN
// ==========================================================================
function showToast(message) {
  const toast = document.getElementById("toastAlert");
  const msgElement = document.getElementById("toastMsg");
  if (!toast || !msgElement) return;

  msgElement.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function toggleDeviceMode() {
  document.body.classList.toggle("fullscreen-mode");
  const isFullscreen = document.body.classList.contains("fullscreen-mode");
  const btnText = document.getElementById("btnToggleDeviceText");
  const icon = document.getElementById("deviceIcon");

  if (isFullscreen) {
    if (btnText) btnText.innerText = "Ver na Moldura do Celular";
    if (icon) icon.innerHTML = '<rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>';
  } else {
    if (btnText) btnText.innerText = "Ver em Tela Cheia";
    if (icon) icon.innerHTML = '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>';
  }
}

function resetDemo() {
  localStorage.clear();
  window.location.reload();
}

function setupEventListeners() {
  // Configurações e atalhos globais
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCancelModal();
    }
  });
}
