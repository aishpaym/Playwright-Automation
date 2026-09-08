import{test,expect} from '@playwright/test';

test('Refund Eligibility Check', async({page})=>{
    //Test 1 — Single ticket booking is eligible for refund

        //Step 1 — Login
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    const Base_URL="https://eventhub.rahulshettyacademy.com";

    await page.getByPlaceholder("you@email.com").fill("aishwa123@gmail.com");

    await page.getByLabel("password").fill("@ish5678Q");

    await page.getByRole("button",{name: 'Sign In'}).click();

        //Step 2 — Book first event with 1 ticket (default)
    const Eventfirst= await page.getByTestId("event-card").first();

    const EventfirstText= await page.getByTestId("event-card").first().innerText();
    console.log(EventfirstText);

    await Eventfirst.getByTestId("book-now-btn").click();

    await page.locator("#customerName").fill("Aishwarya");
    await page.locator("#customer-email").fill("aishwaryasasankan@gmial.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 78765 67876");

    await page.getByRole('button', {name: 'Confirm Booking'}).click();

    //Step 3 — Navigate to booking detail

    await page.getByRole('button', {name : 'View My Bookings'}).click();

    //- Assert URL is /bookings
    await expect(page).toHaveURL(`${Base_URL}/bookings`);   

    const firstbookingcard = await page.getByTestId("booking-card").first();
    await firstbookingcard.getByRole("button",{name : 'View Details'}).click();

    await expect(page.getByRole('heading',{name: 'Booking Information'})).toBeVisible();

    //Step 4 — Validate booking ref
    const bookingref= await page.locator(".font-mono").first().innerText();
    const EventTitle =  await page.locator("h1").first().innerText();
    
    const firstcharbookref=await bookingref[0];
    const EventTitlechar= await EventTitle[0];

    await expect(firstcharbookref).toBe(EventTitlechar);

    //Step 5 — Check refund eligibility

    await page.getByTestId("check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();

    await expect(page.locator("#refund-spinner")).toBeHidden({
        timeout:6000
    });

    //Step 6 — Validate result

    await expect(page.getByTestId("refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText('Eligible for refund');

    await expect(page.locator("#refund-result")).toContainText('Single-ticket bookings qualify for a full refund.');

    await page.getByRole('button',{name: '← Back to My Bookings'}).click();

    await page.getByTestId('nav-events').click();

    //Test 2 — Group ticket booking is NOT eligible for refund
    const Eventfirstgroup= await page.getByTestId("event-card").first();

    const EventfirstTextgroup= await page.getByTestId("event-card").first().innerText();
    console.log(EventfirstText);

    await Eventfirstgroup.getByTestId("book-now-btn").click();
    for(let i=0;i<2;i++){
        await page.getByRole('button',{name: '+'}).click();
    }

    await page.locator("#customerName").fill("Aishwarya");
    await page.locator("#customer-email").fill("aishwaryasasankan@gmial.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 78765 67876");

    await page.getByRole('button', {name: 'Confirm Booking'}).click();

    //Step 3 — Navigate to booking detail
    const bookingrefvalue= await page.locator(".booking-ref").innerText();

    await page.getByRole('button', {name : 'View My Bookings'}).click();

    //- Assert URL is /bookings
    await expect(page).toHaveURL(`${Base_URL}/bookings`);   

    const bookingCards=page.getByTestId('booking-card');
    const matachBookingcard=bookingCards.filter({has: page.locator('.booking-ref').filter({hasText: bookingrefvalue})});

    //const firstbookingcardgroup = await page.getByTestId("booking-card").first();
    await matachBookingcard.getByRole("button",{name : 'View Details'}).click();

    await expect(page.getByRole('heading',{name: 'Booking Information'})).toBeVisible();

    //Step 4 — Validate booking ref
    const bookingrefgroup= await page.locator(".font-mono").first().innerText();
    const EventTitlegroup =  await page.locator("h1").first().innerText();
    
    const firstcharbookrefgroup=await bookingrefgroup[0];
    const EventTitlechargroup= await EventTitlegroup[0];

    await expect(firstcharbookrefgroup).toBe(EventTitlechargroup);

    //Step 5 — Check refund eligibility

    await page.getByTestId("check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();

    await expect(page.locator("#refund-spinner")).toBeHidden({
        timeout:6000
    });

    //Step 6 — Validate result

    await expect(page.getByTestId("refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText('Not eligible for refund.');

    await expect(page.locator("#refund-result")).toContainText('Group bookings (3 tickets) are non-refundable.');

    await page.getByRole('button',{name: '← Back to My Bookings'}).click();




















});