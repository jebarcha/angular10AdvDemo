import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
	selector: 'app-dona',
	templateUrl: './dona.component.html',
	styles: []
})
export class DonaComponent {
	@Input() title;
	@Input('labels') doughnutChartLabels: Label[] = [ 'Label1', 'Label2', 'Label3' ];
	@Input('data') datadoughnutChartData: MultiDataSet;

	public colors: Color[] = [ { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] } ];
}
