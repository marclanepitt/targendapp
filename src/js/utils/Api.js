import axios from "axios";
import Cookies from "js-cookie";


class Api {
  constructor() {
    this.uuid = Cookies.get("uuid") || "";
    this.apiVersion = "v1";
    this.url = "http://localhost:8000/api";
    this.user = {};    

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

  resetPassword(data, onSuccess, onError) {
    return axios
      .post(this.generateUrl("auth/password/reset/"),data)
      .then(response => {
        return onSuccess(response);
      })
      .catch(err => {
        return onError(err);
      });
  }

  confirmResetPassword(data, onSuccess, onError) {
    return axios
      .post(this.generateUrl("auth/password/reset/confirm/"),data)
      .then(response => {
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

  getFilteredCourses(university, dep, num, sect, sem, onSuccess,onError) {
      return axios.get(this.generateUrl("courses/list/"+university,"v1"), {
          headers: this.generateTokenHeader(),
          params: {
            department:dep,
            number:num,
            section:sect,
            semester:sem,
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

  removeCourse(course_id,onSuccess,onError) {
    Promise.resolve(this.user).then(response => {
      return axios({ method: 'put', url:  this.generateUrl('users/course-remove/'+response.id+"?course="+course_id,"v1"),
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

  calendarRequest(onSuccess,onError) {
    Promise.resolve(this.user).then(response => {
      return axios({ method: 'get', url:  this.generateUrl('calendar/request',"v1"),
       headers:this.generateTokenHeader(),
       params: {
            id:response.id
          }
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
  calendarUndo(onSuccess,onError) {
    Promise.resolve(this.user).then(response => {
      return axios({ method: 'get', url:  this.generateUrl('calendar/cancel',"v1"),
       headers:this.generateTokenHeader(),
       params: {
            id:response.id
          }
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

  getCourseFilters(onSuccess,onError) {
     return axios.get(this.generateUrl("courses/filters","v1"), {
        headers: this.generateTokenHeader()
      })
      .then(response => {
        onSuccess(response);
      })
      .catch(err => {
        onError(err);
      })   
  }



  //UTILITY FUNCTIONS
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
      return axios.get(this.generateUrl("users/me/","v1"), {
          headers: this.generateTokenHeader()
        })
        .then(response => {
          return response.data;
        });
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
