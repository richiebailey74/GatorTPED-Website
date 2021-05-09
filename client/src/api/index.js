import axios from 'axios';

//makes all requests go to API instead of axios
//use database port from index.js under server's index.js file
const API = axios.create({ baseURL: 'http://localhost:5000' });
//axios instance allows for additional functionality to be exploited later on

//this function receives the json token from the browswer if there is a profile logged in
API.interceptors.request.use((req) => {
    if(localStorage.getItem(`profile`)) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//these functions utilize axios, meaning they are able to connect front end browser (HTTP) requests to the backend
//these functions are imported for use in the client/actions/.. files
export const fetchPosts = () => API.get('/posts');
export const fetchFeaturedPosts = () => API.get('/posts/featured');
export const switchFeatured = (id, isFeaturedPost) => API.put(`/posts/${id}`, {isFeaturedPost: isFeaturedPost});
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchPostsEB = () => API.get('/postsEB');
export const createPostEB = (newPostEB) => API.post('/postsEB', newPostEB);
export const updatePostEB = (id, updatedPostEB) => API.patch(`/postsEB/${id}`, updatedPostEB);
export const deletePostEB = (id) => API.delete(`/postsEB/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateProfile = (formData) => API.post('/user/update', formData);

