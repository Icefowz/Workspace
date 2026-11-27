(function () {
  var root = document.querySelector(".dgs"); if (!root) return;
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still) root.querySelectorAll("video").forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); });

  root.querySelectorAll("[data-dgs-form]").forEach(function (form) {
    var err = form.querySelector(".dgs-form__err"), done = form.querySelector(".dgs-form__done");
    var field = function (n) { return form.querySelector('[name="' + n + '"]'); };
    var bad = function (el, msg) { el.closest(".dgs-fld").classList.add("is-bad"); err.textContent = msg; el.focus(); };
    form.addEventListener("input", function (e) { var f = e.target.closest(".dgs-fld"); if (f) f.classList.remove("is-bad"); err.textContent = ""; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.querySelectorAll(".dgs-fld.is-bad").forEach(function (f) { f.classList.remove("is-bad"); });
      var name = field("name"), phone = field("phone"), email = field("email"), consent = field("consent");
      if (!name.value.trim()) return bad(name, "Συμπληρώστε το ονοματεπώνυμό σας");
      if (phone.value.replace(/\D/g, "").length < 10) return bad(phone, "Συμπληρώστε ένα σωστό τηλέφωνο");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) return bad(email, "Συμπληρώστε ένα σωστό email");
      if (!consent.checked) { err.textContent = "Χρειαζόμαστε τη συγκατάθεσή σας για να σας απαντήσουμε"; return; }
      if (field("website").value) return;
      var finish = function () { form.classList.remove("is-sending"); form.classList.add("is-done"); done.hidden = false; };
      var url = form.getAttribute("data-endpoint");
      form.classList.add("is-sending");
      if (!url) { setTimeout(finish, 700); return; }
      fetch(url, { method: "POST", body: new FormData(form) }).then(function (r) { if (!r.ok) throw 0; finish(); }).catch(function () { form.classList.remove("is-sending"); err.textContent = "Κάτι πήγε στραβά, δοκιμάστε ξανά ή καλέστε μας στο +30 231 607 0788"; });
    });
  });

  var items = root.querySelectorAll("[data-dgs-reveal]");
  if (still || !("IntersectionObserver" in window)) return;
  root.classList.add("js");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
