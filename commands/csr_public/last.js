const { Message } = require('discord.js'); 
const { Command } = require('easy-djs-commandhandler');
const last = new Command({ 
	name:'last', 
	description: "Last Reward posted",
	usage:'<prefix>last '});

module.exports = last.execute(async(client, message, args)=>{ 

	let target = client.channels.get(client.HWMChannel); // find the targeted channel 	 
	if (!target) { 
		message.channel.send("Hero Mobile Channel ID is not set.");
		return
	}		  
		 
	const msg = await 
	target.fetchMessages({ limit: 3 })
	.then(msg => message.channel.send(
			`Last 3 Rewards: \n> ${msg.array()[2].content}   \n> ${msg.array()[1].content}  \n> ${msg.first().content}  `)); 
			// send the last message to the initial channel    
  }
);
