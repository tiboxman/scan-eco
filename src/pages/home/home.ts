import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Add BarcodeScanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // store the scanned result
  num: string;
  res : any = "Scannez un produit"

  // DI barcodeScanner
  constructor(
    public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient) {
  }
  
  // new scan method
  scan() {
    this.barcodeScanner.scan().then(data => {
        // this is called when a barcode is found
        this.num = data.text
        this.getData(this.num);
      });      
  }

  getData(id: string){

    this.http.get('https://world.openfoodfacts.org/api/v0/product/' + id + '.json', {})
    .subscribe(data => {

      console.log(data);
      this.res = data;

    })

  }
}
