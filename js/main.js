
// 1. Daftar keahlian
let skills = [];

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error("Data keahlian gagal dimuat");
    }

    skills = await response.json();
    daftarSkill.innerHTML = "";

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    if (jumlahSkill) {
      jumlahSkill.textContent =
        `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    }

  } catch (error) {
    console.error("Error:", error);

    if (daftarSkill) {
      daftarSkill.textContent = "Data keahlian gagal dimuat.";
    }

    if (jumlahSkill) {
      jumlahSkill.textContent = "";
    }
  }
}

if (daftarSkill) {
  muatKeahlian();
}


// 2. Tema gelap
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode Terang";
  } else {
    tombolTema.textContent = "Mode Gelap";
  }

  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      localStorage.setItem("tema", "gelap");
      tombolTema.textContent = "Mode Terang";
    } else {
      localStorage.setItem("tema", "terang");
      tombolTema.textContent = "Mode Gelap";
    }
  });
}


// 3. Penghitung karakter pesan
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  hitungKarakter.textContent =
    `${kotakPesan.value.length}/300 karakter`;

  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent =
      `${kotakPesan.value.length}/300 karakter`;
  });
}


// 4. Daftar proyek dan filter
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="640" height="480">
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;

  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");

  if (jumlahProyek) {
    jumlahProyek.textContent =
      `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {
    document.querySelectorAll(".filter button").forEach((item) => {
      item.classList.remove("aktif");
    });

    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(
        proyek.filter((item) => item.kategori === kategori)
      );
    }
  });
}

async function muatProyek() {
  if (jumlahProyek) {
    jumlahProyek.textContent = "Memuat proyek...";
  }

  try {
    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error("Data proyek gagal dimuat");
    }

    proyek = await response.json();

    tampilkanProyek(proyek);

    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-js", "JavaScript");

  } catch (error) {
    console.error("Error:", error);

    if (jumlahProyek) {
      jumlahProyek.textContent = "Data proyek gagal dimuat.";
    }
  }
}

if (daftarProyek) {
  muatProyek();
}


// 5. Animasi menu ponsel
document.querySelectorAll(".menu-ponsel").forEach((menu) => {
  const summary = menu.querySelector("summary");

  if (!summary) return;

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    if (menu.open) {
      menu.classList.add("menutup");

      setTimeout(() => {
        menu.open = false;
        menu.classList.remove("menutup");
      }, 400);

    } else {
      menu.open = true;
      menu.classList.remove("menutup");
    }
  });
});


// 6. Repositori GitHub
const username = "masychunsindu01";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();
    daftarRepo.innerHTML = "";

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");

      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = repo.name;

      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent =
      `${repos.length} repositori yang terakhir diperbarui:`;

  } catch (error) {
    statusRepo.textContent =
      "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";

    console.error(error);
  }
}

if (daftarRepo && statusRepo) {
  ambilRepo();
}
