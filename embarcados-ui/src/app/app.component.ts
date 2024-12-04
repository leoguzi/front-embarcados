import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoNotificationService, PoPageModule, PoToasterOrientation, PoNotificationModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoContainerModule } from '@po-ui/ng-components';
import { AppService } from './app.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PoPageModule,
    PoFieldModule,
    FormsModule,
    PoContainerModule,
    PoNotificationModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private appService: AppService,
    private notification: PoNotificationService
  ) { }

  lampada!: boolean;
  persiana!: boolean;
  lampadaManual!: boolean;
  timeInterval!: any;
  isUpdating = false

  public async ngOnInit() {
    this.isUpdating = true;
    this.timeInterval =
      setInterval(async () => {
        this.lampada = await lastValueFrom(this.appService.getStatusLampada());
        this.persiana = await lastValueFrom(this.appService.getStatusPersiana());
        this.isUpdating = false;
      }, 3000);
    this.lampadaManual = await lastValueFrom(this.appService.getLampadaManual());
    this.isUpdating = false;
  }

  public async handleLampada() {
    this.isUpdating = true;
    if (this.lampada) {
      await lastValueFrom(this.appService.acenderLampada());
    } else {
      await lastValueFrom(this.appService.apagarLampada());
    }
  }

  public async handlePersiana() {
    this.isUpdating = true;
    if (!this.persiana) {
      await lastValueFrom(this.appService.fecharPersiana());
    } else {
      await lastValueFrom(this.appService.abrirPersiana());
    }
  }

  public async handleLampadaManual() {
    this.isUpdating = true;
    if (this.lampadaManual) {
      await lastValueFrom(this.appService.lampadaManual());
    } else {
      await lastValueFrom(this.appService.lampadaAutomatica());
    }
  }

  public ngOnDestroy() {
    clearInterval(this.timeInterval);
  }
}
