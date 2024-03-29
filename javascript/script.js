// QUERY ICON
const clockIcon = document.querySelector(".ri-time-line");
const alarmIcon = document.querySelector(".ri-alarm-line");
const timerIcon = document.querySelector(".ri-timer-line");
const couthdownIcon = document.querySelector(".ri-hourglass-2-line");

// QUERY CLOCK SECTION
const searchForm = document.querySelector("form");
const clockContainer = document.querySelector(".clock-container");
const locationEl = document.querySelector(".location");
const clockEl = document.querySelector(".clock");
const dateEl = document.querySelector(".date");

// QUERY ALARM SECTION
const alarmContainer = document.querySelector(".alarm-container");
const setAlarmButton = document.querySelector(".setAlarmButton");

// QUERY STOPWATCH SECTION
const stopwatchContainer = document.querySelector(".stopwatch-container");
const stopwatchEl = document.querySelector(".stopwatch");
const stopwatchBtns = document.querySelector(".stopwatch-buttons");
const startBtn = document.querySelector(".start");
const flagBtn = document.querySelector(".flag");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const stopwatchDisplay = document.querySelector(".display-stopwatch");

// QUERY TIMER SECTION
const timerContainer = document.querySelector(".timer-container");
const timerInput = document.querySelector(".timer-input");
const timer = document.querySelector(".timer");
const timerBtnStart = document.querySelector(".timer-start");
const timerBtnPause = document.querySelector(".timer-pause");
const timerBtnReset = document.querySelector(".timer-reset");

// Variabel Awal
let stopwatch;
let startTime;
let pausedTime;
let formattedTime;
let running = false;
let timerInterval;
let totalSeconds;
let pausedTotalSecond;

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
      locationEl.style.display = "block";
      clockEl.style.display = "block";
      dateEl.style.display = "block";
      clockContainer.style.marginTop = "100px";
      alarmContainer.classList.add("hidden");
      stopwatchContainer.classList.add("hidden");
      timerContainer.classList.add("hidden");
      break;
    case 2:
      searchForm.style.display = "none";
      locationEl.style.display = "none";
      clockEl.style.display = "block";
      dateEl.style.display = "none";
      clockContainer.style.margin = "0px";
      alarmContainer.classList.remove("hidden");
      stopwatchContainer.classList.add("hidden");
      timerContainer.classList.add("hidden");
      break;
    case 3:
      searchForm.style.display = "none";
      locationEl.style.display = "none";
      clockEl.style.display = "none";
      dateEl.style.display = "none";
      clockContainer.style.margin = "0px";
      stopwatchContainer.classList.remove("hidden")
      alarmContainer.classList.add("hidden");
      timerContainer.classList.add("hidden");
      break;
    case 4:
      searchForm.style.display = "none";
      locationEl.style.display = "none";
      clockEl.style.display = "none";
      dateEl.style.display = "none";
      stopwatchContainer.classList.add("hidden")
      alarmContainer.classList.add("hidden");
      timerContainer.classList.remove("hidden");
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

function startStopwatch() {
  startBtn.classList.add("hidden");
  flagBtn.classList.remove("hidden");
  pauseBtn.classList.remove("hidden");
  resetBtn.classList.add("hidden");

  if (!running) {
    if (startTime === undefined) {
      // Jika stopwatch belum pernah dijalankan atau di-reset
      startTime = new Date().getTime();
    } else {
      // Jika stopwatch pernah dihentikan, gunakan waktu terakhir
      startTime = new Date().getTime() - pausedTime;
    }

    stopwatch = setInterval(updateStopwatch, 10);
    running = true;
  }
}

function stopStopwatch() {
  flagBtn.classList.add("hidden");
  pauseBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  startBtn.classList.remove("hidden");

  // Jika stopwatch sedang berjalan, dan tombol stop di tekan
  if (running) {
    clearInterval(stopwatch);
    running = false;
    pausedTime = new Date().getTime() - startTime; // Simpan waktu terhenti
  }
}

function resetStopwatch() {
  resetBtn.classList.add("hidden");

  stopStopwatch();
  startTime = undefined; // Reset waktu awal
  stopwatchEl.innerText = "00:00.00";
  stopwatchDisplay.innerHTML = "";
}

function flagStopwatch(formattedTime) {
  const stopwatchFlag = document.createElement("div");
  stopwatchFlag.classList.add("stopwatch-flag");

  const stopwatchFlagNumber = document.createElement("div");
  stopwatchFlagNumber.classList.add("stopwatch-flag-number");

  const newFlag = document.createElement("i");
  newFlag.classList.add("ri-flag-2-fill");

  const stopwatchFlagStop = document.createElement("div");
  stopwatchFlagStop.classList.add("stopwatch-flag-stop");
  stopwatchFlagStop.innerHTML = `+ ${formattedTime}`;

  const stopwatchFlagMarker = document.createElement("div");
  stopwatchFlagMarker.classList.add("stopwatch-flag-marker");
  stopwatchFlagMarker.innerHTML = formattedTime;

  stopwatchFlagNumber.prepend(newFlag);

  stopwatchFlag.appendChild(stopwatchFlagNumber);
  stopwatchFlag.appendChild(stopwatchFlagStop);
  stopwatchFlag.appendChild(stopwatchFlagMarker);
  stopwatchDisplay.prepend(stopwatchFlag);
}

function updateStopwatch() {
  const currentTime = new Date().getTime();
  const elapsedMilliseconds = currentTime - startTime;

  const minutes = Math.floor(elapsedMilliseconds / (60 * 1000));
  const seconds = Math.floor((elapsedMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((elapsedMilliseconds % 1000) / 10);

  formattedTime = `${pad(minutes)}:${pad(seconds)}.${pad(
    milliseconds
  )}`;
  stopwatchEl.innerText = formattedTime;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}

function startTimer() {
  timerInput.classList.add("hidden");
  timer.classList.remove("hidden");
  timerBtnStart.classList.add("hidden");
  timerBtnPause.classList.remove("hidden");
  timerBtnReset.classList.remove("hidden");

  // Mengambil nilai input dari user
  let hours = parseInt(timerInput.querySelector('input:nth-child(1)').value) || 0;
  let minutes = parseInt(timerInput.querySelector('input:nth-child(2)').value) || 0;
  let seconds = parseInt(timerInput.querySelector('input:nth-child(3)').value) || 0;

  // Menghitung total detik dari input
  totalSeconds = pausedTotalSecond || (hours * 3600 + minutes * 60 + seconds);

  timer.innerText = formatTime(totalSeconds);

  // Mengurangi nilai total detik setiap detik 
  timerInterval = setInterval(function () {
    // Ketika total detik 0
    if (totalSeconds <= 0) {
      alert("Timer Selesai");

      clearInterval(timerInterval);

      timerInput.classList.remove("hidden");
      timer.classList.add("hidden");
      timerBtnStart.classList.remove("hidden");
      timerBtnPause.classList.add("hidden");
      timerBtnReset.classList.add("hidden");
    } else {
      totalSeconds--;
      timer.innerText = formatTime(totalSeconds);
    }

    pausedTotalSecond = "";
  }, 1000);
}

// Mengonversi nilai total detik menjadi HH:MM:SS
function formatTime(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = seconds % 60;

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}


function pauseTimer() {
  timerBtnPause.classList.add("hidden");
  timerBtnStart.classList.remove("hidden");

  if (timerInterval) {
    clearInterval(timerInterval);
    pausedTotalSecond = totalSeconds;
  }
}

function resetTimer() {
  timer.classList.add("hidden");
  timerBtnPause.classList.add("hidden");
  timerBtnReset.classList.add("hidden");
  timerInput.classList.remove("hidden");
  timerBtnStart.classList.remove("hidden");

  clearInterval(timerInterval);
}




