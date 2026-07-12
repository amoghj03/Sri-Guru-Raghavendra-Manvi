// Indian-format currency + compact helpers used across the site.

export function formatINRCompact(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)} K`
  return `₹${Math.round(n)}`
}

export function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export function toCrore(n) {
  return n / 10000000
}
