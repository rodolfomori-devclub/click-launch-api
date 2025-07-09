/**
 * Launch Phases Configuration
 * Defines the 5 main phases of the email launch sequence
 * Each phase contains specific emails and contextual information
 */

const LAUNCH_PHASES = {
  'pre-launch': {
    name: 'Pré-lançamento',
    description: 'Confirmação e Véspera',
    emails: [1, 2],
    context: 'Estabelecer primeiro contato e criar expectativa inicial'
  },
  'event': {
    name: 'Fase do Evento',
    description: 'Aulas 1, 2 e 3',
    emails: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    context: 'Conduzir o evento educacional e construir autoridade'
  },
  'pre-sales': {
    name: 'Pré-vendas',
    description: 'Lista VIP e Preparação',
    emails: [12, 13, 14],
    context: 'Preparar para abertura de vendas e criar lista VIP'
  },
  'sales': {
    name: 'Vendas',
    description: 'Abertura até Fechamento',
    emails: [15, 16, 17, 18, 19, 20, 21, 22],
    context: 'Período ativo de vendas com urgência crescente'
  },
  'post-sales': {
    name: 'Pós-vendas',
    description: 'Reabertura e Facilidades',
    emails: [23, 24, 25, 26, 27, 28, 29],
    context: 'Capturar vendas perdidas com reaberturas e facilidades'
  }
};

/**
 * Email sequence mapping with detailed information
 */
const EMAIL_SEQUENCE = {
  1: {
    phase: 'pre-launch',
    name: 'Email de Confirmação de Inscrição',
    timing: 'Imediatamente após inscrição',
    objective: 'Confirmar participação e direcionar para grupo/comunidade'
  },
  2: {
    phase: 'pre-launch',
    name: 'Email de Véspera do Evento',
    timing: '1 dia antes do primeiro dia',
    objective: 'Criar expectativa e reforçar o compromisso'
  },
  3: {
    phase: 'event',
    name: 'Email do Dia do Evento (Manhã)',
    timing: 'Manhã do primeiro dia',
    objective: 'Reforçar a importância e aumentar a expectativa'
  },
  4: {
    phase: 'event',
    name: 'Email 1 Hora Antes (Dia 1)',
    timing: '1 hora antes do início',
    objective: 'Criar urgência para a participação'
  },
  5: {
    phase: 'event',
    name: 'Email de Início do Evento (Dia 1)',
    timing: 'No momento de início',
    objective: 'Notificar que o evento começou'
  },
  6: {
    phase: 'event',
    name: 'Email de Recap (Manhã do Dia 2)',
    timing: 'Manhã do segundo dia',
    objective: 'Recapitular o dia anterior e convidar para o próximo'
  },
  7: {
    phase: 'event',
    name: 'Email 1 Hora Antes (Dia 2)',
    timing: '1 hora antes do início do segundo dia',
    objective: 'Criar urgência para a participação'
  },
  8: {
    phase: 'event',
    name: 'Email de Início (Dia 2)',
    timing: 'No momento de início do segundo dia',
    objective: 'Notificar que o evento começou'
  },
  9: {
    phase: 'event',
    name: 'Email de Divulgação (Manhã do Dia 3)',
    timing: 'Manhã do terceiro dia',
    objective: 'Criar expectativa para o último dia e a oferta'
  },
  10: {
    phase: 'event',
    name: 'Email 1 Hora Antes (Dia 3)',
    timing: '1 hora antes do início do terceiro dia',
    objective: 'Criar urgência para a participação'
  },
  11: {
    phase: 'event',
    name: 'Email de Início (Dia 3)',
    timing: 'No momento de início do terceiro dia',
    objective: 'Notificar que o evento começou'
  },
  12: {
    phase: 'pre-sales',
    name: 'Email de Anúncio da Oferta',
    timing: 'Após encerramento do último dia',
    objective: 'Informar sobre a abertura das vendas e criar lista VIP'
  },
  13: {
    phase: 'pre-sales',
    name: 'Email de Lembrança',
    timing: 'Manhã do dia de lançamento das vendas',
    objective: 'Enfatizar o conteúdo e a oferta que vai abrir'
  },
  14: {
    phase: 'pre-sales',
    name: 'Email de Pré-Venda',
    timing: 'Algumas horas antes da abertura das vendas',
    objective: 'Despertar interesse e detalhar bônus'
  },
  15: {
    phase: 'sales',
    name: 'Email de Abertura de Vendas',
    timing: 'Momento de abertura das vendas',
    objective: 'Anunciar a abertura oficial das vendas'
  },
  16: {
    phase: 'sales',
    name: 'Email de Primeiro Feedback de Vendas',
    timing: 'Algumas horas após a abertura das vendas',
    objective: 'Comunicar sucesso inicial e manter o senso de urgência'
  },
  17: {
    phase: 'sales',
    name: 'Email de Urgência',
    timing: 'Manhã do último dia de vendas',
    objective: 'Criar senso de urgência com o prazo final'
  },
  18: {
    phase: 'sales',
    name: 'Email de Destaque de Bônus/Recurso',
    timing: 'Meio-dia do último dia de vendas',
    objective: 'Destacar um benefício/bônus especial'
  },
  19: {
    phase: 'sales',
    name: 'Email de Últimas Horas',
    timing: '8 horas antes do fechamento',
    objective: 'Maximizar a urgência com o prazo final e listar todos os bônus'
  },
  20: {
    phase: 'sales',
    name: 'Email de Contagem Regressiva Final',
    timing: '5 horas antes do fechamento',
    objective: 'Criar extrema urgência com o prazo final'
  },
  21: {
    phase: 'sales',
    name: 'Email de Ultimato Final',
    timing: '2 horas antes do fechamento',
    objective: 'Comunicar último aviso antes do fechamento'
  },
  22: {
    phase: 'sales',
    name: 'Email de Encerramento',
    timing: 'No momento do fechamento',
    objective: 'Confirmar encerramento das vendas'
  },
  23: {
    phase: 'post-sales',
    name: 'Email de Reabertura Limitada',
    timing: 'Dia seguinte ao fechamento',
    objective: 'Oferecer uma "segunda chance" para quem não conseguiu entrar'
  },
  24: {
    phase: 'post-sales',
    name: 'Email de Liberação de Conteúdo',
    timing: '2 dias após o fechamento',
    objective: 'Liberar temporariamente o conteúdo do evento para gerar mais vendas'
  },
  25: {
    phase: 'post-sales',
    name: 'Email de Objeções/Para Quem É',
    timing: '3 dias após o fechamento',
    objective: 'Esclarecer para quem o produto é ideal'
  },
  26: {
    phase: 'post-sales',
    name: 'Email de Nova Forma de Pagamento',
    timing: '4 dias após o fechamento',
    objective: 'Oferecer uma nova facilidade de pagamento'
  },
  27: {
    phase: 'post-sales',
    name: 'Email de Custo de Oportunidade',
    timing: '5 dias após o fechamento',
    objective: 'Destacar o que o lead pode perder se não agir'
  },
  28: {
    phase: 'post-sales',
    name: 'Email Final de Decisão',
    timing: '6 dias após o fechamento',
    objective: 'Enfatizar a importância da decisão e o encerramento real'
  },
  29: {
    phase: 'post-sales',
    name: 'Email de Encerramento Final',
    timing: '7 dias após o fechamento',
    objective: 'Última chance com ênfase na forma de pagamento alternativa'
  }
};

/**
 * Get emails for a specific phase
 */
function getEmailsByPhase(phase) {
  const phaseConfig = LAUNCH_PHASES[phase];
  if (!phaseConfig) {
    throw new Error(`Phase "${phase}" not found`);
  }
  
  return phaseConfig.emails.map(emailNumber => ({
    number: emailNumber,
    ...EMAIL_SEQUENCE[emailNumber]
  }));
}

/**
 * Get phase information for a specific email
 */
function getPhaseForEmail(emailNumber) {
  const emailInfo = EMAIL_SEQUENCE[emailNumber];
  if (!emailInfo) {
    throw new Error(`Email ${emailNumber} not found`);
  }
  
  return {
    phase: emailInfo.phase,
    phaseInfo: LAUNCH_PHASES[emailInfo.phase],
    emailInfo
  };
}

/**
 * Get all phases in order
 */
function getAllPhases() {
  return Object.entries(LAUNCH_PHASES).map(([key, phase]) => ({
    key,
    ...phase
  }));
}

/**
 * Get phase order for generating context
 */
function getPhaseOrder() {
  return ['pre-launch', 'event', 'pre-sales', 'sales', 'post-sales'];
}

/**
 * Get previous phases for context building
 */
function getPreviousPhases(currentPhase) {
  const order = getPhaseOrder();
  const currentIndex = order.indexOf(currentPhase);
  
  if (currentIndex === -1) {
    throw new Error(`Phase "${currentPhase}" not found in order`);
  }
  
  return order.slice(0, currentIndex);
}

module.exports = {
  LAUNCH_PHASES,
  EMAIL_SEQUENCE,
  getEmailsByPhase,
  getPhaseForEmail,
  getAllPhases,
  getPhaseOrder,
  getPreviousPhases
};