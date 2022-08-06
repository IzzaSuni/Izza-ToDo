export default function Ohayo() {
  const myDate = new Date();
  const currentHour = myDate.getHours();
  let msg;

  if (currentHour >= 2 && currentHour <= 11)
    msg = "Selamat Pagi🤩, yuk semangat ";
  else if (currentHour >= 11 && currentHour <= 14)
    msg = "Selamat Siang 😃 ngantuk nih 😪";
  else if (currentHour >= 14 && currentHour <= 18) msg = "Selamat Sore 🙂";
  else if (currentHour >= 18 && currentHour <= 22) msg = "Selamat Petang 👀";
  else if ((currentHour >= 22 && currentHour <= 2) || currentHour == 0)
    msg = "Udah larut Malam🥶! yuk tidur😴";
  return msg;
}
