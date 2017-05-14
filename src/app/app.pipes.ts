import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any, term: string): any {
        return value.filter((bucket: any) => {
            return bucket.name.toLowerCase().includes(term.toLowerCase());
        });
    }
}