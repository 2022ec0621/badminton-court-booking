export function toISODateLocal(input) {
  if (!input) return null;
  const d = new Date(input);
  return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,16);
}
