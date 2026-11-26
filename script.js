// GANTI DATA DI BAGIAN CONFIG INI DENGAN DATA PERNIKAHAN SEBENARNYA.
const CONFIG = {
  bride: "Alya Putri",
  groom: "Arkan Pratama",
  dateText: "Minggu, 20 Desember 2026",
  dateShort: "20 · 12 · 2026",
  weddingDate: "2026-12-20T08:00:00+08:00",
  whatsappNumber: "6281234567890", // Nomor WA dengan kode negara, tanpa tanda +
  mapUrl: "https://maps.google.com",
  guest: new URLSearchParams(location.search).get("to") || "Bapak/Ibu/Saudara/i"
};
const fullNames = `${CONFIG.bride} & ${CONFIG.groom}`;
document.title = `Undangan Pernikahan | ${fullNames}`;
for (const id of ["openingNames","heroNames"]) {
  document.getElementById(id).innerHTML = `${CONFIG.bride} <span>&</span> ${CONFIG.groom}`;
}
document.getElementById("letterNames").textContent = fullNames;
document.getElementById("closingNames").textContent = fullNames;
document.getElementById("brideName").textContent = CONFIG.bride;
document.getElementById("groomName").textContent = CONFIG.groom;
document.getElementById("openingDate").textContent = CONFIG.dateShort;
document.getElementById("heroDate").textContent = CONFIG.dateShort;
document.getElementById("akadDate").textContent = CONFIG.dateText;
document.getElementById("receptionDate").textContent = CONFIG.dateText;
document.getElementById("guestName").textContent = CONFIG.guest;
document.getElementById("mapLink").href = CONFIG.mapUrl;
document.getElementById("year").textContent = new Date().getFullYear();
document.body.classList.add("locked");

document.getElementById("openInvitation").addEventListener("click", () => {
  const envelope = document.getElementById("envelope");
  envelope.classList.add("open");
  setTimeout(() => {
    document.getElementById("opening").classList.add("hide");
    document.body.classList.remove("locked");
  }, 1150);
});

function countdown() {
  const diff = new Date(CONFIG.weddingDate).getTime() - Date.now();
  const v = diff <= 0 ? [0,0,0,0] : [
    Math.floor(diff/86400000),
    Math.floor(diff%86400000/3600000),
    Math.floor(diff%3600000/60000),
    Math.floor(diff%60000/1000)
  ];
  ["days","hours","minutes","seconds"].forEach((id,i)=>document.getElementById(id).textContent=String(v[i]).padStart(2,"0"));
}
countdown(); setInterval(countdown,1000);

document.getElementById("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("rsvpName").value.trim();
  const status=document.getElementById("rsvpStatus").value;
  const count=document.getElementById("rsvpCount").value;
  const msg=`Assalamu'alaikum, saya ${name}. Konfirmasi kehadiran: ${status}. Jumlah tamu: ${count}.`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
});
