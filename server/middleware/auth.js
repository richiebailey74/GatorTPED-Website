import jwt from 'jsonwebtoken';

//middleware utilizes next (do something then move on to the next thing)
//exported to be used in the routes
const auth = async (req, res, next) => {

    //checks to see if token is valid when a user tries to like or delete a post, or just interact with the website
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //implies that it is a custom token and not from potential added functionality like google tokens for google signin
        let decodedData;

        if(token && isCustomAuth) {
            //needs the secret string when creating a token
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } 
        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;