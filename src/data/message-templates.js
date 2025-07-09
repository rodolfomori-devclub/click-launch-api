/**
 * Individual Message Templates for Launch Campaign
 * Based on the complete 70 messages framework provided
 * Each template contains specific instructions for that message
 */

const MESSAGE_TEMPLATES = {
  // LOTE 1: ANTECIPAÇÃO E PREPARAÇÃO (7 mensagens)
  1: {
    name: 'Boas-vindas',
    tema: 'Boas-vindas e agradecimento pela inscrição',
    objetivo: 'Dar as boas-vindas ao inscrito, reforçar as datas do evento e criar a primeira conexão emocional',
    timing: 'Imediatamente após a inscrição no evento',
    elementos: ['Agradecimento', 'promessa principal do evento', 'datas e horários', 'link para pesquisa', 'alerta de segurança'],
    prompt: `Crie uma mensagem de boas-vindas calorosa e profissional que deve:

OBJETIVO: Dar as boas-vindas ao inscrito, reforçar as datas do evento e criar a primeira conexão emocional

ELEMENTOS OBRIGATÓRIOS:
- Agradecimento genuíno pela inscrição
- Promessa principal do evento (baseada no negócio/produto)
- Datas e horários claros do evento
- Link para pesquisa/formulário se houver
- Alerta de segurança sobre canais oficiais

TIMING: Enviada imediatamente após a inscrição no evento

PERSONALIZAÇÃO: Use as informações do questionário para personalizar a mensagem conforme o negócio e público-alvo.

FORMATO: Mensagem para WhatsApp, direta e envolvente, máximo 300 palavras.`
  },

  2: {
    name: 'Alerta de segurança',
    tema: 'Proteção contra golpes',
    objetivo: 'Prevenir fraudes e estabelecer canais oficiais de comunicação',
    timing: '2 dias após a inscrição no evento',
    elementos: ['Alerta enfático sobre golpes', 'canais oficiais de comunicação', 'link para verificação'],
    prompt: `Crie uma mensagem de alerta de segurança que deve:

OBJETIVO: Prevenir fraudes e estabelecer canais oficiais de comunicação

ELEMENTOS OBRIGATÓRIOS:
- Alerta enfático e claro sobre golpes/fraudes
- Lista dos canais oficiais de comunicação
- Link para verificação de autenticidade
- Tom sério mas tranquilizador

TIMING: 2 dias após a inscrição no evento

PERSONALIZAÇÃO: Adapte os canais oficiais conforme as informações do negócio.

FORMATO: Mensagem clara e direta, focada na segurança, máximo 250 palavras.`
  },

  3: {
    name: 'Segundo alerta de segurança',
    tema: 'Reforço da proteção contra golpes',
    objetivo: 'Assegurar que todos estejam cientes dos riscos de fraude',
    timing: '4 dias após a inscrição no evento',
    elementos: ['Versão condensada do primeiro alerta', 'link para verificação'],
    prompt: `Crie um reforço do alerta de segurança que deve:

OBJETIVO: Assegurar que todos estejam cientes dos riscos de fraude

ELEMENTOS OBRIGATÓRIOS:
- Versão mais condensada do primeiro alerta
- Reforço dos canais oficiais
- Link para verificação
- Mensagem mais direta e concisa

TIMING: 4 dias após a inscrição no evento

PERSONALIZAÇÃO: Mantenha consistência com o primeiro alerta mas de forma mais resumida.

FORMATO: Mensagem concisa e impactante, máximo 150 palavras.`
  },

  4: {
    name: 'Contagem regressiva',
    tema: 'Expectativa para o evento',
    objetivo: 'Criar empolgação e estabelecer o valor do evento',
    timing: '4 dias antes da Aula 1',
    elementos: ['Contagem regressiva', 'prévia do conteúdo', 'reforço das datas', 'menção à oferta especial', 'alerta de segurança'],
    prompt: `Crie uma mensagem de contagem regressiva que deve:

OBJETIVO: Criar empolgação e estabelecer o valor do evento

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva clara (4 dias para a Aula 1)
- Prévia atrativa do conteúdo que será apresentado
- Reforço das datas e horários
- Menção sutil à oferta especial que virá
- Breve alerta de segurança

TIMING: 4 dias antes da Aula 1

PERSONALIZAÇÃO: Adapte a prévia do conteúdo conforme o negócio e promessas feitas.

FORMATO: Mensagem empolgante e envolvente, máximo 300 palavras.`
  },

  5: {
    name: 'Véspera do evento',
    tema: 'Preparação para o início do evento',
    objetivo: 'Assegurar presença na primeira aula e criar urgência',
    timing: '1 dia antes da Aula 1',
    elementos: ['Confirmação de presença', 'link para ativar lembrete', 'reforço das datas', 'alerta de segurança'],
    prompt: `Crie uma mensagem de véspera que deve:

OBJETIVO: Assegurar presença na primeira aula e criar urgência

ELEMENTOS OBRIGATÓRIOS:
- Solicitação de confirmação de presença
- Link para ativar lembrete/notificação
- Reforço claro das datas e horários
- Criação de senso de urgência
- Alerta de segurança breve

TIMING: 1 dia antes da Aula 1

PERSONALIZAÇÃO: Adapte o tom conforme o público-alvo identificado no questionário.

FORMATO: Mensagem urgente mas positiva, máximo 250 palavras.`
  },

  6: {
    name: 'Dia da primeira aula',
    tema: 'Empolgação para o início do evento',
    objetivo: 'Maximizar participação na primeira aula',
    timing: 'Manhã do dia da Aula 1',
    elementos: ['Contagem regressiva para o início', 'resumo do conteúdo da aula', 'benefícios de participar', 'link para ativar lembrete'],
    prompt: `Crie uma mensagem do dia da primeira aula que deve:

OBJETIVO: Maximizar participação na primeira aula

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva para o início (horas restantes)
- Resumo atrativo do conteúdo da primeira aula
- Lista clara dos benefícios de participar
- Link para ativar lembrete/acesso
- Tom de máxima empolgação

TIMING: Manhã do dia da Aula 1

PERSONALIZAÇÃO: Adapte os benefícios conforme as promessas e objetivos do negócio.

FORMATO: Mensagem empolgante e motivacional, máximo 300 palavras.`
  },

  7: {
    name: 'Último lembrete antes da primeira aula',
    tema: 'Lembrete final com incentivo adicional',
    objetivo: 'Capturar participantes de última hora',
    timing: '2-3 horas antes da Aula 1',
    elementos: ['Lembrete rápido', 'menção a sorteio/bônus', 'incentivo a não sair do grupo', 'link para ativar lembrete'],
    prompt: `Crie um último lembrete antes da primeira aula que deve:

OBJETIVO: Capturar participantes de última hora

ELEMENTOS OBRIGATÓRIOS:
- Lembrete rápido e direto sobre o horário
- Menção a sorteio/bônus especial para quem participar
- Incentivo explícito para não sair do grupo
- Link para ativar lembrete/acesso
- Senso de urgência final

TIMING: 2-3 horas antes da Aula 1

PERSONALIZAÇÃO: Adapte o tipo de incentivo/bônus conforme o negócio.

FORMATO: Mensagem urgente e direta, máximo 200 palavras.`
  },

  // LOTE 2: AULA 1 E PREPARAÇÃO AULA 2 (8 mensagens)
  8: {
    name: 'Uma hora antes da primeira aula',
    tema: 'Preparação imediata',
    objetivo: 'Criar senso de urgência e preparação final',
    timing: '1 hora antes da Aula 1',
    elementos: ['Contagem regressiva', 'dicas de preparação (papel, caneta, lugar tranquilo)', 'reforço dos benefícios', 'link para aula'],
    prompt: `Crie uma mensagem de preparação imediata que deve:

OBJETIVO: Criar senso de urgência e preparação final

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva exata (1 hora)
- Dicas práticas de preparação (papel, caneta, lugar tranquilo)
- Reforço dos benefícios principais
- Link direto para a aula
- Tom de preparação final e foco

TIMING: 1 hora antes da Aula 1

PERSONALIZAÇÃO: Adapte as dicas de preparação conforme o tipo de conteúdo/negócio.

FORMATO: Mensagem prática e focada, máximo 250 palavras.`
  },

  9: {
    name: 'Primeira aula ao vivo',
    tema: 'Aula iniciando agora',
    objetivo: 'Notificar o início imediato da transmissão',
    timing: 'No momento exato do início da Aula 1',
    elementos: ['Anúncio da transmissão ao vivo', 'benefícios principais', 'menção à acessibilidade do conteúdo', 'link direto'],
    prompt: `Crie uma mensagem de início da primeira aula que deve:

OBJETIVO: Notificar o início imediato da transmissão

ELEMENTOS OBRIGATÓRIOS:
- Anúncio claro de que a transmissão está começando AGORA
- Destaque dos benefícios principais que serão apresentados
- Menção à acessibilidade do conteúdo
- Link direto para acesso
- Tom de urgência máxima

TIMING: No momento exato do início da Aula 1

PERSONALIZAÇÃO: Adapte os benefícios conforme as promessas principais do evento.

FORMATO: Mensagem urgente e direta, máximo 150 palavras.`
  },

  10: {
    name: 'Início do conteúdo principal',
    tema: 'Conteúdo principal começando',
    objetivo: 'Recuperar participantes atrasados',
    timing: '10 minutos após o início da Aula 1',
    elementos: ['Linguagem de urgência extrema', 'pergunta direta sobre a presença', 'link para a aula'],
    prompt: `Crie uma mensagem para recuperar atrasados que deve:

OBJETIVO: Recuperar participantes atrasados

ELEMENTOS OBRIGATÓRIOS:
- Linguagem de urgência extrema
- Pergunta direta sobre presença na aula
- Indicação de que o conteúdo principal está começando
- Link para a aula
- Tom de última chance

TIMING: 10 minutos após o início da Aula 1

PERSONALIZAÇÃO: Adapte conforme o tipo de conteúdo que está sendo perdido.

FORMATO: Mensagem de urgência extrema, máximo 100 palavras.`
  },

  11: {
    name: 'Lembrete durante a primeira aula',
    tema: 'Conteúdo valioso em andamento',
    objetivo: 'Atrair participantes que ainda não acessaram',
    timing: '30 minutos após o início da Aula 1',
    elementos: ['Tom de questionamento', 'destaque do conteúdo atual', 'link para aula'],
    prompt: `Crie um lembrete durante a primeira aula que deve:

OBJETIVO: Atrair participantes que ainda não acessaram

ELEMENTOS OBRIGATÓRIOS:
- Tom de questionamento sobre ausência
- Destaque específico do conteúdo que está acontecendo
- Senso do que estão perdendo
- Link para aula
- Abordagem envolvente

TIMING: 30 minutos após o início da Aula 1

PERSONALIZAÇÃO: Destaque aspectos específicos do conteúdo conforme o negócio.

FORMATO: Mensagem questionadora e envolvente, máximo 150 palavras.`
  },

  12: {
    name: 'Aviso sobre sorteio/incentivo',
    tema: 'Oportunidade adicional durante a aula',
    objetivo: 'Oferecer motivação extra para participação tardia',
    timing: '45 minutos após o início da Aula 1',
    elementos: ['Destaque do prêmio/incentivo', 'menção ao número de participantes', 'link para aula'],
    prompt: `Crie um aviso sobre incentivo adicional que deve:

OBJETIVO: Oferecer motivação extra para participação tardia

ELEMENTOS OBRIGATÓRIOS:
- Destaque claro do prêmio/sorteio/incentivo
- Menção ao número de participantes conectados
- Criação de FOMO (medo de perder)
- Link para aula
- Tom de oportunidade limitada

TIMING: 45 minutos após o início da Aula 1

PERSONALIZAÇÃO: Adapte o tipo de incentivo conforme o negócio e público.

FORMATO: Mensagem de oportunidade limitada, máximo 200 palavras.`
  },

  13: {
    name: 'Resumo da primeira aula e convite para a segunda',
    tema: 'Recapitulação e antecipação',
    objetivo: 'Reforçar valor do conteúdo e garantir presença na próxima aula',
    timing: 'Manhã do dia da Aula 2',
    elementos: ['Métricas de participação', 'resumo do conteúdo principal da Aula 1', 'link para Aula 1 (replay)', 'link para Aula 2 (ativar lembrete)'],
    prompt: `Crie um resumo e convite para segunda aula que deve:

OBJETIVO: Reforçar valor do conteúdo e garantir presença na próxima aula

ELEMENTOS OBRIGATÓRIOS:
- Métricas impressionantes de participação da Aula 1
- Resumo dos principais pontos/revelações da Aula 1
- Link para replay da Aula 1
- Convite empolgante para Aula 2
- Link para ativar lembrete da Aula 2

TIMING: Manhã do dia da Aula 2

PERSONALIZAÇÃO: Adapte o resumo conforme o conteúdo específico apresentado.

FORMATO: Mensagem de recapitulação e antecipação, máximo 350 palavras.`
  },

  14: {
    name: 'Lembrete para segunda aula',
    tema: 'Antecipação do conteúdo prático',
    objetivo: 'Destacar o valor prático da segunda aula',
    timing: 'Início da tarde do dia da Aula 2',
    elementos: ['Urgência', 'conteúdo prático', 'ferramentas exclusivas', 'pergunta de engajamento', 'link para ativar lembrete'],
    prompt: `Crie um lembrete para segunda aula que deve:

OBJETIVO: Destacar o valor prático da segunda aula

ELEMENTOS OBRIGATÓRIOS:
- Criação de urgência para não perder
- Destaque do conteúdo prático/ferramentas
- Menção a ferramentas exclusivas que serão apresentadas
- Pergunta de engajamento sobre objetivos
- Link para ativar lembrete

TIMING: Início da tarde do dia da Aula 2

PERSONALIZAÇÃO: Adapte o conteúdo prático conforme o negócio e ferramentas específicas.

FORMATO: Mensagem prática e envolvente, máximo 250 palavras.`
  },

  15: {
    name: 'Uma hora antes da segunda aula',
    tema: 'Contagem regressiva com destaque para conteúdos específicos',
    objetivo: 'Criar urgência com base no conteúdo valioso',
    timing: '1 hora antes da Aula 2',
    elementos: ['Contagem regressiva', 'destaque para elementos atrativos', 'lista clara dos tópicos', 'link para ativar lembrete'],
    prompt: `Crie uma contagem regressiva para segunda aula que deve:

OBJETIVO: Criar urgência com base no conteúdo valioso

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva exata (1 hora)
- Destaque para elementos mais atrativos da aula
- Lista clara dos tópicos que serão abordados
- Criação de expectativa máxima
- Link para ativar lembrete/acesso

TIMING: 1 hora antes da Aula 2

PERSONALIZAÇÃO: Adapte os tópicos e elementos conforme o planejamento específico da aula.

FORMATO: Mensagem de expectativa e urgência, máximo 300 palavras.`
  },

  // LOTE 3: AULA 2 E PREPARAÇÃO AULA 3 (6 mensagens)
  16: {
    name: 'Segunda aula ao vivo',
    tema: 'Aula prática iniciando agora',
    objetivo: 'Notificar o início imediato da transmissão prática',
    timing: 'No momento exato do início da Aula 2',
    elementos: ['Anúncio da transmissão ao vivo', 'destaque para o conteúdo prático', 'link direto'],
    prompt: `Crie uma mensagem de início da segunda aula que deve:

OBJETIVO: Notificar o início imediato da transmissão prática

ELEMENTOS OBRIGATÓRIOS:
- Anúncio claro de que a aula prática está começando AGORA
- Destaque para o conteúdo prático e aplicável
- Diferenciação desta aula como mais prática
- Link direto para acesso
- Tom de urgência para conteúdo prático

TIMING: No momento exato do início da Aula 2

PERSONALIZAÇÃO: Enfatize aspectos práticos conforme o negócio.

FORMATO: Mensagem urgente e prática, máximo 150 palavras.`
  },

  17: {
    name: 'Lembrete durante a segunda aula',
    tema: 'Desafio para participação',
    objetivo: 'Provocar engajamento de retardatários',
    timing: '30 minutos após o início da Aula 2',
    elementos: ['Abordagem provocativa', 'destaque para o que estão perdendo', 'menção ao material exclusivo', 'link direto'],
    prompt: `Crie um lembrete provocativo durante a segunda aula que deve:

OBJETIVO: Provocar engajamento de retardatários

ELEMENTOS OBRIGATÓRIOS:
- Abordagem provocativa sobre ausência
- Destaque específico do que estão perdendo
- Menção ao material exclusivo sendo apresentado
- Tom de desafio direto
- Link direto para aula

TIMING: 30 minutos após o início da Aula 2

PERSONALIZAÇÃO: Adapte a provocação conforme o perfil do público.

FORMATO: Mensagem provocativa e direta, máximo 150 palavras.`
  },

  18: {
    name: 'Último lembrete segunda aula',
    tema: 'Última chance para conteúdo essencial',
    objetivo: 'Capturar participantes finais',
    timing: '1 hora após o início da Aula 2',
    elementos: ['Urgência máxima', 'destaque para ferramenta exclusiva', 'menção a incentivo adicional', 'link direto'],
    prompt: `Crie um último lembrete da segunda aula que deve:

OBJETIVO: Capturar participantes finais

ELEMENTOS OBRIGATÓRIOS:
- Urgência máxima - última chance
- Destaque para ferramenta exclusiva sendo apresentada
- Menção a incentivo adicional para quem participar
- Tom de oportunidade perdida se não agir
- Link direto para aula

TIMING: 1 hora após o início da Aula 2

PERSONALIZAÇÃO: Destaque ferramentas específicas do negócio.

FORMATO: Mensagem de urgência máxima, máximo 200 palavras.`
  },

  19: {
    name: 'Convite para terceira aula',
    tema: 'Revelação de conteúdo de alto valor e antecipação da oferta',
    objetivo: 'Maximizar participação na aula final e preparar para a oferta',
    timing: 'Manhã do dia da Aula 3',
    elementos: ['Urgência', 'anúncio de revelações específicas', 'link para Aula 2 (replay)', 'importância da Aula 3', 'menção à oferta'],
    prompt: `Crie um convite para terceira aula que deve:

OBJETIVO: Maximizar participação na aula final e preparar para a oferta

ELEMENTOS OBRIGATÓRIOS:
- Criação de urgência para aula final
- Anúncio de revelações específicas importantes
- Link para replay da Aula 2
- Ênfase na importância crucial da Aula 3
- Menção sutil à oferta especial que será apresentada

TIMING: Manhã do dia da Aula 3

PERSONALIZAÇÃO: Adapte as revelações conforme o climax do conteúdo.

FORMATO: Mensagem de antecipação máxima, máximo 350 palavras.`
  },

  20: {
    name: 'Importância da terceira aula',
    tema: 'Aula decisiva para alcançar o objetivo principal',
    objetivo: 'Enfatizar a importância crucial da última aula',
    timing: 'Início da tarde do dia da Aula 3',
    elementos: ['Chamado de máxima atenção', 'conexão direta com o objetivo desejado', 'detalhes da oferta especial', 'aviso sobre disponibilidade limitada'],
    prompt: `Crie uma mensagem sobre importância da terceira aula que deve:

OBJETIVO: Enfatizar a importância crucial da última aula

ELEMENTOS OBRIGATÓRIOS:
- Chamado de máxima atenção e foco
- Conexão direta com o objetivo principal desejado
- Primeiros detalhes da oferta especial
- Aviso sobre disponibilidade limitada
- Tom de decisão de vida

TIMING: Início da tarde do dia da Aula 3

PERSONALIZAÇÃO: Conecte com os objetivos identificados no questionário.

FORMATO: Mensagem de importância máxima, máximo 300 palavras.`
  },

  21: {
    name: 'Uma hora antes da terceira aula',
    tema: 'Preparação especial para conteúdo transformador',
    objetivo: 'Criar senso de preparação especial e importância crucial',
    timing: '1 hora antes da Aula 3',
    elementos: ['Contagem regressiva', 'perguntas sobre preparação', 'solicitação de atenção total', 'conexão com transformação de vida'],
    prompt: `Crie uma preparação especial para terceira aula que deve:

OBJETIVO: Criar senso de preparação especial e importância crucial

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva especial (1 hora)
- Perguntas sobre preparação mental/física
- Solicitação de atenção total e foco máximo
- Conexão com transformação de vida
- Tom de momento decisivo

TIMING: 1 hora antes da Aula 3

PERSONALIZAÇÃO: Adapte a preparação conforme o tipo de transformação prometida.

FORMATO: Mensagem de preparação especial, máximo 250 palavras.`
  },

  // LOTE 4: AULA 3 E LISTA VIP (10 mensagens)
  22: {
    name: 'Terceira aula ao vivo',
    tema: 'Aula mais importante iniciando agora',
    objetivo: 'Notificar o início da aula decisiva com oferta especial',
    timing: 'No momento exato do início da Aula 3',
    elementos: ['Urgência máxima', 'destaque para conteúdo exclusivo', 'menção à oferta especial', 'link direto'],
    prompt: `Crie uma mensagem de início da terceira aula que deve:

OBJETIVO: Notificar o início da aula decisiva com oferta especial

ELEMENTOS OBRIGATÓRIOS:
- Urgência máxima - aula mais importante
- Destaque para conteúdo exclusivo e decisivo
- Menção à oferta especial que será apresentada
- Link direto para acesso
- Tom de momento transformador

TIMING: No momento exato do início da Aula 3

PERSONALIZAÇÃO: Enfatize o caráter decisivo conforme o negócio.

FORMATO: Mensagem de urgência e importância máxima, máximo 150 palavras.`
  },

  23: {
    name: 'Lembrete durante a terceira aula',
    tema: 'Reflexão sobre oportunidade',
    objetivo: 'Usar abordagem filosófica para engajar retardatários',
    timing: '30 minutos após o início da Aula 3',
    elementos: ['Tom reflexivo', 'limite da ajuda oferecida', 'transferência de responsabilidade', 'link direto'],
    prompt: `Crie um lembrete reflexivo durante a terceira aula que deve:

OBJETIVO: Usar abordagem filosófica para engajar retardatários

ELEMENTOS OBRIGATÓRIOS:
- Tom reflexivo e filosófico
- Menção ao limite da ajuda que pode ser oferecida
- Transferência sutil de responsabilidade para o destinatário
- Reflexão sobre oportunidades perdidas
- Link direto para aula

TIMING: 30 minutos após o início da Aula 3

PERSONALIZAÇÃO: Adapte a reflexão conforme o perfil do público.

FORMATO: Mensagem reflexiva e profunda, máximo 200 palavras.`
  },

  24: {
    name: 'Segundo lembrete durante a terceira aula',
    tema: 'Última chamada urgente',
    objetivo: 'Capturar participantes finais com urgência extrema',
    timing: '45 minutos após o início da Aula 3',
    elementos: ['Mensagem curta e direta', 'questionamento sobre presença', 'ênfase na oportunidade limitada', 'link direto'],
    prompt: `Crie uma última chamada urgente que deve:

OBJETIVO: Capturar participantes finais com urgência extrema

ELEMENTOS OBRIGATÓRIOS:
- Mensagem muito curta e direta
- Questionamento direto sobre presença
- Ênfase na oportunidade limitada que está sendo perdida
- Link direto para aula
- Tom de urgência extrema

TIMING: 45 minutos após o início da Aula 3

PERSONALIZAÇÃO: Mantenha foco na urgência universal.

FORMATO: Mensagem ultra concisa e urgente, máximo 100 palavras.`
  },

  25: {
    name: 'Anúncio da condição especial',
    tema: 'Alerta para revelação da oferta',
    objetivo: 'Criar expectativa para a apresentação da oferta',
    timing: '1 hora e 15 minutos após o início da Aula 3',
    elementos: ['Linguagem de alerta', 'menção à iminência da revelação da oferta', 'link direto'],
    prompt: `Crie um anúncio de condição especial que deve:

OBJETIVO: Criar expectativa para a apresentação da oferta

ELEMENTOS OBRIGATÓRIOS:
- Linguagem de alerta especial
- Menção à iminência da revelação da oferta
- Criação de expectativa máxima
- Link direto para aula
- Tom de algo especial acontecendo

TIMING: 1 hora e 15 minutos após o início da Aula 3

PERSONALIZAÇÃO: Adapte conforme o tipo de oferta que será apresentada.

FORMATO: Mensagem de alerta e expectativa, máximo 150 palavras.`
  },

  26: {
    name: 'Anúncio das inscrições',
    tema: 'Informações completas sobre a oferta',
    objetivo: 'Comunicar todos os detalhes da oferta especial',
    timing: 'Após o término da Aula 3',
    elementos: ['Urgência', 'resumo da terceira aula', 'detalhes da oferta', 'acesso VIP antecipado', 'link para página de vendas'],
    prompt: `Crie um anúncio completo das inscrições que deve:

OBJETIVO: Comunicar todos os detalhes da oferta especial

ELEMENTOS OBRIGATÓRIOS:
- Criação de urgência imediata
- Resumo rápido dos pontos principais da Aula 3
- Detalhes completos da oferta (valor, benefícios, prazo)
- Destaque para acesso VIP antecipado
- Link direto para página de vendas

TIMING: Após o término da Aula 3

PERSONALIZAÇÃO: Detalhe a oferta conforme o produto/serviço específico.

FORMATO: Mensagem completa e detalhada, máximo 400 palavras.`
  },

  27: {
    name: 'Lembrete sobre a terceira aula',
    tema: 'Recap da aula final para quem perdeu',
    objetivo: 'Recuperar pessoas que não assistiram à aula final',
    timing: 'Manhã do dia seguinte à Aula 3',
    elementos: ['Resumo da aula final', 'menção à oferta especial', 'link para replay', 'destaque para acesso VIP'],
    prompt: `Crie um recap da aula final que deve:

OBJETIVO: Recuperar pessoas que não assistiram à aula final

ELEMENTOS OBRIGATÓRIOS:
- Resumo dos pontos principais da Aula 3
- Menção à oferta especial apresentada
- Link para replay da aula
- Destaque para acesso VIP ainda disponível
- Tom de segunda chance

TIMING: Manhã do dia seguinte à Aula 3

PERSONALIZAÇÃO: Destaque os pontos mais impactantes da apresentação.

FORMATO: Mensagem de recapitulação e oportunidade, máximo 350 palavras.`
  },

  28: {
    name: 'Bônus exclusivos',
    tema: 'Detalhamento dos bônus da oferta',
    objetivo: 'Aumentar o valor percebido da oferta',
    timing: 'Meio da manhã do dia seguinte à Aula 3',
    elementos: ['Lista detalhada de bônus', 'benefícios para ação rápida', 'acesso VIP', 'link para página de vendas'],
    prompt: `Crie um detalhamento dos bônus exclusivos que deve:

OBJETIVO: Aumentar o valor percebido da oferta

ELEMENTOS OBRIGATÓRIOS:
- Lista detalhada e atrativa de todos os bônus
- Benefícios específicos para ação rápida
- Ênfase no acesso VIP
- Valor total dos bônus
- Link para página de vendas

TIMING: Meio da manhã do dia seguinte à Aula 3

PERSONALIZAÇÃO: Adapte os bônus conforme o negócio e produtos complementares.

FORMATO: Mensagem detalhada de valor, máximo 400 palavras.`
  },

  29: {
    name: 'Aviso sobre acesso VIP',
    tema: 'Lembrete final para Lista VIP',
    objetivo: 'Criar urgência para inscrição antecipada',
    timing: '3-4 horas antes da abertura para Lista VIP',
    elementos: ['Urgência', 'vantagem do acesso antecipado', 'recapitulação dos bônus', 'link para página VIP'],
    prompt: `Crie um aviso sobre acesso VIP que deve:

OBJETIVO: Criar urgência para inscrição antecipada

ELEMENTOS OBRIGATÓRIOS:
- Urgência para não perder acesso VIP
- Vantagens específicas do acesso antecipado
- Recapitulação rápida dos principais bônus
- Link para página VIP
- Tom de exclusividade

TIMING: 3-4 horas antes da abertura para Lista VIP

PERSONALIZAÇÃO: Destaque vantagens VIP específicas do negócio.

FORMATO: Mensagem de urgência e exclusividade, máximo 250 palavras.`
  },

  30: {
    name: 'Menos de 2 horas',
    tema: 'Contagem regressiva para Lista VIP',
    objetivo: 'Maximizar inscrições antecipadas',
    timing: '2 horas antes da abertura para Lista VIP',
    elementos: ['Contagem regressiva', 'benefícios da Lista VIP', 'bônus para primeiros inscritos', 'link para página VIP'],
    prompt: `Crie uma contagem regressiva para Lista VIP que deve:

OBJETIVO: Maximizar inscrições antecipadas

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva clara (2 horas)
- Benefícios específicos da Lista VIP
- Bônus especiais para primeiros inscritos
- Link para página VIP
- Tom de oportunidade limitada

TIMING: 2 horas antes da abertura para Lista VIP

PERSONALIZAÇÃO: Adapte os benefícios VIP conforme a estratégia.

FORMATO: Mensagem de contagem regressiva e urgência, máximo 200 palavras.`
  },

  31: {
    name: 'Menos de 30 minutos',
    tema: 'Urgência final para Lista VIP',
    objetivo: 'Capturar inscrições de última hora para acesso antecipado',
    timing: '30 minutos antes da abertura para Lista VIP',
    elementos: ['Contagem regressiva em minutos', 'recapitulação rápida dos bônus', 'link para página VIP'],
    prompt: `Crie uma urgência final para Lista VIP que deve:

OBJETIVO: Capturar inscrições de última hora para acesso antecipado

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva em minutos (30 minutos)
- Recapitulação ultra rápida dos principais bônus
- Link direto para página VIP
- Tom de urgência final
- Mensagem concisa e impactante

TIMING: 30 minutos antes da abertura para Lista VIP

PERSONALIZAÇÃO: Foque nos bônus mais atrativos.

FORMATO: Mensagem ultra concisa e urgente, máximo 150 palavras.`
  },

  // LOTE 5: VENDAS DIA 1 (5 mensagens)
  32: {
    name: 'Inscrições abertas',
    tema: 'Abertura oficial das inscrições para Lista VIP',
    objetivo: 'Comunicar a disponibilidade imediata da oferta para Lista VIP',
    timing: 'No momento exato da abertura para Lista VIP',
    elementos: ['Anúncio entusiasmado', 'prazo limitado', 'valor do desconto', 'link direto para checkout'],
    prompt: `Crie um anúncio de abertura das inscrições que deve:

OBJETIVO: Comunicar a disponibilidade imediata da oferta para Lista VIP

ELEMENTOS OBRIGATÓRIOS:
- Anúncio entusiasmado de abertura imediata
- Prazo limitado claramente definido
- Valor do desconto/oferta especial
- Link direto para checkout
- Tom de oportunidade única

TIMING: No momento exato da abertura para Lista VIP

PERSONALIZAÇÃO: Adapte valor e desconto conforme a estratégia de preços.

FORMATO: Mensagem de abertura entusiasmada, máximo 300 palavras.`
  },

  33: {
    name: 'Lista de bônus',
    tema: 'Detalhamento completo de todos os bônus',
    objetivo: 'Aumentar o valor percebido da oferta para o público geral',
    timing: 'No momento da abertura para o público geral',
    elementos: ['Linguagem entusiasmada', 'lista completa e detalhada de bônus', 'link para inscrição'],
    prompt: `Crie uma lista completa de bônus que deve:

OBJETIVO: Aumentar o valor percebido da oferta para o público geral

ELEMENTOS OBRIGATÓRIOS:
- Linguagem entusiasmada e persuasiva
- Lista completa e detalhada de todos os bônus
- Valor de cada bônus se possível
- Valor total da oferta
- Link para inscrição

TIMING: No momento da abertura para o público geral

PERSONALIZAÇÃO: Detalhe bônus específicos conforme o negócio.

FORMATO: Mensagem detalhada de valor total, máximo 400 palavras.`
  },

  34: {
    name: 'Tempo acabando',
    tema: 'Alerta de prazo limitado',
    objetivo: 'Criar urgência com base no tempo limitado da oferta',
    timing: 'Manhã do dia seguinte à abertura das inscrições',
    elementos: ['Alerta visual', 'conexão entre tempo e oportunidade', 'prazo final', 'condições de pagamento', 'link direto'],
    prompt: `Crie um alerta de tempo acabando que deve:

OBJETIVO: Criar urgência com base no tempo limitado da oferta

ELEMENTOS OBRIGATÓRIOS:
- Alerta visual sobre tempo limitado
- Conexão clara entre tempo e perda de oportunidade
- Prazo final específico
- Condições de pagamento facilitadas
- Link direto para inscrição

TIMING: Manhã do dia seguinte à abertura das inscrições

PERSONALIZAÇÃO: Adapte prazo e condições conforme a estratégia.

FORMATO: Mensagem de alerta urgente, máximo 250 palavras.`
  },

  35: {
    name: 'Sua história pode ser a próxima',
    tema: 'Motivação através de identificação',
    objetivo: 'Criar conexão emocional com resultados possíveis',
    timing: 'Tarde do dia seguinte à abertura das inscrições',
    elementos: ['Abordagem motivacional', 'projeção futura', 'alerta sobre perda de oportunidade', 'link direto'],
    prompt: `Crie uma mensagem motivacional que deve:

OBJETIVO: Criar conexão emocional com resultados possíveis

ELEMENTOS OBRIGATÓRIOS:
- Abordagem motivacional e inspiracional
- Projeção futura positiva para o destinatário
- História de sucesso ou exemplo
- Alerta sobre perda de oportunidade
- Link direto para inscrição

TIMING: Tarde do dia seguinte à abertura das inscrições

PERSONALIZAÇÃO: Adapte histórias conforme o público e objetivos identificados.

FORMATO: Mensagem motivacional e inspiracional, máximo 300 palavras.`
  },

  36: {
    name: 'O seu futuro começa agora',
    tema: 'Transformação de vida através da decisão',
    objetivo: 'Apelar para o desejo de mudança e medo do arrependimento',
    timing: 'Início da noite do dia seguinte à abertura das inscrições',
    elementos: ['Abordagem emocional', 'credibilidade', 'urgência baseada em escassez', 'apelo ao medo do arrependimento', 'link direto'],
    prompt: `Crie uma mensagem sobre transformação que deve:

OBJETIVO: Apelar para o desejo de mudança e medo do arrependimento

ELEMENTOS OBRIGATÓRIOS:
- Abordagem emocional profunda
- Elementos de credibilidade e autoridade
- Urgência baseada em escassez de vagas/tempo
- Apelo direto ao medo do arrependimento
- Link direto para inscrição

TIMING: Início da noite do dia seguinte à abertura das inscrições

PERSONALIZAÇÃO: Conecte com as dores e desejos identificados no questionário.

FORMATO: Mensagem emocional e transformacional, máximo 350 palavras.`
  },

  // LOTE 6: VENDAS DIA 2 - CONTAGEM REGRESSIVA (12 mensagens)
  37: {
    name: '15 horas para encerrar as inscrições',
    tema: 'Recapitulação de bônus com prazo final',
    objetivo: 'Relembrar o valor total da oferta com urgência de tempo',
    timing: 'Manhã do segundo dia de vendas',
    elementos: ['Lembrete de bônus disponíveis', 'lista completa', 'prazo final específico', 'link direto'],
    prompt: `Crie uma recapitulação de 15 horas que deve:

OBJETIVO: Relembrar o valor total da oferta com urgência de tempo

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva clara (15 horas)
- Lembrete de todos os bônus disponíveis
- Lista completa de valor
- Prazo final específico e definitivo
- Link direto para inscrição

TIMING: Manhã do segundo dia de vendas

PERSONALIZAÇÃO: Recapitule valor total conforme a oferta específica.

FORMATO: Mensagem de recapitulação e urgência, máximo 300 palavras.`
  },

  38: {
    name: '14 horas para encerrar as inscrições',
    tema: 'Contagem regressiva com destaque para o desconto',
    objetivo: 'Enfatizar a perda financeira em não agir',
    timing: '14 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'perda financeira específica', 'condições de pagamento', 'link direto'],
    prompt: `Crie uma contagem de 14 horas que deve:

OBJETIVO: Enfatizar a perda financeira em não agir

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva específica (14 horas)
- Cálculo da perda financeira em não agir
- Destaque para desconto atual
- Condições facilitadas de pagamento
- Link direto para inscrição

TIMING: 14 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Calcule perdas conforme valor real da oferta.

FORMATO: Mensagem focada em perda financeira, máximo 200 palavras.`
  },

  39: {
    name: '12 horas para encerrar as inscrições',
    tema: 'Caso de sucesso inspirador',
    objetivo: 'Criar prova social e mostrar resultados possíveis',
    timing: '12 horas antes do fim do primeiro prazo',
    elementos: ['História de sucesso específica', 'resultados impressionantes', 'métodos acessíveis', 'prazo final', 'link direto'],
    prompt: `Crie um caso de sucesso para 12 horas que deve:

OBJETIVO: Criar prova social e mostrar resultados possíveis

ELEMENTOS OBRIGATÓRIOS:
- História de sucesso específica e inspiradora
- Resultados impressionantes e mensuráveis
- Demonstração de métodos acessíveis
- Conexão com prazo final
- Link direto para inscrição

TIMING: 12 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Use casos de sucesso reais ou representativos do negócio.

FORMATO: Mensagem de prova social inspiradora, máximo 350 palavras.`
  },

  40: {
    name: '10 horas para encerrar as inscrições',
    tema: 'Foco no resultado financeiro',
    objetivo: 'Enfatizar o retorno sobre investimento',
    timing: '10 horas antes do fim do primeiro prazo',
    elementos: ['Destaque para ganhos financeiros', 'acessibilidade para iniciantes', 'prazo final', 'condições de pagamento', 'link direto'],
    prompt: `Crie uma mensagem de ROI para 10 horas que deve:

OBJETIVO: Enfatizar o retorno sobre investimento

ELEMENTOS OBRIGATÓRIOS:
- Destaque claro para ganhos financeiros possíveis
- Demonstração de acessibilidade para iniciantes
- Cálculo ou projeção de retorno
- Lembrete do prazo final
- Condições facilitadas de pagamento

TIMING: 10 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Adapte projeções conforme o negócio e promessas.

FORMATO: Mensagem focada em ROI, máximo 250 palavras.`
  },

  41: {
    name: '8 horas para encerrar as inscrições',
    tema: 'Transformação de situação financeira difícil',
    objetivo: 'Conectar com pessoas em situação financeira desafiadora',
    timing: '8 horas antes do fim do primeiro prazo',
    elementos: ['História de superação', 'urgência temporal', 'condições de pagamento', 'link direto'],
    prompt: `Crie uma mensagem de superação para 8 horas que deve:

OBJETIVO: Conectar com pessoas em situação financeira desafiadora

ELEMENTOS OBRIGATÓRIOS:
- História de superação de dificuldades financeiras
- Urgência temporal clara (8 horas)
- Condições especiais de pagamento
- Tom de esperança e possibilidade
- Link direto para inscrição

TIMING: 8 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Adapte história conforme perfil socioeconômico do público.

FORMATO: Mensagem de superação e esperança, máximo 300 palavras.`
  },

  42: {
    name: '6 horas para encerrar as inscrições',
    tema: 'Contagem regressiva com prova social',
    objetivo: 'Criar efeito manada e urgência',
    timing: '6 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'menção ao número de inscritos', 'consequências claras do prazo', 'link direto'],
    prompt: `Crie uma mensagem de efeito manada para 6 horas que deve:

OBJETIVO: Criar efeito manada e urgência

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva clara (6 horas)
- Menção ao número atual de inscritos
- Consequências claras de perder o prazo
- Criação de efeito manada (outros estão aderindo)
- Link direto para inscrição

TIMING: 6 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Use números realistas de conversão.

FORMATO: Mensagem de prova social e urgência, máximo 200 palavras.`
  },

  43: {
    name: '5 horas para encerrar as inscrições',
    tema: 'Urgência simples e direta',
    objetivo: 'Comunicar apenas o essencial com máxima urgência',
    timing: '5 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'valor da oferta', 'link direto'],
    prompt: `Crie uma mensagem ultra direta para 5 horas que deve:

OBJETIVO: Comunicar apenas o essencial com máxima urgência

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva muito clara (5 horas)
- Mensagem extremamente concisa e direta
- Valor da oferta em destaque
- Link direto sem distrações
- Tom de urgência máxima

TIMING: 5 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Foque apenas no essencial.

FORMATO: Mensagem ultra concisa e urgente, máximo 100 palavras.`
  },

  44: {
    name: '4 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '4 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto'],
    prompt: `Crie uma contagem de 4 horas que deve:

OBJETIVO: Criar máxima urgência nas horas finais

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva destacada (4 horas)
- Mensagem concisa e impactante
- Link direto proeminente
- Tom de última oportunidade
- Foco total na urgência

TIMING: 4 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Mantenha simplicidade e urgência.

FORMATO: Mensagem de urgência final, máximo 80 palavras.`
  },

  45: {
    name: '3 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '3 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto'],
    prompt: `Crie uma contagem de 3 horas que deve:

OBJETIVO: Criar máxima urgência nas horas finais

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva destacada (3 horas)
- Mensagem ainda mais concisa
- Link direto proeminente
- Tom de oportunidade se esgotando
- Foco absoluto na urgência

TIMING: 3 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Mantenha foco na urgência temporal.

FORMATO: Mensagem de urgência crítica, máximo 60 palavras.`
  },

  46: {
    name: '2 horas para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '2 horas antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto'],
    prompt: `Crie uma contagem de 2 horas que deve:

OBJETIVO: Criar máxima urgência nas horas finais

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva em destaque (2 horas)
- Mensagem extremamente concisa
- Link direto em destaque
- Tom de últimas horas
- Urgência absoluta

TIMING: 2 horas antes do fim do primeiro prazo

PERSONALIZAÇÃO: Foque apenas no tempo restante.

FORMATO: Mensagem de urgência extrema, máximo 50 palavras.`
  },

  47: {
    name: '1 hora para encerrar as inscrições',
    tema: 'Contagem regressiva final',
    objetivo: 'Criar máxima urgência nas horas finais',
    timing: '1 hora antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'link direto'],
    prompt: `Crie uma contagem de 1 hora que deve:

OBJETIVO: Criar máxima urgência nas horas finais

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva crítica (1 hora)
- Mensagem ultra concisa
- Link direto prioritário
- Tom de última hora
- Urgência desesperadora

TIMING: 1 hora antes do fim do primeiro prazo

PERSONALIZAÇÃO: Apenas urgência temporal.

FORMATO: Mensagem de urgência final, máximo 40 palavras.`
  },

  48: {
    name: '30 minutos para encerrar as inscrições',
    tema: 'Ultimato final',
    objetivo: 'Capturar decisões de último minuto',
    timing: '30 minutos antes do fim do primeiro prazo',
    elementos: ['Contagem regressiva em minutos', 'mensagem ultra concisa', 'link direto'],
    prompt: `Crie um ultimato de 30 minutos que deve:

OBJETIVO: Capturar decisões de último minuto

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva em minutos (30 min)
- Mensagem ultra concisa e direta
- Link direto exclusivo
- Tom de ultimato final
- Urgência desesperadora máxima

TIMING: 30 minutos antes do fim do primeiro prazo

PERSONALIZAÇÃO: Apenas contagem e link.

FORMATO: Ultimato ultra conciso, máximo 30 palavras.`
  },

  // LOTE 7: EXTENSÃO E ÚLTIMO PRAZO (22 mensagens)
  49: {
    name: 'Bônus ainda válidos',
    tema: 'Extensão especial do prazo',
    objetivo: 'Reabrir a oferta para quem enfrentou problemas',
    timing: 'Manhã após o primeiro prazo',
    elementos: ['Justificativa para extensão', 'urgência de tempo indefinido', 'segunda chance limitada', 'link direto'],
    prompt: `Crie uma reabertura especial que deve:

OBJETIVO: Reabrir a oferta para quem enfrentou problemas

ELEMENTOS OBRIGATÓRIOS:
- Justificativa crível para extensão (problemas técnicos, etc.)
- Urgência indefinida mas limitada
- Menção à segunda chance especial
- Todos os bônus ainda válidos
- Link direto para inscrição

TIMING: Manhã após o primeiro prazo

PERSONALIZAÇÃO: Justifique extensão conforme possíveis problemas reais.

FORMATO: Mensagem de segunda chance, máximo 300 palavras.`
  },

  50: {
    name: 'Aulas saindo do ar',
    tema: 'Acesso limitado ao conteúdo gratuito',
    objetivo: 'Criar urgência baseada na perda de acesso ao conteúdo',
    timing: 'Final da manhã/início da tarde do terceiro dia',
    elementos: ['Prazo para acesso ao conteúdo gratuito', 'links para todas as aulas', 'link para inscrição'],
    prompt: `Crie um aviso sobre aulas saindo do ar que deve:

OBJETIVO: Criar urgência baseada na perda de acesso ao conteúdo

ELEMENTOS OBRIGATÓRIOS:
- Aviso sobre prazo para acessar conteúdo gratuito
- Links para todas as aulas (última chance)
- Conexão entre perder aulas e perder oferta
- Link para inscrição
- Tom de última oportunidade

TIMING: Final da manhã/início da tarde do terceiro dia

PERSONALIZAÇÃO: Adapte conforme plataforma de hospedagem das aulas.

FORMATO: Mensagem de urgência de acesso, máximo 250 palavras.`
  },

  51: {
    name: 'O programa é para você?',
    tema: 'Qualificação de público-alvo',
    objetivo: 'Conectar com perfis específicos de potenciais compradores',
    timing: 'Manhã do quarto dia',
    elementos: ['Pergunta de qualificação', 'perfis específicos atendidos', 'urgência indefinida', 'link direto'],
    prompt: `Crie uma qualificação de público que deve:

OBJETIVO: Conectar com perfis específicos de potenciais compradores

ELEMENTOS OBRIGATÓRIOS:
- Pergunta direta de qualificação
- Lista de perfis específicos atendidos
- Conexão com dores e objetivos
- Urgência indefinida mas presente
- Link direto para inscrição

TIMING: Manhã do quarto dia

PERSONALIZAÇÃO: Detalhe perfis conforme público-alvo identificado.

FORMATO: Mensagem de qualificação direcionada, máximo 300 palavras.`
  },

  52: {
    name: 'Bônus ainda válidos',
    tema: 'Recapitulação completa de bônus',
    objetivo: 'Relembrar o valor total da oferta',
    timing: 'Tarde do quarto dia',
    elementos: ['Lista completa e detalhada de bônus', 'urgência indefinida', 'link direto'],
    prompt: `Crie uma recapitulação completa de bônus que deve:

OBJETIVO: Relembrar o valor total da oferta

ELEMENTOS OBRIGATÓRIOS:
- Lista completa e detalhada de todos os bônus
- Valor de cada bônus destacado
- Valor total da oferta
- Urgência indefinida mas presente
- Link direto para inscrição

TIMING: Tarde do quarto dia

PERSONALIZAÇÃO: Detalhe todos os bônus específicos da oferta.

FORMATO: Mensagem detalhada de valor total, máximo 400 palavras.`
  },

  53: {
    name: 'Aulas liberadas por tempo limitado',
    tema: 'Nova oportunidade para assistir o conteúdo',
    objetivo: 'Reconectar com pessoas que não consumiram o conteúdo',
    timing: 'Final da tarde/início da noite do quarto dia',
    elementos: ['Prazo específico para acesso', 'links para todas as aulas', 'link para inscrição'],
    prompt: `Crie uma liberação temporária das aulas que deve:

OBJETIVO: Reconectar com pessoas que não consumiram o conteúdo

ELEMENTOS OBRIGATÓRIOS:
- Anúncio de liberação temporária especial
- Prazo específico para aproveitar
- Links diretos para todas as aulas
- Conexão entre assistir e se inscrever
- Link para inscrição

TIMING: Final da tarde/início da noite do quarto dia

PERSONALIZAÇÃO: Adapte prazo conforme estratégia de reengajamento.

FORMATO: Mensagem de oportunidade especial, máximo 250 palavras.`
  },

  54: {
    name: 'Destaque de bônus específico',
    tema: 'Foco em um bônus de alto valor',
    objetivo: 'Ressaltar um aspecto específico da oferta',
    timing: 'Manhã do quinto dia',
    elementos: ['Descrição detalhada de um bônus específico', 'benefício transformador', 'urgência indefinida', 'link direto'],
    prompt: `Crie um destaque de bônus específico que deve:

OBJETIVO: Ressaltar um aspecto específico da oferta

ELEMENTOS OBRIGATÓRIOS:
- Foco em um bônus de alto valor
- Descrição detalhada e benefícios
- Demonstração do valor transformador
- Urgência indefinida
- Link direto para inscrição

TIMING: Manhã do quinto dia

PERSONALIZAÇÃO: Escolha o bônus mais atrativo da oferta.

FORMATO: Mensagem focada em valor específico, máximo 300 palavras.`
  },

  55: {
    name: 'O que você vai aprender',
    tema: 'Detalhamento do conteúdo principal',
    objetivo: 'Focar no valor do programa principal, além dos bônus',
    timing: 'Meio da manhã do quinto dia',
    elementos: ['Lista detalhada do conteúdo principal', 'benefícios específicos', 'urgência indefinida', 'link direto'],
    prompt: `Crie um detalhamento do conteúdo principal que deve:

OBJETIVO: Focar no valor do programa principal, além dos bônus

ELEMENTOS OBRIGATÓRIOS:
- Lista detalhada do conteúdo principal
- Benefícios específicos de cada módulo/parte
- Foco no aprendizado e resultados
- Urgência indefinida
- Link direto para inscrição

TIMING: Meio da manhã do quinto dia

PERSONALIZAÇÃO: Detalhe conteúdo específico do programa/curso.

FORMATO: Mensagem educativa e detalhada, máximo 400 palavras.`
  },

  56: {
    name: 'Acesso à equipe de suporte',
    tema: 'Suporte para tomada de decisão',
    objetivo: 'Oferecer ajuda direta para superar objeções finais',
    timing: 'Tarde do quinto dia',
    elementos: ['Oferta de acesso direto à equipe', 'abordagem às objeções comuns', 'urgência para o acesso ao suporte', 'link de contato'],
    prompt: `Crie uma oferta de suporte especializado que deve:

OBJETIVO: Oferecer ajuda direta para superar objeções finais

ELEMENTOS OBRIGATÓRIOS:
- Oferta de acesso direto à equipe especializada
- Abordagem às objeções mais comuns
- Urgência para aproveitar o suporte
- Link direto para contato
- Tom de ajuda personalizada

TIMING: Tarde do quinto dia

PERSONALIZAÇÃO: Adapte tipo de suporte disponível.

FORMATO: Mensagem de suporte personalizado, máximo 250 palavras.`
  },

  57: {
    name: 'Investimento por dia',
    tema: 'Valor percebido versus custo diário',
    objetivo: 'Minimizar a percepção do investimento total',
    timing: 'Final da tarde do quinto dia',
    elementos: ['Comparações de valor', 'custo diluído por dia', 'confronto de objeções financeiras', 'link direto'],
    prompt: `Crie uma análise de investimento diário que deve:

OBJETIVO: Minimizar a percepção do investimento total

ELEMENTOS OBRIGATÓRIOS:
- Cálculo do investimento diluído por dia
- Comparações com gastos cotidianos
- Confronto direto às objeções financeiras
- Demonstração de valor vs custo
- Link direto para inscrição

TIMING: Final da tarde do quinto dia

PERSONALIZAÇÃO: Adapte comparações conforme valor real da oferta.

FORMATO: Mensagem de análise financeira, máximo 300 palavras.`
  },

  58: {
    name: 'Nova forma de pagamento',
    tema: 'Opção adicional para facilitar a compra',
    objetivo: 'Superar objeções relacionadas a forma de pagamento',
    timing: 'Manhã do sexto dia',
    elementos: ['Anúncio da nova opção de pagamento', 'urgência para decisão final', 'lembretes de bônus', 'links para ambas opções de pagamento'],
    prompt: `Crie um anúncio de nova forma de pagamento que deve:

OBJETIVO: Superar objeções relacionadas a forma de pagamento

ELEMENTOS OBRIGATÓRIOS:
- Anúncio de nova opção de pagamento facilitada
- Urgência para decisão final
- Lembretes dos principais bônus
- Links para ambas as opções de pagamento
- Tom de facilidade e acessibilidade

TIMING: Manhã do sexto dia

PERSONALIZAÇÃO: Detalhe opções reais de pagamento disponíveis.

FORMATO: Mensagem de facilidade de pagamento, máximo 250 palavras.`
  },

  59: {
    name: 'Comece do zero',
    tema: 'Acessibilidade para iniciantes absolutos',
    objetivo: 'Conectar com pessoas sem experiência prévia',
    timing: 'Meio da manhã do sexto dia',
    elementos: ['Ênfase na jornada completa', 'adequação para iniciantes', 'seleção de bônus destacados', 'urgência indefinida', 'links para opções de pagamento'],
    prompt: `Crie uma mensagem para iniciantes que deve:

OBJETIVO: Conectar com pessoas sem experiência prévia

ELEMENTOS OBRIGATÓRIOS:
- Ênfase na jornada completa desde o zero
- Adequação específica para iniciantes
- Seleção de bônus mais relevantes para iniciantes
- Urgência indefinida mas presente
- Links para opções de pagamento

TIMING: Meio da manhã do sexto dia

PERSONALIZAÇÃO: Foque em elementos básicos e fundamentais.

FORMATO: Mensagem acessível e encorajadora, máximo 300 palavras.`
  },

  60: {
    name: 'Confronto de medos',
    tema: 'Superação do medo como obstáculo',
    objetivo: 'Abordar diretamente o medo como objeção principal',
    timing: 'Tarde do sexto dia',
    elementos: ['Confronto direto ao medo comum', 'histórias de superação', 'riscos de não agir', 'link direto'],
    prompt: `Crie um confronto direto aos medos que deve:

OBJETIVO: Abordar diretamente o medo como objeção principal

ELEMENTOS OBRIGATÓRIOS:
- Confronto direto ao medo mais comum do público
- Histórias de superação de medos similares
- Demonstração dos riscos de não agir
- Tom de encorajamento e superação
- Link direto para inscrição

TIMING: Tarde do sexto dia

PERSONALIZAÇÃO: Identifique medos específicos do público-alvo.

FORMATO: Mensagem de confronto e superação, máximo 350 palavras.`
  },

  61: {
    name: 'Quais são suas desculpas?',
    tema: 'Confronto direto a objeções',
    objetivo: 'Desafiar indecisão com abordagem provocativa',
    timing: 'Manhã do sétimo dia',
    elementos: ['Questionamento direto sobre desculpas', 'transferência de responsabilidade', 'links para todas opções de pagamento'],
    prompt: `Crie um confronto direto às desculpas que deve:

OBJETIVO: Desafiar indecisão com abordagem provocativa

ELEMENTOS OBRIGATÓRIOS:
- Questionamento direto sobre desculpas comuns
- Transferência de responsabilidade para o destinatário
- Tom provocativo mas não agressivo
- Links para todas as opções de pagamento
- Desafio à zona de conforto

TIMING: Manhã do sétimo dia

PERSONALIZAÇÃO: Adapte desculpas conforme objeções comuns do público.

FORMATO: Mensagem provocativa e desafiadora, máximo 250 palavras.`
  },

  62: {
    name: 'Divisor de águas',
    tema: 'Transformação de vida através da decisão',
    objetivo: 'Enfatizar o impacto da decisão na trajetória de vida',
    timing: 'Meio da manhã do sétimo dia',
    elementos: ['Metáfora de divisor de águas', 'acessibilidade para todos perfis', 'urgência indefinida', 'links para opções de pagamento'],
    prompt: `Crie uma mensagem sobre divisor de águas que deve:

OBJETIVO: Enfatizar o impacto da decisão na trajetória de vida

ELEMENTOS OBRIGATÓRIOS:
- Metáfora clara de divisor de águas na vida
- Demonstração de acessibilidade para todos os perfis
- Urgência indefinida mas presente
- Links para todas as opções de pagamento
- Tom de momento decisivo

TIMING: Meio da manhã do sétimo dia

PERSONALIZAÇÃO: Conecte com objetivos de transformação identificados.

FORMATO: Mensagem de momento decisivo, máximo 300 palavras.`
  },

  63: {
    name: 'Bônus não garantidos na próxima turma',
    tema: 'Exclusividade da oferta atual',
    objetivo: 'Criar medo de perder elementos específicos da oferta',
    timing: 'Tarde do sétimo dia',
    elementos: ['Incerteza sobre disponibilidade futura', 'destaque para item exclusivo da oferta atual', 'urgência para ação imediata', 'links para opções de pagamento'],
    prompt: `Crie um aviso sobre exclusividade que deve:

OBJETIVO: Criar medo de perder elementos específicos da oferta

ELEMENTOS OBRIGATÓRIOS:
- Incerteza real sobre disponibilidade futura dos bônus
- Destaque para itens exclusivos da turma atual
- Urgência para ação imediata
- Links para opções de pagamento
- Tom de exclusividade genuína

TIMING: Tarde do sétimo dia

PERSONALIZAÇÃO: Destaque bônus que realmente podem não se repetir.

FORMATO: Mensagem de exclusividade, máximo 250 palavras.`
  },

  64: {
    name: 'Tempo acabando novamente',
    tema: 'Anúncio de prazo final definitivo',
    objetivo: 'Estabelecer prazo final crível após extensão',
    timing: 'Manhã do oitavo dia',
    elementos: ['Aviso claro sobre prazo final', 'data e hora específicas', 'links para opções de pagamento'],
    prompt: `Crie um anúncio de prazo final definitivo que deve:

OBJETIVO: Estabelecer prazo final crível após extensão

ELEMENTOS OBRIGATÓRIOS:
- Aviso claro e definitivo sobre prazo final
- Data e hora específicas não negociáveis
- Justificativa crível para prazo definitivo
- Links para opções de pagamento
- Tom de última oportunidade real

TIMING: Manhã do oitavo dia

PERSONALIZAÇÃO: Estabeleça prazo realista e definitivo.

FORMATO: Mensagem de prazo final definitivo, máximo 200 palavras.`
  },

  65: {
    name: 'Menos de 29 horas para o fim',
    tema: 'Contagem regressiva em horas',
    objetivo: 'Criar urgência baseada em prazo específico',
    timing: 'Meio da manhã do oitavo dia',
    elementos: ['Contagem regressiva em horas', 'consequências de perder a oferta', 'links para opções de pagamento'],
    prompt: `Crie uma contagem regressiva de 29 horas que deve:

OBJETIVO: Criar urgência baseada em prazo específico

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva específica (menos de 29 horas)
- Consequências claras de perder a oferta
- Links diretos para opções de pagamento
- Tom de urgência crescente
- Foco na escassez de tempo

TIMING: Meio da manhã do oitavo dia

PERSONALIZAÇÃO: Mantenha foco na contagem temporal.

FORMATO: Mensagem de contagem urgente, máximo 150 palavras.`
  },

  66: {
    name: 'Destaque de bônus específico 1',
    tema: 'Foco em bônus de alto valor',
    objetivo: 'Ressaltar aspectos específicos da oferta',
    timing: 'Ao longo do oitavo dia',
    elementos: ['Descrição detalhada de bônus específicos', 'benefícios transformadores', 'links para opções de pagamento'],
    prompt: `Crie um destaque de bônus específico que deve:

OBJETIVO: Ressaltar aspectos específicos da oferta

ELEMENTOS OBRIGATÓRIOS:
- Foco em um bônus específico de alto valor
- Descrição detalhada e benefícios transformadores
- Demonstração do valor único deste bônus
- Links para opções de pagamento
- Tom de valor exclusivo

TIMING: Ao longo do oitavo dia

PERSONALIZAÇÃO: Escolha bônus de maior apelo.

FORMATO: Mensagem de valor específico, máximo 250 palavras.`
  },

  67: {
    name: 'Destaque de bônus específico 2',
    tema: 'Foco em bônus de alto valor',
    objetivo: 'Ressaltar aspectos específicos da oferta',
    timing: 'Ao longo do oitavo dia',
    elementos: ['Descrição detalhada de bônus específicos', 'benefícios transformadores', 'links para opções de pagamento'],
    prompt: `Crie outro destaque de bônus específico que deve:

OBJETIVO: Ressaltar aspectos específicos da oferta

ELEMENTOS OBRIGATÓRIOS:
- Foco em outro bônus específico de alto valor
- Descrição detalhada e benefícios únicos
- Diferenciação do bônus anterior
- Links para opções de pagamento
- Tom de valor complementar

TIMING: Ao longo do oitavo dia

PERSONALIZAÇÃO: Escolha segundo bônus mais atrativo.

FORMATO: Mensagem de valor complementar, máximo 250 palavras.`
  },

  68: {
    name: 'Série de bônus específicos 1',
    tema: 'Foco sequencial em múltiplos bônus',
    objetivo: 'Aumentar valor percebido com diversidade de ofertas',
    timing: 'Ao longo do último dia',
    elementos: ['Apresentação de diferentes bônus', 'benefícios específicos de cada um', 'links para opções de pagamento'],
    prompt: `Crie uma série de bônus diversificados que deve:

OBJETIVO: Aumentar valor percebido com diversidade de ofertas

ELEMENTOS OBRIGATÓRIOS:
- Apresentação de 3-4 bônus diferentes
- Benefícios específicos e únicos de cada um
- Demonstração da diversidade de valor
- Links para opções de pagamento
- Tom de abundância de valor

TIMING: Ao longo do último dia

PERSONALIZAÇÃO: Mostre variedade real de bônus.

FORMATO: Mensagem de diversidade de valor, máximo 300 palavras.`
  },

  69: {
    name: 'Série de bônus específicos 2',
    tema: 'Foco sequencial em múltiplos bônus',
    objetivo: 'Aumentar valor percebido com diversidade de ofertas',
    timing: 'Ao longo do último dia',
    elementos: ['Apresentação de diferentes bônus', 'benefícios específicos de cada um', 'links para opções de pagamento'],
    prompt: `Crie uma segunda série de bônus que deve:

OBJETIVO: Aumentar valor percebido com diversidade de ofertas

ELEMENTOS OBRIGATÓRIOS:
- Apresentação de outros bônus complementares
- Benefícios específicos não mencionados antes
- Demonstração do valor total crescente
- Links para opções de pagamento
- Tom de última chance para tanto valor

TIMING: Ao longo do último dia

PERSONALIZAÇÃO: Complete a apresentação de todos os bônus.

FORMATO: Mensagem de valor total, máximo 300 palavras.`
  },

  70: {
    name: 'Contagem regressiva final',
    tema: 'Contagem regressiva das últimas horas',
    objetivo: 'Criar urgência máxima nas horas finais',
    timing: 'Últimas 12, 8, 6, 4, 2 e 1 hora',
    elementos: ['Contagem regressiva', 'mensagem concisa', 'links para opções de pagamento'],
    prompt: `Crie uma contagem regressiva final que deve:

OBJETIVO: Criar urgência máxima nas horas finais

ELEMENTOS OBRIGATÓRIOS:
- Contagem regressiva específica das últimas horas
- Mensagem extremamente concisa e urgente
- Links diretos e proeminentes para pagamento
- Tom de urgência desesperadora
- Foco total na ação imediata

TIMING: Últimas 12, 8, 6, 4, 2 e 1 hora

PERSONALIZAÇÃO: Adapte conforme hora específica restante.

FORMATO: Mensagem de urgência máxima, máximo 50 palavras.`
  }
};

/**
 * Get template for specific message number
 */
function getMessageTemplate(messageNumber) {
  const template = MESSAGE_TEMPLATES[messageNumber];
  if (!template) {
    throw new Error(`Template for message ${messageNumber} not found`);
  }
  return template;
}

/**
 * Get all templates for a specific phase/lote
 */
function getTemplatesByPhase(phase) {
  const { getMessagesByPhase } = require('./messages-phases');
  const messages = getMessagesByPhase(phase);
  
  return messages.map(message => ({
    number: message.number,
    template: getMessageTemplate(message.number),
    phaseInfo: message
  }));
}

/**
 * Get total number of templates
 */
function getTotalTemplates() {
  return Object.keys(MESSAGE_TEMPLATES).length;
}

/**
 * Check if template exists for message number
 */
function hasTemplate(messageNumber) {
  return MESSAGE_TEMPLATES.hasOwnProperty(messageNumber);
}

/**
 * Get message numbers for a specific phase/lote
 */
function getMessageNumbersByPhase(phase) {
  const { getMessagesByPhase } = require('./messages-phases');
  const messages = getMessagesByPhase(phase);
  return messages.map(message => message.number);
}

module.exports = {
  MESSAGE_TEMPLATES,
  getMessageTemplate,
  getTemplatesByPhase,
  getMessageNumbersByPhase,
  getTotalTemplates,
  hasTemplate
}; 