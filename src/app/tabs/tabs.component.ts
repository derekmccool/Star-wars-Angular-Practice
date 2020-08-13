import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starwars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  characters = [];
  chosenList = 'all';
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit(): void {
  }

  onChoose(side){
    this.chosenList = side;
  }

  getCharacters(){
    this.characters = this.swService.getCharacters(this.chosenList);
    return this.characters;
  }


}
