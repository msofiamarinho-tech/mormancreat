/* =========================================================================
   CONTEÚDO DO PORTFÓLIO — edite aqui.
   CATEGORIAS: a lista numerada da seção "Projetos".
   PROJETOS: cada projeto tem uma página própria (endereço #p/<id>).
     etapas (steps): title, text [parágrafos], quote, e imagens (items) com layout:
       "grid"   → grade de imagens com legenda
       "panels" → imagem grande + texto ao lado (bom para painéis de referência)
       "pairs"  → pares lado a lado (ex.: piloto × peça final)
     pending: true → mostra o aviso "imagens a enviar" no lugar da galeria.
   Para adicionar um projeto: copie um bloco, troque o id, e coloque o id na categoria.
   ========================================================================= */
var IC = "media/in-concreto/";

window.HERO = [IC + "desfile-01.webp", IC + "desfile-02.webp", IC + "desfile-03.webp", IC + "desfile-04.webp"];

window.CATEGORIES = [
  { id: "colecoes", name: "Coleções", desc: "Coleções autorais, do conceito ao desfile.", projects: ["in-concreto", "merlot"] },
  { id: "estilo", name: "Estilo & styling", desc: "Trabalho em marca: desenvolvimento de coleção, campanha e styling.", projects: ["maum"] },
  { id: "desenho", name: "Desenho de moda", desc: "Croquis, ilustração e desenho técnico.", projects: ["croquis-in-concreto"] },
  { id: "bastidores", name: "Bastidores", desc: "Backstage de desfiles.", projects: ["backstage"] }
];

window.PROJECTS = {
  "in-concreto": {
    title: "IN-CONCRETO", sub: "antes de ser belo era estranho",
    year: "2026", ctx: "21º Concurso FAAP Moda", role: "coleção autoral · 4 looks · do conceito ao desfile",
    cover: IC + "desfile-02.webp",
    // link para o site completo da coleção (deixe "" para esconder o botão)
    site: "",
    desc: "Quem decide o que é belo? O que foi rejeitado ontem é reverenciado hoje: o erro de uma época vira a beleza da próxima. Esta coleção procura a beleza onde ninguém foi ensinado a procurar, na imperfeição, na rachadura, no gesto que não se encaixa. O corpo se envolve e desaparece dentro do tecido; a estrutura, como o concreto de Brasília, se mostra sem vergonha da própria construção. E, no meio desse embate, a orquídea, a flor da minha mãe, é o vermelho que insiste em interromper o cinza.",
    steps: [
      { title: "Manifesto",
        text: [
          "Quem decide o que é belo? Nunca vimos o rosto de quem dita essa regra. Só sentimos o peso do seu veredito: isso serve, aquilo não; isso é elegante, aquilo é estranho. E, no entanto, toda vez que olhamos para trás, percebemos o mesmo padrão: o que foi rejeitado ontem é reverenciado hoje.",
          "Existe um pensamento japonês para isso, o wabi-sabi, que entende que nada é acabado, nada é permanente, e que é exatamente ali, na marca do tempo, que mora o que é realmente belo. Por isso o corpo aqui não se expõe: ele se envolve, se enrola, desaparece dentro do próprio tecido.",
          "E se o corpo se esconde, a estrutura não. Cresci cercada por concreto sem nunca ter olhado para ele, Brasília inteira é feita disso. Uma beleza que não pede desculpas por ser rígida, que expõe cada amarração, cada peso, sem vergonha da própria construção."
        ],
        quote: ["Wabi-sabi é uma beleza das coisas imperfeitas, impermanentes e incompletas.", "Leonard Koren"] },
      { title: "Os três pilares", layout: "panels", items: [
        { src: IC + "painel-japonismo.webp", t: "Japonismo", cap: "da gênese do olhar à estrutura da vanguarda",
          text: ["O primeiro gatilho foi a arte Ukiyo-e, as “imagens do mundo flutuante”: a composição plana, os contornos nítidos, os cortes assimétricos e o espaço vazio tão importante quanto a mancha de cor.",
                 "Do papel, a inspiração passa ao volume do Kosode e do Kimono, em que a peça não “espreme” o corpo, mas o envolve, em camadas, dobras e amarrações. De Yohji Yamamoto, Rei Kawakubo e Issey Miyake vem a apreciação pela imperfeição; do brutalismo de Kenzo Tange e Tadao Ando, a ideia de que o concreto pode ser poético."] },
        { src: IC + "painel-brutalismo.webp", t: "Brutalismo", cap: "da redescoberta do cotidiano à armadura têxtil",
          text: ["Brasília é a minha cidade, e eu vivia dentro de uma das maiores referências do brutalismo brasileiro sem olhar para ela. Revisitar os blocos de concreto aparente, as tesourinhas e os vãos livres transformou o invisível em força e honestidade construtiva.",
                 "Na coleção, isso vira linhas rígidas, ombros marcados que funcionam como pilares e tecidos que expõem costuras e acabamentos, como o brutalismo expõe vigas e concreto bruto."] },
        { src: IC + "painel-orquidea.webp", t: "Orquídea", cap: "herança, resistência e o espaço da permanência",
          text: ["A orquídea era a flor favorita da minha mãe e, em certas tradições, simboliza a herança familiar. Com cerca de 83 milhões de anos de história, ela cresce sobre rochas e em solos escassos, adaptando-se sem necessariamente pertencer ao lugar que a abriga.",
                 "Como estudante bolsista, me vejo nela, ocupando espaços que não foram pensados para mim. Na coleção, ela é o vermelho que tensiona a rigidez do concreto."] }
      ] },
      { title: "Croquis", layout: "grid", fit: "contain", items: [
        { src: IC + "croqui-01.webp", cap: "look 01 — Casulo" }, { src: IC + "croqui-02.webp", cap: "look 02 — Armação" },
        { src: IC + "croqui-03.webp", cap: "look 03 — Fissura" }, { src: IC + "croqui-04.webp", cap: "look 04 — Ruptura" }
      ] },
      { title: "Desenho técnico", layout: "grid", fit: "contain", wide: true, items: [
        { src: IC + "tecnico-01.webp", cap: "look 01 · casaco casulo" }, { src: IC + "tecnico-02-calca.webp", cap: "look 02 · calça" },
        { src: IC + "tecnico-04-casaco.webp", cap: "look 04 · casaco modular" }, { src: IC + "tecnico-04-calca.webp", cap: "look 04 · calça" }
      ] },
      { title: "Desenvolvimento: piloto × peça final", layout: "pairs",
        text: ["Cada look passou por pilotos (toiles) antes do tecido final, para testar volume, proporção e as soluções de modelagem."],
        items: [
          [{ src: IC + "piloto-01.webp", cap: "look 01 · piloto" }, { src: IC + "final-01.webp", cap: "look 01 · final" }],
          [{ src: IC + "piloto-02.webp", cap: "look 02 · piloto" }, { src: IC + "final-02.webp", cap: "look 02 · final" }],
          [{ src: IC + "piloto-03.webp", cap: "look 03 · piloto" }, { src: IC + "final-03.webp", cap: "look 03 · final" }],
          [{ src: IC + "piloto-04.webp", cap: "look 04 · piloto" }, { src: IC + "final-04.webp", cap: "look 04 · final" }]
        ] },
      { title: "Os quatro looks", layout: "looks", items: [
        { src: IC + "foto-01.webp", t: "01 — Casulo", cap: "Casaco casulo de tecido semelhante à lã, cinza, forrado de feltro vermelho; bolsa de concreto como acessório." },
        { src: IC + "foto-02.webp", t: "02 — Armação", cap: "Casaco, colete e mochila numa modelagem só, sobre calça de alfaiataria com recortes e costuras aparentes que deixam o tecido desfiar." },
        { src: IC + "foto-03.webp", t: "03 — Fissura", cap: "Jaqueta franzida com volume nas costas e bermuda balonê que se lê como saia, em cinco camadas de tecido." },
        { src: IC + "foto-04.webp", t: "04 — Ruptura", cap: "Casaco modular em cinco partes que se separam: blusa, colete com fivelas, mochila, capuz e estola." }
      ] },
      { title: "Desfile", layout: "grid", items: [
        { src: IC + "desfile-01.webp", cap: "look 01" }, { src: IC + "desfile-02.webp", cap: "look 02" },
        { src: IC + "desfile-03.webp", cap: "look 03" }, { src: IC + "desfile-04.webp", cap: "look 04" }
      ] }
    ]
  },

  "croquis-in-concreto": {
    title: "Croquis e técnicos", sub: "IN-CONCRETO",
    year: "2026", ctx: "desenho de moda", role: "croqui frente e costas · desenho técnico",
    cover: IC + "croqui-02.webp", fitCover: true,
    desc: "Os desenhos da coleção IN-CONCRETO: croquis de frente e costas de cada look e os desenhos técnicos das peças principais.",
    steps: [
      { title: "Croquis", layout: "grid", fit: "contain", items: [
        { src: IC + "croqui-01.webp", cap: "look 01 — Casulo" }, { src: IC + "croqui-02.webp", cap: "look 02 — Armação" },
        { src: IC + "croqui-03.webp", cap: "look 03 — Fissura" }, { src: IC + "croqui-04.webp", cap: "look 04 — Ruptura" }
      ] },
      { title: "Desenho técnico", layout: "grid", fit: "contain", wide: true, items: [
        { src: IC + "tecnico-01.webp", cap: "look 01 · casaco casulo" }, { src: IC + "tecnico-02-calca.webp", cap: "look 02 · calça" },
        { src: IC + "tecnico-04-casaco.webp", cap: "look 04 · casaco modular" }, { src: IC + "tecnico-04-calca.webp", cap: "look 04 · calça" }
      ] }
    ]
  },

  "merlot": {
    title: "Merlot", sub: "Y-Hack · Y-Human",
    year: "2024", ctx: "finalista do Y-Hack", role: "coleção desenvolvida em grupo",
    pending: true,
    desc: "Coleção desenvolvida em grupo, finalista do Y-Hack (Y-Human).",
    steps: []
  },

  "maum": {
    title: "MAUM", sub: "assistente de estilo e comunicação",
    year: "2025", ctx: "estágio", role: "desenvolvimento de coleção · campanha · styling",
    pending: true,
    desc: "Estágio em marca feminina brasileira: desenvolvimento de uma coleção completa, campanha de lançamento e styling.",
    steps: []
  },

  "backstage": {
    title: "Backstage", sub: "Penha e SPFW",
    year: "", ctx: "bastidores de desfile", role: "backstage",
    pending: true,
    desc: "Bastidores de desfiles da Penha e da SPFW.",
    steps: []
  }
};
