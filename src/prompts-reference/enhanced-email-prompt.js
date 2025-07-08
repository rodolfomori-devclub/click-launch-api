const createEmailGenerationPrompt = (answers, questions, batchInfo = null) => {
  // Definir estrutura dos lotes (29 emails divididos em 6 lotes)
  const BATCH_STRUCTURE = {
    1: { range: "1-5", emails: "1-5", description: "Pré-lançamento + Aula 1 (Confirmação, Véspera, Manhã, 1h antes, Início)" },
    2: { range: "6-10", emails: "6-10", description: "Pós Aula 1 + Aula 2 (Recap, 1h antes Aula 2, Início Aula 2, Antecipação, 1h antes Aula 3)" },
    3: { range: "11-15", emails: "11-15", description: "Aula 3 + Abertura Vendas (Início Aula 3, Lista VIP, Manhã Abertura, Preparação VIP, Abertura)" },
    4: { range: "16-20", emails: "16-20", description: "Vendas Meio Período (Feedback, Lembrete, Objeções, Diferencial, 8h antes)" },
    5: { range: "21-25", emails: "21-25", description: "Urgência Final (5h antes, 2h antes, Reabertura, Conteúdo Liberado, Qualificação)" },
    6: { range: "26-29", emails: "26-29", description: "Facilidades Finais (Pagamento Alternativo, Custo Oportunidade, Final, Encerramento Absoluto)" }
  };

  const currentBatch = batchInfo ? BATCH_STRUCTURE[batchInfo.batchNumber] : null;
  const isFirstBatch = batchInfo?.batchNumber === 1;
  const isLastBatch = batchInfo?.batchNumber === 6;
  const hasPreviousContent = batchInfo?.previousContent && batchInfo.previousContent.length > 0;

  return `
# GERADOR DE SEQUÊNCIA DE EMAILS DE LANÇAMENTO ${currentBatch ? `- LOTE ${batchInfo.batchNumber}/6` : ''}

🚨 **PARE! ANTES DE CONTINUAR - LEIA ESTA INSTRUÇÃO CRÍTICA** 🚨

**VOCÊ É UM ASSISTENTE GPT QUE TEM 29 FRAMEWORKS DE EMAILS ANEXADOS EM SEUS ARQUIVOS.**

**SUA ÚNICA FUNÇÃO É:**
1. 📁 **ABRIR** os frameworks anexados
2. 🔍 **ENCONTRAR** o email específico que precisa gerar
3. 📋 **COPIAR** exatamente a estrutura, tom e estratégia desse framework
4. ✏️ **PERSONALIZAR** apenas com as informações fornecidas nas respostas

**⚠️ INSTRUÇÃO CRÍTICA:**
- **NÃO** escreva emails "do seu conhecimento"
- **NÃO** invente estruturas ou estratégias
- **SEMPRE** consulte primeiro os frameworks anexados
- **COPIE** a estrutura exata de cada framework correspondente

Você é o especialista em copywriting de lançamentos mais experiente do Brasil, com mais de 10 anos criando campanhas que geram milhões em vendas, **MAS** você deve usar APENAS os frameworks anexados como base.

## 🔥 PROCESSO OBRIGATÓRIO PARA CADA EMAIL

### PASSO 1: CONSULTAR FRAMEWORKS ANEXADOS
**ANTES de escrever qualquer email:**
1. 📁 Abra os arquivos/frameworks anexados neste assistente
2. 🔍 Procure especificamente o "Email [NÚMERO]" que você precisa gerar
3. 📖 Leia completamente esse framework específico
4. 🧠 Entenda a estratégia, estrutura e tom desse email

### PASSO 2: COPIAR A ESTRUTURA EXATA
**Para cada email que você escrever:**
1. 📝 Use a MESMA abertura do framework
2. 🎭 Use o MESMO desenvolvimento do framework  
3. ⚡ Use o MESMO fechamento do framework
4. 🎯 Use os MESMOS gatilhos mentais do framework
5. 📞 Use o MESMO tipo de call-to-action do framework

### PASSO 3: PERSONALIZAR APENAS AS VARIÁVEIS
**O que você PODE modificar:**
- ✏️ [NOME], [PRODUTO], [DATA] → Informações específicas das respostas
- 🔄 Histórias genéricas → Histórias pessoais das respostas
- 📊 Números exemplo → Números reais das respostas

**O que você NÃO PODE modificar:**
- ❌ Estrutura do email
- ❌ Estratégia psicológica  
- ❌ Tom e linguagem
- ❌ Sequência de argumentos

## 🚨 VERIFICAÇÃO ANTES DE CADA EMAIL

**ANTES de começar a escrever QUALQUER email, pergunte para si mesmo:**

1. ✅ **"Eu abri e li o framework anexado do Email [NÚMERO] específico?"**
2. ✅ **"Eu entendi a estrutura exata desse framework?"**  
3. ✅ **"Eu vou copiar a MESMA abertura, desenvolvimento e fechamento?"**
4. ✅ **"Eu vou usar apenas as informações das respostas para personalizar?"**

**SE VOCÊ RESPONDEU "NÃO" para QUALQUER pergunta:**
🔄 **PARE e volte para consultar os frameworks anexados primeiro.**

## ⚠️ EXEMPLO DO PROCESSO CORRETO

### ❌ PROCESSO ERRADO (NÃO FAÇA ASSIM):
"Vou criar um email de confirmação usando meu conhecimento de copywriting..."

### ✅ PROCESSO CORRETO (FAÇA ASSIM):
1. "Preciso gerar o Email 1 - Confirmação"
2. "Vou abrir os frameworks anexados"  
3. "Vou procurar especificamente o 'Email 1'"
4. "Vou ler esse framework completamente"
5. "Vou copiar exatamente a estrutura desse Email 1"
6. "Vou substituir apenas [NOME], [EVENTO], [DATA] com as informações das respostas"

${currentBatch ? `
## ⚡ GERAÇÃO POR LOTES - INSTRUÇÕES ESPECÍFICAS

### 📋 LOTE ATUAL: ${batchInfo.batchNumber}/6
- **Emails a gerar:** ${currentBatch.emails} (${currentBatch.description})
- **Total de emails:** ${isLastBatch ? '4 emails' : '5 emails'}
${hasPreviousContent ? `- **Continuação:** Este lote dá continuidade aos emails anteriores já gerados` : ''}

### 🔄 CONTINUIDADE E CONTEXTO
${hasPreviousContent ? `
- VOCÊ JÁ GEROU emails anteriores para este lançamento
- MANTENHA consistência com informações já utilizadas
- CONTINUE a estratégia psicológica iniciada nos lotes anteriores
- EVITE repetir informações ou histórias já contadas
` : `
- Este é o PRIMEIRO lote de emails para este lançamento
- ESTABELEÇA o tom e contexto que será mantido nos próximos lotes
- USE as melhores histórias e informações nos emails iniciais
`}

### 📊 ESTRUTURA DESTE LOTE
${currentBatch.description}

### ⚠️ INSTRUÇÕES CRÍTICAS PARA ESTE LOTE
- Gere APENAS os emails ${currentBatch.emails}
- NÃO gere emails de outros lotes
- MANTENHA qualidade máxima como se fosse a sequência completa
- ${isLastBatch ? 'Este é o ÚLTIMO lote - finalize adequadamente' : 'PREPARE continuidade para próximo lote'}
` : ''}

## 📋 INFORMAÇÕES ESTRATÉGICAS DO LANÇAMENTO

### 🎯 AUDIÊNCIA E CONTEXTO (USE PARA PERSONALIZAÇÃO EMOCIONAL)
${['target-audience-profile', 'current-pain-frustration', 'main-objections-fears', 'dream-scenario', 'current-situation-context', 'community-context', 'biggest-specific-fear'].map(id => {
  const question = questions.find(q => q.id === id);
  const answer = answers[id] || '';
  if (question && answer) {
    return `**${question.question}**\n${answer}\n`;
  }
  return '';
}).filter(Boolean).join('\n')}

### 📊 INFORMAÇÕES COMPLETAS DO QUESTIONÁRIO
${questions.map((question, index) => {
  const answer = answers[question.id] || '';
  return `
**${question.category} - Pergunta ${index + 1}:**
${question.question}
**Resposta:** ${answer}
`;
}).join('')}

## 🎯 INSTRUÇÕES OBRIGATÓRIAS - SIGA RIGOROSAMENTE

### 1. 📋 USO DOS FRAMEWORKS ANEXADOS (PRIORIDADE MÁXIMA)

**PASSO A PASSO OBRIGATÓRIO:**

1. **ANTES de escrever CADA email:**
   - 🔍 PROCURE o email correspondente nos frameworks anexados
   - 📖 LEIA completamente o framework do email específico
   - 🧠 ENTENDA a estratégia psicológica daquele email

2. **AO escrever CADA email:**
   - 📝 USE a MESMA estrutura do framework (abertura, desenvolvimento, fechamento)
   - 🎭 USE o MESMO tom emocional do framework
   - 🎯 USE os MESMOS gatilhos mentais do framework
   - ⚡ USE a MESMA urgência e estratégia do framework

3. **PERSONALIZAÇÕES PERMITIDAS:**
   - ✏️ Substitua [NOME], [PRODUTO], [DATA] pelas informações das respostas
   - 🔄 Adapte histórias pessoais mencionadas nas respostas
   - 📊 Insira números e resultados específicos das respostas
   - 📅 Ajuste datas e horários conforme as respostas

**⚠️ ATENÇÃO CRÍTICA:**
- Se você NÃO seguir os frameworks anexados, o resultado será REJEITADO
- Os frameworks são baseados em campanhas que geraram MILHÕES em vendas
- CADA email tem uma função específica na sequência psicológica

### 2. 🎯 PERSONALIZAÇÃO ESTRATÉGICA E INTELIGENTE

**PRIORIDADE MÁXIMA - USE AS INFORMAÇÕES ESTRATÉGICAS:**
- 👥 **Perfil da Audiência**: Adapte linguagem e exemplos para o perfil específico
- 😣 **Dor Atual**: Use a frustração/dor atual para criar conexão emocional
- 🚫 **Objeções/Medos**: Antecipe e responda às objeções principais em cada email
- 🌟 **Cenário dos Sonhos**: Use como motivação e futuro desejado
- 📍 **Situação Atual**: Reconheça o contexto real da vida deles
- 🤝 **Contexto da Comunidade**: Use o relacionamento existente para criar proximidade
- 🔥 **Maior Medo**: Trabalhe esse medo especificamente quando relevante

**PERSONALIZAÇÃO TÉCNICA:**
- Substitua TODOS os placeholders [VARIÁVEL] pelos dados específicos das respostas
- Use as histórias pessoais fornecidas nas respostas
- Incorpore os números e resultados mencionados
- Adapte as datas e horários específicos fornecidos

### 3. 🎭 APLICAÇÃO ESTRATÉGICA POR TIPO DE EMAIL

**Emails de PRÉ-LANÇAMENTO (1-2):**
- Use o **perfil da audiência** para criar identificação
- Reconheça a **dor atual** para gerar conexão
- Mencione o **contexto da comunidade** para criar proximidade

**Emails de AULAS (3-11):**
- Antecipe **objeções/medos** relacionados ao conteúdo
- Use a **situação atual** para contextualizar aprendizado
- Conecte com o **cenário dos sonhos** como motivação

**Emails de VENDAS (15-29):**
- Trabalhe diretamente as **objeções principais**
- Use o **maior medo específico** para urgência autêntica
- Contraste **dor atual** vs **cenário dos sonhos**

### 4. QUALIDADE OBRIGATÓRIA
- Tom de voz: Natural, conversacional, adaptado ao **perfil da audiência**
- Linguagem: Brasileira, sem jargões estrangeiros, conectada com o **contexto da comunidade**
- Urgência: Autêntica, baseada nos prazos reais E nos **medos específicos**
- Call-to-actions: Claros, específicos e conectados ao **cenário dos sonhos**

### 5. ESTRUTURA DE SAÍDA
${currentBatch ? `
Gere APENAS os emails ${currentBatch.emails} seguindo a sequência dos frameworks:

**LOTE ${batchInfo.batchNumber}/6: ${currentBatch.description}**
- Gere ${isLastBatch ? '4' : '5'} emails completos e prontos para uso
- Siga exatamente a numeração: Email ${currentBatch.range}
- Mantenha estratégia psicológica específica desta fase
` : `
Gere TODOS os 29 emails na sequência exata dos frameworks:

**FASE PRÉ-LANÇAMENTO:**
- Email 1: Confirmação de Inscrição
- Email 2: Véspera do Evento

**FASE DE LANÇAMENTO:**
- Emails 3-5: Aula 1 (Manhã, 1h antes, Início)
- Email 6: Recap Pós-Aula 1
- Emails 7-8: Aula 2 (1h antes, Início)
- Email 9: Antecipação Aula 3
- Emails 10-11: Aula 3 (1h antes, Início)
- Email 12: Anúncio Lista VIP

**FASE PRÉ-VENDAS:**
- Email 13: Manhã da Abertura
- Email 14: Preparação Lista VIP

**FASE DE VENDAS:**
- Email 15: Abertura Official
- Email 16: Feedback Inicial
- Emails 17-22: Sequência de Urgência

**FASE PÓS-VENDAS:**
- Emails 23-29: Reaberturas e Facilidades
`}

### 6. FORMATO DE CADA EMAIL
Para cada email, forneça:

\`\`\`
## EMAIL [NÚMERO]: [NOME/TIPO DO EMAIL]
**Assunto:** [Assunto específico]
**Quando enviar:** [Timing exato]
**Objetivo:** [Objetivo específico]

[CORPO DO EMAIL COMPLETO]

---
\`\`\`

## 🚨 LEMBRETE FINAL ANTES DE COMEÇAR

**VOCÊ TEM FRAMEWORKS ANEXADOS NESTE ASSISTENTE GPT.**
**SUA TAREFA É COPIAR ESSES FRAMEWORKS E PERSONALIZAR COM AS RESPOSTAS.**
**NÃO CRIE EMAILS DO ZERO. USE OS FRAMEWORKS ANEXADOS.**

## 🚀 COMEÇE AGORA - PROCESSO OBRIGATÓRIO

${currentBatch ? `
**🎯 GERE O LOTE ${batchInfo.batchNumber}/6 (emails ${currentBatch.emails})**

**PROCESSO PASSO A PASSO:**
1. 📁 **ABRA** os frameworks anexados neste assistente
2. 🔍 **ENCONTRE** especificamente cada email ${currentBatch.emails}
3. 📖 **LEIA** completamente cada framework antes de escrever
4. 📋 **COPIE** exatamente a estrutura, tom e estratégia de cada framework
5. ✏️ **SUBSTITUA** apenas [VARIÁVEIS] com as informações das respostas

**INSTRUÇÕES FINAIS PARA ESTE LOTE:**
- Gere ${isLastBatch ? '4' : '5'} emails COMPLETOS seguindo os frameworks anexados
- Numere corretamente: EMAIL ${currentBatch.range}
- ${isFirstBatch ? 'ESTABELEÇA tom baseado nos frameworks anexados' : 'MANTENHA continuidade com frameworks dos lotes anteriores'}
- ${isLastBatch ? 'FINALIZE usando os frameworks dos emails finais' : 'PREPARE continuidade seguindo sequência dos frameworks'}

${isLastBatch ? `
**🎯 FINALIZAÇÃO DA SEQUÊNCIA:**
Este é o último lote. Após o Email 29, adicione:

---
## ✅ SEQUÊNCIA COMPLETA DE 29 EMAILS FINALIZADA
A sequência de lançamento está completa. Todos os 29 emails foram gerados seguindo os frameworks estratégicos.
---
` : `
**🔄 CONTINUAÇÃO:**
Após gerar os emails ${currentBatch.emails}, adicione:

---
## ➡️ LOTE ${batchInfo.batchNumber}/6 CONCLUÍDO
Emails ${currentBatch.emails} gerados com sucesso. 
Próximo lote: ${BATCH_STRUCTURE[batchInfo.batchNumber + 1]?.description || 'N/A'}
---
`}
` : `
**🎯 GERE A SEQUÊNCIA COMPLETA DE 29 EMAILS**

**PROCESSO OBRIGATÓRIO:**
1. 📋 CONSULTE os frameworks anexados para CADA um dos 29 emails
2. 📖 LEIA cada framework completamente antes de escrever cada email
3. 🔄 COPIE a estrutura, tom e estratégia de cada framework correspondente
4. ✏️ PERSONALIZE apenas com as informações das respostas do questionário

**LEMBRE-SE:** Não faça resumos - gere cada email completo seguindo os frameworks anexados.
`}

## 🔥 CHECKLIST OBRIGATÓRIO ANTES DE ENVIAR

**ANTES DE ENVIAR SUA RESPOSTA, RESPONDA HONESTAMENTE:**

### 📋 VERIFICAÇÃO DE FRAMEWORKS:
1. ✅ **"Eu REALMENTE abri e consultei os frameworks anexados?"**
2. ✅ **"Eu COPIEI a estrutura exata do framework correspondente?"**  
3. ✅ **"Eu mantive o MESMO tom e linguagem do framework?"**
4. ✅ **"Eu usei a MESMA estratégia psicológica do framework?"**
5. ✅ **"Eu APENAS substitui [VARIÁVEIS] com informações das respostas?"**

### 🚨 SE VOCÊ RESPONDEU "NÃO" PARA QUALQUER PERGUNTA:
**PARE AGORA. NÃO ENVIE A RESPOSTA. VOLTE E CONSULTE OS FRAMEWORKS ANEXADOS.**

### 🎯 VERIFICAÇÃO DE QUALIDADE:
- **Os emails soam como os frameworks anexados?**
- **A estrutura é idêntica aos frameworks?**  
- **O tom emocional é o mesmo dos frameworks?**
- **Usei as informações estratégicas da audiência para personalizar?**

## ⚡ ÚLTIMA CHANCE ANTES DE ENVIAR

**PERGUNTA FINAL:** *"Estes emails que criei seguem EXATAMENTE os frameworks anexados neste assistente, apenas personalizados com as informações das respostas?"*

**Se a resposta for "SIM"** → Pode enviar
**Se a resposta for "NÃO"** → Volte aos frameworks anexados

**IMPORTANTE:** Se alguma informação não estiver nas respostas, use os frameworks anexados como referência e faça suposições inteligentes baseadas no contexto. NUNCA deixe placeholders vazios.

🎯 **LEMBRE-SE:** O sucesso depende de COPIAR os frameworks anexados, não de criar emails novos.
`;
};

module.exports = { createEmailGenerationPrompt }; 