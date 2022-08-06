export default function Ohayo() {
  var myDate = new Date();
  var currentHour = myDate.getHours();

  var msg;

  if (currentHour < 12) msg = "Selamat Pagi 😊";
  else if (currentHour == 12) msg = "Selamat Siang 🙂";
  else if (currentHour >= 12 && currentHour <= 17) msg = "Selamat Sore 😃";
  else if (currentHour >= 17 && currentHour <= 24) msg = "Selamat Petang 👀";
  return msg;
}
