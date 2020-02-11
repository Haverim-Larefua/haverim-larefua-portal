
export default function createInitials(firstName: string, lastName: string) : string {
    const first = firstName.charAt(0);
    const last = lastName.charAt(0);
    //PINAT HAYAHADUT ...
    if (first === 'י'  && ( last === 'ה'|| last === 'ו')) {
        return first + '-' + last;
    } else {
        return first + last;
    }
}