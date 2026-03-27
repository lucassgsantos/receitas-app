const slugifyRecipe = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeImageUrl = (value) => {
  if (!value.includes("upload.wikimedia.org/wikipedia/commons/thumb/")) {
    return value;
  }

  const parts = value.split("/");
  const fileName = decodeURIComponent(parts[parts.length - 2] || "");

  if (!fileName) {
    return value;
  }

  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
};

const rawRecipes = [
  {
    id: 1,
    nome: "Feijoada",
    categoria: "Prato Principal",
    origem: "Brasil",
    resumo: "Um clássico de domingo com caldo encorpado, carnes suculentas e tudo o que pede uma mesa farta.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Feijoada_01.jpg/342px-Feijoada_01.jpg",
    tags: ["Tradicional", "Almoço de domingo", "Feijão"],
    tempoMin: 90,
    porcoes: 6,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Feijão-preto", medida: "500 g" },
      { nome: "Costelinha de porco", medida: "300 g" },
      { nome: "Linguiça calabresa", medida: "200 g" },
      { nome: "Carne-seca", medida: "200 g" },
      { nome: "Bacon", medida: "100 g" },
      { nome: "Cebola", medida: "2 unidades" },
      { nome: "Alho", medida: "4 dentes" },
      { nome: "Folhas de louro", medida: "2 unidades" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Pimenta-do-reino", medida: "a gosto" }
    ],
    instrucoes: [
      "Deixe o feijão de molho por pelo menos 8 horas. Escorra e cozinhe em panela de pressão com água por cerca de 20 minutos.",
      "Em outra panela, doure o bacon e refogue cebola e alho até perfumar.",
      "Adicione a linguiça e a costelinha e deixe ganhar cor antes de juntar a carne-seca.",
      "Misture as carnes ao feijão, acrescente o louro, ajuste sal e pimenta e cozinhe em fogo baixo por mais 35 a 40 minutos.",
      "Amasse alguns grãos para engrossar o caldo e sirva com arroz, farofa, couve e laranja."
    ]
  },
  {
    id: 2,
    nome: "Coxinha",
    categoria: "Salgado",
    origem: "Brasil",
    resumo: "Casquinha dourada e recheio cremoso de frango para aquele lanche de vitrine ou festa em casa.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Coxinha.jpg/600px-Coxinha.jpg",
    tags: ["Festa", "Lanche", "Frito"],
    tempoMin: 70,
    porcoes: 12,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Peito de frango", medida: "500 g" },
      { nome: "Farinha de trigo", medida: "3 xícaras" },
      { nome: "Caldo de galinha", medida: "2 xícaras" },
      { nome: "Margarina", medida: "2 colheres de sopa" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Cream cheese", medida: "100 g" },
      { nome: "Ovos", medida: "2 unidades" },
      { nome: "Farinha de rosca", medida: "2 xícaras" },
      { nome: "Óleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: [
      "Cozinhe o frango em água com sal, desfie bem e reserve.",
      "Refogue cebola e alho, junte o frango desfiado e finalize com cream cheese para um recheio úmido.",
      "Ferva o caldo com a margarina e despeje a farinha de uma vez, mexendo até a massa desgrudar da panela.",
      "Com a massa morna, abra porções na mão, recheie e modele no formato de coxinha.",
      "Passe no ovo, depois na farinha de rosca, e frite em óleo quente até dourar."
    ]
  },
  {
    id: 3,
    nome: "Pão de Queijo",
    categoria: "Salgado",
    origem: "Minas Gerais",
    resumo: "Macio por dentro, levemente elástico e perfeito para acompanhar café passado na hora.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Pao_de_queijo_com_cafe.jpg/600px-Pao_de_queijo_com_cafe.jpg",
    tags: ["Mineiro", "Café da tarde", "Assado"],
    tempoMin: 40,
    porcoes: 20,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Polvilho azedo", medida: "500 g" },
      { nome: "Leite", medida: "1 xícara" },
      { nome: "Óleo", medida: "1/2 xícara" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Queijo minas curado", medida: "200 g" },
      { nome: "Sal", medida: "1 colher de chá" }
    ],
    instrucoes: [
      "Ferva o leite com o óleo e o sal.",
      "Despeje o líquido sobre o polvilho e mexa até escaldar toda a massa.",
      "Espere amornar, adicione os ovos um a um e incorpore o queijo ralado.",
      "Sove rapidamente até obter massa lisa e forme bolinhas com as mãos untadas.",
      "Asse a 180 °C por 25 a 30 minutos, até inflar e dourar."
    ]
  },
  {
    id: 4,
    nome: "Brigadeiro",
    categoria: "Sobremesa",
    origem: "Brasil",
    resumo: "O docinho mais icônico das festas brasileiras, com ponto certo para enrolar e brilho de confeitaria caseira.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrigadeiroBrazil.jpg/600px-BrigadeiroBrazil.jpg",
    tags: ["Doce", "Festa", "Clássico"],
    tempoMin: 25,
    porcoes: 20,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Leite condensado", medida: "1 lata" },
      { nome: "Chocolate em pó", medida: "3 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de sopa" },
      { nome: "Chocolate granulado", medida: "para cobrir" }
    ],
    instrucoes: [
      "Misture o leite condensado, o chocolate em pó e a manteiga em uma panela.",
      "Cozinhe em fogo médio, mexendo sem parar, até a mistura desgrudar do fundo.",
      "Transfira para um prato untado e deixe esfriar completamente.",
      "Modele bolinhas com as mãos untadas e envolva no granulado antes de servir."
    ]
  },
  {
    id: 5,
    nome: "Moqueca Baiana",
    categoria: "Prato Principal",
    origem: "Bahia",
    resumo: "Peixe cozido em camadas de legumes, leite de coco e dendê para um caldo perfumado e vibrante.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/MOQUECAB.jpg/525px-MOQUECAB.jpg",
    tags: ["Nordestino", "Frutos do mar", "Ensopado"],
    tempoMin: 60,
    porcoes: 4,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Filé de peixe", medida: "800 g" },
      { nome: "Leite de coco", medida: "400 ml" },
      { nome: "Azeite de dendê", medida: "4 colheres de sopa" },
      { nome: "Tomate", medida: "3 unidades" },
      { nome: "Pimentão", medida: "2 unidades" },
      { nome: "Cebola", medida: "2 unidades" },
      { nome: "Coentro", medida: "1 maço" },
      { nome: "Limão", medida: "2 unidades" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Pimenta", medida: "a gosto" }
    ],
    instrucoes: [
      "Tempere o peixe com limão, sal e pimenta e deixe marinar por 30 minutos.",
      "Corte tomates, pimentões e cebolas em rodelas para montar as camadas.",
      "Em uma panela funda, alterne cebola, pimentão, tomate e peixe.",
      "Despeje o leite de coco e regue com o dendê.",
      "Tampe, cozinhe em fogo baixo por cerca de 30 minutos e finalize com coentro."
    ]
  },
  {
    id: 6,
    nome: "Empadão de Frango",
    categoria: "Prato Principal",
    origem: "Brasil",
    resumo: "Massa amanteigada, recheio cremoso e uma daquelas receitas que fazem sucesso em almoço especial.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Empad%C3%A3o.JPG/600px-Empad%C3%A3o.JPG",
    tags: ["Torta", "Almoço", "Forno"],
    tempoMin: 90,
    porcoes: 8,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "4 xícaras" },
      { nome: "Manteiga", medida: "250 g" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Peito de frango", medida: "600 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Azeitona", medida: "100 g" },
      { nome: "Palmito", medida: "1 vidro" },
      { nome: "Catupiry", medida: "200 g" },
      { nome: "Sal e pimenta", medida: "a gosto" }
    ],
    instrucoes: [
      "Misture farinha, manteiga e ovos até formar uma massa uniforme. Leve à geladeira por 30 minutos.",
      "Cozinhe e desfie o frango, refogando com cebola, alho, azeitona, palmito e temperos.",
      "Forre a forma com dois terços da massa e espalhe o recheio.",
      "Adicione colheradas de catupiry, cubra com o restante da massa e pincele gema.",
      "Asse a 200 °C por 35 a 40 minutos, até dourar."
    ]
  },
  {
    id: 7,
    nome: "Açaí na Tigela",
    categoria: "Sobremesa",
    origem: "Pará",
    resumo: "Refrescante, cremoso e perfeito para dias quentes, com frutas e crocância por cima.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/A%C3%A7a%C3%AD_na_tigela_1.jpg/600px-A%C3%A7a%C3%AD_na_tigela_1.jpg",
    tags: ["Gelado", "Fruta", "Lanche"],
    tempoMin: 10,
    porcoes: 2,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Polpa de açaí", medida: "400 g" },
      { nome: "Banana", medida: "2 unidades" },
      { nome: "Granola", medida: "4 colheres de sopa" },
      { nome: "Leite condensado", medida: "a gosto" },
      { nome: "Morango", medida: "6 unidades" },
      { nome: "Mel", medida: "a gosto" }
    ],
    instrucoes: [
      "Bata a polpa de açaí congelada com 1 banana até ficar cremosa. Se necessário, adicione só um pouco de água.",
      "Distribua em tigelas geladas para manter a consistência.",
      "Finalize com a outra banana em rodelas, morangos, granola e leite condensado ou mel."
    ]
  },
  {
    id: 8,
    nome: "Baião de Dois",
    categoria: "Prato Principal",
    origem: "Ceará",
    resumo: "Arroz, feijão e queijo coalho em uma panela só, com sabor intenso e textura cremosa.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bai%C3%A3o_de_dois.jpg/600px-Bai%C3%A3o_de_dois.jpg",
    tags: ["Nordestino", "Conforto", "Panela única"],
    tempoMin: 50,
    porcoes: 5,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Arroz", medida: "2 xícaras" },
      { nome: "Feijão-verde", medida: "1 xícara" },
      { nome: "Bacon", medida: "150 g" },
      { nome: "Linguiça calabresa", medida: "200 g" },
      { nome: "Queijo coalho", medida: "200 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "3 dentes" },
      { nome: "Manteiga de garrafa", medida: "2 colheres de sopa" },
      { nome: "Coentro", medida: "a gosto" },
      { nome: "Sal", medida: "a gosto" }
    ],
    instrucoes: [
      "Cozinhe o feijão-verde por cerca de 15 minutos e reserve com o caldo.",
      "Em outra panela, frite bacon e linguiça até dourarem. Junte cebola e alho.",
      "Acrescente o arroz cru, misture bem e despeje o feijão com o caldo.",
      "Cozinhe até o arroz ficar macio, completando água quente se necessário.",
      "Finalize com queijo coalho em cubos, manteiga de garrafa e coentro."
    ]
  },
  {
    id: 9,
    nome: "Pudim de Leite",
    categoria: "Sobremesa",
    origem: "Brasil",
    resumo: "Sobremesa clássica de textura lisa, com calda dourada e tempo de geladeira que vale a espera.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pudim_de_leite_%283544235183%29.jpg/600px-Pudim_de_leite_%283544235183%29.jpg",
    tags: ["Doce", "Geladeira", "Clássico"],
    tempoMin: 320,
    porcoes: 8,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Leite condensado", medida: "1 lata" },
      { nome: "Leite", medida: "1 medida da lata" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Açúcar", medida: "1 xícara" },
      { nome: "Água", medida: "1/4 de xícara" }
    ],
    instrucoes: [
      "Faça a calda caramelizando açúcar com água na própria forma e espalhe pelo fundo.",
      "Bata leite condensado, leite e ovos por 2 minutos no liquidificador.",
      "Despeje na forma, cubra com papel-alumínio e asse em banho-maria a 180 °C por 1 hora.",
      "Esfrie completamente e deixe gelar por pelo menos 4 horas antes de desenformar."
    ]
  },
  {
    id: 10,
    nome: "Acarajé",
    categoria: "Salgado",
    origem: "Bahia",
    resumo: "Bolinho emblemático da culinária baiana, com crosta dourada no dendê e recheio cheio de personalidade.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Acaraje.jpg/600px-Acaraje.jpg",
    tags: ["Bahia", "Frito", "Rua"],
    tempoMin: 80,
    porcoes: 10,
    dificuldade: "Difícil",
    ingredientes: [
      { nome: "Feijão-fradinho", medida: "500 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Azeite de dendê", medida: "para fritar" },
      { nome: "Camarão seco", medida: "200 g" },
      { nome: "Vatapá", medida: "para rechear" },
      { nome: "Caruru", medida: "para rechear" },
      { nome: "Salada", medida: "para acompanhar" }
    ],
    instrucoes: [
      "Depois de demolhar o feijão, retire as cascas esfregando os grãos.",
      "Bata o feijão com a cebola até formar uma massa grossa, usando o mínimo de água possível.",
      "Tempere com sal e bata vigorosamente com colher de pau para aerar.",
      "Frite porções da massa em dendê quente até dourarem.",
      "Abra ao meio e recheie com vatapá, caruru e camarão seco."
    ]
  },
  {
    id: 11,
    nome: "Tapioca",
    categoria: "Lanche",
    origem: "Nordeste",
    resumo: "Lanche rápido, leve e versátil, com disco macio e recheio de queijo e coco.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tapioca_do_Alto_da_S%C3%A9_-_Olinda-PE.jpg/600px-Tapioca_do_Alto_da_S%C3%A9_-_Olinda-PE.jpg",
    tags: ["Leve", "Café da manhã", "Nordeste"],
    tempoMin: 10,
    porcoes: 2,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Goma de tapioca", medida: "4 colheres de sopa" },
      { nome: "Queijo coalho", medida: "100 g" },
      { nome: "Coco ralado", medida: "2 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de chá" }
    ],
    instrucoes: [
      "Peneire a goma para deixar a massa bem soltinha.",
      "Espalhe a tapioca em frigideira quente, sem apertar, até formar um disco.",
      "Recheie com queijo coalho e coco, dobre ao meio e deixe mais 1 minuto antes de servir."
    ]
  },
  {
    id: 12,
    nome: "Bolo de Cenoura",
    categoria: "Sobremesa",
    origem: "Brasil",
    resumo: "Bolo fofinho, dourado e coberto com aquela calda de chocolate que escorre do jeito certo.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Peda%C3%A7o_de_Bolo_de_Cenoura%2C_08-12-2020.jpg/600px-Peda%C3%A7o_de_Bolo_de_Cenoura%2C_08-12-2020.jpg",
    tags: ["Bolo", "Chocolate", "Caseiro"],
    tempoMin: 55,
    porcoes: 10,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Cenoura", medida: "3 unidades" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Óleo", medida: "1 xícara" },
      { nome: "Açúcar", medida: "2 xícaras" },
      { nome: "Farinha de trigo", medida: "2,5 xícaras" },
      { nome: "Fermento em pó", medida: "1 colher de sopa" },
      { nome: "Chocolate em pó", medida: "4 colheres de sopa" },
      { nome: "Leite", medida: "2 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de sopa" }
    ],
    instrucoes: [
      "Bata no liquidificador cenouras, ovos e óleo até obter um creme liso.",
      "Misture farinha e açúcar em uma tigela e incorpore o creme batido.",
      "Adicione o fermento delicadamente e despeje em forma untada.",
      "Asse a 180 °C por cerca de 40 minutos.",
      "Para a cobertura, derreta manteiga com chocolate e leite até ficar cremosa e espalhe sobre o bolo ainda morno."
    ]
  },
  {
    id: 13,
    nome: "Arroz Carreteiro",
    categoria: "Prato Principal",
    origem: "Rio Grande do Sul",
    resumo: "Receita rústica e acolhedora, com carne-seca desfiada e tempero que perfuma a cozinha inteira.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Arroz_carreteiro.jpg/600px-Arroz_carreteiro.jpg",
    tags: ["Gaúcho", "Panela única", "Conforto"],
    tempoMin: 55,
    porcoes: 6,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Arroz", medida: "2 xícaras" },
      { nome: "Carne-seca", medida: "500 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "3 dentes" },
      { nome: "Tomate", medida: "2 unidades" },
      { nome: "Pimentão", medida: "1 unidade" },
      { nome: "Cheiro-verde", medida: "a gosto" },
      { nome: "Sal e pimenta", medida: "a gosto" }
    ],
    instrucoes: [
      "Dessalgue a carne-seca de véspera e cozinhe até ficar macia.",
      "Desfie e refogue com cebola, alho, tomate e pimentão.",
      "Junte o arroz cru, misture por alguns minutos e cubra com água quente.",
      "Cozinhe em fogo baixo até o arroz secar e finalizar com cheiro-verde."
    ]
  },
  {
    id: 14,
    nome: "Pastel de Feira",
    categoria: "Salgado",
    origem: "Brasil",
    resumo: "Crocância de feira, massa leve e recheio caprichado para comer na hora, bem quente.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Brazilian_pastel.jpg/600px-Brazilian_pastel.jpg",
    tags: ["Lanche", "Feira", "Frito"],
    tempoMin: 60,
    porcoes: 8,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "3 xícaras" },
      { nome: "Óleo", medida: "2 colheres de sopa" },
      { nome: "Cachaça", medida: "1 colher de sopa" },
      { nome: "Água morna", medida: "1 xícara" },
      { nome: "Sal", medida: "1 colher de chá" },
      { nome: "Carne moída", medida: "300 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Queijo mussarela", medida: "200 g" },
      { nome: "Óleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: [
      "Misture farinha, sal, óleo, cachaça e água morna até formar massa lisa. Descanse por 30 minutos.",
      "Refogue cebola e carne moída, ajustando os temperos até o recheio ficar seco.",
      "Abra a massa bem fina, corte retângulos e recheie com carne ou queijo.",
      "Feche pressionando as bordas com um garfo e frite em óleo bem quente até dourar."
    ]
  },
  {
    id: 15,
    nome: "Misto Quente",
    categoria: "Lanche",
    origem: "Brasil",
    resumo: "Conforto imediato em poucos minutos, com pão douradinho e queijo derretendo no centro.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mmm...hot_ham_and_cheese_with_homemade_mustard_%284970848133%29.jpg/600px-Mmm...hot_ham_and_cheese_with_homemade_mustard_%284970848133%29.jpg",
    tags: ["Rápido", "Lanche", "Sanduíche"],
    tempoMin: 15,
    porcoes: 1,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Pão de forma", medida: "2 fatias" },
      { nome: "Presunto", medida: "2 fatias" },
      { nome: "Queijo mussarela", medida: "2 fatias" },
      { nome: "Manteiga", medida: "a gosto" }
    ],
    instrucoes: [
      "Passe manteiga no lado externo das fatias de pão.",
      "Monte o sanduíche com presunto e queijo no centro.",
      "Doure em frigideira ou sanduicheira, virando para o queijo derreter e o pão ficar crocante."
    ]
  },
  {
    id: 16,
    nome: "Bolinho de Chuva",
    categoria: "Sobremesa",
    origem: "Brasil",
    resumo: "Receita afetiva de café da tarde, com bolinhos macios, dourados e perfumados com canela.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bolinho_de_chuva.jpg/600px-Bolinho_de_chuva.jpg",
    tags: ["Doce", "Café da tarde", "Frito"],
    tempoMin: 25,
    porcoes: 18,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "2 xícaras" },
      { nome: "Ovos", medida: "2 unidades" },
      { nome: "Leite", medida: "1/2 xícara" },
      { nome: "Açúcar", medida: "4 colheres de sopa" },
      { nome: "Fermento em pó", medida: "1 colher de sopa" },
      { nome: "Canela em pó", medida: "para polvilhar" },
      { nome: "Óleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: [
      "Misture farinha, açúcar e fermento em uma tigela.",
      "Junte ovos e leite e mexa até formar massa grossa e homogênea.",
      "Frite porções em óleo médio até dourarem por igual.",
      "Escorra e envolva em açúcar com canela enquanto ainda estiverem mornos."
    ]
  },
  {
    id: 17,
    nome: "Frango à Parmegiana",
    categoria: "Prato Principal",
    origem: "Brasil",
    resumo: "Filé empanado, molho, queijo borbulhando e aquele clima de almoço de família que nunca sai de moda.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Chicken_parmigiana.jpg/600px-Chicken_parmigiana.jpg",
    tags: ["Clássico", "Almoço", "Forno"],
    tempoMin: 50,
    porcoes: 4,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Peito de frango", medida: "4 filés" },
      { nome: "Farinha de trigo", medida: "1 xícara" },
      { nome: "Ovos", medida: "2 unidades" },
      { nome: "Farinha de rosca", medida: "1 xícara" },
      { nome: "Molho de tomate", medida: "2 xícaras" },
      { nome: "Queijo mussarela", medida: "200 g" },
      { nome: "Queijo parmesão", medida: "100 g" },
      { nome: "Sal e pimenta", medida: "a gosto" },
      { nome: "Óleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: [
      "Tempere os filés e bata levemente para uniformizar a espessura.",
      "Empane passando na farinha, no ovo e na farinha de rosca.",
      "Frite até dourar dos dois lados e escorra em papel-toalha.",
      "Cubra com molho, mussarela e parmesão e leve ao forno a 200 °C por 15 minutos."
    ]
  },
  {
    id: 18,
    nome: "Farofa de Bacon",
    categoria: "Acompanhamento",
    origem: "Brasil",
    resumo: "Farofa úmida na medida certa, com bacon crocante e aquele papel de coadjuvante que rouba a cena.",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Farofa_brazil.jpg/600px-Farofa_brazil.jpg",
    tags: ["Acompanhamento", "Churrasco", "Crocrante"],
    tempoMin: 20,
    porcoes: 6,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Farinha de mandioca", medida: "2 xícaras" },
      { nome: "Bacon", medida: "200 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Manteiga", medida: "2 colheres de sopa" },
      { nome: "Ovos", medida: "2 unidades" },
      { nome: "Cheiro-verde", medida: "a gosto" },
      { nome: "Sal", medida: "a gosto" }
    ],
    instrucoes: [
      "Frite o bacon em cubos até ficar crocante e reserve.",
      "Na gordura do bacon, refogue cebola e alho e acrescente a manteiga.",
      "Junte os ovos e mexa rapidamente antes de adicionar a farinha de mandioca.",
      "Mexa até dourar levemente e finalize com bacon e cheiro-verde."
    ]
  },
  {
    id: 19,
    nome: "Vatapá",
    categoria: "Prato Principal",
    origem: "Bahia",
    resumo: "Creme intenso de pão, camarão e dendê, com sabor marcante e cara de mesa festiva.",
    imagem: "assets/images/vatapa.jpg",
    tags: ["Bahia", "Frutos do mar", "Cremoso"],
    tempoMin: 45,
    porcoes: 6,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Pão amanhecido", medida: "4 unidades" },
      { nome: "Leite de coco", medida: "400 ml" },
      { nome: "Camarão seco", medida: "200 g" },
      { nome: "Amendoim torrado", medida: "1/2 xícara" },
      { nome: "Castanha de caju", medida: "1/2 xícara" },
      { nome: "Azeite de dendê", medida: "3 colheres de sopa" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Gengibre", medida: "1 pedaço pequeno" },
      { nome: "Sal", medida: "a gosto" }
    ],
    instrucoes: [
      "Hidrate o pão no leite de coco até ficar bem macio.",
      "Bata pão, camarão, amendoim, castanha, cebola e gengibre até formar um creme.",
      "Leve à panela com dendê, mexendo sem parar até engrossar e cozinhar por completo.",
      "Ajuste o sal e sirva quente, acompanhando arroz branco ou acarajé."
    ]
  },
  {
    id: 20,
    nome: "Virado à Paulista",
    categoria: "Prato Principal",
    origem: "São Paulo",
    resumo: "Prato farto com arroz, tutu, couve, bisteca, ovo e banana à milanesa.",
    imagem: "assets/images/virado-a-paulista.jpg",
    tags: ["Paulista", "Almoço", "Tradicional"],
    tempoMin: 50,
    porcoes: 4,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Arroz branco cozido", medida: "2 xícaras" },
      { nome: "Tutu de feijão", medida: "2 xícaras" },
      { nome: "Bisteca suína", medida: "4 unidades" },
      { nome: "Linguiça", medida: "4 unidades" },
      { nome: "Couve", medida: "1 maço" },
      { nome: "Ovos", medida: "4 unidades" },
      { nome: "Banana", medida: "2 unidades" },
      { nome: "Torresmo", medida: "200 g" }
    ],
    instrucoes: [
      "Prepare ou aqueça o arroz e o tutu para servir como base do prato.",
      "Tempere e grelhe as bistecas e a linguiça até dourarem por completo.",
      "Refogue a couve rapidamente, frite os ovos e empane as bananas para dourar.",
      "Monte cada prato com arroz, tutu, carnes, couve, ovo, banana e torresmo."
    ]
  },
  {
    id: 21,
    nome: "Tutu de Feijão",
    categoria: "Acompanhamento",
    origem: "Minas Gerais",
    resumo: "Acompanhamento mineiro cremoso, ótimo para completar pratos mais robustos.",
    imagem: "assets/images/tutu-de-feijao.jpg",
    tags: ["Mineiro", "Feijão", "Almoço"],
    tempoMin: 35,
    porcoes: 6,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Feijão cozido", medida: "3 xícaras" },
      { nome: "Farinha de mandioca", medida: "1 xícara" },
      { nome: "Bacon", medida: "100 g" },
      { nome: "Linguiça calabresa", medida: "150 g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Cheiro-verde", medida: "a gosto" }
    ],
    instrucoes: [
      "Bata parte do feijão com um pouco do caldo até virar um creme.",
      "Doure bacon e linguiça, depois refogue cebola e alho na mesma panela.",
      "Junte o feijão batido e vá acrescentando a farinha aos poucos, mexendo até engrossar.",
      "Finalize com cheiro-verde e sirva com arroz, bisteca ou couve."
    ]
  },
  {
    id: 22,
    nome: "Cuscuz Paulista",
    categoria: "Prato Principal",
    origem: "São Paulo",
    resumo: "Receita clássica de travessa, colorida e perfeita para servir em fatias.",
    imagem: "assets/images/cuscuz-paulista.jpg",
    tags: ["Festa", "Travessa", "Clássico"],
    tempoMin: 55,
    porcoes: 8,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Farinha de milho flocada", medida: "2 xícaras" },
      { nome: "Molho de tomate", medida: "2 xícaras" },
      { nome: "Sardinha", medida: "2 latas" },
      { nome: "Milho-verde", medida: "1 lata" },
      { nome: "Ervilha", medida: "1 lata" },
      { nome: "Tomate", medida: "2 unidades" },
      { nome: "Palmito", medida: "1 vidro" },
      { nome: "Azeitona", medida: "1/2 xícara" }
    ],
    instrucoes: [
      "Refogue o molho com tomate, milho, ervilha, palmito e azeitona.",
      "Adicione a sardinha e misture com cuidado para manter pedaços maiores.",
      "Acrescente a farinha de milho aos poucos até a massa ficar úmida e firme.",
      "Decore a forma, pressione a massa e desenforme depois de amornar."
    ]
  },
  {
    id: 23,
    nome: "Canjica Cremosa",
    categoria: "Sobremesa",
    origem: "Brasil",
    resumo: "Doce de milho branco com leite e especiarias, perfeito para festa junina ou dias frios.",
    imagem: "assets/images/canjica.jpg",
    tags: ["Festa junina", "Cremoso", "Doce"],
    tempoMin: 80,
    porcoes: 8,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Canjica branca", medida: "500 g" },
      { nome: "Leite", medida: "1 litro" },
      { nome: "Leite condensado", medida: "1 lata" },
      { nome: "Leite de coco", medida: "200 ml" },
      { nome: "Canela em pau", medida: "2 unidades" },
      { nome: "Cravo", medida: "4 unidades" },
      { nome: "Amendoim torrado", medida: "1/2 xícara" }
    ],
    instrucoes: [
      "Deixe a canjica de molho por pelo menos 8 horas e cozinhe até ficar macia.",
      "Junte leite, leite condensado, leite de coco, canela e cravo.",
      "Cozinhe em fogo baixo até engrossar levemente e ficar cremosa.",
      "Finalize com amendoim e canela por cima antes de servir."
    ]
  },
  {
    id: 24,
    nome: "Quindim",
    categoria: "Sobremesa",
    origem: "Bahia",
    resumo: "Doce brilhante, com gema e coco, assado até ficar firme por fora e cremoso por dentro.",
    imagem: "assets/images/quindim.jpg",
    tags: ["Doce", "Coco", "Festa"],
    tempoMin: 50,
    porcoes: 12,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Gemas", medida: "10 unidades" },
      { nome: "Açúcar", medida: "2 xícaras" },
      { nome: "Coco ralado", medida: "100 g" },
      { nome: "Manteiga", medida: "1 colher de sopa" }
    ],
    instrucoes: [
      "Misture gemas peneiradas, açúcar, coco ralado e manteiga até homogeneizar.",
      "Distribua em forminhas untadas com manteiga e açúcar.",
      "Asse em banho-maria a 180 °C até firmar e dourar levemente.",
      "Desenforme frio para manter o brilho característico."
    ]
  },
  {
    id: 25,
    nome: "Pamonha Doce",
    categoria: "Lanche",
    origem: "Goiás",
    resumo: "Milho fresco, textura macia e sabor de roça em uma receita clássica do Centro-Oeste.",
    imagem: "assets/images/pamonha.jpg",
    tags: ["Milho", "Festa junina", "Caseiro"],
    tempoMin: 75,
    porcoes: 10,
    dificuldade: "Média",
    ingredientes: [
      { nome: "Espigas de milho", medida: "8 unidades" },
      { nome: "Açúcar", medida: "1 xícara" },
      { nome: "Leite", medida: "1/2 xícara" },
      { nome: "Manteiga", medida: "2 colheres de sopa" },
      { nome: "Sal", medida: "1 pitada" },
      { nome: "Palhas do milho", medida: "para embalar" }
    ],
    instrucoes: [
      "Rale o milho e bata com açúcar, leite, manteiga e sal até obter creme uniforme.",
      "Lave as palhas, monte os pacotinhos e recheie com a massa.",
      "Amarre bem e cozinhe em água fervente por cerca de 40 minutos.",
      "Sirva morna ou gelada, conforme a preferência."
    ]
  },
  {
    id: 26,
    nome: "Bauru Tradicional",
    categoria: "Lanche",
    origem: "São Paulo",
    resumo: "Sanduíche paulista de pão macio, rosbife, queijo derretido, tomate e picles.",
    imagem: "assets/images/bauru.jpg",
    tags: ["Sanduíche", "Paulista", "Lanche"],
    tempoMin: 20,
    porcoes: 2,
    dificuldade: "Fácil",
    ingredientes: [
      { nome: "Pão francês", medida: "2 unidades" },
      { nome: "Rosbife fatiado", medida: "200 g" },
      { nome: "Queijo muçarela", medida: "120 g" },
      { nome: "Tomate", medida: "1 unidade" },
      { nome: "Picles de pepino", medida: "4 fatias" },
      { nome: "Manteiga", medida: "1 colher de sopa" }
    ],
    instrucoes: [
      "Abra os pães e passe uma camada fina de manteiga na parte interna.",
      "Distribua o rosbife e cubra com a muçarela para derreter rapidamente.",
      "Finalize com tomate em rodelas e picles antes de fechar o sanduíche.",
      "Sirva quente, com o queijo ainda macio e o pão levemente crocante."
    ]
  }
];

window.RECEITAS_DATA = rawRecipes.map((recipe) => ({
  ...recipe,
  imagem: normalizeImageUrl(recipe.imagem),
  slug: slugifyRecipe(recipe.nome),
  tags: [...recipe.tags],
  ingredientes: recipe.ingredientes.map((ingredient) => ({ ...ingredient })),
  instrucoes: [...recipe.instrucoes]
}));
