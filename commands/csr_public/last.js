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
 
	const msg = await target.fetchMessages({ limit: 3 }); 
	return await message.channel.send(
	`Last 3 Rewards: ${msg.map( x=> '\n> ' + x  )} `);
  }
);	
