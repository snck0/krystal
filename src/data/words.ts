// All words are exactly 5 letters — enforced by filter
export interface WordEntry {
  word: string;
  hint: string;
}

export const CZECH_WORD_BANK: WordEntry[] = [
  { word: "kočka", hint: "Domácí zvíře, které mrňouká, přede a loví myši." },
  { word: "strom", hint: "Vysoká dřevnatá rostlina s kmenem, větvemi a listy." },
  { word: "láska", hint: "Silný citový vztah k druhé osobě nebo věci." },
  { word: "koláč", hint: "Sladké pečivo, které se jí k svačině nebo dezertu." },
  { word: "tráva", hint: "Zelená nízká rostlina pokrývající louky a zahrady." },
  { word: "skála", hint: "Velká pevná masa horniny, část hory nebo útesu." },
  { word: "cesta", hint: "Pruh terénu nebo komunikace, po které se chodí nebo jezdí." },
  { word: "zámek", hint: "Historická opevněná stavba šlechty, nebo zařízení k zamykání dveří." },
  { word: "bouře", hint: "Prudké počasí s větrem, deštěm a blesky." },
  { word: "zvíře", hint: "Živý tvor, který není rostlina ani člověk." },
  { word: "hudba", hint: "Umění pracující se zvukem, rytmem a melodií." },
  { word: "měsíc", hint: "Přírodní satelit Země, který svítí v noci." },
  { word: "večer", hint: "Část dne mezi odpolednem a nocí." },
  { word: "černá", hint: "Barva nejtmavší, bez světla, opak bílé." },
  { word: "modrá", hint: "Barva oblohy a moře za jasného dne." },
  { word: "škola", hint: "Budova, kde se děti vzdělávají a učí." },
  { word: "práce", hint: "Činnost, kterou člověk dělá za odměnu nebo jako povinnost." },
  { word: "domov", hint: "Místo, kde člověk bydlí a kde se cítí doma." },
  { word: "jazyk", hint: "Orgán v ústech, ale také systém slov pro komunikaci." },
  { word: "kniha", hint: "Sbírka stránek s textem, svázaná dohromady." },
  { word: "obraz", hint: "Malba nebo fotografie zobrazující nějaký výjev." },
  { word: "prase", hint: "Hospodářské zvíře chované pro maso, rádo se koulí v bahně." },
  { word: "hlava", hint: "Horní část těla, kde se nachází mozek, oči, uši a ústa." },
  { word: "srdce", hint: "Orgán v hrudi, který pumps krev; symbol lásky." },
  { word: "mléko", hint: "Bílá tekutina, kterou produkují samice savců pro mláďata." },
  { word: "ovoce", hint: "Sladká jedlá část rostliny, například jablko či hroznové víno." },
  { word: "deník", hint: "Zápisník, do kterého si lidé každý den píší své zážitky." },
  { word: "metro", hint: "Podzemní rychlá městská doprava jedoucí po kolejích." },
  { word: "tanec", hint: "Pohyb těla v rytmu hudby, forma zábavy i umění." },
  { word: "píseň", hint: "Hudební skladba se slovy, určená ke zpívání." },
  { word: "barva", hint: "Vlastnost světla vnímané okem, například červená nebo zelená." },
  { word: "krása", hint: "Vlastnost toho, co je hezké, příjemné na pohled nebo poslech." },
  { word: "mouka", hint: "Jemně namletý prášek z obilí, základ pečiva." },
  { word: "jelen", hint: "Velký lesní savec s parožím, samec srnce." },
  { word: "patro", hint: "Vodorovná úroveň budovy nad přízemím, nebo část úst nahoře." },
  { word: "skříň", hint: "Kus nábytku na ukládání oblečení nebo věcí." },
  { word: "říjen", hint: "Desátý měsíc roku, kdy padá listí." },
  { word: "duben", hint: "Čtvrtý měsíc roku, symbol jara a velikonoc." },
  { word: "srpen", hint: "Osmý měsíc roku, nejteplejší část léta." },
  { word: "kroky", hint: "Pohyby nohou při chůzi; také postupy k dosažení cíle." },
  { word: "okraj", hint: "Vnější část nebo hranice nějakého předmětu či plochy." },
  { word: "dopis", hint: "Psaná zpráva zasílaná poštou nebo předávaná osobně." },
  { word: "šátek", hint: "Kus látky nošený na hlavě nebo kolem krku." },
  { word: "plech", hint: "Tenká deska z kovu, používaná v průmyslu i pečení." },
  { word: "město", hint: "Velká obec s mnoha budovami, obchody a obyvateli." },
  { word: "veslo", hint: "Tyč s plochou částí, používaná k pohánění lodi." },
  { word: "beton", hint: "Stavební materiál z cementu, písku a vody, který tuhne." },
  { word: "stroj", hint: "Zařízení, které vykonává práci pomocí energie." },
  { word: "vrána", hint: "Černý nebo šedočerný pták z čeledi krkavcovitých." },
  { word: "západ", hint: "Světová strana, kde slunce zapadá; také část světa." },
  { word: "sever", hint: "Světová strana nahoře na mapě, opak jihu." },
  { word: "teplá", hint: "Přídavné jméno popisující příjemnou teplotu, ne horkou ani studenou." },
  { word: "svíce", hint: "Tyčinka z vosku s knotem, která hoří a svítí." },
  { word: "hlína", hint: "Měkká hnědá zemina, ze které se dělá keramika a cihly." },
  { word: "sloup", hint: "Svislý pilíř podpírající budovu nebo stojící samostatně." },
  { word: "pizza", hint: "Italský plochý chléb s rajčatovou omáčkou a sýrem." },
  { word: "pasta", hint: "Italské těstoviny, nebo hustá mazlavá hmota." },
  { word: "salát", hint: "Pokrm ze syrové nebo vařené zeleniny, často s dresinkem." },
  { word: "korál", hint: "Mořský organismus tvořící útesy; také červený drahokam." },
  { word: "sopka", hint: "Hora, ze které vytéká láva a sopečná hornina." },
  { word: "bouda", hint: "Malá jednoduchá stavba nebo přístřeší, například psí." },
  { word: "farma", hint: "Hospodářství na venkově, kde se pěstuje zelenina nebo chová dobytek." },
  { word: "stádo", hint: "Skupina zvířat stejného druhu žijících pohromadě." },
  { word: "motýl", hint: "Létající hmyz s barevnými křídly, vylíhne se z kukly." },
  { word: "liška", hint: "Červený lesní šelma se špičatým čenichem a hustým ocasem." },
  { word: "srnka", hint: "Samice jelena či srnce, štíhlý lesní savec." },
  { word: "párek", hint: "Klobáska z masa, nebo dvojice věcí nebo lidí." },
  { word: "mango", hint: "Tropické ovoce se žlutooranžovou dužninou a velkou peckou." },
  { word: "šavle", hint: "Zakřivená chladná zbraň s jedním ostřím, historická." },
  { word: "kopec", hint: "Vyvýšenina terénu, menší než hora." },
].filter(e => e.word.length === 5);

export const getDailyWord = (seedDate?: string): WordEntry => {
  const dateStr = seedDate || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CZECH_WORD_BANK.length;
  return CZECH_WORD_BANK[index];
};

export const getRandomWord = (): WordEntry => {
  const index = Math.floor(Math.random() * CZECH_WORD_BANK.length);
  return CZECH_WORD_BANK[index];
};
