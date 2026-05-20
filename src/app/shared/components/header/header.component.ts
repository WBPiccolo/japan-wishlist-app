import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-header',
  imports: [SelectModule, FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output themePicked = new EventEmitter<string>()

  themes: string[] = ['theme1', 'theme2', 'theme3'];
  themeModel:string = this.themes[0];

  onChangeTheme(){
    console.log('setting theme', themeModel);
    this.themePicked.emit(themeModel)
  }
}
