#!/usr/bin/env node

/**
 * Teste rápido da API key do Claude
 * Usage: node test-api-key.js
 */

require('dotenv').config();
const ClaudeService = require('./src/services/claude.service');

async function testClaudeApiKey() {
  console.log('🔑 Testando API key do Claude...\n');
  
  // Verificar se a API key está configurada
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.log('❌ CLAUDE_API_KEY não encontrada no arquivo .env');
    console.log('💡 Adicione CLAUDE_API_KEY=sua-api-key no arquivo .env');
    return false;
  }
  
  console.log('✅ CLAUDE_API_KEY encontrada:', apiKey.substring(0, 20) + '...');
  
  // Testar conexão
  try {
    const claudeService = new ClaudeService();
    console.log('📡 Testando conexão com Claude...');
    
    const isConnected = await claudeService.testConnection();
    
    if (isConnected) {
      console.log('✅ Conexão com Claude: SUCESSO');
      console.log('🚀 Você pode usar AI_PROVIDER_EMAILS=claude');
      return true;
    } else {
      console.log('❌ Conexão com Claude: FALHOU');
      console.log('💡 Verifique se a API key é válida');
      return false;
    }
  } catch (error) {
    console.log('❌ Erro na conexão:', error.message);
    
    if (error.message.includes('401') || error.message.includes('authentication')) {
      console.log('\n🔧 Solução:');
      console.log('1. Verifique se a API key é válida no console Anthropic');
      console.log('2. Gere uma nova API key em: https://console.anthropic.com/');
      console.log('3. Atualize o arquivo .env com a nova key');
      console.log('4. Ou altere AI_PROVIDER_EMAILS=openai para usar OpenAI');
    }
    
    return false;
  }
}

async function testOpenAIApiKey() {
  console.log('\n🔑 Testando API key do OpenAI...\n');
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('❌ OPENAI_API_KEY não encontrada no arquivo .env');
    return false;
  }
  
  console.log('✅ OPENAI_API_KEY encontrada:', apiKey.substring(0, 20) + '...');
  
  // Teste básico (apenas verificar se a key existe)
  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: apiKey });
    
    console.log('📡 Testando conexão com OpenAI...');
    // Teste simples de listagem de modelos
    const response = await openai.models.list();
    
    if (response.data && response.data.length > 0) {
      console.log('✅ Conexão com OpenAI: SUCESSO');
      console.log('🚀 Você pode usar AI_PROVIDER_EMAILS=openai');
      return true;
    } else {
      console.log('❌ Conexão com OpenAI: FALHOU');
      return false;
    }
  } catch (error) {
    console.log('❌ Erro na conexão OpenAI:', error.message);
    return false;
  }
}

async function checkCurrentConfiguration() {
  console.log('\n⚙️  Configuração atual:\n');
  
  const aiProvider = process.env.AI_PROVIDER_EMAILS || process.env.AI_PROVIDER || 'openai';
  console.log(`🤖 AI_PROVIDER_EMAILS: ${aiProvider}`);
  
  const claudeModel = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
  console.log(`🧠 CLAUDE_MODEL: ${claudeModel}`);
  
  const assistantId = process.env.OPENAI_ASSISTANT_ID_EMAILS;
  console.log(`🤖 OPENAI_ASSISTANT_ID_EMAILS: ${assistantId ? assistantId.substring(0, 20) + '...' : 'NOT SET'}`);
  
  console.log('\n📋 Recomendações:');
  
  if (aiProvider === 'claude') {
    console.log('✅ Configurado para usar Claude (sistema de fases)');
    console.log('⚠️  Certifique-se de que a API key do Claude é válida');
  } else {
    console.log('✅ Configurado para usar OpenAI (sistema de lotes)');
    console.log('💡 Para usar fases, configure: AI_PROVIDER_EMAILS=claude');
  }
}

async function main() {
  console.log('🧪 Teste de Configuração de API Keys\n');
  console.log('=' .repeat(50));
  
  await checkCurrentConfiguration();
  
  console.log('\n' + '=' .repeat(50));
  
  const claudeWorking = await testClaudeApiKey();
  const openaiWorking = await testOpenAIApiKey();
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 Resultado Final:\n');
  
  if (claudeWorking && openaiWorking) {
    console.log('🎉 Ambos os provedores estão funcionando!');
    console.log('💡 Recomendação: Use Claude para melhor performance');
    console.log('   Configure: AI_PROVIDER_EMAILS=claude');
  } else if (claudeWorking) {
    console.log('✅ Apenas Claude está funcionando');
    console.log('   Configure: AI_PROVIDER_EMAILS=claude');
  } else if (openaiWorking) {
    console.log('✅ Apenas OpenAI está funcionando');
    console.log('   Configure: AI_PROVIDER_EMAILS=openai');
  } else {
    console.log('❌ Nenhum provedor está funcionando');
    console.log('🔧 Verifique as API keys nos arquivos .env');
  }
  
  console.log('\n📚 Para mais informações, consulte:');
  console.log('- CLAUDE_API_KEY_GUIDE.md');
  console.log('- CLAUDE_PHASE_SYSTEM_DOCUMENTATION.md');
}

// Executar teste
main().catch(console.error);