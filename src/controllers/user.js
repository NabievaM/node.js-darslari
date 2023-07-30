const io = require("../utils/io");
const path = require("path");
const bcrypt = require("bcrypt");

const user = new io(process.cwd() + "/database/user.json")
const transit = new io(process.cwd() + "/database/transit.json");

const Register = require("../Todo/Register");
const Transit = require("../Todo/Transit");


const userPost = async (req, res) => {
    const { username, password, money } = req.body;
    const users = await user.read();

    const find = users.find((item) => item.username == username);
    
    if (find) return res.json("Already exists");

    const hashPass = await bcrypt.hash(password, 12);
    console.log();
    const id = (users[users.length - 1]?.id || 0) + 1;

    const newUser = new Register(id, username, hashPass, money);

    const result = users.length ? [...users, newUser] : [newUser];

    await user.write(result);
    res.json("Created")
};

const getALL = async (req, res) => {
    const users = await user.read();
    res.json(users)
};
const Money = async (req, res) => {
    const { from, to, money } = req.body;
    const users = await user.read();
    const transits = await transit.read();

    const findFrom = users.find((item) => item.id == from);
    const findTo = users.find((item) => item.id == to);

    if (!findFrom || !findTo) {
        return res.status(404).json({ message: "This id not found" });
    };

    const bool =+ findFrom.money > money;
    
    if (!bool) return res.status(404).json({ message: "Money not enough" });

    findFrom.money = Number(findFrom.money) - Number(money);
    findTo.money = Number(findTo.money) + Number(money);
    
    const newTransit = new Transit(from, to, money);

    const result = transits.length ? [...transits, newTransit] : [newTransit];

    await transit.write(result);
    await user.write(users);

    res.json({ message: "Successfully" });
};

module.exports = {
    userPost,
    getALL,
    Money
};
