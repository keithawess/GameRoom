const query = require("../config/mysql.conf");

async function addWin(res, userId){
    let json = { success: false, data: null, error: null };
    try {
        await query("UPDATE stats SET wins = wins + 1, games_played = games_played + 1 WHERE user_ID = ?", [userId]);
        json = { ...json, success: true, data: "Win successfully applied."};
    } catch (err) {
        console.log(err);
        json.error = "Failed to add win"
    } finally {
        res.send(json);
    }
}

async function addLoss(res, userId){
    let json = { success: false, data: null, error: null };
    try {
        await query("UPDATE stats SET losses = losses + 1, games_played = games_played + 1 WHERE user_ID = ?", [userId]);
        json = { ...json, success: true, data: "Loss successfully applied."};
    } catch (err) {
        console.log(err);
        json.error = "Failed to add loss"
    } finally {
        res.send(json);
    }
}

async function addTie(res, userId){
    let json = { success: false, data: null, error: null };
    try {
        await query("UPDATE stats SET ties = ties + 1, games_played = games_played + 1 WHERE user_ID = ?", [userId]);
        json = { ...json, success: true, data: "Tie successfully applied."};
    } catch (err) {
        console.log(err);
        json.error = "Failed to add tie"
    } finally {
        res.send(json);
    }
}

async function getStatsByUser(res, userId){
}

module.exports = { addWin }