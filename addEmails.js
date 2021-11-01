import puppeteer from "puppeteer";

export const addEmails = async (emails) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./user_data",
  });
  const page = await browser.newPage();
  await page.goto("https://teams.microsoft.com/_#/calendarv2");

  console.log("Please navigate to the meeting..");
  await page.waitForSelector("#cv2-sf-required-people-picker", {
    visible: true,
    timeout: 0,
  });
  console.log("Input field found!");

  for (const email of emails) {
    console.log("Adding", email);
    await page.$eval(
      "#cv2-sf-required-people-picker",
      async (el, email) => {
        el.click();
        el.value = email;
        el.dispatchEvent(
          new Event("input", {
            bubbles: true,
          })
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const suggestion = document.querySelector("#cv2-sf-people-result-0");
        if (suggestion) suggestion.click();
      },
      email
    );
    await sleep(1000);
  }

  console.log(
    "All attendees have been added! Please do the needful. This window will exit after 300 seconds"
  );
  await sleep(300000);

  await browser.close();
};
