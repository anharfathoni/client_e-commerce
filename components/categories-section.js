Vue.component('categories-section',{
  props: ['categories'],
  template:`
    <div>
      <h3>Categories</h3>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action" v-for='category in categories' @click.prevent='byCategory(category._id)'>{{category.name}}</a>
      </div>
    </div>
  `,
  methods:{
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
    }
  }
})