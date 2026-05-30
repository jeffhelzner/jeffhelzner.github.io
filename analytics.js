(() => {
  const productionHosts = new Set(["jeffhelzner.github.io"]);
  const goatCounterEndpoint = "https://jeffhelzner.goatcounter.com/count";

  if (!productionHosts.has(window.location.hostname)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.setAttribute("data-goatcounter", goatCounterEndpoint);
  document.head.appendChild(script);
})();
