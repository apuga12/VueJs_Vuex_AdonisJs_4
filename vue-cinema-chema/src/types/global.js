
// *** Types de la store Global de la App

// import namespace
import namespace from '@/utils/namespace'

export default namespace('global', {
	actions: [
		'changeLanguage'
	],
	getters: [
		'processing',
		'language'
	],
	mutations: [
		'startProcessing',
		'stopProcessing',
		'setLanguage'
	]
});