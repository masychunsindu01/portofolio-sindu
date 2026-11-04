// Tantangan: Hitung rata-rata nilai tugas, UTS, dan UAS
/**
 * Calculates the average of assignment, midterm, and final scores.
 * @param {number} tugas - Assignment score.
 * @param {number} uts - Midterm exam score.
 * @param {number} uas - Final exam score.
 * @returns {number} The average of the three scores.
 */
const hitungRataRata = (tugas, uts, uas) => (tugas + uts + uas) / 3;
// Tantangan: Tentukan predikat dari rata-rata nilai
/**
 * Determines the predicate label based on the average score.
 * @param {number} rataRata - The average score (0–100).
 * @returns {"A" | "B" | "C" | "D" | "E"} The predicate label.
 */
const predikat = (rataRata) => {
  if (rataRata >= 90) return "A";
  if (rataRata >= 80) return "B";
  if (rataRata >= 70) return "C";
  if (rataRata >= 60) return "D";
  return "E";
};
const form = document.getElementById("form");
const resultElement = document.getElementById("result");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { tugas, uts, uas } = e.target.elements;
  const nTugas = Number(tugas.value);
  const nUts = Number(uts.value);
  const nUas = Number(uas.value);

  const rataRata = hitungRataRata(nTugas, nUts, nUas);
  const pred = predikat(rataRata);

  resultElement.innerText =
    `Rata-rata: ${rataRata.toFixed(2)} | Predikat: ${pred}`;

  console.log(
    `tugas=${nTugas}, uts=${nUts}, uas=${nUas} → rata-rata=${rataRata.toFixed(2)}, predikat=${pred}`
  );
});