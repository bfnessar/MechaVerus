var fields = {
	defaults_ITIL: [
		'#sys_readonly\.incident\.number',
		'#sys_display\.incident\.caller_id',
		'#sys_display\.incident\.location',
		'#incident\.category',
		'#incident\.subcategory',
		'#sys_display\.incident\.cmdb_ci',
		'#incident\.impact',
		'#incident\.urgency',
		'#incident\.priority',
		'#incident\.short_description',
		'#sys_readonly\.incident\.opened_at',
		'#incident\.opened_by_label',
		'#incident\.contact_type',
		'#incident\.state',
		'#sys_display\.incident\.assignment_group',
		'#sys_display\.incident\.assigned_to',
	],

	notes_ITIL: [
		'#incident\.comments',
		'#incident\.work_notes'
	],

	rel_recs_ITIL: [
		'#sys_display\.incident\.problem_id',
		'#sys_display\.incident\.rfc',
		'#sys_display\.incident\.caused_by'
	],

	closure_info_ITIL: [
		'#label\.ni\.incident\.knowledge',
		'#incident\.closed_by_label',
		'#sys_readonly\.incident\.closed_at'
	]
};
module.exports = fields;

