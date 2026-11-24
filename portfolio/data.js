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
var LF = function (n) { return "media/linhas-de-fuga/" + n + ".webp"; };
var AL = function (k) { return "media/alice/a" + (k < 10 ? "0" : "") + k + ".webp"; };
var IM = function (k) { return "media/impressao/e" + (k < 10 ? "0" : "") + k + ".webp"; };
var C = function (n) { return IC + "colecao/" + n + ".webp"; };
/* IN-CONCRETO: os 10 looks da coleção (4 desfilados) */
var COL10 = [
  ["01", ["01a", "01b"], ["01-1", "01-2"], "kimono cascata · vestido pétala", ""],
  ["02", ["02"], ["02-1", "02-2"], "casaco embaraço · bermuda balonê", "Fissura"],
  ["03", ["03"], ["03-1", "03-2"], "casaco mochila · calça regulável", "Ruptura"],
  ["04", ["04"], ["04-1"], "vestido confusão", "Casulo"],
  ["05", ["05"], ["05-1", "05-2"], "casaco origami · calça pregas", ""],
  ["06", ["06"], ["06-1", "06-2"], "blazer desconstruído · calça pregas", "Armação"],
  ["07", ["07a", "07b"], ["07-1"], "vestido qipao", ""],
  ["08", ["08a", "08b"], ["08-1", "08-2"], "sobretudo desconstruído · vestido drapeado", ""],
  ["09", ["09"], ["09-1", "09-2"], "casaco camadas · calça", ""],
  ["10", ["10"], ["10-1", "10-2"], "jaqueta leque · saia retalhos", ""]
].map(function (l) {
  return { n: l[0], croquis: l[1].map(function (k) { return C("croqui-" + k); }), tecs: l[2].map(function (k) { return C("tecnico-" + k); }),
    pecas: "look " + l[0] + " · " + l[3], cap: "look " + l[0] + (l[4] ? " · desfilado (" + l[4] + ")" : "") };
});
var CS = function (l, n) { return IC + "costura/look-0" + l + "-" + n + ".webp"; };
var ME = function (k) { return "media/merlot/m" + (k < 10 ? "0" : "") + k + ".webp"; };
var SK = function (n) { return "media/sketchbook/" + n + ".webp"; };
var CO = function (n) { return "media/costura/c" + (n < 10 ? "0" : "") + n + ".webp"; };
var MY = function (n) { return "media/merlot/yhack-" + n + ".webp"; };
var PC = function (n) { return "media/pecas/" + n + ".webp"; };
var FP = function (n) { return "media/processo/formatura/p" + n + ".webp"; };
var PP = function (n) { return "media/processo/piet/p" + n + ".webp"; };
var JQ = function (n) { return "media/processo/jaqueta/p" + n + ".webp"; };
var tecs = function (n) { var k = (n < 10 ? "0" : "") + n, o = [LF("tec-" + k + "-1")]; if (n !== 6) o.push(LF("tec-" + k + "-2")); return o; };

window.CATEGORIES = [
  { id: "colecoes", name: "Coleções", projects: ["in-concreto", "linhas-de-fuga", "merlot"],
    // colagem: só fotos de look (sem slides)
    collage: [[F("desfile-02"), F("foto-01"), F("desfile-04"), F("foto-03")], [F("final-01"), F("desfile-03"), F("final-04"), F("foto-02")], [F("foto-04"), F("final-02"), F("desfile-01"), F("final-03")]] },
  { id: "editorial", name: "Editorial", projects: ["alice", "impressao"],
    collage: [[AL(2), IM(5), AL(9), IM(11)], [AL(1), IM(2), AL(11), IM(8)], [AL(6), IM(3), AL(16), IM(12)]] },
  { id: "sketchbook", name: "Sketchbook", projects: ["sketchbook"] },
  { id: "costura", name: "Modelagem e costura", projects: ["modelagem-costura"] }
];

/* colagem da seção Projetos (cada camada troca de foto em stop motion) */
window.COLLAGE = [
  [F("desfile-02"), AL(6), F("desfile-04"), IM(5), F("desfile-01")],
  [AL(1), MY("palco"), IM(2), AL(11), IM(8)],
  [PC("piet-look"), F("foto-03"), CO(17), AL(9), F("foto-01")]
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
    skills: [{ t: "Conceito e pesquisa", to: "Manifesto" }, { t: "Croqui e ilustração", to: "A coleção completa" }, { t: "Desenho técnico", to: "Fichas técnicas" }, { t: "Piloto × peça final", to: "Piloto × peça final" }],
    // link para o site completo da coleção (deixe "" para esconder)
    site: "",
    rows: [
      { cols: [[F("desfile-02")], [F("foto-02")]] },
      { hidden: true, display: {
          figures: ["01-frente", "01-costas", "02-frente", "02-costas", "03-frente", "03-costas", "04-frente", "04-costas"].map(function (n) { return IC + "recorte/" + n + ".webp"; }),
          hero: IC + "recorte/01-frente.webp",
          name: "IN-CONCRETO", tagline: "Antes de ser belo era estranho. Ninguém nasceu belo: alguém decidiu que era.",
          season: "2026 Collection",
          looks: [
            { n: "01", t: "Casulo", src: F("foto-01"), text: "Casaco casulo cinza, forrado de feltro vermelho; bolsa de concreto." },
            { n: "02", t: "Armação", src: F("foto-02"), text: "Casaco, colete e mochila numa modelagem só; calça com costuras aparentes." },
            { n: "03", t: "Fissura", src: F("foto-03"), text: "Jaqueta franzida com volume nas costas e bermuda balonê." },
            { n: "04", t: "Ruptura", src: F("foto-04"), text: "Casaco modular em cinco partes: blusa, colete, mochila, capuz e estola." }
          ] } },
      { title: "Manifesto", text: [
        "Quem decide o que é belo? Nunca vimos o rosto de quem dita essa regra. Só sentimos o peso do seu veredito: isso serve, aquilo não; isso é elegante, aquilo é estranho. E, no entanto, toda vez que olhamos para trás, percebemos o mesmo padrão: o que foi rejeitado ontem é reverenciado hoje.",
        "Existe um pensamento japonês para isso, o wabi-sabi, que entende que nada é acabado, nada é permanente. Por isso o corpo aqui não se expõe: ele se envolve, se enrola, desaparece dentro do próprio tecido. E se o corpo se esconde, a estrutura não."
      ], quote: ["Wabi-sabi é uma beleza das coisas imperfeitas, impermanentes e incompletas.", "Leonard Koren"] },
      { title: "Três pilares", panels: [
        { src: F("painel-japonismo"), t: "Japonismo", text: "Da arte Ukiyo-e ao volume do Kosode e do Kimono, que envolvem o corpo em camadas, dobras e amarrações. De Yamamoto, Kawakubo e Miyake, a apreciação pela imperfeição; de Kenzo Tange e Tadao Ando, a ideia de que o concreto pode ser poético." },
        { src: F("painel-brutalismo"), t: "Brutalismo", text: "Brasília é a minha cidade, e eu vivia dentro do brutalismo sem olhar para ele. Na coleção, isso vira linhas rígidas, ombros que funcionam como pilares e tecidos que expõem costuras e acabamentos, como o concreto expõe vigas." },
        { src: F("painel-orquidea"), t: "Orquídea", text: "A flor favorita da minha mãe cresce sobre rochas e em solos escassos, sem necessariamente pertencer ao lugar que a abriga. Como estudante bolsista, me vejo nela. Na coleção, é o vermelho que tensiona a rigidez do concreto." }
      ] },
      { title: "A coleção completa", text: ["A coleção tem 10 looks. Quatro deles foram escolhidos para o desfile do 21º Concurso FAAP Moda: Fissura (look 02), Ruptura (look 03), Casulo (look 04) e Armação (look 06)."] },
      { cols: [[C("lineup")]], contain: true, ratio: "1521/1069" },
      { cols: COL10.slice(0, 5).map(function (l) { return l.croquis; }), contain: true, ratio: "3/4", caps: COL10.slice(0, 5).map(function (l) { return l.cap; }) },
      { cols: COL10.slice(5).map(function (l) { return l.croquis; }), contain: true, ratio: "3/4", caps: COL10.slice(5).map(function (l) { return l.cap; }) },
      { title: "Fichas técnicas", text: ["Desenho técnico de frente e costas de cada peça. Nos looks com mais de uma peça, o quadro alterna entre elas."] },
      { cols: COL10.slice(0, 5).map(function (l) { return l.tecs; }), contain: true, ratio: "16/10", caps: COL10.slice(0, 5).map(function (l) { return l.pecas; }) },
      { cols: COL10.slice(5).map(function (l) { return l.tecs; }), contain: true, ratio: "16/10", caps: COL10.slice(5).map(function (l) { return l.pecas; }) },
      { title: "Piloto × peça final", text: ["Processo de desenvolvimento das peças dos looks desfilados."] },
      { cols: [[F("piloto-01"), F("final-01")], [F("piloto-02"), F("final-02")]], caps: ["look 01", "look 02"] },
      { cols: [[F("piloto-03"), F("final-03")], [F("piloto-04"), F("final-04")]], caps: ["look 03", "look 04"] },
      { title: "Desfile" },
      { cols: [[F("desfile-01")], [F("desfile-02")], [F("desfile-03")], [F("desfile-04")]] }
    ]
  },


  /* ---------- Linhas de Fuga (coleção em grupo, FAAP — família 2) ---------- */
  "linhas-de-fuga": {
    title: "Linhas de Fuga", year: "junho 2026", ctx: "FAAP · coleção em grupo · família 2",
    band: [[LF("capa")]],
    desc: "Nascendo da aviação como linguagem de deslocamento, invenção e potência, a coleção percorre a história da aeronáutica, do 14-bis de Santos-Dumont ao imaginário técnico e militar do século XX. Fuselagens, cabos, uniformes, mapas de rota e superfícies metálicas viram recortes precisos, volumes aerodinâmicos e silhuetas em movimento. A narrativa é atravessada pelas mulheres que pilotaram, calcularam, montaram e costuraram a construção do voo, de Amelia Earhart e Bessie Coleman às trabalhadoras das fábricas da Segunda Guerra. Linhas de Fuga transforma o voo em metáfora de liberdade, resistência e transformação.",
    credits: "Coleção em grupo com João Sasahara, Lívia Daris, Larissa Cardoso e Sofia Marinho. A família 2, com 12 looks e seus desenhos, é a minha parte da coleção.",
    skills: [{ t: "Conceito e referências", to: "Conceito e referências" }, { t: "Cores e tecidos", to: "Cores e tecidos" }, { t: "Pesquisa de tendências", to: "Pesquisa de tendências" }, { t: "Família 2 · croquis", to: "Família 2 · croquis" }, { t: "Desenho técnico", to: "Planificados" }],
    rows: [
      { title: "Conceito e referências", text: ["Exploração, conquista, espetáculo e símbolo de modernidade: a pesquisa parte da aviação pioneira e chega ao público jovem adulto, urbano e criativo, que transita entre o clássico e o experimental."] },
      { cols: [[LF("mood1")]], ratio: "16/9" },
      { cols: [[LF("mood2")], [LF("mood3")]], ratio: "16/9" },
      { title: "Cores e tecidos" },
      { cols: [[LF("paleta")]], contain: true, ratio: "16/9" },
      { cols: [[LF("tec1")]], ratio: "16/9" },
      { cols: [[LF("tec2")], [LF("tec3")]], contain: true, ratio: "3/2" },
      { cols: [[LF("tec4")], [LF("tec5")]], contain: true, ratio: "3/2" },
      { cols: [[LF("estampa1")], [LF("estampa2")]], ratio: "1/1", caps: ["estampa", "estampa"] },
      { title: "Pesquisa de tendências", text: ["Pranchas de tendências que orientaram a coleção: alfaiataria desconstruída, gola estruturada, minimalismo, ponto de cor e pelo."] },
      { cols: [[LF("tend1")], [LF("tend2")]], ratio: "16/9" },
      { cols: [[LF("tend3")], [LF("tend4")]], ratio: "16/9" },
      { cols: [[LF("tend5")]], ratio: "16/9" },
      { title: "Acessórios" },
      { cols: [[LF("acess")]], contain: true, ratio: "16/10" },
      { title: "Família 2 · croquis", text: ["Minha parte da coleção: 12 looks, de frente e de costas."] },
      { cols: [[LF("lineup")]], contain: true, ratio: "16/9" },
      { cols: [1, 2, 3, 4].map(function (n) { return [LF("look-0" + n)]; }), contain: true, ratio: "1/1", caps: ["look 01", "look 02", "look 03", "look 04"] },
      { cols: [5, 6, 7, 8].map(function (n) { return [LF("look-0" + n)]; }), contain: true, ratio: "1/1", caps: ["look 05", "look 06", "look 07", "look 08"] },
      { cols: [9, 10, 11, 12].map(function (n) { return [LF("look-" + (n < 10 ? "0" : "") + n)]; }), contain: true, ratio: "1/1", caps: ["look 09", "look 10", "look 11", "look 12"] },
      { title: "Planificados", text: ["Desenho técnico de frente e costas de cada peça. Cada quadro alterna entre as peças do look."] },
      { cols: [1, 2, 3, 4].map(tecs), contain: true, ratio: "3/2", caps: ["look 01", "look 02", "look 03", "look 04"] },
      { cols: [5, 6, 7, 8].map(tecs), contain: true, ratio: "3/2", caps: ["look 05", "look 06", "look 07", "look 08"] },
      { cols: [9, 10, 11, 12].map(tecs), contain: true, ratio: "3/2", caps: ["look 09", "look 10", "look 11", "look 12"] }
    ]
  },


  /* ---------- Fotografia: editoriais ---------- */
  "alice": {
    title: "Alice in Rock 'n Roll", year: "junho 2026", ctx: "editorial · styling e direção criativa · em grupo",
    band: [[AL(2), AL(6), AL(12)], [AL(3), AL(9), AL(16)], [AL(4), AL(10), AL(17)], [AL(7), AL(13), AL(19)]],
    desc: "Este editorial reimagina a narrativa clássica de Alice no País das Maravilhas dentro do universo glamuroso e caótico do rock 'n' roll dos anos 70: excessos, festas decadentes, música alta e luzes dramáticas, onde fantasia e realidade se confundem. A narrativa visual explora a cultura das groupies, os bastidores do rock e a energia dos palcos, construindo a sensação de uma noite sem fim.",
    credits: "Em grupo com Elisa Spadoni, Larissa Cardoso, Lívia Daris, Sofia Marinho e Sol Reguera. Styling e direção criativa feitos em grupo.",
    skills: [{ t: "Alice", to: "Alice" }, { t: "Chapeleira", to: "Chapeleira" }, { t: "Rainha", to: "Rainha" }],
    rows: [
      { cols: [[AL(2)], [AL(3)], [AL(4)]] },
      { title: "Alice", text: ["Inspirada na cultura das groupies, a personagem é inserida na atmosfera intensa de uma balada, cercada por excessos e extravagância. Ela é a garota que dança até o amanhecer, transforma o caos em encanto e permanece quando todos já foram embora."] },
      { cols: [[AL(1)]], ratio: "3/2" },
      { cols: [[AL(6)], [AL(7)]] },
      { cols: [[AL(5)]], ratio: "3/2" },
      { title: "Chapeleira", text: ["A Chapeleira Maluca representa o caos criativo e a excentricidade do rock. A personagem está num estúdio de gravação, espaço de experimentação, liberdade artística e construção de identidade, onde genialidade e desordem coexistem."] },
      { cols: [[AL(8)]], ratio: "3/2" },
      { cols: [[AL(9)], [AL(10)]] },
      { cols: [[AL(11)]], ratio: "3/2" },
      { cols: [[AL(12)], [AL(13)], [AL(14)]] },
      { title: "Rainha", text: ["A Rainha de Copas vira a grande figura de poder desse universo: uma frontwoman inspirada nas maiores figuras do punk. Presença, autoridade e intensidade, traduzindo a energia explosiva das apresentações ao vivo."] },
      { cols: [[AL(15)]], ratio: "3/2" },
      { cols: [[AL(16)], [AL(17)]] },
      { cols: [[AL(18)], [AL(19)], [AL(20)]] },
      { cols: [[AL(21)]], ratio: "3/2" }
    ]
  },

  "impressao": {
    title: "Da Impressão à Expressão", year: "abril 2026", ctx: "editorial · styling e direção criativa · em grupo",
    band: [[IM(1), IM(5), IM(11)], [IM(3), IM(6), IM(12)], [IM(4), IM(9), IM(16)], [IM(7), IM(10), IM(17)]],
    desc: "“O momento em que a luz se torna emoção.” Um editorial em dois tempos: parte da estética leve e luminosa do Impressionismo, que tenta capturar o instante antes que ele desapareça, e atravessa a ruptura até a expressão intensa do Expressionismo, onde a emoção deforma a imagem.",
    credits: "Em grupo com Elisa Spadoni, Larissa Cardoso, Lívia Daris, Sofia Marinho e Sol Reguera. Styling e direção criativa feitos em grupo.",
    skills: [{ t: "Impressão", to: "Impressão" }, { t: "Passagem", to: "Passagem" }, { t: "Expressão", to: "Expressão" }],
    rows: [
      { cols: [[IM(0)]], ratio: "16/9" },
      { title: "Impressão", text: ["No Impressionismo a pintura se liberta do peso da linha e do acabamento acadêmico. A pincelada torna-se visível, fragmentada, quase inacabada; uma vibração que tenta acompanhar a instabilidade da luz.", "A tinta é aplicada em toques rápidos, cores puras justapostas, recusando o preto e as sombras rígidas. A técnica, aqui, é um gesto de perda: tudo está sempre prestes a se dissolver."] },
      { cols: [[IM(1)], [IM(3)], [IM(4)]] },
      { cols: [[IM(2)]], ratio: "16/9" },
      { cols: [[IM(5)], [IM(6)], [IM(7)]] },
      { title: "Passagem", text: ["Ao fim do século, a técnica já não busca apenas a luz, mas estrutura, emoção e permanência, com a exploração de texturas e camadas."] },
      { cols: [[IM(8)]], ratio: "16/9" },
      { cols: [[IM(9)], [IM(10)], [IM(11)]] },
      { title: "Expressão", text: ["No Expressionismo, a técnica deixa de servir à aparência e passa a obedecer à tensão interna. A pincelada é crua, abrupta; a cor, antinatural, aplicada em contrastes intensos. A deformação não é erro, mas método: a técnica já não tenta capturar o mundo, ela o rompe."] },
      { cols: [[IM(12)], [IM(13)], [IM(14)]], ratio: "3/4" },
      { cols: [[IM(15)]], ratio: "16/9" },
      { cols: [[IM(16)], [IM(17)], [IM(18)]] }
    ]
  },

  /* ---------- Sketchbook: rascunhos à mão e no digital ---------- */
  "sketchbook": {
    title: "Sketchbook", year: "", ctx: "sketches e rascunhos · à mão e no digital",
    band: [[SK("digital-01"), SK("manual-08")], [SK("digital-02"), SK("manual-14")], [SK("digital-03"), SK("manual-10")], [SK("digital-04"), SK("manual-11")]], bandContain: true,
    desc: "Rascunhar sempre fez parte do meu processo: é onde testo traços, composições e ideias antes de elas virarem roupa. Aqui estão alguns sketches, à mão e no digital, entre croquis, objetos e desenhos livres.",
    skills: [{ t: "Croquis", to: "Croquis" }, { t: "Rascunhos", to: "Rascunhos" }],
    rows: [
      { title: "Croquis" },
      { cols: [[SK("digital-01")], [SK("digital-02")], [SK("digital-03")], [SK("digital-04")]], contain: true, ratio: "3/4" },
      { title: "Rascunhos" },
      { cols: [[SK("manual-08")], [SK("manual-14")], [SK("manual-10")], [SK("manual-11")]], contain: true, ratio: "3/4" },
      { cols: [[SK("manual-04")], [SK("manual-24")], [SK("manual-29")], [SK("manual-13")]], contain: true, ratio: "3/4" },
      { cols: [[SK("manual-18")], [SK("manual-19")], [SK("manual-20")], [SK("digital-18")]], contain: true, ratio: "3/4" },
      { cols: [[SK("manual-21")], [SK("manual-22")], [SK("digital-15")], [SK("digital-14")]], contain: true, ratio: "3/4" },
      { cols: [[SK("digital-11")], [SK("digital-12")], [SK("digital-13")], [SK("digital-17")]], contain: true, ratio: "3/4" }
    ]
  },




  /* ---------- Modelagem e costura: peças feitas por mim ---------- */
  "modelagem-costura": {
    title: "Modelagem e costura", year: "", ctx: "", noBand: true,
    desc: "Comecei em 2022 um curso livre de corte, costura e modelagem, que concluí em 2024. Desde então, sigo desenvolvendo algumas peças.",
    skills: [{ t: "Conjunto risca de giz", to: "Conjunto risca de giz · 2025" }, { t: "Jaqueta", to: "Jaqueta · 2025" }, { t: "Vestido de formatura", to: "Vestido de formatura · 2024" }, { t: "Peças do curso de costura", to: "Peças do curso de costura" }],
    rows: [
      { title: "Conjunto risca de giz · 2025", text: ["Top com amarração lateral em correntes passadas por ilhoses e calça de cintura alta com correntes douradas e prateadas que caem em camadas."] },
      { board: {
          steps: [
            { src: PP(1), note: "marcando o tecido" },
            { src: PP(2), note: "cortando o tecido" },
            { src: PP(3), note: "costurando" },
            { src: PP(4), note: "" }
          ],
          final: [PC("piet-look"), PC("piet-detalhe")], tag: "peça pronta" } },
      { title: "Jaqueta · 2025", text: ["Sarja preta com recortes em vinho, gola alta com zíper, fechos de engate em metal e bolsos embutidos."] },
      { board: {
          layout: "grid2",
          steps: [
            { src: JQ(1), note: "modelagem" },
            { src: JQ(2), note: "piloto" },
            { src: JQ(3), note: "testes" },
            { src: JQ(4), note: "provando" }
          ],
          final: [JQ(6), JQ(5)], tag: "peça pronta" } },
      { hidden: true, title: "Blusa e saia · maio 2025", text: ["Blusa branca de gola alta com cordões de ajuste na cintura e nos punhos.", "Saia preta pregueada."] },
      { title: "Vestido de formatura · 2024", text: ["Vestido executado para a minha formatura do ensino médio. Minha primeira peça em moulage: a modelagem foi construída direto no corpo, de forma mais tridimensional."] },
      { board: {
          steps: [
            { src: FP(1), note: "plissando o tecido à mão" },
            { src: FP(2), note: "" },
            { src: FP(3), note: "começando a moulage do busto" },
            { src: FP(4), note: "moulage" },
            { src: FP(5), note: "cortando a saia" },
            { src: FP(6), note: "provando e fazendo os ajustes finais" }
          ],
          final: [CO(17), CO(16), CO(15)], tag: "peça pronta" } },
      { title: "Peças do curso de costura" },
      { sub: "Vestido longo com fenda", cols: [[CO(4)], [CO(5)], [CO(6)]], ratio: "2/3", mid: true },
      { sub: "Vestido de cetim de amarrar no pescoço", cols: [[CO(9)], [CO(10)]], ratio: "2/3", mid: true },
      { sub: "Vestido com amarração em correntes", cols: [[CO(12)], [CO(11)]], ratio: "2/3", mid: true },
      { sub: "Vestido de veludo", cols: [[CO(14)], [CO(13)]], ratio: "2/3", mid: true }
    ]
  },


  "merlot": {
    title: "Merlot", year: "2024", ctx: "Y-Hack · Y-Human · finalista · coleção em grupo",
    band: [[MY("palco")]],
    desc: "A coleção tem como tema as plantações de uvas, com foco no Rio Grande do Sul, e lança luz sobre a beleza e a complexidade do cultivo ao mesmo tempo em que denuncia o trabalho análogo à escravidão nos vinhedos. Workwear agrícola, a folha, o cacho, os ramos e o pássaro merlo-preto, que deu nome à uva, viram recortes, bolsos, texturas e estampas em cinco looks e acessórios.",
    credits: "Coleção em grupo com João Cardoso, Larissa Cardoso, Lisa Guerra, Lívia Daris e Sofia Marinho. Finalista do Y-Hack (Y-Human). Participei da criação do conceito e das peças e fiz as ilustrações de algumas peças, do sapato e da bolsa.",
    skills: [{ t: "Contexto", to: "Contexto" }, { t: "Looks", to: "Look 1" }, { t: "Acessórios", to: "Acessórios" }, { t: "Apresentação no Y-Hack", to: "Apresentação no Y-Hack" }],
    rows: [
      { title: "Contexto", text: ["Apesar dos avanços tecnológicos e das leis trabalhistas, ainda há relatos frequentes de condições abusivas nas plantações de uvas: jornadas extenuantes, salários inadequados e trabalhadores migrantes aliciados com falsas promessas. A coleção vira o olhar para essa região e para quem sustenta a colheita."] },
      { cols: [[ME(5)], [ME(6)]], ratio: "16/9", caps: ["referências", "paleta de cores"] },
      { title: "Look 1", text: ["Bomber com recortes assimétricos que lembram rasgos, como o esmagamento das uvas e a perda do fruto; calça inspirada no pecíolo, o “cabinho” que nutre a uva."] },
      { cols: [[ME(7)]], ratio: "16/9" },
      { cols: [[ME(8)], [ME(9)]], ratio: "16/9" },
      { title: "Look 2", text: ["Workwear da agricultura brasileira: camiseta de manga longa desgastada com pássaros em voo e calça jeans de bolsos, com aspecto embarrado."] },
      { cols: [[ME(10)]], ratio: "16/9" },
      { cols: [[ME(11)], [ME(12)]], ratio: "16/9" },
      { title: "Look 3", text: ["Moletom na cor do fungo que ataca a folha da videira e calça “folha”, no verde da folhagem da uva merlot."] },
      { cols: [[ME(13)]], ratio: "16/9" },
      { cols: [[ME(14)], [ME(15)]], ratio: "16/9" },
      { title: "Look 4", text: ["Colete cargo cheio de bolsos, como as ferramentas da colheita, e calça “ramos”, com recortes inspirados na poda: perder para renascer."] },
      { cols: [[ME(16)]], ratio: "16/9" },
      { cols: [[ME(17)], [ME(18)]], ratio: "16/9" },
      { cols: [[ME(19)]], ratio: "16/9" },
      { title: "Look 5", text: ["Moletom inspirado no parasitismo do merlo-preto, como se o pássaro consumisse o merlot; calça com bolsos no formato esférico da uva."] },
      { cols: [[ME(20)]], ratio: "16/9" },
      { cols: [[ME(21)], [ME(22)]], ratio: "16/9" },
      { title: "Acessórios", text: ["Ilustrações do sapato e da bolsa feitas por mim. Bolsa inspirada nas cestas da colheita, bota de sola tratorada em vinho, boné com logo retrô e lenço com a estampa dos pássaros interligados."] },
      { cols: [[ME(23)], [ME(24)]], ratio: "16/9" },
      { cols: [[ME(25)], [ME(26)]], ratio: "16/9" },
      { title: "Apresentação no Y-Hack", text: ["A coleção foi apresentada pelo grupo na final do Y-Hack 2024, peça por peça, para a banca e o público."] },
      { cols: [[MY("palco")]], ratio: "1115/725" },
      { cols: [[MY("fala")], [MY("retrato")]], ratio: "2/3" },
      { cols: [[MY("grupo")], [MY("turma")]], ratio: "16/10" }
    ]
  },


};
