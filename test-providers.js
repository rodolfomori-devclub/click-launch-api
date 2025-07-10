require('dotenv').config();
const AIProviderFactory = require('./src/services/ai-provider.factory');

async function testProviders() {
  console.log('🧪 Testando provedores de IA...\n');
  
  // Obter informações dos provedores
  const providerInfo = AIProviderFactory.getProviderInfo();
  console.log('📊 Informações dos Provedores:');
  console.log(JSON.stringify(providerInfo, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Testar Claude
  console.log('🧠 Testando Claude...');
  try {
    const claudeTest = await AIProviderFactory.testProvider('claude');
    console.log(`✅ Claude: ${claudeTest ? 'Funcionando' : 'Falhou'}`);
  } catch (error) {
    console.log(`❌ Claude: ${error.message}`);
  }
  
  // Testar OpenAI
  console.log('🤖 Testando OpenAI...');
  try {
    const openaiTest = await AIProviderFactory.testProvider('openai');
    console.log(`✅ OpenAI: ${openaiTest ? 'Funcionando' : 'Falhou'}`);
  } catch (error) {
    console.log(`❌ OpenAI: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Testar criação de serviços
  console.log('🏭 Testando criação de serviços...');
  
  try {
    console.log('📧 Criando serviço de emails para Claude...');
    const claudeService = AIProviderFactory.createEmailsProvider('claude');
    console.log(`✅ Claude service criado: ${claudeService.constructor.name}`);
  } catch (error) {
    console.log(`❌ Erro ao criar Claude service: ${error.message}`);
  }
  
  try {
    console.log('📧 Criando serviço de emails para OpenAI...');
    const openaiService = AIProviderFactory.createEmailsProvider('openai');
    console.log(`✅ OpenAI service criado: ${openaiService.constructor.name}`);
  } catch (error) {
    console.log(`❌ Erro ao criar OpenAI service: ${error.message}`);
  }
  
  console.log('\n🎯 Teste concluído!');
}

// Executar teste
testProviders().catch(console.error);