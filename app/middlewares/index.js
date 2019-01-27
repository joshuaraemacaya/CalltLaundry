exports.customernauthed = (req, res, next) => {
	req.session.user?
		next():
		res.redirect("/customer/index")
}