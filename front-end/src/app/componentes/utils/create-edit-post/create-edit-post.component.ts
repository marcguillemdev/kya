import  EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import DragDrop from 'editorjs-drag-drop';

import { Component, OnInit } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.css']
})
export class CreateEditPostComponent implements OnInit {

  editor: any;

  constructor() { }

  ngOnInit(): void {
    this.editor = new EditorJS({
      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          toolbox: {
            title: 'Título',
          },
          config: {
            placeholder: 'Título'
          }
        }
      },
      onReady: () => {
        new DragDrop(this.editor);
      }
    })
  }

  async savePost(): Promise<void> {
    let postData: any = await firstValueFrom(from(this.editor.save()));
    console.log(postData);
  }

}
