const { response } = require("express");
const query = require("../config/mysql.conf");

async function signup()
{
    let json = {success: false, data: null, error: null};
    try {
        const users = await query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length !==0)
        {
            json.error = "Username not available. Please choose another";
        } else {
            const hashed = await bcrypt.hash(password, 10);
            await query("INSERT INTO users (password, username) VALUES (?,?)", [hashed, username]);
            json = { ...json, success: true };
        }
    } catch (err) {
        console.log(err);
        json.error = "Signup failed"
    } finally {
        return response.send(json);
    }
}

async function login()
{}

async function changePassword()
{}

async function deleteAccount()
{}

module.exports = { signup }