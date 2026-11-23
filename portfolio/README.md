# Portfólio morman — Sofia Marinho

Site de portfólio, separado do site da coleção IN-CONCRETO (que fica na raiz do repositório).
HTML, CSS e JS puros, sem build. Organização: capa → sobre → projetos (categorias numeradas) → contato.

- `index.html` — capa, sobre, experiência e contato (textos direto no HTML)
- `data.js` — **categorias e projetos**: título, ano, contexto, texto e imagens de cada página de projeto
- `app.js` — monta a lista de categorias, as páginas de categoria (`#c/<id>`) e de projeto (`#p/<id>`) e o modo ampliado das imagens
- `style.css` — visual (mesma identidade do IN-CONCRETO: concreto claro, grafite e marsala)
- `media/` — imagens (`media/in-concreto/` são cópias das fotos e desenhos da coleção), `media/og.jpg` é a prévia de compartilhamento

## Pendências
- Foto para a seção "sobre": salvar como `media/sobre.webp` e trocar o bloco `photo-slot` no `index.html`
- Imagens de Merlot, MAUM e Backstage (estão marcados como "em breve" em `data.js`)
- Link do site IN-CONCRETO publicado: campo `site` do projeto `in-concreto` em `data.js`

## Publicar (Netlify, grátis)
1. Acesse app.netlify.com/drop no computador.
2. Arraste **só a pasta `portfolio`** para a página (vira um site separado do IN-CONCRETO).
3. Em Site configuration → Change site name, escolha o nome (ex.: morman-portfolio.netlify.app).
Para atualizar: Deploys → arraste a pasta nova.
