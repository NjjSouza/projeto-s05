# ◞ ♡･ App Inatel Agendamento de Atendimentos com Monitores e Professores 🩵

> Projeto desenvolvido para a disciplina de **Interação Homem-Máquina (Ergonomia e Usabilidade)**  
> Curso de **Engenharia de Software** - Instituto Nacional de Telecomunicações (**Inatel**)   
> **Professor:** Prof. Raphael Pereira

---

## ─ Link da Interface Publicada
Acesse o protótipo funcional em execução no **GitHub Pages**: **[https://njjsouza.github.io/projeto-s05/](https://njjsouza.github.io/projeto-s05/)**

---

## ─ Sobre o Projeto

O objetivo deste projeto é conceber, documentar e implementar uma nova funcionalidade para o aplicativo móvel oficial do **Inatel**: o **Agendamento de Atendimentos (Monitorias de Disciplina e Reuniões de Projetos/Iniciação Científica)**.

Hoje, informações sobre horários de monitoria e disponibilidade dos professores encontram-se fragmentadas em murais físicos, e-mails e grupos de mensagem. A nova funcionalidade centraliza agendas, vagas em tempo real, cancelamento transparente e lembretes automáticos diretamente no celular do estudante.

---

## ─ Persona e User Story

### Persona: Ana Julia (Matrícula: 1048)
- **Perfil:** Estudante do 4º período noturno de Engenharia de Software no Inatel.
- **Contexto:** Divide o tempo entre aulas à noite, pesquisa acadêmica (IC) e projetos práticos. Sente dificuldade pontual em matérias como Cálculo II, mas tem receio de interromper a aula expositiva para perguntar.
- **Comportamento:** Organizada e usuária intensiva de smartphone: se uma tarefa acadêmica puder ser resolvida com poucos toques no celular, ela resolve imediatamente; se depender de caçar informações dispersas, desiste ou posterga.

### User Story
> *"Como Ana Julia, estudante de Engenharia de Software que concilia aulas, pesquisa e projetos, quero encontrar horários disponíveis e marcar atendimento com monitores e professores, para que eu tire minhas dúvidas e alinhe meu trabalho sem perder tempo com agenda e sem ficar para trás."*

---

## ─ Análise da Tarefa (HTA - Hierarchical Task Analysis)

A atividade de agendamento foi decomposta em metas hierarquizadas:

- **0. Agendar atendimento (monitoria ou reunião com professor)** `Plano: 1 > 2 > 3 > 4 / 5`
  - **1. Acessar Atendimentos no App** `Plano: 1.1 > 1.2`
    - `1.1` Abrir o App e autenticar com a conta Inatel
    - `1.2` Acessar o atalho em destaque *"Agendar com professor"* ou menu de Suporte Estudantil
  - **2. Encontrar monitor ou professor** `Plano: 2.1 > 2.2 / 2.3`
    - `2.1` Escolher disciplina, professor ou projeto (com busca dinâmica e filtros por modalidade)
    - `2.2` Comparar dias, horários e vagas disponíveis (com aviso de compatibilidade com a grade de aula)
    - `2.3` Entrar na lista de espera *(opcional / contingência)*
  - **3. Reservar horário** `Plano: 3.1 > 3.2`
    - `3.1` Escolher dia e horário no mini calendário
    - `3.2` Indicar assunto da dúvida e observações *(com chips de preenchimento rápido)*
  - **4. Confirmar e receber lembrete**
    - Revisar dados do atendimento, configurar tempo de antecedência do lembrete e confirmar
  - **5. Cancelar ou reagendar** *(opcional)*
    - Gerenciamento via aba "Agenda" com liberação imediata da vaga

---

## ─ Fluxo de Informação (Diagrama de Classes UML)

A modelagem de classes reflete fielmente o domínio do sistema:
- `Usuario` *(classe abstrata)* generalizada por `Aluno`, `Professor`, `Monitor` e `Administrador`.
- `Disciplina` associada a `Monitoria` e `Professor`.
- `Monitoria` gerenciando horários, status (`ABERTA`, `LOTADA`, `ENCERRADA`) e capacidade de vagas (`haVagas()`, `reservarVaga()`, `liberarVaga()`).
- `Agendamento` vinculando o `Aluno` à `Monitoria` ou atendimento do `Professor`.
- `Notificacao` e `Lembrete` automatizando o feedback ao usuário antes do início do atendimento.

---

## ─ Identidade Visual e Ergonomia da Interface

- **Paleta de Cores Inatel:** Predominância do Azul Inatel institucional (`#005696`, `#003E73`), tons suaves de superfície (`#F4F6F9`) e cores semânticas para estados de vaga (Verde para *Livre*, Âmbar para *Poucas vagas*, Vermelho para *Lotado*).
- **Componentes Nativos Mobile:** Bottom navigation bar, abas deslizantes, feedback imediato com Toast e modal com backdrop blur.
- **Responsividade Híbrida:** 
  - Em telas de desktop, exibe o aplicativo dentro de um mockup realista de smartphone (com opção de alternar para tela cheia).
  - Em dispositivos móveis reais (em pé ou em paisagem), adapta-se fluidamente a 100% da viewport como um app nativo, usando `dvh` e áreas seguras (notch / home indicator).
  - A moldura do celular acompanha a altura da janela (mín. 450px, máx. 820px), mantendo a navegação inferior sempre visível em notebooks.
  - No celular, a troca para a **Visão do Professor** fica em *Perfil > Visão do Professor (demo)*, já que a barra de demonstração é ocultada.
- **Visão do Professor (Diferencial):** Botão no topo que permite simular a visão do docente (Prof. Raphael) aceitando e recusando solicitações e configurando novos horários de atendimento.

---

## ─ Estrutura de Arquivos

```text
projeto-s05/
├── index.html                           # Interface web responsiva (ponto de entrada)
├── README.md                            # Documentação técnica do projeto
├── .gitignore                           # Ignora arquivos temporários da IDE
├── assets/
│   ├── css/style.css                    # Folha de estilos e Design System Inatel
│   ├── js/app.js                        # Lógica interativa, dados mockados e reatividade
│   └── img/Inatel.png                   # Logotipo do Inatel
└── docs/
    ├── Entrega.pdf                      # Slide da entrega final
    └── ExemploEntrega.pdf               # Modelo oficial de entrega da disciplina                       # Diagrama de Classes UML e fluxo de informação
```

---

## ─ Como Executar Localmente

Não requer instalação de dependências ou build:
1. Clone o repositório:
   ```bash
   git clone https://github.com/NjjSouza/projeto-s05.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno.
