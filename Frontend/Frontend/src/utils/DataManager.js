class DataManager {
  constructor() {
    if (!DataManager.instance) {
      this.categories = []
      this.products = []
      this.planTypes = []
      this.currentUser = null
      DataManager.instance = this;
    }
    return DataManager.instance;
  }

  static shared = new DataManager();

  setCategories(categories) {
    this.categories = categories;
  }

  getCategories() {
    return this.categories;
  }

  setProducts(products) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  setPlantTypes(plantTypes) {
    this.plantTypes = plantTypes;
  }

  getPlantTypes() {
    return this.plantTypes;
  }
}


export default DataManager;