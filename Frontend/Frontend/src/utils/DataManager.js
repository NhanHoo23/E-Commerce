class DataManager {
    constructor() {
      if (!DataManager.instance) {
         
        this.currentUser = null
        DataManager.instance = this;
      }
      return DataManager.instance;
    }
  
    static shared = new DataManager();
  
    
  
  
  }
  
  
  export default DataManager;