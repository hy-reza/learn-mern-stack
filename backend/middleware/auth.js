import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //google token

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWTSECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
