(() => {
  // Sudah login? langsung ke dashboard.
  if (Auth.current()) {
    location.replace("dashboard.html");
    return;
  }

  const form = document.getElementById("login-form");
  const email = document.getElementById("email");
  const pw = document.getElementById("password");
  const remember = form.elements.remember;
  const toggle = document.getElementById("toggle-password");
  const errorBox = document.getElementById("form-error");
  const submitBtn = form.querySelector(".btn-login");

  // Tampilkan / sembunyikan password
  toggle.addEventListener("click", () => {
    const show = pw.type === "password";
    pw.type = show ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(show));
    toggle.setAttribute("aria-label", show ? "Sembunyikan password" : "Tampilkan password");
  });

  function showError(message, field) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    [email, pw].forEach((el) => el.setAttribute("aria-invalid", String(el === field || field === "both")));
    if (field && field !== "both") field.focus();
  }

  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
    [email, pw].forEach((el) => el.removeAttribute("aria-invalid"));
  }

  [email, pw].forEach((el) => el.addEventListener("input", clearError));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    const mail = email.value.trim();
    if (!mail) return showError("Alamat email wajib diisi.", email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return showError("Format email tidak valid.", email);
    if (!pw.value) return showError("Password wajib diisi.", pw);

    submitBtn.disabled = true;
    const result = Auth.login(mail, pw.value, remember.checked);
    if (!result.ok) {
      submitBtn.disabled = false;
      return showError(result.message, "both");
    }
    location.href = "dashboard.html";
  });
})();
