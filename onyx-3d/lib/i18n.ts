import type { Metadata } from "next";

export type Lang = "de" | "es";

export const LANG_STORAGE_KEY = "onyx-lang";

/** Rechtstexte bleiben auf Deutsch (rechtlich maßgebliche Fassung), Testseiten sind intern. */
const DE_ONLY_PREFIXES = ["/impressum", "/datenschutz", "/agb"];

function isDeOnly(path: string) {
  return DE_ONLY_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Macht aus einem deutschen Pfad den Pfad in der gewünschten Sprache: "/angebot" -> "/es/angebot". */
export function lp(lang: Lang, path: string): string {
  if (lang === "de" || !path.startsWith("/") || isDeOnly(path)) return path;
  if (path === "/") return "/es";
  if (path.startsWith("/#")) return `/es${path.slice(1)}`;
  return `/es${path}`;
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "de";
}

/** "/es/angebot" -> "/angebot", "/es" -> "/". */
export function stripLang(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

/** Zielpfad beim Sprachwechsel: gleiche Seite in der anderen Sprache, sonst deren Startseite. */
export function switchPath(pathname: string, target: Lang): string {
  const base = stripLang(pathname);
  if (target === "es" && isDeOnly(base)) return "/es";
  return lp(target, base);
}

/** hreflang-Verweise, damit Google die beiden Sprachfassungen einer Seite einander zuordnet. */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: lp(lang, path),
    languages: { de: path, es: lp("es", path), "x-default": path },
  };
}

/**
 * Läuft als Inline-Script im <head>, bevor die Seite sichtbar wird.
 * Reihenfolge: 1. manuell gewählte Sprache, 2. Browser-/Handysprache (de oder es),
 * 3. Land über die Netlify-Geolocation (/geo.json, siehe netlify.toml), sonst Deutsch.
 */
export const LANG_DETECT_SCRIPT = `(function(){try{
var K=${JSON.stringify(LANG_STORAGE_KEY)};
var D=${JSON.stringify(DE_ONLY_PREFIXES)};
var p=location.pathname;if(p==="/index.html")p="/";
var cur=(p==="/es"||p.indexOf("/es/")===0||p==="/es.html")?"es":"de";
function deOnly(x){for(var i=0;i<D.length;i++){if(x===D[i]||x.indexOf(D[i]+"/")===0||x.indexOf(D[i]+".html")===0)return true}return false}
function go(t){if(t===cur)return;var b=cur==="es"?(p==="/es"||p==="/es.html"?"/":p.slice(3)):p;
if(t==="es"){if(deOnly(b))return;b=b==="/"?"/es":"/es"+b}
location.replace(b+location.search+location.hash)}
var s=null;try{s=localStorage.getItem(K)}catch(e){}
if(s==="de"||s==="es"){go(s);return}
var L=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];
for(var i=0;i<L.length;i++){var l=String(L[i]||"").toLowerCase().slice(0,2);if(l==="de"||l==="es"){go(l);return}}
var g=null;try{g=sessionStorage.getItem("onyx-geo")}catch(e){}
if(g==="de"||g==="es"){go(g);return}
fetch("/geo.json",{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){if(d&&(d.lang==="es"||d.lang==="de")){try{sessionStorage.setItem("onyx-geo",d.lang)}catch(e){}go(d.lang)}}).catch(function(){});
}catch(e){}})();`;
