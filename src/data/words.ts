// All words are exactly 5 letters — enforced by filter
export interface WordEntry {
  word: string;
  hint: string;
}

export const CZECH_WORD_BANK: WordEntry[] = [
  { word: "kočka", hint: "Devět životů, tiché kroky a loví to, co nemá rádo sýr." },
  { word: "strom", hint: "Většinou stojí na místě staletí. Dává stín, ale ne pít." },
  { word: "láska", hint: "Neviditelná síla, která dokáže hřát i bolet." },
  { word: "koláč", hint: "Kruhové potěšení. Někdo ho rád tvarohový, někdo makový." },
  { word: "tráva", hint: "Každý po ní šlape, i když za to nemůže." },
  { word: "skála", hint: "Neoblomný obr vytvořený miliony let tlaku." },
  { word: "cesta", hint: "Někdy někam vede, jindy se jen ztrácí. Ráno po ní jdeš do práce." },
  { word: "zámek", hint: "Vede do něj klíč, nebo se v něm prochází princezna." },
  { word: "bouře", hint: "Většinou nepřichází nepozorovaně, dělá obrovský hluk a pouští slzy." },
  { word: "zvíře", hint: "Skupina živočichů, do které vlastně patří i pes a slon." },
  { word: "hudba", hint: "Matematika vyjádřená vibracemi vzduchu." },
  { word: "měsíc", hint: "Mění se mu tvář, vlkodlaci z něj šílí." },
  { word: "večer", hint: "Zlatá hodina zapadá, světla se zapínají." },
  { word: "černá", hint: "Spolkne všechny ostatní, a přesto není sytá." },
  { word: "modrá", hint: "Odraz nekonečna nad námi i pod hladinou." },
  { word: "škola", hint: "Zkoušky, tresty, ale i první velké přátelství." },
  { word: "práce", hint: "Musíš tam dorazit na čas, jinak nebudou peníze." },
  { word: "domov", hint: "Každý chce mít místo na návrat." },
  { word: "jazyk", hint: "Dokáže bodnout víc než meč, když se spatně použije. Anebo chutnat." },
  { word: "kniha", hint: "Papírové zrcadlo plné inkoustových příběhů." },
  { word: "obraz", hint: "Pevně zamrznutý čas v rámu." },
  { word: "prase", hint: "Hřbet kulatý, rypák a láska k bahnu." },
  { word: "hlava", hint: "Trezor tvých myšlenek, občas pobolívá." },
  { word: "srdce", hint: "Motor i symbol všeho křehkého." },
  { word: "mléko", hint: "Bílý začátek každého savce." },
  { word: "ovoce", hint: "Sladký výsledek námahy stromu nebo sázka do loterie v krámu." },
  { word: "deník", hint: "Místo plné nejhlubších tajemství uzamčených v šuplíku." },
  { word: "metro", hint: "Kovový had polykající lidi pod ulicemi." },
  { word: "tanec", hint: "Komunikace beze slov, stačí jen rytmus kroků." },
  { word: "píseň", hint: "Slova, která dostala křídla melodií." },
  { word: "barva", hint: "Fyzikální iloze, bez níž by byl svět černobílý." },
  { word: "krása", hint: "Pocit harmonie, ale každý ji vidí v něčem jiném." },
  { word: "mouka", hint: "Bílý prášek tvořící chléb našich dnů." },
  { word: "jelen", hint: "Nosí lesní korunu a troubí při říji." },
  { word: "patro", hint: "Zkuste polykat, aniž byste použili tohle pod střechou úst. Nebo výtah." },
  { word: "skříň", hint: "Strážce kostlivců, ale častěji plná kabátů." },
  { word: "říjen", hint: "Je načase začít topit, slunce už v téhle fázi tolik nehřeje." },
  { word: "duben", hint: "Střídá ho máj, je aprílový a slaví Velikonoce." },
  { word: "srpen", hint: "Poslední velké prázdninové měsíce, často velmi pálí." },
  { word: "kroky", hint: "Dělají šlápoty v písku a posouvají z místa na místo." },
  { word: "okraj", hint: "Nebezpečná hrana. Tam, kde věci často padají dolů." },
  { word: "dopis", hint: "Psaní zalepené slinami a ukryté v obálce." },
  { word: "šátek", hint: "Zabrání krku v tom, aby promrzl, nosili ho piráti." },
  { word: "plech", hint: "Tenký rozválený kov. Napečete na něm i buchtu." },
  { word: "město", hint: "Místo, jehož srdce nikdy nespí, kde se neustále mísí lidé a silnice." },
  { word: "veslo", hint: "Prodloužená ruka námořníka na menší loďce." },
  { word: "beton", hint: "Na něm stojí moderní svět. Rozbíjí kolena." },
  { word: "stroj", hint: "Nepociťuje únavu ani city. Vykonává svou funkci na elektřinu." },
  { word: "vrána", hint: "Temně zabarvený zlodějíček s pery." },
  { word: "západ", hint: "Směr, v němž noc pomalu požírá slunce." },
  { word: "sever", hint: "Hledej ho pomocí kompasu nebo lišejníků na kůře stromu." },
  { word: "teplá", hint: "Ani horká, ani studená, pro nápoj optimální tónina." },
  { word: "svíce", hint: "Ničí tmu malým ohýnkem na provázku vosku." },
  { word: "hlína", hint: "Je tmavá, pod nohama po dešti z ní bývá velké bláto." },
  { word: "sloup", hint: "Osamělý obránce pevnosti, který podpírá všechny tlaky shora." },
  { word: "pizza", hint: "Tohoto koláče stačí osm dílků k plnosti všech v Itálii." },
  { word: "pasta", hint: "Dospěláci už to na zubní kartáček nedávají." },
  { word: "salát", hint: "Mísa nakrájené nahořklosti pokrblená olejem." },
  { word: "korál", hint: "Není to rostlina, ale kámen moře s mnoha rameny." },
  { word: "sopka", hint: "Spící trhlina schopná rozplakat nebe a rozpustit celé vrstvy hor." },
  { word: "bouda", hint: "Nejčastější dřevěný přístřešek pro čtyři běhající tlapy." },
  { word: "farma", hint: "Žije se zde s lopatou ráno a traktorem po obědě." },
  { word: "stádo", hint: "Tohle uskupení potřebuje pastýře nebo ovčáckého psa." },
  { word: "motýl", hint: "Znovuzrozená ukázka jemnosti letící k nektaru." },
  { word: "liška", hint: "Rudá podvodnice z bajek s hebkou oháňkou." },
  { word: "srnka", hint: "Plachá, hnědá okatá paní, kterou zastaví tlumená světla aut." },
  { word: "párek", hint: "Občas do sebe zakousnutí dva lidé, někdy dva štíhlé uzeniny v rohlíku." },
  { word: "mango", hint: "Tropická sladkost se skrytou dřevěnou peckou uprostřed žlutého těla." },
  { word: "šavle", hint: "Smrt s čepelí, zahnutá hrozba z dob husarů." },
  { word: "kopec", hint: "Výšlap sem tě unaví, jízda na kole naopak zahřeje. Menší jak hora." },
].filter((e) => e.word.length === 5);

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
