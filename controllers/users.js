// router.get('/', passport.authenticate('jwt', {session: false}),async (req,res) => {
//     const locations = await User.find()
//     res.json({data: locations})
// })
//All Users
test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
module.exports = {
    test
}