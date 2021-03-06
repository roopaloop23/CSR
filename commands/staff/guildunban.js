const { Command } = require('easy-djs-commandhandler');
const guildunban = new Command({
	name: 'guildunban',
	description: '(staff) unban a whole guild by id or name',
	hideinhelp: true,
});
module.exports = guildunban.execute(async (client, message, args) => {
	if (!args[0]) {
		return message.channel.send(
			'please specify a server, we dont want accidental unbans'
		);
	}
	if (!message.client.staff.has(message.author.id)) {
		message.channel.send('no permission');
		return;
	}
	const guild =
		message.client.guilds.get(args[0]) ||
		message.client.guilds.find(
			(x) =>
				x.name.toLowerCase().indexOf(args.join(' ').toLowerCase()) != -1
		);
	if (!guild) {
		return message.channel.send('not found');
	}
	let o = 0;
	for (const i of guild.members.array()) {
		if (i.user.bot) {
			continue;
		}
		o += 1;
		client.system.banManager.delete(i.id);
	}
	message.channel.send(`${guild.name}:unbanned ${o} members`);
});
