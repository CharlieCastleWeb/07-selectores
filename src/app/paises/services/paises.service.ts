import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { PaisSmall, Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion ( region: string ): Observable<PaisSmall[]> {

    const url: string = `${this.baseUrl}/region/${region}?fields=alpha3Code,name`
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo( codigo: string ):Observable<Pais | null> {
    if ( !codigo ) {
      return of(null);
    }
    const url= `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall( codigo: string ):Observable<PaisSmall | null> {
    const url= `${this.baseUrl}/alpha/${codigo}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigo( borders: string[] ): Observable<PaisSmall[]> {
    if(!borders) {
      return of([]);
    }

    const borderCodes = borders.join(',');

    return this.http.get<PaisSmall[]>
        (`${this.baseUrl}/alpha/?codes=${borderCodes}&fields=alpha3Code,name`);

  }
}
