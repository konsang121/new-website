/* 新维智能官网：单页应用，hash 路由
   #/            首页
   #/about       关于我们
   #/products    产品中心（全部机器类型）
   #/c/<类型>                  某类机器：每个品牌一个商品
   #/g/<类型>/<品牌>[/<产品id>]  商品页：像淘宝一样选型号、选配置
   #/p/<产品id>                 旧链接，跳到对应商品页
   #/brands      合作品牌；#/b/<品牌>  某品牌的全部商品
   #/contact[/<型号>]           联系我们（可带上要询价的型号） */
(function () {
  "use strict";

  // ===== 公司联系方式（如有变动只改这里） =====
  const CONTACT = {
    phones: ["012 564 061", "096 334 0358"],
    wechat: "13736377",
    email: "",   // 新公司邮箱待定，填上后会自动显示
    tin: "K007-902504918",
    addrEn: "No.1098, Street 371, Trea Pir, Stueng Mean chey 1, Mean Chey, Phnom Penh, CAMBODIA",
  };

  const D = window.SITE_DATA;
  const BRAND = Object.fromEntries(D.brands.map(b => [b.key, b]));
  const CAT = Object.fromEntries(D.cats.map(c => [c.key, c]));
  const PROD = Object.fromEntries(D.products.map(p => [p.id, p]));
  // 每类机器的封面图
  const COVER = {
    lockstitch: "shanggong-s60pm", overlock: "shanggong-n550-ss", interlock: "shanggong-g550-s3-01-356",
    chainstitch: "shanggong-gk-927d-pl", button: "shanggong-gd-1900e-js", template: "shanggong-m70-s13095-360-lk",
    automatic: "gm-gm-k6300", special: "shanggong-gg-2297d3-sr", heavy: "shanggong-gh-2645-170242",
    cutting: "yinengtech-g9001", fabric: "saloon-sl-780r", down: "qianli-ql9s-2m", ironing: "tej-tej-lt-2",
    heatpress: "silim-sl-a", detect: "yaxiang-sj20-650", hanging: "tegote-t5", workshop: "junyuan-jy-227",
    parts: "saga-sf-704j",
  };

  const T = {
    zh: {
      topbar: "柬埔寨金边 · 服装智能制造设备一站式服务", nav_home: "首页", nav_about: "关于我们", nav_products: "产品中心",
      nav_brands: "合作品牌", nav_contact: "联系我们", quote: "获取报价", company: "新维智能科技有限公司",
      hero_eye: "NEWDIM · 柬埔寨金边", hero_h1: "服装智能制造设备<br>一站式供应与服务",
      hero_lead: "从裁剪、缝制到整烫、检针与智能吊挂，新维智能为柬埔寨服装工厂提供国内外一线品牌设备、整厂方案与专业售后。",
      hero_btn1: "浏览机器类型", hero_btn2: "联系我们",
      st_brands: "合作品牌", st_models: "在售机型", st_cats: "设备类别", st_stage: "全流程覆盖", st_stage_v: "缝前→缝后",
      about_eye: "About Us", about_h: "关于新维智能",
      about_p1: "新维智能科技有限公司（NEWDIM INTELLIGENT TECHNOLOGY CO., LTD）立足柬埔寨金边，专注服装自动化与智能制造设备的销售和服务。",
      about_p2: "我们代理和经营国内外一线品牌，覆盖缝前设备（自动裁床、铺布、验布预缩、切条）、缝中设备（平缝、包缝、绷缝、模板机、特种机、厚料机）、缝后设备（烫台、蒸汽锅炉、检针机、粘合机）以及智能吊挂、仓储和车间配套，并提供原厂零配件。",
      about_p3: "公司拥有技术精湛的专业团队，可为各类工厂提供设备选型和整厂方案，以及安装、调试、维修、保养、技术咨询与培训等全方位服务。我们坚持“以诚为本，以信待人”，与客户携手共进、共创辉煌。",
      v1: "品质", v2: "诚信", v3: "担当", v4: "共赢",
      svc1: "设备选型与整厂方案", svc1p: "根据产品工艺和产能，为工厂规划最合适的设备组合与生产线。",
      svc2: "安装调试", svc2p: "专业技师上门安装、调试，确保设备快速投产。",
      svc3: "维修保养", svc3p: "及时响应的售后维修和定期保养，减少停机时间。",
      svc4: "技术培训", svc4p: "为操作工和机修人员提供设备使用与维护培训。",
      svc5: "原厂零配件", svc5p: "旋梭、梭壳、压脚、胶针等配件常备库存。",
      prod_eye: "Products", prod_h: "按机器类型选购", prod_p: "先选择机器类型，再挑选品牌，快速找到适合您工厂的设备。",
      all: "全部", brands_n: "个品牌", models_n: "款机型", view_all: "查看全部类型 →",
      brands_eye: "Partners", brands_h: "合作品牌", brands_p: "与国内外一线缝制设备品牌长期合作，正品保障。",
      cta_h: "需要设备方案或报价？", cta_p: "告诉我们您的产品和产能，我们为您推荐合适的机型。", cta_btn: "立即咨询",
      step1: "选择品牌", all_brands: "全部品牌", results: "共 {n} 款机型", search: "搜索型号或名称…",
      no_result: "没有找到相关机型", variants: "型号 / 款式", features: "产品特点", specs: "技术参数",
      ask: "询价 / 咨询此机型", related: "同类机型", back_cat: "返回", in_brand: "该品牌全部产品",
      contact_h: "联系我们", contact_p: "欢迎来电或微信咨询设备与报价。", c_company: "公司名称", c_addr: "地址",
      c_phone: "电话", c_wechat: "微信", c_email: "邮箱", c_tin: "税号 (TIN)", map: "在地图中查看",
      brand_page_p: "{n} 款机型", not_found: "页面不存在", home: "返回首页",
      cat_hint: "同一品牌的同类机器合并展示，进入后可选择具体型号和配置。", models_avail: "款型号可选", choose: "选择配置",
      model_label: "型号", selected: "已选", price: "价格", price_v: "询价", price_note: "批量采购与整厂方案另有优惠，欢迎来电咨询",
      ask_now: "立即询价", call: "电话咨询", other_brands: "其他品牌的同类机器", brand_groups: "{n} 类机器",
      asking: "您咨询的型号", search_g: "搜索品牌或型号…",
      s60_eye: "主推机型 · S60", s60_h: "S60 乌巢克星 · 无鸟巢电脑平缝机",
      s60_p: "起缝无鸟巢、收缝短线尾，线头最短 2mm，免二次修剪，效率提升 20%–30%。下方 3D 模型依据上工官方零件样本重构，可旋转、拆解、透视内部，点击编号查看每个部件。",
      s60_k1: "最高转速", s60_k2: "运行噪音", s60_k3: "适用面料", s60_k4: "最短线头", s60_btn: "查看 S60 配置与询价",
    },
    en: {
      topbar: "Phnom Penh, Cambodia · One-stop garment machinery supplier", nav_home: "Home", nav_about: "About",
      nav_products: "Products", nav_brands: "Brands", nav_contact: "Contact", quote: "Get a Quote",
      company: "NEWDIM Intelligent Technology", hero_eye: "NEWDIM · Phnom Penh, Cambodia",
      hero_h1: "Smart Garment Machinery,<br>Supplied &amp; Serviced",
      hero_lead: "From cutting and sewing to pressing, needle detection and smart hanging systems — NEWDIM brings leading brands, whole-factory solutions and professional after-sales service to garment factories in Cambodia.",
      hero_btn1: "Browse Machine Types", hero_btn2: "Contact Us",
      st_brands: "Partner brands", st_models: "Machine models", st_cats: "Machine categories", st_stage: "Full process", st_stage_v: "End-to-end",
      about_eye: "About Us", about_h: "About NEWDIM",
      about_p1: "NEWDIM INTELLIGENT TECHNOLOGY CO., LTD is based in Phnom Penh, Cambodia, and specializes in the sales and service of garment automation and smart manufacturing equipment.",
      about_p2: "We supply leading domestic and international brands across the whole production flow: pre-sewing (auto cutters, spreaders, fabric inspection and shrinking, strip cutters), sewing (lockstitch, overlock, interlock, template, special and heavy-duty machines), post-sewing (ironing tables, steam boilers, needle detectors, fusing machines), plus smart hanging, warehousing, workshop equipment and genuine spare parts.",
      about_p3: "Our skilled team designs equipment plans for every kind of factory and provides installation, commissioning, repair, maintenance, consultation and training. Built on honesty and trust, we grow together with our customers.",
      v1: "Quality", v2: "Integrity", v3: "Responsibility", v4: "Win-Win",
      svc1: "Equipment & factory planning", svc1p: "We match machines and production lines to your products and capacity.",
      svc2: "Installation & commissioning", svc2p: "On-site setup by experienced technicians to get you running fast.",
      svc3: "Repair & maintenance", svc3p: "Responsive after-sales repair and scheduled maintenance to cut downtime.",
      svc4: "Technical training", svc4p: "Training for operators and mechanics on use and upkeep.",
      svc5: "Genuine spare parts", svc5p: "Rotary hooks, bobbin cases, presser feet, tag pins and more in stock.",
      prod_eye: "Products", prod_h: "Shop by Machine Type", prod_p: "Pick a machine type, then choose a brand to find the right equipment for your factory.",
      all: "All", brands_n: "brands", models_n: "models", view_all: "View all types →",
      brands_eye: "Partners", brands_h: "Our Brands", brands_p: "Long-term partners with leading sewing equipment brands. Genuine products guaranteed.",
      cta_h: "Need a machine plan or a quote?", cta_p: "Tell us your products and capacity, and we will recommend the right models.", cta_btn: "Contact Us",
      step1: "Choose a brand", all_brands: "All brands", results: "{n} models", search: "Search model or name…",
      no_result: "No matching models", variants: "Models / Versions", features: "Features", specs: "Specifications",
      ask: "Ask about this machine", related: "Related machines", back_cat: "Back", in_brand: "All products of this brand",
      contact_h: "Contact Us", contact_p: "Call or message us on WeChat for machines and quotes.", c_company: "Company", c_addr: "Address",
      c_phone: "Phone", c_wechat: "WeChat", c_email: "Email", c_tin: "TIN", map: "View on map",
      brand_page_p: "{n} models", not_found: "Page not found", home: "Back to home",
      cat_hint: "Machines of the same brand and type are grouped together — open one to pick the exact model and configuration.",
      models_avail: "models available", choose: "Configure", model_label: "Model", selected: "Selected", price: "Price",
      price_v: "Ask for quote", price_note: "Volume and whole-factory discounts available — call us", ask_now: "Request a Quote",
      call: "Call us", other_brands: "Same type from other brands", brand_groups: "{n} machine types",
      asking: "Model you are asking about", search_g: "Search brand or model…",
      s60_eye: "Featured · S60", s60_h: "S60 Bird-Nest Eliminator Lockstitch Machine",
      s60_p: "No bird nest at the start, short thread tails at the end (down to 2 mm), 20–30% more output. The 3D model below is rebuilt from the official ShangGong parts book — rotate it, explode it, look inside, and click a number to explore each component.",
      s60_k1: "Max speed", s60_k2: "Noise", s60_k3: "Fabric range", s60_k4: "Shortest tail", s60_btn: "Configure S60 & Get a Quote",
    },
  };

  let lang = "zh";
  try { lang = localStorage.getItem("newdim-lang") || "zh"; } catch (e) {}
  const t = k => T[lang][k] ?? k;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nm = o => (lang === "en" && o.en ? o.en : o.cn);              // 类型/阶段/品牌名
  const pname = p => (lang === "en" && p.en ? p.en : p.cn);          // 产品名
  const bname = k => (lang === "en" ? BRAND[k].en : BRAND[k].cn);
  const app = document.getElementById("app");

  const inCat = c => D.products.filter(p => p.cat === c);
  const brandsOf = list => {
    const n = {};
    list.forEach(p => (n[p.brand] = (n[p.brand] || 0) + 1));
    return Object.keys(n).sort((a, b) => n[b] - n[a] || (a === "shanggong" ? -1 : 0)).map(k => ({ key: k, n: n[k] }));
  };
  const coverOf = c => (PROD[COVER[c]] || inCat(c)[0]).img;

  // ===== 组件 =====
  const catCard = c => {
    const list = inCat(c.key);
    const stage = D.stages.find(s => s.key === c.stage);
    return `<a class="cat-card" href="#/c/${c.key}">
      <div class="pic"><img src="${coverOf(c.key)}" alt="${esc(nm(c))}" loading="lazy"></div>
      <div class="body"><div class="tag">${esc(nm(stage))}</div><h3>${esc(nm(c))}</h3>
      <div class="meta">${brandsOf(list).length} ${t("brands_n")} · ${list.length} ${t("models_n")}</div></div></a>`;
  };
  const shortModel = p => p.model.split(" / ")[0];
  const groupOf = (cat, brand) => inCat(cat).filter(p => p.brand === brand);
  const groupsIn = cat => brandsOf(inCat(cat)).map(b => ({ cat, brand: b.key, items: groupOf(cat, b.key) }));
  const groupTitle = g => `${bname(g.brand)} ${nm(CAT[g.cat])}`;
  const groupLink = (cat, brand, id) => `#/g/${cat}/${brand}${id ? "/" + id : ""}`;

  // 商品卡片：同品牌 + 同类型 合成一个
  const groupCard = g => `<a class="grp" href="${groupLink(g.cat, g.brand)}">
      <div class="pic"><img src="${g.items[0].img}" alt="${esc(groupTitle(g))}" loading="lazy">
        ${g.items.length > 1 ? `<div class="thumbs">${g.items.slice(1, 4).map(p => `<img src="${p.img}" alt="" loading="lazy">`).join("")}</div>` : ""}</div>
      <div class="body">
        <div class="grp-brand"><img src="${BRAND[g.brand].logo}" alt="">${esc(bname(g.brand))}</div>
        <h3>${esc(groupTitle(g))}</h3>
        <div class="tags">${g.items.slice(0, 4).map(p => `<span>${esc(shortModel(p))}</span>`).join("")}${g.items.length > 4 ? `<span>+${g.items.length - 4}</span>` : ""}</div>
        <div class="grp-foot"><span><b>${g.items.length}</b> ${t("models_avail")}</span><span class="go">${t("choose")} →</span></div>
      </div></a>`;
  const brandTile = b => `<a class="brand-tile" href="#/b/${b.key}"><img src="${b.logo}" alt="${esc(b.en)}" loading="lazy">
      <span>${esc(nm(b))}</span><small>${D.products.filter(p => p.brand === b.key).length} ${t("models_n")}</small></a>`;
  const ctaBand = () => `<div class="cta-band"><div><h3>${t("cta_h")}</h3><p>${t("cta_p")}</p></div>
      <a class="btn btn-red" href="#/contact">${t("cta_btn")}</a></div>`;
  const pageHead = (title, sub, crumbs) => `<section class="page-head"><div class="wrap">
      <div class="crumbs">${crumbs}</div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div></section>`;
  const crumb = (...items) => [`<a href="#/">${t("nav_home")}</a>`, ...items].join(" / ");

  const catSection = (stageKey, withHead) => {
    const tabs = [{ key: "all", label: t("all") }, ...D.stages.map(s => ({ key: s.key, label: nm(s) }))];
    const cats = D.cats.filter(c => stageKey === "all" || c.stage === stageKey);
    return `${withHead ? `<div class="sec-head"><div><span class="eyebrow">${t("prod_eye")}</span><h2>${t("prod_h")}</h2><p>${t("prod_p")}</p></div></div>` : ""}
      <div class="stage-tabs">${tabs.map(s => `<button type="button" data-stage="${s.key}" class="${s.key === stageKey ? "on" : ""}">${esc(s.label)}</button>`).join("")}</div>
      <div class="cat-grid">${cats.map(catCard).join("")}</div>`;
  };

  const aboutBlock = () => `<div class="about">
      <div class="about-text"><span class="eyebrow">${t("about_eye")}</span><h2 style="font-size:clamp(26px,3vw,36px);color:var(--navy)">${t("about_h")}</h2>
        <p>${t("about_p1")}</p><p>${t("about_p2")}</p><p>${t("about_p3")}</p>
        <div class="values">${["v1", "v2", "v3", "v4"].map(k => `<div>${t(k)}<small>${T[lang === "zh" ? "en" : "zh"][k]}</small></div>`).join("")}</div>
      </div>
      <div class="services">${[1, 2, 3, 4, 5].map(i => `<div class="service"><i>0${i}</i><div><h4>${t("svc" + i)}</h4><p>${t("svc" + i + "p")}</p></div></div>`).join("")}</div>
    </div>`;

  // ===== 页面 =====
  const S60_ID = "shanggong-s60pm-w-pbn";
  function home() {
    const hero = ["shanggong-s60pm", "shanggong-n550-ss", "shanggong-g550-s3-01-356"].map(id => PROD[id]);
    return `<section class="hero"><div class="wrap">
      <div class="hero-in">
        <div><span class="eyebrow">${t("hero_eye")}</span><h1>${t("hero_h1")}</h1><p class="lead">${t("hero_lead")}</p>
          <div class="hero-cta"><a class="btn btn-red" href="#/products">${t("hero_btn1")}</a><a class="btn btn-line" href="#/contact">${t("hero_btn2")}</a></div></div>
        <div class="hero-art">
          <a class="main" href="${groupLink("lockstitch", "shanggong", hero[0].id)}"><img src="${hero[0].img}" alt="${esc(hero[0].model)}"></a>
          <a class="chip c1" href="#/c/overlock"><img src="${hero[1].img}" alt=""><span>${esc(nm(CAT.overlock))}</span></a>
          <a class="chip c2" href="#/c/interlock"><img src="${hero[2].img}" alt=""><span>${esc(nm(CAT.interlock))}</span></a>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><b>${D.brands.length}+</b><span>${t("st_brands")}</span></div>
        <div class="stat"><b>${Math.floor(D.products.length / 10) * 10}+</b><span>${t("st_models")}</span></div>
        <div class="stat"><b>${D.cats.length}</b><span>${t("st_cats")}</span></div>
        <div class="stat"><b>${t("st_stage_v")}</b><span>${t("st_stage")}</span></div>
      </div></div></section>
    <section class="s60-sec"><div class="wrap">
      <div class="s60-head">
        <div><span class="eyebrow">${t("s60_eye")}</span><h2>${t("s60_h")}</h2><p>${t("s60_p")}</p></div>
        <div class="s60-kpis">
          <div><b>5000</b><small>rpm</small><span>${t("s60_k1")}</span></div>
          <div><b>77</b><small>dB</small><span>${t("s60_k2")}</span></div>
          <div><b>0.04–6</b><small>mm</small><span>${t("s60_k3")}</span></div>
          <div><b>2</b><small>mm</small><span>${t("s60_k4")}</span></div>
        </div>
      </div>
      <div class="s60" id="s60"><div class="s60-loading"><img src="${PROD[S60_ID].img}" alt="S60"></div></div>
      <div class="s60-cta"><a class="btn btn-red" href="${groupLink("lockstitch", "shanggong", S60_ID)}">${t("s60_btn")}</a></div>
    </div></section>
    <section class="section" id="about"><div class="wrap">${aboutBlock()}</div></section>
    <section class="section alt"><div class="wrap" id="catWrap">${catSection("all", true)}</div></section>
    <section class="section"><div class="wrap">
      <div class="sec-head"><div><span class="eyebrow">${t("brands_eye")}</span><h2>${t("brands_h")}</h2><p>${t("brands_p")}</p></div>
        <a class="btn btn-line" href="#/brands">${t("nav_brands")} →</a></div>
      <div class="brand-wall">${D.brands.map(brandTile).join("")}</div></div></section>
    <section class="section alt"><div class="wrap">${ctaBand()}</div></section>`;
  }

  // 3D 模型：首页渲染后挂载，离开首页时释放
  let s60 = null;
  let s60Script = null;
  function mountS60() {
    const el = document.getElementById("s60");
    if (!el || s60) return;
    if (!window.NEWDIM_S60) {            // 3D 脚本只在首页需要时才加载
      if (!s60Script) {
        s60Script = document.createElement("script");
        s60Script.src = "s60-3d.bundle.js";
        document.head.appendChild(s60Script);
      }
      return;
    }
    s60 = window.NEWDIM_S60.mount(el, lang, { fullLink: "s60.html" });
  }
  window.addEventListener("newdim-s60-ready", mountS60);

  function about() {
    return pageHead(t("about_h"), "NEWDIM INTELLIGENT TECHNOLOGY CO., LTD", crumb(t("nav_about"))) +
      `<section class="section"><div class="wrap">${aboutBlock()}</div></section><section class="section alt"><div class="wrap">${ctaBand()}</div></section>`;
  }

  function products() {
    return pageHead(t("nav_products"), t("prod_p"), crumb(t("nav_products"))) +
      `<section class="section alt"><div class="wrap" id="catWrap">${catSection("all", false)}</div></section>`;
  }

  // 某类机器：每个品牌一个商品
  function category(catKey) {
    const c = CAT[catKey];
    if (!c) return notFound();
    const groups = groupsIn(catKey);
    return pageHead(esc(nm(c)), t("cat_hint"), crumb(`<a href="#/products">${t("nav_products")}</a>`, esc(nm(c)))) +
      `<section class="section alt" style="padding-top:36px"><div class="wrap">
        <div class="result-bar"><span>${groups.length} ${t("brands_n")} · ${inCat(catKey).length} ${t("models_n")}</span>
          <input class="search" id="gsearch" type="search" placeholder="${t("search_g")}"></div>
        <div class="grp-grid" id="ggrid">${groups.map(groupCard).join("")}</div></div></section>`;
  }

  // 商品页：选型号 → 选配置
  const SEL = { id: null, vals: [] };
  function skuOf(p) {
    if (!p.opts.length) return shortModel(p);
    const vals = p.opts.map((o, i) => (o.v[SEL.vals[i]] || o.v[0]).v).map(v => (v === "标准" ? "" : v));
    return p.fmt.replace(/\{(\d)\}/g, (_, i) => vals[i] ?? "");
  }
  function groupPage(catKey, brandKey, pid) {
    const items = CAT[catKey] && BRAND[brandKey] ? groupOf(catKey, brandKey) : [];
    if (!items.length) return notFound();
    const p = items.find(x => x.id === pid) || items[0];
    if (SEL.id !== p.id) { SEL.id = p.id; SEL.vals = p.opts.map(() => 0); }
    const c = CAT[catKey], b = BRAND[brandKey];
    const sku = skuOf(p);
    const picked = p.opts.map((o, i) => o.v[SEL.vals[i]]).filter(v => v && v.d).map(v => v.d);
    const enLine = lang === "zh" ? p.en : (p.en ? p.cn : "");
    const others = groupsIn(catKey).filter(x => x.brand !== brandKey).slice(0, 4);
    const tel = CONTACT.phones[0].replace(/\s/g, "").replace(/^0/, "");
    const modelChips = items.length > 1 ? `<div class="opt-row"><div class="opt-label">${t("model_label")}</div>
        <div class="opt-vals sw">${items.map(x => `<a class="sw-chip ${x.id === p.id ? "on" : ""}" href="${groupLink(catKey, brandKey, x.id)}" title="${esc(pname(x))}">
          <img src="${x.img}" alt="" loading="lazy"><span>${esc(shortModel(x))}</span></a>`).join("")}</div></div>` : "";
    const optRows = p.opts.map((o, i) => `<div class="opt-row"><div class="opt-label">${esc(nm(o))}</div><div class="opt-vals">${o.v.map((v, j) =>
        `<button type="button" class="opt ${SEL.vals[i] === j ? "on" : ""}" data-opt="${i}" data-val="${j}" title="${esc(v.d)}">${esc(v.v)}${v.d ? `<small>${esc(v.d)}</small>` : ""}</button>`).join("")}</div></div>`).join("");
    return `<section class="page-head" style="padding:22px 0"><div class="wrap"><div class="crumbs">${crumb(`<a href="#/products">${t("nav_products")}</a>`,
        `<a href="#/c/${catKey}">${esc(nm(c))}</a>`, esc(bname(brandKey)))}</div></div></section>
      <div class="wrap"><div class="buy">
        <div class="gallery"><img src="${p.img}" alt="${esc(p.model)}"></div>
        <div class="buy-info">
          <div class="brandline"><img src="${b.logo}" alt=""><a href="#/b/${brandKey}"><b>${esc(bname(brandKey))}</b></a><span class="badge">${esc(nm(c))}</span></div>
          <h1>${esc(pname(p))}</h1>
          ${enLine ? `<div class="en">${esc(enLine)}</div>` : ""}
          <div class="price"><span class="price-k">${t("price")}</span><b>${t("price_v")}</b><small>${t("price_note")}</small></div>
          ${modelChips}${optRows}
          <div class="opt-row picked"><div class="opt-label">${t("selected")}</div>
            <div><b class="sku">${esc(sku)}</b>${picked.length ? `<span class="muted"> · ${esc(picked.join(" / "))}</span>` : ""}</div></div>
          <div class="cta-row"><a class="btn btn-red" href="#/contact/${encodeURIComponent(sku)}">${t("ask_now")}</a>
            <a class="btn btn-line" href="tel:+855${tel}">${t("call")} ${CONTACT.phones[0]}</a></div>
        </div></div>
        ${p.features.length || p.specs.length || p.note ? `<div class="spec-wrap">
          ${p.features.length ? `<div class="box"><h4>${t("features")}</h4><ul>${p.features.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
          ${p.specs.length ? `<div class="box"><h4>${t("specs")}</h4><ul class="spec-list">${p.specs.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
          ${p.note ? `<div class="box"><h4>${t("variants")}</h4><p style="margin:0">${esc(p.note)}</p></div>` : ""}
        </div>` : ""}
      </div>
      ${others.length ? `<section class="section alt"><div class="wrap"><div class="sec-head"><h2>${t("other_brands")}</h2></div>
        <div class="grp-grid">${others.map(groupCard).join("")}</div></div></section>` : ""}`;
  }

  function brands() {
    return pageHead(t("brands_h"), t("brands_p"), crumb(t("nav_brands"))) +
      `<section class="section"><div class="wrap"><div class="brand-wall">${D.brands.map(brandTile).join("")}</div></div></section>`;
  }

  function brandPage(key) {
    const b = BRAND[key];
    if (!b) return notFound();
    const list = D.products.filter(p => p.brand === key);
    const groups = D.cats.filter(c => list.some(p => p.cat === c.key)).map(c => ({ cat: c.key, brand: key, items: groupOf(c.key, key) }));
    return pageHead(esc(bname(key)), t("brand_groups").replace("{n}", groups.length) + " · " + t("brand_page_p").replace("{n}", list.length),
        crumb(`<a href="#/brands">${t("nav_brands")}</a>`, esc(bname(key)))) +
      `<section class="section alt"><div class="wrap"><div class="grp-grid">${groups.map(groupCard).join("")}</div></div></section>`;
  }

  function contact(model) {
    const rows = [
      [t("c_company"), lang === "zh" ? "新维智能科技有限公司<br>NEWDIM INTELLIGENT TECHNOLOGY CO., LTD" : "NEWDIM INTELLIGENT TECHNOLOGY CO., LTD<br>新维智能科技有限公司"],
      [t("c_addr"), esc(CONTACT.addrEn)],
      [t("c_phone"), CONTACT.phones.map(n => `<a href="tel:+855${n.replace(/\s/g, "").replace(/^0/, "")}">${n}</a>`).join("<br>")],
      [t("c_wechat"), esc(CONTACT.wechat)],
    ];
    if (CONTACT.email) rows.push([t("c_email"), `<a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a>`]);
    rows.push([t("c_tin"), esc(CONTACT.tin)]);
    const map = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Street 371, Stueng Mean chey, Mean Chey, Phnom Penh, Cambodia");
    return pageHead(t("contact_h"), t("contact_p"), crumb(t("nav_contact"))) +
      `<section class="section"><div class="wrap">
        ${model ? `<div class="asking">${t("asking")}：<b>${esc(model)}</b></div>` : ""}
        <div class="contact">
        <div class="contact-card"><dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
          <div class="cta-row"><a class="btn btn-red" href="tel:+855${CONTACT.phones[0].replace(/\s/g, "").replace(/^0/, "")}">${t("c_phone")} ${CONTACT.phones[0]}</a>
          <a class="btn btn-line" href="${map}" target="_blank" rel="noopener">${t("map")}</a></div></div>
        <div class="contact-card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
          <img src="assets/logo.png" alt="NEWDIM" style="width:200px">
          <p class="muted" style="margin-top:16px">${t("hero_lead")}</p></div>
      </div></div></section>`;
  }

  function notFound() {
    return `<section class="section"><div class="wrap empty"><h2>${t("not_found")}</h2><a class="btn btn-red" href="#/">${t("home")}</a></div></section>`;
  }

  // ===== 路由 =====
  function render(keepScroll) {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean).map(decodeURIComponent);
    const [page, a, b, c] = parts;
    if (page === "p" && PROD[a]) {   // 旧链接 → 商品页
      location.replace(groupLink(PROD[a].cat, PROD[a].brand, a));
      return;
    }
    if (s60) { s60.dispose(); s60 = null; }
    let html, after;
    if (!page) { html = home(); after = mountS60; }
    else if (page === "about") html = about();
    else if (page === "products") html = products();
    else if (page === "c") {
      html = category(a);
      after = () => {
        const q = document.getElementById("gsearch");
        if (!q) return;
        q.addEventListener("input", () => {
          const s = q.value.trim().toLowerCase();
          const gs = groupsIn(a).filter(g => !s || (groupTitle(g) + BRAND[g.brand].en + g.items.map(p => p.model + p.cn + p.en).join(" ")).toLowerCase().includes(s));
          document.getElementById("ggrid").innerHTML = gs.length ? gs.map(groupCard).join("") : `<div class="empty" style="grid-column:1/-1">${t("no_result")}</div>`;
        });
      };
    }
    else if (page === "g") html = groupPage(a, b, c);
    else if (page === "brands") html = brands();
    else if (page === "b") html = brandPage(a);
    else if (page === "contact") html = contact(a);
    else html = notFound();
    app.innerHTML = html;
    if (after) after();
    document.querySelectorAll(".nav a").forEach(el => {
      const h = el.getAttribute("href").slice(2);
      const cur = page === "c" || page === "g" ? "products" : page === "b" ? "brands" : page || "";
      el.classList.toggle("active", !el.classList.contains("btn") && h === cur);
    });
    document.getElementById("nav").classList.remove("open");
    const gp = page === "g" && CAT[a] && BRAND[b] ? `${bname(b)} ${nm(CAT[a])}` : "";
    const title = gp || (page === "c" && CAT[a] ? nm(CAT[a]) : "");
    document.title = (title ? title + " | " : "") + (lang === "zh" ? "新维智能 NEWDIM" : "NEWDIM Intelligent Technology");
    // 同一商品页内切换型号时保持滚动位置，其它页面回到顶部
    const key = page === "g" ? `g/${a}/${b}` : parts.join("/");
    if (!keepScroll && render.lastKey !== key) window.scrollTo({ top: 0, behavior: "instant" });
    render.lastKey = key;
  }

  function staticText() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
    document.getElementById("lang").textContent = lang === "zh" ? "EN" : "中文";
    document.getElementById("footAddr").textContent = CONTACT.addrEn;
    document.getElementById("footCats").innerHTML = D.stages.map(s => {
      const c = D.cats.find(c => c.stage === s.key);
      return `<li><a href="#/c/${c.key}">${esc(nm(s))}</a></li>`;
    }).join("");
    document.getElementById("footContact").innerHTML = CONTACT.phones.map(n => `<li>${t("c_phone")}：${n}</li>`).join("") +
      `<li>${t("c_wechat")}：${esc(CONTACT.wechat)}</li>` + (CONTACT.email ? `<li>${esc(CONTACT.email)}</li>` : "");
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // 阶段切换（首页、产品中心）
  app.addEventListener("click", e => {
    const btn = e.target.closest("[data-stage]");
    if (!btn) return;
    const wrap = document.getElementById("catWrap");
    wrap.innerHTML = catSection(btn.dataset.stage, !!wrap.querySelector(".sec-head"));
  });
  // 商品页：选择配置
  app.addEventListener("click", e => {
    const o = e.target.closest("[data-opt]");
    if (!o) return;
    SEL.vals[+o.dataset.opt] = +o.dataset.val;
    render(true);
  });
  document.getElementById("lang").addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem("newdim-lang", lang); } catch (e) {}
    staticText();
    const y = window.scrollY;
    render(true);
    window.scrollTo({ top: y, behavior: "instant" });
  });
  document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
  window.addEventListener("hashchange", () => render());
  staticText();
  render();
})();
