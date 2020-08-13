import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/Http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
@Injectable()
export class StarWarsService {

 private characters= [
    {name: "Luke Skywalker", side: ''},
    {name: "Darth Vader", side: ''},
    {name: "Obi Wan Kenobi", side: ''}
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: Http;
  constructor(logService: LogService, http: Http){
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters(){
    this.http.get('https://swapi.dev/api/people/')
      .map((response: Response) => {
        const data = response.json();
        const extractedChars = data.results;
        const chars = extractedChars.map((char) => {
          return {name: char.name , side: ''}
        });
        return chars;
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.characters = data;
          this.charactersChanged.next();
        }
      );

  }

  getCharacters(chosenList){
    if (chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((character) =>{
      return character.side === chosenList;
    })
  }

  onSideChosen(characterInfo){
    const position = this.characters.findIndex((character) =>{
      return character.name === characterInfo.name;
    })
    this.characters[position].side = characterInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + characterInfo.name + ', new side: ' + characterInfo.side);

  }


  addCharacter(name, side){
    const position = this.characters.findIndex((character) =>{
      return character.name === name;
    })
    if(position !== -1){
      return;
    }
    const newChar = {name: name, side: side};

    this.characters.push(newChar);
  }

}
