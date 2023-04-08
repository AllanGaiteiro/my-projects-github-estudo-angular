import { Component, Input, OnInit } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { langCollors } from './langCollors';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss']
})
export class CardProjectComponent implements OnInit {
  @Input() project: any;
  octokit = new Octokit();
  languagens: {
    name: string;
    value: number
  }[] = [];
  languagenCollors: any = langCollors;
  gradient: string[] = ['to right'];

  constructor() { }

  async ngOnInit(): Promise<void> {
    try {
      const { data } = await this.octokit.repos.listLanguages({
        owner: this.project.owner.login,
        repo: this.project.name,
      });
      const languagesString = Object.keys(data);
      if (languagesString.length > 0) {
        this.languagens = languagesString.map((name) => ({ name, value: data[name] })).sort((a, b) => b.value - a.value);
        this.borderColor();
      }
    } catch (error) {
      console.error(error);
    }
  }


  borderColor(): void {
    const count = this.languagens.reduce((total, { value }) => total + value, 0);
    let percentageCount = 0;
    for (const language of this.languagens) {
      const percentage = (language.value / count) * 100;
      this.gradient.push(` ${this.languagenCollors[language.name]} ${percentageCount}%`);
      percentageCount += percentage;
      this.gradient.push(` ${this.languagenCollors[language.name]} ${percentageCount}%`);
    }
  }

  styleBorder(): { [key: string]: string } {
    const value = `linear-gradient(${this.gradient.length > 1 ? this.gradient.join(",") : 'to right, black 0%, black 100%'})`;
    return {
      'background-image': value,
    };
  }

}
