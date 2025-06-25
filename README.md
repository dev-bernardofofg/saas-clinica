# SaaS Clínica

[![Versão](https://img.shields.io/badge/version-0.1.0-blue)]()  
[![Deploy no Vercel](https://img.shields.io/badge/vercel-deploy-black?logo=vercel)](https://bernardofofg-clinica-saas.vercel.app/)

Plataforma SaaS para gestão completa de clínicas médicas: cadastro de pacientes, agendamento de consultas, controle financeiro e muito mais.

---

## 📍 Demo

Acesse a aplicação rodando em produção:  
🔗 https://bernardofofg-clinica-saas.vercel.app/

---

## 🛠 Tecnologias

- **Framework**: Next.js 15 (App Router)  
- **Linguagem**: TypeScript  
- **Estilização**: Tailwind CSS  
- **Componentes**: Radix UI, Lucide Icons  
- **Formulários**: React Hook Form + Zod + @hookform/resolvers  
- **State & Data Fetching**: @tanstack/react-query  
- **Banco de Dados**: PostgreSQL via Drizzle ORM & drizzle-kit  
- **Autenticação**: better-auth + next-safe-action  
- **Pagamentos**: Stripe (`@stripe/stripe-js`, `stripe`)  
- **Gráficos**: Recharts  
- **Mascaramento de inputs**: react-input-mask / @react-input/mask  
- **Notificações**: Sonner  
- **Animações**: Framer Motion  
- **Date handling**: date-fns, dayjs  

---

## ✨ Funcionalidades

- ✅ **Cadastro e login** de usuários (clínicas / administradores)  
- ✅ **Gerenciamento de pacientes** (CRUD)  
- ✅ **Agendamento de consultas** com calendário e máscaras de data/hora  
- ✅ **Dashboard financeiro** com gráficos de faturamento e relatórios mensais  
- ✅ **Integração com Stripe** para cobrança e histórico de pagamentos  
- ✅ **Notificações em tempo real** para alerts e confirmações  
- ✅ **Suporte a tema claro/escuro** (next-themes)  

---

## 🚀 Instalação e execução

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/dev-bernardofofg/saas-clinica.git
   cd saas-clinica
   ```

2. **Instale as dependências**  
   ```bash
   pnpm install
   # ou npm install
   # ou yarn
   ```

3. **Crie um arquivo de variáveis de ambiente**  
   Copie o `.env.example` (ou crie um `.env.local`) com as chaves abaixo:

   ```
   # conexão com PostgreSQL
   DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # better-auth (opcional)
   AUTH_SECRET=algum-segredo-aleatorio

   # URL base da sua aplicação
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Prepare o banco de dados**  
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. **Inicie em modo de desenvolvimento**  
   ```bash
   pnpm dev
   # abre em http://localhost:3000
   ```

6. **Build e start para produção**  
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📂 Estrutura de pastas

```
.
├── public/                # Assets estáticos (ícones, imagens)
├── src/
│   ├── app/               # Páginas e layouts (Next.js App Router)
│   ├── components/        # Componentes reutilizáveis
│   ├── db/                # Schema (Drizzle ORM)
│   ├── lib/               # Utilitários e helpers
│   └── styles/            # Arquivos CSS (Tailwind)
├── drizzle.config.ts      # Configuração do drizzle-kit
├── next.config.ts         # Configuração Next.js
├── package.json
└── README.md
```

---

## 🤝 Contribuição

1. Faça um _fork_ deste repositório  
2. Crie uma _branch_ para sua feature (`git checkout -b feature/nova-funcionalidade`)  
3. Faça _commit_ das suas alterações (`git commit -m 'feat: descrição da feature'`)  
4. Faça _push_ para a sua branch (`git push origin feature/nova-funcionalidade`)  
5. Abra um _Pull Request_

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📬 Contato

Bernardo Filipe Oliveira de Farias Guilherme  
- GitHub: [@dev-bernardofofg](https://github.com/dev-bernardofofg)  
- LinkedIn: https://www.linkedin.com/in/bernardofofg/  

---

> Construído com ♥ e Next.js 🚀  
