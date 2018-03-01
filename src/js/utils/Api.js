import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from 'lodash';


class Api {
  constructor() {
    this.uuid = Cookies.get("uuid") || "";
    this.apiVersion = "v1";
    this.url = "http://localhost:8000/api";
    this.user = this.getUser();    

  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  generateUrl(url, version=null) {
    if(version == null) {
      return `${this.url}/${url}`;
    } else {
      return `${this.url}/${version}/${url}`;
    }
  }

  generateTokenHeader() {
    return {Authorization : `Token ${this.uuid}` };
  }

  registerUser(data, onSuccess, onError) {
    return axios
      .post(this.generateUrl("auth/registration/"), data)
      .then(response => {
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      });
  }


  loginUser(data, onSuccess, onError) {
    const config = {
      auth: data
    };
    return axios
      .post(this.generateUrl("auth/login/"), {}, config)
      .then(response => {
        this.user = response.data.user;
        this.uuid = response.data.token;
        this.store("uuid", this.uuid);
        return onSuccess(response);
      })
      .catch(err => {
        return onError(err);
      });
  }

  logoutUser(onSuccess, onError) {
    return axios
      .post(this.generateUrl("auth/logout/"), {}, {
        headers: this.generateTokenHeader()
      })
      .then(response => {
        this.user = {};
        this.uuid = "";
        Cookies.remove('uuid');
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      });
  }

  getCourses(university, onSuccess,onError) {
      return axios.get(this.generateUrl("courses/list/"+university,"v1"), {
          headers: this.generateTokenHeader()
        })
      .then(response => {
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      })
  }

  getFilteredCourses(university, dep, num, sect, onSuccess,onError) {
      return axios.get(this.generateUrl("courses/list/"+university,"v1"), {
          headers: this.generateTokenHeader(),
          params: {
            department:dep,
            number:num,
            section:sect,
          }
        })
      .then(response => {
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      })
  }

  addCourse(course_id,onSuccess,onError) {
    Promise.resolve(this.user).then(response => {
      return axios({ method: 'put', url:  this.generateUrl('users/course-add/'+response.id+"?course="+course_id,"v1"),
       headers:this.generateTokenHeader(),
        }
       )
      .then(response => {
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      });   
    });
  }

  store(name, data) {
    Cookies.set(name, data, { expires: 10 / 24 });
  }

  removeCookie(name) {
    Cookies.remove(name);
  }

  getCookie(name) {
    Cookies.get(name);
  }

  getUser() {
    if (isEmpty(this.user)) {
      return axios.get(this.generateUrl("users/me/","v1"), {
          headers: this.generateTokenHeader()
        })
        .then(response => {
          return response.data;
        });
    } else {
      return this.user;
    }
  }

  isAuthenticated() {
    return this.uuid !== "";
  }

  setUser(user) {
    this.user = user;
  }


}


export default class ApiInstance {
  static get instance() {
    if (!this[Api]) {
      this[Api] = new Api();
    }
    return this[Api];
  }
}
