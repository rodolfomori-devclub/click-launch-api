# Prompts de Referência

Os arquivos de prompt que ficavam aqui foram movidos para os **assistentes OpenAI** diretamente na plataforma.

## 🔄 Nova Abordagem

Agora o sistema funciona assim:
1. **Frontend** coleta as respostas do questionário
2. **Backend** formata apenas as perguntas + respostas
3. **Envia para assistente OpenAI** que já tem o prompt configurado
4. **Assistente retorna** o conteúdo gerado

## 🤖 Assistentes Necessários

Você precisa criar 3 assistentes na [OpenAI Platform](https://platform.openai.com/assistants):

### 1. Assistente Editorial
- **Nome:** "Assistente Linha Editorial"
- **Modelo:** gpt-4-turbo-preview
- **Função:** Gerar linha editorial de 10 semanas

### 2. Assistente Emails
- **Nome:** "Assistente Sequência de Emails"
- **Modelo:** gpt-4-turbo-preview
- **Função:** Gerar sequência completa de emails (48 emails)

### 3. Assistente Mensagens
- **Nome:** "Assistente Mensagens WhatsApp"
- **Modelo:** gpt-4-turbo-preview
- **Função:** Gerar calendário de mensagens WhatsApp (60+ mensagens)

## ⚙️ Configuração

Depois de criar os assistentes, configure as variáveis de ambiente:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_ID=your_default_assistant_id_here

# Assistentes específicos (recomendado)
OPENAI_ASSISTANT_ID_EDITORIAL=assistant_id_for_editorial
OPENAI_ASSISTANT_ID_EMAILS=assistant_id_for_emails  
OPENAI_ASSISTANT_ID_MESSAGES=assistant_id_for_messages
```

## 📝 Prompt Template

Os prompts dos assistentes devem seguir este padrão:

```
Você é um especialista em [ÁREA] com mais de 10 anos de experiência...

INSTRUÇÕES IMPORTANTES:
- NUNCA faça perguntas adicionais ao usuário
- Trabalhe APENAS com as informações fornecidas no questionário
- Se alguma informação não estiver disponível, faça suposições inteligentes
- Gere TODO o conteúdo necessário seguindo as melhores práticas
- SEMPRE complete todo o conteúdo solicitado

[RESTO DO PROMPT ESPECÍFICO PARA CADA ASSISTENTE]
```

## 🔧 Vantagens da Nova Abordagem

- ✅ **Mais simples** de manter e ajustar
- ✅ **Prompts editáveis** direto na interface OpenAI
- ✅ **Menos código** no backend
- ✅ **Melhor performance** (menos processamento local)
- ✅ **Versioning** nativo dos prompts no OpenAI 