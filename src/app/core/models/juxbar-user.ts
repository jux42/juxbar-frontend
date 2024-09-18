import {PersonalCocktail} from "./personal-cocktail";

export class JuxbarUser {

  username!: string;
  active!: Boolean;
  personalCocktails!: PersonalCocktail[];

  email!: string;

  profilePicture!: Blob;

  aboutMeText!: string;
}
