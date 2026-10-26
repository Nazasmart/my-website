/* =============================================================
   FYNA WEBSITE – script.js
   -------------------------------------------------------------
   TABLE OF CONTENTS
   1.  SETTINGS ............ edit text, numbers, rates, links here
   2.  Helpers
   3.  Images
   4.  Header, mobile button, hero parallax, marquee
   5.  Features: wallets + virtual card
   6.  Story: sticky phone that changes screens as you scroll
   7.  Get paid: account details + copy buttons
   8.  Exchange: live converter + confetti
   9.  Savings goals
   10. FAQ
   11. QR code, dark/light theme, scroll reveal
   ============================================================= */

/* =============================================================
   1. SETTINGS  –  the part you will edit most
   ============================================================= */
const SETTINGS = {
  /* Where the QR code in the download section points to.
     Replace with your App Store / Play Store / landing page link. */
  qrLink: "https://example.com/get-fyna",

  /* How long (in seconds) each phone screen stays before the next one. */
  slideSeconds: 2.6,

  /* The fee charged when swapping currencies. 0.005 = 0.5% */
  swapFee: 0.005,

  /* Currency symbols. */
  symbols: { NGN: "₦", USD: "$", GBP: "£", EUR: "€" },

  /* Sample exchange rates: how many NAIRA one unit of each currency is worth.
     Example: USD: 1560 means 1 USD = ₦1,560. */
  nairaPerUnit: { NGN: 1, USD: 1560, GBP: 1980, EUR: 1690 },

  /* Sample wallet balances (used by the converter and the wallet tile). */
  balances: { USD: 5420, NGN: 4850000, GBP: 1250, EUR: 980 },

  /* Names shown under each currency code in the wallet tile. */
  walletNames: {
    USD: "US Dollar",
    NGN: "Nigerian Naira",
    GBP: "British Pound",
    EUR: "Euro",
  },

  /* Words that scroll across the dark band under the hero.
     Items alternate between solid and outlined text automatically. */
  marquee: ["Hold", "₦", "Send", "$", "Swap", "£", "Save", "€"],

  /* Image names -> file paths. Add or replace screens here.
     Put the new image in assets/img/ and add a line like:
     mynewscreen: "assets/img/mynewscreen.webp" */
  images: {
    home: "assets/img/home.webp",
    onb: "assets/img/onb.webp",
    num: "assets/img/num.webp",
    code: "assets/img/code.webp",
    pin: "assets/img/pin.webp",
    fund: "assets/img/fund.webp",
    method: "assets/img/method.webp",
    added: "assets/img/added.webp",
    recv: "assets/img/recv.webp",
    xform: "assets/img/xform.webp",
    xconf: "assets/img/xconf.webp",
    xdone: "assets/img/xdone.webp",
    sopt: "assets/img/sopt.webp",
    skey: "assets/img/skey.webp",
    sconf: "assets/img/sconf.webp",
    sdone: "assets/img/sdone.webp",
    save: "assets/img/save.webp",
  },

  /* STORY SECTION ("How it works").
     One entry per chapter, in the same order as the <div class="ch"> blocks in index.html.
       screens: image names (from "images" above) that play in a loop
       labels:  small caption under the phone for each screen
       color:   colour of the circle behind the phone */
  storyChapters: [
    {
      screens: ["onb", "num", "code", "pin"],
      labels: ["Welcome", "Your number", "The code", "Your PIN"],
      color: "#ff4438",
    },
    {
      screens: ["fund", "method", "added"],
      labels: ["Enter amount", "Payment method", "Money added"],
      color: "#0e1220",
    },
    {
      screens: ["xform", "xconf", "xdone"],
      labels: ["Pick wallets", "Review the rate", "Done"],
      color: "#0a9857",
    },
    {
      screens: ["sopt", "skey", "sconf", "sdone"],
      labels: ["Where to?", "Enter amount", "Confirm", "Sent"],
      color: "#574bea",
    },
    {
      screens: ["save", "home"],
      labels: ["Your goals", "Back home"],
      color: "#e04060",
    },
  ],

  /* GET PAID section: the bank-detail slips. All values are SAMPLES. */
  accounts: {
    NGN: {
      title: "YOUR NGN ACCOUNT · NIGERIA",
      subtitle: "Local bank transfer",
      country: "Nigeria",
      rows: [
        ["Account Holder", "Smart Adeyemi"],
        ["Account Number", "8140227391"],
      ],
    },
    USD: {
      title: "YOUR USD ACCOUNT · UNITED STATES",
      subtitle: "ACH / Domestic Wire",
      country: "the United States",
      rows: [
        ["Account Holder", "Smart Adeyemi"],
        ["Routing Number", "990000117"],
        ["Account Number", "5520018844"],
      ],
    },
    GBP: {
      title: "YOUR GBP ACCOUNT · UNITED KINGDOM",
      subtitle: "Faster Payments / Domestic",
      country: "the United Kingdom",
      rows: [
        ["Account Holder", "Smart Adeyemi"],
        ["Sort Code", "04-00-75"],
        ["Account Number", "38290144"],
      ],
    },
    EUR: {
      title: "YOUR EUR ACCOUNT · EUROPE",
      subtitle: "SEPA transfer",
      country: "Europe",
      rows: [
        ["Account Holder", "Smart Adeyemi"],
        ["IBAN", "EU00 FYNA 0000 1234 5678 90"],
        ["BIC", "FYNAXXXX"],
      ],
    },
  },
  /* Which account tab is open first. */
  defaultAccount: "GBP",

  /* SAVINGS GOALS (amounts are in dollars).
       name/emoji:    what you see on the card
       colorA/colorB: the two gradient colours
       saved/target:  how much is saved and the goal */
  goals: [
    { name: "Macbook Pro", emoji: "💻", colorA: "#574bea", colorB: "#2f2780", saved: 1800, target: 2500 },
    { name: "Emergency Fund", emoji: "🛡️", colorA: "#16af5b", colorB: "#08522b", saved: 1900, target: 4500 },
    { name: "Vacation", emoji: "✈️", colorA: "#e04060", colorB: "#8a2840", saved: 800, target: 3000 },
  ],

  /* Extra goals added one by one when someone clicks "Create new goal". */
  extraGoals: [
    { name: "New Phone", emoji: "📱", colorA: "#ef8a2c", colorB: "#9b4a07", saved: 150, target: 900 },
    { name: "Wedding", emoji: "💍", colorA: "#0f7fd0", colorB: "#0a3f78", saved: 600, target: 5000 },
    { name: "Rent", emoji: "🏠", colorA: "#8a4bd8", colorB: "#46218a", saved: 300, target: 1200 },
  ],

  /* FAQ: [question, answer]. Add or remove lines freely. */
  faqs: [
    ["Which currencies can I hold?", "Naira, US dollars, British pounds and euros. Each has its own wallet, and you can swap between them any time."],
    ["How do I add money?", "Fund your wallet by bank transfer, which is free, or by card or Apple Pay at 2%. Type an amount, pick a currency, choose a method."],
    ["What does swapping cost?", "A 0.5% fee. The rate, the fee and the amount you’ll receive are shown on one screen before you confirm."],
    ["Can I get paid from abroad?", "Yes. You get local account details for each currency. Money lands in the matching wallet with no SWIFT fees and no conversion unless you choose to exchange it."],
    ["How do I send money?", "To anyone on the app, instantly and free, or to any bank account. If the currencies differ, it converts for you."],
    ["How is my account protected?", "You sign up with a verified phone number or email and a one-time code, and you use a 4-digit PIN to log in and approve transactions."],
  ],

  /* Colours of the confetti when a conversion completes. */
  confetti: ["#c8282e", "#28a075", "#3a86d0", "#ef9f48", "#0066c0", "#ffc16a"],
};

/* =============================================================
   2. HELPERS
   ============================================================= */

/* Short way to get an element by its id:  $("hd") */
const $ = (id) => document.getElementById(id);

/* Short way to get a list of elements:  $$(".ch") */
const $$ = (selector) => [...document.querySelectorAll(selector)];

/* Handy shortcuts to the settings above. */
const SYMBOL = SETTINGS.symbols;
const BALANCE = SETTINGS.balances;

/* Turns "naira per unit" into a lookup table used by the converter maths. */
const RATE = {};
Object.keys(SETTINGS.nairaPerUnit).forEach((code) => {
  RATE[code] = 1 / SETTINGS.nairaPerUnit[code];
});

/* Formats money. Naira has no decimals (₦136,594), others have two ($88.00). */
function money(amount, code) {
  if (code === "NGN") return "₦" + Math.round(amount).toLocaleString("en");
  return (
    SYMBOL[code] +
    amount.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

/* True when the visitor asked their device to reduce motion. */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =============================================================
   3. IMAGES
   Every <img data-i="name"> gets its file from SETTINGS.images.
   (The src is also written in index.html so images show even before JS runs.)
   ============================================================= */
$$("[data-i]").forEach((img) => {
  img.src = SETTINGS.images[img.dataset.i];
});

/* =============================================================
   4. HEADER, MOBILE BUTTON, HERO PARALLAX, MARQUEE
   ============================================================= */

/* Scrolling band under the hero: the words repeat twice for a seamless loop. */
const marqueeHTML = SETTINGS.marquee.map((word) => "<span>" + word + "</span>").join("");
$("mq").innerHTML = marqueeHTML + marqueeHTML;

/* On scroll:
   - the header turns solid after 60px
   - the floating "Get the app" button (phones only) appears after the hero */
const header = $("hd");
const mobileBar = $("mb");
addEventListener(
  "scroll",
  () => {
    header.classList.toggle("s", scrollY > 60);
    mobileBar.classList.toggle("on", scrollY > innerHeight * 0.7);
  },
  { passive: true }
);

/* Hero phones drift slightly with the mouse (desktop only).
   The CSS reads --mx and --my to move each phone by a different amount. */
const heroFan = $("fan");
if (matchMedia("(pointer: fine)").matches) {
  addEventListener("mousemove", (e) => {
    heroFan.style.setProperty("--mx", (e.clientX / innerWidth - 0.5) * 2);
    heroFan.style.setProperty("--my", (e.clientY / innerHeight - 0.5) * 2);
  });
}

/* =============================================================
   5. FEATURES: WALLETS + VIRTUAL CARD
   ============================================================= */

/* Wallet list: one row per currency. Clicking a row highlights it. */
const walletList = $("b6cur");
Object.keys(SETTINGS.walletNames).forEach((code, index) => {
  const row = document.createElement("div");
  if (index === 0) row.className = "on";
  row.innerHTML =
    "<em><i>" + SYMBOL[code] + "</i><span>" + code +
    "<small>" + SETTINGS.walletNames[code] + "</small></span></em>" +
    "<b>" + money(BALANCE[code], code) + "</b>";
  row.onclick = () => {
    walletList.querySelectorAll("div").forEach((r) => r.classList.toggle("on", r === row));
  };
  walletList.appendChild(row);
});

/* Virtual card: the toggle greys the card out and changes its label. */
$("b6fz").onclick = () => {
  const frozen = $("b6fz").classList.toggle("on");
  $("b6vc").classList.toggle("fz", frozen);
  $("b6fzt").textContent = frozen ? "Card is frozen" : "Card is active";
};

/* Virtual card: the slider updates the monthly limit text. */
$("b6lr").oninput = (e) => {
  $("b6lv").textContent = "₦" + Number(e.target.value).toLocaleString("en");
};

/* =============================================================
   6. STORY: STICKY PHONE THAT CHANGES SCREENS AS YOU SCROLL
   How it works:
   - every chapter (<div class="ch">) is watched while you scroll
   - the chapter in the middle of the screen becomes "active"
   - the phone then loops through that chapter's screens
   ============================================================= */
const chapters = SETTINGS.storyChapters;
const phoneScreen = $("scr");

/* Create one <img> for every screen of every chapter and stack them.
   Only the active one gets the class "on" (visible). */
const storyImages = chapters.map((chapter) =>
  chapter.screens.map((name) => {
    const img = document.createElement("img");
    img.src = SETTINGS.images[name];
    img.alt = "";
    phoneScreen.appendChild(img);
    return img;
  })
);

let activeChapter = 0; // which chapter is showing
let activeScreen = 0; // which screen inside the chapter
let slideTimer; // the repeating timer

/* Show one screen: updates the image, caption, dots, circle colour and chapter text. */
function showScreen(chapterIndex, screenIndex) {
  activeChapter = chapterIndex;
  activeScreen = screenIndex;
  const chapter = chapters[chapterIndex];

  storyImages.forEach((group, c) =>
    group.forEach((img, s) => img.classList.toggle("on", c === chapterIndex && s === screenIndex))
  );

  $("stage").style.setProperty("--c", chapter.color);
  $("capn").textContent = "0" + (chapterIndex + 1);
  $("capl").textContent = chapter.labels[screenIndex];
  $("dots").innerHTML = chapter.screens
    .map((_, s) => '<i class="' + (s === screenIndex ? "on" : "") + '" data-j="' + s + '"></i>')
    .join("");
  $$(".ch").forEach((el, c) => el.classList.toggle("on", c === chapterIndex));
}

/* Start (or restart) the loop that moves to the next screen. */
function startSlideshow() {
  clearInterval(slideTimer);
  if (reduceMotion) return; // respect "reduce motion" settings
  slideTimer = setInterval(() => {
    showScreen(activeChapter, (activeScreen + 1) % chapters[activeChapter].screens.length);
  }, SETTINGS.slideSeconds * 1000);
}

/* Clicking a dot jumps to that screen. */
$("dots").onclick = (e) => {
  const index = e.target.dataset.j;
  if (index === undefined) return;
  showScreen(activeChapter, Number(index));
  startSlideshow();
};

/* Watch which chapter is in the middle of the viewport. */
const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = $$(".ch").indexOf(entry.target);
      if (index !== activeChapter) {
        showScreen(index, 0);
        startSlideshow();
      }
    });
  },
  { rootMargin: "-42% 0px -42% 0px" } // only the middle 16% of the screen counts
);
$$(".ch").forEach((el) => chapterObserver.observe(el));

showScreen(0, 0);
startSlideshow();

/* =============================================================
   7. GET PAID: ACCOUNT DETAILS + COPY BUTTONS
   ============================================================= */

/* Little "copy" icon (SVG) used inside every copy button. */
const COPY_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>';

/* Draw the slip for one currency and highlight its tab. */
function showAccount(code) {
  $$("#tabs button").forEach((b) => b.classList.toggle("on", b.textContent === code));
  const account = SETTINGS.accounts[code];

  const rowsHTML = account.rows
    .map(
      ([label, value]) =>
        '<div class="rw"><div><small>' + label + '</small><div class="v">' + value + "</div></div>" +
        '<button class="cp" data-v="' + value + '" aria-label="Copy ' + label + '">' + COPY_ICON + "</button></div>"
    )
    .join("");

  $("slip").innerHTML =
    '<div class="hd"><b>' + account.title + "</b><span>" + account.subtitle + "</span></div>" +
    rowsHTML +
    '<div class="ft">Share these details with anyone paying you from ' + account.country +
    ". Funds land in your " + code +
    " wallet. No SWIFT fees, no conversion unless you choose to exchange it. Sample details shown.</div>";
}

/* One tab button per currency. */
Object.keys(SETTINGS.accounts).forEach((code) => {
  const tab = document.createElement("button");
  tab.textContent = code;
  tab.onclick = () => showAccount(code);
  $("tabs").appendChild(tab);
});
showAccount(SETTINGS.defaultAccount);

/* Clicking a copy button copies the value and shows a short "Copied" message. */
$("slip").onclick = async (e) => {
  const button = e.target.closest(".cp");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.v);
  } catch (err) {
    /* Clipboard can be blocked on some pages; the visual feedback still plays. */
  }
  button.classList.add("ok");
  button.textContent = "✓";
  $("tst").classList.add("on");
  setTimeout(() => {
    button.classList.remove("ok");
    button.innerHTML = COPY_ICON;
    $("tst").classList.remove("on");
  }, 1400);
};

/* =============================================================
   8. EXCHANGE: LIVE CONVERTER + CONFETTI
   ============================================================= */
let amountIn = 0; // what the visitor typed
let feeAmount = 0; // the fee, in the "from" currency
let amountOut = 0; // what they receive

/* Re-calculate everything and update the screen. Runs on every change. */
function updateConverter() {
  const from = $("xf").value;
  const to = $("xt").value;

  amountIn = Math.max(0, parseFloat($("xa").value.replace(/,/g, "")) || 0);
  feeAmount = amountIn * SETTINGS.swapFee;
  amountOut = ((amountIn - feeAmount) / RATE[from]) * RATE[to];

  $("xo").textContent = money(from === to ? amountIn : amountOut, to);

  /* Rate line. If 1 unit is worth a tiny amount, flip it so it reads nicely
     (e.g. show "1 USD = 1,560 NGN" instead of "1 NGN = 0.0006 USD"). */
  const rate = RATE[to] / RATE[from];
  const fmt = (n) => n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  $("xr").textContent =
    rate < 0.01
      ? "1 " + to + " = " + fmt(1 / rate) + " " + from
      : "1 " + from + " = " + fmt(rate) + " " + to;
  $("xe").textContent = money(feeAmount, from);

  /* Balance hints, and block the button if the amount is too high or invalid. */
  const tooMuch = amountIn > BALANCE[from];
  $("xb").textContent = (tooMuch ? "Insufficient balance · " : "") + "Bal: " + money(BALANCE[from], from);
  $("xb").className = tooMuch ? "er" : "";
  $("xb2").textContent = "Balance " + money(BALANCE[to], to);
  $("xc").disabled = tooMuch || !amountIn || from === to;
}

/* Update whenever the amount or either currency changes. */
["xa", "xf", "xt"].forEach((id) => $(id).addEventListener("input", updateConverter));

/* The round swap button flips From and To. */
$("xs").onclick = () => {
  const from = $("xf").value;
  $("xf").value = $("xt").value;
  $("xt").value = from;
  updateConverter();
};

/* Convert button: show the success card and throw confetti. */
$("xc").onclick = () => {
  const from = $("xf").value;
  const to = $("xt").value;
  $("dt").textContent =
    money(amountIn, from) + " is now " + money(amountOut, to) + " in your " + to + " wallet.";
  $("dn").classList.add("on");
  launchConfetti();
};
$("dd").onclick = () => $("dn").classList.remove("on");

/* Confetti: small coloured pieces fly out from the card and fade away. */
function launchConfetti() {
  const box = document.querySelector(".cv");
  for (let i = 0; i < 46; i++) {
    const piece = document.createElement("i");
    piece.className = "cf";
    piece.style.background = SETTINGS.confetti[i % SETTINGS.confetti.length];
    box.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 240;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance + 140; // +140 makes pieces fall a little
    const spin = Math.random() * 720;

    piece
      .animate(
        [
          { transform: "translate(0,0) rotate(0)", opacity: 1 },
          { transform: "translate(" + x + "px," + y + "px) rotate(" + spin + "deg)", opacity: 0 },
        ],
        { duration: 1300 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.3,1)" }
      )
      .onfinish = () => piece.remove();
  }
}

updateConverter();

/* =============================================================
   9. SAVINGS GOALS
   ============================================================= */
/* Work on copies so the original SETTINGS stay untouched. */
const goals = SETTINGS.goals.map((g) => ({ ...g }));
let extraGoalsUsed = 0;

const dollars = (n) =>
  "$" + n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* HTML for one goal card. */
function goalCardHTML(goal, index) {
  return (
    '<div class="g" style="--a:' + goal.colorA + ";--b:" + goal.colorB + '">' +
    '<span class="ic">' + goal.emoji + "</span><h4>" + goal.name + '</h4><span class="pc"></span>' +
    '<div><div class="bar"><i></i></div><div class="am2"></div></div>' +
    '<div class="bt"><button data-i="' + index + '" data-a="50">+ $50</button>' +
    '<button data-i="' + index + '" data-a="100">+ $100</button></div></div>'
  );
}

/* Update ONE card's bar, percentage and amount (so the bar animates smoothly). */
function updateGoal(index) {
  const goal = goals[index];
  const card = $$(".g")[index];
  const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  card.querySelector(".bar i").style.width = percent + "%";
  card.querySelector(".pc").textContent = percent >= 100 ? "Done ✓" : percent + "%";
  card.querySelector(".am2").textContent =
    dollars(Math.min(goal.saved, goal.target)) + " of " + dollars(goal.target);
}

/* Draw all cards (plus the "Create new goal" button while extras remain). */
function renderGoals() {
  const addButton =
    extraGoalsUsed < SETTINGS.extraGoals.length
      ? '<button class="nw" id="ng"><i>+</i>Create new goal</button>'
      : "";
  $("gs").innerHTML = goals.map(goalCardHTML).join("") + addButton;
  /* Two animation frames so the bars grow from 0 on first draw. */
  requestAnimationFrame(() => requestAnimationFrame(() => goals.forEach((_, i) => updateGoal(i))));
}

/* One click handler for the whole list. */
$("gs").onclick = (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  /* "Create new goal" button. */
  if (button.id === "ng") {
    goals.push({ ...SETTINGS.extraGoals[extraGoalsUsed++] });
    renderGoals();
    return;
  }

  /* "+ $50" / "+ $100" buttons. */
  const index = Number(button.dataset.i);
  const goal = goals[index];
  goal.saved = Math.min(goal.target, goal.saved + Number(button.dataset.a));
  updateGoal(index);
};

renderGoals();

/* =============================================================
   10. FAQ  (open / close answers)
   ============================================================= */
SETTINGS.faqs.forEach(([question, answer], index) => {
  const item = document.createElement("div");
  item.className = "q" + (index === 0 ? " open" : ""); // first answer starts open
  item.innerHTML =
    "<button><i>0" + (index + 1) + "</i>" + question + "<span>+</span></button>" +
    '<div class="a"><div><p>' + answer + "</p></div></div>";
  item.firstChild.onclick = () => item.classList.toggle("open");
  $("fq").appendChild(item);
});

/* =============================================================
   11. QR CODE, THEME TOGGLE, SCROLL REVEAL
   ============================================================= */

/* QR code (needs the qrcode.js library loaded in index.html). */
if (window.QRCode) {
  new QRCode($("qrc"), {
    text: SETTINGS.qrLink,
    width: 92,
    height: 92,
    colorDark: "#0e1220",
    colorLight: "#ffffff",
  });
}

/* Dark / light toggle (button in the footer).
   It sets data-theme="dark" or "light" on <html>; the colours live in styles.css. */
$("th").onclick = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
};

/* Scroll reveal: any element with class "rv" fades up the first time it appears. */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1 }
);
$$(".rv").forEach((el) => revealObserver.observe(el));
