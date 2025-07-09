/**
 * Demo Service - Simula geração de emails para demonstração
 * Use quando as API keys não estão disponíveis
 */

const { getTemplatesByPhase, getGuidelinesForPhase } = require('../data/email-templates');
const { getEmailsByPhase } = require('../data/launch-phases');

class DemoService {
  constructor() {
    this.isDemo = true;
  }

  /**
   * Simula geração de emails com dados de demonstração
   */
  async generateEmailsForPhaseStream(phase, questionsAndAnswers, previousPhasesContext = {}, onChunk) {
    const startTime = Date.now();
    
    try {
      console.log(`[Demo Service] Simulando geração da fase: ${phase}`);
      
      const templates = getTemplatesByPhase(phase);
      const guidelines = getGuidelinesForPhase(phase);
      
      console.log(`[Demo Service] Fase ${phase}: ${templates.length} emails`);
      
      let generatedContent = '';
      
      // Simular geração de cada email da fase
      for (const template of templates) {
        const emailContent = this.generateDemoEmail(template, questionsAndAnswers);
        generatedContent += emailContent + '\n\n---\n\n';
        
        // Simular streaming enviando chunks
        if (onChunk) {
          const chunks = emailContent.match(/.{1,100}/g) || [emailContent];
          for (const chunk of chunks) {
            onChunk(chunk);
            // Simular delay de streaming
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
      }
      
      const duration = Date.now() - startTime;
      console.log(`[Demo Service] Geração simulada completada em ${duration}ms`);
      
      return generatedContent;
    } catch (error) {
      console.error(`[Demo Service] Erro na simulação:`, error);
      throw error;
    }
  }

  /**
   * Gera um email de demonstração baseado no template
   */
  generateDemoEmail(template, questionsAndAnswers) {
    const { number, name, template: framework } = template;
    
    // Extrair dados do questionário ou usar valores padrão
    const data = {
      nomeCompleto: questionsAndAnswers.nomeCompleto || 'João Silva',
      produto: questionsAndAnswers.produto || 'Curso de Marketing Digital',
      publicoAlvo: questionsAndAnswers.publicoAlvo || 'empreendedores',
      beneficioPrincipal: questionsAndAnswers.beneficioPrincipal || 'dominar o marketing digital',
      nomeEvento: questionsAndAnswers.nomeEvento || 'Semana do Marketing Digital',
      horario: questionsAndAnswers.horario || '19:00',
      fusoHorario: questionsAndAnswers.fusoHorario || 'UTC-3',
      preco: questionsAndAnswers.preco || 'R$ 497',
      desconto: questionsAndAnswers.desconto || 'R$ 200',
      nicho: questionsAndAnswers.nicho || 'marketing digital',
      problema1: questionsAndAnswers.problema1 || 'não saber por onde começar',
      problema2: questionsAndAnswers.problema2 || 'perder dinheiro com anúncios',
      problema3: questionsAndAnswers.problema3 || 'não conseguir atrair clientes',
      solucao: questionsAndAnswers.solucao || 'sistema completo de marketing',
      bônus1: questionsAndAnswers.bônus1 || 'Templates de alta conversão',
      bônus2: questionsAndAnswers.bônus2 || 'Planilha de métricas',
      bônus3: questionsAndAnswers.bônus3 || 'Grupo VIP',
      historia: questionsAndAnswers.historia || 'Uma jornada de transformação incrível',
      depoimento: questionsAndAnswers.depoimento || 'Resultados surpreendentes em 30 dias',
      urgencia: questionsAndAnswers.urgencia || 'Vagas limitadas',
      escassez: questionsAndAnswers.escassez || 'Última turma de 2024'
    };
    
    // Aplicar os dados no template
    let personalizedContent = framework.framework;
    
    // Substituir placeholders comuns
    const replacements = {
      '[NOME]': data.nomeCompleto,
      '[SEU NOME]': data.nomeCompleto,
      '[PRODUTO]': data.produto,
      '[NOME DO PRODUTO]': data.produto,
      '[NOME DO EVENTO]': data.nomeEvento,
      '[PÚBLICO-ALVO]': data.publicoAlvo,
      '[BENEFÍCIO PRINCIPAL]': data.beneficioPrincipal,
      '[HORÁRIO]': data.horario,
      '[FUSO HORÁRIO]': data.fusoHorario,
      '[PREÇO]': data.preco,
      '[DESCONTO]': data.desconto,
      '[NICHO]': data.nicho,
      '[PROBLEMA1]': data.problema1,
      '[PROBLEMA2]': data.problema2,
      '[PROBLEMA3]': data.problema3,
      '[SOLUÇÃO]': data.solucao,
      '[BÔNUS1]': data.bônus1,
      '[BÔNUS2]': data.bônus2,
      '[BÔNUS3]': data.bônus3,
      '[HISTÓRIA]': data.historia,
      '[DEPOIMENTO]': data.depoimento,
      '[URGÊNCIA]': data.urgencia,
      '[ESCASSEZ]': data.escassez,
      '[SAUDAÇÃO FINAL]': 'Abraços',
      '[BOTÃO: QUERO ENTRAR]': '🔗 CLIQUE AQUI PARA ENTRAR',
      '[BOTÃO: QUERO PARTICIPAR]': '🔗 CLIQUE AQUI PARA PARTICIPAR',
      '[BOTÃO: QUERO ASSISTIR]': '🔗 CLIQUE AQUI PARA ASSISTIR',
      '[BOTÃO: QUERO ATIVAR]': '🔗 CLIQUE AQUI PARA ATIVAR',
      '[BOTÃO: QUERO SER VIP]': '🔗 CLIQUE AQUI PARA SER VIP'
    };
    
    Object.entries(replacements).forEach(([placeholder, value]) => {
      personalizedContent = personalizedContent.replace(new RegExp(placeholder.replace(/[\[\]]/g, '\\$&'), 'g'), value);
    });
    
    // Adicionar cabeçalho do email
    const subject = framework.subject || `Email ${number} - ${name}`;
    const finalContent = `EMAIL ${number} - ${name}\nASSUNTO: ${subject}\n\n${personalizedContent}`;
    
    return finalContent;
  }

  /**
   * Gera contexto de fase (para compatibilidade)
   */
  generatePhaseContext(phase, generatedContent) {
    const emailCount = (generatedContent.match(/EMAIL \d+/g) || []).length;
    const wordCount = generatedContent.split(/\s+/).length;
    
    return {
      phase,
      emailCount,
      wordCount,
      summary: `Fase ${phase} simulada com ${emailCount} emails gerados (DEMONSTRAÇÃO).`,
      generatedAt: new Date().toISOString(),
      isDemo: true
    };
  }

  /**
   * Teste de conexão (sempre retorna true para demo)
   */
  async testConnection() {
    console.log('[Demo Service] Simulando teste de conexão...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
}

module.exports = DemoService;