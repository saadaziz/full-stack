const userModel = require('./user-model');
const userService = require('./user-service')(userModel);

// in memory db is used for testing, requires setup and tear down
const db = require('../test/mongoDb');
beforeAll(async () => await db.connect());
afterEach(async () => await db.deleteCollections())
afterAll(async () => await db.stopDatabase())

test('userService.createUser() exists', () => {
    expect(typeof userService.createUser).toEqual('function');
});

test('userService.createUser() | happy path', async () => {
    const { userId } = await userService.createUser("111", "test_user@bananas.com", "Mr. Minion", "null");
    const user = await userModel.findById(userId);
    expect(user.displayName).toEqual("Mr. Minion");
    expect(user.googleId).toEqual("111");
    expect(user.email).toEqual("test_user@bananas.com");
    expect(user.avatarUrl).toEqual("null");
});




