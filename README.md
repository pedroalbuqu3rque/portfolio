# Portfólio | Pedro Albuquerque

Portfólio de Customer Success e Quality Assurance. Reúne quatro estudos demonstrativos, ferramentas das duas áreas e minha trajetória em educação e tecnologia.

O site usa HTML, CSS e JavaScript.

## Rodar localmente

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000
```

Abra [localhost:8000](http://localhost:8000/). Para encerrar o servidor, use `Ctrl+C`.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Apresentação, cartões de ferramentas, projetos, experiências e contato |
| `styles.css` | Cores, tipografia, layout responsivo e estilos das páginas de estudo |
| `script.js` | Navegação, cartões interativos, rolagem de experiências e diálogo de contato |
| `estudos/` | Uma página HTML por estudo de caso |
| `assets/` | Fotos, ícones, fonte Inter e currículo em PDF |
| `docs/manutencao.md` | Como atualizar o conteúdo e conferir o site antes de publicar |
| `docs/revisao-ux-mobile.md` | Diagnóstico, correções e checklist de responsividade e microinterações |

## Referências

- [Layout do portfólio no Figma](https://www.figma.com/design/bODBkXVQK87jjMoHdHmOBZ/Portf%C3%B3lio---CSQA?node-id=15-2)
- [Licença da fonte Inter](assets/OFL-Inter.txt)

## Navegação mobile e acessibilidade

Até 768 px, o menu principal utiliza um botão expansível. Pode ser fechado pelo botão, toque fora ou tecla `Esc`. As animações são reduzidas automaticamente quando a preferência do sistema pede menos movimento. Consulte `docs/revisao-ux-mobile.md` para verificações e próximos testes.
