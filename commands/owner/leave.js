const { Command } = require('easy-djs-commandhandler');
const permission = require('../../permission.js');
const leave = new Command({
	name: 'leave',
	description: '(owner) makes the bot leave a server',
	requires: ['botowner'],
	hideinhelp:true,
});
module.exports = leave.execute((client, message, args) => {

// Restrict to only allow staff members stafflist.js
//	if(!message.client.staff.has(message.author.id)) {
//		message.channel.send('no permission');
//		return;
//	}
 
// Restrict to only allow botownerList from permission.js
	if (message.author.id == permission.botownerList ) {
		message.channel.send('no permission');
		return;
	}
	
	const guild =
		message.client.guilds.get(args[0]) ||
		message.client.guilds.find(
			x =>
				x.name.toLowerCase().indexOf(args.join(' ').toLowerCase()) != -1
		);
	if (guild) {
		guild.leave();
		message.channel.send(`left ${guild.name}`);
	}
	else {
		return message.channel.send('not found');
	}
});
