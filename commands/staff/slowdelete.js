// eslint-disable-next-line no-unused-vars
const { Message } = require('discord.js');
const permission = require('../../permission.js');
const ms = require('ms');
const { Command } = require('easy-djs-commandhandler');
const slodelete = new Command({ 
	name:'msgdelete', 
	description: "Deletes bot's messages from private channel",
	usage:'<prefix>delete [ Quantity ] [ Milliseconds ]',
	hideinhelp:true });

module.exports = slodelete.execute((client, message, args)=>{

	if(!args[0] || isNaN(args[0])) args[0] = 1;
	if(!args[1] || isNaN(args[1])) args[1] = 5000;

	if (!client.staff.has(message.author.id)) {
	message.channel.send('No permission: Your not a staff');
	return;
	}
	
	message.client.lockdown = false;
	message.channel.send(`Procceding to delete Messages, this may take up to ${ms(args[1] * message.client.guilds.size, { long: true })}!`);
	const warner = `Deleting Last Messages, this might take up to ${ms(args[1] * message.client.guilds.size, { long: true })}!`;
	let i = 0;
	message.client.system.channels.public.forEach((ch) => {
		ch.send(warner);
	});
	message.client.system.channels.private.forEach(async (ch) => {
		setTimeout(async function() {
			try{
				if(ch.permissionsFor(ch.guild.me).has('MANAGE_MESSAGES') && ch.permissionsFor(ch.guild.me).has('VIEW_CHANNEL')) {
					const messages = await ch.fetchMessages({ limit: args[0] }).then(msg => msg.filter(m => m.webhookID != undefined && m.content != warner));
					if(!messages.size){  client.channels.get(permission.errorChannel).send(
					'```prolog\n Skipping: `' + ch.guild.name + '` last message was \'@' + message.author.username + '\' and not a Bot.```') 
					return console.log('Skipping: Last message was not a bot in server:' + ch.guild.name + ' User:' + message.author.username); } 
					await ch.bulkDelete(messages, true);
				}
				else if(ch.permissionsFor(ch.guild.me).has('VIEW_CHANNEL')) {
					ch.send('```prolog\n COULD NOT DELETE LAST MESSAGES BECAUSE I DO NOT HAVE PERMS!```');
					 // Log Bot into channel ID
					 client.channels.get(permission.errorChannel).send(
					'```prolog\n Skipping: `' + ch.guild.name + '` dose not have ' + 'VIEW_CHANNEL or MANAGE_MESSAGES permissions set.```' );
					 console.log('Skipping: ' + ch.guild.name + ' dose not have VIEW_CHANNEL or MANAGE_MESSAGES perms. Last message: ' + message.author.username); 			
				}
			}
			catch(e) {
				console.log(e);
			}

		}, i * args[1]);
		i++;
	});
	console.log(i);
});
