const botconfig = require("./botconfig.json");
const color = require("./color.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const swearWords = ["fuck", "שיט", "קקי", "חרא", "זבל", "פאק", "אמא", "זין", "קוקסינל", "הומו", "https://discord.gg/", "shit", "זונה", "חרא"];

bot.on("ready", async () => {
  console.log(`Bot is Online!`);
bot.user.setActivity(`${bot.guilds.size} servers | .help`, {type: "WATCHING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`${bot.guilds.size} servers | .help`, {type: "WATCHING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(
        `${bot.guilds.size} servers | .help`, {type: "WATCHING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server ${server}, ${member}`);
});

//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`${member}, left the Server`);
});

      
     



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @user break the rules
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("/kick [user] [reason]");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("User", `${kUser}`)
    .addField("Staff", `<@${message.author.id}>`)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Can't find channel called `logs`");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

if( swearWords.some(word => message.content.includes(word)) ) {
     message.delete();
  message.reply("Swearing is not Allowed here");
  //Or just do message.delete();
}

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("/ban [user] [reason]");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**User**", `${bUser}`)
    .addField("**Staff**", `<@${message.author.id}>`)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("Can't find channel called `logs`");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}report`){

    //!report @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/report [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find channel called `logs`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}warn`){

    //!warn @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/warn [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#1b8fbd")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find channel called `logs`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }
  
  

  if(cmd === `${prefix}membercount`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("**Member Count**")
    .setColor("#eb8f1b")
    .setThumbnail(sicon)
    .addField("Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if (cmd === `${prefix}poll`){
 		message.delete()
  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('Invalid Format: #poll <Question>')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  const pollTopic = await message.channel.send({embed});
  await pollTopic.react(`ג…`);
  await pollTopic.react(`ג`);
  const filter = (reaction) => reaction.emoji.name === 'ג…';
  const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
  collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
  collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}


    if(cmd === `${prefix}clear`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the Permission `MANAGE_MESSAGES`");
  if(!args[0]) return message.channel.send(".clear [amount of messages]");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}
  
  
  if (cmd === `${prefix}creator`){
    let botembed = new Discord.RichEmbed()
    .setDescription("Creators of the Bot")
    .setColor("#ff9f04")
    .addField("\nCreators","<@354952398772371458>")

    return message.channel.send(botembed);
}

  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help Commands")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("Moderation Commands",".kick (user) (reason) - Kick a User.\n.clear - clear the chat\n.clear - clear the chat\n.mute (user) - mute member\n.unmute (user) - unmute user.\n.ban (user) (reason) - Ban a User.\n.report (user) (reason) - report about User.\n.warn (user) (reason) - Warn a User.")
   .addField("Server Commands",".serverinfo - Server Informations.\n.poll (question) - Poll about Question\n.ping - Ping Pong")
   .addField("Creators",".creator - Bot Creators");
    return message.author.send(botembed);
  }
  if(cmd === `${prefix}mute`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the Permission `MANAGE_MESSAGES`");
  if(args[0] == "help"){
    message.channel.send("Usage: /mute <user> <reason>");
    return;
  }
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the Permission `MANAGE_MESSAGES`");
  let reason = args.join(" ").slice(22);

  let muterole = message.guild.roles.find(`name`, "Muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  message.delete().catch(O_o=>{});

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute`)
  .setColor(Color.orange)
  .addField("User", toMute)
  .addField("Staff", `${message.author}`)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "logs");
  if(!incidentschannel) return message.channel.send("Cannot find channel called `mod-log`");
  incidentschannel.send(muteembed);

  await(toMute.addRole(muterole.id));
  message.channel.send(toMute + ` has been muted by: ${message.author} reason: ` + reason);

}
    if(cmd === `${prefix}unmute`){

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the premission `MANAGE_MESSAGES`")

let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!toMute) return message.channel.sendMessage("/unmute [@user]");

let role = message.guild.roles.find(r => r.name === "Muted")

if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not Muted!");

await toMute.removeRole(role);

message.delete().catch(O_o=>{});

let unmuteEmbed = new Discord.RichEmbed()
.setDescription("**UnMute**")
.setColor(Color.dark_red)
.addField("**User**", toMute)
.addField("**Staff**", `<@${message.author.id}>`);

let UnBanchannel = message.guild.channels.find(`name`, "logs");
if(!UnBanchannel) return message.channel.send("Can't find channel called `mod-log`");

UnBanchannel.send(unmuteEmbed);
message.channel.send(toMute + ` has been unmuted by: <@${message.author.id}>`);

}
    if(cmd === `${prefix}ownerbc`){ 
      message.guild.members.forEach(m => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
                 var bc = new Discord.RichEmbed()
                 .addField(' » Message: ', args)
                 .setColor('#ff0000')
                 // m.send(`[${m}]`);
                 m.send(`${m}`,{embed: bc});
             });

const prefix = botconfig.prefix;
bot.on("message", (message) => {

  if(!message.content.startsWith(prefix)) return;

if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }
 }});

bot.on('message', msg => {
  if (msg.content === '.ping') {
    msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
});

bot.on('message', msg => {
  if (msg.content === '.help') {
    msg.reply(`Check Your DM!`)
  }
});
bot.on('message', msg => {
  if (msg.content === '.avatar') {
    msg.reply(`You need Mention someone`)
  }
  });

bot.login(process.env.BOT_TOKEN);
