import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent {
  constructor(private http: HttpClient, private router: Router, ) { }
  productoid: string;
  cantidad: number;
  productoData: any = {}
  productosSalida: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(localStorage.getItem('rol') == '1'){
      this.router.navigateByUrl('/home')
    }
  }

  addList(){
    let exist = false
    this.productosSalida.forEach(element =>{
      if(element.productoid == this.productoData.productoid){
        exist = true;
        return;
      }
    })

    if(this.productoData.unidades < this.cantidad){
      alert('La cantidad que desea sacar de inventario supera la existencia')
      return
    }
      
    if(exist){
      alert('El producto ya se encuentra en la lista')
      return;
    }

    this.productosSalida.push({
        productoid: this.productoData.productoid,
        descripcion: this.productoData.descripcion,
        unidades: this.cantidad,
        precio: this.productoData.precio * this.cantidad,
        estatus: 'Activo',
    })
      console.log('Datos lista', this.productosSalida)
      this.productoData = {};
      this.cantidad = 0;
      this.productoid = '';
      return;
  }

  saveSalida(){
    if(this.productosSalida.length == 0){
      alert('No se puede guardar una salida vacía')
      return
    }
    try{
      this.http.post('http://localhost:3000/savesalida', {usuario: localStorage.getItem('usuarioid'),  productos: this.productosSalida}).subscribe((element: any) =>{
        if(element.status == 200){
          alert(element.message)
          this.productosSalida = []
        }else{
          alert(`Error: ${element.message}`)
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`)
    }
  }

  buscaProducto(){
    if(!this.productoid){
      alert('Ingrese una clave valida de producto')
    }
    try{
      this.http.get('http://localhost:3000/productbyid', {params: {id: this.productoid}}).subscribe((element: any)=>{
        console.log('prueba', element.data[0])
        
        if(element.status == 200){
          if(element.data.estatus == 2){
            alert(`Error: El producto se encuentra inactivo por lo que no es posible agregarlo a la salida`) 
          }
          element.data[0].estatus = 'Activo'
          this.productoData = element.data[0];
        }else{
          alert(`Error: ${element.message}`) 
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`) 
    }
  }
}
