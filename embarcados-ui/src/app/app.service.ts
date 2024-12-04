import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  public getStatusLampada(): Observable<any> {
    return this.http.get(`/lampada/status`);
  }

  public getStatusPersiana(): Observable<any> {
    return this.http.get(`/persiana/status`);
  }

  public getLampadaManual(): Observable<any> {
    return this.http.get(`lampada/modo`);
  }

  public fecharPersiana(): Observable<any> {
    return this.http.put(`persiana/fechar`, {});
  }

  public abrirPersiana(): Observable<any> {
    return this.http.put(`persiana/abrir`, {});
  }

  public acenderLampada(): Observable<any> {
    return this.http.put(`lampada/acender`, {});
  }

  public apagarLampada(): Observable<any> {
    return this.http.put(`lampada/apagar`, {});
  }

  public lampadaManual(): Observable<any> {
    return this.http.put(`lampada/manual`, {});
  }

  public lampadaAutomatica(): Observable<any> {
    return this.http.put(`lampada/automatico`, {});
  }
}
