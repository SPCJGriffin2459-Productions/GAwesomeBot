const { SetReminder } = require("../Utils");
const parseDuration = require("parse-duration");

// Set a reminder from a remindme command suffix
module.exports = async (bot, userDocument, str) => {
	let timestr, remind;
	const args = str.split("|");
	if (args.length === 2) {
		// Easy parse
		timestr = args[0].trim();
		remind = args[1].trim();
	} else {
		// Parse with assumption "remind me to ... in ..."
		timestr = str.substring(str.toLowerCase().indexOf(" in ") + 4);
		remind = str.indexOf("to ") === 0 ? str.substring(3, str.toLowerCase().indexOf(" in ")) : str.substring(0, str.indexOf(" in "));
	}
	const time = parseDuration(timestr);
	if (time > 0 && remind) {
		userDocument.reminders.push({
			name: remind,
			expiry_timestamp: Date.now() + time,
		});
		SetReminder(bot, userDocument, userDocument.reminders[userDocument.reminders.length - 1]);
		return time;
	} else {
		return "ERR";
	}
};
