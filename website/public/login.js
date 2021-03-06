const Client = require('../../main').Client
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')
module.exports = {
    name: '/login',
    run: async (req, res) => {
       const url = process.oauth.generateAuthUrl({
           scope: ["identify"],
           state: require('crypto').randomBytes(16).toString("hex"),
       });
       if(req.cookies.token && req.cookies.token.length > 0) {
           let decoded;
           try{
               decoded = jwt.verify(req.cookies.token, config.jwt_secret);
           }catch {
               return res.redirect('/login');
           }
           if(!decoded) res.redirect(url);
           let data = await Schema.findOne({
            _id: decoded.uuid
           });
           if (!data) res.redirect(url);
           else {
            if ((Date.now() - data.lastUpdated) > data.expires_in * 10000) {
                const oauthData = process.oauth.tokenRequest({
                    refreshToken: data.refresh_token,
                    grantType: "refresh_token",
                    scope: ["identify"]
                });
                data.access_token = oauthData.access_token;
                data.refresh_token = oauthData.refresh_token;
                data.expires_in = oauthData.expires_in;
           }
           await data.save();
           res.redirect('/dashboard');
       }
    }else res.redirect(url)
}
}