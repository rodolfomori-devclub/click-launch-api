const fetch = require('node-fetch');

// Simula dados que poderiam vir do localStorage
const testAnswers = {
  "email-1": "Curso de Marketing Digital Avançado",
  "email-2": "Ensinar estratégias de marketing digital para empreendedores que querem aumentar suas vendas online",
  "email-3": "Empreendedores e pequenos empresários que já têm um negócio mas querem melhorar suas vendas online"
};

const testQuestions = [
  {
    "id": "email-1",
    "category": "Produto/Serviço",
    "question": "Qual é o nome do seu produto/curso/serviço que será lançado?"
  },
  {
    "id": "email-2", 
    "category": "Produto/Serviço",
    "question": "Qual é o objetivo principal do seu produto? O que ele ensina ou resolve?"
  },
  {
    "id": "email-3",
    "category": "Público-Alvo",
    "question": "Quem é seu público-alvo ideal? Seja específico sobre o perfil."
  }
];

async function testEmailsWithRealAPI() {
  try {
    console.log('🧪 Testando GERAÇÃO REAL com NOVO FORMATO JSON...\n');
    console.log('⚠️  ATENÇÃO: Isso VAI CONSUMIR créditos da API OpenAI!');
    console.log('📋 Assistente que será usado:', process.env?.OPENAI_ASSISTANT_ID_EMAILS || 'asst_vQoS1OYZ4YM6lEj7NmmnAN11');
    console.log('=' .repeat(80));
    
    const response = await fetch('http://localhost:3001/api/emails/generate-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: testAnswers,
        questions: testQuestions
      })
    });

    console.log('📡 Resposta HTTP recebida, processando stream...\n');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let contentReceived = '';
    let eventCount = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            eventCount++;
            
            if (data.type === 'metadata') {
              console.log('📊 Metadata recebida:', data.data);
            } else if (data.type === 'content') {
              contentReceived += data.data;
              process.stdout.write(data.data); // Mostra em tempo real
            } else if (data.type === 'complete') {
              console.log('\n\n✅ GERAÇÃO COMPLETA!');
              console.log(`📏 Total de conteúdo recebido: ${contentReceived.length} caracteres`);
              console.log(`📨 Total de eventos processados: ${eventCount}`);
            } else if (data.type === 'error') {
              throw new Error(data.error);
            }
          } catch (e) {
            console.error('❌ Erro ao processar SSE:', e);
          }
        }
      }
    }

  } catch (error) {
    console.error('💥 ERRO:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando em http://localhost:3001');
  }
}

async function testFormatOnly() {
  try {
    console.log('🧪 Testando apenas NOVO FORMATO JSON (sem consumir API)...\n');
    
    const response = await fetch('http://localhost:3001/api/emails/debug-format', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: testAnswers,
        questions: testQuestions
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ SUCCESS!\n');
      console.log('📋 ASSISTENTE USADO:', result.assistantId);
      console.log('📊 ESTATÍSTICAS:');
      console.log(`   - Total de perguntas: ${result.data.totalQuestions}`);
      console.log(`   - Perguntas respondidas: ${result.data.answeredQuestions}`);
      console.log(`   - Taxa de conclusão: ${result.data.completionRate}%`);
      console.log(`   - Tamanho do payload: ${result.data.payloadSize} caracteres\n`);
      
      console.log('=' .repeat(80));
      console.log('📤 NOVO PAYLOAD JSON ENVIADO AO ASSISTENTE:');
      console.log('=' .repeat(80));
      console.log(JSON.stringify(result.data.payload, null, 2));
      console.log('=' .repeat(80));
      
    } else {
      console.error('❌ ERRO:', result.error);
    }

  } catch (error) {
    console.error('💥 ERRO DE CONEXÃO:', error.message);
  }
}

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);

if (args.includes('--real') || args.includes('-r')) {
  testEmailsWithRealAPI();
} else {
  console.log('📋 Executando teste de NOVO FORMATO JSON apenas (sem API)');
  console.log('💡 Para testar com API real: node test-emails-debug.js --real\n');
  testFormatOnly();
} 