import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {
  constructor(private http: HttpClient, private router: Router, ) { }
  salidasDataStatic: any[] = []
  salidasDataTemp: any[] = []
  folio: number;

  filterById(event: any){
    console.log("Evento", event.target.value)
    this.salidasDataTemp = this.salidasDataStatic
   if(event.target.value){
    this.salidasDataTemp = this.salidasDataTemp.filter((element:any)=> {
      return element.salidaid == event.target.value;
    })
   }
  }

  filterByDescription(event: any){
    console.log("Evento", event.target.value)
    this.salidasDataTemp = this.salidasDataStatic
    if(event.target.value){
      this.salidasDataTemp = this.salidasDataTemp.filter((element:any)=> {
        return element.descripcion.includes(event.target.value);
      })
   }
  }

  filterByUsuario(event: any){
    console.log("Evento", event.target.value)
    this.salidasDataTemp = this.salidasDataStatic
    if(event.target.value){
      this.salidasDataTemp = this.salidasDataTemp.filter((element:any)=> {
        return element.usernom.includes(event.target.value);
      })
   }
  }
  
  
  getSalidas(){
    try{
      this.http.get('http://localhost:3000/getsalidas').subscribe((element:any) => {
        if(element.status == 200){
          this.salidasDataStatic = element.data;
          this.salidasDataTemp = element.data;
        }else{
          alert(`element.message`)
        }
      })
    }catch(error: any){
      alert(`Error: ${error.toString()}`)
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSalidas();
  }
}
