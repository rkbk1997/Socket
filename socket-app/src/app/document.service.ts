import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  getDocument(id: string): any {
    this.socket.emit('getDoc', id);
  }

  newDocument(): any {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: Document): any {
    this.socket.emit('editDoc', document);
  }

  private docId(): any {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}