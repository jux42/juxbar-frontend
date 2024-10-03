import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../login/auth-service";
import {Router} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PersonalCocktailComponent} from "../../drinks/personal-cocktail/personal-cocktail.component";
import {CocktailComponent} from "../../drinks/cocktails/components/cocktail/cocktail.component";
import {PersonalCocktail} from "../models/personal-cocktail";
import {FadeInOutAnimation} from "../../animations";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {Cocktail} from "../models/cocktail";
import {SoftDrink} from "../models/softDrink";
import {SoftDrinkService} from "../services/softDrinkService";
import {SoftDrinkComponent} from "../../drinks/soft-drinks/components/soft-drink/soft-drink.component";
import {FavouriteService} from "../services/favourite.service";
import {catchError, of, Subscription, switchMap} from "rxjs";
import {State} from "../models/state";
import {map} from "rxjs/operators";
import {ProfileService} from "../services/profile.service";
import {JuxbarUser} from "../models/juxbar-user";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from "../../../environments/environment";
import {MagicNumerFileValidationService} from "../services/magic-numer-file-validation.service";
import {AccountManagerComponent} from "./account-manager/account-manager.component";
import {PersonalCocktailService} from "../services/personal-cocktail.service";
import {CocktailService} from "../services/cocktailService";


@Component({
  selector: 'app-profile',
  standalone: true,
  animations: [
    FadeInOutAnimation,
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          stagger('10ms', animate('700ms ease-in', style({transform: 'translateY(0)', opacity: 1})))
        ], {optional: true})
      ])
    ])

  ],
  imports: [
    NgIf,
    PersonalCocktailComponent,
    CocktailComponent,
    NgForOf,
    AsyncPipe,
    NgClass,
    SoftDrinkComponent,
    ReactiveFormsModule,
    FormsModule,
    AccountManagerComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'

})
export class ProfileComponent implements OnInit {

  userName!: string | null;
  loggedIn: boolean = false;
  isLoading: boolean = true;
  showModal: boolean = false;
  showAccountManager: boolean = false;

  @Input() personalCocktail!: PersonalCocktail;

  juxbarUser!: JuxbarUser;
  personalCocktails!: PersonalCocktail[];
  favouriteCocktails!: Cocktail[];
  favouriteSoftDrinks!: SoftDrink[];
  removingCocktailIds: Set<number> = new Set();
  removingSoftDrinkIds: Set<number> = new Set();
  State = State;
  aboutMeForm!: FormGroup;
  selectedFile!: File;
  validationMessage!: string;
  protected readonly PersonalCocktail = PersonalCocktail;
  protected readonly environment = environment;
  private favouriteRemovedSubscription!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private personalCocktailService: PersonalCocktailService,
              private cocktailService: CocktailService,
              private softDrinkService: SoftDrinkService,
              private cdr: ChangeDetectorRef,
              private favouriteService: FavouriteService,
              private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private magicNumberValidationService: MagicNumerFileValidationService) {
  }

  ngOnInit() {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.checkLoggedIn();
    this.aboutMeForm = this.formBuilder.group({
      aboutMeText: [this.juxbarUser?.aboutMeText || '', [Validators.maxLength(1000)]],
    });

    if (this.loggedIn) {
      this.loadUser();
      this.loadProfilePicture();
      console.log(this.loggedIn)
      this.loadPersonalCocktails();
      this.loadFavouriteCocktails();
      this.loadFavouriteSoftDrinks();
      this.favouriteRemovedSubscription = this.favouriteService.favouriteRemoved$.subscribe(({id, type}) => {
        if (type === 'cocktail') {
          this.removeCocktailById(id);
          this.startRemoveCocktail(id);
        } else if (type === 'softDrink') {
          this.removeSoftDrinkById(id);
          this.startRemoveSoftDrink(id);
        }
      });
    }


  }

  loadUser() {
    return this.profileService.getUser().pipe(
      map((user) => {
        if (user.username === 'superadmin' || user.username === 'admin') {
          console.log(user.username + ' skipped');
        } else {
          this.juxbarUser = user;
          this.cdr.detectChanges();
          console.log('User loaded:', this.juxbarUser);
        }
      })
    ).subscribe({
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

  loadProfilePicture() {
    return this.profileService.getProfilPicture().pipe(
      map((picture) => {
        this.juxbarUser.profilePicture = picture;
      })
    )
  }

  loadPersonalCocktails() {
    this.personalCocktailService.getAllPersonalCocktails().subscribe({
      next: (cocktails) => {
        this.personalCocktails = cocktails.map(cocktail => {
          cocktail.state = cocktail.state || State.SHOWED;  // Assigner un état si non défini
          return cocktail;
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading personal cocktails', error);
        this.isLoading = false;
      }
    });
  }

  loadFavouriteCocktails() {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.cocktailService.getFavouriteCocktails()?.subscribe({

          next: (favCocktails) => {
            if (!favCocktails) favCocktails = [];
            this.favouriteCocktails = favCocktails;

          },
          error: (error) => {
            console.error('No cocktails to load', error);
            this.isLoading = false;
          }
        })
      }
    });
  }

  loadFavouriteSoftDrinks() {
    this.authService.getUsername().subscribe(username => {
      if (username) {
        this.softDrinkService.getFavouriteSoftDrinks()?.subscribe({

          next: (favSoftDrinks) => {
            if (!favSoftDrinks) favSoftDrinks = [];
            this.favouriteSoftDrinks = favSoftDrinks;
          },
          error: (error) => {
            console.error('no softdrinks to load', error);
            this.isLoading = false;
          }
        })
      }
    });
  }

  checkLoggedIn(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.authService.getUsername().subscribe(username => {
      this.userName = username;
    });
  }

  removeCocktailById(cocktailId: number) {
    this.favouriteCocktails = this.favouriteCocktails.filter(cocktail => cocktail.id !== cocktailId);
  }

  removeSoftDrinkById(softDrinkId: number) {
    this.favouriteSoftDrinks = this.favouriteSoftDrinks.filter(softDrink => softDrink.id !== softDrinkId);
  }

  startRemoveCocktail(cocktailId: number) {
    this.removingCocktailIds.add(cocktailId);
    setTimeout(() => {
      this.removingCocktailIds.delete(cocktailId);
      this.removeCocktailById(cocktailId);
      this.cdr.detectChanges();

    }, 1000);
  }

  startRemoveSoftDrink(softDrinkId: number) {
    this.removingSoftDrinkIds.add(softDrinkId);
    setTimeout(() => {
      this.removingSoftDrinkIds.delete(softDrinkId);
      this.removeSoftDrinkById(softDrinkId);
      this.cdr.detectChanges();

    }, 1000);
  }

  openEditModal() {
    this.showModal = true;
  }

  closeEditModal() {
    this.showModal = false;
  }

  onSubmitAboutMe() {
    if (this.aboutMeForm.valid) {
      const aboutMeText = this.aboutMeForm.get('aboutMeText')?.value;

      this.profileService.checkTextSecurity(aboutMeText).pipe(
        switchMap((isSecure: boolean) => {
          if (isSecure) {
            return this.profileService.updateAboutMeText(aboutMeText);
          } else {
            console.warn('text is not secured.');
            alert('this is not a valid entry. PLease try something else (malicious code injections are obviously not allowed)')
            return of({ error: 'this is not a valid entry. PLease try something else (malicious code injections are obviously not allowed)' });
          }
        })
      ).subscribe({
        next: (response) => {
          if (response.error) {
            console.warn(response.error);
          } else {
            this.juxbarUser.aboutMeText = aboutMeText;
            this.cdr.detectChanges();
            this.closeEditModal();
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification de sécurité ou de la mise à jour :', error);
        }
      });
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('file :', file);
      this.selectedFile = file;
    }
  }

  onSubmitProfilePicture() {
    if (this.selectedFile) {
      this.magicNumberValidationService.validateFile(this.selectedFile).pipe(
        catchError((error) => {
          this.validationMessage = `Erreur de validation : ${error}`;
          return of(false);
        })
      ).subscribe((isValid) => {
        if (isValid) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(this.selectedFile);
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: this.selectedFile?.type });

            this.profileService.updateProfilePicture(blob).subscribe({
              next: (response) => {
                alert('Profile picture updated successfully');
                this.loadUser();
                this.closeEditModal();
                this.loadProfilePicture();
                window.location.reload();
              },
              error: (error) => {
                console.error('Error updating profile picture:', error);
              }
            });
          };
        } else {
          alert('File not valid');
        }
      });
    }
  }

  toggleAccountManager() {
    this.showAccountManager = !this.showAccountManager;
  }


}
