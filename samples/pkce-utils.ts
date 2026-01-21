/**
 * PKCE (RFC 7636) Utility Functions
 * 外部ライブラリに依存せず、Web Crypto API を用いて実装
 */

/**
 * 1. code_verifier の生成
 * ランダムな文字列を生成する (43〜128文字)
 */
export const generateCodeVerifier = (): string => {
  const array = new Uint32Array(56);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join(
    ""
  );
};

/**
 * 2. code_challenge の生成
 * code_verifier を SHA-256 でハッシュ化し、Base64URL エンコードする
 */
export const generateCodeChallenge = async (
  verifier: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
