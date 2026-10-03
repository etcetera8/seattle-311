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
    dataPoints: Point[] = [];

    constructor() {
        makeAutoObservable(this, { dataPoints: observableRef, types: observableRef }, { autoBind: true });
    }

    init() {
        this.fetchData();
    }

    setType(type: string | null)  {
        this.selectedType = type;
    }

    private fetchData() {
        fetch("/requests.json")
            .then((res) => res.json())
            .then((cityData: CityData) => runInAction(() => {
                this.types = [...cityData.types];
                this.dataPoints = this.mapData(cityData);
            }))
            .catch((e) => console.error("Error fetching data", { e }));
    }

    private mapData({ types, points }: CityData): Point[] {
        return points.map(([lng, lat, typeIndex, unixDate]) => [lng, lat, types[typeIndex], unixDate]);
    }
}
