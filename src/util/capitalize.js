export default function (text) {
  if (!text || text.trim().length === 0) return ''
  let chars = text.trim().split('')
  let first = chars[0].toUpperCase()
  chars[0] = first
  return chars.join('')
}
// let text = 'foo'
// let first = text.charAt[0]
// text = text.replace(first, first.toUpperCase())