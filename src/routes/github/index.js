import {Router} from 'express';
import GitService from '../../github/service';

const router = Router();

const clientID = 'd2c8e4060ad563b6f776';


router.get('/login', (req, res) => {
    return res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`);
});

router.get("/logged", async (req, res) => {

    const requestToken = req.query.code;

    GitService.login(requestToken).then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

router.get("/users", (req, res) => {

    GitService.listUsers().then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

router.get("/users/me", (req, res) => {

    GitService.getUser().then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

router.get("/users/:user", (req, res) => {

    const user = req.params.user;

    GitService.getUserByName(user)
        .then((data) => {
            return res.status(200).send(data)
        })
        .catch(error => {
            return res.status(error.response.status).send(error.message)
        });
});

router.get("/users/:user/repos", (req, res) => {

    const user = req.params.user;

    GitService.getUserRepos(user).then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

router.get("/users/:user/repos", (req, res) => {

    const user = req.params.user;

    GitService.getUserRepos(user).then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

router.get("/repos/:user/:repos/languages", (req, res) => {

    const user = req.params.user;
    const repos = req.params.repos;

    GitService.getUserReposLanguage(user, repos).then((data) => {
        return res.status(200).send(data)
    }).catch(error => {
        return res.status(error.response.status).send(error.message)
    });
});

export default router;
