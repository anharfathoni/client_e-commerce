Vue.component('carousel',{
  template: `
      <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab"
        :interval="5000" img-width="1024" img-height="480" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

        <b-carousel-slide img-src="https://raw.githubusercontent.com/anharfathoni/e-commerce/master/client/images/carousel_1024x480/gundam2.jpg?token=ApbK0GjEFlCOS3KmPsp3jPvrDRnutwH5ks5cFmvBwA%3D%3D">
          <div class="container">
              <div class="carousel-caption text-right">
                <h1>Sign Up Now</h1>
                <p><a class="btn btn-lg btn-primary" href="#" role="button">Sign Up</a></p>
              </div>
            </div>
        </b-carousel-slide>
        <b-carousel-slide img-src="https://raw.githubusercontent.com/anharfathoni/e-commerce/master/client/images/carousel_1024x480/pesawat.jpg?token=ApbK0HUA44ibaXgBi58ANVsccwd6oy5Zks5cFmwhwA%3D%3D">
          <div class="container">
            <div class="carousel-caption text-right">
              <h1>Check our collection</h1>
              <p><a class="btn btn-lg btn-primary" href="#" role="button">Browse Collections</a></p>
            </div>
          </div>
        </b-carousel-slide>
        <b-carousel-slide img-src="https://raw.githubusercontent.com/anharfathoni/e-commerce/master/client/images/carousel_1024x480/lego.png?token=ApbK0JumAWj4BxTBDA1Tknbbr29c7jUlks5cFmvzwA%3D%3D">
          <div class="container">
              <div class="carousel-caption text-left">
                <h1>Wait For New Items</h1>
                <p><a class="btn btn-lg btn-primary" href="#" role="button">Cooming Soon</a></p>
              </div>
            </div>
        </b-carousel-slide>

      </b-carousel>
  `,
  data(){
    return({
      slide: 0,
      sliding: null,
    })
  },
  methods: {
    onSlideStart(slide){
      this.sliding = true
    },
    onSlideEnd(slide){
      this.sliding = false
    }
  }

})