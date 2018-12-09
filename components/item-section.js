Vue.component('item-section', {
  props: ['items'],
  template: `
    <div class="container row ">
      <div class='item' v-for='item in items'>
        <b-card :title='item.name' :img-src='item.link' img-alt="Image" img-top tag="article"
          style="max-width: 10rem; height: 25rem;" class="mb-3 mr-4">
          <p class="card-text">
          Rp. {{item.price}}
          </p>
          <b-button variant="primary" @click.prevent='addToCart(item)'>Add to cart</b-button>
        </b-card>
      </div>
    </div>
  `,
  data(){
    return {
      cart: []
    }
  },
  methods: {
    addToCart(item) {
      console.log('ini item yang ditambahkan')
      axios.post('http://localhost:3000/cart', {itemId: item._id}, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then( user => {
          console.log('masuk cart')
          this.cart = user.data.cart
          this.cart.push(item)
          this.$emit('listcart',this.cart)
        })
        .catch( error => {
          console.log(error)
        })
    }
  }
})