import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starwars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    {display: 'None', value: ''},
    {display: 'Light', value: 'light'},
    {display: 'Dark', value: 'dark'}
  ];
  swService: StarWarsService;

  defaultName="Obi-Wan Kenobi";

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm){
    if (submittedForm.invalid){
      return;
    }
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);

  }


}
