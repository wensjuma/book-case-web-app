export class StationUsers {
    stationId: number;
    stationName: string;
    userId: number;
    roleId: string;
    rules: string;
    active: boolean;
    createdby: string;
    createdOn: string;
}

export class Stations {
    stationId: number;
    stationName: string;
    countyId: number;
    location: string;
}

export class StationCells {
    stationcellId: number;
    stationId: number;
    cellName: string;
}
