import { createStore } from 'vuex'

const store= createStore({
  state: {
    images: [],
  },
  mutations: {
    setImages(state, images) {
      state.images = images;
    },
    addImages(state, images) {
      state.images = state.images.concat(images)
    }
  },
  getters: {
    getImage: (state) => (imageID) => state.images.find(image => image.id === imageID)
  },
  actions: {
    loadFirstImages({ commit }) {
      return new Promise(async (resolve) => {
        const request = await fetch(
          "https://picsum.photos/v2/list?limit=10&page=1"
        );
        const images = await request.json();
        commit("setImages", images);
        resolve();
      });
    },
  },
})

export default store
export const checkImagesLoaded = store.dispatch("loadFirstImages");