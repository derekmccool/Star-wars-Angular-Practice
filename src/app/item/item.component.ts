import { Component, OnInit, Input} from '@angular/core';
import { StarWarsService } from '../starwars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit(): void {
  }

  onAssign(side){

    this.swService.onSideChosen({name: this.character.name, side: side});
  }
}
