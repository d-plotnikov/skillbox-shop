export default function numFormat(value) {
  return new Intl.NumberFormat().format(value);
}
