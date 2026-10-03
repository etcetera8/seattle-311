import { makeAutoObservable, observableRef, runInAction } from "mobx";

export type RawPoint = [longitude: number, latitude: number, typeIndex: number, unixDate: number];
export type CityData = {
    types: string[],
    points: RawPoint[]
}
export type Point = [longitude: number, latitude: number, type: string, unixDate: number];

export const ALL = "All";

export class Controller {
    pointsByYear: Record<string, Point[]> = {};
    selectedYear: string = ALL;
    types: string[] = [];
    selectedType: string | null = null;

    constructor() {
        makeAutoObservable(this, { pointsByYear: observableRef, types: observableRef }, { autoBind: true });
    }

    get filteredData(): Point[] {
        const points = this.pointsByYear[this.selectedYear] ?? [];
        return this.selectedType ? points.filter(x => x[2] === this.selectedType) : points;
    }

    get years(): string[] {
        return Object.keys(this.pointsByYear).filter(x => x !== ALL);
    }

    get hasData(): boolean {
        return (this.pointsByYear[ALL]?.length ?? 0) > 0;
    }

    init() {
        this.fetchData();
    }

    setType(type: string | null) {
        this.selectedType = type || null;
    }

    setYear(year: string) {
        this.selectedYear = year;
    }

    private fetchData() {
        fetch("/requests.json")
            .then((res) => res.json())
            .then((cityData: CityData) => runInAction(() => {
                this.types = [...cityData.types];
                this.pointsByYear = this.groupByYear(this.mapData(cityData));
            }))
            .catch((e) => console.error("Error fetching data", { e }));
    }

    private mapData({ types, points }: CityData): Point[] {
        return points.map(([lng, lat, typeIndex, unixDate]) => [lng, lat, types[typeIndex], unixDate]);
    }

    private parseYear(unixDate: number) {
        return new Date(unixDate * 1000).getUTCFullYear().toString();
    }

    private groupByYear(points: Point[]): Record<string, Point[]> {
        const grouped: Record<string, Point[]> = { [ALL]: points };
        for (const point of points) {
            (grouped[this.parseYear(point[3])] ??= []).push(point);
        }
        return grouped;
    }
}
