import { generateCodeVerifier, generateCodeChallenge } from "./pkce-utils";

export const usePKCEAuth = () => {
  const startLoginFlow = async (
    authServerUrl: string,
    clientId: string,
    redirectUri: string,
  ) => {
    const verifier = generateCodeVerifier();
    // CSRF対策のためのstateも生成
    const state = generateCodeVerifier();

    sessionStorage.setItem("pkce_verifier", verifier);
    sessionStorage.setItem("pkce_state", state);

    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code_challenge: challenge,
      code_challenge_method: "S256",
      scope: "openid profile email",
      state: state,
    });

    window.location.href = `${authServerUrl}?${params.toString()}`;
  };

  return { startLoginFlow };
};
