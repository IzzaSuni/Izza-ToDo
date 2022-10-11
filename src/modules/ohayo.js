export default function Ohayo(inbetween) {
  const myDate = new Date();
  const currentHour = myDate.getHours();

  let msg;
  if (currentHour >= 2 && currentHour <= 11)
    msg = `Selamat Pagi ${inbetween ? inbetween : ""} yuk semangat 🤩`;
  else if (currentHour >= 11 && currentHour <= 14)
    msg = `Selamat Siang  ${
      inbetween ? inbetween : ""
    } semangat walau ngantuk 😃 `;
  else if (currentHour >= 14 && currentHour <= 18)
    msg = `Selamat Sore  ${inbetween ? inbetween : ""} 🙂`;
  else if (currentHour >= 18 && currentHour <= 22)
    msg = `Selamat Petang  ${inbetween ? inbetween : ""} 👀 `;
  else if (currentHour >= 22 || currentHour <= 2)
    msg = `Udah larut Malam nih  ${inbetween ? inbetween : ""}! yuk tidur😴`;
  return msg;
}
