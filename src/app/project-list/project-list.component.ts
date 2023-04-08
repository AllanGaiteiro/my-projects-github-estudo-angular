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
  octokit = new Octokit({ auth: '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' });

  constructor() { }
  ngOnInit() {
    this.findListProjectForUse();
  }

  private findListProjectForUse() {
    this.octokit.repos.listForUser({
      username: 'AllanGaiteiro',
    }).then(({ data }) => {
      // exibe os dados dos seus projetos do GitHub no console
      this.allProjects = data.filter(p => p.language).sort((a, b) => b['updated_at'] && a['updated_at'] && (b['updated_at'] > a['updated_at']) ? 1 : -1);
      this.projects = this.allProjects.slice(0, 6);
    }).catch(error => {
      console.error(error);
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
