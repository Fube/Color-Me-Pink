const PATTERN = /^#[0-9A-F]{6}$/i;
export default (hex:string) => PATTERN.test(hex);