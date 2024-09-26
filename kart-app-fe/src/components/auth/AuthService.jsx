const AuthService = {
  isAuthenticated: false,

  async checkAuthentication() {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        this.isAuthenticated = false;
        return false;
      }

      token = localStorage.getItem("accessToken");
    }

    try {
      const response = await fetch("https://localhost:7197/manage/info", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Authentication check failed.");
        this.isAuthenticated = false;
        return false;
      }

      this.isAuthenticated = true;
      return true;
    } catch (error) {
      console.error("Error during authentication check: ", error);
      this.isAuthenticated = false;
      return false;
    }
  },

  async logout() {
    localStorage.removeItem("tokenType");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("refreshToken");

    this.isAuthenticated = false;
  },

  async refreshToken() {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      this.isAuthenticated = false;
      return false;
    }

    try {
      const response = await fetch("https://localhost:7197/refresh", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        console.error("Failed to refresh token.");
        this.isAuthenticated = false;
        return false;
      }

      const data = await response.json();
      const { accessToken, expiresIn } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiresIn", expiresIn);

      this.isAuthenticated = true;
      return true;
    } catch (error) {
      console.error("Error during token refresh: ", error);
      this.isAuthenticated = false;
      return false;
    }
  },
};

export default AuthService;
