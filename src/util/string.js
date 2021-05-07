/* jshint esversion: 6*/
// Polyfill for older browsers
// Instance format
export default function () {
  if (!String.prototype.format) {
    String.prototype.format = function () {
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof arguments[number] !== 'undefined' ? arguments[number] : match
      })
    }
  }

  // Static method
  if (!String.format) {
    String.format = function (format) {
      const args = Array.prototype.slice.call(arguments, 1)
      return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match
      })
    }
  }
}
