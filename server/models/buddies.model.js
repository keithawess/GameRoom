const query = require("../config/mysql.conf");

async function addBuddy(res, userId, name, url, color) {
  let json = { success: false, data: null, error: null };
  try {
    const buddies = await query("SELECT * FROM buddies WHERE user_id = ?", [
      userId,
    ]);
    if (buddies.length !== 0) {
      json.error = "User already has a buddy...";
    } else {
      await query(
        "INSERT INTO buddies (name, url, color, user_id) VALUES (?,?,?,?)",
        [name, url, color, userId]
      );
      json = { ...json, success: true, data: "Buddy successfully added!" };
    }
  } catch (err) {
      console.log(err);
    json.error = "Failed to add buddy.";
  } finally {
    res.send(json);
  }
}

async function getBuddyByUser(res, userId) {
  let json = { success: false, data: null, error: null };
  try {
    const buddy = await query("SELECT * FROM buddies WHERE user_id = ?", [
      userId,
    ]);
    if (buddy.length === 0) {
      json.error = "This user has no buddies or does not exist.";
    } else {
        console.log(buddy);
      json = {
        ...json,
        success: true,
        data: { name: buddy[0].name, url: buddy[0].url, color: buddy[0].color },
      };
    }
  } catch (err) {
    json.error = "Failed to retrieve buddy";
  } finally {
    return res.send(json);
  }
}

module.exports = { getBuddyByUser, addBuddy };
