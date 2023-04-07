import { Component, OnInit } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  allProjects: any[] = [];
  projects: any[] = [];
  showMore = false;
  searchQuery = '';
  octokit = new Octokit(
    //{auth: 'f514a0ba2836d3c6ae1fa637e3e36c2abc267919'} verificar
  );

  constructor() { }
  ngOnInit() {
    // Substitua "seu_nome_de_usuario" abaixo pelo seu nome de usuário do GitHub

    this.octokit.repos.listForUser({
      username: 'AllanGaiteiro',

    }).then(({ data }) => {
      // exibe os dados dos seus projetos do GitHub no console
      this.allProjects = data;
      this.projects = data.slice(0, 6);
      console.log(this.projects)
    }).catch(error => {
      console.error(error); // exibe uma mensagem de erro no console se a chamada da API falhar
    });

  }

  toggleShowMore() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.projects = this.allProjects;
    } else {
      this.projects = this.allProjects.slice(0, 6);
    }
  }

  searchProjects() {
    console.log(this.searchQuery)

    this.projects = this.allProjects.filter((project) => {
      return project.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    }).slice(0, 6);
  }

}
