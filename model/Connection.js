const mongodb = require('mongodb').MongoClient
const dbConfig = require('./Config.js')
var ObjectID = require('mongodb').ObjectID;


// mongodb.connect(`${dbConfig.url}/${dbConfig.dbName}`, { useUnifiedTopology: true } ,function (err, client) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log('链接成功！')
//     var db = client.db("play");

//     db.collection("User").find({}).toArray(function (err, docs) {
//         console.log(docs)
//     });
// })

class DB {
    static getInstance() {
        if (!DB.Instance) {
            DB.Instance = new DB()
        }
        return DB.Instance;
    }
    //构造函数
    constructor() {
        this.dbclient = ''
        this.connect()
    }
    //链接数据库
    connect() {
        return new Promise((resolve, reject) => {
            if (this.dbclient) {
                resolve(this.dbclient)
            } else {
                mongodb.connect(`${dbConfig.url}/${dbConfig.dbName}`, {
                    useUnifiedTopology: true
                }, (err, client) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    console.log('链接成功！')
                    this.dbclient = client.db('play')
                    resolve(this.dbclient)
                })
            }
        })
    }
    //查询函数
    find(dbName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(dbName).find(json).toArray(function (err, docs) {
                    //  console.log(docs)
                    resolve(docs)
                    reject(err)
                })
            })
        })
    }
    //更新函数
    updateOne(dbName, jsonOld, jsonNew) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(dbName).updateOne(jsonOld, {
                    $set: jsonNew
                }, function (err, result) {
                    resolve(result.result)
                    reject(err)
                })
            })
        })
    }
    //增加函数
    insertOne(dbName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(dbName).insertOne(json, function (err, result) {
                    resolve(result.result)
                    reject(err)
                })
            })
        })
    }
    //删除函数
    removeOne(dbName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(dbName).deleteOne(json, function (err, result) {
                    resolve(result.result)
                    reject(err)
                })
            })
        })
    }
    //查询中的id查询
    getId(id){
        return ObjectID(id)
    }
}


module.exports = DB.getInstance()

// myDB.updateOne('users',{name:'汪红光'},{'name':'红光'}).then(val=>{
//     console.log(val)
// })

// DB.getInstance().insertOne('users',{name:'汪红光'}).then(val=>{
//     console.log(val)
// })

// myDB.removeOne('users',{name:'汪红光'}).then(val=>{
//     console.log(val)
// })