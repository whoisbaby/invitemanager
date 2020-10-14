const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const yaml = require("js-yaml");
const {
  mainprefix,
  defaultjoinmessage,
  defaultleavemessage,
  color
} = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
  name: "addinvites",
  description: "add",
  run: async (client, message, args) => {
    let embed = db.fetch(`embed_${message.guild.id}`);

    
      
       const a = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`You need admin to use this!`)
       if (message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(a)

      let amount = args[1];

      if (!amount)
        return message.channel.send(`Please specify a amount to be added`);

      let user = message.mentions.users.first();

      if (!user)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`${message.author.tag} Please mention a user`)
        );

      db.add(`invites_${message.guild.id}_${user.id}`, amount);

      const suc = new Discord.MessageEmbed()
        .setDescription(`Added ${amount} invites from ${user}`)
        .setColor(`${embed || color}`)
        .setFooter(
          message.guild.name,
          message.guild.iconURL({ dynamic: true })
        );
      db.add(`bouns_${message.guild.id}_${user.id}`, amount);
      message.channel.send(suc);
    }
  }
