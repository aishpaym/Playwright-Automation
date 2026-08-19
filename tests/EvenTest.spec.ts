import{test, expect} from '@playwright/test';

test('EventHub', async({page})=>{
    //Step 1 — Login
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    const Base_URL="https://eventhub.rahulshettyacademy.com";

    await page.getByPlaceholder("you@email.com").fill("aishwa123@gmail.com");

    await page.getByLabel("password").fill("@ish5678Q");

    await page.getByRole("button",{name: 'Sign In'}).click();

//- Assert: link with text Browse Events → is visible (confirms login success)

    await expect(page.getByRole("link",{name: 'Browse Events →'})).toBeVisible();
  //await page.pause();

  //Step 2 — Create a new event
    await page.getByTestId("nav-events").click();

    await page.getByRole("link" , {name: 'Add New Event'}).click();

    const event= await `Test Event ${Date.now()}`;
    await page.getByLabel('Title').fill(event);

    await page.getByPlaceholder("Describe the event…").fill('Testing to check all the events');
    await page.getByLabel("city").fill("Mumbai");
    await page.getByLabel("venue").fill("Fine Arts Mumbai");
    //To get a future date refer notes for explanation
    function futureDatevalue(){
        const date=new Date();
        date.setDate(date.getDate()+1);
        return date.toISOString().slice(0,16);

    }

    const futureDate=futureDatevalue();
    await page.getByLabel("Event Date & Time").fill(futureDate);

    await page.getByLabel("Price ($)").fill('500');

    await page.getByLabel('Total Seats').fill('200');

    await page.getByRole('button',{name: '+ Add Event'}).click();
//Step 3 — Find the event card and capture seats


    await page.getByTestId("nav-events").click();

    const eventcards=await page.getByTestId('event-card');
    await expect(page.getByTestId('event-card').nth(1)).toBeVisible();
    await console.log(eventcards.count());
    const eventcardscount=await eventcards.count();

    //From all cards, filter for the one that contains your event title text

    const matchingcard=await eventcards.filter({hasText: event});
    //Assert the matched card is visible (timeout 5 seconds)

    await expect(matchingcard).toBeVisible({timeout: 5000});

    //Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking
    const seatavail=await matchingcard.locator('span').filter({hasText : ' seats available'}).innerText();
    const seatsBeforeBookingval=parseInt(seatavail);
    console.log(seatsBeforeBookingval);

//Step 4 — Start booking

await matchingcard.getByRole('link',{name: 'Book Now'}).click();

//Step 5 — Fill booking form
 await expect(page.locator('#ticket-count').filter({hasText: '1'})).toBeVisible();

 await page.getByLabel('Full Name').fill('Test');

 await page.locator('#customer-email').fill('test@gmail.com');

 await page.getByPlaceholder('+91 98765 43210').fill('+91 89784 56210');

 await page.locator('.confirm-booking-btn').click();

 //Step 6 — Verify booking confirmation
 await expect(page.locator('.booking-ref').first().isVisible());

 const bookingref= await page.locator('.booking-ref').first().innerText();

 //Step 7 — Verify in My Bookings

await page.getByRole('button',{name:'View My Bookings'}).click();
//- Assert: URL is BASE_URL/bookings
await expect(page).toHaveURL(`${Base_URL}/bookings`);

const booking_card=await page.getByTestId('booking-card');

await expect(booking_card.first().isVisible());

const bookingcount= await booking_card.count();

const matchBooking= await booking_card.filter({has:page.locator('.booking-ref',{hasText: bookingref})});

await expect(matchBooking).toBeVisible();

await expect(matchBooking.locator(".font-semibold").filter({hasText: event})).toBeVisible();

//Step 8 — Verify seat reduction

await page.getByTestId("nav-events").click();
const eventcardafterbooking=page.getByTestId('event-card');

await expect(eventcardafterbooking.first()).toBeVisible();

const matchingcardafterbooking=await eventcardafterbooking.filter({hasText: event});
await expect(matchingcardafterbooking).toBeVisible();

const seatafterbooking=await matchingcardafterbooking.locator('span').filter({hasText:' seats available'}).innerText();
const seatafterbookingvalue=parseInt(seatafterbooking);

expect(seatafterbookingvalue).toBe(seatsBeforeBookingval - 1);










});