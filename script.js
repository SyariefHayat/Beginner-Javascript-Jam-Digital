function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var day = now.toLocaleDateString('id-ID', { weekday: 'long' }); // Get Full Nama Hari
  var date = now.getDate();
  var month = now.toLocaleDateString('id-ID', { month: 'long' }); // Get Full Nama Bulan
  var year = now.getFullYear();

  // Jika Waktu Lebih Kecil Dari 10 
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;
  var dateString = day + ', ' + date + ' ' + month + ' ' + year;

  // Menampilkan Jam Di Halaman Web
  document.querySelector('.clock').innerHTML = timeString;
  document.querySelector('.date').innerHTML = dateString;
}

// Menjalankan Fungsi Update Clock Setiap 1 Detik
setInterval(updateClock, 1000);

// Menjalankan Fungsi Update Clock Untuk Pertama Kali
updateClock();


