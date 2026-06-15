/* =========================================================================
   All-in-One Premiums — script.js
   ========================================================================= */

/* -------------------------------------------------------------------------
   TELEGRAM CONFIGURATION (preserved exactly — token, chat id, format)
   -------------------------------------------------------------------------
   ⚠️ This token is PUBLIC to anyone viewing the site. For real protection,
   move sendTelegram() to a serverless function. Kept here per request.
   >>> REPLACE BOT TOKEN: edit TELEGRAM_BOT_TOKEN.   >>> CHAT ID: TELEGRAM_CHAT_ID.
   ------------------------------------------------------------------------- */                                   // <-- replace with your chat ID
const TELEGRAM_URL       = "https://t.me/evanjawad";

/* ===== Helpers ===== */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const touch   = matchMedia("(hover: none)").matches;
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

const Toast = (() => { const el = $("#toast"); let t; return (m) => { el.textContent = m; el.classList.add("show"); clearTimeout(t); t = setTimeout(() => el.classList.remove("show"), 2400); }; })();

/* ===== Cursor spotlight ===== */
(() => {
  if (touch || reduced) return;
  const g = $("#cursorGlow");
  addEventListener("mousemove", (e) => { g.style.opacity = "1"; g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px"; }, { passive: true });
  addEventListener("mouseleave", () => g.style.opacity = "0");
})();

/* ===== Navbar shrink ===== */
(() => { const w = $("#navWrap"); let tick = false;
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { w.classList.toggle("shrink", scrollY > 30); tick = false; }); } }, { passive: true });
})();

/* ===== Smooth anchors ===== */
$$("[data-scroll]").forEach(a => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href");
  if (id && id.startsWith("#")) { e.preventDefault(); const t = $(id); if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); closeDrawer(); }
}));

/* ===== Drawer ===== */
const drawer = $("#drawer"), scrim = $("#drawerScrim"), burger = $("#burger");
function openDrawer(){ drawer.classList.add("open"); scrim.classList.add("open"); burger.classList.add("open"); burger.setAttribute("aria-expanded","true"); document.body.classList.add("lock"); }
function closeDrawer(){ drawer.classList.remove("open"); scrim.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.body.classList.remove("lock"); }
burger.addEventListener("click", () => drawer.classList.contains("open") ? closeDrawer() : openDrawer());
scrim.addEventListener("click", closeDrawer);
$("#drawerX").addEventListener("click", closeDrawer);

/* ===== Reveal ===== */
(() => {
  const io = new IntersectionObserver((en) => en.forEach((x, i) => {
    if (x.isIntersecting) { setTimeout(() => x.target.classList.add("visible"), (i % 5) * 80); io.unobserve(x.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));
})();

/* ===== Counters ===== */
(() => {
  const io = new IntersectionObserver((en) => en.forEach(x => {
    if (!x.isIntersecting) return;
    const el = x.target, target = +el.dataset.target, suffix = el.dataset.suffix || "";
    if (reduced) { el.textContent = target + suffix; io.unobserve(el); return; }
    const dur = 1400, t0 = performance.now();
    (function step(now){ const p = Math.min((now - t0)/dur, 1); el.textContent = Math.round(target*(1-Math.pow(1-p,3))) + suffix; if (p < 1) requestAnimationFrame(step); })(t0);
    io.unobserve(el);
  }), { threshold: 0.5 });
  $$(".count").forEach(el => io.observe(el));
})();

/* ===== Magnetic + ripple (desktop + touch ripple) ===== */
(() => {
  if (!touch) $$(".magnetic").forEach(b => {
    b.addEventListener("mousemove", (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.16}px, ${(e.clientY-r.top-r.height/2)*0.28}px)`; });
    b.addEventListener("mouseleave", () => b.style.transform = "");
  });
  const addRipple = (b, x, y) => { const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height); const rip = document.createElement("span"); rip.className = "ripple"; rip.style.cssText = `width:${s}px;height:${s}px;left:${x-r.left-s/2}px;top:${y-r.top-s/2}px`; b.appendChild(rip); setTimeout(() => rip.remove(), 600); };
  $$(".btn").forEach(b => {
    b.addEventListener("click", (e) => addRipple(b, e.clientX, e.clientY));
    b.addEventListener("touchstart", (e) => { const t = e.touches[0]; addRipple(b, t.clientX, t.clientY); }, { passive: true });
  });
})();

/* ===== Card tilt + spotlight ===== */
$$(".tilt").forEach(card => {
  // inject spotlight layer
  const light = document.createElement("span"); light.className = "light"; light.setAttribute("aria-hidden","true");
  card.appendChild(light);
  if (touch) {
    card.addEventListener("touchstart", () => card.style.transform = "scale(.99)", { passive: true });
    card.addEventListener("touchend", () => card.style.transform = "");
    return;
  }
  if (reduced) return;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect(), px = (e.clientX - r.left)/r.width, py = (e.clientY - r.top)/r.height;
    card.style.transform = `perspective(1000px) rotateX(${(0.5-py)*6}deg) rotateY(${(px-0.5)*6}deg) translateY(-6px)`;
    card.style.setProperty("--sx", px*100 + "%"); card.style.setProperty("--sy", py*100 + "%");
    light.style.opacity = "1";
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; light.style.opacity = "0"; });
});

/* ===== Custom dropdowns ===== */
class Dropdown {
  static all = [];
  constructor(root, onChange){
    this.root = root; this.onChange = onChange; this.value = "";
    this.trigger = $(".select-trigger", root); this.valueEl = $(".select-value", root);
    this.options = $$("li[role=option]", root);
    this.trigger.addEventListener("click", (e) => { e.stopPropagation(); this.toggle(); });
    this.options.forEach(o => o.addEventListener("click", () => this.select(o.dataset.value, o.textContent)));
    document.addEventListener("click", (e) => { if (!root.contains(e.target)) this.close(); });
    Dropdown.all.push(this);
  }
  toggle(){ this.root.classList.contains("open") ? this.close() : this.open(); }
  open(){ Dropdown.all.forEach(d => d !== this && d.close()); this.root.classList.add("open"); this.trigger.setAttribute("aria-expanded","true"); }
  close(){ this.root.classList.remove("open"); this.trigger.setAttribute("aria-expanded","false"); }
  select(v, label){ this.value = v; this.valueEl.textContent = label; this.root.classList.add("has-value"); this.root.classList.remove("invalid"); this.options.forEach(o => o.classList.toggle("chosen", o.dataset.value === v)); this.close(); if (this.onChange) this.onChange(v); }
  setValue(v){ const o = this.options.find(x => x.dataset.value === v); if (o) this.select(v, o.textContent.trim()); }
  reset(ph){ this.value = ""; this.valueEl.textContent = ph; this.root.classList.remove("has-value"); this.options.forEach(o => o.classList.remove("chosen")); }
}
const planDD = new Dropdown($("#planSelect"), (v) => { updateSteps(); updatePlanInfo(v); });

const payDD  = new Dropdown($("#paySelect"), (v) => { showPayment(v); updateSteps(); });

/* ===== Step indicator ===== */
function updatePlanInfo(plan){
  const isPlus = /Premium\+/.test(plan || "");
  const notice = $("#plusNotice"), dbox = $("#deliveryBox"), dtext = $("#deliveryText");
  if (!plan) { if (notice) notice.hidden = true; if (dbox) dbox.hidden = true; return; }
  if (dbox && dtext) { dbox.hidden = false; dtext.textContent = isPlus ? "⏳ Estimated delivery: 1–3 hours" : "⚡ Estimated delivery: 5–30 minutes"; }
  if (notice) notice.hidden = !isPlus;
}

function updateSteps(){
  const u = $("#xUsername").value.trim(), tx = $("#txRef").value.trim();
  let step = 1;
  if (planDD.value && u) step = 2;
  if (planDD.value && u && payDD.value) step = 3;
  $$(".sb-item").forEach(it => it.classList.toggle("active", +it.dataset.step <= step));
}
["xUsername","txRef"].forEach(id => $("#"+id).addEventListener("input", updateSteps));

/* ===== Payment box ===== */
const payBox = $("#payBox");
function showPayment(m){ if (!m) { payBox.hidden = true; return; } payBox.hidden = false; $$(".pay-row", payBox).forEach(r => r.style.display = r.dataset.method === m ? "block" : "none"); }

/* ===== Copy ===== */
$$(".copy").forEach(b => b.addEventListener("click", async () => {
  const t = b.dataset.copy;
  try { await navigator.clipboard.writeText(t); }
  catch { const ta = document.createElement("textarea"); ta.value = t; ta.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
  const o = b.textContent; b.textContent = "✓ Copied Successfully"; b.classList.add("✓ Copied Successfully"); Toast("Copied to clipboard");
  setTimeout(() => { b.textContent = o; b.classList.remove("copied"); }, 1800);
}));

/* ===== Order modal ===== */
const orderModal = $("#orderModal"), orderView = $("#orderView"), successView = $("#successView");
const orderForm = $("#orderForm"), submitBtn = $("#submitBtn");
function openOrder(plan){ orderView.hidden = false; successView.hidden = true; if (plan) { planDD.setValue(plan); updatePlanInfo(plan); } else { updatePlanInfo(""); } updateSteps(); orderModal.classList.add("open"); orderModal.setAttribute("aria-hidden","false"); document.body.classList.add("lock"); closeDrawer(); setTimeout(() => $("#xUsername").focus(), 400); }

function closeOrder(){ orderModal.classList.remove("open"); orderModal.setAttribute("aria-hidden","true"); document.body.classList.remove("lock"); }
$$("[data-open-order]").forEach(b => b.addEventListener("click", () => openOrder()));
$$(".plan-btn").forEach(b => b.addEventListener("click", () => openOrder(b.dataset.plan)));
$("#modalClose").addEventListener("click", closeOrder);
$("#successClose").addEventListener("click", closeOrder);
orderModal.addEventListener("click", (e) => { if (e.target === orderModal) closeOrder(); });

/* ===== Validation ===== */
function setErr(f, k, m){ f.classList.add("invalid"); const e = $(`[data-err="${k}"]`); if (e) e.textContent = m; }
function clrErr(f, k){ f.classList.remove("invalid"); const e = $(`[data-err="${k}"]`); if (e) e.textContent = ""; }
["xUsername","xProfileLink","tgUsername","txRef"].forEach(id => $("#"+id).addEventListener("input", (e) => clrErr(e.target, id)));
$("#xProfilePic").addEventListener("change", (e) => clrErr(e.target, "xProfilePic"));


function validate(){
  let ok = true; const u = $("#xUsername"), link = $("#xProfileLink"), tg = $("#tgUsername"), tx = $("#txRef"), pic = $("#xProfilePic");
  if (!planDD.value)   { setErr($("#planSelect"), "planSelect", "Please select a plan."); ok = false; }
  if (!u.value.trim()) { setErr(u, "xUsername", "Please enter your X username."); ok = false; }
  const linkVal = link.value.trim();
  if (!linkVal) { setErr(link, "xProfileLink", "Please enter your X profile link."); ok = false; }
  else if (!/(?:x\.com|twitter\.com)/i.test(linkVal)) { setErr(link, "xProfileLink", "Enter a valid x.com or twitter.com link."); ok = false; }
  let tgVal = tg.value.trim();
  if (!tgVal) { setErr(tg, "tgUsername", "Please enter your Telegram username."); ok = false; }
  else {
    if (!tgVal.startsWith("@")) { tgVal = "@" + tgVal; tg.value = tgVal; }
    if (!/^@[A-Za-z0-9_]{3,}$/.test(tgVal)) { setErr(tg, "tgUsername", "Enter a valid Telegram username (e.g. @username)."); ok = false; }
  }
  if (pic.files && pic.files[0]) {
    if (!/^image\/(jpeg|png|webp)$/.test(pic.files[0].type)) { setErr(pic, "xProfilePic", "Use a JPG, PNG, or WEBP image."); ok = false; }
  }
  if (!payDD.value)    { setErr($("#paySelect"), "paySelect", "Please choose a payment method."); ok = false; }
  if (!tx.value.trim()){ setErr(tx, "txRef", "Enter your transaction reference."); ok = false; }
  return ok;
}



/* ===== Telegram (format preserved) ===== */

/* ===== Submit ===== */
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const picFile = $("#xProfilePic").files[0] || null;
  const order = {
    plan: planDD.value,
    username: $("#xUsername").value.trim(),
    xProfileLink: $("#xProfileLink").value.trim(),
    telegramUsername: $("#tgUsername").value.trim(),
    method: payDD.value,
    txRef: $("#txRef").value.trim(),
        orderId: "AIOP-" + Math.floor(100000 + Math.random() * 900000),

    time: new Date().toLocaleString(),
    hasPicture: picFile ? "Yes" : "No"
  };

  submitBtn.classList.add("loading"); submitBtn.disabled = true;

  try {
    const fd = new FormData();
    Object.keys(order).forEach(k => fd.append(k, order[k]));
    if (picFile) fd.append("profilePic", picFile);

    const res = await fetch("/api/notify", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Notify failed");
  } catch (err) {
    console.error(err);
    Toast("Order submitted (notification pending).");
  }

  $("#summary").innerHTML = `
      <div class="sc full"><small>Order ID</small><span>${esc(order.orderId)}</span></div>
    <div class="sc full"><small>Plan</small><span>${esc(order.plan)}</span></div>
    <div class="sc"><small>X Username</small><span>${esc(order.username)}</span></div>
    <div class="sc"><small>Telegram</small><span>${esc(order.telegramUsername)}</span></div>
    <div class="sc full"><small>X Profile Link</small><span>${esc(order.xProfileLink)}</span></div>
    <div class="sc"><small>Payment Method</small><span>${esc(order.method)}</span></div>
    <div class="sc"><small>Profile Picture</small><span>${order.hasPicture === "Yes" ? "Attached" : "Not attached"}</span></div>
    <div class="sc"><small>Time</small><span>${esc(order.time)}</span></div>
    <div class="sc full"><small>Reference</small><span>${esc(order.txRef)}</span></div>`;

  orderView.hidden = true; successView.hidden = false; orderModal.scrollTop = 0; confetti();
  orderForm.reset(); planDD.reset("Choose a plan"); payDD.reset("Choose a payment method"); payBox.hidden = true;
  submitBtn.classList.remove("loading"); submitBtn.disabled = false;
});


/* ===== Confetti ===== */
function confetti(){
  if (reduced) return;
  const c = $("#confetti"); if (!c) return;
  const ctx = c.getContext("2d"); const w = c.width = c.offsetWidth, h = c.height = c.offsetHeight;
  const cols = ["#7fb0ff","#9a8bff","#34d399","#e8b766","#ffffff"];
  const ps = Array.from({ length: 90 }, () => ({ x: w/2, y: h*0.32, r: Math.random()*5+3, vx: (Math.random()-0.5)*9, vy: Math.random()*-8-3, c: cols[Math.random()*cols.length|0], rot: Math.random()*6, vr: (Math.random()-0.5)*0.3, life: 1 }));
  let f = 0;
  (function draw(){ ctx.clearRect(0,0,w,h);
    ps.forEach(p => { p.vy += 0.28; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.012;
      ctx.save(); ctx.globalAlpha = Math.max(p.life,0); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6); ctx.restore(); });
    f++ < 130 ? requestAnimationFrame(draw) : ctx.clearRect(0,0,w,h);
  })();
}

/* ===== Support confirm modal ===== */
const dmModal = $("#dmModal");
function openDM(){ dmModal.classList.add("open"); dmModal.setAttribute("aria-hidden","false"); document.body.classList.add("lock"); closeDrawer(); }
function closeDM(){ dmModal.classList.remove("open"); dmModal.setAttribute("aria-hidden","true"); document.body.classList.remove("lock"); }
$$("[data-dm]").forEach(b => b.addEventListener("click", openDM));
$("#dmCancel").addEventListener("click", closeDM);
$("#dmConfirm").addEventListener("click", () => { window.open(TELEGRAM_URL, "_blank", "noopener"); closeDM(); });
$("#successContact").addEventListener("click", () => { closeOrder(); openDM(); });
dmModal.addEventListener("click", (e) => { if (e.target === dmModal) closeDM(); });

/* ===== Esc ===== */
addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (orderModal.classList.contains("open")) closeOrder();
  if (dmModal.classList.contains("open")) closeDM();
  if (drawer.classList.contains("open")) closeDrawer();
  Dropdown.all.forEach(d => d.close());
});

/* ===== FAQ accordion ===== */
$$(".faq-item").forEach(item => {
  const q = $(".faq-q", item), a = $(".faq-a", item);
  q.addEventListener("click", () => {
    const open = item.classList.contains("open");
    $$(".faq-item").forEach(o => { o.classList.remove("open"); $(".faq-q", o).setAttribute("aria-expanded","false"); $(".faq-a", o).style.maxHeight = null; });
    if (!open) { item.classList.add("open"); q.setAttribute("aria-expanded","true"); a.style.maxHeight = a.scrollHeight + "px"; }
  });
});

/* ===== Reviews carousel (autoplay + swipe) ===== */
(() => {
  const track = $("#track"); if (!track) return;
  const cards = $$(".review", track); let i = 0;
  const step = () => cards[0].offsetWidth + 20;
  const per = () => Math.max(1, Math.round(track.parentElement.offsetWidth / step()));
  const max = () => Math.max(0, cards.length - per());
  const go = (n) => { i = Math.min(Math.max(n, 0), max()); track.style.transform = `translateX(-${i * step()}px)`; };
  $("#next").addEventListener("click", () => go(i + 1));
  $("#prev").addEventListener("click", () => go(i - 1));
  let sx = 0, dx = 0, drag = false;
  track.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; drag = true; }, { passive: true });
  track.addEventListener("touchmove", (e) => { if (drag) dx = e.touches[0].clientX - sx; }, { passive: true });
  track.addEventListener("touchend", () => { if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); dx = 0; drag = false; });
  let timer = setInterval(() => go(i >= max() ? 0 : i + 1), 4800);
  track.parentElement.addEventListener("mouseenter", () => clearInterval(timer));
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => go(i), 150); });
})();

/* ===== Star particles (subtle) ===== */
(() => {
  if (reduced) return;
  const c = $("#stars"); if (!c) return;
  const ctx = c.getContext("2d"); let W, H, dpr = Math.min(devicePixelRatio || 1, 2), raf;
  function resize(){ W = c.width = innerWidth*dpr; H = c.height = innerHeight*dpr; c.style.width = innerWidth+"px"; c.style.height = innerHeight+"px"; }
  resize(); addEventListener("resize", resize);
  const stars = Array.from({ length: touch ? 40 : 80 }, () => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.3*dpr+0.3, a: Math.random(), tw: Math.random()*0.02+0.005 }));
  let last = 0; const gap = touch ? 1000/30 : 1000/60;
  function loop(ts){ raf = requestAnimationFrame(loop); if (ts-last < gap) return; last = ts;
    ctx.clearRect(0,0,W,H);
    stars.forEach(s => { s.a += s.tw; const al = 0.25 + Math.abs(Math.sin(s.a))*0.45; ctx.globalAlpha = al; ctx.fillStyle = "rgba(200,215,255,.9)"; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(loop);
  document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop); });
})();

/* ===== Floating glass 3D X glyphs (pointer-events:none) ===== */
(() => {
  if (reduced) return;
  const canvas = $("#scene"); if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, dpr = Math.min(devicePixelRatio || 1, touch ? 1.5 : 2), raf, t = 0, mx = 0, my = 0;
  function resize(){ W = canvas.width = innerWidth*dpr; H = canvas.height = innerHeight*dpr; canvas.style.width = innerWidth+"px"; canvas.style.height = innerHeight+"px"; }
  resize(); addEventListener("resize", resize);
  if (!touch) addEventListener("mousemove", (e) => { mx = (e.clientX/innerWidth - 0.5); my = (e.clientY/innerHeight - 0.5); }, { passive: true });
  const glyphs = Array.from({ length: touch ? 4 : 7 }, () => ({ x: Math.random(), y: Math.random(), size: (Math.random()*30+18)*dpr, speed: 0.0002+Math.random()*0.0005, amp: 22+Math.random()*48, phase: Math.random()*Math.PI*2, depth: 0.3+Math.random()*0.7, spin: 0.0025+Math.random()*0.004 }));
  function drawX(cx, cy, size, rotX, rotY, alpha){
    const sx = Math.cos(rotY), sy = Math.cos(rotX);
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sx, sy); ctx.globalAlpha = alpha; ctx.lineCap = "round"; ctx.lineWidth = size*0.16;
    const g = ctx.createLinearGradient(-size,-size,size,size); g.addColorStop(0,"rgba(160,195,255,.55)"); g.addColorStop(1,"rgba(170,150,255,.4)");
    ctx.strokeStyle = g; ctx.shadowColor = "rgba(127,176,255,.4)"; ctx.shadowBlur = size*0.5;
    ctx.beginPath(); ctx.moveTo(-size,-size); ctx.lineTo(size,size); ctx.moveTo(size,-size); ctx.lineTo(-size,size); ctx.stroke(); ctx.restore();
  }
  let last = 0; const gap = touch ? 1000/30 : 1000/60;
  function loop(ts){ raf = requestAnimationFrame(loop); if (ts-last < gap) return; last = ts; t += 0.6;
    ctx.clearRect(0,0,W,H);
    glyphs.forEach(o => {
      const x = o.x*W + Math.sin(t*o.speed*1000+o.phase)*o.amp*dpr + mx*70*o.depth*dpr;
      const y = o.y*H + Math.cos(t*o.speed*800+o.phase)*o.amp*dpr + my*70*o.depth*dpr;
      drawX(x, y, o.size, t*o.spin, t*o.spin*1.3, 0.07*o.depth + 0.03);
    });
  }
  raf = requestAnimationFrame(loop);
  document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop); });
})();
/* ===== Live activity popup ===== */
(() => {
  const pop = $("#activityPop"); if (!pop) return;
  const data = {
    "Bangladesh": ["Hasan","Rahim","Shuvo","Tanvir","Arif","Mahin"],
    "India": ["Rahul","Priya","Arjun","Vikram","Neha"],
    "Pakistan": ["Ahmed","Bilal","Hamza","Ayesha"],
    "the United States": ["Michael","Emma","James","Olivia","Ethan"],
    "the United Kingdom": ["Oliver","Harry","Amelia","Charlotte"],
    "Canada": ["Liam","Sophia","Noah","Emily"],
    "Malaysia": ["Amir","Nurul","Hafiz","Siti"]
  };
  const countries = Object.keys(data);
  const plans = ["Twitter Premium (3 Months)","Twitter Premium (6 Months)","Twitter Premium+ (3 Months)","Twitter Premium+ (6 Months)","Twitter Premium+ (12 Months)"];
  const rand = (a) => a[Math.floor(Math.random()*a.length)];
  let hideT;
  function showOne(){
    const country = rand(countries);
    const name = rand(data[country]);
    const plan = rand(plans);
    pop.innerHTML = `<span class="ap-ic">${name[0]}</span><span class="ap-body"><b>${name} from ${country}</b> just ordered <b>${plan}</b><small>Verified order</small></span>`;
    pop.classList.add("show");
    clearTimeout(hideT);
    hideT = setTimeout(() => pop.classList.remove("show"), 5000);
    setTimeout(showOne, 25000 + Math.random()*35000);
  }
  setTimeout(showOne, 10000);
})();

