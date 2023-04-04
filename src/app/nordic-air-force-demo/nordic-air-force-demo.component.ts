import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nordic-air-force-demo',
  templateUrl: './nordic-air-force-demo.component.html',
  styleUrls: ['./nordic-air-force-demo.component.scss']
})
export class NordicAirForceDemoComponent implements OnInit {
  audio: any;
  musicPath: string = "./assets/nordic-demo/audio/dangerzone.mp3";
  isMusicPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMusic() {

    this.isMusicPlaying = !this.isMusicPlaying
    if (!this.audio) {
      this.audio = new Audio();
    }

    this.audio.src = this.musicPath;


    // switch audio on
    if (this.isMusicPlaying) {
      this.audio.load();
      this.audio.loop = true;
      this.audio.muted = false;
      this.audio.play();
    }

    // switch audio off
    if (!this.isMusicPlaying) {
      // this.audio.stopMusic()
      this.audio.muted = true;
    }
    console.log(this.isMusicPlaying);

  }



}
