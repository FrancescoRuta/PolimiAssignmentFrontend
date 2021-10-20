import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'getObjectProp'
})
export class GetObjectPropPipe implements PipeTransform {

	transform(value: any, prop: string): any {
		let p = prop.split(".");
		for (let i = 0; i < p.length; ++i) value = value[p[i]];
		return value;
	}

}
