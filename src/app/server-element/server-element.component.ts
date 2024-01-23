import { 
  Component
  , OnInit
  , Input
  , ViewEncapsulation
  , OnChanges 
  , SimpleChanges
  , DoCheck
  , AfterContentInit
  , AfterContentChecked
  , AfterViewInit
  , AfterViewChecked
  , OnDestroy
  , ViewChild // only good for the VIEW and not for the content.
  , ElementRef
  , ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css', 
  encapsulation: ViewEncapsulation.Emulated //emulated is default. You can also use Native or None.
})
export class ServerElementComponent implements //interface list below
  OnInit
  , OnChanges
  , DoCheck
  , AfterContentInit 
  , AfterContentChecked
  , AfterViewInit
  , AfterViewChecked
  , OnDestroy
{
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef; // calling "heading" from server-element.component.html
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef; // this is calling the tag contentParagraph from app.component.html 
  // ^^ won't be able to access content until after content has been Init! AfterContentInit.

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {  // this is the only hook that accepts an argument.
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit() { 
    console.log('ngOnInit called!');
    console.log('Text Content of heading from ViewChild: ' + this.header.nativeElement.textContent); // this will be blank because it's being used too early! copied down into AfterViewInit vvv
    console.log('Text Content of paragraph from @ContentChild: ' + this.paragraph.nativeElement.textContent); // this will be blank because it's being used too early! copied down into AfterViewInit vvv
  }

  ngDoCheck() { //don't use this for major things, because it runs every check and will cost you a lot of performance.
    // good for use if you want to check changes and then to know if you do need to change things manually if angular didn't pick it up. or something like that. 
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit () {
    console.log('ngAfterContentInit called!'); // only called the one time content is initialized.
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: ' + this.header.nativeElement.textContent); // copied above from OnInit, where it displays blank text.
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }

}
