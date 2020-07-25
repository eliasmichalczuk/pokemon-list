export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public baseExperience: number,
    public height: number,
    public isDefault: boolean,
    public order: number,
    public weight: number,
    public stats: any[],
    public sprites: any,
    public moves: any[],
    public isFavorite: boolean
  ) {
  }
}
