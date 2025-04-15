import './footerComponent.css';
import { Component } from '../utils/component';


export class FooterComponent extends Component<'footer'> {
  constructor() {
    super({
      tag: 'footer',
      className: 'footer-wrapper',
    });
    const author = new Component({
      tag: 'a',
      className: 'author-link',
      text: 'vlmna13'
    });
    author.getNode().setAttribute('href', 'https://github.com/vlmna13');
    author.getNode().setAttribute('target', '_blank');

    const rsschool = new Component({
        tag: 'a',
        className: 'rsschool-link',
        text: 'RSSchool'
    });
    rsschool.getNode().setAttribute('href', 'https://rs.school/');
    rsschool.getNode().setAttribute('target', '_blank');
    this.appendChildren([author, rsschool]);
  }
}