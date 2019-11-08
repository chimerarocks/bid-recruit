import User from "../models/User";
import Language from "../models/Language";
import GitService from "../github/service";

export default {

    create: async (args,req) => {

        const uuid = args.user.uuid;

        // let user = await User.findOne({ uuid: uuid })
        //
        // if(user){
        //     throw new Error('user ja existe')
        // }



        let userData = await GitService.getUserByName(uuid);
        userData['uuid'] = userData['id'];
        delete userData['id'];

        let user = await User.create(userData);
        user.save();
        let repos = await GitService.getUserRepos(userData['login']);

        repos.map( async (repo)=>{

            let language = await Language.findOne({name : repo['language']})

            if(!language){
                language = await Language.create({name : repo['language']})
            }

            console.log(language)

            User.findByIdAndUpdate(user._id,
                {$pull: {languages: language}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(doc);
                    }
                }
            );

        });

        return user;


        // let user = await User.findOne({ uuid: args.user.uuid })
        //
        // if(!user){
        //     user = await User.create({ uuid: args.user.uuid });
        // }

        // let user = await User.create(userData);
        // user.update(userData);


        // console.log(user)


        // .then((data) => {
        //     return res.status(200).send(data)
        // })
        // .catch(error => {
        //     return res.status(error.response.status).send(error.message)
        // });

        // let language = await Language.findOne({name : 'NODE'})
        //
        // if(!language){
        //     language = await Language.create({name : 'NODE'})
        // }

        // let user = await User.findOne({ uuid: args.user.uuid })
        //
        // if(!user){
        //     user = await User.create({ uuid: args.user.uuid });
        // }
        //
        // // user.languages.push(language);
        // // user.save();
        //
        // return user;
    },

    remove: (id) => {
        User.findOneAndRemove({_id: id}, (err) => {

            if (!err) {
                return true;
            }
            throw new Error('User not found')
        })
    },

    find: () => {
        User.find({}, (err, result) => {
            if (!err) {
                return result;
            }

            throw new Error('User not found')
        });
    }
};
