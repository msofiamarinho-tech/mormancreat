/* =========================================================================
   CONTEÚDO DO PORTFÓLIO — edite aqui.
   CATEGORIAS: a lista da seção "Projetos" (fundo preto).
   PROJETOS: cada um tem página própria (endereço #p/<id>), montada assim:
     band   → faixa de fotos no topo, em stop motion (lista de colunas; cada coluna é uma lista de fotos que vão trocando)
     title, desc, skills → título, texto à esquerda e lista à direita
     rows   → blocos de imagens em largura total:
                { cols: [ [foto, foto...], [foto...] ] }   colunas lado a lado; mais de uma foto = stop motion
                { title, text: [...] }                     bloco de texto
                { title, panels: [...] }                   imagem + texto lado a lado
                { cols: ..., contain: true }               desenhos (fundo branco, sem cortar)
     pending: true → mostra o aviso "imagens a enviar".
   ========================================================================= */
var IC = "media/in-concreto/";
var F = function (n) { return IC + n + ".webp"; };

window.CATEGORIES = [
  { id: "colecoes", name: "Coleções autorais", projects: ["in-concreto", "merlot"] },
  { id: "fotografia", name: "Fotografia", projects: [] },
  { id: "sketchbook", name: "Sketchbook", projects: ["croquis-in-concreto"] },
  { id: "bastidores", name: "Bastidores de desfile", projects: ["backstage"] }
];

/* colagem da seção Projetos (cada camada troca de foto em stop motion) */
window.COLLAGE = [
  [F("desfile-02"), F("desfile-04"), F("desfile-01"), F("desfile-03")],
  [F("foto-03"), F("foto-01"), F("foto-04"), F("foto-02")],
  [F("piloto-01"), F("piloto-02"), F("piloto-03"), F("piloto-04")]
];

window.PROJECTS = {
  "in-concreto": {
    title: "In-Concreto", year: "2026", ctx: "21º Concurso FAAP Moda",
    band: [
      [F("foto-01"), F("final-01"), F("desfile-01")],
      [F("foto-02"), F("final-02"), F("desfile-02")],
      [F("foto-03"), F("final-03"), F("desfile-03")],
      [F("foto-04"), F("final-04"), F("desfile-04")]
    ],
    desc: "Quem decide o que é belo? Esta coleção procura a beleza onde ninguém foi ensinado a procurar: na imperfeição, na rachadura, no gesto que não se encaixa. O corpo se envolve e desaparece dentro do tecido; a estrutura, como o concreto de Brasília, se mostra sem vergonha da própria construção. E a orquídea, a flor da minha mãe, é o vermelho que insiste em interromper o cinza.",
    skills: ["Conceito e pesquisa", "Croqui e ilustração", "Desenho técnico", "Modelagem e pilotos", "Confecção"],
    // link para o site completo da coleção (deixe "" para esconder)
    site: "",
    rows: [
      { cols: [[F("desfile-02")], [F("foto-02")]] },
      { title: "Manifesto", text: [
        "Quem decide o que é belo? Nunca vimos o rosto de quem dita essa regra. Só sentimos o peso do seu veredito: isso serve, aquilo não; isso é elegante, aquilo é estranho. E, no entanto, toda vez que olhamos para trás, percebemos o mesmo padrão: o que foi rejeitado ontem é reverenciado hoje.",
        "Existe um pensamento japonês para isso, o wabi-sabi, que entende que nada é acabado, nada é permanente. Por isso o corpo aqui não se expõe: ele se envolve, se enrola, desaparece dentro do próprio tecido. E se o corpo se esconde, a estrutura não."
      ], quote: ["Wabi-sabi é uma beleza das coisas imperfeitas, impermanentes e incompletas.", "Leonard Koren"] },
      { title: "Três pilares", panels: [
        { src: F("painel-japonismo"), t: "Japonismo", text: "Da arte Ukiyo-e ao volume do Kosode e do Kimono, que envolvem o corpo em camadas, dobras e amarrações. De Yamamoto, Kawakubo e Miyake, a apreciação pela imperfeição; de Kenzo Tange e Tadao Ando, a ideia de que o concreto pode ser poético." },
        { src: F("painel-brutalismo"), t: "Brutalismo", text: "Brasília é a minha cidade, e eu vivia dentro do brutalismo sem olhar para ele. Na coleção, isso vira linhas rígidas, ombros que funcionam como pilares e tecidos que expõem costuras e acabamentos, como o concreto expõe vigas." },
        { src: F("painel-orquidea"), t: "Orquídea", text: "A flor favorita da minha mãe cresce sobre rochas e em solos escassos, sem necessariamente pertencer ao lugar que a abriga. Como estudante bolsista, me vejo nela. Na coleção, é o vermelho que tensiona a rigidez do concreto." }
      ] },
      { title: "Croquis", cols: [[F("croqui-01")], [F("croqui-02")], [F("croqui-03")], [F("croqui-04")]], contain: true,
        caps: ["01 Casulo", "02 Armação", "03 Fissura", "04 Ruptura"] },
      { title: "Desenho técnico", cols: [[F("tecnico-01")], [F("tecnico-04-casaco")]], contain: true, caps: ["look 01 · casaco casulo", "look 04 · casaco modular"] },
      { cols: [[F("tecnico-02-calca")], [F("tecnico-04-calca")]], contain: true, caps: ["look 02 · calça", "look 04 · calça"] },
      { title: "Piloto × peça final", text: ["Cada look passou por pilotos antes do tecido final, para testar volume, proporção e as soluções de modelagem."] },
      { cols: [[F("piloto-01"), F("final-01")], [F("piloto-02"), F("final-02")]], caps: ["look 01", "look 02"] },
      { cols: [[F("piloto-03"), F("final-03")], [F("piloto-04"), F("final-04")]], caps: ["look 03", "look 04"] },
      { title: "Os quatro looks", looks: [
        { t: "01 Casulo", text: "Casaco casulo cinza, forrado de feltro vermelho; bolsa de concreto como acessório." },
        { t: "02 Armação", text: "Casaco, colete e mochila numa modelagem só, sobre calça de alfaiataria com costuras aparentes." },
        { t: "03 Fissura", text: "Jaqueta franzida com volume nas costas e bermuda balonê, em cinco camadas de tecido." },
        { t: "04 Ruptura", text: "Casaco modular em cinco partes que se separam: blusa, colete, mochila, capuz e estola." }
      ] },
      { cols: [[F("foto-01")], [F("foto-02")], [F("foto-03")], [F("foto-04")]] },
      { cols: [[F("desfile-01")], [F("desfile-03")], [F("desfile-04")]] }
    ]
  },

  "croquis-in-concreto": {
    title: "Croquis", year: "2026", ctx: "IN-CONCRETO",
    band: [[F("croqui-01")], [F("croqui-02")], [F("croqui-03")], [F("croqui-04")]], bandContain: true,
    desc: "Croquis de frente e costas de cada look da coleção IN-CONCRETO e os desenhos técnicos das peças principais.",
    skills: ["Ilustração de moda", "Croqui frente e costas", "Desenho técnico", "Procreate"],
    rows: [
      { cols: [[F("croqui-01")], [F("croqui-02")]], contain: true, caps: ["01 Casulo", "02 Armação"] },
      { cols: [[F("croqui-03")], [F("croqui-04")]], contain: true, caps: ["03 Fissura", "04 Ruptura"] },
      { title: "Desenho técnico", cols: [[F("tecnico-01")], [F("tecnico-04-casaco")]], contain: true, caps: ["look 01 · casaco casulo", "look 04 · casaco modular"] },
      { cols: [[F("tecnico-02-calca")], [F("tecnico-04-calca")]], contain: true, caps: ["look 02 · calça", "look 04 · calça"] }
    ]
  },

  "merlot": {
    title: "Merlot", year: "2024", ctx: "Y-Hack · Y-Human", pending: true,
    desc: "Coleção desenvolvida em grupo, finalista do Y-Hack (Y-Human).",
    skills: ["Criação em grupo"], rows: []
  },


  "backstage": {
    title: "Backstage", year: "", ctx: "Penha e SPFW", pending: true,
    desc: "Bastidores de desfiles da Penha e da SPFW.",
    skills: ["Backstage de desfile"], rows: []
  }
};
