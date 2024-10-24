module.exports = {
  credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET, // add exactly this
  adminAuth: {
    type: "strategy",
    strategy: {
      name: "openidconnect",
      label: "Sign in with authentik",
      icon: "fa-cloud",
      strategy: require("passport-openidconnect").Strategy,
      options: {
        issuer: "https://authentik.company/application/o/<application-slug>/",
        authorizationURL: "https://authentik.company/application/o/authorize/",
        tokenURL: "https://authentik.company/application/o/token/",
        userInfoURL: "https://authentik.company/application/o/userinfo/",
        clientID: "<Client ID (Key): Step 2>",
        clientSecret: "<Client Secret: Step 2>",
        callbackURL: "https://nodered.company/auth/strategy/callback/",
        scope: ["email", "profile", "openid"],
        proxy: true,
        verify: function (issuer, profile, done) {
          done(null, profile);
        },
      },
    },
    users: function (user) {
      return Promise.resolve({ username: user, permissions: "*" });
    },
  },
};
