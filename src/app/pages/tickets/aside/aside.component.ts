import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;

  obj = {type: 'custom', label: 'Обычное'};

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]


  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private ticketService: TicketsService, private messageService: MessageService,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  changeType(ev: { ev: Event, value: IMenuType }): void {
    console.log('ev', ev)
    // const obj = {val1: 1,val2: 2}
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value);
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date: ev})
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
        next: (data) => {
        },
        error: (err) => {
        this.messageService.add({severity: 'warning', summary: 'Ошибка'})
        },
      complete:() =>{}
      }
    )
  }
  initSettingsData(): void{
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    })
  }
}


