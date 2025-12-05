const User = require("../models/user");

//user signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

//user signup
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to Roomora");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//user login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

//user login
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Roomora!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//user logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings")
    })
};