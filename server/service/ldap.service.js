const ldapjs = require('ldapjs');
const ldapConfig = require("../config/ldap.config");
const execSync = require("child_process").execSync;

exports.createEntiry = (newEntiry) => {
    return new Promise((resolve, reject) => {
        const ldapClient = ldapjs.createClient(ldapConfig.options);
        ldapClient.bind(
            ldapConfig.managerUser,
            ldapConfig.managerUserPassword,
            (err) => {
                if (err) {
                    return reject(err);
                }

                //newEntiry.userPassword = execSync('slappasswd -h {SSHA} -s ' + newEntiry.userPassword).toString();
                newEntiry.userPassword = execSync('echo 123').toString();
                console.log(newEntiry.userPassword);
                ldapClient.add(
                    "cn="+ newEntiry.cn + ",ou=users," + ldapConfig.domain,
                    newEntiry,
                    (err, response) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(response);
                    }
                );
            }
        );
    });
}

exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        const ldapClient = ldapjs.createClient(ldapConfig.options);
        console.log("Authenticate : " + email + "," + password);
        ldapClient.bind(
            'cn=' + email + ',ou=users,' + ldapConfig.domain,
            password,
            (err, res) => {
                if (err) {
                    return reject(err);
                }

                const options = {
                    attributes: [
                        "cn",
                        "mail",
                        "uid",
                        "mobile",
                        "employeeType",
                        "gidNumber",
                    ],
                    scope: "sub",
                    filter: "(objectClass=person)"
                };

                ldapClient.search("cn=" + email + ",ou=users," + ldapConfig.domain,options, (err, res) => {

                    let object = null;
                    if (err) return reject(err);
                    res.on('searchEntry', function (entry) {
                        object = entry.object;
                    });

                    res.on('error', function (err) {
                        return reject(err);
                    });

                    res.on('end', function (result) {
                        ldapClient.unbind();
                        return resolve(object);
                    });
                });
                

                //ldapClient.unbind();
                //return resolve(res);
            }
        );
    });
}

exports.getEntiryByCn = () => {
    return new Promise((resolve, reject) => {
        const ldapClient = ldapjs.createClient(ldapConfig.options);
        ldapClient.bind(
            ldapConfig.managerUser,
            ldapConfig.managerUserPassword,
            (err, res) => {
                if (err) {
                    return reject(err);
                }

                const options = {
                    attributes: [
                        "cn",
                        "userPassword",
                        "mail"
                    ],
                    scope: "sub",
                    filter: "(objectClass=person)"
                };

                ldapClient.search("ou=users," + ldapConfig.domain, options, (err, res) => {

                    if (err) return reject(err);
                    let entries = [];
                    res.on('searchEntry', function (entry) {
                        var r = entry.object;
                        entries.push(r);
                    });

                    res.on('error', function (err) {
                        return reject(err);
                    });

                    res.on('end', function (result) {
                        return resolve(entries);
                    });
                });
            }
        );
    });
}

exports.changePassword = (userId, passwordOld, passwordNew) => {
    return new Promise((resolve, reject) => {
        const ldapClient = ldapjs.createClient(ldapConfig.options);

        //passwordNew = execSync('slappasswd -h {SSHA} -s ' + passwordNew).toString();
        ldapClient.bind(
            'cn=' + userId + ',ou=users,' + ldapConfig.domain,
            passwordOld,
            err => {
                if (err) return reject(err);
                ldapClient.modify('cn=' + userId + ',ou=users,' + ldapConfig.domain,
                    [
                        new ldapjs.Change({
                            operation: 'replace',
                            modification: {
                                userPassword: passwordNew
                            }
                        })
                    ],
                    (err) => {
                        if (err) reject(err);
                        return resolve(true);
                    }
                );
            }
        );
    });
}

