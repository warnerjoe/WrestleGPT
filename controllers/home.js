module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getMeltzerGPT: (req, res) => {
        res.render('meltzergpt.ejs')
    }
}