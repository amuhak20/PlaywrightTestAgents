# Flight Booking Search Test Plan

## Application Overview

Test the one-way Economy flight search from Dubai to Mumbai for a departure 15 days after the test date. Mumbai is available in the destination options observed during exploration.

## Test Scenarios

### 1. Flight Search

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search one-way Economy flight from Dubai to Mumbai 15 days ahead

**File:** `tests/flight-search/dubai-to-mumbai-one-way-economy.spec.ts`

**Steps:**
  1. Open https://www.qapractice.com/flight-booking-scenarios and confirm the Search Flights form is displayed.
    - expect: The flight booking wizard opens at the Search step.
  2. Open the From dropdown and select Dubai.
    - expect: Dubai is selected as the origin.
  3. Open the To dropdown and select Mumbai.
    - expect: Mumbai is available and selected as the destination.
  4. Set Departure Date to 15 calendar days after the test execution date. For execution on October 23, 2026, enter November 7, 2026.
    - expect: The departure date is 15 calendar days after the execution date.
  5. Confirm Travel Class is Economy; if not, select Economy. Check One Way.
    - expect: Economy is selected and One Way is checked. The return date is not required for this one-way itinerary.
  6. Click Search Flights.
    - expect: The form accepts the Dubai-to-Mumbai one-way Economy search for the selected date and displays flight results or a clear, actionable validation message if the search cannot be completed.
