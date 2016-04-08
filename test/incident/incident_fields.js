var fields = {
	defaults_ITIL: [ 	// Array containing all the basic required fields.
		'//*[@id="sys_readonly.incident.number"]', 
		'//*[@id="sys_display.incident.caller_id"]', 
		'//*[@id="sys_display.incident.location"]', 
		'//*[@id="incident.category"]', 
		'//*[@id="incident.subcategory"]', 
		'//*[@id="sys_display.incident.cmdb_ci"]', 
		'//*[@id="incident.impact"]', 
		'//*[@id="incident.urgency"]', 
		'//*[@id="incident.priority"]', 
		'//*[@id="sys_readonly.incident.opened_at"]', 
		'//*[@id="sys_readonly.incident.closed_at"]',
		'//*[@id="incident.opened_by_label"]', 
		'//*[@id="incident.contact_type"]', 
		'//*[@id="incident.state"]', 
		'//*[@id="sys_display.incident.assignment_group"]', 
		'//*[@id="sys_display.incident.assigned_to"]', 
		'//*[@id="incident.short_description"]'
	],

	notes_ITIL: [
		'//*[@id="incident.comments"]',
		'//*[@id="incident.work_notes"]'
	],

	rel_recs_ITIL: [
		'//*[@id="sys_display.incident.problem_id"]',
		'//*[@id="sys_display.incident.rfc"]',
		'//*[@id="sys_display.incident.caused_by"]'
	],

	closure_info_ITIL: [
		'//*[@id="label.ni.incident.knowledge"]',
		'//*[@id="incident.closed_by_label"]',
		'//*[@id="sys_readonly.incident.closed_at"]'
	],

	defaults_unpriveleged: [
		'//*[@id="sys_readonly.incident.number"]',
		'//*[@id="sys_display.incident.caller_id"]', 
		'//*[@id="incident.impact"]', 
		'//*[@id="sys_readonly.incident.opened_at"]', 
		'//*[@id="sys_readonly.incident.closed_at"]',
		'//*[@id="sys_readonly.incident.state"]', 
		'//*[@id="incident.short_description"]',
		'//*[@id="incident.comments"]'
	]
};

module.exports = fields;

