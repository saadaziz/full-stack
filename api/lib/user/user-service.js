const { findById } = require("./user-model");

/**
 * fn | createUser - given the following parameters, create a new user, and, return userId from persistence layer.
 * inputs 
 *  @param {String} googleId
 *  @param {String} email
 *  @param {String} displayName
 *  @param {String} avatarUrl
 * output
 *  @return {String} userId
 **/
const createUser = (User) => async (googleId, email, displayName, avatarUrl) => {
  const createdAt = new Date();
  try {
    const existingUser = await User.findOne({ googleId: googleId });

    if (existingUser)
      throw new Error(`User with googleid ${googleId} already exists`);

    const newUser = new User({
      googleId, email, createdAt, displayName, avatarUrl
    });

    await newUser.save();

    return {
      userId: newUser._id
    }

  } catch (err) {
    console.log(err);
  }
}

const signIn =  (User) => async (argument) => {
  console.log("signIn " + argument);
  const user = await User.findOne({ googleId: argument.googleId });
  
  console.log("user-service | signIn found user in db: " + user);

  return user;

}

const findUsingId = (User) => async (argument) => {
  console.log("findUsingId " + argument)
  const user = await User.findOne({ id: argument });
  
  console.log("user-service | findUsingId found user in db: " + user);

  return user;
}

module.exports = (User) => {
  return {
    createUser: createUser(User),
    signIn: signIn(User),
    findUsingId: findUsingId(User)
  }
}