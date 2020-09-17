import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DocumentService } from 'src/app/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): any {
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  }

  ngOnDestroy(): any {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string): any {
    this.documentService.getDocument(id);
  }

  newDoc(): any {
    this.documentService.newDocument();
  }

}