const { Command } = require('easy-djs-commandhandler');
const msg = new Command({
	name: 'msg',
	requires: ['guild'],
	requiresBotPermissions: ['EMBED_LINKS'],
	description: "Send a message from bot",
	usage:
		'<prefix> msg [public | private] [your message]',
	requireUserPermissions: ['MANAGE_CHANNELS'],
});
let allowedTypes = ['public', 'private'];
/** @param {import("../../bot")} callback */
module.exports = msg.execute(async (client, message, args) => {
	// if (message.author.id !== message.guild.owner.id && !client.staff.has(message.author.id)  ) {
	// 	return message.channel.send("you're not allowed to use this command"); }
	/**
	 * @type {import('discord.js').TextChannel}
	 */
	// @ts-ignore
	//let channel = message.mentions.channels.first() || message.guild.channels.get(args[0]);
	let type = args[0];
	let chatmsg = args.slice(1).join(' ');
	 
	if (!allowedTypes.includes(type)) {
		return message.channel.send('invalid type: Try c-msg [public | private] [message]');
	}
	if (type == 'public') {
		let embed = new (require('discord.js').RichEmbed)();
		embed.setColor(client.color);
		embed.setAuthor(message.guild.name, message.guild.iconURL);
		embed.setDescription(chatmsg);
		 let connected = client.system.getMatchingPrivate(message.guild);
		 connected.forEach((pChannel) => {
		 	if (pChannel.guild.id == message.guild.id) return;
		 	pChannel.send(embed);
		 });
		client.system.sendAll(embed);
		message.channel.send('Message sent to private.');
	} else if (type == 'private') {
			//private
		let embed = new (require('discord.js').RichEmbed)();
		embed.setColor(client.color);
		embed.setAuthor(message.guild.name, message.guild.iconURL);
		embed.setDescription(chatmsg);
		 let connected = client.system.getMatchingPrivate(message.guild);
		 connected.forEach((pChannel) => {
		 	if (pChannel.guild.id == message.guild.id) return;
		 	pChannel.send(embed);
		 });
		client.system.sendAll(embed);
// message.channel.send('Private');			
	}
	 
});
