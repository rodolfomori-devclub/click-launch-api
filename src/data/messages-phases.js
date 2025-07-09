/**
 * Messages Launch Phases Configuration  
 * Based on the complete 70 messages framework provided
 * Organized in 7 batches as requested
 */

const MESSAGES_PHASES = {
  'lote1': {
    name: 'Lote 1: Antecipação e Preparação',
    description: 'Mensagens de boas-vindas até véspera do evento (7 mensagens)',
    messages: [1, 2, 3, 4, 5, 6, 7],
    context: 'Estabelecer primeiro contato, prevenir fraudes, criar expectativa e preparar para primeira aula'
  },
  'lote2': {
    name: 'Lote 2: Aula 1 e Preparação Aula 2',
    description: 'Mensagens da primeira aula até preparação da segunda (8 mensagens)', 
    messages: [8, 9, 10, 11, 12, 13, 14, 15],
    context: 'Conduzir primeira aula e preparar para segunda aula'
  },
  'lote3': {
    name: 'Lote 3: Aula 2 e Preparação Aula 3',
    description: 'Mensagens da segunda aula até preparação da terceira (6 mensagens)',
    messages: [16, 17, 18, 19, 20, 21],
    context: 'Conduzir segunda aula e preparar para aula final decisiva'
  },
  'lote4': {
    name: 'Lote 4: Aula 3 e Lista VIP',
    description: 'Mensagens da terceira aula até preparação Lista VIP (10 mensagens)',
    messages: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    context: 'Aula final decisiva, anúncio da oferta e preparação para Lista VIP'
  },
  'lote5': {
    name: 'Lote 5: Vendas Dia 1',
    description: 'Abertura das vendas e primeiro dia de vendas (5 mensagens)',
    messages: [32, 33, 34, 35, 36],
    context: 'Abertura oficial das vendas e primeiros impulsos de compra'
  },
  'lote6': {
    name: 'Lote 6: Vendas Dia 2 - Contagem Regressiva',
    description: 'Contagem regressiva intensiva do segundo dia (12 mensagens)',
    messages: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    context: 'Contagem regressiva final com urgência máxima'
  },
  'lote7': {
    name: 'Lote 7: Extensão e Último Prazo',
    description: 'Reabertura, extensão e prazo final definitivo (22 mensagens)',
    messages: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    context: 'Segunda chance, facilidades e urgência final definitiva'
  }
};

/**
 * Messages sequence mapping with detailed information from the framework
 */
const MESSAGES_SEQUENCE = {
  // LOTE 1: ANTECIPAÇÃO E PREPARAÇÃO (7 mensagens)
  1: {
    phase: 'lote1',
    name: 'Boas-vindas',
    tema: 'Boas-vindas e agradecimento pela inscrição',
    objetivo: 'Dar as boas-vindas ao inscrito, reforçar as datas do evento e criar a primeira conexão emocional',
    timing: 'Imediatamente após a inscrição no evento',
    elementos: ['Agradecimento', 'promessa principal do evento', 'datas e horários', 'link para pesquisa', 'alerta de segurança']
  },
  2: {
    phase: 'lote1',
    name: 'Alerta de segurança',
    tema: 'Proteção contra golpes',
    objetivo: 'Prevenir fraudes e estabelecer canais oficiais de comunicação',
    timing: '2 dias após a inscrição no evento',
    elementos: ['Alerta enfático sobre golpes', 'canais oficiais de comunicação', 'link para verificação']
  },
  3: {
    phase: 'lote1',
    name: 'Segundo alerta de segurança',
    tema: 'Reforço da proteção contra golpes',
    objetivo: 'Assegurar que todos estejam cientes dos riscos de fraude',
    timing: '4 dias após a inscrição no evento',
    elementos: ['Versão condensada do primeiro alerta', 'link para verificação']
  },
  4: {
    phase: 'lote1',
    name: 'Contagem regressiva',
    tema: 'Expectativa para o evento',
    objetivo: 'Criar empolgação e estabelecer o valor do evento',
    timing: '4 dias antes da Aula 1',
    elementos: ['Contagem regressiva', 'prévia do conteúdo', 'reforço das datas', 'menção à oferta especial', 'alerta de segurança']
  },
  5: {
    phase: 'lote1',
    name: 'Véspera do evento',
    tema: 'Preparação para o início do evento',
    objetivo: 'Assegurar presença na primeira aula e criar urgência',
    timing: '1 dia antes da Aula 1',
    elementos: ['Confirmação de presença', 'link para ativar lembrete', 'reforço das datas', 'alerta de segurança']
  },
  6: {
    phase: 'lote1',
    name: 'Dia da primeira aula',
    tema: 'Empolgação para o início do evento',
    objetivo: 'Maximizar participação na primeira aula',
    timing: 'Manhã do dia da Aula 1',
    elementos: ['Contagem regressiva para o início', 'resumo do conteúdo da aula', 'benefícios de participar', 'link para ativar lembrete']
  },
  7: {
    phase: 'lote1',
    name: 'Último lembrete antes da primeira aula',
    tema: 'Lembrete final com incentivo adicional',
    objetivo: 'Capturar participantes de última hora',
    timing: '2-3 horas antes da Aula 1',
    elementos: ['Lembrete rápido', 'menção a sorteio/bônus', 'incentivo a não sair do grupo', 'link para ativar lembrete']
  },

  // LOTE 2: AULA 1 E PREPARAÇÃO AULA 2 (8 mensagens)
  8: {
    phase: 'lote2',
    name: 'Uma hora antes da primeira aula',
    tema: 'Preparação imediata',
    objetivo: 'Criar senso de urgência e preparação final',
    timing: '1 hora antes da Aula 1',
    elementos: ['Contagem regressiva', 'dicas de preparação (papel, caneta, lugar tranquilo)', 'reforço dos benefícios', 'link para aula']
  },
  9: {
    phase: 'lote2',
    name: 'Primeira aula ao vivo',
    tema: 'Aula iniciando agora',
    objetivo: 'Notificar o início imediato da transmissão',
    timing: 'No momento exato do início da Aula 1',
    elementos: ['Anúncio da transmissão ao vivo', 'benefícios principais', 'menção à acessibilidade do conteúdo', 'link direto']
  },
  10: {
    phase: 'lote2',
    name: 'Início do conteúdo principal',
    tema: 'Conteúdo principal começando',
    objetivo: 'Recuperar participantes atrasados',
    timing: '10 minutos após o início da Aula 1',
    elementos: ['Linguagem de urgência extrema', 'pergunta direta sobre a presença', 'link para a aula']
  },
  11: {
    phase: 'lote2',
    name: 'Lembrete durante a primeira aula',
    tema: 'Conteúdo valioso em andamento',
    objetivo: 'Atrair participantes que ainda não acessaram',
    timing: '30 minutos após o início da Aula 1',
    elementos: ['Tom de questionamento', 'destaque do conteúdo atual', 'link para aula']
  },
  12: {
    phase: 'lote2',
    name: 'Aviso sobre sorteio/incentivo',
    tema: 'Oportunidade adicional durante a aula',
    objetivo: 'Oferecer motivação extra para participação tardia',
    timing: '45 minutos após o início da Aula 1',
    elementos: ['Destaque do prêmio/incentivo', 'menção ao número de participantes', 'link para aula']
  },
  13: {
    phase: 'lote2',
    name: 'Resumo da primeira aula e convite para a segunda',
    tema: 'Recapitulação e antecipação',
    objetivo: 'Reforçar valor do conteúdo e garantir presença na próxima aula',
    timing: 'Manhã do dia da Aula 2',
    elementos: ['Métricas de participação', 'resumo do conteúdo principal da Aula 1', 'link para Aula 1 (replay)', 'link para Aula 2 (ativar lembrete)']
  },
  14: {
    phase: 'lote2',
    name: 'Lembrete para segunda aula',
    tema: 'Antecipação do conteúdo prático',
    objetivo: 'Destacar o valor prático da segunda aula',
    timing: 'Início da tarde do dia da Aula 2',
    elementos: ['Urgência', 'conteúdo prático', 'ferramentas exclusivas', 'pergunta de engajamento', 'link para ativar lembrete']
  },
  15: {
    phase: 'lote2',
    name: 'Uma hora antes da segunda aula',
    tema: 'Contagem regressiva com destaque para conteúdos específicos',
    objetivo: 'Criar urgência com base no conteúdo valioso',
    timing: '1 hora antes da Aula 2',
    elementos: ['Contagem regressiva', 'destaque para elementos atrativos', 'lista clara dos tópicos', 'link para ativar lembrete']
  },

  // LOTE 3: AULA 2 E PREPARAÇÃO AULA 3 (6 mensagens)
  16: {
    phase: 'lote3',
    name: 'Segunda aula ao vivo',
    tema: 'Aula prática iniciando agora',
    objetivo: 'Notificar o início imediato da transmissão prática',
    timing: 'No momento exato do início da Aula 2',
    elementos: ['Anúncio da transmissão ao vivo', 'destaque para o conteúdo prático', 'link direto']
  },
  17: {
    phase: 'lote3',
    name: 'Lembrete durante a segunda aula',
    tema: 'Desafio para participação',
    objetivo: 'Provocar engajamento de retardatários',
    timing: '30 minutos após o início da Aula 2',
    elementos: ['Abordagem provocativa', 'destaque para o que estão perdendo', 'menção ao material exclusivo', 'link direto']
  },
  18: {
    phase: 'lote3',
    name: 'Último lembrete segunda aula',
    tema: 'Última chance para conteúdo essencial',
    objetivo: 'Capturar participantes finais',
    timing: '1 hora após o início da Aula 2',
    elementos: ['Urgência máxima', 'destaque para ferramenta exclusiva', 'menção a incentivo adicional', 'link direto']
  },
  19: {
    phase: 'lote3',
    name: 'Convite para terceira aula',
    tema: 'Revelação de conteúdo de alto valor e antecipação da oferta',
    objetivo: 'Maximizar participação na aula final e preparar para a oferta',
    timing: 'Manhã do dia da Aula 3',
    elementos: ['Urgência', 'anúncio de revelações específicas', 'link para Aula 2 (replay)', 'importância da Aula 3', 'menção à oferta']
  },
  20: {
    phase: 'lote3',
    name: 'Importância da terceira aula',
    tema: 'Aula decisiva para alcançar o objetivo principal',
    objetivo: 'Enfatizar a importância crucial da última aula',
    timing: 'Início da tarde do dia da Aula 3',
    elementos: ['Chamado de máxima atenção', 'conexão direta com o objetivo desejado', 'detalhes da oferta especial', 'aviso sobre disponibilidade limitada']
  },
  21: {
    phase: 'lote3',
    name: 'Uma hora antes da terceira aula',
    tema: 'Preparação especial para conteúdo transformador',
    objetivo: 'Criar senso de preparação especial e importância crucial',
    timing: '1 hora antes da Aula 3',
    elementos: ['Contagem regressiva', 'perguntas sobre preparação', 'solicitação de atenção total', 'conexão com transformação de vida']
  },

  // LOTE 4: AULA 3 E LISTA VIP (10 mensagens)
  22: {
    phase: 'lote4',
    name: 'Terceira aula ao vivo',
    tema: 'Aula mais importante iniciando agora',
    objetivo: 'Notificar o início da aula decisiva com oferta especial',
    timing: 'No momento exato do início da Aula 3',
    elementos: ['Urgência máxima', 'destaque para conteúdo exclusivo', 'menção à oferta especial', 'link direto']
  },
  23: {
    phase: 'lote4',
    name: 'Lembrete durante a terceira aula',
    tema: 'Reflexão sobre oportunidade',
    objetivo: 'Usar abordagem filosófica para engajar retardatários',
    timing: '30 minutos após o início da Aula 3',
    elementos: ['Tom reflexivo', 'limite da ajuda oferecida', 'transferência de responsabilidade', 'link direto']
  },
  24: {
    phase: 'lote4',
    name: 'Segundo lembrete durante a terceira aula',
    tema: 'Última chamada urgente',
    objetivo: 'Capturar participantes finais com urgência extrema',
    timing: '45 minutos após o início da Aula 3',
    elementos: ['Mensagem curta e direta', 'questionamento sobre presença', 'ênfase na oportunidade limitada', 'link direto']
  },
  25: {
    phase: 'lote4',
    name: 'Anúncio da condição especial',
    tema: 'Alerta para revelação da oferta',
    objetivo: 'Criar expectativa para a apresentação da oferta',
    timing: '1 hora e 15 minutos após o início da Aula 3',
    elementos: ['Linguagem de alerta', 'menção à iminência da revelação da oferta', 'link direto']
  },
  26: {
    phase: 'lote4',
    name: 'Anúncio das inscrições',
    tema: 'Informações completas sobre a oferta',
    objetivo: 'Comunicar todos os detalhes da oferta especial',
    timing: 'Após o término da Aula 3',
    elementos: ['Urgência', 'resumo da terceira aula', 'detalhes da oferta', 'acesso VIP antecipado', 'link para página de vendas']
  },
  27: {
    phase: 'lote4',
    name: 'Lembrete sobre a terceira aula',
    tema: 'Recap da aula final para quem perdeu',
    objetivo: 'Recuperar pessoas que não assistiram à aula final',
    timing: 'Manhã do dia seguinte à Aula 3',
    elementos: ['Resumo da aula final', 'menção à oferta especial', 'link para replay', 'destaque para acesso VIP']
  },
  28: {
    phase: 'lote4',
    name: 'Bônus exclusivos',
    tema: 'Detalhamento dos bônus da oferta',
    objetivo: 'Aumentar o valor percebido da oferta',
    timing: 'Meio da manhã do dia seguinte à Aula 3',
    elementos: ['Lista detalhada de bônus', 'benefícios para ação rápida', 'acesso VIP', 'link para página de vendas']
  },
  29: {
    phase: 'lote4',
    name: 'Aviso sobre acesso VIP',
    tema: 'Lembrete final para Lista VIP',
    objetivo: 'Criar urgência para inscrição antecipada',
    timing: '3-4 horas antes da abertura para Lista VIP',
    elementos: ['Urgência', 'vantagem do acesso antecipado', 'recapitulação dos bônus', 'link para página VIP']
  },
  30: {
    phase: 'lote4',
    name: 'Menos de 2 horas',
    tema: 'Contagem regressiva para Lista VIP',
    objetivo: 'Maximizar inscrições antecipadas',
    timing: '2 horas antes da abertura para Lista VIP',
    elementos: ['Contagem regressiva', 'benefícios da Lista VIP', 'bônus para primeiros inscritos', 'link para página VIP']
  },
  31: {
    phase: 'lote4',
    name: 'Menos de 30 minutos',
    tema: 'Urgência final para Lista VIP',
    objetivo: 'Capturar inscrições de última hora para acesso antecipado',
    timing: '30 minutos antes da abertura para Lista VIP',
    elementos: ['Contagem regressiva em minutos', 'recapitulação rápida dos bônus', 'link para página VIP']
  },

  // LOTE 5: VENDAS DIA 1 (5 mensagens)
  32: {
    phase: 'lote5',
    name: 'Inscrições abertas',
    tema: 'Abertura oficial das inscrições para Lista VIP',
    objetivo: 'Comunicar a disponibilidade imediata da oferta para Lista VIP',
    timing: 'No momento exato da abertura para Lista VIP',
    elementos: ['Anúncio entusiasmado', 'prazo limitado', 'valor do desconto', 'link direto para checkout']
  },
  33: {
    phase: 'lote5',
    name: 'Lista de bônus',
    tema: 'Detalhamento completo de todos os bônus',
    objetivo: 'Aumentar o valor percebido da oferta para o público geral',
    timing: 'No momento da abertura para o público geral',
    elementos: ['Linguagem entusiasmada', 'lista completa e detalhada de bônus', 'link para inscrição']
  },
  34: {
    phase: 'lote5',
    name: 'Tempo acabando',
    tema: 'Alerta de prazo limitado',
    objetivo: 'Criar urgência com base no tempo limitado da oferta',
    timing: 'Manhã do dia seguinte à abertura das inscrições',
    elementos: ['Alerta visual', 'conexão entre tempo e oportunidade', 'prazo final', 'condições de pagamento', 'link direto']
  },
  35: {
    phase: 'lote5',
    name: 'Sua história pode ser a próxima',
    tema: 'Motivação através de identificação',
    objetivo: 'Criar conexão emocional com resultados possíveis',
    timing: 'Tarde do dia seguinte à abertura das inscrições',
    elementos: ['Abordagem motivacional', 'projeção futura', 'alerta sobre perda de oportunidade', 'link direto']
  },
  36: {
    phase: 'lote5',
    name: 'O seu futuro começa agora',
    tema: 'Transformação de vida através da decisão',
    objetivo: 'Apelar para o desejo de mudança e medo do arrependimento',
    timing: 'Início da noite do dia seguinte à abertura das inscrições',
    elementos: ['Abordagem emocional', 'credibilidade', 'urgência baseada em escassez', 'apelo ao medo do arrependimento', 'link direto']
  },

  // LOTE 6: VENDAS DIA 2 - CONTAGEM REGRESSIVA (12 mensagens)
  37: {
    phase: 'lote6',
    name: '15 horas para encerrar as inscrições',
    tema: 'Recapitulação de bônus com prazo final',
    objetivo: 'Relembrar o valor total da oferta com urgência de tempo',
    timing: 'Manhã do segundo dia de vendas',
    elementos: ['Lembrete de bônus disponíveis', 'lista completa', 'prazo final específico', 'link direto']
  },
  38: {
    phase: 'lote6',
    name: '14 horas para encerrar as inscrições',
    tema: 'Contagem regressiva com destaque para o desconto',
    objetivo: 'Enfatizar a perda financeira em não agir',
    timing: '14 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'perda financeira específica', 'condições de pagamento', 'link direto']
  },
  39: {
    phase: 'lote6',
    name: '12 horas para encerrar as inscrições',
    tema: 'Caso de sucesso inspirador',
    objetivo: 'Criar prova social e mostrar resultados possíveis',
    timing: '12 horas antes do fim do primeiro prazo',
    elementos: ['História de sucesso específica', 'resultados impressionantes', 'métodos acessíveis', 'prazo final', 'link direto']
  },
  40: {
    phase: 'lote6',
    name: '10 horas para encerrar as inscrições',
    tema: 'Foco no resultado financeiro',
    objetivo: 'Enfatizar o retorno sobre investimento',
    timing: '10 horas antes do fim do primeiro prazo',
    elementos: ['Destaque para ganhos financeiros', 'acessibilidade para iniciantes', 'prazo final', 'condições de pagamento', 'link direto']
  },
  41: {
    phase: 'lote6',
    name: '8 horas para encerrar as inscrições',
    tema: 'Transformação de situação financeira difícil',
    objetivo: 'Conectar com pessoas em situação financeira desafiadora',
    timing: '8 horas antes do fim do primeiro prazo',
    elementos: ['História de superação', 'urgência temporal', 'condições de pagamento', 'link direto']
  },
  42: {
    phase: 'lote6',
    name: '6 horas para encerrar as inscrições',
    tema: 'Contagem regressiva com prova social',
    objetivo: 'Criar efeito manada e urgência',
    timing: '6 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'menção ao número de inscritos', 'consequências claras do prazo', 'link direto']
  },
  43: {
    phase: 'lote6',
    name: '5 horas para encerrar as inscrições',
    tema: 'Urgência simples e direta',
    objetivo: 'Comunicar apenas o essencial com máxima urgência',
    timing: '5 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'valor da oferta', 'link direto']
  },
  44: {
    phase: 'lote6',
    name: '4 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '4 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto']
  },
  45: {
    phase: 'lote6',
    name: '3 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '3 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto']
  },
  46: {
    phase: 'lote6',
    name: '2 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '2 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto']
  },
  47: {
    phase: 'lote6',
    name: '1 hora para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '1 hora antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto']
  },
  48: {
    phase: 'lote6',
    name: '30 minutos para encerrar as inscrições',
    tema: 'Ultimato final',
    objetivo: 'Capturar decisões de último minuto',
    timing: '30 minutos antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva em minutos', 'mensagem ultra concisa', 'link direto']
  },

  // LOTE 7: EXTENSÃO E ÚLTIMO PRAZO (22 mensagens)
  49: {
    phase: 'lote7',
    name: 'Bônus ainda válidos',
    tema: 'Extensão especial do prazo',
    objetivo: 'Reabrir a oferta para quem enfrentou problemas',
    timing: 'Manhã após o primeiro prazo',
    elementos: ['Justificativa para extensão', 'urgência de tempo indefinido', 'segunda chance limitada', 'link direto']
  },
  50: {
    phase: 'lote7',
    name: 'Aulas saindo do ar',
    tema: 'Acesso limitado ao conteúdo gratuito',
    objetivo: 'Criar urgência baseada na perda de acesso ao conteúdo',
    timing: 'Final da manhã/início da tarde do terceiro dia',
    elementos: ['Prazo para acesso ao conteúdo gratuito', 'links para todas as aulas', 'link para inscrição']
  },
  51: {
    phase: 'lote7',
    name: 'O programa é para você?',
    tema: 'Qualificação de público-alvo',
    objetivo: 'Conectar com perfis específicos de potenciais compradores',
    timing: 'Manhã do quarto dia',
    elementos: ['Pergunta de qualificação', 'perfis específicos atendidos', 'urgência indefinida', 'link direto']
  },
  52: {
    phase: 'lote7',
    name: 'Bônus ainda válidos',
    tema: 'Recapitulação completa de bônus',
    objetivo: 'Relembrar o valor total da oferta',
    timing: 'Tarde do quarto dia',
    elementos: ['Lista completa e detalhada de bônus', 'urgência indefinida', 'link direto']
  },
  53: {
    phase: 'lote7',
    name: 'Aulas liberadas por tempo limitado',
    tema: 'Nova oportunidade para assistir o conteúdo',
    objetivo: 'Reconectar com pessoas que não consumiram o conteúdo',
    timing: 'Final da tarde/início da noite do quarto dia',
    elementos: ['Prazo específico para acesso', 'links para todas as aulas', 'link para inscrição']
  },
  54: {
    phase: 'lote7',
    name: 'Destaque de bônus específico',
    tema: 'Foco em um bônus de alto valor',
    objetivo: 'Ressaltar um aspecto específico da oferta',
    timing: 'Manhã do quinto dia',
    elementos: ['Descrição detalhada de um bônus específico', 'benefício transformador', 'urgência indefinida', 'link direto']
  },
  55: {
    phase: 'lote7',
    name: 'O que você vai aprender',
    tema: 'Detalhamento do conteúdo principal',
    objetivo: 'Focar no valor do programa principal, além dos bônus',
    timing: 'Meio da manhã do quinto dia',
    elementos: ['Lista detalhada do conteúdo principal', 'benefícios específicos', 'urgência indefinida', 'link direto']
  },
  56: {
    phase: 'lote7',
    name: 'Acesso à equipe de suporte',
    tema: 'Suporte para tomada de decisão',
    objetivo: 'Oferecer ajuda direta para superar objeções finais',
    timing: 'Tarde do quinto dia',
    elementos: ['Oferta de acesso direto à equipe', 'abordagem às objeções comuns', 'urgência para o acesso ao suporte', 'link de contato']
  },
  57: {
    phase: 'lote7',
    name: 'Investimento por dia',
    tema: 'Valor percebido versus custo diário',
    objetivo: 'Minimizar a percepção do investimento total',
    timing: 'Final da tarde do quinto dia',
    elementos: ['Comparações de valor', 'custo diluído por dia', 'confronto de objeções financeiras', 'link direto']
  },
  58: {
    phase: 'lote7',
    name: 'Nova forma de pagamento',
    tema: 'Opção adicional para facilitar a compra',
    objetivo: 'Superar objeções relacionadas a forma de pagamento',
    timing: 'Manhã do sexto dia',
    elementos: ['Anúncio da nova opção de pagamento', 'urgência para decisão final', 'lembretes de bônus', 'links para ambas opções de pagamento']
  },
  59: {
    phase: 'lote7',
    name: 'Comece do zero',
    tema: 'Acessibilidade para iniciantes absolutos',
    objetivo: 'Conectar com pessoas sem experiência prévia',
    timing: 'Meio da manhã do sexto dia',
    elementos: ['Ênfase na jornada completa', 'adequação para iniciantes', 'seleção de bônus destacados', 'urgência indefinida', 'links para opções de pagamento']
  },
  60: {
    phase: 'lote7',
    name: 'Confronto de medos',
    tema: 'Superação do medo como obstáculo',
    objetivo: 'Abordar diretamente o medo como objeção principal',
    timing: 'Tarde do sexto dia',
    elementos: ['Confronto direto ao medo comum', 'histórias de superação', 'riscos de não agir', 'link direto']
  },
  61: {
    phase: 'lote7',
    name: 'Quais são suas desculpas?',
    tema: 'Confronto direto a objeções',
    objetivo: 'Desafiar indecisão com abordagem provocativa',
    timing: 'Manhã do sétimo dia',
    elementos: ['Questionamento direto sobre desculpas', 'transferência de responsabilidade', 'links para todas opções de pagamento']
  },
  62: {
    phase: 'lote7',
    name: 'Divisor de águas',
    tema: 'Transformação de vida através da decisão',
    objetivo: 'Enfatizar o impacto da decisão na trajetória de vida',
    timing: 'Meio da manhã do sétimo dia',
    elementos: ['Metáfora de divisor de águas', 'acessibilidade para todos perfis', 'urgência indefinida', 'links para opções de pagamento']
  },
  63: {
    phase: 'lote7',
    name: 'Bônus não garantidos na próxima turma',
    tema: 'Exclusividade da oferta atual',
    objetivo: 'Criar medo de perder elementos específicos da oferta',
    timing: 'Tarde do sétimo dia',
    elementos: ['Incerteza sobre disponibilidade futura', 'destaque para item exclusivo da oferta atual', 'urgência para ação imediata', 'links para opções de pagamento']
  },
  64: {
    phase: 'lote7',
    name: 'Tempo acabando novamente',
    tema: 'Anúncio de prazo final definitivo',
    objetivo: 'Estabelecer prazo final crível após extensão',
    timing: 'Manhã do oitavo dia',
    elementos: ['Aviso claro sobre prazo final', 'data e hora específicas', 'links para opções de pagamento']
  },
  65: {
    phase: 'lote7',
    name: 'Menos de 29 horas para o fim',
    tema: 'Contagem regressiva em horas',
    objetivo: 'Criar urgência baseada em prazo específico',
    timing: 'Meio da manhã do oitavo dia',
    elementos: ['Contagem regressiva em horas', 'consequências de perder a oferta', 'links para opções de pagamento']
  },
  66: {
    phase: 'lote7',
    name: 'Destaque de bônus específico 1',
    tema: 'Foco em bônus de alto valor',
    objetivo: 'Ressaltar aspectos específicos da oferta',
    timing: 'Ao longo do oitavo dia',
    elementos: ['Descrição detalhada de bônus específicos', 'benefícios transformadores', 'links para opções de pagamento']
  },
  67: {
    phase: 'lote7',
    name: 'Destaque de bônus específico 2',
    tema: 'Foco em bônus de alto valor',
    objetivo: 'Ressaltar aspectos específicos da oferta',
    timing: 'Ao longo do oitavo dia',
    elementos: ['Descrição detalhada de bônus específicos', 'benefícios transformadores', 'links para opções de pagamento']
  },
  68: {
    phase: 'lote7',
    name: 'Série de bônus específicos 1',
    tema: 'Foco sequencial em múltiplos bônus',
    objetivo: 'Aumentar valor percebido com diversidade de ofertas',
    timing: 'Ao longo do último dia',
    elementos: ['Apresentação de diferentes bônus', 'benefícios específicos de cada um', 'links para opções de pagamento']
  },
  69: {
    phase: 'lote7',
    name: 'Série de bônus específicos 2',
    tema: 'Foco sequencial em múltiplos bônus',
    objetivo: 'Aumentar valor percebido com diversidade de ofertas',
    timing: 'Ao longo do último dia',
    elementos: ['Apresentação de diferentes bônus', 'benefícios específicos de cada um', 'links para opções de pagamento']
  },
  70: {
    phase: 'lote7',
    name: 'Contagem regressiva final',
    tema: 'Contagem regressiva das últimas horas',
    objetivo: 'Criar urgência máxima nas horas finais',
    timing: 'Últimas 12, 8, 6, 4, 2 e 1 hora',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'links para opções de pagamento']
  }
};

/**
 * Get messages for a specific batch/phase
 */
function getMessagesByPhase(phase) {
  const phaseConfig = MESSAGES_PHASES[phase];
  if (!phaseConfig) {
    throw new Error(`Phase "${phase}" not found`);
  }
  
  return phaseConfig.messages.map(messageNumber => ({
    number: messageNumber,
    ...MESSAGES_SEQUENCE[messageNumber]
  }));
}

/**
 * Get phase information for a specific message
 */
function getPhaseForMessage(messageNumber) {
  const messageInfo = MESSAGES_SEQUENCE[messageNumber];
  if (!messageInfo) {
    throw new Error(`Message ${messageNumber} not found`);
  }
  
  return {
    phase: messageInfo.phase,
    phaseInfo: MESSAGES_PHASES[messageInfo.phase],
    messageInfo
  };
}

/**
 * Get all phases in order
 */
function getAllPhases() {
  return Object.keys(MESSAGES_PHASES);
}

/**
 * Get phase order for sequential generation
 */
function getPhaseOrder() {
  return ['lote1', 'lote2', 'lote3', 'lote4', 'lote5', 'lote6', 'lote7'];
}

/**
 * Get previous phases for context
 */
function getPreviousPhases(currentPhase) {
  const phaseOrder = getPhaseOrder();
  const currentIndex = phaseOrder.indexOf(currentPhase);
  return phaseOrder.slice(0, currentIndex);
}

module.exports = {
  MESSAGES_PHASES,
  MESSAGES_SEQUENCE,
  getMessagesByPhase,
  getPhaseForMessage,
  getAllPhases,
  getPhaseOrder,
  getPreviousPhases
}; 