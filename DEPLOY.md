# Controle Financeiro - Deploy no Vercel

## 🚀 Como fazer deploy no Vercel

### Opção 1: Via Interface Web (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta (GitHub, GitLab ou email)
3. Clique em "Add New Project"
4. Importe seu repositório GitHub ou faça upload da pasta do projeto
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em "Deploy"
7. Aguarde o deploy finalizar (2-3 minutos)
8. Seu app estará disponível em: `https://seu-projeto.vercel.app`

### Opção 2: Via CLI (Terminal)

1. Instale a CLI do Vercel:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Na pasta do projeto, execute:
```bash
vercel
```

4. Responda as perguntas:
   - Set up and deploy? **Y**
   - Which scope? (Escolha sua conta)
   - Link to existing project? **N**
   - Project name? (pressione Enter para aceitar o padrão)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. Para fazer deploy em produção:
```bash
vercel --prod
```

## 📋 Checklist antes do deploy

- ✅ Arquivo `vercel.json` criado
- ✅ Script `vercel-build` adicionado ao `package.json`
- ✅ Webpack configurado corretamente
- ✅ Arquivos compilados vão para pasta `dist`

## ⚙️ Configurações do projeto

O projeto já está configurado com:
- Build command: `npm run build`
- Output directory: `dist`
- Node version: Automático (usa a versão mais recente LTS)

## 🔧 Solução de problemas

### Se aparecer página em branco:

1. Verifique o console do navegador (F12) para erros
2. Certifique-se que o build foi bem-sucedido
3. No Vercel Dashboard, vá em "Deployments" e verifique os logs
4. Se necessário, refaça o deploy:
```bash
vercel --prod --force
```

### Se houver erro de build:

1. Teste localmente primeiro:
```bash
npm run build
```

2. Se funcionar localmente, limpe o cache do Vercel:
   - No dashboard do Vercel
   - Settings > General
   - Clique em "Clear Build Cache"
   - Faça um novo deploy

## 🌐 Depois do deploy

Seu app estará disponível em uma URL como:
`https://controle-financeiro-abc123.vercel.app`

Você pode:
- Adicionar um domínio customizado
- Habilitar HTTPS automático (já vem habilitado)
- Ver analytics de uso
- Configurar variáveis de ambiente (se necessário no futuro)

## 💡 Dicas importantes

1. **Sempre teste localmente** antes de fazer deploy:
   ```bash
   npm run build
   ```

2. **Seus dados são salvos no navegador** (localStorage), então cada dispositivo terá seus próprios dados

3. **Para updates**, basta fazer commit e push (se conectado ao GitHub) ou executar `vercel --prod` novamente

4. **Grátis para sempre** - O plano free do Vercel é suficiente para este projeto
