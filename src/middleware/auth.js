const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt")
const Student = require("../models/studentModel")

const jwt_secret = "password";

const strategy = new Strategy( 
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret
    },
    async (jwtPayload, done) => {
        try {
            const student = await Student.findById({studentid: jwtPayload.id})
            if(!student) {
                const error = new Error("Student not found")
                console.log(error)
            }
            done(null, student) 

        } catch (error) {
            done(error)
        }
    }
);

passport.use(strategy);

const initialize = () => {
    return passport.initialize();
};

const authenticate = () => {
    return passport.authenticate("jwt", {session:false})
} 

module.exports = {
    initialize,
    authenticate,
}