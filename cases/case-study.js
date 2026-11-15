/* Страницы кейсов: просмотр изображений, содержание, кнопка «наверх».
   Подключается с defer из cases/<кейс>/index.html. */
   (function () {
    /* --- Просмотр картинок --- */
    var dlg = document.getElementById("lightbox");
    if (dlg && typeof dlg.showModal === "function") {
      var big = dlg.querySelector("img");
      document.querySelectorAll(".case-figure img").forEach(function (img) {
        img.addEventListener("click", function () {
          big.src = img.currentSrc || img.src;
          big.alt = img.alt;
          big.classList.remove("is-zoomed");
          dlg.showModal();
        });
      });
      big.addEventListener("click", function () {
        big.classList.toggle("is-zoomed");
      });
      dlg.addEventListener("click", function (e) {
        if (e.target === dlg || e.target.classList.contains("lightbox-close")) dlg.close();
      });
    }

    /* --- Содержание: подсветка текущего раздела --- */
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.case-toc > ol > li > a[href^="#"]')
    );
    var targets = links.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });
    var scroller = document.querySelector(".case-scroll");

    function scrollRoot() {
      if (!scroller) return document.scrollingElement;
      var style = getComputedStyle(scroller);
      if (style.overflowY === "auto" || style.overflowY === "scroll") return scroller;
      return document.scrollingElement;
    }

    function updateToc() {
      var root = scrollRoot();
      var rootTop = root === document.scrollingElement ? 0 : root.getBoundingClientRect().top;
      var height = root === document.scrollingElement ? window.innerHeight : root.clientHeight;
      var line = rootTop + height * 0.28;
      var current = -1;
      targets.forEach(function (t, i) {
        if (t && t.getBoundingClientRect().top <= line) current = i;
      });
      var y = root === document.scrollingElement ? window.scrollY : root.scrollTop;
      var maxScroll =
        root === document.scrollingElement
          ? document.documentElement.scrollHeight - window.innerHeight
          : root.scrollHeight - root.clientHeight;
      if (y > 40 && maxScroll - y < 8) current = targets.length - 1;
      links.forEach(function (a, i) {
        a.classList.toggle("is-active", i === current);
      });
    }

    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var root = scrollRoot();
        if (root === document.scrollingElement) return;
        var t = document.getElementById(a.getAttribute("href").slice(1));
        if (!t) return;
        e.preventDefault();
        var top =
          t.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 28;
        root.scrollTo({ top: top, behavior: "smooth" });
        history.pushState(null, "", a.getAttribute("href"));
      });
    });

    /* --- Кнопка «наверх» --- */
    var toTop = document.getElementById("to-top");
    function updateTop() {
      var root = scrollRoot();
      var y = root === document.scrollingElement ? window.scrollY : root.scrollTop;
      toTop.classList.toggle("is-visible", y > 700);
    }
    toTop.addEventListener("click", function () {
      var root = scrollRoot();
      if (root === document.scrollingElement) window.scrollTo({ top: 0, behavior: "smooth" });
      else root.scrollTo({ top: 0, behavior: "smooth" });
    });

    function onScroll() {
      updateToc();
      updateTop();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });
    if (location.hash) {
      var start = document.getElementById(location.hash.slice(1));
      var root = scrollRoot();
      if (start && root !== document.scrollingElement) {
        root.scrollTop =
          start.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 28;
      }
    }
    onScroll();
  })();