module.exports = {
  options: {
    url: "ldap://192.168.23.100:389",
    timeout: "inems",
    connectTimeout: "inems",
    reconnect: true,
  },
  managerUser: "cn=admin,dc=inspace,dc=co,dc=kr",
  managerUserPassword: "dlstmvpdltm!23",
  domain: "dc=inspace,dc=co,dc=kr",
};