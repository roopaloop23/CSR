const discord = require('discord.js');
const CSRSystem = require('./csrSys');
const jndb = require('jndb');
/**
 *
 *
 * @class Bot
 * @extends {discord.Client}
 */
class Bot extends discord.Client {
	/**
	 *
	 * @param {discord.ClientOptions} [options]
	 */
	constructor(options) {
		super(options);
		this.db = new jndb.Connection();
		this.system = new CSRSystem(this, process.env.channel);
		/**
		 * @type {discord.Collection<string,string>}
		 */
		this.banlist = new discord.Collection();
		this.lockdown = {
			enabled: false,
			time: 0,
		};
		/**
		 * @type {discord.Collection<string,string>}
		 */
		this.csrCooldowns = new discord.Collection();
		/**
		 * @type {Map<string,string>}
		 */
		this.staff = new Map();
		/**
		 * @type {string[]}
		 */
		this.filter=[]
	}
	/**
	 *
	 *
	 * @param {discord.Guild} guild
	 * @returns
	 * @memberof Bot
	 */
	getPublicChannel(guild) {
		return this.system.channels.get(guild.id);
	}
	/**
	 *
	 *
	 * @param {discord.Guild} guild
	 * @returns
	 * @memberof Bot
	 */
	getPrivateChannel(guild) {
		return this.system.privateChannels.get(guild.id);
	}
}
module.exports = Bot;
