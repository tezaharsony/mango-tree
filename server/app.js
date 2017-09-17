const express = require('express')
const cron = require('node-cron')
const cors = require('cors')
const firebase = require('firebase')
const app = express()

app.use(cors())

var config = {
  databaseURL: "https://mangootree-fa54b.firebaseio.com",
  projectId: "mangootree-fa54b"
};

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

/*warning tl:dr script :rofl*/

class MangoTree {
  // Initialize a new MangoTree
  constructor(age, height, fruits, healthyStatus) {
    this._age = age;
    this._height = height;
    this._fruits = fruits;
    this._healthyStatus = healthyStatus;
    this._fruitHarvested = [];
    this._good = 0;
    this._bad = 0;
  }
  getAge() {
    return this._age;
  }
  getHeight() {
    return this._height;
  }
  getFruits() {
    return this._fruits;
  }
  getHealthyStatus() {
    return this._healthyStatus;
  }


  // Get current states here

  // Grow the tree
  grow() {
    this._age++;
    if (this._age==20) {
      this._healthyStatus = false;
      //return 'The tree has met its end. :sad:'
    }
    if(this._age<=10){
      this._height += Math.floor(Math.random() * 3);
    }
  }

  // Produce some mangoes
  produceMangoes() {
    if(this._age>=3){
      for(let i=0; i<Math.floor(Math.random() * 10); i++){
        this._fruitHarvested.push(new Mango());
      }
    }
  }

  // Get some fruits
  harvest() {
    this._good = 0;
    this._bad = 0;
    for(let i=0; i<this._fruitHarvested.length; i++){
      if(this._fruitHarvested[i].quality=='good'){
        this._good++;
      }
      else{
        this._bad++;
      }
    }
    this._fruits = this._fruitHarvested.length;
    this._fruitHarvested = [];
  }

}

class Mango {
  // Produce a mango
  constructor() {
    this.quality = this.fruitQuality();
  }
  fruitQuality(){
    let condition = ['good','bad'];
    let con = Math.floor(Math.random() * condition.length)
    if (con == 0) {
      return condition[0]
    }
    else {
      return condition[1];
    }
  }
}

app.get('/start', (req, res) => {
  res.send('tree is growth')
  let tree = new MangoTree(0,0,0,true);
  let job = cron.schedule('*/4 * * * * *', () => {
    tree.grow();
    tree.harvest();
    tree.produceMangoes();
    db.ref('mango').set({
      deadMessage: '',
      status: `[Year ${tree._age} Report] Height = ${tree._height} | Fruits harvested = ${tree._fruits} (${tree._good} good, ${tree._bad} bad)`
    })
    console.log(`[Year ${tree._age} Report] Height = ${tree._height} | Fruits harvested = ${tree._fruits} (${tree._good} good, ${tree._bad} bad)`)
    if (tree._healthyStatus == false) {
      console.log('The tree is dead and ready to compose for another new tree')
      db.ref('mango').set({
        deadMessage: 'The tree is dead and ready to compose for another new tree'
      })
      job.stop()
    }
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('mangoo is connected')
})
