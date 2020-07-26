import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  @Output() onlyFavorites = new EventEmitter();
  @Input() showNext: boolean;
  @Input() showPrevious: boolean;
  constructor() { }

  ngOnInit(): void {
  }
}
