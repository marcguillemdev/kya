import { Domain } from 'src/app/modelos/domain';
import { Usuario } from 'src/app/modelos/usuario';

export class Post {

  codigo_post: number;
  authors: Usuario[];
  creationDate: Date;
  title: string;
  content: string;
  domain: Domain;

  constructor(codigo_post: number, authors: Usuario[], creationDate: Date, title: string, content: string, domain: Domain) {
    this.codigo_post = codigo_post;
    this.authors = authors;
    this.creationDate = creationDate;
    this.title = title;
    this.content = content;
    this.domain = domain;
  }

}
