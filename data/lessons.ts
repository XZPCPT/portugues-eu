// ── Types ────────────────────────────────────────────────────────────────────

export type ExerciseType =
  | 'multipleChoice'
  | 'reverseChoice'
  | 'fillBlank'
  | 'tapPairs'
  | 'typeAnswer'
  | 'arrangeWords';

export interface Word {
  pt: string;
  en: string;
  phonetic: string;
  example: string;
}

export interface Exercise {
  type: ExerciseType;
  // multipleChoice / reverseChoice
  prompt?: string;
  audio?: string;
  correct?: string;
  options?: string[];
  // fillBlank
  instruction?: string;
  sentence?: string;
  translation?: string;
  // tapPairs
  pairs?: { pt: string; en: string }[];
  // typeAnswer
  hint?: string;
  alternates?: string[];
  // arrangeWords
  words?: string[];
}

export interface Lesson {
  id: number;
  emoji: string;
  number: string;
  title: string;
  theme: string;
  words: Word[];
  exercises: Exercise[];
}

// ── Seed data (10 A1 lessons) ────────────────────────────────────────────────

export const LESSONS: Lesson[] = [
  {
    id: 1, emoji: '👋', number: 'Lesson 01', title: 'Greetings & Hellos',
    theme: 'Every journey begins with a hello. Learn your first Portuguese greetings!',
    words: [
      { pt: 'Olá',       en: 'Hello',            phonetic: 'oh-LAH',          example: 'Olá! Como estás?' },
      { pt: 'Bom dia',   en: 'Good morning',     phonetic: 'bom DEE-ah',      example: 'Bom dia, Maria!' },
      { pt: 'Boa tarde', en: 'Good afternoon',   phonetic: 'boh-ah TAR-djeh', example: 'Boa tarde, senhor!' },
      { pt: 'Adeus',     en: 'Goodbye',          phonetic: 'ah-DEH-oosh',     example: 'Adeus! Até amanhã.' },
      { pt: 'Obrigado',  en: 'Thank you',        phonetic: 'oh-bree-GAH-doo', example: 'Obrigado, Pedro!' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "Olá" mean?', audio: 'Olá', correct: 'Hello', options: ['Hello', 'Goodbye', 'Good morning', 'Please'] },
      { type: 'tapPairs', instruction: 'Match each word to its meaning', pairs: [{ pt: 'Olá', en: 'Hello' }, { pt: 'Adeus', en: 'Goodbye' }, { pt: 'Bom dia', en: 'Good morning' }, { pt: 'Obrigado', en: 'Thank you' }] },
      { type: 'fillBlank', instruction: 'Complete the farewell', sentence: '___, Pedro! Até amanhã.', correct: 'Adeus', options: ['Adeus', 'Obrigado', 'Bom dia', 'Sim'], translation: 'Goodbye, Pedro! See you tomorrow.' },
      { type: 'reverseChoice', prompt: 'How do you say "Goodbye" in Portuguese?', correct: 'Adeus', options: ['Olá', 'Adeus', 'Obrigado', 'Bom dia'] },
      { type: 'typeAnswer', prompt: 'Type "Good afternoon" in Portuguese', hint: 'boh-ah TAR-djeh', correct: 'Boa tarde', alternates: ['boa tarde'] },
      { type: 'arrangeWords', instruction: 'Arrange the words into a correct greeting', words: ['dia,', 'Bom', 'senhor!'], correct: 'Bom dia, senhor!' },
      { type: 'multipleChoice', prompt: 'What does "Boa tarde" mean?', audio: 'Boa tarde', correct: 'Good afternoon', options: ['Good morning', 'Good afternoon', 'Thank you', 'Goodbye'] },
      { type: 'reverseChoice', prompt: 'How do you say "Thank you" in Portuguese?', correct: 'Obrigado', options: ['Olá', 'Boa tarde', 'Obrigado', 'Adeus'] },
      { type: 'fillBlank', instruction: 'Complete the morning greeting', sentence: 'Bom ___, senhor!', correct: 'dia', options: ['dia', 'tarde', 'olá', 'adeus'], translation: 'Good morning, sir!' },
      { type: 'tapPairs', instruction: 'Round 2 — match again!', pairs: [{ pt: 'Boa tarde', en: 'Good afternoon' }, { pt: 'Obrigado', en: 'Thank you' }, { pt: 'Adeus', en: 'Goodbye' }, { pt: 'Olá', en: 'Hello' }] },
    ],
  },
  {
    id: 2, emoji: '🙏', number: 'Lesson 02', title: 'Yes, No & Please',
    theme: 'Three tiny words with enormous power — you\'ll use these every day!',
    words: [
      { pt: 'Sim',        en: 'Yes',           phonetic: 'seem',           example: 'Sim, por favor!' },
      { pt: 'Não',        en: 'No',            phonetic: 'nowng',          example: 'Não, obrigado.' },
      { pt: 'Por favor',  en: 'Please',        phonetic: 'por fah-VOR',    example: 'Um café, por favor.' },
      { pt: 'Com licença',en: 'Excuse me',     phonetic: 'kom lee-SEN-sah',example: 'Com licença, posso passar?' },
      { pt: 'De nada',    en: "You're welcome",phonetic: 'djeh NAH-dah',   example: 'Obrigado! — De nada!' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "Não" mean?', audio: 'Não', correct: 'No', options: ['Yes', 'No', 'Please', 'Excuse me'] },
      { type: 'tapPairs', instruction: 'Match each word to its meaning', pairs: [{ pt: 'Sim', en: 'Yes' }, { pt: 'Não', en: 'No' }, { pt: 'Por favor', en: 'Please' }, { pt: 'De nada', en: "You're welcome" }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'Um café, ___ favor.', correct: 'por', options: ['por', 'sim', 'não', 'de'], translation: 'A coffee, please.' },
      { type: 'reverseChoice', prompt: 'How do you say "Excuse me"?', correct: 'Com licença', options: ['De nada', 'Sim', 'Por favor', 'Com licença'] },
      { type: 'arrangeWords', instruction: "Rearrange to say 'A coffee, please'", words: ['favor.', 'Um', 'por', 'café,'], correct: 'Um café, por favor.' },
      { type: 'multipleChoice', prompt: 'What does "Por favor" mean?', audio: 'Por favor', correct: 'Please', options: ['Yes', 'No', 'Please', 'Thank you'] },
      { type: 'reverseChoice', prompt: 'How do you say "Yes" in Portuguese?', correct: 'Sim', options: ['Não', 'Sim', 'De nada', 'Com licença'] },
      { type: 'fillBlank', instruction: 'Decline politely', sentence: 'Não, ___ .', correct: 'obrigado', options: ['obrigado', 'favor', 'licença', 'nada'], translation: 'No, thank you.' },
      { type: 'tapPairs', instruction: 'Round 2 — match again!', pairs: [{ pt: 'Sim', en: 'Yes' }, { pt: 'Com licença', en: 'Excuse me' }, { pt: 'De nada', en: "You're welcome" }, { pt: 'Por favor', en: 'Please' }] },
      { type: 'typeAnswer', prompt: "Type \"You're welcome\" in Portuguese", hint: 'djeh NAH-dah', correct: 'De nada', alternates: ['de nada'] },
    ],
  },
  {
    id: 3, emoji: '🔢', number: 'Lesson 03', title: 'Numbers 1–5',
    theme: 'Numbers are everywhere — let\'s count in Portuguese!',
    words: [
      { pt: 'Um',    en: 'One',  phonetic: 'oong',      example: 'Um café, por favor.' },
      { pt: 'Dois',  en: 'Two',  phonetic: 'doysh',     example: 'Dois pastéis de nata!' },
      { pt: 'Três',  en: 'Three',phonetic: 'tresh',     example: 'Três pessoas.' },
      { pt: 'Quatro',en: 'Four', phonetic: 'KWAH-troo', example: 'Quatro horas.' },
      { pt: 'Cinco', en: 'Five', phonetic: 'SEEN-koo',  example: 'Cinco dias.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What number is "Três"?', audio: 'Três', correct: 'Three', options: ['Two', 'Four', 'Three', 'Five'] },
      { type: 'tapPairs', instruction: 'Match each number', pairs: [{ pt: 'Um', en: 'One' }, { pt: 'Dois', en: 'Two' }, { pt: 'Quatro', en: 'Four' }, { pt: 'Cinco', en: 'Five' }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: '___ pastéis de nata!', correct: 'Dois', options: ['Um', 'Dois', 'Três', 'Quatro'], translation: 'Two custard tarts!' },
      { type: 'reverseChoice', prompt: 'How do you say "Five" in Portuguese?', correct: 'Cinco', options: ['Três', 'Quatro', 'Cinco', 'Dois'] },
      { type: 'typeAnswer', prompt: 'Type the number "4" in Portuguese', hint: 'KWAH-troo', correct: 'Quatro', alternates: ['quatro'] },
      { type: 'multipleChoice', prompt: 'What number is "Dois"?', audio: 'Dois', correct: 'Two', options: ['One', 'Two', 'Three', 'Four'] },
      { type: 'reverseChoice', prompt: 'How do you say "Three" in Portuguese?', correct: 'Três', options: ['Um', 'Dois', 'Três', 'Quatro'] },
      { type: 'fillBlank', instruction: 'Complete the order', sentence: '___ café, por favor.', correct: 'Um', options: ['Um', 'Dois', 'Três', 'Cinco'], translation: 'One coffee, please.' },
      { type: 'tapPairs', instruction: 'Round 2 — match the numbers!', pairs: [{ pt: 'Um', en: 'One' }, { pt: 'Dois', en: 'Two' }, { pt: 'Três', en: 'Three' }, { pt: 'Cinco', en: 'Five' }] },
      { type: 'typeAnswer', prompt: 'Type "Three" in Portuguese', hint: 'tresh', correct: 'Três', alternates: ['três'] },
    ],
  },
  {
    id: 4, emoji: '🎨', number: 'Lesson 04', title: 'Colours',
    theme: 'Portugal is full of colour — in its azulejos, flowers, and streets!',
    words: [
      { pt: 'Vermelho', en: 'Red',   phonetic: 'ver-MEH-lyoo', example: 'Uma rosa vermelha.' },
      { pt: 'Azul',     en: 'Blue',  phonetic: 'ah-ZOOL',      example: 'O mar é azul.' },
      { pt: 'Verde',    en: 'Green', phonetic: 'VER-djeh',     example: 'Uma maçã verde.' },
      { pt: 'Branco',   en: 'White', phonetic: 'BRAN-koo',     example: 'Uma parede branca.' },
      { pt: 'Preto',    en: 'Black', phonetic: 'PREH-too',     example: 'Um gato preto.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What colour is "Azul"?', audio: 'Azul', correct: 'Blue', options: ['Red', 'Green', 'Blue', 'White'] },
      { type: 'tapPairs', instruction: 'Match the colours', pairs: [{ pt: 'Vermelho', en: 'Red' }, { pt: 'Azul', en: 'Blue' }, { pt: 'Verde', en: 'Green' }, { pt: 'Preto', en: 'Black' }] },
      { type: 'fillBlank', instruction: 'What colour is the sea?', sentence: 'O mar é ___.', correct: 'Azul', options: ['Azul', 'Vermelho', 'Verde', 'Branco'], translation: 'The sea is ___.' },
      { type: 'reverseChoice', prompt: 'How do you say "White"?', correct: 'Branco', options: ['Preto', 'Verde', 'Azul', 'Branco'] },
      { type: 'typeAnswer', prompt: 'Type "Red" in Portuguese', hint: 'ver-MEH-lyoo', correct: 'Vermelho', alternates: ['vermelho'] },
      { type: 'multipleChoice', prompt: 'What colour is "Verde"?', audio: 'Verde', correct: 'Green', options: ['Blue', 'Red', 'Green', 'Black'] },
      { type: 'reverseChoice', prompt: 'How do you say "White" in Portuguese?', correct: 'Branco', options: ['Preto', 'Verde', 'Azul', 'Branco'] },
      { type: 'fillBlank', instruction: 'What colour is the cat?', sentence: 'Um gato ___.', correct: 'Preto', options: ['Preto', 'Azul', 'Verde', 'Vermelho'], translation: 'A black cat.' },
      { type: 'tapPairs', instruction: 'Round 2 — match the colours!', pairs: [{ pt: 'Vermelho', en: 'Red' }, { pt: 'Branco', en: 'White' }, { pt: 'Verde', en: 'Green' }, { pt: 'Preto', en: 'Black' }] },
      { type: 'arrangeWords', instruction: 'Describe a green apple', words: ['maçã', 'Uma', 'verde.'], correct: 'Uma maçã verde.' },
    ],
  },
  {
    id: 5, emoji: '👁', number: 'Lesson 05', title: 'The Body',
    theme: 'Let\'s learn the basic body parts — useful every single day!',
    words: [
      { pt: 'A cabeça',   en: 'The head',  phonetic: 'ah kah-BEH-sah',   example: 'A minha cabeça dói.' },
      { pt: 'Os olhos',   en: 'The eyes',  phonetic: 'oosh OH-lyoosh',   example: 'Os seus olhos são azuis.' },
      { pt: 'A mão',      en: 'The hand',  phonetic: 'ah mowng',         example: 'A minha mão está fria.' },
      { pt: 'Os pés',     en: 'The feet',  phonetic: 'oosh pesh',        example: 'Os meus pés cansaram.' },
      { pt: 'O coração',  en: 'The heart', phonetic: 'oo koo-rah-SOWNG', example: 'O coração bate depressa.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "A cabeça" mean?', audio: 'A cabeça', correct: 'The head', options: ['The hand', 'The head', 'The eye', 'The foot'] },
      { type: 'tapPairs', instruction: 'Match the body parts', pairs: [{ pt: 'A cabeça', en: 'The head' }, { pt: 'Os olhos', en: 'The eyes' }, { pt: 'A mão', en: 'The hand' }, { pt: 'Os pés', en: 'The feet' }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'A minha ___ dói.', correct: 'cabeça', options: ['cabeça', 'mão', 'pés', 'olhos'], translation: 'My head hurts.' },
      { type: 'reverseChoice', prompt: 'How do you say "The heart"?', correct: 'O coração', options: ['A mão', 'Os pés', 'O coração', 'Os olhos'] },
      { type: 'typeAnswer', prompt: 'Type "The hand" in Portuguese', hint: 'ah mowng', correct: 'A mão', alternates: ['a mão', 'mão'] },
      { type: 'multipleChoice', prompt: 'What does "Os olhos" mean?', audio: 'Os olhos', correct: 'The eyes', options: ['The feet', 'The heart', 'The eyes', 'The hand'] },
      { type: 'reverseChoice', prompt: 'How do you say "The heart" in Portuguese?', correct: 'O coração', options: ['A mão', 'Os pés', 'O coração', 'Os olhos'] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'O ___ bate depressa.', correct: 'coração', options: ['coração', 'cabeça', 'olhos', 'pés'], translation: 'The heart beats fast.' },
      { type: 'tapPairs', instruction: 'Round 2 — body parts!', pairs: [{ pt: 'Os olhos', en: 'The eyes' }, { pt: 'Os pés', en: 'The feet' }, { pt: 'O coração', en: 'The heart' }, { pt: 'A cabeça', en: 'The head' }] },
      { type: 'arrangeWords', instruction: "Say 'My hand is cold'", words: ['fria.', 'mão', 'A', 'está', 'minha'], correct: 'A minha mão está fria.' },
    ],
  },
  {
    id: 6, emoji: '☕', number: 'Lesson 06', title: 'Food & Drink',
    theme: 'Portuguese cuisine is wonderful! Let\'s name some essentials.',
    words: [
      { pt: 'A água',          en: 'Water',       phonetic: 'ah AH-gwah',            example: 'Um copo de água, por favor.' },
      { pt: 'O pão',           en: 'Bread',       phonetic: 'oo powng',              example: 'O pão está quente.' },
      { pt: 'O café',          en: 'Coffee',      phonetic: 'oo kah-FEH',            example: 'Um café, faz favor.' },
      { pt: 'O pastel de nata',en: 'Custard tart',phonetic: 'oo pash-TEL djeh NAH-tah',example: 'Um pastel de nata, por favor!' },
      { pt: 'A fruta',         en: 'Fruit',       phonetic: 'ah FROO-tah',           example: 'Gosto de fruta fresca.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "A água" mean?', audio: 'A água', correct: 'Water', options: ['Bread', 'Coffee', 'Water', 'Fruit'] },
      { type: 'tapPairs', instruction: 'Match the food & drinks', pairs: [{ pt: 'A água', en: 'Water' }, { pt: 'O pão', en: 'Bread' }, { pt: 'O café', en: 'Coffee' }, { pt: 'A fruta', en: 'Fruit' }] },
      { type: 'fillBlank', instruction: 'Order a coffee', sentence: 'Um ___, por favor.', correct: 'café', options: ['café', 'pão', 'água', 'fruta'], translation: 'A coffee, please.' },
      { type: 'reverseChoice', prompt: 'How do you say "Custard tart"?', correct: 'O pastel de nata', options: ['O pão', 'A água', 'O pastel de nata', 'A fruta'] },
      { type: 'arrangeWords', instruction: 'Order water politely', words: ['favor.', 'Um', 'de', 'copo', 'por', 'água,'], correct: 'Um copo de água, por favor.' },
      { type: 'multipleChoice', prompt: 'What does "O pão" mean?', audio: 'O pão', correct: 'Bread', options: ['Coffee', 'Water', 'Bread', 'Fruit'] },
      { type: 'reverseChoice', prompt: 'How do you say "Fruit" in Portuguese?', correct: 'A fruta', options: ['O pão', 'A água', 'O café', 'A fruta'] },
      { type: 'fillBlank', instruction: 'Describe the bread', sentence: 'O ___ está quente.', correct: 'pão', options: ['pão', 'café', 'água', 'fruta'], translation: 'The bread is warm.' },
      { type: 'tapPairs', instruction: 'Round 2 — food and drink!', pairs: [{ pt: 'A água', en: 'Water' }, { pt: 'O pão', en: 'Bread' }, { pt: 'O pastel de nata', en: 'Custard tart' }, { pt: 'A fruta', en: 'Fruit' }] },
      { type: 'typeAnswer', prompt: 'Type "Water" in Portuguese', hint: 'ah AH-gwah', correct: 'A água', alternates: ['a água', 'água'] },
    ],
  },
  {
    id: 7, emoji: '📅', number: 'Lesson 07', title: 'Days of the Week',
    theme: 'Every day is a new opportunity to practise Portuguese!',
    words: [
      { pt: 'Segunda-feira', en: 'Monday',    phonetic: 'seh-GON-dah FAY-rah', example: 'Na segunda-feira vou ao mercado.' },
      { pt: 'Quarta-feira',  en: 'Wednesday', phonetic: 'KWAR-tah FAY-rah',   example: 'Quarta-feira é dia de estudo.' },
      { pt: 'Sexta-feira',   en: 'Friday',    phonetic: 'SESH-tah FAY-rah',   example: 'Sexta-feira é ótimo!' },
      { pt: 'Sábado',        en: 'Saturday',  phonetic: 'SAH-bah-doo',        example: 'Sábado vou à praia.' },
      { pt: 'Domingo',       en: 'Sunday',    phonetic: 'doh-MEEN-goo',       example: 'Domingo fico em casa.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What day is "Domingo"?', audio: 'Domingo', correct: 'Sunday', options: ['Monday', 'Friday', 'Saturday', 'Sunday'] },
      { type: 'tapPairs', instruction: 'Match the days', pairs: [{ pt: 'Segunda-feira', en: 'Monday' }, { pt: 'Quarta-feira', en: 'Wednesday' }, { pt: 'Sábado', en: 'Saturday' }, { pt: 'Domingo', en: 'Sunday' }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: '___ vou à praia.', correct: 'Sábado', options: ['Sábado', 'Domingo', 'Segunda-feira', 'Quarta-feira'], translation: 'On Saturday I go to the beach.' },
      { type: 'reverseChoice', prompt: 'How do you say "Friday"?', correct: 'Sexta-feira', options: ['Segunda-feira', 'Quarta-feira', 'Sábado', 'Sexta-feira'] },
      { type: 'typeAnswer', prompt: 'Type "Wednesday" in Portuguese', hint: 'KWAR-tah FAY-rah', correct: 'Quarta-feira', alternates: ['quarta-feira', 'Quarta feira', 'quarta feira'] },
      { type: 'multipleChoice', prompt: 'What day is "Sábado"?', audio: 'Sábado', correct: 'Saturday', options: ['Monday', 'Wednesday', 'Friday', 'Saturday'] },
      { type: 'reverseChoice', prompt: 'How do you say "Monday" in Portuguese?', correct: 'Segunda-feira', options: ['Quarta-feira', 'Sexta-feira', 'Sábado', 'Segunda-feira'] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: '___ fico em casa.', correct: 'Domingo', options: ['Domingo', 'Sábado', 'Segunda-feira', 'Sexta-feira'], translation: 'On Sunday I stay at home.' },
      { type: 'tapPairs', instruction: 'Round 2 — days of the week!', pairs: [{ pt: 'Segunda-feira', en: 'Monday' }, { pt: 'Sexta-feira', en: 'Friday' }, { pt: 'Sábado', en: 'Saturday' }, { pt: 'Domingo', en: 'Sunday' }] },
      { type: 'arrangeWords', instruction: "Say 'Friday is great!'", words: ['é', 'Sexta-feira', 'ótimo!'], correct: 'Sexta-feira é ótimo!' },
    ],
  },
  {
    id: 8, emoji: '👨‍👩‍👧', number: 'Lesson 08', title: 'My Family',
    theme: 'Family is at the heart of Portuguese culture!',
    words: [
      { pt: 'A mãe',   en: 'Mother',      phonetic: 'ah mowng',     example: 'A minha mãe chama-se Ana.' },
      { pt: 'O pai',   en: 'Father',      phonetic: 'oo pie',       example: 'O meu pai é simpático.' },
      { pt: 'A irmã',  en: 'Sister',      phonetic: 'ah eer-MAH',   example: 'A minha irmã tem oito anos.' },
      { pt: 'O irmão', en: 'Brother',     phonetic: 'oo eer-MOWNG', example: 'O meu irmão chama-se João.' },
      { pt: 'O avô',   en: 'Grandfather', phonetic: 'oo ah-VOH',    example: 'O meu avô vive em Lisboa.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "A mãe" mean?', audio: 'A mãe', correct: 'Mother', options: ['Father', 'Sister', 'Grandmother', 'Mother'] },
      { type: 'tapPairs', instruction: 'Match the family members', pairs: [{ pt: 'A mãe', en: 'Mother' }, { pt: 'O pai', en: 'Father' }, { pt: 'A irmã', en: 'Sister' }, { pt: 'O irmão', en: 'Brother' }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'O meu ___ é simpático.', correct: 'pai', options: ['pai', 'mãe', 'irmão', 'avô'], translation: 'My father is kind.' },
      { type: 'reverseChoice', prompt: 'How do you say "Grandfather"?', correct: 'O avô', options: ['O pai', 'O irmão', 'O avô', 'A mãe'] },
      { type: 'typeAnswer', prompt: 'Type "Sister" in Portuguese', hint: 'ah eer-MAH', correct: 'A irmã', alternates: ['a irmã', 'irmã'] },
      { type: 'multipleChoice', prompt: 'What does "O pai" mean?', audio: 'O pai', correct: 'Father', options: ['Mother', 'Brother', 'Grandfather', 'Father'] },
      { type: 'reverseChoice', prompt: 'How do you say "Brother" in Portuguese?', correct: 'O irmão', options: ['A mãe', 'O pai', 'A irmã', 'O irmão'] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'A minha ___ tem oito anos.', correct: 'irmã', options: ['irmã', 'mãe', 'avô', 'irmão'], translation: 'My sister is eight years old.' },
      { type: 'tapPairs', instruction: 'Round 2 — family members!', pairs: [{ pt: 'O avô', en: 'Grandfather' }, { pt: 'A mãe', en: 'Mother' }, { pt: 'A irmã', en: 'Sister' }, { pt: 'O irmão', en: 'Brother' }] },
      { type: 'arrangeWords', instruction: "Say 'My grandfather lives in Lisbon'", words: ['vive', 'meu', 'O', 'em', 'avô', 'Lisboa.'], correct: 'O meu avô vive em Lisboa.' },
    ],
  },
  {
    id: 9, emoji: '💬', number: 'Lesson 09', title: 'Simple Phrases',
    theme: 'You know so many words — now let\'s build real sentences!',
    words: [
      { pt: 'Eu chamo-me…', en: 'My name is…',          phonetic: 'EH-oo SHAH-moo-meh', example: 'Eu chamo-me Chi.' },
      { pt: 'Eu sou de…',   en: 'I am from…',           phonetic: 'EH-oo soh djeh',     example: 'Eu sou de Portugal.' },
      { pt: 'Eu gosto de…', en: 'I like…',               phonetic: 'EH-oo GOSH-too djeh',example: 'Eu gosto de café.' },
      { pt: 'Não percebo',  en: "I don't understand",    phonetic: 'nowng per-SEH-boo',  example: 'Desculpe, não percebo.' },
      { pt: 'Fala inglês?', en: 'Do you speak English?', phonetic: 'FAH-lah een-GLESH',  example: 'Com licença — fala inglês?' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "Eu gosto de" mean?', audio: 'Eu gosto de café', correct: 'I like…', options: ['I am from…', 'My name is…', "I don't understand", 'I like…'] },
      { type: 'tapPairs', instruction: 'Match the phrases', pairs: [{ pt: 'Eu chamo-me…', en: 'My name is…' }, { pt: 'Eu sou de…', en: 'I am from…' }, { pt: 'Não percebo', en: "I don't understand" }, { pt: 'Fala inglês?', en: 'Do you speak English?' }] },
      { type: 'fillBlank', instruction: 'Introduce yourself', sentence: 'Eu ___-me Chi.', correct: 'chamo', options: ['chamo', 'gosto', 'percebo', 'sou'], translation: 'My name is Chi.' },
      { type: 'reverseChoice', prompt: "How do you say \"I don't understand\"?", correct: 'Não percebo', options: ['Eu sou de…', 'Não percebo', 'Eu chamo-me…', 'Fala inglês?'] },
      { type: 'arrangeWords', instruction: "Say 'I like coffee'", words: ['de', 'Eu', 'café.', 'gosto'], correct: 'Eu gosto de café.' },
      { type: 'multipleChoice', prompt: 'What does "Eu sou de" mean?', audio: 'Eu sou de Portugal', correct: 'I am from…', options: ['My name is…', 'I like…', "I don't understand", 'I am from…'] },
      { type: 'reverseChoice', prompt: 'How do you say "Do you speak English?"', correct: 'Fala inglês?', options: ['Não percebo', 'Eu chamo-me…', 'Fala inglês?', 'Eu gosto de…'] },
      { type: 'fillBlank', instruction: 'Say where you are from', sentence: 'Eu ___ de Portugal.', correct: 'sou', options: ['sou', 'gosto', 'chamo', 'percebo'], translation: 'I am from Portugal.' },
      { type: 'tapPairs', instruction: 'Round 2 — match the phrases!', pairs: [{ pt: 'Eu chamo-me…', en: 'My name is…' }, { pt: 'Eu gosto de…', en: 'I like…' }, { pt: 'Não percebo', en: "I don't understand" }, { pt: 'Fala inglês?', en: 'Do you speak English?' }] },
      { type: 'typeAnswer', prompt: "Type \"I don't understand\" in Portuguese", hint: 'nowng per-SEH-boo', correct: 'Não percebo', alternates: ['não percebo', 'Nao percebo', 'nao percebo'] },
    ],
  },
  {
    id: 10, emoji: '🏙', number: 'Lesson 10', title: 'Places in the City',
    theme: 'Let\'s explore Lisboa and beyond — every corner has a name!',
    words: [
      { pt: 'A escola',     en: 'School',   phonetic: 'ah esh-KOH-lah',      example: 'Vou à escola de manhã.' },
      { pt: 'O mercado',    en: 'Market',   phonetic: 'oo mer-KAH-doo',      example: 'O mercado de Lisboa é bonito.' },
      { pt: 'A farmácia',   en: 'Pharmacy', phonetic: 'ah far-MAH-syah',     example: 'Preciso ir à farmácia.' },
      { pt: 'A praia',      en: 'Beach',    phonetic: 'ah PRAI-ah',          example: 'A praia de Cascais é linda.' },
      { pt: 'O aeroporto',  en: 'Airport',  phonetic: 'oo ah-eh-roh-POR-too',example: 'O aeroporto fica longe.' },
    ],
    exercises: [
      { type: 'multipleChoice', prompt: 'What does "A praia" mean?', audio: 'A praia', correct: 'Beach', options: ['School', 'Market', 'Pharmacy', 'Beach'] },
      { type: 'tapPairs', instruction: 'Match the places', pairs: [{ pt: 'A escola', en: 'School' }, { pt: 'O mercado', en: 'Market' }, { pt: 'A farmácia', en: 'Pharmacy' }, { pt: 'A praia', en: 'Beach' }] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'Preciso ir à ___.', correct: 'farmácia', options: ['farmácia', 'escola', 'praia', 'mercado'], translation: 'I need to go to the pharmacy.' },
      { type: 'reverseChoice', prompt: 'How do you say "Airport"?', correct: 'O aeroporto', options: ['A escola', 'O mercado', 'A praia', 'O aeroporto'] },
      { type: 'typeAnswer', prompt: 'Type "School" in Portuguese', hint: 'ah esh-KOH-lah', correct: 'A escola', alternates: ['a escola', 'escola'] },
      { type: 'multipleChoice', prompt: 'What does "O mercado" mean?', audio: 'O mercado', correct: 'Market', options: ['School', 'Pharmacy', 'Market', 'Airport'] },
      { type: 'reverseChoice', prompt: 'How do you say "Beach" in Portuguese?', correct: 'A praia', options: ['A escola', 'O mercado', 'A farmácia', 'A praia'] },
      { type: 'fillBlank', instruction: 'Complete the sentence', sentence: 'Vou à ___ de manhã.', correct: 'escola', options: ['escola', 'praia', 'farmácia', 'aeroporto'], translation: 'I go to school in the morning.' },
      { type: 'tapPairs', instruction: 'Round 2 — city places!', pairs: [{ pt: 'A escola', en: 'School' }, { pt: 'O aeroporto', en: 'Airport' }, { pt: 'A farmácia', en: 'Pharmacy' }, { pt: 'A praia', en: 'Beach' }] },
      { type: 'arrangeWords', instruction: "Say 'The airport is far'", words: ['longe.', 'aeroporto', 'fica', 'O'], correct: 'O aeroporto fica longe.' },
    ],
  },
];

export const ACHIEVEMENTS = [
  { id: 'first_step',     emoji: '🌱', name: 'First Steps',     desc: 'Complete your first lesson' },
  { id: 'word_collector', emoji: '📚', name: 'Word Collector',  desc: 'Learn 20 words' },
  { id: 'halfway',        emoji: '⛰',  name: 'Halfway There',  desc: 'Complete 5 lessons' },
  { id: 'flawless',       emoji: '✨', name: 'Flawless',        desc: 'Finish a lesson with no mistakes' },
  { id: 'streak_3',       emoji: '🔥', name: 'On Fire',         desc: 'Reach a 3-day streak' },
  { id: 'streak_7',       emoji: '🌟', name: 'Devoted',         desc: 'Reach a 7-day streak' },
  { id: 'graduate',       emoji: '🎓', name: 'Graduado',        desc: 'Complete all 10 lessons' },
  { id: 'speed',          emoji: '⚡', name: 'Quick Learner',   desc: 'Earn 200+ XP' },
  { id: 'night_owl',      emoji: '🦉', name: 'Night Owl',       desc: 'Practice after 9 PM' },
  { id: 'full_hearts',    emoji: '❤️', name: 'Iron Heart',      desc: 'Keep all hearts in a lesson' },
];
