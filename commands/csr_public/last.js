const { Message } = require('discord.js'); 
const { Command } = require('easy-djs-commandhandler');
const last = new Command({ 
	name:'last', 
	description: "Last Reward posted",
	usage:'<prefix>last ',
	hideinhelp:true });

module.exports = last.execute((client, message, args)=>{

      let target = message.guild.channels.find(c => c.id == client.HWMChannel) || null; // find the targeted channel
      if (target) { // make sure that the targeted channel exists, if it exists then fetch its last message
        target
          .fetchMessages({ limit: 3 })
          .then(f =>
            message.channel.send(
              `Last 3 Rewards: \n> ${f.array()[2].content}   \n> ${f.array()[1].content}  \n> ${f.first().content}  `
			) // send the last message to the initial channel
          );
      } else { //if target doesn't exist, send an error
        message.channel.send("Hero Mobile Channel ID is not set.");
      }
 
});
