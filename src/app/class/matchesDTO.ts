export class MatchesDTO {
    IdTeamADTO: string;
    IdTeamBDTO: string;
    DateTimeDTO: Date | null;

    constructor(item?: MatchesDTO){
        this.IdTeamADTO = item?.IdTeamADTO ?? "";
        this.IdTeamBDTO = item?.IdTeamBDTO ?? "";
        this.DateTimeDTO = item?.DateTimeDTO ?? null;
    }
}
