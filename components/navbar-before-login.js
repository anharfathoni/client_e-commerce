Vue.component('navbar-before', {
  props: ['categories'],
  template: `
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">GundamShop</a>
    <b-button class="navbar-toggler" type="b-button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </b-button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link m-md-1" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown navbar-right">
          <div>
            <b-dropdown text="Categories" variant="" size="sm" class="m-md-2">
              <b-dropdown-item v-for='category in categories' @click='byCategory(category._id)'>{{category.name}}</b-dropdown-item>
            </b-dropdown>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link m-md-1" href="#">Cooming Soon</a>
        </li>
        <li class="nav-item">
          <a class="nav-link m-md-1" @click='allGallery'>Show All Gallery</a>
        </li>
      </ul>
      <form>
        <div class="input-group ">
          <input type="text" class="form-control" placeholder="Search">
          <div class="input-group-append">
            <b-button class="btn btn-success mr-5 " type="b-button">Search</b-button>
          <div>
        </div>
      </form>
      <li class="nav-item">
        <b-dropdown variant="" size="sm" no-caret>
          <template slot="button-content">  
            <div id="ex4">
              <i class="p1 fas fa-cart-plus fa-2x" data-count="0"></i>  
            </div>
          </template>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"><button type="button" class="btn btn-success">Checkout</button></a>
        </b-dropdown>
      </li>
      <div>
        <b-button class="btn btn-outline-light ml-5 my-2 my-sm-0" v-b-modal="'modalLogin'">Login</b-button>
        <b-button class="btn btn-outline-info ml-2 my-2 my-sm-0" v-b-modal="'modalRegister'">Register</b-button>
      </div>
    </div>

    <b-modal id="modalLogin" hide-footer title="Login">
      <div v-if="success" class="alert alert-success" role="alert">
        {{successMsg}}
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{errorMsg}}
      </div>
      <b-form v-on:submit.prevent='loginNow'>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">Email:</label>
          <input type="email" class="form-control" v-model='loginForm.email'>
        </div>
        <div class="form-group">
          <label for="message-text" class="col-form-label">Password:</label>
          <input type="password" class="form-control" v-model='loginForm.password'>
        </div>
        <b-button type="b-button" class="btn btn-primary">Login</b-button>
      </b-form>
    </b-modal>

    <b-modal id="modalRegister" hide-footer title="Register New Account">
      <div v-if="success" class="alert alert-success" role="alert">
        {{successMsg}}
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{errorMsg}}
      </div>
      <b-form v-on:submit.prevent='registerNow'>
        <div class="form-group">
          <label for="registerName" class="col-form-label">Name:</label>
          <input id="registerName" type="text" class="form-control" v-model='registerForm.name'>
        </div>
        <div class="form-group">
          <label for="registerEmail" class="col-form-label">Email:</label>
          <input id="registerEmail" type="email" class="form-control" v-model='registerForm.email'>
        </div>
        <div class="form-group">
          <label for="registerPassword" class="col-form-label">Password:</label>
          <input id="registerPassword" type="password" class="form-control" v-model='registerForm.password'>
        </div>
        <b-button type="b-button" class="btn btn-primary">Register</b-button>
      </b-form>
    </b-modal>
  </nav> 
  `
  ,
  data() {
    return {
      success: false,
      successMsg: '',
      error: false,
      errorMsg: '',
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: ""
      },
      items: []
    }
  },
  methods: {
    loginNow() {
      axios.post('http://localhost:3000/user', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
        .then(user => {
          this.success = true
          this.successMsg = `Succes Login, Welcome ${user.data.user.name}`
          setTimeout(() => {
            localStorage.setItem('token', user.data.token)
            this.success = false
            this.successMsg = ''
            if (user.data.user.role === "admin") {
              window.location.href = "admin.html"
            } else {
              console.log('welcome')
              this.$emit('loginstate', true)
            }
          }, 2500);
        })
        .catch(error => {
          this.error = true
          this.errorMsg = `${error.response.data.error}`
          setTimeout(() => {
            this.error = false
            this.errorMsg = ''
          }, 2500);
        });
    },
    registerNow() {
      axios.post('http://localhost:3000/user/register', {
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password,
        role: 'customer',
        cart: []
      })
        .then(user => {
          this.success = true
          this.successMsg = `Succes Register, Please login to continue`
          setTimeout(() => {
            this.success = false
            this.successMsg = ''
            this.clearForm()
          }, 2500);
        })
        .catch(error => {
          this.error = true
          this.errorMsg = `${error.response.data.error}`
          setTimeout(() => {
            this.error = false
            this.errorMsg = ''
          }, 3000);
        });
    },
    clearForm() {
      this.loginForm.email = "",
        this.loginForm.password = "",
        this.registerForm.name = "",
        this.registerForm.email = "",
        this.registerForm.password = ""
    },

    byCategory(category) {
      axios.get(`http://localhost:3000/item/${category}`, {})
        .then(items => {
          console.log('show items by category')
          console.log(items.data)
          this.$emit('listitems',items.data)
        })
        .catch(error => {
          if (error.response.data.error.message) {
            console.log(error.response.data.error.message);
          } else {
            console.log(error.response.data.error);
          }
        });
    },

    allGallery() {
      axios.get('http://localhost:3000/item', {})
        .then(items => {
          console.log(items)
          this.$emit('listitems',items.data)
        })
        .catch(error => {
          console.log(error);
        });
    }

  }
})