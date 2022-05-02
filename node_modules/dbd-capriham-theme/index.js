module.exports = (themeConfig={}) => {
    return {
        viewsPath: require('path').join(__dirname, '/views'),
        staticPath: require('path').join(__dirname, '/views/src'),
        themeConfig: themeConfig,
        init: (app, config)=>{
            app.use('/commands', (req,res)=>{
                res.render('commands', {req:req,config:config,themeConfig:themeConfig});
            });

            

            app.use('/privacy-policy', (req,res) => {
                res.render('pp', {req:req,config:config,themeConfig:themeConfig});
            });
        },
        customThemeOptions: {
            manage: async ({req,res,config}) => {
                return {
                    isPremium: req.session.user.id == "123" ? true : false,
                }
            },
            getGuild: async ({req,res,config,guildId}) => {
                return {
                    isPremium: req.session.user.id == "123" ? true : false,
                }
            },
            settingsUpdate: async ({req,res,config,guildId,categoryId}) => {
                return {
                    isPremium: req.session.user.id == "123" ? true : false,
                }
            },
            index: async ({req,res,config}) => {
                return {
                    isPremium: req.session.user.id == "123" ? true : false,
                }
            }
        }
    };
};
