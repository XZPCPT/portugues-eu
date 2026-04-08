// ── Types ────────────────────────────────────────────────────────────────────

export interface TriviaQuestion {
  lvl: 1 | 2 | 3;
  q: string;
  visual: string;
  options: string[];
  correct: number;
  fact: string;
}

export interface TriviaCategory {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  questions: TriviaQuestion[];
}

// ── Seed data (5 categories × 3 levels × 4 questions = 60 total) ─────────────

export const TRIVIA_CATEGORIES: TriviaCategory[] = [
  {
    id: 'music', emoji: '🎵', name: 'Music & Fado',
    desc: 'Fado, saudade, and the songs that make Portugal weep',
    questions: [
      // Level 1 · Starter
      { lvl: 1, q: 'What is Fado?', visual: '🎵', options: ['A traditional dance', 'A genre of music', 'A type of pastry', 'A summer festival'], correct: 1, fact: "Fado is Portugal's most iconic music genre, filled with saudade — deep, melancholic longing. UNESCO declared it an Intangible Cultural Heritage of Humanity in 2011." },
      { lvl: 1, q: 'Who is known as the Queen of Fado?', visual: '👸', options: ['Mariza', 'Ana Moura', 'Amália Rodrigues', 'Dulce Pontes'], correct: 2, fact: 'Amália Rodrigues (1920–1999) transformed Fado into a world-famous art form. When she died, Portugal declared three days of national mourning.' },
      { lvl: 1, q: 'What does saudade mean?', visual: '💙', options: ['Joy and celebration', 'Deep melancholic longing', 'Pride and victory', 'Surprise and wonder'], correct: 1, fact: "Saudade is one of the world's most untranslatable words — a bittersweet longing for something beloved but absent. It is the very soul of Portuguese Fado." },
      { lvl: 1, q: "Which city is most associated with Fado music?", visual: '🌆', options: ['Porto', 'Coimbra', 'Braga', 'Lisbon'], correct: 3, fact: "Fado was born in Lisbon's oldest neighbourhoods — Alfama and Mouraria — in the early 19th century, and is still performed there in casas de fado nightly." },
      // Level 2 · Explorer
      { lvl: 2, q: 'Which instrument is unique to Portuguese Fado?', visual: '🎸', options: ['Violin', 'Accordion', 'Trumpet', 'Portuguese guitar'], correct: 3, fact: 'The Portuguese guitar (guitarra portuguesa) has 12 steel strings and a pear-shaped body. It evolved from medieval citterns and is played almost exclusively in Portugal.' },
      { lvl: 2, q: 'What is a fadista?', visual: '🎤', options: ['A Fado restaurant', 'A Fado singer', 'A Fado dance step', 'A Fado instrument'], correct: 1, fact: 'Famous modern fadistas include Mariza, Ana Moura, Camané and Mísia — each bringing a distinct style to this centuries-old tradition.' },
      { lvl: 2, q: 'Which singer won Eurovision 2017 for Portugal?', visual: '🏆', options: ['Mariza', 'Ana Moura', 'Dulce Pontes', 'Salvador Sobral'], correct: 3, fact: "Salvador Sobral won Eurovision 2017 with Amar Pelos Dois — Portugal's first-ever Eurovision victory! The soft ballad was written by his sister Luísa Sobral." },
      { lvl: 2, q: "Coimbra's Fado is traditionally sung by which group?", visual: '🎓', options: ['Only women', "Children's choirs", 'Male university students', 'Monks'], correct: 2, fact: 'Coimbra Fado is sung exclusively by men, traditionally students of Coimbra University. It is more poetic and lyrical in style than Lisbon Fado.' },
      // Level 3 · Expert
      { lvl: 3, q: 'In what year did UNESCO officially recognise Fado?', visual: '🏛️', options: ['2001', '2005', '2011', '2018'], correct: 2, fact: "UNESCO added Fado to its Intangible Cultural Heritage of Humanity list in November 2011. Portugal lobbied for years to achieve this recognition." },
      { lvl: 3, q: 'What type of venue hosts traditional live Fado performances?', visual: '🕯️', options: ['Teatro nacional', 'Casa de fado', 'Cervejaria', 'Taberna'], correct: 1, fact: "A casa de fado is a licensed restaurant where fadistas perform for diners. Lisbon's city council tightly regulates these venues to preserve Fado's authentic character." },
      { lvl: 3, q: 'The Portuguese guitar (guitarra) descends from which medieval instrument?', visual: '🪕', options: ['Lute', 'Cittern', 'Dulcimer', 'Oud'], correct: 1, fact: 'The guitarra portuguesa evolved from European citterns brought by English and Dutch merchants. It acquired its distinctive 12-string pear shape in the 19th century.' },
      { lvl: 3, q: 'Which modern fadista was born in Mozambique and grew up in Mouraria, Lisbon?', visual: '🌍', options: ['Amália Rodrigues', 'Dulce Pontes', 'Mariza', 'Ana Moura'], correct: 2, fact: "Mariza — born in Mozambique and raised in Lisbon's Mouraria neighbourhood — became Fado's biggest modern star, bringing the genre to international concert halls worldwide." },
    ],
  },
  {
    id: 'geo', emoji: '🗺️', name: 'Geography',
    desc: 'From the Atlantic coast to the Azores — explore the land',
    questions: [
      { lvl: 1, q: 'What is the capital of Portugal?', visual: '🏛️', options: ['Porto', 'Braga', 'Coimbra', 'Lisbon'], correct: 3, fact: 'Lisbon (Lisboa) is Portugal\'s capital and largest city, built across seven hills beside the River Tagus. It is one of the oldest capitals in Europe.' },
      { lvl: 1, q: 'Which ocean borders Portugal to the west?', visual: '🌊', options: ['Indian Ocean', 'Pacific Ocean', 'Mediterranean Sea', 'Atlantic Ocean'], correct: 3, fact: "Portugal's long Atlantic coastline shaped it as a great seafaring nation. Portuguese sailors were the first Europeans to explore much of the world's coastlines." },
      { lvl: 1, q: 'The Algarve region in southern Portugal is famous for what?', visual: '🏖️', options: ['Ski resorts', 'Stunning beaches and cliffs', 'Dense forests', 'Vast deserts'], correct: 1, fact: "The Algarve's dramatic golden cliffs, sea caves and warm beaches make it one of Europe's top holiday destinations, attracting millions of visitors each year." },
      { lvl: 1, q: 'Which country shares a land border with Portugal?', visual: '🌍', options: ['France', 'Morocco', 'Spain', 'Italy'], correct: 2, fact: 'Portugal shares its only land border with Spain. Together they form the Iberian Peninsula. Despite being neighbours, Portuguese and Spanish are very distinct languages.' },
      { lvl: 2, q: 'What is the longest river flowing through Portugal?', visual: '🌊', options: ['Douro', 'Minho', 'Guadiana', 'Tagus (Tejo)'], correct: 3, fact: "The Tagus (Tejo) stretches 1,007 km from Spain through Portugal. Its estuary near Lisbon is so wide it was once thought to be the sea by early travellers." },
      { lvl: 2, q: 'Which bridge in Lisbon resembles the Golden Gate Bridge?', visual: '🌉', options: ['Vasco da Gama Bridge', 'Dom Luís Bridge', 'Arrábida Bridge', '25 de Abril Bridge'], correct: 3, fact: 'The 25 de Abril Bridge (1966) was built by the same American company as the Golden Gate Bridge. It was renamed after the 1974 Carnation Revolution.' },
      { lvl: 2, q: "Portugal's highest peak, Mount Pico, is on which islands?", visual: '🌋', options: ['Madeira', 'Berlengas', 'Cape Verde', 'The Azores'], correct: 3, fact: 'Mount Pico (2,351 m) rises from Pico Island in the Azores, sitting right on the Mid-Atlantic Ridge. The Azores were uninhabited when the Portuguese discovered them around 1427.' },
      { lvl: 2, q: 'Which city is the world capital of Port wine?', visual: '🍷', options: ['Lisbon', 'Évora', 'Faro', 'Porto'], correct: 3, fact: 'Port wine is aged in lodges in Vila Nova de Gaia, directly across the River Douro from Porto. The city literally gave this famous fortified wine its name.' },
      { lvl: 3, q: 'Where is the westernmost point of mainland Europe?', visual: '🌍', options: ['Cape Finisterre', 'Sagres', 'Cape St Vincent', 'Cabo da Roca'], correct: 3, fact: 'Cabo da Roca, near Sintra, is where Europe ends. The poet Luís de Camões wrote: where the land ends and the sea begins. It sits at 9 degrees 30 minutes West.' },
      { lvl: 3, q: 'The Alto Douro Wine Region was classified as UNESCO World Heritage in which year?', visual: '🍇', options: ['1988', '2001', '2007', '2012'], correct: 1, fact: 'The Alto Douro Wine Region was inscribed as UNESCO World Heritage in 2001, recognised as the world\'s oldest officially delimited wine region, first established in 1756.' },
      { lvl: 3, q: "Sintra's Cultural Landscape was declared a UNESCO World Heritage Site in...", visual: '🏰', options: ['1985', '1989', '1995', '2001'], correct: 2, fact: "Sintra's romantic palaces and fairy-tale gardens were inscribed as UNESCO World Heritage in 1995. Sintra was a favourite retreat of Portuguese royalty for centuries." },
      { lvl: 3, q: "Approximately what percentage of Portugal's land area is covered by forest?", visual: '🌲', options: ['15%', '35%', '55%', '70%'], correct: 1, fact: 'About 35% of Portugal is forested, making it one of Europe\'s most wooded countries. However, summer wildfires — especially in eucalyptus forests — are a growing challenge.' },
    ],
  },
  {
    id: 'history', emoji: '⚓', name: 'History & Explorers',
    desc: 'Age of Discoveries, brave sailors, and a little rooster',
    questions: [
      { lvl: 1, q: 'Which Portuguese explorer reached India by sea in 1498?', visual: '⛵', options: ['Pedro Álvares Cabral', 'Bartolomeu Dias', 'Ferdinand Magellan', 'Vasco da Gama'], correct: 3, fact: "Vasco da Gama's voyage to India in 1498 opened a sea trade route that made Portugal the dominant spice power for over a century, permanently changing world trade." },
      { lvl: 1, q: 'Which explorer is credited with discovering Brazil in 1500?', visual: '🌴', options: ['Bartolomeu Dias', 'Vasco da Gama', 'Pedro Álvares Cabral', 'Diogo Cão'], correct: 2, fact: 'Pedro Álvares Cabral landed in Brazil in 1500. Portugal colonised Brazil for over 300 years — which is why more than 200 million Brazilians speak Portuguese today.' },
      { lvl: 1, q: 'The Carnation Revolution of 25 April 1974 peacefully ended what?', visual: '🌹', options: ['A famine', 'A monarchy', 'A dictatorship', 'A civil war'], correct: 2, fact: "Soldiers placed carnations in their gun barrels to end 48 years of authoritarian rule without bloodshed. April 25th is now Portugal's Freedom Day, a beloved national holiday." },
      { lvl: 1, q: "What does the armillary sphere on Portugal's flag represent?", visual: '🇵🇹', options: ['The Catholic Church', 'Exploration and navigation', 'The sun', 'Royal power'], correct: 1, fact: "The armillary sphere was a navigational instrument used during the Age of Discoveries to determine celestial positions at sea. It is Portugal's enduring symbol of maritime heritage." },
      { lvl: 2, q: 'Who led the first expedition to sail around the entire world?', visual: '🌍', options: ['Vasco da Gama', 'Ferdinand Magellan', 'Bartolomeu Dias', 'Afonso de Albuquerque'], correct: 1, fact: 'Ferdinand Magellan (Fernão de Magalhães) led the first circumnavigation (1519–1522), though he died in the Philippines. His crew completed the historic voyage.' },
      { lvl: 2, q: 'The Torre de Belém was built to commemorate what?', visual: '🏰', options: ['A great military victory', 'A royal wedding', 'The Age of Discoveries', 'Portugal joining the EU'], correct: 2, fact: 'The Torre de Belém (1516–1521) stood at the mouth of the Tagus as a monument to Portugal\'s maritime power and as a ceremonial gateway for departing explorers.' },
      { lvl: 2, q: 'Portugal became an independent kingdom in which year?', visual: '👑', options: ['868', '1385', '1249', '1143'], correct: 3, fact: 'Portugal became a kingdom in 1143 when Afonso Henriques was recognised as its first king by the Treaty of Zamora — making it one of the oldest nation-states in Europe.' },
      { lvl: 2, q: 'Which 1385 battle secured Portuguese independence from Castile?', visual: '⚔️', options: ['Battle of Aljubarrota', 'Battle of Ourique', 'Battle of Alcácer Quibir', 'Battle of Sagres'], correct: 0, fact: "The Battle of Aljubarrota (1385) was Portugal's most decisive military victory. The Monastery of Batalha was built to celebrate the triumph — it stands to this day." },
      { lvl: 3, q: 'Bartolomeu Dias was the first European to round which cape?', visual: '🧭', options: ['Cape of Good Hope', 'Cape Verde', 'Cape Finisterre', 'Cape Horn'], correct: 0, fact: "Bartolomeu Dias rounded the Cape of Good Hope in 1488, proving a sea route to Asia was possible. He called it the Cape of Storms — King João II renamed it more optimistically." },
      { lvl: 3, q: 'In what year did Portugal join the European Economic Community?', visual: '🇪🇺', options: ['1975', '1980', '1986', '1992'], correct: 2, fact: "Portugal joined the EEC (now EU) in 1986, alongside Spain. Membership transformed Portugal's economy and infrastructure, bringing significant investment over the following decades." },
      { lvl: 3, q: 'The Marquis of Pombal rebuilt Lisbon after which catastrophe?', visual: '🏙️', options: ['The Black Death', 'The Great Lisbon Earthquake', 'A catastrophic flood', 'A massive fire'], correct: 1, fact: "The 1755 Lisbon earthquake and tsunami killed up to 40,000 people. Pombal's systematic rebuilding created the Pombaline architectural style still visible in Baixa today." },
      { lvl: 3, q: 'Which dynasty commissioned the Jerónimos Monastery in Belém?', visual: '⛪', options: ['House of Aviz', 'House of Braganza', 'House of Burgundy', 'House of Habsburg'], correct: 0, fact: 'King Manuel I of the House of Aviz commissioned the Jerónimos Monastery around 1501. It is the finest example of the ornate Manueline architectural style in Portugal.' },
    ],
  },
  {
    id: 'food', emoji: '🍽️', name: 'Food & Traditions',
    desc: 'Pastéis de nata, cork, azulejos — the essentials of Portuguese life',
    questions: [
      { lvl: 1, q: 'What is a pastel de nata?', visual: '🥐', options: ['A fish stew', 'A savoury soup', 'A custard tart', 'A type of bread'], correct: 2, fact: 'Pastéis de nata were invented by monks at Jerónimos Monastery in Belém in the 18th century. The original recipe at Pastéis de Belém remains a closely guarded secret to this day.' },
      { lvl: 1, q: 'What is bacalhau?', visual: '🐟', options: ['Fresh sardines', 'Dried salted cod', 'Sea bass', 'Grilled tuna'], correct: 1, fact: "Bacalhau is Portugal's most beloved ingredient. They say there are 365 recipes — one for every day of the year. Oddly, Portugal catches no cod; it is imported mainly from Norway." },
      { lvl: 1, q: 'What are azulejos?', visual: '🔵', options: ['Embroidered blankets', 'Woven straw hats', 'Wooden carvings', 'Painted ceramic tiles'], correct: 3, fact: "Portugal's iconic painted tiles, decorating churches, train stations and walls with blue-and-white scenes. The word comes from the Arabic for polished stone." },
      { lvl: 1, q: "Portugal is the world's largest producer of which natural material?", visual: '🌳', options: ['Sardines', 'Olive oil', 'Wool', 'Cork'], correct: 3, fact: "Portugal produces about 50% of the world's cork from cork oak forests in the Alentejo. The bark is harvested every 9 years without felling the tree — it simply regrows." },
      { lvl: 2, q: 'What is a tosta mista?', visual: '🥪', options: ['A fish dish', 'A vegetable soup', 'A custard pastry', 'A toasted ham and cheese sandwich'], correct: 3, fact: 'The tosta mista — a pressed sandwich of ham and melted cheese — is Portugal\'s ultimate café comfort food. Simple, golden, and perfect with a bica (espresso).' },
      { lvl: 2, q: 'The Festa de Santo António on 13 June is biggest in which city?', visual: '🎉', options: ['Porto', 'Braga', 'Lisbon', 'Coimbra'], correct: 2, fact: 'Santo António (St. Anthony) was born in Lisbon in 1195. His feast day transforms Lisbon into a giant street party with grilled sardines, paper flowers and neighbourhood parades.' },
      { lvl: 2, q: 'What do the Barcelos roosters (Galo de Barcelos) symbolise?', visual: '🐓', options: ['Good luck and honesty', 'Royal authority', 'Military bravery', 'Maritime skill'], correct: 0, fact: "The Barcelos Rooster is Portugal's unofficial national symbol. Legend says a dead rooster crowed to prove an innocent man's innocence at a judge's dinner. It represents faith and justice." },
      { lvl: 2, q: "What is a bica in Portuguese café culture?", visual: '☕', options: ['A glass of wine', 'A type of pastry', 'A strong espresso', 'A fizzy soft drink'], correct: 2, fact: "A bica is Lisbon's word for a short espresso. In Porto the same coffee is called a cimbalino. Portuguese coffee culture is central to daily life — cafés open early and close late." },
      { lvl: 3, q: 'Arroz de pato is a traditional Portuguese dish made with what?', visual: '🍚', options: ['Octopus and rice', 'Duck and rice', 'Lobster and rice', 'Pork and rice'], correct: 1, fact: 'Arroz de pato (duck rice) is a beloved comfort dish — slow-cooked duck baked into oven-crisped rice with chorizo and olives. It is thought to originate in the Minho region.' },
      { lvl: 3, q: 'Porto citizens are nicknamed tripeiros (tripe-eaters) because of which legend?', visual: '🏙️', options: ['They invented tripe soup', 'They ate only tripe for a year', 'Porto donated its meat to a 1415 expedition, leaving only offal', 'A king ordered them to eat tripe as punishment'], correct: 2, fact: 'Legend says Porto gave away all its meat to supply ships for the 1415 Ceuta expedition, leaving only offal for themselves. The story may be mythical but the nickname stuck for centuries.' },
      { lvl: 3, q: 'The Douro wine region was first officially delimited in which century?', visual: '🍷', options: ['16th century', '17th century', '18th century', '19th century'], correct: 2, fact: "The Marquis of Pombal officially demarcated the Douro wine region in 1756 — making it the world's oldest officially protected wine region, predating France's appellation system by nearly 200 years." },
      { lvl: 3, q: 'Which hearty Alentejo bread-based soup is made with garlic, olive oil, coriander and eggs?', visual: '🍲', options: ['Caldo verde', 'Açorda', 'Cataplana', 'Cozido'], correct: 1, fact: 'Açorda is a peasant dish made from stale bread, garlic, olive oil, coriander and poached eggs. It originated in the Alentejo as a way to use old bread — and became a beloved classic.' },
    ],
  },
  {
    id: 'sports', emoji: '⚽', name: 'Sports & Icons',
    desc: 'Football, Ronaldo, and the pride of a footballing nation',
    questions: [
      { lvl: 1, q: "Which Portuguese player is considered one of football's greatest ever?", visual: '⚽', options: ['Eusébio', 'Luís Figo', 'Rui Costa', 'Cristiano Ronaldo'], correct: 3, fact: "Cristiano Ronaldo, born in Madeira in 1985, has won multiple Ballon d'Or awards and holds records for international goals. He is Portugal's most famous living person." },
      { lvl: 1, q: 'Portugal won its first major international football trophy at which tournament?', visual: '🏆', options: ['Euro 2004', 'World Cup 2006', 'Euro 2012', 'Euro 2016'], correct: 3, fact: "Portugal won Euro 2016, beating France 1-0 in Paris. Ronaldo, injured in the first half, famously directed the team tearfully from the sidelines — and Portugal triumphed anyway." },
      { lvl: 1, q: 'Cristiano Ronaldo was born on which Portuguese island?', visual: '🏝️', options: ['Azores', 'Madeira', 'Berlengas', 'São Tomé'], correct: 1, fact: 'Ronaldo was born in Funchal, Madeira on 5 February 1985. He moved to Lisbon at age 12 to join Sporting CP\'s academy, and the rest is football history.' },
      { lvl: 1, q: 'Portuguese manager José Mourinho is nicknamed what?', visual: '🎩', options: ['The Professor', 'The Special One', 'The General', 'The Wizard'], correct: 1, fact: 'Mourinho coined the nickname himself in his first Chelsea press conference in 2004. He went on to win league titles in Portugal, England, Italy and Spain.' },
      { lvl: 2, q: 'The legendary Eusébio played for which Lisbon club?', visual: '⚽', options: ['FC Porto', 'Sporting CP', 'Vitória FC', 'Benfica'], correct: 3, fact: "Eusébio (1942–2014), The Black Panther, was Benfica's all-time top scorer and led Portugal to 3rd place at the 1966 World Cup. A statue stands outside Estádio da Luz." },
      { lvl: 2, q: 'Who scored the winning goal for Portugal in the Euro 2016 final?', visual: '🥅', options: ['Cristiano Ronaldo', 'Nani', 'João Moutinho', 'Eder'], correct: 3, fact: 'Eder, a substitute who had struggled all tournament, scored in the 109th minute of extra time to give Portugal its historic first major title. A true fairy-tale moment.' },
      { lvl: 2, q: 'The Estádio do Dragão in Porto is home to which club?', visual: '🐉', options: ['Sporting CP', 'Benfica', 'SC Braga', 'FC Porto'], correct: 3, fact: 'Estádio do Dragão was built for Euro 2004 and holds 50,000 fans. FC Porto have won two UEFA Champions League titles — the second managed by José Mourinho in 2004.' },
      { lvl: 2, q: 'Portugal is a world powerhouse in which beach sport?', visual: '🏖️', options: ['Beach volleyball', 'Surfing', 'Beach football', 'Beach tennis'], correct: 2, fact: "Portugal is one of the world's top beach football nations, regularly competing for world titles. Its Atlantic coastline and love of football make it a natural home for the sport." },
      { lvl: 3, q: 'Luís Figo won the Ballon d\'Or in which year?', visual: '🏅', options: ['1998', '2000', '2003', '2006'], correct: 1, fact: "Luís Figo won the Ballon d'Or in 2000 after a legendary season with Real Madrid. His controversial transfer from Barcelona to Real Madrid that year is one of football's most dramatic moves." },
      { lvl: 3, q: 'How many times has Portugal won the FIFA World Cup?', visual: '🌍', options: ['0', '1', '2', '3'], correct: 0, fact: 'Portugal has never won the FIFA World Cup, despite reaching 3rd place in 1966 with Eusébio and 3rd again in 2006 with Figo and Ronaldo. Euro 2016 remains their greatest triumph.' },
      { lvl: 3, q: "Portugal's national team is officially called A Selecao das Quinas — what are the Quinas?", visual: '🦅', options: ['The five blue shields on the coat of arms', 'The five founding regions', 'The five Ballon d\'Or winners', 'The five Portuguese kings'], correct: 0, fact: "Quinas refers to the five blue shields (escudos azuis) on the Portuguese coat of arms, each bearing five white dots (bezants). The national team badge proudly displays them." },
      { lvl: 3, q: "Nazaré's record-breaking giant waves are caused by what underwater feature?", visual: '🌊', options: ['An undersea volcano', 'The Nazaré Canyon', 'Unusual tidal patterns', 'Warm and cold currents mixing'], correct: 1, fact: "The Nazaré Canyon — one of Europe's deepest submarine canyons — funnels massive deep-water swells directly at the beach. In 2011, Garrett McNamara surfed a record 30-metre wave there." },
    ],
  },
];
