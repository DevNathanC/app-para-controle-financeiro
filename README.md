# 💰 Aplicativo de Controle Financeiro

Um aplicativo web moderno para controle financeiro pessoal com sistema inteligente de alertas de vencimento.

## 🎯 Funcionalidades

### ✨ Principais Recursos

- **📊 Dashboard Inteligente**
  - Visão geral de receitas e despesas
  - Saldo previsto em tempo real
  - Estatísticas de contas pagas e pendentes

- **🔔 Sistema de Alertas**
  - Notificações automáticas para vencimentos próximos
  - Alertas visuais coloridos por urgência:
    - 🔴 Vermelho: Contas atrasadas
    - 🟠 Laranja: Vence hoje ou amanhã
    - 🟡 Amarelo: Vence em até 3 dias
    - 🔵 Azul: Vence em até 7 dias
  - Notificações do navegador para contas urgentes

- **📝 Gestão de Contas**
  - Cadastro de contas a pagar e receber
  - Categorização de despesas e receitas
  - Edição e exclusão de contas
  - Marcação de contas como pagas/pendentes
  - Campo de observações para cada conta

- **🔍 Filtros e Organização**
  - Filtrar por tipo (receitas/despesas)
  - Filtrar por status (pagas/pendentes)
  - Ordenar por data, valor ou descrição
  - Interface responsiva para mobile

- **💾 Armazenamento Local**
  - Dados salvos automaticamente no navegador
  - Não precisa de servidor ou banco de dados
  - Seus dados permanecem privados no seu dispositivo

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Instalação

1. Abra o terminal na pasta do projeto:
```bash
cd "c:\Users\Nathan\Desktop\app para controle financeiro"
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o aplicativo:
```bash
npm start
```

4. O aplicativo abrirá automaticamente no navegador em `http://localhost:3000`

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 📖 Como Usar

### Adicionando uma Conta

1. Clique no botão **"➕ Nova Conta"**
2. Preencha os campos:
   - **Tipo**: Despesa ou Receita
   - **Categoria**: Selecione uma categoria apropriada
   - **Descrição**: Nome da conta (ex: "Conta de luz")
   - **Valor**: Valor em reais
   - **Data de Vencimento**: Data que a conta vence
   - **Observações**: Informações adicionais (opcional)
3. Marque "Pago" se já foi quitada
4. Clique em **"Adicionar"**

### Gerenciando Contas

- **✓ Marcar como pago**: Clique no ícone de check
- **✏️ Editar**: Clique no ícone de lápis
- **🗑️ Excluir**: Clique no ícone de lixeira
- **Filtrar**: Use os seletores no topo da lista
- **Ordenar**: Escolha entre data, valor ou descrição

### Sistema de Alertas

Os alertas aparecem automaticamente no topo da página quando há:
- Contas vencendo nos próximos 7 dias
- Contas que vencem hoje
- Contas atrasadas (até 30 dias)

**Ative as notificações do navegador** para receber alertas mesmo quando não estiver na aba do aplicativo!

## 🎨 Categorias Disponíveis

### Despesas
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Outros

### Receitas
- Salário
- Freelance
- Investimentos
- Vendas
- Outros

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Edge, Safari (versões recentes)
- ✅ Dispositivos móveis (iOS e Android)
- ✅ Tablets
- ✅ Desktop

## 🔒 Privacidade

Todos os seus dados são armazenados localmente no seu navegador usando **localStorage**. Nenhuma informação é enviada para servidores externos. Seus dados financeiros permanecem 100% privados no seu dispositivo.

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Webpack 5** - Empacotador de módulos
- **Babel** - Compilador JavaScript
- **CSS3** - Estilização moderna
- **date-fns** - Manipulação de datas
- **localStorage API** - Armazenamento local

## 📝 Estrutura do Projeto

```
app para controle financeiro/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── components/         # Componentes React
│   │   ├── Dashboard.js
│   │   ├── BillForm.js
│   │   ├── BillList.js
│   │   └── AlertNotifications.js
│   ├── styles/            # Arquivos CSS
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── Dashboard.css
│   │   ├── BillForm.css
│   │   ├── BillList.css
│   │   └── AlertNotifications.css
│   ├── utils/             # Funções utilitárias
│   │   └── formatters.js
│   ├── App.js             # Componente principal
│   └── index.js           # Ponto de entrada
├── package.json           # Dependências e scripts
├── webpack.config.js      # Configuração Webpack
└── .babelrc              # Configuração Babel
```

## 🤝 Contribuindo

Sinta-se à vontade para melhorar este projeto! Algumas ideias:

- Adicionar gráficos e relatórios
- Exportar dados para Excel/PDF
- Sincronização em nuvem (opcional)
- Modo escuro
- Mais categorias personalizadas
- Contas recorrentes automáticas

## 📄 Licença

MIT - Você é livre para usar, modificar e distribuir este projeto.

## 💡 Dicas de Uso

1. **Configure notificações**: Permita notificações do navegador para não perder vencimentos importantes
2. **Revise regularmente**: Acesse o app pelo menos uma vez por semana
3. **Categorize corretamente**: Isso ajuda na análise de gastos
4. **Use observações**: Anote detalhes importantes sobre cada conta
5. **Backup**: Seus dados estão no navegador - considere anotar backups importantes

## 🆘 Problemas Comuns

**O aplicativo não inicia:**
- Verifique se o Node.js está instalado: `node --version`
- Tente deletar `node_modules` e executar `npm install` novamente

**Dados não salvam:**
- Verifique se o localStorage está habilitado no navegador
- Não use modo anônimo/privado

**Notificações não aparecem:**
- Verifique as permissões do navegador
- Certifique-se de que notificações não estão bloqueadas

---

**Desenvolvido com ❤️ para ajudar você a ter mais controle sobre suas finanças!**
