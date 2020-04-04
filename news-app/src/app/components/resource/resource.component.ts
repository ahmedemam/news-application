import { Component, OnInit, Input } from '@angular/core';
import { Source } from 'src/app/_core/_models/source';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  private $resource: Source;
  @Input() set resource(value) {
    if (value) {
      this.$resource = value;
    }
  }
  get resource() {
    return this.$resource;
  }

  constructor() { }

  ngOnInit() {
  }

}
