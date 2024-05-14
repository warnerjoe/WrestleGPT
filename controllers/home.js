module.exports = {
    getIndex: (req,res)=>{
        res.render('index', { user: req.user });
    },
    getMeltzerGPT: (req, res) => {
        res.render('meltzergpt.ejs')
    },
    getProfile: (req, res) => {
        res.render('profile.ejs')
    }
}