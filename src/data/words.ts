// All words are exactly 5 letters — enforced by filter
export interface WordEntry {
  word: string;
  hint: string;
}

export const CZECH_WORD_BANK: WordEntry[] = [
  { word: "kočka", hint: "Odtažitá společnost hledající zdroje tepla a tolerující dotek do první chyby." },
  { word: "strom", hint: "Jeho letokruhy ukrývají to, co nedokáže vypovědět." },
  { word: "láska", hint: "Paradoxní chemie vyžadující iracionální výdej energie směrem k jedinému bodu." },
  { word: "koláč", hint: "Matematický tvar podrobený tepelné úpravě a drobení." },
  { word: "tráva", hint: "Bývá zelenější na druhé straně, alespoň z dálky." },
  { word: "skála", hint: "Nehybná rezistence vůči neustálé korozi věků." },
  { word: "cesta", hint: "Směr zapsaný do krajiny koly nebo patami, který mizí v nekonečnu." },
  { word: "zámek", hint: "Většinou kovový hlavolam střežící tajemství a prahy." },
  { word: "bouře", hint: "Atmosférická revolta s hlučnými následky." },
  { word: "zvíře", hint: "Kategorie bez domovského práva na jazyk a daně." },
  { word: "hudba", hint: "Matematika aplikovaná na tlakové vlny plynu." },
  { word: "měsíc", hint: "Soused deformující hladinu bez jediného dotyku." },
  { word: "večer", hint: "Přípravná fáze k dočasné ztrátě vědomí." },
  { word: "černá", hint: "Stav dokonalé absorpce fotonů." },
  { word: "modrá", hint: "Nejvzácnější pigment antiky, dnes odstín ticha." },
  { word: "škola", hint: "Instituce k cílené standardizaci vědomostí." },
  { word: "práce", hint: "Smluvená konverze cenného času na směnitelnou hodnotu." },
  { word: "domov", hint: "Geografická kotva pro návraty s nižší ostražitostí." },
  { word: "jazyk", hint: "Biologický aparát i struktura pro zakódování reality." },
  { word: "kniha", hint: "Paralelní vesmír slisovaný do tenkých plátků dřevní buničiny." },
  { word: "obraz", hint: "Mrtvá kompozice předstírající okamžik pohybu." },
  { word: "prase", hint: "Skladiště kalorií vyhledávající bláto jako luxus." },
  { word: "hlava", hint: "Centrální řídící jednotka umístěná v kritickém bodě." },
  { word: "srdce", hint: "Mechanická pumpa romantizovaná básníky v omylu." },
  { word: "mléko", hint: "Původní bílá investice do růstu další generace." },
  { word: "ovoce", hint: "Vegetativní past na šíření semen, pečlivě oslazená." },
  { word: "deník", hint: "Chronologicky svázané výpovědi psané bez cenzury veřejnosti." },
  { word: "metro", hint: "Nekonečná podzemní trubice trávící a vylučující masu." },
  { word: "tanec", hint: "Kinematická sekvence vyprovokovaná vibrací prostoru." },
  { word: "píseň", hint: "Dech formovaný do umělé struktury tonality." },
  { word: "barva", hint: "Frekvence viditelná mozkem jako oddělení od chaosu." },
  { word: "krása", hint: "Subjektivní iloze proporční dokonalosti." },
  { word: "mouka", hint: "Prach dekonstruovaného zrní, který tmelí základy." },
  { word: "jelen", hint: "Surový majitel nepraktického zbrojního arzenálu nahoře." },
  { word: "patro", hint: "Plocha nad tebou, i klenba oddělující jazyk od dutin." },
  { word: "skříň", hint: "Slepý prostor k odkládání textilních schránek identity." },
  { word: "říjen", hint: "Perioda desátého měření, kdy dochází k masivnímu úbytku chlorofylu." },
  { word: "duben", hint: "Čtvrtý úsek neklidných atmosférických přechodů." },
  { word: "srpen", hint: "Vzácné dny nejvyššího sklonu k paralýze z tepla." },
  { word: "kroky", hint: "Opakovaný posun těžiště vpřed balancující na hraně pádu." },
  { word: "okraj", hint: "Linie oběti. Dál už nic pevného neslíbíš." },
  { word: "dopis", hint: "Zbytková forma pomalého posílání fyzické stopy textu." },
  { word: "šátek", hint: "Symbolický i funkční prvek izolace v nejisté rovině." },
  { word: "plech", hint: "Zploštělý tvrdý materiál citlivý na teplo a rezonanci." },
  { word: "město", hint: "Silo koncentrované existenciální tísně s centrálním plánováním." },
  { word: "veslo", hint: "Pákový nástroj manipulující mechanický odpor vody." },
  { word: "beton", hint: "Tekutý kámen tvarující dystopii po utuhnutí." },
  { word: "stroj", hint: "Odraz člověka ignorující jakoukoli vlastní svobodnou vůli." },
  { word: "vrána", hint: "Temný intelekt z rodu letců fixovaný na objekty." },
  { word: "západ", hint: "Bod zlomu, kde slábnou kontury a umírá modrá." },
  { word: "sever", hint: "Chladný pól stability fixující směr magnetů." },
  { word: "teplá", hint: "Fyzikální limit komfortu bez vnitřního hoření." },
  { word: "svíce", hint: "Spíše symbolická obrana proti stínům, požírající samu sebe." },
  { word: "hlína", hint: "Kašovitá struktura pamatující prastarý čas v mokru." },
  { word: "sloup", hint: "Tichý nositel všeho, co visí ve stavu ohrožení padnout." },
  { word: "pizza", hint: "Termálně sloučený chaos sýru a kruhové rovnice." },
  { word: "pasta", hint: "Aromatické spojivo či sušená formace lepivého materiálu." },
  { word: "salát", hint: "Neupravený chlorofyl vydávaný za projev vitality." },
  { word: "korál", hint: "Organická stavba vápenitých skořápek skrytá pod hladinou." },
  { word: "sopka", hint: "Odfukový ventil vnitřního neklidu hmoty." },
  { word: "bouda", hint: "Improvizovaná kapsule přežití často menších parametrů." },
  { word: "farma", hint: "Vyčleněná zóna pro přísnou produkční manipulaci přírody." },
  { word: "stádo", hint: "Rozpuštění jedince v prospěch kolektivní paniky v bezpečí." },
  { word: "motýl", hint: "Výsledek radikální biologické přeměny se zranitelnou krásou." },
  { word: "liška", hint: "Evoluce orientovaná na plíživý úspěch na účet drůbeže." },
  { word: "srnka", hint: "Vyčkávající terč, jehož strach převyšuje jen úžas očí." },
  { word: "párek", hint: "Párové stvrzení existence balené ve formovatelném obalu." },
  { word: "mango", hint: "Zrádné sladké nebezpečí pro textilie v těsné slupce." },
  { word: "šavle", hint: "Ostrý argument z doby, kdy se umíralo s kusem oceli." },
  { word: "kopec", hint: "Nerovnoměrná zátěž terénu žádající okamžitý fyzický výdaj." },
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
