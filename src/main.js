import './style.css';
import { generateMatrix, prepareText, encrypt, decrypt, getDetailedTransformations } from './playfair.js';

// --- Seleksi Elemen DOM ---
const brandSubtitle = document.querySelector('#brand-subtitle');
const langIdBtn = document.querySelector('#lang-id');
const langEnBtn = document.querySelector('#lang-en');
const navAboutText = document.querySelector('#nav-about-text');

const lblInputText = document.querySelector('#lbl-input-text');
const lblInputDesc = document.querySelector('#lbl-input-desc');
const textInput = document.querySelector('#text-input');
const keyInput = document.querySelector('#key-input');
const btnClear = document.querySelector('#btn-clear');
const dropZone = document.querySelector('#drop-zone');
const fileInput = document.querySelector('#file-input');
const btnBrowseFile = document.querySelector('#btn-browse-file');
const sourceIndicator = document.querySelector('#source-indicator');
const charCount = document.querySelector('#char-count');
const lblUploadTitle = document.querySelector('#lbl-upload-title');
const lblUploadDesc = document.querySelector('#lbl-upload-desc');

const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDecrypt = document.querySelector('#btn-decrypt');
const lblBtnEncrypt = document.querySelector('#lbl-btn-encrypt');
const lblBtnDecrypt = document.querySelector('#lbl-btn-decrypt');

const btnTryExample = document.querySelector('#btn-try-example');
const btnReset = document.querySelector('#btn-reset');
const lblTryExample = document.querySelector('#lbl-try-example');
const lblReset = document.querySelector('#lbl-reset');

const lblKeyTitle = document.querySelector('#lbl-key-title');
const lblKeyHelp = document.querySelector('#lbl-key-help');

const lblMatrixTitle = document.querySelector('#lbl-matrix-title');
const lblMatrixSub = document.querySelector('#lbl-matrix-sub');
const btnToggleCustom = document.querySelector('#btn-toggle-custom');
const customMatrixLabel = document.querySelector('#custom-matrix-label');
const matrixEmptyState = document.querySelector('#matrix-empty-state');
const lblMatrixEmpty = document.querySelector('#lbl-matrix-empty');
const matrixGridContainer = document.querySelector('#matrix-grid-container');
const matrixGrid = document.querySelector('#matrix-grid');
const matrixFooterNote = document.querySelector('#matrix-footer-note');

const resultSection = document.querySelector('#result-section');
const lblResultTitle = document.querySelector('#lbl-result-title');
const lblResultSub = document.querySelector('#lbl-result-sub');
const resultBadge = document.querySelector('#result-badge');
const lblMetaFile = document.querySelector('#lbl-meta-file');
const lblMetaOp = document.querySelector('#lbl-meta-op');
const lblMetaChar = document.querySelector('#lbl-meta-char');
const metaFile = document.querySelector('#meta-file');
const metaOperation = document.querySelector('#meta-operation');
const metaChars = document.querySelector('#meta-chars');
const resultText = document.querySelector('#result-text');
const btnCopyResult = document.querySelector('#btn-copy-result');
const copyBtnText = document.querySelector('#copy-btn-text');
const btnDownloadResult = document.querySelector('#btn-download-result');
const lblBtnDownload = document.querySelector('#lbl-btn-download');
const btnShareResult = document.querySelector('#btn-share-result');
const lblBtnShare = document.querySelector('#lbl-btn-share');
const btnUseAsInput = document.querySelector('#btn-use-as-input');
const lblBtnUseInput = document.querySelector('#lbl-btn-use-input');

const learnSection = document.querySelector('#learn-section');
const lblLearnTag = document.querySelector('#lbl-learn-tag');
const lblLearnTitle = document.querySelector('#lbl-learn-title');
const lblLearnSub = document.querySelector('#lbl-learn-sub');
const stepPairLabel = document.querySelector('#step-pair-label');
const chipInPair = document.querySelector('#chip-in-pair');
const chipOutPair = document.querySelector('#chip-out-pair');
const btnPrevStep = document.querySelector('#btn-prev-step');
const btnPlayStep = document.querySelector('#btn-play-step');
const playIcon = document.querySelector('#play-icon');
const playLabel = document.querySelector('#play-label');
const btnNextStep = document.querySelector('#btn-next-step');

const matrixCanvasWrapper = document.querySelector('#matrix-canvas-wrapper');
const learnMatrixGrid = document.querySelector('#learn-matrix-grid');
const arrowCanvas = document.querySelector('#arrow-canvas');
const arrowLayer = document.querySelector('#arrow-layer');
const guideLayer = document.querySelector('#guide-layer');
const ruleBadge = document.querySelector('#rule-badge');
const ruleInPair = document.querySelector('#rule-in-pair');
const ruleOutPair = document.querySelector('#rule-out-pair');
const ruleExplanationDesc = document.querySelector('#rule-explanation-desc');
const ruleDetailedNote = document.querySelector('#rule-detailed-note');
const btnToggleAllPairs = document.querySelector('#btn-toggle-all-pairs');
const accordionLabel = document.querySelector('#accordion-label');
const allPairsContainer = document.querySelector('#all-pairs-container');
const lblLearnBottom = document.querySelector('#lbl-learn-bottom');

const lblLegendIn = document.querySelector('#lbl-legend-in');
const lblLegendOut = document.querySelector('#lbl-legend-out');
const lblLegendBoth = document.querySelector('#lbl-legend-both');

// Modal Theory / Materi Elements
const aboutModal = document.querySelector('#about-modal');
const btnAbout = document.querySelector('#btn-about');
const btnCloseModal = document.querySelector('#btn-close-modal');
const btnModalGotit = document.querySelector('#btn-modal-gotit');
const aboutModalTitle = document.querySelector('#about-modal-title');
const aboutModalSub = document.querySelector('#about-modal-sub');
const toastEl = document.querySelector('#toast');

// Modal Tab Labels (for bilingual switching)
const tabLblTheory = document.querySelector('#tab-lbl-theory');
const tabLblMatrix = document.querySelector('#tab-lbl-matrix');
const tabLblPrep = document.querySelector('#tab-lbl-prep');
const tabLblRules = document.querySelector('#tab-lbl-rules');

// Theory Body Content Elements
const aboutHHistory = document.querySelector('#about-h-history');
const aboutPHistory1 = document.querySelector('#about-p-history1');
const aboutPHistory2 = document.querySelector('#about-p-history2');
const aboutHAdvantage = document.querySelector('#about-h-advantage');
const aboutPAdvantage = document.querySelector('#about-p-advantage');
const aboutHMatrix = document.querySelector('#about-h-matrix');
const aboutPMatrix1 = document.querySelector('#about-p-matrix1');
const aboutStep1T = document.querySelector('#about-step1-t');
const aboutStep1D = document.querySelector('#about-step1-d');
const aboutStep2T = document.querySelector('#about-step2-t');
const aboutStep2D = document.querySelector('#about-step2-d');
const aboutMatExT = document.querySelector('#about-mat-ex-t');
const aboutHPrep = document.querySelector('#about-h-prep');
const aboutPPrep1 = document.querySelector('#about-p-prep1');
const aboutPrepR1T = document.querySelector('#about-prep-r1-t');
const aboutPrepR1D = document.querySelector('#about-prep-r1-d');
const aboutPrepR2T = document.querySelector('#about-prep-r2-t');
const aboutPrepR2D = document.querySelector('#about-prep-r2-d');
const aboutPrepR3T = document.querySelector('#about-prep-r3-t');
const aboutPrepR3D = document.querySelector('#about-prep-r3-d');
const aboutPrepR4T = document.querySelector('#about-prep-r4-t');
const aboutPrepR4D = document.querySelector('#about-prep-r4-d');
const aboutHRules = document.querySelector('#about-h-rules');
const aboutR1Title = document.querySelector('#about-r1-title');
const aboutR1Desc = document.querySelector('#about-r1-desc');
const aboutR1Enc = document.querySelector('#about-r1-enc');
const aboutR1EncD = document.querySelector('#about-r1-enc-d');
const aboutR1Dec = document.querySelector('#about-r1-dec');
const aboutR1DecD = document.querySelector('#about-r1-dec-d');
const aboutR2Title = document.querySelector('#about-r2-title');
const aboutR2Desc = document.querySelector('#about-r2-desc');
const aboutR2Enc = document.querySelector('#about-r2-enc');
const aboutR2EncD = document.querySelector('#about-r2-enc-d');
const aboutR2Dec = document.querySelector('#about-r2-dec');
const aboutR2DecD = document.querySelector('#about-r2-dec-d');
const aboutR3Title = document.querySelector('#about-r3-title');
const aboutR3Desc = document.querySelector('#about-r3-desc');
const aboutR3Both = document.querySelector('#about-r3-both');
const aboutR3BothD = document.querySelector('#about-r3-both-d');

// --- Global State ---
let currentLang = localStorage.getItem('playfair_lang') || 'id';
let currentMatrix = null;
let isCustomMatrix = false;
let swapSourceCell = null; // { row, col, char, element }
let uploadedFileName = null; // null jika dari teks manual
let transformSteps = [];
let currentStepIndex = 0;
let isPlaying = false;
let playTimer = null;
let lastOperation = 'Encryption';

// Kamus Bahasa (Bilingual Dictionary)
const I18N = {
  id: {
    brandSubtitle: 'Text Encryption & Decryption',
    navTheory: 'Materi',
    inputText: 'Input Teks',
    inputDesc: 'Ketik teks secara manual atau muat berkas teks (.txt).',
    clear: 'Clear',
    placeholderInput: 'Ketik teks yang ingin dienkripsi atau didekripsi di sini...',
    manualInput: 'Teks Manual',
    charCount: 'karakter',
    uploadTitle: 'Unggah berkas .txt',
    uploadDesc: 'Seret & lepas berkas teks di sini atau telusuri',
    chooseFile: 'Pilih Berkas',
    encrypt: 'Encrypt',
    decrypt: 'Decrypt',
    tryExample: 'Try example',
    reset: 'Reset',
    keyTitle: 'Kata Kunci (Key)',
    keyPlaceholder: 'Masukkan kata kunci atau frasa kunci...',
    keyHelp: 'Digunakan untuk membangkitkan matriks Playfair 5×5.',
    matrixTitle: 'Matriks Playfair',
    matrixSub: 'Huruf I & J digabung',
    customGrid: 'Kustom Grid',
    cancelCustom: 'Batal Kustom',
    matrixEmpty: 'Masukkan kata kunci untuk membangkitkan matriks.',
    matrixFooterAuto: 'Matriks dibangkitkan otomatis dari kata kunci yang diberikan.',
    matrixFooterCustom: '💡 Mode Tukar Aktif: Klik sel 1 lalu klik sel 2 untuk menukar huruf (bisa juga seret / drag & drop). Huruf kunci terkunci.',
    resultTitle: 'Hasil',
    resultSub: 'Teks hasil transformasi akan muncul di sini.',
    metaFile: 'Berkas',
    metaOp: 'Operasi',
    metaChar: 'Karakter',
    copy: 'Salin',
    copied: 'Tersalin!',
    download: 'Unduh .txt',
    share: 'Bagikan',
    useAsInput: 'Gunakan sebagai Input',
    learnTag: 'LEARN BY DOING',
    learnTitle: 'Transformasi',
    learnSub: 'Ikuti alur transformasi satu per satu pasangan huruf pada matriks kunci.',
    pairCount: 'PASANGAN',
    pairOf: 'DARI',
    prev: '← Sebelumnya',
    next: 'Selanjutnya →',
    autoPlay: 'Putar Otomatis',
    pause: 'Jeda',
    legendIn: 'Input',
    legendOut: 'Output',
    legendBoth: 'Keduanya',
    viewAllPairs: 'Lihat semua transformasi',
    learnBottom: 'Garis panah melengkung di luar sel (atas/bawah untuk baris/persegi, samping untuk kolom).',
    aboutTitle: 'Playfair Cipher - Materi & Panduan Teori',
    aboutSub: 'Konsep, Struktur Matriks 5×5, dan Aturan Kriptografi Klasik',
    gotIt: 'Mengerti / Tutup',
    // Modal Tab Labels
    tabTheory: 'Teori & Sejarah',
    tabMatrix: 'Matriks 5×5',
    tabPrep: 'Pra-Pemrosesan',
    tabRules: 'Aturan Transformasi',
    // Theory Body Content
    thHHistory: 'Sejarah dan Konsep Dasar',
    thPHistory1: '<strong>Playfair Cipher</strong> adalah teknik enkripsi simetris manual pertama yang menggunakan metode <em>substitusi digrafik</em> (memproses pasangan dua huruf sekaligus), bukan substitusi huruf tunggal seperti sandi Caesar atau sandi substitusi monoalfabetik lainnya.',
    thPHistory2: 'Diciptakan oleh <strong>Sir Charles Wheatstone</strong> pada tahun 1854, sandi ini dinamai menurut temannya, <strong>Lord Playfair</strong>, yang giat mempromosikan penggunaannya untuk kepentingan militer dan diplomasi Kerajaan Inggris (digunakan pada Perang Boer Kedua dan Perang Dunia I).',
    thHAdvantage: 'Keunggulan Kriptografi',
    thPAdvantage: 'Dengan mengenkripsi 2 huruf sekaligus (digraf), terdapat <strong>25 × 25 = 625 kemungkinan pasangan huruf</strong>. Hal ini meratakan kurva frekuensi kemunculan huruf sehingga analisis frekuensi huruf tunggal menjadi jauh lebih sulit dilakukan oleh pihak ketiga.',
    thHMatrix: 'Penyusunan Matriks 5×5',
    thPMatrix1: 'Playfair Cipher menggunakan kisi berukuran <strong>5 baris × 5 kolom</strong> yang menampung 25 huruf alfabet (alfabet Latin berjumlah 26 huruf, sehingga huruf <strong>\'I\' dan \'J\' digabungkan</strong> ke dalam satu sel yang sama).',
    thStep1T: 'Masukkan Kata Kunci:',
    thStep1D: 'Hilangkan spasi dan huruf ganda dari kata kunci. Masukkan huruf-huruf unik tersebut ke dalam matriks dari kiri ke kanan, mulai dari baris pertama.',
    thStep2T: 'Lengkapi Sisa Alfabet:',
    thStep2D: 'Isi sel-sel yang masih kosong dengan sisa huruf alfabet yang belum digunakan (A sampai Z, tanpa huruf J) secara berurutan.',
    thMatExT: 'Contoh Matriks dengan Kunci "MONARCHY":',
    thHPrep: 'Aturan Pra-Pemrosesan Teks (Plaintext Preparation)',
    thPPrep1: 'Sebelum teks dienkripsi, teks harus disiapkan mengikuti 4 aturan baku:',
    thPrepR1T: 'Normalisasi Teks:',
    thPrepR1D: 'Ubah semua huruf ke huruf kapital. Hapus semua spasi, angka, dan tanda baca. Ganti semua huruf \'J\' menjadi \'I\'.',
    thPrepR2T: 'Pembentukan Digraf (Pasangan 2 Huruf):',
    thPrepR2D: 'Bagi teks menjadi pasangan dua huruf (misal: "SECURITY" → "SE", "CU", "RI", "TY").',
    thPrepR3T: 'Penanganan Huruf Kembar dalam Pasangan:',
    thPrepR3D: 'Jika ada dua huruf yang sama dalam satu digraf yang sama (misal "LL" pada "BALLOON"), sisipkan huruf pengisi \'X\' di antara keduanya. Contoh: "BA", "LX", "LO", "ON". Jika huruf kembarnya adalah \'X\', gunakan pemisah \'Q\'.',
    thPrepR4T: 'Panjang Teks Harus Genap:',
    thPrepR4D: 'Jika setelah digabungkan panjang teks ganjil, tambahkan huruf pengisi \'X\' di akhir teks (atau \'Q\' jika karakter terakhir adalah \'X\').',
    thHRules: '3 Aturan Inti Transformasi Digraf',
    thR1Title: 'Aturan Baris Sama (Same Row Rule)',
    thR1Desc: 'Jika kedua huruf berada di <strong>baris yang sama</strong>:',
    thR1Enc: 'Enkripsi:',
    thR1EncD: 'Gantikan masing-masing huruf dengan huruf di sebelah kanannya (geser 1 kolom ke kanan). Jika sudah di kolom paling kanan (kolom ke-5), berputar (wrap-around) ke kolom paling kiri (kolom ke-1).',
    thR1Dec: 'Dekripsi:',
    thR1DecD: 'Gantikan masing-masing huruf dengan huruf di sebelah kirinya (geser 1 kolom ke kiri). Wrap-around ke kolom paling kanan jika di kolom ke-1.',
    thR2Title: 'Aturan Kolom Sama (Same Column Rule)',
    thR2Desc: 'Jika kedua huruf berada di <strong>kolom yang sama</strong>:',
    thR2Enc: 'Enkripsi:',
    thR2EncD: 'Gantikan masing-masing huruf dengan huruf tepat di bawahnya (geser 1 baris ke bawah). Jika di baris paling bawah, berputar ke baris paling atas.',
    thR2Dec: 'Dekripsi:',
    thR2DecD: 'Gantikan masing-masing huruf dengan huruf tepat di atasnya (geser 1 baris ke atas). Berputar ke baris paling bawah jika di baris paling atas.',
    thR3Title: 'Aturan Sudut Persegi (Rectangle Rule)',
    thR3Desc: 'Jika kedua huruf berada di <strong>baris dan kolom yang berbeda</strong>, keduanya membentuk sudut persegi panjang imajiner pada matriks:',
    thR3Both: 'Enkripsi & Dekripsi:',
    thR3BothD: 'Huruf pertama digantikan oleh huruf yang sebaris dengannya tetapi berada pada kolom huruf kedua. Huruf kedua digantikan oleh huruf yang sebaris dengannya pada kolom huruf pertama.'
  },
  en: {
    brandSubtitle: 'Text Encryption & Decryption',
    navTheory: 'Theory',
    inputText: 'Input Text',
    inputDesc: 'Type text manually or load a plain text file.',
    clear: 'Clear',
    placeholderInput: 'Put your text to encrypt/decrypt here...',
    manualInput: 'Manual input',
    charCount: 'characters',
    uploadTitle: 'Upload .txt file',
    uploadDesc: 'Drag & drop your file here or browse',
    chooseFile: 'Choose File',
    encrypt: 'Encrypt',
    decrypt: 'Decrypt',
    tryExample: 'Try example',
    reset: 'Reset',
    keyTitle: 'Key',
    keyPlaceholder: 'Enter your keyword or key phrase...',
    keyHelp: 'Used to generate the 5×5 Playfair matrix.',
    matrixTitle: 'Playfair Matrix',
    matrixSub: 'I / J are combined',
    customGrid: 'Custom Grid',
    cancelCustom: 'Cancel Custom',
    matrixEmpty: 'Enter a key to generate your matrix.',
    matrixFooterAuto: 'The matrix is generated automatically from the provided key.',
    matrixFooterCustom: '💡 Swap Mode Active: Click cell 1 then cell 2 to swap letters (or drag & drop). Key letters are locked.',
    resultTitle: 'Result',
    resultSub: 'Your transformed text will appear here.',
    metaFile: 'File',
    metaOp: 'Operation',
    metaChar: 'Characters',
    copy: 'Copy',
    copied: 'Copied!',
    download: 'Download .txt',
    share: 'Share',
    useAsInput: 'Use as Input',
    learnTag: 'LEARN BY DOING',
    learnTitle: 'Transformation',
    learnSub: 'Follow one character pair at a time through the key matrix.',
    pairCount: 'PAIR',
    pairOf: 'OF',
    prev: '← Previous',
    next: 'Next →',
    autoPlay: 'Auto Play',
    pause: 'Pause',
    legendIn: 'Input',
    legendOut: 'Output',
    legendBoth: 'Both',
    viewAllPairs: 'View all transformations',
    learnBottom: 'Arrows arch outside the cells (top/bottom for rows/rectangles, sides for columns).',
    aboutTitle: 'Playfair Cipher - Complete Theory & Guide',
    aboutSub: 'Concept, 5×5 Matrix Architecture, and Classical Cryptographic Rules',
    gotIt: 'Got it / Close',
    // Modal Tab Labels
    tabTheory: 'Theory & History',
    tabMatrix: '5×5 Matrix',
    tabPrep: 'Pre-Processing',
    tabRules: 'Transformation Rules',
    // Theory Body Content
    thHHistory: 'History and Fundamentals',
    thPHistory1: '<strong>Playfair Cipher</strong> is the first manual symmetric encryption technique that uses <em>digraphic substitution</em> (processing pairs of two letters at a time), rather than single-letter substitution like Caesar cipher or other monoalphabetic ciphers.',
    thPHistory2: 'Invented by <strong>Sir Charles Wheatstone</strong> in 1854, the cipher was named after his friend <strong>Lord Playfair</strong>, who actively promoted its use for British military and diplomatic purposes (used in the Second Boer War and World War I).',
    thHAdvantage: 'Cryptographic Advantages',
    thPAdvantage: 'By encrypting 2 letters at a time (digraphs), there are <strong>25 × 25 = 625 possible letter pairs</strong>. This flattens the frequency distribution curve, making single-letter frequency analysis significantly more difficult for adversaries.',
    thHMatrix: 'Building the 5×5 Matrix',
    thPMatrix1: 'The Playfair Cipher uses a grid of <strong>5 rows × 5 columns</strong> accommodating 25 letters of the alphabet (the Latin alphabet has 26 letters, so <strong>\'I\' and \'J\' are combined</strong> into the same cell).',
    thStep1T: 'Enter the Keyword:',
    thStep1D: 'Remove spaces and duplicate letters from the keyword. Fill the unique letters into the matrix left to right, starting from the first row.',
    thStep2T: 'Complete with Remaining Alphabet:',
    thStep2D: 'Fill the remaining empty cells with the unused letters of the alphabet (A to Z, excluding J) in order.',
    thMatExT: 'Example Matrix with Key "MONARCHY":',
    thHPrep: 'Text Pre-Processing Rules (Plaintext Preparation)',
    thPPrep1: 'Before encryption, the text must be prepared following 4 standard rules:',
    thPrepR1T: 'Text Normalization:',
    thPrepR1D: 'Convert all letters to uppercase. Remove all spaces, numbers, and punctuation. Replace every \'J\' with \'I\'.',
    thPrepR2T: 'Digraph Formation (2-Letter Pairs):',
    thPrepR2D: 'Split the text into pairs of two letters (e.g., "SECURITY" → "SE", "CU", "RI", "TY").',
    thPrepR3T: 'Handling Repeated Letters in a Pair:',
    thPrepR3D: 'If two identical letters appear in the same digraph (e.g., "LL" in "BALLOON"), insert a filler letter \'X\' between them. Example: "BA", "LX", "LO", "ON". If the repeated letter is \'X\', use \'Q\' as the separator.',
    thPrepR4T: 'Text Length Must Be Even:',
    thPrepR4D: 'If the total text length is odd after combining, add a filler letter \'X\' at the end (or \'Q\' if the last character is \'X\').',
    thHRules: '3 Core Digraph Transformation Rules',
    thR1Title: 'Same Row Rule',
    thR1Desc: 'If both letters are in the <strong>same row</strong>:',
    thR1Enc: 'Encryption:',
    thR1EncD: 'Replace each letter with the letter to its right (shift 1 column right). If already at column 5, wrap around to column 1.',
    thR1Dec: 'Decryption:',
    thR1DecD: 'Replace each letter with the letter to its left (shift 1 column left). Wrap around to column 5 if at column 1.',
    thR2Title: 'Same Column Rule',
    thR2Desc: 'If both letters are in the <strong>same column</strong>:',
    thR2Enc: 'Encryption:',
    thR2EncD: 'Replace each letter with the letter directly below it (shift 1 row down). If at the bottom row, wrap around to the top.',
    thR2Dec: 'Decryption:',
    thR2DecD: 'Replace each letter with the letter directly above it (shift 1 row up). Wrap around to the bottom row if at the top.',
    thR3Title: 'Rectangle Rule',
    thR3Desc: 'If the two letters are in <strong>different rows and columns</strong>, they form the corners of an imaginary rectangle on the matrix:',
    thR3Both: 'Encryption & Decryption:',
    thR3BothD: 'The first letter is replaced by the letter on its same row but in the column of the second letter. The second letter is replaced by the letter on its same row in the column of the first letter.'
  }
};

/**
 * Menerapkan bahasa yang aktif ke seluruh teks antarmuka
 */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('playfair_lang', lang);

  langIdBtn.classList.toggle('active', lang === 'id');
  langEnBtn.classList.toggle('active', lang === 'en');

  const t = I18N[lang];
  brandSubtitle.textContent = t.brandSubtitle;
  navAboutText.textContent = t.navTheory;

  lblInputText.textContent = t.inputText;
  lblInputDesc.textContent = t.inputDesc;
  btnClear.textContent = t.clear;
  textInput.placeholder = t.placeholderInput;
  lblUploadTitle.textContent = t.uploadTitle;
  lblUploadDesc.textContent = t.uploadDesc;
  btnBrowseFile.textContent = t.chooseFile;

  lblBtnEncrypt.textContent = t.encrypt;
  lblBtnDecrypt.textContent = t.decrypt;
  lblTryExample.textContent = t.tryExample;
  lblReset.textContent = t.reset;

  lblKeyTitle.textContent = t.keyTitle;
  keyInput.placeholder = t.keyPlaceholder;
  lblKeyHelp.textContent = t.keyHelp;

  lblMatrixTitle.textContent = t.matrixTitle;
  lblMatrixSub.textContent = t.matrixSub;
  customMatrixLabel.textContent = isCustomMatrix ? t.cancelCustom : t.customGrid;
  lblMatrixEmpty.textContent = t.matrixEmpty;

  lblResultTitle.textContent = t.resultTitle;
  lblResultSub.textContent = t.resultSub;
  lblMetaFile.textContent = t.metaFile;
  lblMetaOp.textContent = t.metaOp;
  lblMetaChar.textContent = t.metaChar;
  copyBtnText.textContent = t.copy;
  lblBtnDownload.textContent = t.download;
  lblBtnShare.textContent = t.share;
  lblBtnUseInput.textContent = t.useAsInput;

  lblLearnTag.textContent = t.learnTag;
  lblLearnTitle.textContent = t.learnTitle;
  lblLearnSub.textContent = t.learnSub;
  lblLegendIn.textContent = t.legendIn;
  lblLegendOut.textContent = t.legendOut;
  lblLegendBoth.textContent = t.legendBoth;
  accordionLabel.textContent = t.viewAllPairs;
  lblLearnBottom.textContent = t.learnBottom;

  aboutModalTitle.textContent = t.aboutTitle;
  aboutModalSub.textContent = t.aboutSub;
  btnModalGotit.textContent = t.gotIt;

  // Modal Tab Labels
  if (tabLblTheory) tabLblTheory.textContent = t.tabTheory;
  if (tabLblMatrix) tabLblMatrix.textContent = t.tabMatrix;
  if (tabLblPrep) tabLblPrep.textContent = t.tabPrep;
  if (tabLblRules) tabLblRules.textContent = t.tabRules;

  // Theory Body Content (all tabs)
  if (aboutHHistory) aboutHHistory.textContent = t.thHHistory;
  if (aboutPHistory1) aboutPHistory1.innerHTML = t.thPHistory1;
  if (aboutPHistory2) aboutPHistory2.innerHTML = t.thPHistory2;
  if (aboutHAdvantage) aboutHAdvantage.textContent = t.thHAdvantage;
  if (aboutPAdvantage) aboutPAdvantage.innerHTML = t.thPAdvantage;
  if (aboutHMatrix) aboutHMatrix.textContent = t.thHMatrix;
  if (aboutPMatrix1) aboutPMatrix1.innerHTML = t.thPMatrix1;
  if (aboutStep1T) aboutStep1T.textContent = t.thStep1T;
  if (aboutStep1D) aboutStep1D.textContent = t.thStep1D;
  if (aboutStep2T) aboutStep2T.textContent = t.thStep2T;
  if (aboutStep2D) aboutStep2D.textContent = t.thStep2D;
  if (aboutMatExT) aboutMatExT.textContent = t.thMatExT;
  if (aboutHPrep) aboutHPrep.textContent = t.thHPrep;
  if (aboutPPrep1) aboutPPrep1.textContent = t.thPPrep1;
  if (aboutPrepR1T) aboutPrepR1T.textContent = t.thPrepR1T;
  if (aboutPrepR1D) aboutPrepR1D.textContent = t.thPrepR1D;
  if (aboutPrepR2T) aboutPrepR2T.textContent = t.thPrepR2T;
  if (aboutPrepR2D) aboutPrepR2D.textContent = t.thPrepR2D;
  if (aboutPrepR3T) aboutPrepR3T.textContent = t.thPrepR3T;
  if (aboutPrepR3D) aboutPrepR3D.textContent = t.thPrepR3D;
  if (aboutPrepR4T) aboutPrepR4T.textContent = t.thPrepR4T;
  if (aboutPrepR4D) aboutPrepR4D.textContent = t.thPrepR4D;
  if (aboutHRules) aboutHRules.textContent = t.thHRules;
  if (aboutR1Title) aboutR1Title.textContent = t.thR1Title;
  if (aboutR1Desc) aboutR1Desc.innerHTML = t.thR1Desc;
  if (aboutR1Enc) aboutR1Enc.textContent = t.thR1Enc;
  if (aboutR1EncD) aboutR1EncD.textContent = t.thR1EncD;
  if (aboutR1Dec) aboutR1Dec.textContent = t.thR1Dec;
  if (aboutR1DecD) aboutR1DecD.textContent = t.thR1DecD;
  if (aboutR2Title) aboutR2Title.textContent = t.thR2Title;
  if (aboutR2Desc) aboutR2Desc.innerHTML = t.thR2Desc;
  if (aboutR2Enc) aboutR2Enc.textContent = t.thR2Enc;
  if (aboutR2EncD) aboutR2EncD.textContent = t.thR2EncD;
  if (aboutR2Dec) aboutR2Dec.textContent = t.thR2Dec;
  if (aboutR2DecD) aboutR2DecD.textContent = t.thR2DecD;
  if (aboutR3Title) aboutR3Title.textContent = t.thR3Title;
  if (aboutR3Desc) aboutR3Desc.innerHTML = t.thR3Desc;
  if (aboutR3Both) aboutR3Both.textContent = t.thR3Both;
  if (aboutR3BothD) aboutR3BothD.textContent = t.thR3BothD;

  btnPrevStep.textContent = t.prev;
  btnNextStep.textContent = t.next;
  playLabel.textContent = isPlaying ? t.pause : t.autoPlay;

  updateSourceIndicator();
  updateCharCount();
  renderMatrixView();

  // Jika ada langkah yang sedang aktif di modul Learn, perbarui bahasanya
  if (transformSteps.length > 0 && currentMatrix) {
    const rawText = textInput.value.trim();
    transformSteps = getDetailedTransformations(rawText, currentMatrix, lastOperation === 'Decryption', currentLang);
    renderStep(currentStepIndex);
  }
}

/**
 * Menampilkan notifikasi toast sementara
 */
function showToast(message, duration = 2800) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, duration);
}

/**
 * Mengupdate indikator sumber teks input (Manual vs Berkas)
 */
function updateSourceIndicator() {
  if (uploadedFileName) {
    sourceIndicator.innerHTML = `<span class="terminal-prompt">&gt;</span> File: <strong>${uploadedFileName}</strong>`;
  } else {
    sourceIndicator.innerHTML = `<span class="terminal-prompt">&gt;</span> ${I18N[currentLang].manualInput}`;
  }
}

/**
 * Mengupdate hitungan karakter input teks
 */
function updateCharCount() {
  const count = textInput.value.length;
  charCount.textContent = `${count} ${I18N[currentLang].charCount}`;
}

/**
 * Merender matriks 5x5 di kartu kontrol kanan.
 * Mengunci huruf dari kata kunci pada mode kustom grid.
 */
function renderMatrixView() {
  const rawKey = keyInput.value.trim();
  const sanitizedKey = rawKey.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const keyCharSet = new Set(sanitizedKey.split(''));

  if (isCustomMatrix) {
    // Mode Kustom Grid Aktif: Jika belum ada matriks, bangun dari kunci
    if (!currentMatrix) {
      currentMatrix = generateMatrix(rawKey);
    }

    matrixEmptyState.classList.add('hidden');
    matrixGridContainer.classList.remove('hidden');
    matrixGrid.innerHTML = '';

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const char = currentMatrix[r][c];
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.textContent = char;
        cell.dataset.row = r;
        cell.dataset.col = c;

        const isFromKey = keyCharSet.has(char);

        if (isFromKey) {
          // Huruf dari Key dikunci
          cell.classList.add('cell-key-char', 'cell-locked');
          cell.title = currentLang === 'en' 
            ? `Letter '${char}' belongs to Key (Locked)`
            : `Huruf '${char}' berasal dari Kata Kunci (Terkunci)`;

          cell.addEventListener('click', () => {
            if (swapSourceCell) {
              showToast(currentLang === 'en'
                ? `⚠️ Letter '${char}' is from the Key and is locked. You can only swap non-key cells!`
                : `⚠️ Huruf '${char}' berasal dari Kata Kunci (terkunci). Hanya huruf non-kunci yang bisa ditukar!`);
            } else {
              showToast(currentLang === 'en'
                ? `⚠️ Letter '${char}' is from the Key and is locked. Edit Key input to modify it.`
                : `⚠️ Huruf '${char}' berasal dari Kata Kunci dan terkunci. Ubah input Key untuk menggantinya.`);
            }
          });
        } else {
          // Sel non-kunci: Mendukung Click-to-Swap, Drag-and-Drop, dan Double-Click Edit
          cell.classList.add('editable-cell');
          cell.draggable = true;

          const isSelected = swapSourceCell && swapSourceCell.row === r && swapSourceCell.col === c;
          if (isSelected) {
            cell.classList.add('cell-swap-selected');
          }

          cell.title = currentLang === 'en'
            ? `Click to select & swap with another cell, or drag to swap [Row ${r + 1}, Col ${c + 1}]`
            : `Klik sel ini lalu klik sel lain untuk menukar huruf (atau seret/drag) [Baris ${r + 1}, Kolom ${c + 1}]`;

          // 1. KLIK UNTUK TUKAR (CLICK-TO-SWAP)
          cell.addEventListener('click', (e) => {
            if (cell.querySelector('input')) return;

            if (!swapSourceCell) {
              // Klik sel pertama: tandai sebagai sel sumber
              swapSourceCell = { row: r, col: c, char: currentMatrix[r][c], element: cell };
              renderMatrixView();
              showToast(currentLang === 'en'
                ? `Selected '${currentMatrix[r][c]}'. Now click another cell to swap!`
                : `Huruf '${currentMatrix[r][c]}' dipilih. Klik sel kedua untuk menukar posisi!`);
            } else if (swapSourceCell.row === r && swapSourceCell.col === c) {
              // Klik sel yang sama: batalkan seleksi
              swapSourceCell = null;
              renderMatrixView();
            } else {
              // Klik sel kedua: TUKAR POSISI KEDUA HURUF!
              const charA = swapSourceCell.char;
              const charB = currentMatrix[r][c];

              currentMatrix[swapSourceCell.row][swapSourceCell.col] = charB;
              currentMatrix[r][c] = charA;

              swapSourceCell = null;
              renderMatrixView();

              showToast(currentLang === 'en'
                ? `✅ Swapped '${charA}' ⇄ '${charB}' successfully!`
                : `✅ Berhasil menukar posisi '${charA}' ⇄ '${charB}'!`);
            }
          });

          // 2. DOUBLE CLICK: Buka input ketik langsung
          cell.addEventListener('dblclick', () => {
            swapSourceCell = null;
            startInlineCellEdit(cell, r, c, keyCharSet);
          });

          // 3. DRAG & DROP UNTUK MENUKAR
          cell.addEventListener('dragstart', (e) => {
            swapSourceCell = null;
            e.dataTransfer.setData('text/plain', JSON.stringify({ row: r, col: c, char: currentMatrix[r][c] }));
            cell.classList.add('cell-dragging');
          });

          cell.addEventListener('dragend', () => {
            cell.classList.remove('cell-dragging');
            document.querySelectorAll('.matrix-cell').forEach(el => el.classList.remove('cell-drag-target'));
          });

          cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            cell.classList.add('cell-drag-target');
          });

          cell.addEventListener('dragleave', () => {
            cell.classList.remove('cell-drag-target');
          });

          cell.addEventListener('drop', (e) => {
            e.preventDefault();
            cell.classList.remove('cell-drag-target');
            try {
              const data = JSON.parse(e.dataTransfer.getData('text/plain'));
              if (data.row === r && data.col === c) return;

              const charA = data.char;
              const charB = currentMatrix[r][c];

              currentMatrix[data.row][data.col] = charB;
              currentMatrix[r][c] = charA;

              swapSourceCell = null;
              renderMatrixView();

              showToast(currentLang === 'en'
                ? `✅ Swapped '${charA}' ⇄ '${charB}' successfully!`
                : `✅ Berhasil menukar posisi '${charA}' ⇄ '${charB}'!`);
            } catch (err) {
              console.error(err);
            }
          });
        }

        matrixGrid.appendChild(cell);
      }
    }
    matrixFooterNote.textContent = I18N[currentLang].matrixFooterCustom;
    return;
  }

  // Mode Auto dari Key
  if (!rawKey) {
    currentMatrix = null;
    matrixEmptyState.classList.remove('hidden');
    matrixGridContainer.classList.add('hidden');
    matrixFooterNote.textContent = I18N[currentLang].matrixFooterAuto;
    return;
  }

  // Pastikan matriks sinkron dengan kata kunci
  if (!currentMatrix) {
    currentMatrix = generateMatrix(rawKey);
  }

  matrixEmptyState.classList.add('hidden');
  matrixGridContainer.classList.remove('hidden');
  matrixGrid.innerHTML = '';

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const char = currentMatrix[r][c];
      const cell = document.createElement('div');
      cell.className = 'matrix-cell';
      cell.textContent = char;

      if (keyCharSet.has(char)) {
        cell.classList.add('cell-key-char');
        cell.title = currentLang === 'en'
          ? `Letter '${char}' from Key`
          : `Huruf '${char}' dari Kunci`;
      } else {
        cell.title = currentLang === 'en'
          ? `Letter '${char}' from alphabet`
          : `Huruf '${char}' dari sisa alfabet`;
      }

      matrixGrid.appendChild(cell);
    }
  }
  matrixFooterNote.textContent = I18N[currentLang].matrixFooterAuto;
}

/**
 * Mengedit isi sel matriks non-kunci secara inline dan responsif
 */
function startInlineCellEdit(cell, row, col, keyCharSet) {
  const currentChar = currentMatrix[row][col];
  cell.innerHTML = '';

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 1;
  input.value = currentChar;
  input.className = 'inline-cell-input';
  cell.appendChild(input);

  input.focus();
  input.select();

  let isCommitted = false;

  function commitEdit() {
    if (isCommitted) return;
    isCommitted = true;

    let clean = input.value.trim().toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    if (!clean) {
      cell.textContent = currentChar;
      return;
    }

    const newChar = clean[0];
    if (newChar === currentChar) {
      cell.textContent = currentChar;
      return;
    }

    if (keyCharSet.has(newChar)) {
      showToast(currentLang === 'en'
        ? `⚠️ Letter '${newChar}' belongs to the Key and cannot be duplicated.`
        : `⚠️ Huruf '${newChar}' sudah dipakai pada Kata Kunci dan tidak dapat diduplikasi.`);
      cell.textContent = currentChar;
      return;
    }

    // Tukar posisi jika huruf baru sudah ada di sel non-kunci lain agar 25 huruf tetap unik
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (r === row && c === col) continue;
        if (currentMatrix[r][c] === newChar) {
          currentMatrix[r][c] = currentChar;
        }
      }
    }

    currentMatrix[row][col] = newChar;
    renderMatrixView();

    showToast(currentLang === 'en'
      ? `Cell [Row ${row + 1}, Col ${col + 1}] updated to '${newChar}'`
      : `Huruf sel [Baris ${row + 1}, Kolom ${col + 1}] diubah menjadi '${newChar}'`);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      commitEdit();
    } else if (e.key === 'Escape') {
      isCommitted = true;
      cell.textContent = currentChar;
    }
  });

  input.addEventListener('input', () => {
    if (input.value.length >= 1) {
      commitEdit();
    }
  });

  input.addEventListener('blur', () => {
    commitEdit();
  });
}

/**
 * Menangani Eksekusi Transformasi (Enkripsi atau Dekripsi)
 */
function handleTransform(isDecrypt = false) {
  const rawText = textInput.value.trim();
  if (!rawText) {
    showToast(currentLang === 'en' ? '⚠️ Please enter text first!' : '⚠️ Masukkan teks terlebih dahulu!');
    textInput.focus();
    return;
  }

  // Jika matriks belum ada, minta kunci
  if (!currentMatrix) {
    const rawKey = keyInput.value.trim();
    if (!rawKey) {
      showToast(currentLang === 'en' ? '⚠️ Please enter a Key first!' : '⚠️ Masukkan kata kunci (Key) terlebih dahulu!');
      keyInput.focus();
      return;
    }
    currentMatrix = generateMatrix(rawKey);
  }

  lastOperation = isDecrypt ? 'Decryption' : 'Encryption';
  const result = isDecrypt 
    ? decrypt(rawText, currentMatrix)
    : encrypt(rawText, currentMatrix);

  // Update Tampilan Result Section
  resultSection.classList.remove('hidden');
  resultBadge.textContent = isDecrypt ? 'DECRYPTED' : 'ENCRYPTED';
  resultBadge.className = isDecrypt ? 'badge-status badge-decrypted' : 'badge-status';

  // File pada result hanya membedakan apakah teks manual atau dari file .txt
  metaFile.textContent = uploadedFileName ? uploadedFileName : I18N[currentLang].manualInput;
  metaOperation.textContent = isDecrypt ? (currentLang === 'en' ? 'Decryption' : 'Dekripsi') : (currentLang === 'en' ? 'Encryption' : 'Enkripsi');
  metaChars.textContent = result.length;
  resultText.textContent = result;

  // Siapkan modul Learn By Doing (Visualizer Animasi)
  transformSteps = getDetailedTransformations(rawText, currentMatrix, isDecrypt, currentLang);
  if (transformSteps.length > 0) {
    learnSection.classList.remove('hidden');
    currentStepIndex = 0;
    renderAllPairsList();
    renderStep(0);
    stopAutoPlay();
  } else {
    learnSection.classList.add('hidden');
  }

  // Scroll halus ke kartu hasil
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Merender daftar semua pasangan di bagian bawah modul Learn
 */
function renderAllPairsList() {
  allPairsContainer.innerHTML = '';
  transformSteps.forEach((step, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pair-badge-btn ${idx === currentStepIndex ? 'active-pair' : ''}`;
    btn.textContent = `#${step.pairIndex}  ${step.inPair} → ${step.outPair}`;
    btn.addEventListener('click', () => {
      stopAutoPlay();
      renderStep(idx);
    });
    allPairsContainer.appendChild(btn);
  });
}

/**
 * Merender satu langkah animasi tertentu
 */
function renderStep(index) {
  if (!transformSteps || transformSteps.length === 0) return;

  currentStepIndex = Math.max(0, Math.min(index, transformSteps.length - 1));
  const step = transformSteps[currentStepIndex];

  // Update Navigasi
  const t = I18N[currentLang];
  stepPairLabel.textContent = `${t.pairCount} ${step.pairIndex} ${t.pairOf} ${step.totalPairs}`;
  chipInPair.textContent = step.inPair;
  chipOutPair.textContent = step.outPair;

  btnPrevStep.disabled = currentStepIndex === 0;
  btnNextStep.disabled = currentStepIndex === transformSteps.length - 1;

  // Update Penjelasan Aturan
  ruleBadge.textContent = step.rule;
  ruleInPair.textContent = step.inPair;
  ruleOutPair.textContent = step.outPair;
  ruleExplanationDesc.textContent = step.shortDesc;
  ruleDetailedNote.textContent = step.explanation;

  // Highlight tombol pair pada daftar accordion
  const pairBtns = allPairsContainer.querySelectorAll('.pair-badge-btn');
  pairBtns.forEach((b, i) => {
    b.classList.toggle('active-pair', i === currentStepIndex);
  });

  // Render Matriks Visual 5x5
  learnMatrixGrid.innerHTML = '';

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const char = currentMatrix[r][c];
      const cell = document.createElement('div');
      cell.className = 'learn-cell';
      cell.textContent = char;
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.id = `cell-${r}-${c}`;

      const isInput1 = (r === step.pos1.row && c === step.pos1.col);
      const isInput2 = (r === step.pos2.row && c === step.pos2.col);
      const isOutput1 = (r === step.outPos1.row && c === step.outPos1.col);
      const isOutput2 = (r === step.outPos2.row && c === step.outPos2.col);

      const isAnyInput = isInput1 || isInput2;
      const isAnyOutput = isOutput1 || isOutput2;

      if (isAnyInput && isAnyOutput) {
        cell.classList.add('is-both');
      } else if (isAnyInput) {
        cell.classList.add('is-input');
      } else if (isAnyOutput) {
        cell.classList.add('is-output');
      }

      learnMatrixGrid.appendChild(cell);
    }
  }

  // Gambar Panah SVG Dinamis Melengkung di LUAR Sel (Atas/Bawah atau Kanan/Kiri)
  setTimeout(() => {
    drawArchedArrows(step);
  }, 60);
}

/**
 * Menggambar panah melengkung di LUAR sel (Atas/Bawah atau Kiri/Kanan) persis sesuai contoh:
 * - Pada pergeseran horizontal (baris / persegi):
 *   Karakter 1 melengkung ke ATAS (dari atas-tengah start ke atas-tengah target)
 *   Karakter 2 melengkung ke BAWAH (dari bawah-tengah start ke bawah-tengah target)
 * - Pada pergeseran vertikal (kolom):
 *   Karakter 1 melengkung ke KANAN di luar sel
 *   Karakter 2 melengkung ke KIRI di luar sel
 */
function drawArchedArrows(step) {
  if (arrowLayer) arrowLayer.innerHTML = '';
  if (guideLayer) guideLayer.innerHTML = '';
  const canvasRect = arrowCanvas.getBoundingClientRect();
  if (!canvasRect.width || !canvasRect.height) return;

  arrowCanvas.setAttribute('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);

  function getCellBounds(row, col) {
    const el = document.getElementById(`cell-${row}-${col}`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: r.left - canvasRect.left,
      top: r.top - canvasRect.top,
      right: r.right - canvasRect.left,
      bottom: r.bottom - canvasRect.top,
      centerX: r.left - canvasRect.left + r.width / 2,
      centerY: r.top - canvasRect.top + r.height / 2,
      width: r.width,
      height: r.height
    };
  }

  const start1 = getCellBounds(step.pos1.row, step.pos1.col);
  const end1 = getCellBounds(step.outPos1.row, step.outPos1.col);

  const start2 = getCellBounds(step.pos2.row, step.pos2.col);
  const end2 = getCellBounds(step.outPos2.row, step.outPos2.col);

  if (!start1 || !end1 || !start2 || !end2) return;

  const isColRule = (step.pos1.col === step.pos2.col);
  const isRowRule = (step.pos1.row === step.pos2.row);

  if (isColRule) {
    // ATURAN KOLOM SAMA: Karakter 1 melengkung di KANAN, Karakter 2 melengkung di KIRI
    createSideArchedArrow(start1, end1, 'right', 'arrowhead-primary', false);
    createSideArchedArrow(start2, end2, 'left', 'arrowhead-secondary', true);
  } else if (isRowRule) {
    // ATURAN BARIS SAMA: Karakter 1 melengkung di ATAS, Karakter 2 melengkung di BAWAH
    createTopBottomArchedArrow(start1, end1, 'above', 'arrowhead-primary', false);
    createTopBottomArchedArrow(start2, end2, 'below', 'arrowhead-secondary', true);
  } else {
    // ATURAN SUDUT PERSEGI (RECTANGLE RULE):
    // 1. Gambar kotak pemandu persegi di layer pemandu
    if (guideLayer) {
      const minX = Math.min(start1.left, end1.left, start2.left, end2.left) + 2;
      const maxX = Math.max(start1.right, end1.right, start2.right, end2.right) - 2;
      const minY = Math.min(start1.top, end1.top, start2.top, end2.top) + 2;
      const maxY = Math.max(start1.bottom, end1.bottom, start2.bottom, end2.bottom) - 2;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', minX);
      rect.setAttribute('y', minY);
      rect.setAttribute('width', maxX - minX);
      rect.setAttribute('height', maxY - minY);
      rect.setAttribute('rx', '10');
      rect.setAttribute('ry', '10');
      rect.setAttribute('class', 'rectangle-guide-box');
      guideLayer.appendChild(rect);
    }

    // 2. Pastikan huruf pada baris atas melengkung ke ATAS, dan baris bawah melengkung ke BAWAH
    // Ini mencegah kedua panah tabrakan di sel tengah (masalah di Gambar 3)
    const isPos1Higher = step.pos1.row < step.pos2.row;

    if (isPos1Higher) {
      // Pos 1 di baris atas -> arch di ATAS matriks
      createTopBottomArchedArrow(start1, end1, 'above', 'arrowhead-primary', false);
      // Pos 2 di baris bawah -> arch di BAWAH matriks
      createTopBottomArchedArrow(start2, end2, 'below', 'arrowhead-secondary', true);
    } else {
      // Pos 2 di baris atas -> arch di ATAS matriks
      createTopBottomArchedArrow(start2, end2, 'above', 'arrowhead-secondary', true);
      // Pos 1 di baris bawah -> arch di BAWAH matriks
      createTopBottomArchedArrow(start1, end1, 'below', 'arrowhead-primary', false);
    }
  }
}

/**
 * Membuat kurva panah horizontal melengkung di ATAS atau di BAWAH sel
 */
function createTopBottomArchedArrow(start, end, position, markerId, isSecondary) {
  if (start.centerX === end.centerX && start.centerY === end.centerY) return;

  const dx = Math.abs(end.centerX - start.centerX);
  const archDistance = Math.min(38, Math.max(20, 16 + dx * 0.08));

  let startX = start.centerX;
  let endX = end.centerX;
  let startY, endY, ctrlY;

  if (position === 'above') {
    startY = start.top + 2;
    endY = end.top + 2;
    ctrlY = Math.min(start.top, end.top) - archDistance;
  } else {
    startY = start.bottom - 2;
    endY = end.bottom - 2;
    ctrlY = Math.max(start.bottom, end.bottom) + archDistance;
  }

  const ctrlX = (startX + endX) / 2;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`);
  path.setAttribute('class', isSecondary ? 'arrow-path arrow-path-secondary' : 'arrow-path');
  path.setAttribute('marker-end', `url(#${markerId})`);
  arrowLayer.appendChild(path);
}

/**
 * Membuat kurva panah vertikal melengkung di KANAN atau KIRI sel
 */
function createSideArchedArrow(start, end, side, markerId, isSecondary) {
  if (start.centerX === end.centerX && start.centerY === end.centerY) return;

  const dy = Math.abs(end.centerY - start.centerY);
  const archDistance = Math.min(38, Math.max(20, 16 + dy * 0.08));

  let startY = start.centerY;
  let endY = end.centerY;
  let startX, endX, ctrlX;

  if (side === 'right') {
    startX = start.right - 2;
    endX = end.right - 2;
    ctrlX = Math.max(start.right, end.right) + archDistance;
  } else {
    startX = start.left + 2;
    endX = end.left + 2;
    ctrlX = Math.min(start.left, end.left) - archDistance;
  }

  const ctrlY = (startY + endY) / 2;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`);
  path.setAttribute('class', isSecondary ? 'arrow-path arrow-path-secondary' : 'arrow-path');
  path.setAttribute('marker-end', `url(#${markerId})`);
  arrowLayer.appendChild(path);
}

/**
 * Logika Auto Play animasi langkah
 */
function toggleAutoPlay() {
  if (isPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  isPlaying = true;
  playIcon.textContent = '⏸';
  playLabel.textContent = I18N[currentLang].pause;
  btnPlayStep.classList.add('playing');

  playTimer = setInterval(() => {
    if (currentStepIndex >= transformSteps.length - 1) {
      renderStep(0);
    } else {
      renderStep(currentStepIndex + 1);
    }
  }, 1600);
}

function stopAutoPlay() {
  isPlaying = false;
  playIcon.textContent = '▶';
  playLabel.textContent = I18N[currentLang].autoPlay;
  btnPlayStep.classList.remove('playing');
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
  }
}

/**
 * Membaca berkas teks dari input file (.txt)
 */
function handleFileSelect(file) {
  if (!file) return;
  if (!file.name.endsWith('.txt')) {
    showToast(currentLang === 'en' ? '⚠️ Please select a .txt file!' : '⚠️ Harap pilih berkas berekstensi .txt!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    textInput.value = e.target.result;
    uploadedFileName = file.name;
    updateSourceIndicator();
    updateCharCount();
    showToast(currentLang === 'en' ? `File "${file.name}" loaded!` : `Berkas "${file.name}" berhasil dimuat!`);
  };
  reader.readAsText(file);
}

// --- Event Listeners ---

// Language Switcher
langIdBtn.addEventListener('click', () => applyLanguage('id'));
langEnBtn.addEventListener('click', () => applyLanguage('en'));

// Input Text
textInput.addEventListener('input', () => {
  updateCharCount();
  if (uploadedFileName) {
    uploadedFileName = null;
    updateSourceIndicator();
  }
});

// Key Input: SELALU memperbarui matriks dan mengunci huruf kunci
keyInput.addEventListener('input', () => {
  currentMatrix = generateMatrix(keyInput.value.trim());
  renderMatrixView();
});

// Clear button
btnClear.addEventListener('click', () => {
  textInput.value = '';
  uploadedFileName = null;
  updateSourceIndicator();
  updateCharCount();
  showToast(currentLang === 'en' ? 'Input text cleared.' : 'Input teks dibersihkan.');
});

// Reset button
btnReset.addEventListener('click', () => {
  textInput.value = '';
  keyInput.value = '';
  isCustomMatrix = false;
  btnToggleCustom.classList.remove('active');
  customMatrixLabel.textContent = I18N[currentLang].customGrid;
  currentMatrix = null;
  uploadedFileName = null;
  updateSourceIndicator();
  updateCharCount();
  renderMatrixView();

  resultSection.classList.add('hidden');
  learnSection.classList.add('hidden');
  stopAutoPlay();
  transformSteps = [];
  showToast(currentLang === 'en' ? 'All fields and matrix reset!' : 'Seluruh input dan matriks telah direset!');
});

// Try Example button: HANYA mengisi contoh teks dan kunci TANPA menjalankan enkripsi otomatis
btnTryExample.addEventListener('click', () => {
  keyInput.value = 'MONARCHY';
  textInput.value = 'INSTRUMENTS';
  uploadedFileName = null; // Bukan dari file upload
  updateSourceIndicator();
  updateCharCount();
  renderMatrixView(); // Membangkitkan matriks 5x5 dari kata kunci

  showToast(currentLang === 'en' 
    ? 'Example loaded! Click Encrypt or Decrypt to proceed.' 
    : 'Contoh berhasil dimuat! Tekan Encrypt atau Decrypt untuk memproses.');
});

// Encrypt & Decrypt buttons
btnEncrypt.addEventListener('click', () => handleTransform(false));
btnDecrypt.addEventListener('click', () => handleTransform(true));

// Custom Grid Toggle
btnToggleCustom.addEventListener('click', () => {
  isCustomMatrix = !isCustomMatrix;
  btnToggleCustom.classList.toggle('active', isCustomMatrix);
  customMatrixLabel.textContent = isCustomMatrix ? I18N[currentLang].cancelCustom : I18N[currentLang].customGrid;
  
  if (!isCustomMatrix) {
    // Saat keluar dari mode kustom, kembalikan ke matriks kata kunci otomatis
    currentMatrix = generateMatrix(keyInput.value.trim());
  } else if (!currentMatrix) {
    currentMatrix = generateMatrix(keyInput.value.trim());
  }

  renderMatrixView();
  showToast(isCustomMatrix 
    ? (currentLang === 'en' ? 'Custom Grid active: Key letters locked, others editable (click cell to type).' : 'Mode Kustom Grid aktif: Huruf kunci dikunci, klik sel lain untuk mengubah huruf.')
    : (currentLang === 'en' ? 'Returned to auto-generate mode.' : 'Kembali ke mode auto-generate.'));
});

// File Upload (Browse & Drag-Drop)
btnBrowseFile.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    handleFileSelect(e.target.files[0]);
  }
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-active');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-active');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-active');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFileSelect(e.dataTransfer.files[0]);
  }
});

// Copy, Download .txt, Share
btnCopyResult.addEventListener('click', async () => {
  const text = resultText.textContent;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBtnText.textContent = I18N[currentLang].copied;
    showToast(currentLang === 'en' ? 'Result copied to clipboard!' : 'Teks hasil berhasil disalin!');
    setTimeout(() => {
      copyBtnText.textContent = I18N[currentLang].copy;
    }, 2000);
  } catch (err) {
    showToast(currentLang === 'en' ? 'Failed to copy.' : 'Gagal menyalin ke clipboard.');
  }
});

btnDownloadResult.addEventListener('click', () => {
  const text = resultText.textContent;
  if (!text) return;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `playfair-${lastOperation.toLowerCase()}-result.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(currentLang === 'en' ? '.txt file downloaded!' : 'Berkas .txt berhasil diunduh!');
});

btnShareResult.addEventListener('click', async () => {
  const text = resultText.textContent;
  if (!text) return;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `Playfair Cipher ${lastOperation} Result`,
        text: text
      });
      showToast(currentLang === 'en' ? 'Successfully shared!' : 'Berhasil dibagikan!');
    } catch (err) {
      if (err.name !== 'AbortError') {
        showToast(currentLang === 'en' ? 'Share cancelled.' : 'Batal membagikan.');
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showToast(currentLang === 'en' ? 'Text copied to clipboard to share!' : 'Teks disalin ke clipboard untuk dibagikan!');
    } catch (err) {
      showToast(currentLang === 'en' ? 'Web Share not supported.' : 'Perangkat tidak mendukung Web Share API.');
    }
  }
});

// Fitur Baru: Gunakan Hasil Sebagai Input (Use as Input)
btnUseAsInput.addEventListener('click', () => {
  const res = resultText.textContent;
  if (!res) return;

  textInput.value = res;
  uploadedFileName = null;
  updateSourceIndicator();
  updateCharCount();
  showToast(currentLang === 'en' ? 'Result set as new input text!' : 'Teks hasil dipindahkan ke input teks!');
  textInput.focus();
});

// Learn Navigation Controls
btnPrevStep.addEventListener('click', () => {
  stopAutoPlay();
  renderStep(currentStepIndex - 1);
});

btnNextStep.addEventListener('click', () => {
  stopAutoPlay();
  renderStep(currentStepIndex + 1);
});

btnPlayStep.addEventListener('click', toggleAutoPlay);

// Toggle Accordion All Pairs
btnToggleAllPairs.addEventListener('click', () => {
  allPairsContainer.classList.toggle('hidden');
  const arrow = btnToggleAllPairs.querySelector('#accordion-arrow');
  if (arrow) {
    arrow.textContent = allPairsContainer.classList.contains('hidden') ? '▶' : '▼';
  }
});

// Window resize listener untuk menghitung ulang posisi panah SVG
window.addEventListener('resize', () => {
  if (transformSteps.length > 0 && !learnSection.classList.contains('hidden')) {
    drawArchedArrows(transformSteps[currentStepIndex]);
  }
});

// Modal Theory / Materi Tabs & Controls
const modalTabs = document.querySelectorAll('.modal-tab-btn');
const modalTabTrack = document.querySelector('#modal-tab-track');
const tabPanes = document.querySelectorAll('.tab-pane');
const tabIds = ['tab-theory', 'tab-matrix', 'tab-prep', 'tab-rules'];

function switchModalTab(targetTabId) {
  const targetIndex = tabIds.indexOf(targetTabId);
  if (targetIndex === -1) return;

  modalTabs.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === targetIndex);
  });

  tabPanes.forEach((pane, idx) => {
    pane.classList.toggle('active', idx === targetIndex);
  });

  if (modalTabTrack) {
    modalTabTrack.style.transform = `translateX(-${targetIndex * 25}%)`;
  }
}

btnAbout.addEventListener('click', () => {
  aboutModal.classList.remove('hidden');
  switchModalTab('tab-theory');
});
btnCloseModal.addEventListener('click', () => aboutModal.classList.add('hidden'));
btnModalGotit.addEventListener('click', () => aboutModal.classList.add('hidden'));

aboutModal.addEventListener('click', (e) => {
  if (e.target === aboutModal) aboutModal.classList.add('hidden');
});

modalTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    switchModalTab(targetTab);
  });
});

// Keyboard shortcut listener untuk mode Kustom Grid
window.addEventListener('keydown', (e) => {
  if (!isCustomMatrix || !swapSourceCell) return;
  // Jangan tangkap jika sedang mengetik di input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === 'Escape') {
    swapSourceCell = null;
    renderMatrixView();
    return;
  }

  const key = e.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) {
    const targetChar = key === 'J' ? 'I' : key;
    const rawKey = keyInput.value.trim();
    const sanitizedKey = rawKey.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    const keyCharSet = new Set(sanitizedKey.split(''));

    if (keyCharSet.has(targetChar)) {
      showToast(currentLang === 'en'
        ? `⚠️ Letter '${targetChar}' belongs to Key and cannot be swapped.`
        : `⚠️ Huruf '${targetChar}' berasal dari Kata Kunci dan tidak dapat ditukar.`);
      return;
    }

    const oldChar = swapSourceCell.char;
    // Cari lokasi targetChar di matriks saat ini lalu tukar posisi
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (r === swapSourceCell.row && c === swapSourceCell.col) continue;
        if (currentMatrix[r][c] === targetChar) {
          currentMatrix[r][c] = oldChar;
        }
      }
    }

    currentMatrix[swapSourceCell.row][swapSourceCell.col] = targetChar;
    const fromCell = `'${oldChar}'`;
    swapSourceCell = null;
    renderMatrixView();

    showToast(currentLang === 'en'
      ? `✅ Swapped ${fromCell} ⇄ '${targetChar}'!`
      : `✅ Berhasil menukar posisi ${fromCell} ⇄ '${targetChar}'!`);
  }
});

// --- Inisialisasi Awal ---
applyLanguage(currentLang);
