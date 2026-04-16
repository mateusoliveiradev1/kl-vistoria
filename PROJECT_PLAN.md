# KL Vistoria Admin - Project Plan

## Legenda

- [x] Concluido
- [ ] Pendente

## Task List

- [ ] Definir escopo funcional do MVP e fechar papeis de acesso do painel.
- [x] Confirmar se o Admin ficara no mesmo projeto do site atual ou em app separado apontando para o mesmo banco.
- [x] Inicializar a aplicacao Next.js 15 com Tailwind e shadcn/ui.
- [ ] Configurar padroes de codigo, aliases, validacao de ambiente e convencoes de modulos.
- [ ] Provisionar banco Neon e configurar Drizzle Kit.
- [ ] Criar enums, tabelas e relacoes do schema inicial.
- [ ] Gerar migrations e seeds base para usuarios, parceiros, parametros e vistoriadores.
- [ ] Implementar autenticacao e RBAC.
- [x] Construir layout do admin, navegacao lateral, header e padroes de tabela/filtros.
- [ ] Implementar modulo de leads com listagem, detalhe, conversao e historico.
- [ ] Implementar modulo de clientes, veiculos e parceiros.
- [ ] Criar endpoint do webhook do popup com validacao, idempotencia e persistencia transacional.
- [ ] Implementar servico de criacao/atualizacao automatica de cliente e veiculo a partir do webhook.
- [ ] Implementar agenda operacional e CRUD de vistorias.
- [ ] Integrar Google Calendar para criacao e atualizacao de eventos.
- [ ] Integrar provedor de rota/geocoding para calculo automatico de deslocamento.
- [ ] Persistir `travel_costs` e aplicar o custo na margem da vistoria.
- [ ] Implementar modulo de contas a receber com titulos, itens, status e aging.
- [ ] Implementar baixas financeiras e livro-caixa.
- [ ] Implementar motor de comissao por vistoriador.
- [ ] Montar dashboard executivo com KPIs, fluxo de caixa e desempenho por vistoriador.
- [ ] Implementar `integration_outbox`, retries, logs e tratamento de falhas de integracao.
- [ ] Integrar Google Sheets via MCP com upsert de leads/clientes e rastreio por `external_refs`.
- [ ] Adicionar auditoria, observabilidade e logs operacionais.
- [ ] Escrever testes de dominio, integracao e fluxos criticos do webhook/agendamento/financeiro.
- [ ] Preparar ambientes Vercel, variaveis, cron jobs e checklist de deploy.
- [ ] Fazer seed/demo data para homologacao com cenarios reais de operacao.
- [ ] Executar QA funcional do painel e revisar performance das queries analiticas.
- [ ] Documentar arquitetura, integracoes, variaveis de ambiente e runbooks operacionais.
- [ ] Abrir fase 2 com melhorias como anexos de laudo, conciliacao bancaria e BI avancado.

## Notas da execucao atual

- O Admin sera construido como aplicacao separada do site atual.
- Estrutura prevista para a nova app: `apps/admin`.
- Fundacao do frontend concluida com layout responsivo, dark mode e paginas-base de navegacao.
- Scripts de desenvolvimento e build da app admin estao usando `next dev` e `next build` para maior estabilidade no ambiente local.
- Iteracao visual do dashboard concluida com linguagem fintech premium, scorecards em destaque, sidebar recolhivel e charts refinados.
- Segunda iteracao de UI/UX concluida com mesa de controle mais robusta, filtros expandidos, tooltips refinados, tipografia de display e leitura executiva menos generica.
