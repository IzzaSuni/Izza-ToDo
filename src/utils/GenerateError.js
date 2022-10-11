const generateErrEmail = (content, type) => {
  if (type === "email") {
    if (content.length === 0) return " ";
    else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(content) === false
    )
      return "format e-mail salah ❌";
    else if (content.length > 0 && content.indexOf("@") === -1)
      return "format e-mail salah ❌";
    else return "format e-mail sesuai ✔️";
  } else {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (content.length === 0) return "";
    if (content.length > 0 && content.length < 6)
      return "minimal password 6 karakter ❌";
    else if (/[A-Z]/.test(content) === false)
      return "Password wajib terdapat huruf kapital ❌";
    else if (/\d/.test(content) === false)
      return "Password wajib terdapat angka ❌";
    else if (format.test(content) === false)
      return "Password wajib terdapat karakter spesial (!@#$%^&*) ❌";
    else return "Password ✔️";
  }
};

export default generateErrEmail;
