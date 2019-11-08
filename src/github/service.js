import axios from "axios";

const urlGit = 'https://api.github.com';
const clientID = 'd2c8e4060ad563b6f776';
const clientSecret = 'f75fe2a775dc6dfc67a4e09568413c7095f80fbc';

export default {

    login: (code) => {
        return new Promise((resolve, reject) => {
            axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`)
                .then((response) => {
                    resolve(response.data);
                }).catch(error => {
                reject(error)
            });
        })
    },

    listUsers: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${urlGit}/users`, {
                headers: {
                    'Accept'        : 'application/json',
                    'Authorization' : 'bearer 43290e07eb870713b0273d123a872c34e9203e9b'
                }
            })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                reject(error)
            });
        })
    },

    getUser: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${urlGit}/user`, {
                headers: {
                    'Accept'        : 'application/json',
                    'Authorization' : 'bearer 43290e07eb870713b0273d123a872c34e9203e9b'
                }
            })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                reject(error)
            });
        })
    },

    getUserByName: (user) => {
        return new Promise((resolve, reject) => {
            axios.get(`${urlGit}/users/${user}`, {
                headers: {
                    'Accept'        : 'application/json',
                    'Authorization' : 'bearer 43290e07eb870713b0273d123a872c34e9203e9b'
                }
            })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                reject(error)
            });
        })
    },

    getUserRepos: (user) => {
        return new Promise((resolve, reject) => {
            axios.get(`${urlGit}/users/${user}/repos`, {
                headers: {
                    'Accept'        : 'application/json',
                    'Authorization' : 'bearer 43290e07eb870713b0273d123a872c34e9203e9b'
                }
            })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                reject(error)
            });
        })
    },

    getUserReposLanguage: (user, repos) => {
        return new Promise((resolve, reject) => {
            axios.get(`${urlGit}/repos/${user}/${repos}/languages`, {
                headers: {
                    'Accept'        : 'application/json',
                    'Authorization' : 'bearer 43290e07eb870713b0273d123a872c34e9203e9b'
                }
            })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {

                    console.log(error)
                reject(error)
            });
        })
    },
};
