const ALERTS = require('../resources/alerts.json')
const database = require('../databases/db')
const User = require('../models/User')

async function AlertUsers(message, alertId, client){
    await database.sync()
    let where = {}
    where['a'+alertId] = true

    let users = await User.findAll(where)

    if (users !== null){
        let text = 'Oi, você tem um novo alerta para *' + ALERTS[alertId] + '*\n\n*' + message.sender.pushname + '* mandou a ' +
            'seguinte mensagem no grupo *' + message.chat.name + '*: \n\n'
        text += message.text
        for (let i = 0; typeof users[i] !== "undefined"; i++){
            if (users[i].id !== message.author) await client.sendText(users[i].id, text)
        }
    }
}

module.exports = AlertUsers