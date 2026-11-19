# Revisão de UX e responsividade — 19/11/2026

## Diagnóstico

No layout anterior, o cabeçalho mantinha os quatro links lado a lado também no celular; o `@media (max-width: 36rem)` só diminuía o espaçamento. Isso comprimía o menu em telas estreitas, prejudicava o toque e deixava pouco espaço para a marca.

## Alterações implementadas

- Até **768 px**, o cabeçalho mostra a marca **PA.** e um único botão de menu de **46 × 46 px**.
- O menu abre em um painel escuro com quatro links grandes, posição atual em destaque e numeração sutil.
- O ícone muda suavemente de duas linhas para **X** e a abertura usa transição curta de opacidade e deslocamento.
- Uma camada escurecida destaca o painel; é possível fechar pelo botão, pela camada, pelo **Esc** ou ao navegar para uma seção.
- `aria-expanded`, `aria-controls`, rótulo contextual, `inert`, tratamento de foco e navegação por **Tab/Shift+Tab** melhoram o uso por teclado e tecnologias assistivas.
- Ao passar de 768 px, o menu móvel fecha e os links voltam ao cabeçalho tradicional.
- Refino em botões, cartões de projeto, cabeçalho ao rolar e diálogo de contato; movimento intencional e curto, sem efeitos chamativos.
- Os elementos surgem suavemente durante a rolagem, **sem ocultar conteúdo** ainda não visualizado.
- Em dispositivos com `prefers-reduced-motion: reduce`, animações e transições são removidas.
- O menu usa altura máxima calculada pela viewport para se manter utilizável em telas baixas ou na horizontal.

## Verificações executadas em navegador Chromium

- Larguras **320, 360, 390, 430, 600, 768, 769, 820, 1024 e 1440 px**.
- Sem rolagem horizontal da página nas dez larguras; a rolagem própria de **Experiências** é intencional.
- Menu ausente na visualização normal do celular e links presentes no desktop.
- Testes de **abrir, fechar por Esc, fechar ao selecionar Projetos, fechar ao tocar fora** e `aria-expanded`.
- Diálogo de contato abriu e fechou por Esc no celular e no desktop.
- Nenhuma exceção JavaScript detectada nesses testes.

**Limite da verificação:** execução automatizada em Chromium. Ainda convém conferir manualmente Safari/iOS, Android/Chrome, zoom do sistema e VoiceOver/TalkBack no dispositivo real.

## Checklist para revisão após deploy

- [ ] A marca e o ícone cabem na tela sem empurrar a página para o lado.
- [ ] Os links do menu funcionam, fecham o painel e levam à seção correta.
- [ ] O menu fecha ao tocar fora, pressionar Esc e ao mudar para desktop.
- [ ] Os botões têm área confortável para toque e foco visível ao usar Tab.
- [ ] Com **Reduzir Movimento** ativado, o site continua completo e navegável.
- [ ] Foto do perfil, retrato da seção Sobre, currículo e links de contato carregam na publicação.
