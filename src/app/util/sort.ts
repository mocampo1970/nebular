// Explica todo el sort:
// https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
export class Sort {

    private sortOrder = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    constructor() {
    }

    public startSort(property: string | number, order: string, type = "") {
        //console.log("startSort")  
        if (order === "desc") {
            this.sortOrder = -1;
        }
        return (a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            if (type === "date") {
                return this.sortData(new Date(a[property]), new Date(b[property]));
            }
            else {
                return this.collator.compare(a[property], b[property]) * this.sortOrder;
            }
        }
    }

    private sortData(a: number | Date, b: number | Date) {
        console.log("sortData en sort")  
        if (a < b) {
            return -1 * this.sortOrder;
        } else if (a > b) {
            return 1 * this.sortOrder;
        } else {
            return 0 * this.sortOrder;
        }
    }

}
