Vue.component('navbar-after', {
  props: ['cart', 'categories'],
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
      fields: ['name', 'price', 'action'],
      listcart: [],
    }
  },
  computed: {
    totalCart: function () {
      let total = 0
      this.totalPayment = 0
      this.cart.forEach(e => {
        total += e.price
        this.totalPayment += e.price
      });
      return total
    },

    totalItem: function () {
      let totalItem = this.cart.length
      console.log("Totaaal:", totalItem)
      return totalItem
    }
  },
  methods: {
    deleteItemCart(idx, itemId) {
      axios.put('http://localhost:3000/cart', { itemId }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(cart => {
          console.log('=======')
          console.log(cart.data.cart)
          this.cart.splice(idx, 1)
        })
        .catch(error => {
          console.log(error.response)
        })
    },

    checkout() {
      axios.put('http://localhost:3000/cart/checkout', {}, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(cart => {
          console.log('=======')
          console.log(cart.data.cart)
          this.cart = []
          this.success = true
          this.successMsg = 'Success Checkout, Payment details has been sent to your email'
          setTimeout(() => {
            this.success = false
            this.successMsg = ''
          }, 5000);
        })
        .catch(error => {
          console.log(error.response)
        })
    },

    logout() {
      localStorage.clear()
      // window.location.href = "index.html"
      this.$emit('loginstate', true)
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
          this.$emit('listitems', items.data)
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
          this.$emit('listitems', items.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
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
          <a class="nav-link m-md-1" href="#" @click.prevent='allGallery'>Show All Gallery</a>
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
          <div v-if="success" class="alert alert-success" role="alert">
            {{successMsg}}
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{errorMsg}}
          </div>
          <template slot="button-content">  
            <div id="ex4">
              <i class="p1 fas fa-cart-plus fa-2x" :data-count='totalItem'></i>  
            </div>
          </template>
          <template>
            <b-table class="dropdown-item" striped hover :items="cart" :fields='fields'>
              <div slot="action" slot-scope="row">
                <b-button size="sm" v-on:click.prevent='deleteItemCart(row.index,row.item._id)' class="mr-2 btn-danger">
                  Delete
                </b-button>
              </div>
            </b-table>
          </template>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Total: <span>{{totalCart}}</span></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"><button type="button" class="btn btn-success" @click.prevent="checkout">Checkout</button></a>
        </b-dropdown>
      </li>
      <div>
        <b-button class="btn btn-outline-light ml-5 my-2 my-sm-0" v-on:click="logout"> Logout </b-button>
      </div>
    </div>
  </nav> 
  `
})