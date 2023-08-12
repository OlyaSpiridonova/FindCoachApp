export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmM03gI-5dpD7JRMHx0Mn7EYtMs3UpJM0";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmM03gI-5dpD7JRMHx0Mn7EYtMs3UpJM0";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authentication"
      );
      throw error;
    }

    localStorage.setItem("idToken", responseData.idToken);
    localStorage.setItem("localId", responseData.localId);

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  logout(context) {
    localStorage.removeItem("idToken");
    localStorage.removeItem("localId");

    context.commit("setUser", {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("idToken");
    const userId = localStorage.getItem("localId");

    if (token && userId) {
      context.commit("setUser", {
        userId: userId,
        token: token,
        tokenExpiration: null,
      });
    }
  },
};
