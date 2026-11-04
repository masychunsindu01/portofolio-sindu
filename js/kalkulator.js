// Menghitung rata-rata nilai
function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

// Menentukan predikat nilai
function predikat(nilai) {
  if (nilai >= 90) {
    return "A";
  } else if (nilai >= 80) {
    return "B";
  } else if (nilai >= 70) {
    return "C";
  } else if (nilai >= 60) {
    return "D";
  } else {
    return "E";
  }
}

// Mengambil form dan hasil
const form = document.getElementById("form");
const result = document.getElementById("result");

// Ketika tombol hitung ditekan
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const tugas = Number(document.getElementById("tugas").value);
  const uts = Number(document.getElementById("uts").value);
  const uas = Number(document.getElementById("uas").value);

  const rataRata = hitungRataRata(tugas, uts, uas);
  const hasil = predikat(rataRata);

  result.innerText = "Rata-rata: " + rataRata.toFixed(2) +
                     " | Predikat: " + hasil;
});