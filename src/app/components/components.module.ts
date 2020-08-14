import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { PromesasComponent } from './promesas/promesas.component';

@NgModule({
	declarations: [ IncrementadorComponent, DonaComponent, PromesasComponent ],
	exports: [ IncrementadorComponent, DonaComponent ],
	imports: [ CommonModule, FormsModule, ChartsModule ]
})
export class ComponentsModule {}
