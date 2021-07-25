const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

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
      const uuid = uuidv4();
      await query(
        "INSERT INTO users (password, username, uuid, level, experience) VALUES (?,?,?,?,?)",
        [hashed, username, uuid, 0, 0]
      );
      const id = await query("SELECT id FROM users WHERE username = ?", [username]);
      await query("INSERT INTO stats (user_id, wins, losses, ties, games_played) values (?,?,?,?,?)", [id[0].id,0,0,0,0]);
      json = { ...json, success: true, data: "Signup was successful!"};
    }
  } catch (err) {
    console.log(err);
    json.error = "Signup failed";
  } finally {
    return res.send(json);
  }
}

async function login(username, password) {
  let json = { data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0] || { password: "Salt" };
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      json = { ...json, success: matches, data: { username, uuid: user.uuid, id: user.id, level: user.level, experience: user.experience } };
    } else {
      json.error =
        "Username / password provided does not match. Please try again";
    }
  } catch (err) {
    json.error = "Login failed";
  } finally {
    return json;
  }
}

async function getByUuid(uuid) {
  let json = {data: null, error: null}
  try {
    const users = await query("SELECT id, username, uuid, level, experience FROM users WHERE uuid = ?", [uuid]);
    if (users.length === 0)
    {
      json.error = "User does not exist"
    }
    else {
      json = {...json, data: users[0]}
    }
  } catch (err) {
    json.error = "Failed to get user by username"
  } finally {
    return json;
  }
}

async function adjustLevel(res, userId, level){
  let json = { success: false, data: null, error: null};
  try {
    await query("UPDATE users SET level = ? WHERE id = ?", [level, userId]);
    json = {...json, success: true, data: "Successfully adjusted level!"};
  } catch (err) {
    json.error = "Level adjustment failed."
  } finally {
    return res.send(json);
  }
}

async function adjustExperience(res, userId, experience){
  let json = { success: false, data: null, error: null};
  try {
    await query("UPDATE users SET experience = ? WHERE id = ?", [experience, userId]);
    json = {...json, success: true, data: "Successfully adjusted experience!"};
  } catch (err) {
    json.error = "Experience adjustment failed."
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
      const user = users[0] || { password: "Salt" };
      const matches = await bcrypt.compare(password, user.password);
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

async function deleteAccount(res, userId, password) {
    let json = {
        success: false, data: null, error: null,
    }
    try {
        const users = await query("SELECT * FROM users WHERE id = ?", [
            userId,
        ]);
        const user = users[0] || { password: "Salt" };
        const matches = await bcrypt.compare(password, user.password);
        if (matches) {
          await query("DELETE FROM users WHERE id = ?", [userId]);
          json = {...json, success: true, data: "Account successfully deleted! Hope to see you again someday!"}
        } else {
          json.error =
            "Password invalid.";
        }
    } catch (err) {
        console.log(err);
        json.error = "User deletion change failed."
    } finally {
      return res.send(json);
    }
}

module.exports = { signup, login, changePassword, deleteAccount, adjustLevel, adjustExperience, getByUuid };
