const { Command } = require('easy-djs-commandhandler');
const getPermission = require('../../permission.js');
const leave = new Command({
	name: 'leave',
	description: '(owner) makes the bot leave a server',
	requires: ['botowner'],
	hideinhelp:true,
});
module.exports = leave.execute((client, message, args) => {
getPermission.owner(function() {
	if (message.author.id !== [allowners] ) {
		message.channel.send('no permission');
		return;
	}
	});
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
