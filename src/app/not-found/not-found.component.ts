import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'thotify-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  private cmds: {[command: string]: {help: string, exec: (() => void)}} = {
    "-h": { help: "print this help screen", exec: () => this.help() },
    "-b": { help: "go back to previous page", exec: () => this.back() },
    "-m": { help: "go to home page", exec: () => this.goHome() },
    "-c": { help: "print a cute cat", exec: () => this.cat() },
  };

  command = ""

  lines: {value: string, class: string}[] = []

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.executeCommand();
    } else if (event.key === 'Backspace') {
      this.command = this.command.slice(0, -1)
    } else {
      this.command += event.key;
    }
  }

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  executeCommand(){
    this.lines.push({value: this.command, class: ""})
    if (this.command in this.cmds) {
      this.cmds[this.command].exec();
    } else {
      this.lines.push({value: "INCOMPETENCE ERROR: no such command.", class: "error"});
    }
    this.command = "";
  }

  help() {
    this.lines.push({value: "-------------", class: "help"})
    this.lines = this.lines.concat(
      Object.entries(this.cmds).map(
        (entry) => ({name: entry[0], help: entry[1].help})
      ).map(
        command => ({value: `${command.name} ${command.help}`, class: "help"})
      )
    )
    this.lines.push({value: "-------------", class: "help"})
  }

  back() {
    this.lines.push({value: "go back to previous page in 3s...", class: "warn"})
    setTimeout(() => this.location.back(), 3000)
  }

  goHome() {
    this.lines.push({value: "redirect to home page in 3s...", class: "warn"})
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 3000);
  }

  cat() {
    const ascii = `     /\\     /\\
    {  \`---'  }
    {  O   O  }
    ~~>  V  <~~
     \\  \\|/  /
      \`-----'____
      /     \\    \\_
     {       }\\  )_\\_   _
     |  \\_/  |/ /  \\_\\_/ )
      \\__/  /(_/     \\__/
        (__/`
    ascii.split('\n').forEach(
      line => {
        this.lines.push({value: line, class: "warn"})
      }
    )
  }
}
