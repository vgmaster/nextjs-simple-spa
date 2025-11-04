export function encodeId(id: string) {
  return id.replace(/\//g, "__");
}

export function decodeId(id: string) {
  return id.replace(/__/g, "/");
}
