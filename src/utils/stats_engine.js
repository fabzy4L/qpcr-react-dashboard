export function foldColor(v) {
  const val = Math.min(Math.max(v, 0), 7);
  if (val <= 1.0) {
    const t = val;
    return `rgb(${Math.round(18+t*227)},${Math.round(58+t*187)},${Math.round(178+t*72)})`;
  }
  const t = Math.min((val - 1) / 6, 1);
  return `rgb(${Math.round(245-t*45)},${Math.round(245-t*215)},${Math.round(250-t*220)})`;
}

export function txtCol(v) { 
  return (v < 0.62 || v > 2.1) ? '#fff' : '#091520'; 
}

export function gmean(arr, g) { 
  return arr.reduce((s, r) => s + (r[g] || 0), 0) / arr.length; 
}

export function gsd(arr, g) {
  const m = gmean(arr, g);
  return Math.sqrt(arr.reduce((s, r) => s + ((r[g] || 0) - m) ** 2, 0) / (arr.length - 1));
}
