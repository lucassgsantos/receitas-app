const receitas = [
  {
    id: 1,
    nome: "Feijoada",
    categoria: "Prato Principal",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Feijoada_01.jpg/342px-Feijoada_01.jpg",
    tags: "Tradicional",
    ingredientes: [
      { nome: "Feijao preto", medida: "500g" },
      { nome: "Costelinha de porco", medida: "300g" },
      { nome: "Linguica calabresa", medida: "200g" },
      { nome: "Carne seca", medida: "200g" },
      { nome: "Bacon", medida: "100g" },
      { nome: "Cebola", medida: "2 unidades" },
      { nome: "Alho", medida: "4 dentes" },
      { nome: "Louro", medida: "2 folhas" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Pimenta do reino", medida: "a gosto" }
    ],
    instrucoes: "Deixe o feijao preto de molho na noite anterior. Escorra e cozinhe em panela de pressao com agua por 20 minutos.\n\nEm outra panela, frite o bacon ate dourar. Adicione a cebola picada e o alho. Refogue bem.\n\nCorte a linguica em rodelas e a costelinha em pedacos. Adicione ao refogado e deixe dourar.\n\nMisture as carnes ao feijao cozido. Adicione as folhas de louro, sal e pimenta.\n\nDeixe cozinhar em fogo baixo por mais 40 minutos, mexendo de vez em quando. Amasse alguns graos para engrossar o caldo.\n\nSirva com arroz branco, couve refogada, farofa e laranja."
  },
  {
    id: 2,
    nome: "Coxinha",
    categoria: "Salgado",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Coxinha.jpg/600px-Coxinha.jpg",
    tags: "Lanche",
    ingredientes: [
      { nome: "Peito de frango", medida: "500g" },
      { nome: "Farinha de trigo", medida: "3 xicaras" },
      { nome: "Caldo de galinha", medida: "2 xicaras" },
      { nome: "Margarina", medida: "2 colheres" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Cream cheese", medida: "100g" },
      { nome: "Ovo", medida: "2 unidades" },
      { nome: "Farinha de rosca", medida: "2 xicaras" },
      { nome: "Oleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: "Cozinhe o peito de frango em agua com sal. Desfie bem e reserve.\n\nRefogue a cebola e o alho em um pouco de oleo. Adicione o frango desfiado e o cream cheese. Misture bem e reserve.\n\nPara a massa, ferva o caldo de galinha com a margarina. Quando ferver, adicione a farinha de trigo de uma vez e mexa ate desgrudar da panela.\n\nDeixe a massa esfriar. Abra pedacos de massa na mao, coloque o recheio no centro e feche no formato de coxinha.\n\nPasse no ovo batido e depois na farinha de rosca.\n\nFrite em oleo quente ate dourar. Escorra em papel toalha."
  },
  {
    id: 3,
    nome: "Pao de Queijo",
    categoria: "Salgado",
    origem: "Minas Gerais",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Pao_de_queijo_com_cafe.jpg/600px-Pao_de_queijo_com_cafe.jpg",
    tags: "Mineiro",
    ingredientes: [
      { nome: "Polvilho azedo", medida: "500g" },
      { nome: "Leite", medida: "1 xicara" },
      { nome: "Oleo", medida: "1/2 xicara" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Queijo minas curado", medida: "200g" },
      { nome: "Sal", medida: "1 colher de cha" }
    ],
    instrucoes: "Ferva o leite com o oleo e o sal.\n\nDespeje sobre o polvilho azedo e misture bem com uma colher ate escaldar o polvilho.\n\nDeixe esfriar ate dar pra mexer com as maos. Adicione os ovos um a um, misturando bem.\n\nAdicione o queijo ralado e sove ate a massa ficar lisa.\n\nFaca bolinhas com as maos untadas com oleo.\n\nColoque em assadeira untada e leve ao forno pre-aquecido a 180 graus por 25 a 30 minutos, ate dourar."
  },
  {
    id: 4,
    nome: "Brigadeiro",
    categoria: "Sobremesa",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrigadeiroBrazil.jpg/600px-BrigadeiroBrazil.jpg",
    tags: "Doce",
    ingredientes: [
      { nome: "Leite condensado", medida: "1 lata" },
      { nome: "Chocolate em po", medida: "3 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de sopa" },
      { nome: "Chocolate granulado", medida: "para cobrir" }
    ],
    instrucoes: "Em uma panela, misture o leite condensado, o chocolate em po e a manteiga.\n\nLeve ao fogo medio, mexendo sem parar com uma colher de pau.\n\nCozinhe ate a massa comecar a desgrudar do fundo da panela, cerca de 10 minutos.\n\nDespeje em um prato untado com manteiga e deixe esfriar.\n\nCom as maos untadas com manteiga, faca bolinhas e passe no chocolate granulado.\n\nColoque em forminhas de papel."
  },
  {
    id: 5,
    nome: "Moqueca Baiana",
    categoria: "Prato Principal",
    origem: "Bahia",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/MOQUECAB.jpg/525px-MOQUECAB.jpg",
    tags: "Nordestino",
    ingredientes: [
      { nome: "File de peixe", medida: "800g" },
      { nome: "Leite de coco", medida: "400ml" },
      { nome: "Azeite de dende", medida: "4 colheres de sopa" },
      { nome: "Tomate", medida: "3 unidades" },
      { nome: "Pimentao", medida: "2 unidades" },
      { nome: "Cebola", medida: "2 unidades" },
      { nome: "Coentro", medida: "1 maco" },
      { nome: "Limao", medida: "2 unidades" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Pimenta", medida: "a gosto" }
    ],
    instrucoes: "Tempere o peixe com limao, sal e pimenta. Deixe marinar por 30 minutos.\n\nCorte os tomates, pimentoes e cebolas em rodelas.\n\nEm uma panela de barro, faca camadas: cebola, pimentao, tomate e peixe.\n\nDespeje o leite de coco por cima e regue com o azeite de dende.\n\nTampe e cozinhe em fogo baixo por 30 minutos. Nao mexa, apenas balance a panela de vez em quando.\n\nFinalize com coentro fresco picado. Sirva com arroz branco e pirao."
  },
  {
    id: 6,
    nome: "Empadao de Frango",
    categoria: "Prato Principal",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Empad%C3%A3o.JPG/600px-Empad%C3%A3o.JPG",
    tags: "Torta",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "4 xicaras" },
      { nome: "Manteiga", medida: "250g" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Peito de frango", medida: "600g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Azeitona", medida: "100g" },
      { nome: "Palmito", medida: "1 vidro" },
      { nome: "Catupiry", medida: "200g" },
      { nome: "Sal e pimenta", medida: "a gosto" }
    ],
    instrucoes: "Massa: Misture a farinha, a manteiga em temperatura ambiente e os ovos. Sove ate ficar homogenea. Envolva em plastico e leve a geladeira por 30 minutos.\n\nRecheio: Cozinhe o frango, desfie e refogue com cebola, alho, sal e pimenta. Adicione as azeitonas picadas e o palmito.\n\nForre uma forma com 2/3 da massa. Coloque o recheio e cubra com catupiry.\n\nCubra com o restante da massa. Pincele com gema de ovo.\n\nLeve ao forno a 200 graus por 35 a 40 minutos, ate dourar."
  },
  {
    id: 7,
    nome: "Acai na Tigela",
    categoria: "Sobremesa",
    origem: "Para",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/A%C3%A7a%C3%AD_na_tigela_1.jpg/600px-A%C3%A7a%C3%AD_na_tigela_1.jpg",
    tags: "Saudavel",
    ingredientes: [
      { nome: "Polpa de acai", medida: "400g" },
      { nome: "Banana", medida: "2 unidades" },
      { nome: "Granola", medida: "4 colheres de sopa" },
      { nome: "Leite condensado", medida: "a gosto" },
      { nome: "Morango", medida: "6 unidades" },
      { nome: "Mel", medida: "a gosto" }
    ],
    instrucoes: "Bata no liquidificador a polpa de acai congelada com 1 banana ate ficar cremoso. Se necessario, adicione um pouquinho de agua.\n\nDespeje em uma tigela.\n\nCorte a outra banana em rodelas e os morangos ao meio.\n\nDecore com as frutas, granola e regue com leite condensado ou mel.\n\nSirva imediatamente, bem gelado."
  },
  {
    id: 8,
    nome: "Baiao de Dois",
    categoria: "Prato Principal",
    origem: "Ceara",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bai%C3%A3o_de_dois.jpg/600px-Bai%C3%A3o_de_dois.jpg",
    tags: "Nordestino",
    ingredientes: [
      { nome: "Arroz", medida: "2 xicaras" },
      { nome: "Feijao verde", medida: "1 xicara" },
      { nome: "Bacon", medida: "150g" },
      { nome: "Linguica calabresa", medida: "200g" },
      { nome: "Queijo coalho", medida: "200g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "3 dentes" },
      { nome: "Manteiga de garrafa", medida: "2 colheres" },
      { nome: "Coentro", medida: "a gosto" },
      { nome: "Sal", medida: "a gosto" }
    ],
    instrucoes: "Cozinhe o feijao verde em panela de pressao por 15 minutos. Reserve com o caldo.\n\nEm uma panela, frite o bacon picado ate dourar. Adicione a linguica em rodelas e refogue.\n\nAdicione a cebola e o alho picados. Refogue ate murchar.\n\nAdicione o arroz cru e mexa bem. Despeje o feijao com o caldo e complete com agua se necessario.\n\nCozinhe em fogo baixo com a panela tampada ate o arroz ficar cozido.\n\nDesligue o fogo, adicione o queijo coalho em cubos e a manteiga de garrafa. Misture e finalize com coentro."
  },
  {
    id: 9,
    nome: "Pudim de Leite",
    categoria: "Sobremesa",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pudim_de_leite_%283544235183%29.jpg/600px-Pudim_de_leite_%283544235183%29.jpg",
    tags: "Doce",
    ingredientes: [
      { nome: "Leite condensado", medida: "1 lata" },
      { nome: "Leite", medida: "1 medida da lata" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Acucar", medida: "1 xicara" },
      { nome: "Agua", medida: "1/4 xicara" }
    ],
    instrucoes: "Calda: Em uma forma de pudim, coloque o acucar e a agua. Leve ao fogo ate caramelizar. Gire a forma para cobrir o fundo e as laterais. Reserve.\n\nNo liquidificador, bata o leite condensado, o leite e os ovos por 2 minutos.\n\nDespeje na forma caramelizada.\n\nCubra com papel aluminio e leve ao forno em banho-maria a 180 graus por 1 hora.\n\nDeixe esfriar completamente e leve a geladeira por pelo menos 4 horas.\n\nDesenforme em um prato e sirva gelado."
  },
  {
    id: 10,
    nome: "Acaraje",
    categoria: "Salgado",
    origem: "Bahia",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Acaraje.jpg/600px-Acaraje.jpg",
    tags: "Nordestino",
    ingredientes: [
      { nome: "Feijao fradinho", medida: "500g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Sal", medida: "a gosto" },
      { nome: "Azeite de dende", medida: "para fritar" },
      { nome: "Camarao seco", medida: "200g" },
      { nome: "Vatapa", medida: "para rechear" },
      { nome: "Caruru", medida: "para rechear" },
      { nome: "Salada", medida: "para acompanhar" }
    ],
    instrucoes: "Deixe o feijao fradinho de molho por 12 horas. Retire as cascas esfregando os graos.\n\nBata no liquidificador o feijao com a cebola ate formar uma massa grossa. Nao adicione muita agua.\n\nTempere com sal e bata a massa com uma colher de pau ate ficar aerada.\n\nAqueca o azeite de dende em uma panela funda.\n\nModele bolinhos com uma colher e frite no azeite quente, virando ate dourar dos dois lados.\n\nAbra ao meio e recheie com vatapa, caruru e camarao seco. Sirva quente."
  },
  {
    id: 11,
    nome: "Tapioca",
    categoria: "Lanche",
    origem: "Nordeste",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tapioca_do_Alto_da_S%C3%A9_-_Olinda-PE.jpg/600px-Tapioca_do_Alto_da_S%C3%A9_-_Olinda-PE.jpg",
    tags: "Leve",
    ingredientes: [
      { nome: "Goma de tapioca", medida: "4 colheres de sopa" },
      { nome: "Queijo coalho", medida: "100g" },
      { nome: "Coco ralado", medida: "2 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de cha" }
    ],
    instrucoes: "Peneire a goma de tapioca para ela ficar bem soltinha.\n\nAqueca uma frigideira antiaderente em fogo medio.\n\nEspalhe a goma peneirada na frigideira formando um disco. Nao aperte.\n\nQuando a goma grudar e formar um disco firme, adicione o recheio de queijo coalho ralado e coco.\n\nDobre ao meio e deixe mais 1 minuto.\n\nSirva quente."
  },
  {
    id: 12,
    nome: "Bolo de Cenoura",
    categoria: "Sobremesa",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Peda%C3%A7o_de_Bolo_de_Cenoura%2C_08-12-2020.jpg/600px-Peda%C3%A7o_de_Bolo_de_Cenoura%2C_08-12-2020.jpg",
    tags: "Bolo",
    ingredientes: [
      { nome: "Cenoura", medida: "3 unidades" },
      { nome: "Ovos", medida: "3 unidades" },
      { nome: "Oleo", medida: "1 xicara" },
      { nome: "Acucar", medida: "2 xicaras" },
      { nome: "Farinha de trigo", medida: "2.5 xicaras" },
      { nome: "Fermento em po", medida: "1 colher de sopa" },
      { nome: "Chocolate em po", medida: "4 colheres de sopa" },
      { nome: "Leite", medida: "2 colheres de sopa" },
      { nome: "Manteiga", medida: "1 colher de sopa" }
    ],
    instrucoes: "Bata no liquidificador as cenouras descascadas e cortadas, os ovos e o oleo.\n\nEm uma tigela, misture a farinha e o acucar. Despeje a mistura do liquidificador e mexa bem.\n\nAdicione o fermento e misture delicadamente.\n\nDespeje em uma forma untada e enfarinhada.\n\nLeve ao forno pre-aquecido a 180 graus por 40 minutos.\n\nCobertura: Derreta a manteiga, adicione o chocolate em po e o leite. Mexa ate ficar cremoso. Despeje sobre o bolo ainda quente."
  },
  {
    id: 13,
    nome: "Arroz Carreteiro",
    categoria: "Prato Principal",
    origem: "Rio Grande do Sul",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Arroz_carreteiro.jpg/600px-Arroz_carreteiro.jpg",
    tags: "Gaucho",
    ingredientes: [
      { nome: "Arroz", medida: "2 xicaras" },
      { nome: "Carne seca", medida: "500g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "3 dentes" },
      { nome: "Tomate", medida: "2 unidades" },
      { nome: "Pimentao", medida: "1 unidade" },
      { nome: "Cheiro verde", medida: "a gosto" },
      { nome: "Sal e pimenta", medida: "a gosto" }
    ],
    instrucoes: "Dessalgue a carne seca de vespera, trocando a agua 3 vezes.\n\nCozinhe a carne em panela de pressao por 20 minutos. Desfie e reserve.\n\nEm uma panela grande, refogue a cebola e o alho em oleo.\n\nAdicione o tomate e o pimentao picados. Refogue ate murchar.\n\nAdicione a carne desfiada e misture bem.\n\nJunte o arroz cru e mexa por 2 minutos. Adicione agua quente (o dobro da medida do arroz).\n\nCozinhe em fogo baixo com a panela tampada ate o arroz ficar cozido. Finalize com cheiro verde."
  },
  {
    id: 14,
    nome: "Pastel de Feira",
    categoria: "Salgado",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Brazilian_pastel.jpg/600px-Brazilian_pastel.jpg",
    tags: "Lanche",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "3 xicaras" },
      { nome: "Oleo", medida: "2 colheres de sopa" },
      { nome: "Cachaca", medida: "1 colher de sopa" },
      { nome: "Agua morna", medida: "1 xicara" },
      { nome: "Sal", medida: "1 colher de cha" },
      { nome: "Carne moida", medida: "300g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Queijo mussarela", medida: "200g" },
      { nome: "Oleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: "Massa: Misture a farinha, sal, oleo, cachaca e agua morna. Sove ate ficar lisa e elastica. Deixe descansar 30 minutos coberta com um pano.\n\nRecheio de carne: Refogue a cebola picada, adicione a carne moida e tempere com sal e pimenta. Cozinhe ate secar.\n\nAbra a massa bem fina com um rolo. Corte em retangulos.\n\nColoque o recheio de um lado, dobre e feche com um garfo pressionando as bordas.\n\nO segredo: a cachaca na massa faz o pastel ficar crocante e com bolhas.\n\nFrite em oleo bem quente ate dourar dos dois lados."
  },
  {
    id: 15,
    nome: "Misto Quente",
    categoria: "Lanche",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mmm...hot_ham_and_cheese_with_homemade_mustard_%284970848133%29.jpg/600px-Mmm...hot_ham_and_cheese_with_homemade_mustard_%284970848133%29.jpg",
    tags: "Rapido",
    ingredientes: [
      { nome: "Pao de forma", medida: "2 fatias" },
      { nome: "Presunto", medida: "2 fatias" },
      { nome: "Queijo mussarela", medida: "2 fatias" },
      { nome: "Manteiga", medida: "a gosto" }
    ],
    instrucoes: "Passe manteiga em um lado de cada fatia de pao.\n\nMonte o sanduiche: coloque o presunto e o queijo entre as fatias, com a manteiga para fora.\n\nAqueca uma frigideira ou sanducheira em fogo medio.\n\nColoque o sanduiche e pressione levemente com uma espatula.\n\nVire quando o lado de baixo estiver dourado e o queijo comecar a derreter.\n\nSirva quente."
  },
  {
    id: 16,
    nome: "Bolinho de Chuva",
    categoria: "Sobremesa",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bolinho_de_chuva.jpg/600px-Bolinho_de_chuva.jpg",
    tags: "Doce",
    ingredientes: [
      { nome: "Farinha de trigo", medida: "2 xicaras" },
      { nome: "Ovos", medida: "2 unidades" },
      { nome: "Leite", medida: "1/2 xicara" },
      { nome: "Acucar", medida: "4 colheres de sopa" },
      { nome: "Fermento em po", medida: "1 colher de sopa" },
      { nome: "Canela em po", medida: "para polvilhar" },
      { nome: "Oleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: "Misture a farinha, o acucar e o fermento em uma tigela.\n\nAdicione os ovos e o leite. Mexa ate formar uma massa homogenea e grossa.\n\nAqueca o oleo em uma panela funda em fogo medio.\n\nCom a ajuda de duas colheres, va colocando porcoes da massa no oleo quente.\n\nFrite ate dourar por todos os lados, virando com cuidado.\n\nEscorra em papel toalha e passe na mistura de acucar com canela enquanto ainda quente."
  },
  {
    id: 17,
    nome: "Frango a Parmegiana",
    categoria: "Prato Principal",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Chicken_parmigiana.jpg/600px-Chicken_parmigiana.jpg",
    tags: "Classico",
    ingredientes: [
      { nome: "Peito de frango", medida: "4 files" },
      { nome: "Farinha de trigo", medida: "1 xicara" },
      { nome: "Ovo", medida: "2 unidades" },
      { nome: "Farinha de rosca", medida: "1 xicara" },
      { nome: "Molho de tomate", medida: "2 xicaras" },
      { nome: "Queijo mussarela", medida: "200g" },
      { nome: "Queijo parmesao", medida: "100g" },
      { nome: "Sal e pimenta", medida: "a gosto" },
      { nome: "Oleo para fritar", medida: "o suficiente" }
    ],
    instrucoes: "Tempere os files de frango com sal e pimenta. Bata levemente com um martelo para achatar.\n\nPasse cada file na farinha de trigo, depois no ovo batido e por ultimo na farinha de rosca.\n\nFrite em oleo quente ate dourar dos dois lados. Reserve em papel toalha.\n\nEm um refratario, coloque os files fritos. Cubra com molho de tomate, fatias de mussarela e parmesao ralado.\n\nLeve ao forno a 200 graus por 15 minutos, ate o queijo derreter e dourar.\n\nSirva com arroz branco e batata frita."
  },
  {
    id: 18,
    nome: "Farofa de Bacon",
    categoria: "Acompanhamento",
    origem: "Brasil",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Farofa_brazil.jpg/600px-Farofa_brazil.jpg",
    tags: "Acompanhamento",
    ingredientes: [
      { nome: "Farinha de mandioca", medida: "2 xicaras" },
      { nome: "Bacon", medida: "200g" },
      { nome: "Cebola", medida: "1 unidade" },
      { nome: "Alho", medida: "2 dentes" },
      { nome: "Manteiga", medida: "2 colheres de sopa" },
      { nome: "Ovo", medida: "2 unidades" },
      { nome: "Cheiro verde", medida: "a gosto" },
      { nome: "Sal", medida: "a gosto" }
    ],
    instrucoes: "Corte o bacon em cubinhos e frite em uma frigideira ate ficar crocante. Reserve.\n\nNa mesma gordura, refogue a cebola picada e o alho.\n\nAdicione a manteiga e deixe derreter.\n\nQuebre os ovos na frigideira e mexa rapidamente para misturar.\n\nAdicione a farinha de mandioca e mexa em fogo medio ate ficar dourada e soltinha.\n\nJunte o bacon crocante e o cheiro verde. Acerte o sal."
  }
]

const categorias = [
  "Prato Principal",
  "Salgado",
  "Sobremesa",
  "Lanche",
  "Acompanhamento"
]
