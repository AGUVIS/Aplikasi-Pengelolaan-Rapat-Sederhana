/*
 * Autentikasi sisi-klien untuk prototipe Rapatku (tanpa server).
 * Akun dikelola di array USERS di bawah. Untuk backend sungguhan, ganti isi
 * fungsi login() dengan pemanggilan API dan simpan token sebagai sesi.
 */
const Auth = (() => {
  const SESSION_KEY = "rapatku.session";

  const USERS = [
    { email: "ridho@rapatku.id", password: "rapatku123", name: "Ridho Mardiansyah" },
  ];

  const stores = () => {
    const list = [];
    try { list.push(window.sessionStorage); } catch (_) { /* diblokir */ }
    try { list.push(window.localStorage); } catch (_) { /* diblokir */ }
    return list;
  };

  function current() {
    for (const store of stores()) {
      try {
        const raw = store.getItem(SESSION_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (data && data.email && data.name) return data;
        }
      } catch (_) { /* data rusak: abaikan */ }
    }
    return null;
  }

  function login(email, password, remember) {
    const mail = String(email || "").trim().toLowerCase();
    const user = USERS.find((u) => u.email === mail && u.password === password);
    if (!user) {
      return { ok: false, message: "Email atau password salah. Silakan coba lagi." };
    }

    const session = JSON.stringify({ email: user.email, name: user.name, at: Date.now() });
    logout();
    try {
      // "Ingat saya" -> bertahan setelah browser ditutup (localStorage),
      // jika tidak -> hanya selama tab terbuka (sessionStorage).
      (remember ? window.localStorage : window.sessionStorage).setItem(SESSION_KEY, session);
    } catch (_) {
      return { ok: false, message: "Browser memblokir penyimpanan. Aktifkan penyimpanan situs lalu coba lagi." };
    }
    return { ok: true, user: { email: user.email, name: user.name } };
  }

  function logout() {
    for (const store of stores()) {
      try { store.removeItem(SESSION_KEY); } catch (_) { /* abaikan */ }
    }
  }

  // Dipanggil di <head> halaman yang dilindungi agar tidak sempat tampil sebelum redirect.
  function requireAuth(loginPage = "index.html") {
    if (!current()) location.replace(loginPage);
  }

  return { current, login, logout, requireAuth };
})();

// Sembunyikan gambar yang gagal dimuat (mis. aset Figma belum ditaruh di folder assets/)
// supaya tampilan tidak dipenuhi ikon gambar rusak.
(() => {
  const hide = (img) => { img.style.visibility = "hidden"; };
  document.addEventListener("error", (e) => {
    if (e.target instanceof HTMLImageElement) hide(e.target);
  }, true);
  window.addEventListener("load", () => {
    document.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) hide(img);
    });
  });
})();
