# Portfólio | Pedro Albuquerque

Portfólio profissional com foco em Customer Success e Quality Assurance. A Home apresenta posicionamento, práticas e ferramentas evidenciadas nos estudos, trajetória e os estudos de caso do URBAN, uma plataforma de gestão imobiliária usada como contexto para demonstrar práticas de CS e QA.

O site é construído em HTML, CSS e JavaScript, sem framework.

## Estudos em destaque

- **URBAN · Customer Success** — implantação, onboarding, adoção e acompanhamento da jornada do cliente.
- **URBAN · Quality Assurance** — estratégia orientada a risco, test design, rastreabilidade, execução no Qase, investigação, reteste, regressão, validação responsiva e automação com Playwright.

## Rodar localmente

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/` no navegador. Para encerrar o servidor, use `Ctrl+C`.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Home, áreas de atuação, projetos, trajetória e contato |
| `styles.css` | Design system, layouts e responsividade |
| `script.js` | Navegação mobile, interações, acessibilidade e download do currículo |
| `estudos/` | Páginas dos estudos de caso |
| `assets/urban-qa/` | Evidências utilizadas no estudo de QA do URBAN |
| `assets/` | Imagens, ícones, fonte Inter e currículo |
| `docs/manutencao.md` | Orientações de manutenção do conteúdo |
| `docs/revisao-ux-mobile.md` | Checklist de UX e responsividade |

## Responsividade e acessibilidade

A Home possui navegação adaptada para telas menores, suporte a teclado, `focus-visible`, skip link e respeito a `prefers-reduced-motion`. O estudo de QA também possui layout próprio para desktop, tablet e mobile; a evidência responsiva do hero utiliza o viewport completo, sem crop ou `object-fit: cover`.

## Referência de design

- Layout do portfólio no Figma: https://www.figma.com/design/bODBkXVQK87jjMoHdHmOBZ/Portf%C3%B3lio---CSQA?node-id=15-2
- Licença da fonte Inter: `assets/OFL-Inter.txt`

## Critério editorial

Na seção de áreas de atuação, as práticas de CS e os recursos de QA foram escolhidos para corresponder aos estudos de caso publicados. Não são uma declaração de domínio de todas as plataformas do mercado. Os indicadores da NovaCasa Imóveis são explicitamente simulados no estudo de CS.
