import axios from 'axios';
// Create instance for Lesson API
//******************************* */
const baseURI = import.meta.env.VITE_URI;
const instance = axios.create({
	baseURL: baseURI,
});
//******************************* */

const getLessons = async () => {
	return await instance
		.get('/lessons')
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('Error calling getLesson', error);
			return null;
		});
};

const getLessonById = async (lessonId) => {
	return await instance
		.get(`/lessons/${lessonId}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('Error calling getOneLesson', error);
			return null;
		});
};
const getLessonGrammarMeanings = async (lessonId) => {
	return await instance
		.get(`/lessons/${lessonId}/grammar-meanings`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error('error finding the grammar-meaning list.', error);
			return null;
		});
};

const saveLessonGrammarMeanings = async (lessonId, grammarMeanings) => {
	return await instance
		.post(`/lessons/${lessonId}/grammars`, grammarMeanings)
		.then((res) => {
			console.log('sent');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

const createLesson = async (lessonBody) => {
	return await instance
		.post('/lessons', lessonBody)

		.then((res) => {
			console.log('sent');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

const saveAllLessons = async (lessons) => {
	return await instance
		.post('/lessons/saveAllLessons', lessons)

		.then((res) => {
			console.log('sent');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};
const updateLesson = async (lessonBody, lessonId) => {
	console.log(lessonBody);
	return await instance
		.put(`/lessons/${lessonId}`, lessonBody)

		.then((res) => {
			console.log('updated');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

const deleteLesson = async (lessonId) => {
	return await instance
		.delete(`/lessons/${lessonId}`)

		.then((res) => {
			console.log('deleted');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

export default {
	getLessons,
	createLesson,
	getLessonById,
	updateLesson,
	deleteLesson,
	saveAllLessons,
	saveLessonGrammarMeanings,
	getLessonGrammarMeanings,
};
