import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlserviceProvider {

  constructor(private sqlite: SQLite) {
    
  }

  getDB() {
    return this.sqlite.create({
      name: 'avisemeapp',
      location: 'default'
    })
  }

  createDataBase() {
    return this.getDB()
    .then((db: SQLiteObject) => {
      this.createTableUsuario(db);      
    })
    .catch(error => console.log(error));
  }

  createTableUsuario(db: SQLiteObject) {
    let query = 'CREATE TABLE IF NOT EXISTS usuario(name TEXT, email TEXT, address TEXT, neighborhood TEXT, postalCode TEXT, city TEXT, state TEXT, password TEXT, dateofbirth TEXT, _id TEXT)';
    return db.executeSql(query, {}); 
  }

  getUser() {
    return this.getDB().then( ( db: SQLiteObject ) => {
      return db.executeSql('select * from usuario', {}).then( data => {        
        return data.rows.item(0) ? data.rows.item(0) : null;
      }).catch(error => console.log(error));
    });    
  }

  deleteUser() {   
    return this.getDB().then ( ( db: SQLiteObject ) => {
      return db.executeSql('delete from usuario', {});
    })     
  }

  setUser(user) {
    return this.getDB().then( ( db: SQLiteObject ) => {
      this.deleteUser().then( () => {
        return db.executeSql('insert into usuario (name, email, address, neighborhood, postalCode, city, state, password, dateofbirth, _id) values (?,?,?,?,?,?,?,?,?,?)', [user.name, user.email, user.address, user.neighborhood, user.postalCode, user.city, user.state, user.password, user.dateofbirth, user._id])
        .then( data => {
          console.log(data);
        })
        .catch(error => console.log(error)); 
      });      
    });     
  }

}
