export function foldColor(v) {
  const val = Math.min(Math.max(v, 0), 7);
  // Dark neutral at 1.0; steel below, site orange above. sqrt keeps 0.8 and 2 visible on a dark base.
  const N = [30, 29, 26], LO = [96, 138, 168], HI = [232, 82, 10];
  const t = val <= 1.0 ? Math.sqrt(1 - val) : Math.sqrt(Math.min((val - 1) / 6, 1));
  const E = val <= 1.0 ? LO : HI;
  return `rgb(${N.map((n, i) => Math.round(n + t * (E[i] - n))).join(',')})`;
}

export function txtCol(v) {
  return v > 5.5 ? '#0a0a09' : '#f0ede8';
}

export function gmean(arr, g) { 
  return arr.reduce((s, r) => s + (r[g] || 0), 0) / arr.length; 
}

export function gsd(arr, g) {
  const m = gmean(arr, g);
  return Math.sqrt(arr.reduce((s, r) => s + ((r[g] || 0) - m) ** 2, 0) / (arr.length - 1));
}
