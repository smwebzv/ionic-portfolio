import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { IonModal } from '@ionic/angular';

const apiKey = 'AIzaSyClEmPMJccMCBdCortNcklTu2utXFd4roA';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true })
  mapRef: ElementRef<HTMLElement>;

  @ViewChild(IonModal) modal: IonModal;
  newMap: GoogleMap;

  public slideOpts = {
    initialSlide: 1,
    speed: 200,
  };

  data = [
    {
      images: [
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2129/21293911/702d24b2c53c-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2129/21293911/e6a6f8d67c23-800x600-dw.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2129/21293911/c697b8e61fcb-800x600-dw.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2129/21293911/cab7c917f0a8-800x600-dw.jpg',
      ],
      car: {
        description: 'Volkswagen Golf 6 1.6 tdi',
        price: '5.700KM',
        longDescription: 'AUTO JE U DOBROM STANJU',
      },
    },
    {
      images: [
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2132/21323835/04974e7a50fd-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2132/21323835/ce72ee827d78-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2132/21323835/54e027843352-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2132/21323835/a2b94a4deef7-800x600.jpg',
        'https://gcdn.polovniautomobili.com/user-images/thumbs/2132/21323835/6f49c41f9a36-1920x1080.jpg',
      ],
      car: {
        description: 'Volkswagen Passat B7 1.6TDI /NAV/FUL/',
        price: '8.950KM',
        longDescription: `Automobil u perfektnom stanju, bez ostecenja na spoljasnjosti i unutrasnjosti vozila.
        Mehanicki odlican.
        Euro 5 norma.
        Veoma mali potrosac.
        Visok paket dodatne opreme.
        Servisna knjiga.
        2 kljuca.
        4 odlicne gume.
        Dostupan broj sasije za proveru stanja i predjene kilometraze vozila.
        Ocarinjen i poseduje potvrdu amss.
        Kupcu ostaje samo redovna registracija.
        Mogucnost izdavanja probnih tablica ili dovoza auta na vasu adresu.
        Za kupce sa teritorije Beograda zavrsavamo kompletnu registraciju.
        Cena nije fiksna.
        Za vise informacija pozovite.`,
      },
    },
  ];

  openedCar: any;

  modalOpen: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    setTimeout(async () => {
      await this.renderMap();
    }, 1000);
   
  }

  async renderMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'my-map', // Unique identifier for this map instance
        element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
        apiKey: apiKey, // Your Google Maps API Key
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: 44.3922423,
            lng: 19.1053653,
          },
          zoom: 5, // The initial zoom level to be rendered by the map
        },
      });

      await this.newMap.setMapType(MapType.Hybrid);
      await this.newMap.addMarkers([
        {
          coordinate: {
            lat: 44.3922423,
            lng: 19.1053653,
          },
        },
        {
          coordinate: {
            lat: 44.749997,
            lng: 19.2166658,
          },
        },
      ]);

      await this.newMap.setOnMarkerClickListener((event) => {
        this.openedCar = this.data[+event.markerId.slice(-1)];
        this.modalOpen = true;
        this.cdr.detectChanges();
      });
      await this.newMap.setOnMapClickListener((event) => {});

      this.getCurrentPosition();
    } catch (err) {
      console.log('WHAT IS AN ERROR', err);
    }
  }

  onModalDissmiss(e: Event) {
    this.modalOpen = false;
  }

  getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates.coords.latitude);
    console.log(coordinates.coords.longitude);

    await this.newMap.setCamera({
      coordinate: {
        // lat: coordinates.coords.latitude,
        // lng: coordinates.coords.longitude
        lat: 44.3922423,
        lng: 19.1053653,
      },
    });
  };
}
