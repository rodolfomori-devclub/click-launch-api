/**
 * Test Script for Phase-Based Email Generation System
 * 
 * This script tests the new Claude integration and phase-based generation
 * Run with: node test-phase-system.js
 */

require('dotenv').config();
const ClaudeService = require('./src/services/claude.service');
const { getAllPhases, getEmailsByPhase } = require('./src/data/launch-phases');

async function testPhaseSystem() {
  console.log('🧪 Testing Phase-Based Email Generation System\n');
  
  // Test 1: Basic connection test
  console.log('=== Test 1: Claude Connection ===');
  const claudeService = new ClaudeService();
  
  try {
    const isConnected = await claudeService.testConnection();
    console.log(`${isConnected ? '✅' : '⚠️'} Claude connection: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
    
    if (!isConnected) {
      console.log('⚠️ Connection failed. This is expected if using a test API key.');
      console.log('📝 The system architecture and configuration tests will continue...\n');
    } else {
      console.log('✅ Claude API is working correctly\n');
    }
  } catch (error) {
    console.log('⚠️ Connection test error (expected with test API key):', error.message);
    console.log('📝 Continuing with architecture tests...\n');
  }
  
  // Test 2: Phase configuration
  console.log('=== Test 2: Phase Configuration ===');
  try {
    const phases = getAllPhases();
    console.log(`📋 Total phases: ${phases.length}`);
    
    phases.forEach(phase => {
      const emails = getEmailsByPhase(phase.key);
      console.log(`  ${phase.key}: ${emails.length} emails (${emails.map(e => e.number).join(', ')})`);
    });
    
    console.log('✅ Phase configuration loaded successfully\n');
  } catch (error) {
    console.error('❌ Phase configuration error:', error.message);
    return;
  }
  
  // Test 3: Sample questionnaire data
  console.log('=== Test 3: Sample Generation Test ===');
  
  const sampleQuestionsAndAnswers = {
    nomeCompleto: 'João Silva',
    produto: 'Curso de Marketing Digital',
    nicho: 'marketing digital',
    publicoAlvo: 'empreendedores e profissionais de marketing',
    beneficioPrincipal: 'dominar estratégias de marketing digital',
    transformacao: 'sair do zero e criar campanhas que vendem',
    problema1: 'não saber por onde começar no marketing digital',
    problema2: 'perder dinheiro com anúncios que não convertem',
    problema3: 'não conseguir atrair clientes qualificados',
    solucao: 'sistema completo de marketing digital do zero ao avançado',
    preco: 'R$ 497',
    desconto: 'R$ 200',
    bônus1: 'Templates de anúncios de alta conversão',
    bônus2: 'Planilha de métricas essenciais',
    bônus3: 'Grupo VIP no Telegram',
    historia: 'Há 3 anos, estava falido depois de investir todas as economias em anúncios que não davam resultado. Hoje, gero mais de R$ 50k/mês com marketing digital.',
    depoimento: 'Maria conseguiu seus primeiros R$ 10k em 30 dias aplicando o método',
    urgencia: 'Turma limitada a 100 alunos',
    escassez: 'Última turma de 2024 com esse preço'
  };
  
  try {
    // Test single phase generation
    console.log('📧 Testing phase generation system architecture...');
    
    // Test prompt building without actual API call
    const { getTemplatesByPhase, getGuidelinesForPhase } = require('./src/data/email-templates');
    const templates = getTemplatesByPhase('pre-launch');
    const guidelines = getGuidelinesForPhase('pre-launch');
    
    console.log(`📋 Phase templates loaded: ${templates.length} emails`);
    console.log(`📋 Guidelines loaded: ${guidelines.general}`);
    
    // Test prompt building
    const prompt = claudeService.buildPhasePrompt('pre-launch', templates, guidelines, sampleQuestionsAndAnswers, {});
    console.log(`📝 Generated prompt: ${prompt.length} characters`);
    
    // Test context generation
    const mockContent = "EMAIL 1 - Teste\nASSUNTO: Teste\nConteúdo do email de teste...";
    const context = claudeService.generatePhaseContext('pre-launch', mockContent);
    console.log('📊 Context generation:', context);
    
    console.log('\n✅ Phase generation architecture test passed');
    
  } catch (error) {
    console.error('❌ Architecture test error:', error.message);
    console.error('Stack:', error.stack);
  }
  
  // Test 4: Environment configuration
  console.log('\n=== Test 4: Environment Configuration ===');
  
  const requiredEnvVars = [
    'CLAUDE_API_KEY',
    'CLAUDE_MODEL',
    'AI_PROVIDER_EMAILS'
  ];
  
  let envOk = true;
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${varName === 'CLAUDE_API_KEY' ? '[HIDDEN]' : value}`);
    } else {
      console.log(`❌ ${varName}: Not set`);
      envOk = false;
    }
  });
  
  if (envOk) {
    console.log('\n✅ Environment configuration is complete');
  } else {
    console.log('\n❌ Environment configuration is incomplete');
  }
  
  console.log('\n🎉 Phase-based email generation system test completed!');
  console.log('\nTo use the system:');
  console.log('1. Set AI_PROVIDER_EMAILS=claude in .env');
  console.log('2. Send POST request to /api/emails/generate-stream');
  console.log('3. Include "phase" parameter for single phase generation');
  console.log('4. Omit "phase" parameter for full sequence generation');
}

// Run the test
testPhaseSystem().catch(console.error);