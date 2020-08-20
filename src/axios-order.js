import React from 'react';
import axios from 'axios';


 const instance =axios.create({
     baseURL: 'https://react-burger-builder-d4415.firebaseio.com/'
 });

 export default instance; 