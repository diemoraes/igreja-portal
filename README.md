# Igreja Portal :dizzy:

Um portal web para gestão de atividades e membros de uma igreja, desenvolvido com Next.js pelo Eric Massarioli e Diego Moraes

## Descrição 

Este projeto é uma aplicação web moderna para auxiliar na administração de uma igreja, incluindo funcionalidades de autenticação, dashboard, gerenciamento de membros e lembretes de aniversários.

## Funcionalidades

- **Autenticação**: Sistema de login seguro para acesso ao portal.
- **Dashboard**: Visão geral das atividades e estatísticas da igreja.
- **Gerenciamento de Membros**: Adicionar, editar e visualizar informações dos membros.
- **Lembretes de Aniversários**: Funcionalidade para gerenciar e notificar aniversários dos membros.
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos.

## Tecnologias Utilizadas

- **Next.js 16**: Framework React para aplicações web.
- **TypeScript**: Tipagem estática para JavaScript.
- **Tailwind CSS**: Framework CSS para estilização.
- **Radix UI**: Componentes primitivos para UI acessível.
- **Lucide React**: Ícones vetoriais.
- **Next Themes**: Suporte a temas claro e escuro.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd igreja-portal
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. Abra [http://localhost:443](http://localhost:443) no seu navegador.

## Estrutura do Projeto

```
igreja-portal/
├── app/                    # Páginas e layouts da aplicação
│   ├── (auth)/            # Páginas de autenticação
│   ├── (dashboard)/       # Páginas do dashboard
│   └── membros/           # Páginas de gerenciamento de membros
├── components/            # Componentes reutilizáveis
│   ├── ui/                # Componentes de UI (shadcn/ui)
│   └── sidebar.tsx        # Barra lateral
├── lib/                   # Utilitários e lógica de negócio
│   ├── aniversarios.ts    # Lógica para aniversários
│   └── utils.ts           # Funções utilitárias
└── public/                # Arquivos estáticos
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Constrói a aplicação para produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter para verificar o código.

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request.

## Licença

Este projeto está sob a licença MIT.

## Comentários

Se você tiver sugestões, dúvidas ou comentários sobre o projeto, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato 12 981020949
