// 📱 TEMPLATES DETALHADOS PARA CADA MENSAGEM
// Sistema com instruções específicas para geração individual de cada mensagem

const messageTemplates = {
  // FASE 1: ANTECIPAÇÃO (4 mensagens)
  1: {
    id: 1,
    nome: "Boas-vindas",
    fase: "antecipacao",
    tema: "Boas-vindas e agradecimento pela inscrição",
    objetivo: "Dar as boas-vindas ao inscrito, reforçar as datas do evento e criar a primeira conexão emocional",
    momento: "Imediatamente após a inscrição no evento",
    elementosChave: [
      "Agradecimento caloroso pela inscrição",
      "Reforço da promessa principal do evento", 
      "Datas e horários claros das aulas",
      "Link para pesquisa de interesse",
      "Alerta sobre segurança contra golpes"
    ],
    instrucoes: `
INSTRUÇÕES PARA GERAR MENSAGEM DE BOAS-VINDAS:

1. ESTRUTURA:
   - Abra com saudação personalizada e emoji de celebração
   - Agradeça pela inscrição de forma calorosa
   - Confirme as datas e horários das 3 aulas
   - Apresente a promessa principal do evento
   - Inclua link para pesquisa (usar placeholder)
   - Finalize com alerta de segurança

2. TOM E ESTILO:
   - Entusiasmado mas profissional
   - Use 2-3 emojis estratégicos
   - Linguagem simples e direta
   - Crie sensação de exclusividade

3. ELEMENTOS OBRIGATÓRIOS:
   - Nome do evento
   - Datas completas das 3 aulas
   - Promessa principal clara
   - Link da pesquisa
   - Aviso sobre golpes

4. TAMANHO: 8-12 linhas no WhatsApp
`
  },

  2: {
    id: 2,
    nome: "Alerta de segurança",
    fase: "antecipacao",
    tema: "Proteção contra golpes",
    objetivo: "Prevenir fraudes e estabelecer canais oficiais de comunicação",
    momento: "2 dias após a inscrição",
    elementosChave: [
      "Alerta enfático sobre golpes",
      "Lista de canais oficiais",
      "Link para verificação"
    ],
    instrucoes: `
INSTRUÇÕES PARA GERAR ALERTA DE SEGURANÇA:

1. ESTRUTURA:
   - Abra com emoji de alerta (⚠️ ou 🚨)
   - Mensagem direta sobre golpistas
   - Liste APENAS os canais oficiais
   - Reforce que NÃO pedem dados/pagamentos
   - Link de verificação

2. TOM E ESTILO:
   - Sério e protetor
   - Direto ao ponto
   - Use CAPS para ênfase
   - Crie senso de cuidado

3. ELEMENTOS OBRIGATÓRIOS:
   - Aviso claro sobre golpes
   - Canais oficiais do evento
   - O que NÃO fazem
   - Link verificação

4. TAMANHO: 6-8 linhas no WhatsApp
`
  },

  3: {
    id: 3,
    nome: "Segundo alerta de segurança",
    fase: "antecipacao",
    tema: "Reforço da proteção contra golpes",
    objetivo: "Assegurar que todos estejam cientes dos riscos",
    momento: "4 dias após a inscrição",
    elementosChave: [
      "Versão condensada do primeiro alerta",
      "Link para verificação"
    ],
    instrucoes: `
INSTRUÇÕES PARA SEGUNDO ALERTA:

1. ESTRUTURA:
   - Versão mais curta e direta
   - Reforce os pontos principais
   - Um emoji de alerta
   - Link de verificação

2. TOM E ESTILO:
   - Ainda mais direto
   - Tom de lembrete amigável
   - Sem repetir tudo

3. ELEMENTOS OBRIGATÓRIOS:
   - Lembrete sobre golpes
   - Canais oficiais resumidos
   - Link verificação

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  4: {
    id: 4,
    nome: "Contagem regressiva",
    fase: "antecipacao",
    tema: "Expectativa para o evento",
    objetivo: "Criar empolgação e estabelecer valor do evento",
    momento: "4 dias antes da Aula 1",
    elementosChave: [
      "Contagem regressiva empolgante",
      "Prévia do conteúdo valioso",
      "Reforço das datas",
      "Menção à oferta especial",
      "Alerta de segurança breve"
    ],
    instrucoes: `
INSTRUÇÕES PARA CONTAGEM REGRESSIVA:

1. ESTRUTURA:
   - Abra com "Faltam apenas X dias!"
   - Liste 3 coisas incríveis que aprenderão
   - Reforce datas e horários
   - Mencione oferta especial (sem detalhes)
   - Breve lembrete segurança

2. TOM E ESTILO:
   - Muito empolgante
   - Use emojis de foguete/fogo
   - Crie expectativa crescente
   - Linguagem de antecipação

3. ELEMENTOS OBRIGATÓRIOS:
   - Contagem regressiva clara
   - 3 benefícios específicos
   - Datas das aulas
   - Menção à surpresa

4. TAMANHO: 8-10 linhas no WhatsApp
`
  },

  // FASE 2: PREPARAÇÃO (3 mensagens)
  5: {
    id: 5,
    nome: "Véspera do evento",
    fase: "preparacao",
    tema: "Preparação para o início do evento",
    objetivo: "Assegurar presença na primeira aula e criar urgência",
    momento: "1 dia antes da Aula 1",
    elementosChave: [
      "Confirmação de presença",
      "Link para ativar lembrete",
      "Reforço de datas",
      "Alerta de segurança"
    ],
    instrucoes: `
INSTRUÇÕES PARA VÉSPERA:

1. ESTRUTURA:
   - "Amanhã é o grande dia!"
   - Pergunta se está preparado
   - Horário exato da aula
   - Link ativar lembrete
   - Dica de preparação

2. TOM E ESTILO:
   - Ansioso e cuidadoso
   - Como um amigo lembrando
   - Emojis de calendário/relógio
   - Criar preparação mental

3. ELEMENTOS OBRIGATÓRIOS:
   - Data e hora exatas
   - Link do lembrete
   - Uma dica prática
   - Confirmação presença

4. TAMANHO: 6-8 linhas no WhatsApp
`
  },

  6: {
    id: 6,
    nome: "Dia da primeira aula",
    fase: "preparacao",
    tema: "Empolgação para o início do evento",
    objetivo: "Maximizar participação na primeira aula",
    momento: "Manhã do dia da Aula 1",
    elementosChave: [
      "Contagem regressiva em horas",
      "Resumo do que aprenderão",
      "Benefícios de participar ao vivo",
      "Link para ativar lembrete"
    ],
    instrucoes: `
INSTRUÇÕES PARA DIA DA AULA:

1. ESTRUTURA:
   - "Hoje às [HORÁRIO]!"
   - 3 coisas que descobrirão
   - Benefício de estar ao vivo
   - Link do lembrete
   - Emoji de urgência

2. TOM E ESTILO:
   - Máxima empolgação
   - Urgência crescente
   - Emojis de fogo/foguete
   - Energia contagiante

3. ELEMENTOS OBRIGATÓRIOS:
   - Horário destacado
   - 3 descobertas da aula
   - Vantagem do ao vivo
   - Link lembrete

4. TAMANHO: 7-9 linhas no WhatsApp
`
  },

  7: {
    id: 7,
    nome: "Último lembrete antes da primeira aula",
    fase: "preparacao",
    tema: "Lembrete final com incentivo adicional",
    objetivo: "Capturar participantes de última hora",
    momento: "2-3 horas antes da Aula 1",
    elementosChave: [
      "Lembrete rápido e direto",
      "Menção a sorteio ou bônus",
      "Incentivo para não sair do grupo",
      "Link para ativar lembrete"
    ],
    instrucoes: `
INSTRUÇÕES PARA ÚLTIMO LEMBRETE:

1. ESTRUTURA:
   - "Última chance!"
   - Horário em destaque
   - Mencione bônus surpresa
   - Alerta para não perder
   - Link lembrete

2. TOM E ESTILO:
   - Urgente mas amigável
   - Direto ao ponto
   - Um emoji de presente
   - Escassez de tempo

3. ELEMENTOS OBRIGATÓRIOS:
   - "Em 2 horas!"
   - Bônus para quem chegar
   - Link do lembrete
   - Call to action clara

4. TAMANHO: 5-6 linhas no WhatsApp
`
  },

  // FASE 3: AULA 1 (5 mensagens)
  8: {
    id: 8,
    nome: "Uma hora antes da primeira aula",
    fase: "aula1",
    tema: "Preparação imediata",
    objetivo: "Criar senso de urgência e preparação final",
    momento: "1 hora antes da Aula 1",
    elementosChave: [
      "Contagem regressiva final",
      "Dicas de preparação",
      "Reforço dos benefícios",
      "Link da aula"
    ],
    instrucoes: `
INSTRUÇÕES PARA 1 HORA ANTES:

1. ESTRUTURA:
   - "1 HORA! ⏰"
   - Checklist rápido
   - O que preparar
   - Link da aula
   - Promessa específica

2. TOM E ESTILO:
   - Máxima urgência
   - Prático e direto
   - Emojis de relógio
   - Tom de preparação

3. ELEMENTOS OBRIGATÓRIOS:
   - Contagem clara
   - 3 itens para preparar
   - Link direto
   - Uma promessa

4. TAMANHO: 6-7 linhas no WhatsApp
`
  },

  9: {
    id: 9,
    nome: "Primeira aula ao vivo",
    fase: "aula1",
    tema: "Aula iniciando agora",
    objetivo: "Notificar início imediato da transmissão",
    momento: "Momento exato do início da Aula 1",
    elementosChave: [
      "Anúncio de transmissão ao vivo",
      "Benefícios principais",
      "Acessibilidade do conteúdo",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA AULA AO VIVO:

1. ESTRUTURA:
   - "🔴 AO VIVO AGORA!"
   - Está começando
   - Entre agora
   - Link direto
   - Urgência máxima

2. TOM E ESTILO:
   - Ultra urgente
   - Caps para destaque
   - Emoji vermelho
   - Direto e claro

3. ELEMENTOS OBRIGATÓRIOS:
   - "AO VIVO"
   - "AGORA"
   - Link clicável
   - Call to action

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  10: {
    id: 10,
    nome: "Início do conteúdo principal",
    fase: "aula1",
    tema: "Conteúdo principal começando",
    objetivo: "Recuperar participantes atrasados",
    momento: "10 minutos após início da Aula 1",
    elementosChave: [
      "Linguagem de urgência extrema",
      "Pergunta direta sobre presença",
      "Link da aula"
    ],
    instrucoes: `
INSTRUÇÕES PARA CONTEÚDO PRINCIPAL:

1. ESTRUTURA:
   - Pergunta direta
   - "Já está assistindo?"
   - Revelação começando
   - Link urgente
   - Última chance

2. TOM E ESTILO:
   - Questionador
   - Preocupado
   - Um emoji de atenção
   - Tom pessoal

3. ELEMENTOS OBRIGATÓRIOS:
   - Pergunta sobre presença
   - O que está perdendo
   - Link direto
   - Senso de perda

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  11: {
    id: 11,
    nome: "Lembrete durante a primeira aula",
    fase: "aula1",
    tema: "Conteúdo valioso em andamento",
    objetivo: "Atrair participantes que ainda não acessaram",
    momento: "30 minutos após início da Aula 1",
    elementosChave: [
      "Tom de questionamento",
      "Destaque do conteúdo atual",
      "Link da aula"
    ],
    instrucoes: `
INSTRUÇÕES PARA LEMBRETE DURANTE:

1. ESTRUTURA:
   - Tom reflexivo
   - Mencione algo específico
   - Que está sendo revelado
   - Pergunta provocativa
   - Link para entrar

2. TOM E ESTILO:
   - Intrigante
   - Criar FOMO
   - Um emoji pensativo
   - Mistério do conteúdo

3. ELEMENTOS OBRIGATÓRIOS:
   - Conteúdo sendo revelado
   - Pergunta engagement
   - Link da aula
   - Senso de exclusividade

4. TAMANHO: 5-6 linhas no WhatsApp
`
  },

  12: {
    id: 12,
    nome: "Aviso sobre sorteio/incentivo",
    fase: "aula1",
    tema: "Oportunidade adicional durante a aula",
    objetivo: "Oferecer motivação extra para participação tardia",
    momento: "45 minutos após início da Aula 1",
    elementosChave: [
      "Destaque do prêmio/incentivo",
      "Menção ao número de participantes",
      "Link da aula"
    ],
    instrucoes: `
INSTRUÇÕES PARA SORTEIO:

1. ESTRUTURA:
   - "🎁 SORTEIO!"
   - Prêmio específico
   - Quantos participando
   - Como participar
   - Link direto

2. TOM E ESTILO:
   - Empolgante
   - Oportunidade única
   - Emojis de presente
   - Criar competição

3. ELEMENTOS OBRIGATÓRIOS:
   - Prêmio claro
   - Número de pessoas
   - Regra simples
   - Link da aula

4. TAMANHO: 5-6 linhas no WhatsApp
`
  },

  // FASE 4: INTERMEDIÁRIA - PREPARAÇÃO AULA 2 (3 mensagens)
  13: {
    id: 13,
    nome: "Resumo da primeira aula e convite para a segunda",
    fase: "intermediaria-aula2",
    tema: "Recapitulação e antecipação",
    objetivo: "Reforçar valor do conteúdo e garantir presença na próxima aula",
    momento: "Manhã do dia da Aula 2",
    elementosChave: [
      "Métricas de participação",
      "Resumo da Aula 1",
      "Link da Aula 1 (replay)",
      "Link da Aula 2 (lembrete)"
    ],
    instrucoes: `
INSTRUÇÕES PARA RESUMO E CONVITE:

1. ESTRUTURA:
   - Número impressionante
   - 3 pontos da Aula 1
   - O que vem na Aula 2
   - Links organizados
   - Horário de hoje

2. TOM E ESTILO:
   - Recapitulativo
   - Construir momentum
   - Emojis de gráfico
   - Progressão clara

3. ELEMENTOS OBRIGATÓRIOS:
   - X pessoas assistiram
   - Resumo em bullets
   - Prévia Aula 2
   - Dois links claros

4. TAMANHO: 8-10 linhas no WhatsApp
`
  },

  14: {
    id: 14,
    nome: "Lembrete para segunda aula",
    fase: "intermediaria-aula2",
    tema: "Antecipação do conteúdo prático",
    objetivo: "Destacar valor prático da segunda aula",
    momento: "Início da tarde do dia da Aula 2",
    elementosChave: [
      "Urgência temporal",
      "Conteúdo prático prometido",
      "Ferramentas exclusivas",
      "Pergunta de engajamento",
      "Link do lembrete"
    ],
    instrucoes: `
INSTRUÇÕES PARA LEMBRETE AULA 2:

1. ESTRUTURA:
   - "Hoje tem mais!"
   - Ferramenta exclusiva
   - Resultado prático
   - Pergunta engagement
   - Link lembrete

2. TOM E ESTILO:
   - Prático e direto
   - Foco em resultados
   - Emoji de ferramentas
   - Valor tangível

3. ELEMENTOS OBRIGATÓRIOS:
   - Horário destacado
   - Ferramenta/template
   - Benefício claro
   - Link do lembrete

4. TAMANHO: 6-8 linhas no WhatsApp
`
  },

  15: {
    id: 15,
    nome: "Uma hora antes da segunda aula",
    fase: "intermediaria-aula2",
    tema: "Contagem regressiva com destaque para conteúdos específicos",
    objetivo: "Criar urgência com base no conteúdo valioso",
    momento: "1 hora antes da Aula 2",
    elementosChave: [
      "Contagem regressiva",
      "Elementos mais atrativos",
      "Lista de tópicos",
      "Link do lembrete"
    ],
    instrucoes: `
INSTRUÇÕES PARA 1H ANTES AULA 2:

1. ESTRUTURA:
   - "1 hora para:"
   - Lista 3 coisas
   - Mais prático hoje
   - Preparar material
   - Link direto

2. TOM E ESTILO:
   - Lista objetiva
   - Foco prático
   - Emojis de check
   - Preparação ativa

3. ELEMENTOS OBRIGATÓRIOS:
   - Contagem exata
   - 3 entregas claras
   - Ação preparatória
   - Link da aula

4. TAMANHO: 6-7 linhas no WhatsApp
`
  },

  // FASE 5: AULA 2 (3 mensagens)
  16: {
    id: 16,
    nome: "Segunda aula ao vivo",
    fase: "aula2",
    tema: "Aula prática iniciando agora",
    objetivo: "Notificar início imediato da transmissão prática",
    momento: "Momento exato do início da Aula 2",
    elementosChave: [
      "Anúncio de transmissão ao vivo",
      "Destaque do conteúdo prático",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA AULA 2 AO VIVO:

1. ESTRUTURA:
   - "🔴 AULA 2 AO VIVO!"
   - Mão na massa agora
   - Projeto real
   - Entre já
   - Link direto

2. TOM E ESTILO:
   - Ação imediata
   - Prático e urgente
   - Emoji vermelho
   - Resultado tangível

3. ELEMENTOS OBRIGATÓRIOS:
   - "AO VIVO"
   - "PRÁTICA"
   - Link clicável
   - Urgência máxima

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  17: {
    id: 17,
    nome: "Lembrete durante a segunda aula",
    fase: "aula2",
    tema: "Desafio para participação",
    objetivo: "Provocar engajamento de retardatários",
    momento: "30 minutos após início da Aula 2",
    elementosChave: [
      "Abordagem provocativa",
      "Destaque do que estão perdendo",
      "Material exclusivo",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA PROVOCAÇÃO:

1. ESTRUTURA:
   - Pergunta provocativa
   - O que já fizemos
   - Template exclusivo
   - Ainda dá tempo
   - Link urgente

2. TOM E ESTILO:
   - Desafiador amigável
   - Criar urgência
   - Emoji pensativo
   - FOMO intenso

3. ELEMENTOS OBRIGATÓRIOS:
   - Provocação inicial
   - Resultado alcançado
   - Exclusividade
   - Link direto

4. TAMANHO: 5-6 linhas no WhatsApp
`
  },

  18: {
    id: 18,
    nome: "Último lembrete segunda aula",
    fase: "aula2",
    tema: "Última chance para conteúdo essencial",
    objetivo: "Capturar participantes finais",
    momento: "1 hora após início da Aula 2",
    elementosChave: [
      "Urgência máxima",
      "Ferramenta exclusiva",
      "Incentivo adicional",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA ÚLTIMA CHANCE:

1. ESTRUTURA:
   - "ÚLTIMOS MINUTOS"
   - Ferramenta liberada
   - Só hoje grátis
   - Corra agora
   - Link final

2. TOM E ESTILO:
   - Urgência extrema
   - Escassez real
   - Emoji alerta
   - Oportunidade única

3. ELEMENTOS OBRIGATÓRIOS:
   - Tempo limitado
   - Valor da ferramenta
   - Gratuidade temporária
   - Link urgente

4. TAMANHO: 5-6 linhas no WhatsApp
`
  },

  // FASE 6: INTERMEDIÁRIA - PREPARAÇÃO AULA 3 (3 mensagens)
  19: {
    id: 19,
    nome: "Convite para terceira aula",
    fase: "intermediaria-aula3",
    tema: "Revelação de conteúdo de alto valor e antecipação da oferta",
    objetivo: "Maximizar participação na aula final e preparar para oferta",
    momento: "Manhã do dia da Aula 3",
    elementosChave: [
      "Urgência diferenciada",
      "Anúncio de revelações específicas",
      "Link da Aula 2 (replay)",
      "Importância da Aula 3",
      "Menção à oferta"
    ],
    instrucoes: `
INSTRUÇÕES PARA CONVITE AULA 3:

1. ESTRUTURA:
   - "A aula mais importante"
   - Revelação específica
   - Método completo
   - Oferta mencionada
   - Links e horário

2. TOM E ESTILO:
   - Importância máxima
   - Mistério e valor
   - Emoji de atenção
   - Preparar decisão

3. ELEMENTOS OBRIGATÓRIOS:
   - "Mais importante"
   - Segredo/método
   - Menção oferta
   - Horário e links

4. TAMANHO: 8-10 linhas no WhatsApp
`
  },

  20: {
    id: 20,
    nome: "Importância da terceira aula",
    fase: "intermediaria-aula3",
    tema: "Aula decisiva para alcançar o objetivo principal",
    objetivo: "Enfatizar importância crucial da última aula",
    momento: "Início da tarde do dia da Aula 3",
    elementosChave: [
      "Máxima atenção requerida",
      "Conexão com objetivo principal",
      "Detalhes da oferta especial",
      "Disponibilidade limitada"
    ],
    instrucoes: `
INSTRUÇÕES PARA IMPORTÂNCIA:

1. ESTRUTURA:
   - Conexão com sonho
   - Por que crucial
   - Preparar decisão
   - Vagas limitadas
   - Atenção total

2. TOM E ESTILO:
   - Sério e importante
   - Momento decisivo
   - Emoji de alvo
   - Transformacional

3. ELEMENTOS OBRIGATÓRIOS:
   - Link com objetivo
   - Decisão de vida
   - Escassez real
   - Call to action

4. TAMANHO: 7-9 linhas no WhatsApp
`
  },

  21: {
    id: 21,
    nome: "Uma hora antes da terceira aula",
    fase: "intermediaria-aula3",
    tema: "Preparação especial para conteúdo transformador",
    objetivo: "Criar senso de preparação especial e importância crucial",
    momento: "1 hora antes da Aula 3",
    elementosChave: [
      "Contagem regressiva especial",
      "Perguntas de preparação",
      "Atenção total necessária",
      "Conexão com transformação de vida"
    ],
    instrucoes: `
INSTRUÇÕES PARA 1H ANTES AULA 3:

1. ESTRUTURA:
   - "1 hora para mudança"
   - 3 perguntas reflexivas
   - Preparar caderno
   - Momento único
   - Link e foco

2. TOM E ESTILO:
   - Transformacional
   - Reflexivo profundo
   - Emoji coração/estrela
   - Momento especial

3. ELEMENTOS OBRIGATÓRIOS:
   - Perguntas poderosas
   - Preparação mental
   - Importância única
   - Link da aula

4. TAMANHO: 7-8 linhas no WhatsApp
`
  },

  // FASE 7: AULA 3 (4 mensagens)
  22: {
    id: 22,
    nome: "Terceira aula ao vivo",
    fase: "aula3",
    tema: "Aula mais importante iniciando agora",
    objetivo: "Notificar início da aula decisiva com oferta especial",
    momento: "Momento exato do início da Aula 3",
    elementosChave: [
      "Urgência máxima",
      "Conteúdo exclusivo",
      "Menção à oferta especial",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA AULA 3 AO VIVO:

1. ESTRUTURA:
   - "🔴 A AULA FINAL!"
   - Revelação completa
   - Oferta especial
   - Entre AGORA
   - Link urgente

2. TOM E ESTILO:
   - Máxima importância
   - Decisivo e único
   - Emoji vermelho/fogo
   - Transformacional

3. ELEMENTOS OBRIGATÓRIOS:
   - "FINAL/DECISIVA"
   - "OFERTA"
   - Link direto
   - Urgência extrema

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  23: {
    id: 23,
    nome: "Lembrete durante a terceira aula",
    fase: "aula3",
    tema: "Reflexão sobre oportunidade",
    objetivo: "Usar abordagem filosófica para engajar retardatários",
    momento: "30 minutos após início da Aula 3",
    elementosChave: [
      "Tom reflexivo",
      "Limite da ajuda oferecida",
      "Transferência de responsabilidade",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA REFLEXÃO:

1. ESTRUTURA:
   - Pergunta filosófica
   - Sobre oportunidades
   - Escolha pessoal
   - Última tentativa
   - Link disponível

2. TOM E ESTILO:
   - Reflexivo profundo
   - Transferir decisão
   - Emoji pensativo
   - Sem pressão

3. ELEMENTOS OBRIGATÓRIOS:
   - Reflexão vida
   - Responsabilidade
   - Oferta mencionada
   - Link final

4. TAMANHO: 5-7 linhas no WhatsApp
`
  },

  24: {
    id: 24,
    nome: "Segundo lembrete durante a terceira aula",
    fase: "aula3",
    tema: "Última chamada urgente",
    objetivo: "Capturar participantes finais com urgência extrema",
    momento: "45 minutos após início da Aula 3",
    elementosChave: [
      "Mensagem curta e direta",
      "Questionamento sobre presença",
      "Oportunidade limitada",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA ÚLTIMA CHAMADA:

1. ESTRUTURA:
   - Ultra curta
   - "Você está aqui?"
   - Fechando oferta
   - Último link
   - 3-4 linhas max

2. TOM E ESTILO:
   - Direto ao ponto
   - Pergunta simples
   - Um emoji
   - Finalização

3. ELEMENTOS OBRIGATÓRIOS:
   - Pergunta direta
   - Menção fechamento
   - Link clicável
   - Brevidade extrema

4. TAMANHO: 3-4 linhas no WhatsApp
`
  },

  25: {
    id: 25,
    nome: "Anúncio da condição especial",
    fase: "aula3",
    tema: "Alerta para revelação da oferta",
    objetivo: "Criar expectativa para apresentação da oferta",
    momento: "1h15min após início da Aula 3",
    elementosChave: [
      "Linguagem de alerta",
      "Iminência da revelação da oferta",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA ANÚNCIO OFERTA:

1. ESTRUTURA:
   - "⚠️ ATENÇÃO!"
   - Abrindo em minutos
   - Condição especial
   - Prepare-se
   - Link urgente

2. TOM E ESTILO:
   - Alerta máximo
   - Preparação mental
   - Emojis de alerta
   - Antecipação

3. ELEMENTOS OBRIGATÓRIOS:
   - Alerta claro
   - Timing iminente
   - "Especial/exclusivo"
   - Link da aula

4. TAMANHO: 4-5 linhas no WhatsApp
`
  },

  // FASE 8: OFERTA - LISTA VIP (3 mensagens)
  26: {
    id: 26,
    nome: "Anúncio das inscrições",
    fase: "oferta-vip",
    tema: "Informações completas sobre a oferta",
    objetivo: "Comunicar todos os detalhes da oferta especial",
    momento: "Após término da Aula 3",
    elementosChave: [
      "Urgência temporal",
      "Resumo da Aula 3",
      "Detalhes completos da oferta",
      "Acesso VIP antecipado",
      "Link da página de vendas"
    ],
    instrucoes: `
INSTRUÇÕES PARA ANÚNCIO COMPLETO:

1. ESTRUTURA:
   - Celebração abertura
   - Resumo transformador
   - Oferta detalhada
   - Preço e condições
   - Links e ação

2. TOM E ESTILO:
   - Informativo completo
   - Celebrativo mas claro
   - Emojis estratégicos
   - Benefícios claros

3. ELEMENTOS OBRIGATÓRIOS:
   - Todos os detalhes
   - Preço e parcelamento
   - Bônus principais
   - Link de compra

4. TAMANHO: 12-15 linhas no WhatsApp
`
  },

  27: {
    id: 27,
    nome: "Lembrete sobre a terceira aula",
    fase: "oferta-vip",
    tema: "Recap da aula final para quem perdeu",
    objetivo: "Recuperar pessoas que não assistiram à aula final",
    momento: "Manhã do dia seguinte à Aula 3",
    elementosChave: [
      "Resumo da aula final",
      "Menção à oferta especial",
      "Link do replay",
      "Destaque para acesso VIP"
    ],
    instrucoes: `
INSTRUÇÕES PARA RECAP:

1. ESTRUTURA:
   - Para quem perdeu
   - 3 pontos principais
   - Replay disponível
   - Oferta ainda aberta
   - Prazo limite

2. TOM E ESTILO:
   - Segunda chance
   - Resumo objetivo
   - Emoji de relógio
   - Urgência crescente

3. ELEMENTOS OBRIGATÓRIOS:
   - Resumo em bullets
   - Link do replay
   - Prazo da oferta
   - Link de compra

4. TAMANHO: 8-10 linhas no WhatsApp
`
  },

  28: {
    id: 28,
    nome: "Bônus exclusivos",
    fase: "oferta-vip",
    tema: "Detalhamento dos bônus da oferta",
    objetivo: "Aumentar valor percebido da oferta",
    momento: "Meio da manhã do dia seguinte à Aula 3",
    elementosChave: [
      "Lista detalhada de bônus",
      "Benefícios de ação rápida",
      "Acesso VIP",
      "Link da página de vendas"
    ],
    instrucoes: `
INSTRUÇÕES PARA BÔNUS:

1. ESTRUTURA:
   - "Olha só o que vem:"
   - Lista numerada
   - Valor de cada bônus
   - Total economizado
   - Ação imediata

2. TOM E ESTILO:
   - Revelação de valor
   - Empolgante e claro
   - Emojis de presente
   - Stack de valor

3. ELEMENTOS OBRIGATÓRIOS:
   - Mínimo 5 bônus
   - Valores em R$
   - Economia total
   - Link de compra

4. TAMANHO: 10-12 linhas no WhatsApp
`
  },

  // FASE 9: VENDAS - DIA 1 (2 mensagens)
  29: {
    id: 29,
    nome: "Inscrições abertas",
    fase: "vendas-dia1",
    tema: "Abertura oficial das inscrições",
    objetivo: "Comunicar disponibilidade imediata da oferta",
    momento: "Momento exato da abertura",
    elementosChave: [
      "Anúncio entusiasmado",
      "Prazo limitado",
      "Valor do desconto",
      "Link direto para checkout"
    ],
    instrucoes: `
INSTRUÇÕES PARA ABERTURA:

1. ESTRUTURA:
   - "🚀 ABRIU!!!"
   - Para todos agora
   - Desconto ativo
   - Vagas limitadas
   - Link checkout

2. TOM E ESTILO:
   - Máxima celebração
   - Urgência e escassez
   - Emojis de festa
   - Ação imediata

3. ELEMENTOS OBRIGATÓRIOS:
   - "ABERTAS"
   - Valor do desconto
   - Limite de vagas
   - Link direto

4. TAMANHO: 5-7 linhas no WhatsApp
`
  },

  30: {
    id: 30,
    nome: "Lista de bônus",
    fase: "vendas-dia1",
    tema: "Detalhamento completo de todos os bônus",
    objetivo: "Aumentar valor percebido da oferta",
    momento: "Ao longo do primeiro dia",
    elementosChave: [
      "Linguagem entusiasmada",
      "Lista completa de bônus",
      "Link de inscrição"
    ],
    instrucoes: `
INSTRUÇÕES PARA LISTA COMPLETA:

1. ESTRUTURA:
   - Stack completo
   - 10+ bônus listados
   - Valores somados
   - Economia total
   - Call to action

2. TOM E ESTILO:
   - Generosidade extrema
   - Clareza nos valores
   - Emojis variados
   - Impressionar valor

3. ELEMENTOS OBRIGATÓRIOS:
   - Todos os bônus
   - Soma total R$
   - Comparação valor
   - Link compra

4. TAMANHO: 15-20 linhas no WhatsApp
`
  },

  // FASE 10: VENDAS - DIA 2 (1 mensagem)
  31: {
    id: 31,
    nome: "Contagem regressiva",
    fase: "vendas-dia2",
    tema: "Urgência temporal intensificada",
    objetivo: "Criar pressão de tempo limitado",
    momento: "Ao longo do segundo dia",
    elementosChave: [
      "Contagem regressiva clara",
      "Urgência crescente",
      "Benefícios em risco",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA CONTAGEM:

1. ESTRUTURA:
   - "24 HORAS!"
   - X vagas restantes
   - Amanhã acaba
   - Nunca mais volta
   - Link urgente

2. TOM E ESTILO:
   - Urgência temporal
   - Escassez dupla
   - Emoji de ampulheta
   - Pressão crescente

3. ELEMENTOS OBRIGATÓRIOS:
   - Tempo exato
   - Vagas restantes
   - Finalidade clara
   - Link compra

4. TAMANHO: 6-8 linhas no WhatsApp
`
  },

  // FASE 11: VENDAS - EXTENSÃO (1 mensagem)
  32: {
    id: 32,
    nome: "Extensão especial",
    fase: "vendas-extensao",
    tema: "Reabertura por problemas técnicos",
    objetivo: "Justificar extensão e reabrir vendas",
    momento: "Após primeiro prazo",
    elementosChave: [
      "Justificativa técnica",
      "Segunda chance limitada",
      "Urgência renovada",
      "Link direto"
    ],
    instrucoes: `
INSTRUÇÕES PARA EXTENSÃO:

1. ESTRUTURA:
   - Problema aconteceu
   - Muitos não conseguiram
   - Decisão de reabrir
   - Prazo curto extra
   - Última oportunidade

2. TOM E ESTILO:
   - Compreensivo
   - Segunda chance real
   - Emoji de atenção
   - Prazo improrrogável

3. ELEMENTOS OBRIGATÓRIOS:
   - Justificativa clara
   - Novo prazo exato
   - "Última chance"
   - Link checkout

4. TAMANHO: 8-10 linhas no WhatsApp
`
  },

  // FASE 12: VENDAS - ÚLTIMO PRAZO (1 mensagem)
  33: {
    id: 33,
    nome: "Último prazo",
    fase: "vendas-final",
    tema: "Prazo final definitivo",
    objetivo: "Última oportunidade credível",
    momento: "Últimos dias",
    elementosChave: [
      "Finalidade definitiva",
      "Últimas horas",
      "Consequências de perder",
      "Link final"
    ],
    instrucoes: `
INSTRUÇÕES PARA PRAZO FINAL:

1. ESTRUTURA:
   - "HOJE ENCERRA!"
   - Sem exceções
   - Última vez oferecido
   - Arrependimento futuro
   - Link final

2. TOM E ESTILO:
   - Definitivo e final
   - Sem negociação
   - Emoji de stop
   - Decisão agora

3. ELEMENTOS OBRIGATÓRIOS:
   - "ÚLTIMO DIA"
   - Horário exato
   - Consequências
   - Link urgente

4. TAMANHO: 6-8 linhas no WhatsApp
`
  }
};

// Função helper para buscar template por ID
function getMessageTemplate(messageId) {
  return messageTemplates[messageId] || null;
}

// Função para buscar templates por fase
function getTemplatesByPhase(phaseName) {
  return Object.values(messageTemplates).filter(template => template.fase === phaseName);
}

// Função para contar total de mensagens
function getTotalMessages() {
  return Object.keys(messageTemplates).length;
}

module.exports = {
  messageTemplates,
  getMessageTemplate,
  getTemplatesByPhase,
  getTotalMessages
};