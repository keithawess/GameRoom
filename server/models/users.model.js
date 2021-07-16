const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");

async function signup(res, username, password) {
  let json = { success: false, data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length !== 0) {
      json.error = "Username not available. Please choose another";
    } else {
      const hashed = await bcrypt.hash(password, 10);
      await query(
        "INSERT INTO users (password, username, level, experience) VALUES (?,?,?,?)",
        [hashed, username, 0, 0]
      );
      json = { ...json, success: true, data: "Signup was successful!"};
    }
  } catch (err) {
    console.log(err);
    json.error = "Signup failed";
  } finally {
    return res.send(json);
  }
}

async function login(res, username, password) {
  let json = { success: false, data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0] || { password: "Salt" };
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      json = { ...json, success: matches, data: { username, id: user.id } };
    } else {
      json.error =
        "Username / password provided does not match. Please try again";
    }
  } catch (err) {
    console.log(err);
    json.error = "Login failed";
  } finally {
    return res.send(json);
  }
}

async function changePassword(res, userId, password, newPassword) {
  let json = { success: false, data: null, error: null };
  try {
      const users = await query("SELECT * FROM users WHERE id = ?", [
          userId,
      ]);
      const matches = await bcrypt.compare(password, users.password);
      if (matches) {
        const hash = await bcrypt.hash(newPassword, 10);
        await query("UPDATE users SET password = ? WHERE id = ?", [hash, userId]);
        json = {...json, success: true, data: "Password successfully changed!"}
      } else {
        json.error =
          "Password invalid.";
      }
  } catch (err) {
      console.log(err);
      json.error = "Password change failed."
  } finally {
    return res.send(json);
  }
}

async function deleteAccount() {}

module.exports = { signup, login, changePassword };
