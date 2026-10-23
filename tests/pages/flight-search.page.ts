import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }
}

export class FlightSearchPage extends BasePage {
  readonly searchHeading: Locator;
  readonly originSelect: Locator;
  readonly destinationSelect: Locator;
  readonly departureDateInput: Locator;
  readonly returnDateInput: Locator;
  readonly travelClassSelect: Locator;
  readonly oneWayCheckbox: Locator;
  readonly searchButton: Locator;
  readonly departureResultsHeading: Locator;
  readonly flightSelectButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.searchHeading = page.getByRole('heading', { name: 'Search Flights' });
    this.originSelect = page.getByTestId('flight-from');
    this.destinationSelect = page.getByTestId('flight-to');
    this.departureDateInput = page.locator('#flight-departure-date');
    this.returnDateInput = page.locator('#flight-return-date');
    this.travelClassSelect = page.locator('#flight-class');
    this.oneWayCheckbox = page.locator('#flight-one-way');
    this.searchButton = page.getByTestId('flight-search');
    this.departureResultsHeading = page.getByRole('heading', { name: 'Departure · Dubai → Mumbai' });
    this.flightSelectButtons = page.getByRole('button', { name: 'Select', exact: true });
  }

  async goto(): Promise<void> {
    await this.navigate('/flight-booking-scenarios');
  }

  async selectOrigin(city: string): Promise<void> {
    await this.originSelect.selectOption({ label: city });
  }

  async selectDestination(city: string): Promise<void> {
    await this.destinationSelect.selectOption({ label: city });
  }

  async setDepartureDate(date: string): Promise<void> {
    await this.departureDateInput.fill(date);
  }

  async selectTravelClass(travelClass: string): Promise<void> {
    await this.travelClassSelect.selectOption({ label: travelClass });
  }

  async enableOneWay(): Promise<void> {
    await this.oneWayCheckbox.check();
    await expect(this.oneWayCheckbox).toBeChecked();
  }

  async searchFlights(): Promise<void> {
    await this.searchButton.click();
  }
}
