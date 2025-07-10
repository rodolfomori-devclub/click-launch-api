// 🚀 CALENDÁRIO DE MENSAGENS DE LANÇAMENTO - 12 FASES
// Sistema baseado no funil completo de lançamento com 70+ mensagens organizadas por fases estratégicas

const messagesPhases = {
  // 🔄 FASE 1: ANTECIPAÇÃO
  'fase-antecipacao': {
    id: 'fase-antecipacao',
    name: 'Fase de Antecipação',
    description: 'Mensagens enviadas antes do evento começar para criar expectativa',
    color: '#8B5CF6',
    icon: '🔄',
    order: 1,
    timing: 'Antes do evento começar',
    objective: 'Criar expectativa e preparar o público para o evento',
    messages: [
      {
        id: 1,
        name: 'Boas-vindas',
        theme: 'Boas-vindas e agradecimento pela inscrição',
        objective: 'Dar as boas-vindas, reforçar datas e criar primeira conexão emocional',
        timing: 'Imediatamente após a inscrição no evento',
        keyElements: ['Agradecimento', 'Promessa principal', 'Datas e horários', 'Link pesquisa', 'Alerta segurança']
      },
      {
        id: 2,
        name: 'Alerta de segurança',
        theme: 'Proteção contra golpes',
        objective: 'Prevenir fraudes e estabelecer canais oficiais',
        timing: '2 dias após a inscrição',
        keyElements: ['Alerta enfático sobre golpes', 'Canais oficiais', 'Link verificação']
      },
      {
        id: 3,
        name: 'Segundo alerta de segurança',
        theme: 'Reforço da proteção contra golpes',
        objective: 'Assegurar que todos estejam cientes dos riscos',
        timing: '4 dias após a inscrição',
        keyElements: ['Versão condensada do primeiro alerta', 'Link verificação']
      },
      {
        id: 4,
        name: 'Contagem regressiva',
        theme: 'Expectativa para o evento',
        objective: 'Criar empolgação e estabelecer valor do evento',
        timing: '4 dias antes da Aula 1',
        keyElements: ['Contagem regressiva', 'Prévia do conteúdo', 'Reforço das datas', 'Menção oferta especial', 'Alerta segurança']
      }
    ]
  },

  // 🛠️ FASE 2: PREPARAÇÃO
  'fase-preparacao': {
    id: 'fase-preparacao',
    name: 'Fase de Preparação',
    description: 'Mensagens para criar expectativa imediata antes da primeira aula',
    color: '#10B981',
    icon: '🛠️',
    order: 2,
    timing: 'Véspera e dia da primeira aula',
    objective: 'Assegurar presença na primeira aula e criar urgência',
    messages: [
      {
        id: 5,
        name: 'Véspera do evento',
        theme: 'Preparação para o início do evento',
        objective: 'Assegurar presença na primeira aula e criar urgência',
        timing: '1 dia antes da Aula 1',
        keyElements: ['Confirmação presença', 'Link ativar lembrete', 'Reforço datas', 'Alerta segurança']
      },
      {
        id: 6,
        name: 'Dia da primeira aula',
        theme: 'Empolgação para o início do evento',
        objective: 'Maximizar participação na primeira aula',
        timing: 'Manhã do dia da Aula 1',
        keyElements: ['Contagem regressiva', 'Resumo conteúdo', 'Benefícios participar', 'Link ativar lembrete']
      },
      {
        id: 7,
        name: 'Último lembrete antes da primeira aula',
        theme: 'Lembrete final com incentivo adicional',
        objective: 'Capturar participantes de última hora',
        timing: '2-3 horas antes da Aula 1',
        keyElements: ['Lembrete rápido', 'Menção sorteio/bônus', 'Incentivo não sair do grupo', 'Link ativar lembrete']
      }
    ]
  },

  // 📅 FASE 3: AULA 1
  'fase-aula1': {
    id: 'fase-aula1',
    name: 'Fase da Aula 1',
    description: 'Mensagens antes, durante e depois da primeira aula',
    color: '#F59E0B',
    icon: '📅',
    order: 3,
    timing: 'Durante toda a Aula 1',
    objective: 'Maximizar participação e engajamento na primeira aula',
    messages: [
      {
        id: 8,
        name: 'Uma hora antes da primeira aula',
        theme: 'Preparação imediata',
        objective: 'Criar senso de urgência e preparação final',
        timing: '1 hora antes da Aula 1',
        keyElements: ['Contagem regressiva', 'Dicas preparação', 'Reforço benefícios', 'Link aula']
      },
      {
        id: 9,
        name: 'Primeira aula ao vivo',
        theme: 'Aula iniciando agora',
        objective: 'Notificar início imediato da transmissão',
        timing: 'Momento exato do início da Aula 1',
        keyElements: ['Anúncio transmissão ao vivo', 'Benefícios principais', 'Acessibilidade conteúdo', 'Link direto']
      },
      {
        id: 10,
        name: 'Início do conteúdo principal',
        theme: 'Conteúdo principal começando',
        objective: 'Recuperar participantes atrasados',
        timing: '10 minutos após início da Aula 1',
        keyElements: ['Linguagem urgência extrema', 'Pergunta direta sobre presença', 'Link aula']
      },
      {
        id: 11,
        name: 'Lembrete durante a primeira aula',
        theme: 'Conteúdo valioso em andamento',
        objective: 'Atrair participantes que ainda não acessaram',
        timing: '30 minutos após início da Aula 1',
        keyElements: ['Tom questionamento', 'Destaque conteúdo atual', 'Link aula']
      },
      {
        id: 12,
        name: 'Aviso sobre sorteio/incentivo',
        theme: 'Oportunidade adicional durante a aula',
        objective: 'Oferecer motivação extra para participação tardia',
        timing: '45 minutos após início da Aula 1',
        keyElements: ['Destaque prêmio/incentivo', 'Menção número participantes', 'Link aula']
      }
    ]
  },

  // 🔄 FASE 4: INTERMEDIÁRIA - PREPARAÇÃO AULA 2
  'fase-intermediaria-aula2': {
    id: 'fase-intermediaria-aula2',
    name: 'Preparação para Aula 2',
    description: 'Mensagens entre Aula 1 e Aula 2 para manter engajamento',
    color: '#3B82F6',
    icon: '🔄',
    order: 4,
    timing: 'Entre Aula 1 e Aula 2',
    objective: 'Reforçar valor e garantir presença na segunda aula',
    messages: [
      {
        id: 13,
        name: 'Resumo da primeira aula e convite para a segunda',
        theme: 'Recapitulação e antecipação',
        objective: 'Reforçar valor do conteúdo e garantir presença na próxima aula',
        timing: 'Manhã do dia da Aula 2',
        keyElements: ['Métricas participação', 'Resumo Aula 1', 'Link Aula 1 (replay)', 'Link Aula 2 (lembrete)']
      },
      {
        id: 14,
        name: 'Lembrete para segunda aula',
        theme: 'Antecipação do conteúdo prático',
        objective: 'Destacar valor prático da segunda aula',
        timing: 'Início da tarde do dia da Aula 2',
        keyElements: ['Urgência', 'Conteúdo prático', 'Ferramentas exclusivas', 'Pergunta engajamento', 'Link lembrete']
      },
      {
        id: 15,
        name: 'Uma hora antes da segunda aula',
        theme: 'Contagem regressiva com destaque para conteúdos específicos',
        objective: 'Criar urgência com base no conteúdo valioso',
        timing: '1 hora antes da Aula 2',
        keyElements: ['Contagem regressiva', 'Elementos atrativos', 'Lista tópicos', 'Link lembrete']
      }
    ]
  },

  // 📅 FASE 5: AULA 2
  'fase-aula2': {
    id: 'fase-aula2',
    name: 'Fase da Aula 2',
    description: 'Mensagens antes, durante e depois da segunda aula',
    color: '#EF4444',
    icon: '📅',
    order: 5,
    timing: 'Durante toda a Aula 2',
    objective: 'Maximizar participação na aula prática',
    messages: [
      {
        id: 16,
        name: 'Segunda aula ao vivo',
        theme: 'Aula prática iniciando agora',
        objective: 'Notificar início imediato da transmissão prática',
        timing: 'Momento exato do início da Aula 2',
        keyElements: ['Anúncio transmissão ao vivo', 'Destaque conteúdo prático', 'Link direto']
      },
      {
        id: 17,
        name: 'Lembrete durante a segunda aula',
        theme: 'Desafio para participação',
        objective: 'Provocar engajamento de retardatários',
        timing: '30 minutos após início da Aula 2',
        keyElements: ['Abordagem provocativa', 'Destaque do que estão perdendo', 'Material exclusivo', 'Link direto']
      },
      {
        id: 18,
        name: 'Último lembrete segunda aula',
        theme: 'Última chance para conteúdo essencial',
        objective: 'Capturar participantes finais',
        timing: '1 hora após início da Aula 2',
        keyElements: ['Urgência máxima', 'Ferramenta exclusiva', 'Incentivo adicional', 'Link direto']
      }
    ]
  },

  // 🔄 FASE 6: INTERMEDIÁRIA - PREPARAÇÃO AULA 3
  'fase-intermediaria-aula3': {
    id: 'fase-intermediaria-aula3',
    name: 'Preparação para Aula 3',
    description: 'Mensagens entre Aula 2 e Aula 3 com foco na oferta',
    color: '#8B5CF6',
    icon: '🔄',
    order: 6,
    timing: 'Entre Aula 2 e Aula 3',
    objective: 'Preparar para aula final e antecipar oferta',
    messages: [
      {
        id: 19,
        name: 'Convite para terceira aula',
        theme: 'Revelação de conteúdo de alto valor e antecipação da oferta',
        objective: 'Maximizar participação na aula final e preparar para oferta',
        timing: 'Manhã do dia da Aula 3',
        keyElements: ['Urgência', 'Anúncio revelações específicas', 'Link Aula 2 (replay)', 'Importância Aula 3', 'Menção oferta']
      },
      {
        id: 20,
        name: 'Importância da terceira aula',
        theme: 'Aula decisiva para alcançar o objetivo principal',
        objective: 'Enfatizar importância crucial da última aula',
        timing: 'Início da tarde do dia da Aula 3',
        keyElements: ['Máxima atenção', 'Conexão com objetivo', 'Detalhes oferta especial', 'Disponibilidade limitada']
      },
      {
        id: 21,
        name: 'Uma hora antes da terceira aula',
        theme: 'Preparação especial para conteúdo transformador',
        objective: 'Criar senso de preparação especial e importância crucial',
        timing: '1 hora antes da Aula 3',
        keyElements: ['Contagem regressiva', 'Perguntas preparação', 'Atenção total', 'Conexão transformação vida']
      }
    ]
  },

  // 📅 FASE 7: AULA 3
  'fase-aula3': {
    id: 'fase-aula3',
    name: 'Fase da Aula 3',
    description: 'Mensagens da aula final com apresentação da oferta',
    color: '#10B981',
    icon: '📅',
    order: 7,
    timing: 'Durante toda a Aula 3',
    objective: 'Maximizar participação na aula decisiva com oferta',
    messages: [
      {
        id: 22,
        name: 'Terceira aula ao vivo',
        theme: 'Aula mais importante iniciando agora',
        objective: 'Notificar início da aula decisiva com oferta especial',
        timing: 'Momento exato do início da Aula 3',
        keyElements: ['Urgência máxima', 'Conteúdo exclusivo', 'Menção oferta especial', 'Link direto']
      },
      {
        id: 23,
        name: 'Lembrete durante a terceira aula',
        theme: 'Reflexão sobre oportunidade',
        objective: 'Usar abordagem filosófica para engajar retardatários',
        timing: '30 minutos após início da Aula 3',
        keyElements: ['Tom reflexivo', 'Limite da ajuda oferecida', 'Transferência responsabilidade', 'Link direto']
      },
      {
        id: 24,
        name: 'Segundo lembrete durante a terceira aula',
        theme: 'Última chamada urgente',
        objective: 'Capturar participantes finais com urgência extrema',
        timing: '45 minutos após início da Aula 3',
        keyElements: ['Mensagem curta e direta', 'Questionamento presença', 'Oportunidade limitada', 'Link direto']
      },
      {
        id: 25,
        name: 'Anúncio da condição especial',
        theme: 'Alerta para revelação da oferta',
        objective: 'Criar expectativa para apresentação da oferta',
        timing: '1h15min após início da Aula 3',
        keyElements: ['Linguagem de alerta', 'Iminência revelação oferta', 'Link direto']
      }
    ]
  },

  // 🛒 FASE 8: OFERTA - LISTA VIP
  'fase-oferta-vip': {
    id: 'fase-oferta-vip',
    name: 'Oferta - Lista VIP',
    description: 'Mensagens para acesso antecipado à oferta (Lista VIP)',
    color: '#F59E0B',
    icon: '🛒',
    order: 8,
    timing: 'Após Aula 3 até abertura geral',
    objective: 'Maximizar conversões da Lista VIP com acesso antecipado',
    messages: [
      {
        id: 26,
        name: 'Anúncio das inscrições',
        theme: 'Informações completas sobre a oferta',
        objective: 'Comunicar todos os detalhes da oferta especial',
        timing: 'Após término da Aula 3',
        keyElements: ['Urgência', 'Resumo Aula 3', 'Detalhes oferta', 'Acesso VIP antecipado', 'Link página vendas']
      },
      {
        id: 27,
        name: 'Lembrete sobre a terceira aula',
        theme: 'Recap da aula final para quem perdeu',
        objective: 'Recuperar pessoas que não assistiram à aula final',
        timing: 'Manhã do dia seguinte à Aula 3',
        keyElements: ['Resumo aula final', 'Menção oferta especial', 'Link replay', 'Destaque acesso VIP']
      },
      {
        id: 28,
        name: 'Bônus exclusivos',
        theme: 'Detalhamento dos bônus da oferta',
        objective: 'Aumentar valor percebido da oferta',
        timing: 'Meio da manhã do dia seguinte à Aula 3',
        keyElements: ['Lista detalhada bônus', 'Benefícios ação rápida', 'Acesso VIP', 'Link página vendas']
      }
    ]
  },

  // 🛒 FASE 9: VENDAS - DIA 1
  'fase-vendas-dia1': {
    id: 'fase-vendas-dia1',
    name: 'Vendas - Dia 1',
    description: 'Primeiro dia de vendas com abertura oficial para o público geral',
    color: '#EF4444',
    icon: '🛒',
    order: 9,
    timing: 'Primeiro dia completo de vendas',
    objective: 'Maximizar conversões no primeiro dia com máxima energia',
    messages: [
      {
        id: 29,
        name: 'Inscrições abertas',
        theme: 'Abertura oficial das inscrições',
        objective: 'Comunicar disponibilidade imediata da oferta',
        timing: 'Momento exato da abertura',
        keyElements: ['Anúncio entusiasmado', 'Prazo limitado', 'Valor desconto', 'Link direto checkout']
      },
      {
        id: 30,
        name: 'Lista de bônus',
        theme: 'Detalhamento completo de todos os bônus',
        objective: 'Aumentar valor percebido da oferta',
        timing: 'Ao longo do primeiro dia',
        keyElements: ['Linguagem entusiasmada', 'Lista completa bônus', 'Link inscrição']
      }
    ]
  },

  // 🛒 FASE 10: VENDAS - DIA 2
  'fase-vendas-dia2': {
    id: 'fase-vendas-dia2',
    name: 'Vendas - Dia 2',
    description: 'Segundo dia com intensificação da urgência',
    color: '#8B5CF6',
    icon: '🛒',
    order: 10,
    timing: 'Segundo dia completo de vendas',
    objective: 'Intensificar urgência com contagem regressiva',
    messages: [
      {
        id: 31,
        name: 'Contagem regressiva',
        theme: 'Urgência temporal intensificada',
        objective: 'Criar pressão de tempo limitado',
        timing: 'Ao longo do segundo dia',
        keyElements: ['Contagem regressiva', 'Urgência', 'Benefícios em risco', 'Link direto']
      }
    ]
  },

  // 🛒 FASE 11: VENDAS - EXTENSÃO
  'fase-vendas-extensao': {
    id: 'fase-vendas-extensao',
    name: 'Vendas - Extensão',
    description: 'Extensão do prazo com justificativas',
    color: '#10B981',
    icon: '🛒',
    order: 11,
    timing: 'Dias 3-7 da campanha de vendas',
    objective: 'Reabrir oferta e capturar indecisos',
    messages: [
      {
        id: 32,
        name: 'Extensão especial',
        theme: 'Reabertura por problemas técnicos',
        objective: 'Justificar extensão e reabrir vendas',
        timing: 'Após primeiro prazo',
        keyElements: ['Justificativa técnica', 'Segunda chance limitada', 'Urgência renovada', 'Link direto']
      }
    ]
  },

  // 🛒 FASE 12: VENDAS - ÚLTIMO PRAZO
  'fase-vendas-final': {
    id: 'fase-vendas-final',
    name: 'Vendas - Último Prazo',
    description: 'Prazo final definitivo com máxima urgência',
    color: '#F59E0B',
    icon: '🛒',
    order: 12,
    timing: 'Últimos 2 dias da campanha',
    objective: 'Encerrar campanha com máxima urgência',
    messages: [
      {
        id: 33,
        name: 'Último prazo',
        theme: 'Prazo final definitivo',
        objective: 'Última oportunidade credível',
        timing: 'Últimos dias',
        keyElements: ['Finalidade definitiva', 'Últimas horas', 'Consequências de perder', 'Link final']
      }
    ]
  }
};

// 📊 RESUMO DAS FASES
const phasesSummary = {
  totalPhases: 12,
  totalMessages: '70+',
  campaignDuration: '9 dias (após evento)',
  eventDuration: '3 aulas + preparação',
  
  phases: [
    { name: 'Antecipação', messages: 4, focus: 'Expectativa' },
    { name: 'Preparação', messages: 3, focus: 'Urgência para Aula 1' },
    { name: 'Aula 1', messages: 5, focus: 'Máxima participação' },
    { name: 'Prep. Aula 2', messages: 3, focus: 'Manter engajamento' },
    { name: 'Aula 2', messages: 3, focus: 'Conteúdo prático' },
    { name: 'Prep. Aula 3', messages: 3, focus: 'Preparar oferta' },
    { name: 'Aula 3', messages: 4, focus: 'Apresentar oferta' },
    { name: 'Lista VIP', messages: 3, focus: 'Acesso antecipado' },
    { name: 'Vendas Dia 1', messages: 2, focus: 'Máxima energia' },
    { name: 'Vendas Dia 2', messages: 1, focus: 'Contagem regressiva' },
    { name: 'Extensão', messages: 1, focus: 'Recuperar indecisos' },
    { name: 'Último Prazo', messages: 1, focus: 'Urgência final' }
  ]
};

// Helper functions
function getAllPhases() {
  return Object.values(messagesPhases);
}

function getPhaseOrder() {
  return Object.values(messagesPhases)
    .sort((a, b) => a.order - b.order)
    .map(phase => phase.id);
}

function getPreviousPhases(currentPhaseId) {
  const phases = Object.values(messagesPhases).sort((a, b) => a.order - b.order);
  const currentPhaseIndex = phases.findIndex(phase => phase.id === currentPhaseId);
  
  if (currentPhaseIndex === -1) {
    return [];
  }
  
  return phases.slice(0, currentPhaseIndex).map(phase => phase.id);
}

module.exports = {
  messagesPhases,
  phasesSummary,
  getAllPhases,
  getPhaseOrder,
  getPreviousPhases
};