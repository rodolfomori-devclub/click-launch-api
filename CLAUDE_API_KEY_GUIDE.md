# 🔑 Guia: Solução para Erro de API Key do Claude

## ❌ Problema Identificado

**Erro:** `Authentication failed: Check your CLAUDE_API_KEY`

A API key do Claude no arquivo `.env` está inválida ou expirada.

## 🔧 Soluções Disponíveis

### **Opção 1: Obter Nova API Key do Claude (Recomendado)**

1. **Acesse o Console do Claude:**
   - Vá para: https://console.anthropic.com/
   - Faça login na sua conta Anthropic

2. **Gere uma Nova API Key:**
   - Clique em "API Keys" no menu lateral
   - Clique em "Create Key"
   - Dê um nome para a key (ex: "Email Generation")
   - Copie a nova API key

3. **Atualize o arquivo `.env`:**
   ```bash
   # Substitua pela nova API key
   CLAUDE_API_KEY=sk-ant-api03-NOVA_API_KEY_AQUI
   
   # Mantenha o provedor como Claude
   AI_PROVIDER_EMAILS=claude
   ```

4. **Reinicie o servidor:**
   ```bash
   npm run dev
   ```

### **Opção 2: Usar OpenAI Temporariamente**

Se você não tem uma API key válida do Claude no momento:

1. **Altere o provedor no `.env`:**
   ```bash
   # Mude para OpenAI
   AI_PROVIDER_EMAILS=openai
   ```

2. **Reinicie o servidor:**
   ```bash
   npm run dev
   ```

3. **Limitações com OpenAI:**
   - ⚠️ Não suporta geração por fase
   - ⚠️ Usa sistema de lotes (6 lotes)
   - ⚠️ Maior consumo de tokens
   - ✅ Funciona com o sistema legado

## 📋 Verificação da API Key

Para testar se sua API key é válida:

```bash
# Execute o teste de conexão
node test-phase-system.js
```

**Resultado esperado:**
```
✅ Claude connection: SUCCESS
```

## 🔄 Alternância Dinâmica

O sistema agora detecta automaticamente problemas de API key e fornece mensagens claras:

```javascript
// Mensagem de erro melhorada
"API key do Claude inválida. Configure uma API key válida ou altere AI_PROVIDER_EMAILS para 'openai' no arquivo .env"
```

## 🎯 Configuração Recomendada

Para melhor experiência, configure ambos os provedores:

```bash
# .env
AI_PROVIDER_EMAILS=claude  # Para geração por fase

# Claude (novo sistema)
CLAUDE_API_KEY=sk-ant-api03-SUA_API_KEY_VALIDA
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# OpenAI (fallback)
OPENAI_API_KEY=sk-proj-SUA_OPENAI_KEY
OPENAI_ASSISTANT_ID_EMAILS=asst_vQoS1OYZ4YM6lEj7NmmnAN11
```

## 🚀 Como Obter API Key do Claude

### **1. Crie uma Conta Anthropic**
- Acesse: https://console.anthropic.com/
- Registre-se com email/Google/GitHub

### **2. Verifique sua Conta**
- Confirme o email
- Adicione método de pagamento (se necessário)

### **3. Gere API Key**
- Vá para "API Keys"
- Clique em "Create Key"
- Defina um nome descritivo
- Copie a key (começa com `sk-ant-api03-`)

### **4. Configure Limites (Opcional)**
- Defina limites de spending
- Configure alertas de uso

## 💡 Dicas Importantes

1. **Segurança:**
   - Nunca compartilhe sua API key
   - Use variáveis de ambiente (.env)
   - Regenere periodicamente

2. **Monitoramento:**
   - Acompanhe uso no console Anthropic
   - Configure alertas de limite
   - Monitore logs da aplicação

3. **Fallback:**
   - Mantenha OpenAI configurado como backup
   - Teste ambos os provedores regularmente

## 📞 Suporte

Se continuar tendo problemas:

1. **Verifique os logs:**
   ```bash
   # Console do navegador
   # Logs do servidor no terminal
   ```

2. **Teste a conectividade:**
   ```bash
   node test-phase-system.js
   ```

3. **Verifique a documentação:**
   - https://docs.anthropic.com/claude/reference/getting-started-with-the-api

## ✅ Status Atual

- ✅ Sistema funcionando com OpenAI
- ⚠️ Claude requer API key válida
- ✅ Fallback automático implementado
- ✅ Mensagens de erro claras

**Próximos Passos:**
1. Obter API key válida do Claude
2. Atualizar `.env` com a nova key
3. Alterar `AI_PROVIDER_EMAILS=claude`
4. Aproveitar o sistema de fases otimizado!