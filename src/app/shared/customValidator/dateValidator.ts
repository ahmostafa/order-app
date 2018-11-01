import { FormControl} from '@angular/forms';
export class DateValidator {
    static enDateFormat(control: FormControl): { [ key: string]: any} {
        // tslint:disable-next-line:max-line-length
        const enDatePattern =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

       if (!control.value.match(enDatePattern)) {
        return { 'enDateFormat': true };
       }
       return null;
    }

    static checkAgePlusEighteen(control: FormControl ): { [key: string]: any} {
        const result = (DateValidator.getAge(control.value) < 18) ? {'underAge': true} : null;
        console.log(DateValidator.getAge(control.value));
        return result;
    }
    private static getAge(birthDateStr): number {
        let result =  0;
        const today = new Date();
        const birthDate = new Date (birthDateStr);
        result = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        --result;
        }
        return result;
    }
}
