/*
  PENGATURAN UNDANGAN:
  Ganti nilai di bawah ini sesuai data pernikahan.
  Tanggal memakai format: YYYY-MM-DDTHH:MM:SS+08:00 untuk WITA.
*/
const CONFIG = {
  bride: "Alya Putri",
  groom: "Arkan Pratama",
  dateText: "Minggu, 20 Desember 2026",
  dateShort: "20 · 12 · 2026",
  weddingDate: "2026-12-20T08:00:00+08:00",
  guest: "Bapak/Ibu/Saudara/i",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp keluarga tanpa tanda +
  mapUrl: "https://maps.google.com", // Ganti dengan tautan lokasi Google Maps
  guestQuery: new URLSearchParams(location.search).get("to")
};

const names = `${CONFIG.bride} & ${CONFIG.groom}`;
document.title = `Undangan Pernikahan | ${names}`;
document.getElementById("coverNames").innerHTML = `${CONFIG.bride} <span>&</span> ${CONFIG.groom}`;
document.getElementById("heroNames").innerHTML = `${CONFIG.bride} <span>&</span> ${CONFIG.groom}`;
document.getElementById("closingNames").textContent = names;
document.getElementById("brideName").textContent = CONFIG.bride;
document.getElementById("groomName").textContent = CONFIG.groom;
document.getElementById("coverDate").textContent = CONFIG.dateText;
document.getElementById("heroDate").textContent = CONFIG.dateShort;
document.getElementById("akadDate").textContent = CONFIG.dateText;
document.getElementById("receptionDate").textContent = CONFIG.dateText;
document.getElementById("guestName").textContent = CONFIG.guestQuery || CONFIG.guest;
document.getElementById("mapLink").href = CONFIG.mapUrl;
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("openInvitation").addEventListener("click", () => {
  document.getElementById("cover").classList.add("closed");
  document.body.style.overflow = "auto";
});
document.body.style.overflow = "hidden";

function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const distance = target - Date.now();
  const values = distance <= 0 ? [0,0,0,0] : [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];
  ["days","hours","minutes","seconds"].forEach((id,i) => {
    document.getElementById(id).textContent = String(values[i]).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("rsvpName").value.trim();
  const status = document.getElementById("rsvpStatus").value;
  const count = document.getElementById("rsvpCount").value;
  const message = `Assalamu'alaikum, saya ${name}. Konfirmasi kehadiran: ${status}. Jumlah tamu: ${count}. Terima kasih.`;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
});
