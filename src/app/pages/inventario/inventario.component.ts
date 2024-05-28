import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {
  constructor(private http: HttpClient, private router: Router, ) { }
  result: any[] = []
  descripcion: string = ''
  precio: number;
  productoSeleccionado: any;
  stock: number;
  rol: number = Number(localStorage.getItem('rol'))
  getData(){
    this.http.get('http://localhost:3000/allproducts').subscribe((element: any)=>{
      if(element.status == 200){
        this.result = element.data;
      }else{
        alert(`Error: ${element.message}`)
      }
    })
  }

  agregarStock(){
    if(!this.stock || this.stock <= 0){
      alert('la cantidad por agregar debe ser mayor que cero')
      return
    }
    try{
      this.http.post('http://localhost:3000/updatestock', {id: this.productoSeleccionado.productoid, stock: this.stock, precio: this.productoSeleccionado.precio * this.stock, usuario: localStorage.getItem('usuarioid')}).subscribe((element: any)=>{
        if(element.status == 200){
          alert(element.message)
          this.productoSeleccionado = null;
          this.stock = 0;
          this.getData()
        }else{
          alert(`Error: ${element.message}`)
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`)
    }
  }

  saveProduct(){
    if(!this.precio || this.precio <= 0){
      alert('El precio debe ser mayor que cero')
      return
    }
    if(!this.descripcion){
      alert('Ingrese una descripcion valida')
      return
    }
    try{
      this.http.post('http://localhost:3000/insertproduct', {descripcion: this.descripcion, precio: this.precio}).subscribe((element: any)=>{
        if(element.status == 200){
          alert(element.message)
          this.descripcion = ''
          this.precio = 0;
          this.getData()
        }else{
          alert(`Error: ${element.message}`)
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`)
    }
  }
  seleccionaProducto(producto: any){
    this.productoSeleccionado = null;
    console.log("producto", producto)
    this.productoSeleccionado = producto;
  }

  updateEstatus(producto: any){
    try{
      this.http.post('http://localhost:3000/updateestatus', producto).subscribe((element: any)=>{
        if(element.status == 200){
          alert(element.message)
          this.getData()
        }else{
          alert(`Error: ${element.message}`)
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`)
    }
  }

  ngOnInit(): void {
        this.getData()
  }
}
