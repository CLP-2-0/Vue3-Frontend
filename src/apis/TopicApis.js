import axios from 'axios';
// Create instance for Lesson API
//******************************* */
const baseURI = import.meta.env.VITE_URI;
const instance = axios.create({
	baseURL: baseURI,
});
//******************************* */

const getAllTopics = async () => {
	return await instance
		.get('/topics')
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};

const getTopicById = async (topicId) => {
	return await instance
		.get(`/topics/${topicId}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};
const createTopic = async (topicBody, sid) => {
	return await instance
		.post(`/topics/${sid}`, topicBody)

		.then((res) => {
			console.log('created');
		})
		.catch(function (error) {
			console.log(error);
		});
};

const updateTopic = async (topicBody, topicId) => {
	console.log(topicBody);
	return await instance
		.put(`/topics/${topicId}`, topicBody)

		.then((res) => {
			console.log('updated');
		})
		.catch(function (error) {
			console.log(error);
		});
};

const deleteTopic = async (topicId) => {
	return await instance
		.delete(`/topics/${topicId}`)

		.then((res) => {
			console.log('deleted');
		})
		.catch(function (error) {
			console.log('error:', error);
		});
};

const createAnswer = async (topicId, answer) => {
	return await instance
		.post(`/topicanswer/${topicId}/answer`, answer)

		.then((res) => {
			console.log('created');
		})
		.catch(function (error) {
			console.log(error);
		});
};

const createReply = async (answerId, reply) => {
	return await instance
		.post(`/replies/${answerId}/reply`, reply)

		.then((res) => {
			console.log('created');
		})
		.catch(function (error) {
			console.log(error);
		});
};
export default {
	getAllTopics,
	getTopicById,
	deleteTopic,
	updateTopic,
	createTopic,
	createAnswer,
	createReply,
};
