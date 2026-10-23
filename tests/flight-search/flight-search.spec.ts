import { test, expect } from '@playwright/test';
import { FlightSearchPage } from '../pages/flight-search.page';

test.describe('Flight Search', () => {
  test('Search one-way Economy flight from Dubai to Mumbai 15 days ahead', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // 1. Open the flight booking page and confirm the Search Flights form is displayed.
    await flightSearchPage.goto();
    await expect(flightSearchPage.searchHeading).toBeVisible();

    // 2. Select Dubai in the From dropdown.
    await flightSearchPage.selectOrigin('Dubai');

    // 3. Select Mumbai in the To dropdown.
    await flightSearchPage.selectDestination('Mumbai');

    // 4. Set departure to 15 calendar days after test execution.
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 15);
    const departureDateValue = [
      departureDate.getFullYear(),
      String(departureDate.getMonth() + 1).padStart(2, '0'),
      String(departureDate.getDate()).padStart(2, '0'),
    ].join('-');
    await flightSearchPage.setDepartureDate(departureDateValue);
    await expect(flightSearchPage.departureDateInput).toHaveValue(departureDateValue);

    // 5. Confirm Economy and select One Way.
    await flightSearchPage.selectTravelClass('Economy');
    await flightSearchPage.enableOneWay();
    await expect(flightSearchPage.travelClassSelect).toHaveValue('Economy');
    await expect(flightSearchPage.oneWayCheckbox).toBeChecked();
    await expect(flightSearchPage.returnDateInput).toBeHidden();

    // 6. Search and verify the Dubai-to-Mumbai flight results.
    await flightSearchPage.searchFlights();
    await expect(flightSearchPage.departureResultsHeading).toBeVisible();
    await expect(flightSearchPage.flightSelectButtons.first()).toBeVisible();
    await expect(flightSearchPage.flightSelectButtons).not.toHaveCount(0);
  });
});