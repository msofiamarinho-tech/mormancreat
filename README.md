# IN-CONCRETO — antes de ser belo era estranho

Site da coleção de conclusão de curso de Moda FAAP de Sofia Morais Marinho (morman).
HTML, CSS e JS puros, sem build nem backend.

```
/            capa: nome, subtítulo, duas portas
/looks/      para stylists, produções e revistas
/processo/   para designers, marcas e diretores criativos
assets/      css e js compartilhados
images/      looks/look-0N/frame-0N.webp · processo/look-0N/toile-0N.webp · share/
```

## Trocar as fotos
Os quadros de `images/looks/look-02/` são provisórios (gerados por `scripts/placeholder_frames.py`).
Substitua pelas fotos finais **com o mesmo nome**: frame-01 = frente, frame-02 = perfil, frame-03 = costas.
Fotos no mesmo enquadramento e em retrato 3:4 (ex. 900×1200), em WebP com qualidade ~75 (até ~150 KB por quadro).

## Publicar
- **Netlify**: arraste a pasta em app.netlify.com/drop (ou conecte o repositório; sem comando de build, pasta `/`).
- **Vercel**: importe o repositório; framework "Other", sem build.
- **GitHub Pages**: Settings → Pages → branch e pasta `/ (root)`.

Depois de escolher o domínio, troque `og:url` e `og:image` nas três páginas pela URL completa
(ex. `https://morman.com.br/images/share/looks.jpg`) — WhatsApp e Instagram só leem a prévia com endereço absoluto.

Sugestão de domínio: `morman.com.br` (com a coleção em `inconcreto.morman.com.br`), ou `morman.studio`.
