import axios from 'axios';
// Create instance for Lesson API
//******************************* */
const baseURI = import.meta.env.VITE_URI;
const instance = axios.create({
	baseURL: baseURI,
});
//******************************* */
const createSection = async (sectionBody, username) => {
	return await instance
		.post(`/sections/${username}`, sectionBody)

		.then((res) => {
			console.log('sent');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

const getSections = async (username) => {
	return await instance
		.get(`/sections/${username}/all`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('Error calling getSection', error);
			return null;
		});
};

const getSectionById = async (sectionId) => {
	return await instance
		.get(`/sections/${sectionId}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('Error calling getSectionById', error);
			return null;
		});
};

const studentJoinSection = async (sectionId, studentId) => {
	return await instance
		.put(`/sections/${sectionId}/${studentId}`)
		.then((res) => {
			console.log('Joined');
		})
		.catch((error) => {
			console.log(error);
		});
};

export default {
	createSection,
	getSections,
	getSectionById,
	studentJoinSection,
};
