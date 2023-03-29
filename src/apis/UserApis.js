import axios from 'axios';
// Create instance for Lesson API
//******************************* */
const baseURI = import.meta.env.VITE_URI;
const instance = axios.create({
	baseURL: baseURI,
});
//******************************* */

const getUsers = async () => {
	return await instance
		.get('/users')
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};

const getUserByUsername = async (username) => {
	return await instance
		.get(`/users/${username}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};

const createUser = async (userBody) => {
	return await instance
		.post('/users', userBody)

		.then((res) => {
			console.log('sent');
		})
		.catch(function (error) {
			console.log(error);
		});
};

const updateUser = async (username, updatedUser) => {
	console.log(updatedUser);
	return await instance
		.put(`/users/${username}`, updatedUser)

		.then((res) => {
			console.log('updated');
		})
		.catch(function (error) {
			console.log(error);
		});
};

const deleteUser = async (username) => {
	return await instance
		.delete(`/users/${username}`)

		.then((res) => {
			console.log('deleted');
		})
		.catch(function (error) {
			console.log(error);
		});
};
const getUserByRequestedRole = async (requestedRole) => {
	return await instance
		.get(`/users/all/${requestedRole}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};

export default {
	getUsers,
	getUserByUsername,
	createUser,
	updateUser,
	deleteUser,
	getUserByRequestedRole,
};
