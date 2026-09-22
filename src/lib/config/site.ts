export const SITE_URL = "https://couturemei.com";
export const SITE_NAME = "WNR Bridal Studio";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
