const botconfig = require("./botconfig.json");
const color = require("./color.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const swearWords = ["fuck", "shit", "זונה", "חרא"];

bot.on("ready", async () => {
  console.log(`Bot is Online!`);
  
bot.user.setActivity(`${bot.guilds.size} servers | ?help`, {type: "PLAYING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`${bot.guilds.size} servers | ?help`, {type: "PLAYING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(
        `${bot.guilds.size} servers | ?help`, {type: "PLAYING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);

//auto role (member)

    var role = member.guild.roles.find('name', 'member');
    member.addRole(role)
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
    if(!kUser) return message.channel.send("?kick [user] [reason]");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("User", `${kUser}`)
    .addField("Staff", `<@${message.author.id}>`)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
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
    if(!bUser) return message.channel.send("?ban [user] [reason]");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**User**", `${bUser}`)
    .addField("**Staff**", `<@${message.author.id}>`)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-log");
    if(!incidentchannel) return message.channel.send("Can't find channel called `logs`");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}report`){

    //!report @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("?report [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
    if(!reportschannel) return message.channel.send("Couldn't find channel called `logs`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  if (cmd === `${prefix}obc`){
        message.guild.members.forEach(m => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
                 var bc = new Discord.RichEmbed()
                 .addField(' » Message: ', args)
                 .setColor('#ff0000')
                 // m.send(`[${m}]`);
                 m.send(`${m}`,{embed: bc});
             });
  }
  
  

  if(cmd === `${prefix}warn`){

    //!warn @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("?warn [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#1b8fbd")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
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
  return message.reply('Invalid Format: ?poll <Question>')

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

  if (cmd === `${prefix}say`){
 		message.delete()
 		message.channel.send(args.join(" "));
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
    .addField("Moderation Commands","?kick (user) (reason) - Kick a User.\n?bc (message) - BC to everyone on the server with the bot (only for bot owners!).\n?ban (user) (reason) - Ban a User.\n?report (user) (reason) - report about User.\n?warn (user) (reason) - Warn a User.")
    .addField("Server Commands","?serverinfo - Server Informations.\n?membercount - Member Count.\n?say (message) - say your message.\n?poll (question) - Poll about Question\n?avatar @user - Avatar of the user.\n?ping - Ping Pong");

    return message.author.send(botembed);
  }

if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }

  if (msg.content === '?ping') {
    msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }

  if (msg.content === '?help') {
    msg.reply(`Check your Direct Messages!`)
  }

  if (msg.content === '?avatar') {
    msg.reply(`You need Mention someone`)
  }
});

bot.login(process.env.BOT_TOKEN);
