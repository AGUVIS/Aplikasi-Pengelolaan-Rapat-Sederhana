(() => {
  const user = Auth.current();
  if (!user) return; // requireAuth() di <head> sudah mengalihkan ke halaman login

  const ICON = (name) => `assets/dashboard/${name}.svg`;
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- Data contoh (ganti dengan data dari API) ---------- */
  const MEETINGS = [
    { title: "Rapat Koordinasi Mingguan", live: true,  time: "09:00-10:00 WIB", room: "Ruang 1", total: 8, present: "6/8 Hadir" },
    { title: "Rapat Koordinasi Mingguan", live: false, time: "10:30-11:30 WIB", room: "Ruang 1", total: 8, countdown: "Dimulai dalam 30 menit" },
    { title: "Rapat Koordinasi Mingguan", live: false, time: "12:00-12:30 WIB", room: "Ruang 1", total: 8, countdown: "Dimulai dalam 15 menit" },
    { title: "Rapat Koordinasi Mingguan", live: false, time: "15:00-15:30 WIB", room: "Ruang 1", total: 8, countdown: "Dimulai dalam 15 menit" },
  ];
  const ATTENDEES = [["RM", "av-1"], ["JL", "av-2"], ["MB", "av-3"], ["+5", "av-4"]];

  // Tanggal rapat pada kalender (YYYY-MM-DD)
  const EVENT_DATES = new Set(["2026-10-06", "2026-10-07", "2026-10-14", "2026-10-20"]);

  const TASKS = [
    { title: "Finalisasi proposal campaign",  sub: "Koordinasi Marketing", due: "Hari ini", today: true,  owner: "AP", done: false },
    { title: "Kirim revisi desain dashboard", sub: "Review Desain Website", due: "Hari ini", today: true,  owner: "SN", done: false },
    { title: "Update timeline pengembangan",  sub: "Evaluasi Sprint 12",    due: "21 Okt",   today: false, owner: "RH", done: false },
    { title: "Susun notulensi rapat mingguan", sub: "Rapat Koordinasi Mingguan", due: "28 Okt", today: false, owner: "RM", done: false },
    { title: "Kirim undangan rapat evaluasi", sub: "Evaluasi Sprint 12",    due: "30 Okt",   today: false, owner: "JL", done: false },
  ];
  const INVITES_COUNT = 5;
  const VISIBLE_TASKS = 2; // sesuai desain: 2 tugas terlihat, sisanya lewat "Lihat semua tugas"

  const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  /* ---------- Helper ---------- */
  function h(tag, props = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (key === "class") el.className = value;
      else if (key === "text") el.textContent = value;
      else if (key.startsWith("on")) el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid);
    return el;
  }

  const icon = (name, w, hgt) => h("img", { src: ICON(name), alt: "", width: w, height: hgt });

  let toastTimer;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
  }

  /* ---------- Profil, salam, logout ---------- */
  $("#profile-name").textContent = user.name;
  $("#profile-mail").textContent = user.email;
  $("#greeting").textContent = `Halo, ${user.name}`;
  document.title = `Dashboard | Rapatku`;

  const profileBtn = $("#profile-btn");
  const profileMenu = $("#profile-menu");

  function setMenu(open) {
    profileMenu.hidden = !open;
    profileBtn.setAttribute("aria-expanded", String(open));
  }

  profileBtn.addEventListener("click", (e) => { e.stopPropagation(); setMenu(profileMenu.hidden); });
  document.addEventListener("click", (e) => { if (!profileMenu.contains(e.target)) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  $("#logout-btn").addEventListener("click", () => {
    Auth.logout();
    location.replace("index.html");
  });

  /* ---------- Tombol yang belum punya halaman ---------- */
  document.querySelectorAll("[data-soon]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); toast(`Halaman ${a.dataset.soon} belum tersedia.`); })
  );
  $("#btn-new").addEventListener("click", () => toast("Form buat jadwal belum tersedia."));
  $("#tasks-more").addEventListener("click", () => toast("Opsi tindak lanjut belum tersedia."));

  const bell = $("#bell");
  bell.classList.add("has-unread");
  bell.addEventListener("click", () => { bell.classList.remove("has-unread"); toast("Tidak ada notifikasi baru."); });

  /* ---------- Ringkasan ---------- */
  function renderStats() {
    const open = TASKS.filter((t) => !t.done).length;
    const monthEvents = [...EVENT_DATES].filter((d) => d.startsWith("2026-10")).length;
    const items = [
      ["Rapat bulan ini", monthEvents],
      ["Rapat hari ini", MEETINGS.length],
      ["Undangan baru", INVITES_COUNT],
      ["Tindak lanjut", open],
    ];
    const root = $("#stats");
    root.replaceChildren(
      ...items.map(([label, value]) =>
        h("article", { class: "stat" }, h("p", { class: "stat-label", text: label }), h("p", { class: "stat-value", text: String(value) }))
      )
    );
  }

  /* ---------- Kartu rapat ---------- */
  function meetingCard(m) {
    const actions = h("div", { class: "m-actions" });
    if (!m.live) actions.append(h("button", { type: "button", class: "pill-btn", text: "Edit", onclick: () => toast(`Edit rapat pukul ${m.time} belum tersedia.`) }));
    actions.append(h("button", { type: "button", class: "pill-btn", text: "Gabung", onclick: () => toast(`Menggabung ke ${m.room}…`) }));

    return h(
      "article",
      { class: "meeting" + (m.live ? " is-live" : "") },
      m.countdown ? h("span", { class: "m-countdown", text: m.countdown }) : null,
      h("p", { class: "m-status", text: m.live ? "Rapat sedang berlangsung" : "Rapat berikutnya" }),
      h("h3", { class: "m-title", text: m.title }),
      h("div", { class: "m-meta" },
        h("span", {}, icon("clock-white", 19, 18), m.time),
        h("span", {}, icon("location", 16, 16), m.room)
      ),
      h("div", { class: "m-foot" },
        h("div", { class: "avatars" }, ATTENDEES.map(([t, c]) => h("span", { class: `av ${c}`, text: t }))),
        h("span", { text: `${m.total} Peserta` }),
        m.present ? h("span", { class: "gap-left", text: m.present }) : null
      ),
      actions
    );
  }

  function renderMeetings(query = "") {
    const q = query.trim().toLowerCase();
    const list = MEETINGS.filter((m) => !q || [m.title, m.time, m.room].join(" ").toLowerCase().includes(q));
    const root = $("#meetings");
    root.replaceChildren(...(list.length ? list.map(meetingCard) : [h("p", { class: "empty", text: "Tidak ada rapat yang cocok dengan pencarian." })]));
  }

  $("#search").addEventListener("input", (e) => renderMeetings(e.target.value));

  /* ---------- Kalender ---------- */
  const today = new Date();
  let view = { year: today.getFullYear(), month: today.getMonth() };
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

  function renderCalendar() {
    const { year, month } = view;
    const first = new Date(year, month, 1).getDay();       // 0 = Minggu
    const days = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const cells = Math.ceil((first + days) / 7) * 7;
    const nodes = [];
    let eventCount = 0;

    for (let i = 0; i < cells; i++) {
      const day = i - first + 1;
      let cls = "cal-day";
      let label;
      if (day < 1) { label = prevDays + day; cls += " is-out"; }
      else if (day > days) { label = day - days; cls += " is-out"; }
      else {
        label = day;
        const key = iso(year, month, day);
        if (EVENT_DATES.has(key)) { cls += " has-event"; eventCount++; }
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) cls += " is-today";
      }
      nodes.push(h("span", { class: cls, text: String(label) }));
    }

    $("#cal-grid").replaceChildren(...nodes);
    $("#cal-month").textContent = MONTHS[month] + (year !== today.getFullYear() ? ` ${year}` : "");
    $("#cal-count").textContent = `${eventCount} Rapat bulan ini`;
  }

  function shiftMonth(delta) {
    const d = new Date(view.year, view.month + delta, 1);
    view = { year: d.getFullYear(), month: d.getMonth() };
    renderCalendar();
  }

  $("#cal-prev").addEventListener("click", () => shiftMonth(-1));
  $("#cal-next").addEventListener("click", () => shiftMonth(1));

  $("#summary-month").textContent = `${MONTHS[today.getMonth()]} ${today.getFullYear()}`;

  /* ---------- Tindak lanjut ---------- */
  let showAll = false;

  function renderTasks() {
    const list = showAll ? TASKS : TASKS.slice(0, VISIBLE_TASKS);
    const root = $("#task-list");

    root.replaceChildren(
      ...list.map((t, i) => {
        const id = `task-${i}`;
        const box = h("input", { type: "checkbox", id, "aria-labelledby": `${id}-t` });
        box.checked = t.done;
        box.addEventListener("change", () => {
          t.done = box.checked;
          renderTasks();
          renderStats();
        });
        return h("li", { class: "task" + (t.done ? " is-done" : "") },
          box,
          h("div", { class: "task-info" },
            h("p", { class: "task-title", id: `${id}-t`, text: t.title }),
            h("p", { class: "task-sub", text: t.sub }),
            h("div", { class: "task-meta" },
              h("span", { class: "task-due" + (t.today ? " is-today" : "") }, icon(t.today ? "clock-amber" : "clock-gray", 10, 10), t.due),
              h("span", { class: "task-av", text: t.owner })
            )
          )
        );
      })
    );

    $("#tasks-count").textContent = String(TASKS.filter((t) => !t.done).length);
    const toggle = $("#tasks-toggle");
    toggle.hidden = TASKS.length <= VISIBLE_TASKS;
    toggle.textContent = showAll ? "Tampilkan lebih sedikit  ↑" : "Lihat semua tugas  →";
  }

  $("#tasks-toggle").addEventListener("click", () => { showAll = !showAll; renderTasks(); });

  /* ---------- Render awal ---------- */
  renderStats();
  renderMeetings();
  renderCalendar();
  renderTasks();
})();
