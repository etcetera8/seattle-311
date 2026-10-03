import { makeAutoObservable, observableRef, runInAction } from "mobx";

export type RawPoint = [longitude: number, latitude: number, typeIndex: number, unixDate: number];
export type CityData = {
    types: string[],
    points: RawPoint[]
}
export type Point = [longitude: number, latitude: number, type: string, unixDate: number];

export class Controller {
    years: number[] = [];
    selectedYear: number | null = null;
    types: string[] = [];
    selectedType: string | null = null;
    allData: Point[] = [];
    filteredData: Point[] = [];

    constructor() {
        makeAutoObservable(this, { allData: observableRef, types: observableRef }, { autoBind: true });
    }

    init() {
        this.fetchData();
    }

    setType(type: string | null)  {
        this.selectedType = type;
        if (type) {
            this.filteredData = this.allData.filter(x => x[2] == type)
        } else {
            this.filteredData = this.allData;
        }
    }

    private fetchData() {
        fetch("/requests.json")
            .then((res) => res.json())
            .then((cityData: CityData) => runInAction(() => {
                this.types = [...cityData.types];
                this.allData = this.mapData(cityData);
                this.filteredData = this.allData;
            }))
            .catch((e) => console.error("Error fetching data", { e }));
    }

    private mapData({ types, points }: CityData): Point[] {
        return points.map(([lng, lat, typeIndex, unixDate]) => [lng, lat, types[typeIndex], unixDate]);
    }
}
