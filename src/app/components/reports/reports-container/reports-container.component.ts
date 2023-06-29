import { Component, OnInit } from '@angular/core';
import { AllDataResponse, BaseApiService } from "../../../services/api/base-api.service";

@Component({
  selector: 'app-reports-container',
  templateUrl: './reports-container.component.html',
  styleUrls: ['./reports-container.component.scss']
})
export class ReportsContainerComponent implements OnInit {
  allData: AllDataResponse;
  reportsInfo: { header: string, description: string }[] = [
    {
      header: 'Analiza liczby recenzji i ocen lokalu',
      description: 'Chcemy zbierać dane o liczbie recenzji i ocenach lokali z Google Maps API. Na podstawie tych danych będziemy analizować trendy i identyfikować lokalne miejsca o najwyższych ocenach w określonym obszarze.'
    },
    {
      header: 'Rekomendacja miejsc z dobrym dojazdem',
      description: 'Chcemy oferować rekomendacje lokali, które są łatwo dostępne zarówno komunikacją miejską, jak i samochodem. Wykorzystamy dane o lokalizacji z Google Maps API, aby ocenić dostępność komunikacji miejskiej i czas dojazdu samochodem.'
    },
    {
      header: 'Analiza wpływu lokalizacji na oceny',
      description: 'Chcemy zbadać, czy lokalizacja wpływa na oceny lokalu. Będziemy korzystać z danych o ocenach z Google Maps API, aby zbadać korelację między lokalizacją a ocenami.'
    },
    {
      header: 'Grupowanie lokali według kategorii i odległości',
      description: 'Chcemy umożliwić użytkownikom wyszukiwanie lokali według kategorii (np. restauracje, kawiarnie, centra handlowe) oraz ograniczenie wyników do określonego promienia od danej lokalizacji. Wykorzystamy dane o kategoriach i lokalizacjach z Google Maps API oraz funkcje obliczania odległości.'
    },
    {
      header: 'Optymalizacja trasy do odwiedzenia wybranych lokali',
      description: 'Chcemy pomóc użytkownikom zaplanować optymalną trasę do odwiedzenia kilku lokali w jednej wycieczce, uwzględniając czasy dojazdu i odległości między lokalami. Skorzystamy z funkcji obliczania czasu dojazdu i optymalizacji trasy z Google Maps API.'
    },
    {
      header: 'Personalizowane rekomendacje lokali oparte na preferencjach użytkowników',
      description: 'Chcemy oferować użytkownikom rekomendacje lokali dostosowane do ich indywidualnych preferencji, takich jak rodzaj kuchni, cena czy dostępność miejsc parkingowych. Wykorzystamy dane o preferencjach użytkowników i informacje o lokalach z Google Maps API. Na podstawie tych danych będziemy generować spersonalizowane listy rekomendacji, dopasowane do potrzeb użytkowników.'
    },
    {
      header: 'Analiza wpływu dostępności parkingów na oceny lokalu',
      description: 'Chcemy sprawdzić, czy dostępność parkingów w pobliżu lokalu wpływa na jego oceny. Wykorzystamy informacje o lokalizacji, ocenach oraz liczbie recenzji z Google Maps API. Na podstawie tych danych będziemy analizować korelację między dostępnością parkingów a ocenami lokalu.'
    },
    {
      header: 'Analiza dostępności miejsca dla osób niepełnosprawnych',
      description: 'Chcemy zbadać dostępność i przyjazność lokali dla osób z niepełnosprawnościami, tak aby ułatwić im wybór odpowiednich miejsc. Wykorzystamy informacje o infrastrukturze i dostępie do komunikacji miejskiej z Google Maps API. Na podstawie tych danych będziemy oceniać dostępność lokali dla osób z niepełnosprawnościami.'
    }
  ];
  constructor(private readonly _baseApiService: BaseApiService) { }

  ngOnInit(): void {
  }

  getAllData(): void {
    this._baseApiService.getAllData().subscribe((resp) => {
      this.allData = resp;
    })
  }

}
