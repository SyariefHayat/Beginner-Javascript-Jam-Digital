const clockIcon = document.querySelector(".ri-time-line");
const alarmIcon = document.querySelector(".ri-alarm-line");
const timerIcon = document.querySelector(".ri-timer-line");
const couthdownIcon = document.querySelector(".ri-hourglass-2-line");
const searchForm = document.querySelector("form");
const clockContainer = document.querySelector(".clock-container");
const alarmContainer = document.querySelector(".alarm-container");
const locationEl = document.querySelector(".location");
const clockEl = document.querySelector(".clock");
const dateEl = document.querySelector(".date");
const setAlarmButton = document.querySelector(".setAlarmButton");

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let day = now.toLocaleDateString('id-ID', { weekday: 'long' }); // Get Full Nama Hari
  let date = now.getDate();
  let month = now.toLocaleDateString('id-ID', { month: 'long' }); // Get Full Nama Bulan
  let year = now.getFullYear();

  // Jika Waktu Lebih Kecil Dari 10 
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  let timeString = hours + ':' + minutes + ':' + seconds;
  let dateString = day + ', ' + date + ' ' + month + ' ' + year;

  // Menampilkan Jam Di Halaman Web
  clockEl.innerHTML = timeString;
  dateEl.innerHTML = dateString;
}

// Menjalankan Fungsi Update Clock Setiap 1 Detik
setInterval(updateClock, 1000);

// Menjalankan Fungsi Update Clock Untuk Pertama Kali
updateClock();

function activeIcon(n) {
  const navigationIcons = document.querySelectorAll("nav i");

  // Menghapus class active pada semua icon
  for (let i = 0; i < navigationIcons.length; i++) {
    navigationIcons[i].classList.remove("active");
  }

  // Menambahkan class active pada icon yang di tekan
  navigationIcons[n - 1].classList.add("active");

  // Merubah kontent dalam main sesuai dengan icon yang di tekan
  switch (n) {
    case 1:
      searchForm.style.display = "flex";
      locationEl.style.display = "inherit";
      dateEl.style.display = "inherit";
      clockContainer.style.marginTop = "100px";
      alarmContainer.classList.add("hidden");
      break;
    case 2:
      searchForm.style.display = "none";
      locationEl.style.display = "none";
      dateEl.style.display = "none";
      clockContainer.style.margin = "0px";
      alarmContainer.classList.remove("hidden");
      break;
  }
}

setAlarmButton.addEventListener("click", () => {
  // Dapatkan nilai jam dan menit dari input
  const hoursInput = document.getElementById("hoursInput").value;
  const minutesInput = document.getElementById("minutesInput").value;

  // Validasi input user
  if (hoursInput > 23 && minutesInput > 59) {
    alert("Yang Anda Masukkan Tidak Valid");
    return;
  } else if (hoursInput > 23) {
    alert("Jam Yang Anda Masukkan Tidak Valid. Tolong Masukkan Angka Dari (00-23)");
    return;
  } else if (minutesInput > 59) {
    alert("Menit Yang Anda Masukkan Tidak Valid. Tolong Masukkan Angka Dari (00-59)");
    return;
  } else if (hoursInput === "" || minutesInput === "") {
    alert("Anda Belum Memasukkan Jam Dan Menit");
    return;
  }

  const displayAlarm = document.querySelector(".display-alarm");

  const newAlarm = document.createElement("div");
  newAlarm.classList.add("alarm");
  const clearAlarm = document.createElement("i");
  clearAlarm.classList.add("ri-delete-bin-6-line");

  // Gunakan padStart untuk menambahkan nol jika angka kurang dari 10
  const paddedHours = String(hoursInput).padStart(2, '0');
  const paddedMinutes = String(minutesInput).padStart(2, '0');

  newAlarm.textContent = `${paddedHours}:${paddedMinutes}`;
  displayAlarm.appendChild(newAlarm);
  newAlarm.appendChild(clearAlarm);

  clearAlarm.addEventListener("click", (e) => {
    const clickedAlarm = e.target.parentNode;

    clickedAlarm.classList.add("hidden");
  })
});






