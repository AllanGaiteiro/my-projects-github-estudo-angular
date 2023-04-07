import { Component, OnInit } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  octokit = new Octokit(
    //{auth: 'f514a0ba2836d3c6ae1fa637e3e36c2abc267919'} verificar
  );
  projects: any[] | undefined;
  constructor() { }

  ngOnInit(): void {

    this.octokit.repos.listForUser({
      username: 'AllanGaiteiro'
    }).then(({ data }) => {
      // exibe os dados dos seus projetos do GitHub no console
      console.log(data);
      this.projects = data
    }).catch(error => {
      console.error(error); // exibe uma mensagem de erro no console se a chamada da API falhar
    });
  }

}
