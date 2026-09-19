/**
 * Modul Implementasi Playfair Cipher (Vanilla JavaScript)
 * Memetakan alfabet 25 huruf ke matriks 5x5 (huruf 'I' dan 'J' digabung/dianggap sama).
 */

export const ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 25 huruf (tanpa 'J')

/**
 * Membuat matriks 5x5 dari kata kunci (key).
 * Menggabungkan huruf I dan J (semua 'J' diubah menjadi 'I').
 * 
 * @param {string} key - Kata kunci untuk membangkitkan matriks.
 * @returns {string[][]} Matriks 5x5 berukuran 5 baris x 5 kolom.
 */
export function generateMatrix(key = '') {
  const sanitizedKey = String(key)
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/J/g, 'I');

  const seen = new Set();
  const sequence = [];

  // Masukkan karakter unik dari kunci
  for (const char of sanitizedKey) {
    if (!seen.has(char)) {
      seen.add(char);
      sequence.push(char);
    }
  }

  // Lengkapi dengan sisa alfabet
  for (const char of ALPHABET) {
    if (!seen.has(char)) {
      seen.add(char);
      sequence.push(char);
    }
  }

  // Bentuk matriks 5x5
  const matrix = [];
  for (let row = 0; row < 5; row++) {
    matrix.push(sequence.slice(row * 5, (row + 1) * 5));
  }

  return matrix;
}

/**
 * Normalisasi matriks baik dari array 2D maupun dari kata kunci string.
 * @param {string|string[][]} matrixOrKey 
 * @returns {string[][]}
 */
export function resolveMatrix(matrixOrKey) {
  if (Array.isArray(matrixOrKey) && matrixOrKey.length === 5 && Array.isArray(matrixOrKey[0])) {
    // Pastikan setiap sel dalam matriks tidak mengandung 'J'
    return matrixOrKey.map(row => row.map(cell => cell === 'J' ? 'I' : cell));
  }
  return generateMatrix(typeof matrixOrKey === 'string' ? matrixOrKey : '');
}

/**
 * Membersihkan dan menyiapkan teks sebelum proses enkripsi/dekripsi:
 * 1. Mengubah ke uppercase.
 * 2. Menghapus karakter non-alfabet.
 * 3. Mengganti huruf 'J' dengan 'I'.
 * 4. Menyisipkan huruf 'X' di antara dua huruf kembar dalam satu pasangan (atau 'Q' jika hurufnya 'X').
 * 5. Memastikan panjang teks genap.
 * 
 * @param {string} text - Teks plaintext/ciphertext yang akan disiapkan.
 * @returns {string} Digraf teks yang siap diproses.
 */
export function prepareText(text = '') {
  const clean = String(text)
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/J/g, 'I');

  if (!clean) return '';

  let prepared = '';
  for (let i = 0; i < clean.length; i++) {
    const currentChar = clean[i];
    prepared += currentChar;

    if (i + 1 < clean.length) {
      const nextChar = clean[i + 1];
      if (currentChar === nextChar) {
        // Jika huruf kembar dalam satu pasangan digraf, sisipkan 'X' (atau 'Q' jika hurufnya 'X')
        prepared += (currentChar === 'X' ? 'Q' : 'X');
      } else {
        prepared += nextChar;
        i++; // Lompati huruf kedua karena sudah dipasangkan
      }
    }
  }

  // Jika panjang masih ganjil, tambahkan huruf pengisi di akhir
  if (prepared.length % 2 !== 0) {
    const lastChar = prepared[prepared.length - 1];
    prepared += (lastChar === 'X' ? 'Q' : 'X');
  }

  return prepared;
}

/**
 * Mencari posisi baris dan kolom suatu karakter dalam matriks 5x5.
 * 
 * @param {string[][]} matrix - Matriks 5x5.
 * @param {string} char - Karakter yang dicari (huruf kapital).
 * @returns {{row: number, col: number}} Posisi indeks baris dan kolom (0-4).
 */
export function findPosition(matrix, char) {
  const target = char === 'J' ? 'I' : char;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (matrix[r][c] === target) {
        return { row: r, col: c };
      }
    }
  }
  return { row: 0, col: 0 };
}

/**
 * Melakukan enkripsi Playfair Cipher sesuai aturan matriks 5x5.
 * 
 * @param {string} plaintext - Pesan asli.
 * @param {string|string[][]} matrixOrKey - Kata kunci string atau matriks 5x5 langsung.
 * @returns {string} Ciphertext hasil enkripsi.
 */
export function encrypt(plaintext, matrixOrKey) {
  const matrix = resolveMatrix(matrixOrKey);
  const prepared = prepareText(plaintext);

  let ciphertext = '';

  for (let i = 0; i < prepared.length; i += 2) {
    const char1 = prepared[i];
    const char2 = prepared[i + 1];

    const pos1 = findPosition(matrix, char1);
    const pos2 = findPosition(matrix, char2);

    if (pos1.row === pos2.row) {
      // Baris sama: geser 1 kolom ke kanan (wrap around)
      ciphertext += matrix[pos1.row][(pos1.col + 1) % 5];
      ciphertext += matrix[pos2.row][(pos2.col + 1) % 5];
    } else if (pos1.col === pos2.col) {
      // Kolom sama: geser 1 baris ke bawah (wrap around)
      ciphertext += matrix[(pos1.row + 1) % 5][pos1.col];
      ciphertext += matrix[(pos2.row + 1) % 5][pos2.col];
    } else {
      // Persegi: tukar kolom
      ciphertext += matrix[pos1.row][pos2.col];
      ciphertext += matrix[pos2.row][pos1.col];
    }
  }

  return ciphertext;
}

/**
 * Melakukan dekripsi Playfair Cipher sesuai aturan matriks 5x5.
 * 
 * @param {string} ciphertext - Pesan terenkripsi.
 * @param {string|string[][]} matrixOrKey - Kata kunci string atau matriks 5x5 langsung.
 * @returns {string} Plaintext hasil dekripsi.
 */
export function decrypt(ciphertext, matrixOrKey) {
  const matrix = resolveMatrix(matrixOrKey);
  const cleanCipher = String(ciphertext)
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/J/g, 'I');

  let plaintext = '';

  for (let i = 0; i < cleanCipher.length; i += 2) {
    const char1 = cleanCipher[i];
    const char2 = cleanCipher[i + 1];

    if (!char2) {
      plaintext += char1;
      break;
    }

    const pos1 = findPosition(matrix, char1);
    const pos2 = findPosition(matrix, char2);

    if (pos1.row === pos2.row) {
      // Baris sama: geser 1 kolom ke kiri
      plaintext += matrix[pos1.row][(pos1.col - 1 + 5) % 5];
      plaintext += matrix[pos2.row][(pos2.col - 1 + 5) % 5];
    } else if (pos1.col === pos2.col) {
      // Kolom sama: geser 1 baris ke atas
      plaintext += matrix[(pos1.row - 1 + 5) % 5][pos1.col];
      plaintext += matrix[(pos2.row - 1 + 5) % 5][pos2.col];
    } else {
      // Persegi: tukar kolom
      plaintext += matrix[pos1.row][pos2.col];
      plaintext += matrix[pos2.row][pos1.col];
    }
  }

  return plaintext;
}

/**
 * Mendapatkan detail langkah demi langkah proses transformasi Playfair untuk setiap pasangan huruf (digraph).
 * Berguna untuk visualisasi animasi dan modul edukasi 'Learn by Doing'.
 * 
 * @param {string} text - Teks input (plaintext untuk enkripsi / ciphertext untuk dekripsi).
 * @param {string|string[][]} matrixOrKey - Matriks atau kata kunci.
 * @param {boolean} isDecrypt - Apakah mode dekripsi (default false).
 * @param {string} lang - Bahasa penjelasan ('id' atau 'en').
 * @returns {Array<Object>} Daftar objek detail langkah per pasangan huruf.
 */
export function getDetailedTransformations(text, matrixOrKey, isDecrypt = false, lang = 'id') {
  const matrix = resolveMatrix(matrixOrKey);
  const processedText = isDecrypt 
    ? String(text).toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I')
    : prepareText(text);

  const steps = [];
  const totalPairs = Math.floor(processedText.length / 2);

  for (let i = 0; i < totalPairs * 2; i += 2) {
    const in1 = processedText[i];
    const in2 = processedText[i + 1];

    const pos1 = findPosition(matrix, in1);
    const pos2 = findPosition(matrix, in2);

    let out1 = '';
    let out2 = '';
    let outPos1 = { row: 0, col: 0 };
    let outPos2 = { row: 0, col: 0 };
    let rule = '';
    let ruleTitle = '';
    let explanationId = '';
    let explanationEn = '';
    let shortDescId = '';
    let shortDescEn = '';

    if (pos1.row === pos2.row) {
      // SAME ROW RULE
      rule = 'SAME ROW RULE';
      ruleTitle = lang === 'en' ? 'Same Row Rule' : 'Aturan Baris Sama';
      const shift = isDecrypt ? -1 : 1;
      const c1 = (pos1.col + shift + 5) % 5;
      const c2 = (pos2.col + shift + 5) % 5;
      outPos1 = { row: pos1.row, col: c1 };
      outPos2 = { row: pos2.row, col: c2 };
      out1 = matrix[outPos1.row][outPos1.col];
      out2 = matrix[outPos2.row][outPos2.col];

      shortDescId = 'Kedua huruf berada di baris yang sama. Masing-masing huruf digeser secara horizontal.';
      shortDescEn = 'Both letters are in the same row. Each letter is shifted horizontally.';

      explanationId = isDecrypt
        ? `Kedua huruf '${in1}' dan '${in2}' berada pada baris yang sama (baris ${pos1.row + 1}). Masing-masing digeser 1 kolom ke kiri (melingkar).`
        : `Kedua huruf '${in1}' dan '${in2}' berada pada baris yang sama (baris ${pos1.row + 1}). Masing-masing digeser 1 kolom ke kanan (melingkar).`;

      explanationEn = isDecrypt
        ? `Both letters '${in1}' and '${in2}' are in the same row (row ${pos1.row + 1}). Each letter shifts 1 column to the left (wrapping around).`
        : `Both letters '${in1}' and '${in2}' are in the same row (row ${pos1.row + 1}). Each letter shifts 1 column to the right (wrapping around).`;

    } else if (pos1.col === pos2.col) {
      // SAME COLUMN RULE
      rule = 'SAME COLUMN RULE';
      ruleTitle = lang === 'en' ? 'Same Column Rule' : 'Aturan Kolom Sama';
      const shift = isDecrypt ? -1 : 1;
      const r1 = (pos1.row + shift + 5) % 5;
      const r2 = (pos2.row + shift + 5) % 5;
      outPos1 = { row: r1, col: pos1.col };
      outPos2 = { row: r2, col: pos2.col };
      out1 = matrix[outPos1.row][outPos1.col];
      out2 = matrix[outPos2.row][outPos2.col];

      shortDescId = 'Kedua huruf berada di kolom yang sama. Masing-masing huruf digeser secara vertikal.';
      shortDescEn = 'Both letters are in the same column. Each letter is shifted vertically.';

      explanationId = isDecrypt
        ? `Kedua huruf '${in1}' dan '${in2}' berada pada kolom yang sama (kolom ${pos1.col + 1}). Masing-masing digeser 1 baris ke atas (melingkar).`
        : `Kedua huruf '${in1}' dan '${in2}' berada pada kolom yang sama (kolom ${pos1.col + 1}). Masing-masing digeser 1 baris ke bawah (melingkar).`;

      explanationEn = isDecrypt
        ? `Both letters '${in1}' and '${in2}' are in the same column (column ${pos1.col + 1}). Each letter shifts 1 row up (wrapping around).`
        : `Both letters '${in1}' and '${in2}' are in the same column (column ${pos1.col + 1}). Each letter shifts 1 row down (wrapping around).`;

    } else {
      // RECTANGLE RULE
      rule = 'RECTANGLE RULE';
      ruleTitle = lang === 'en' ? 'Rectangle Rule' : 'Aturan Sudut Persegi';
      outPos1 = { row: pos1.row, col: pos2.col };
      outPos2 = { row: pos2.row, col: pos1.col };
      out1 = matrix[outPos1.row][outPos1.col];
      out2 = matrix[outPos2.row][outPos2.col];

      shortDescId = 'Huruf input berada di baris dan kolom berbeda sehingga membentuk sudut persegi panjang.';
      shortDescEn = 'Input characters form the corners of a rectangle. Each letter swaps columns while keeping its row.';

      explanationId = `Huruf '${in1}' dan '${in2}' membentuk sudut persegi panjang. Huruf '${in1}' digantikan oleh huruf di barisnya sendiri namun pada kolom '${in2}' ('${out1}'), dan '${in2}' digantikan oleh huruf di barisnya pada kolom '${in1}' ('${out2}').`;

      explanationEn = `Letters '${in1}' and '${in2}' form the opposite corners of a rectangle. Letter '${in1}' is replaced by the letter on its same row but in the column of '${in2}' ('${out1}'), and '${in2}' is replaced by the letter on its same row in the column of '${in1}' ('${out2}').`;
    }

    steps.push({
      pairIndex: steps.length + 1,
      totalPairs,
      in1,
      in2,
      inPair: `${in1}${in2}`,
      out1,
      out2,
      outPair: `${out1}${out2}`,
      pos1,
      pos2,
      outPos1,
      outPos2,
      rule,
      ruleTitle,
      explanation: lang === 'en' ? explanationEn : explanationId,
      explanationId,
      explanationEn,
      shortDesc: lang === 'en' ? shortDescEn : shortDescId,
      shortDescId,
      shortDescEn
    });
  }

  return steps;
}
