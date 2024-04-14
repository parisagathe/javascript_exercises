// Convert today's date to input format
const today = new Date().toISOString().split("T")[0];
startDate.value = today;
startDate.min = today;

// Tomorrow's date calc
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Convert to input format
let tomorrowFormat = tomorrow.toISOString().split("T")[0];
endDate.value = tomorrowFormat;
endDate.min = tomorrowFormat;

startDate.addEventListener("change", (e) => {
    let day = new Date(e.target.value);

    if (endDate.value < startDate.value) {
        day.setDate(day.getDate() + 1);
        endDate.value = day.toISOString().split("T")[0];
    }
});

endDate.addEventListener("change", (e) => {
    let day = new Date(e.target.value);
    day.setDate(day.getDate() - 1);

    if (endDate.value < startDate.value) {
        startDate.value = day.toISOString().split("T")[0];
    }
});

const bookingCalc = () => {
    let diffTime = Math.abs(new Date(endDate.value) - new Date(startDate.value)); // Gives us the number of seconds between both dates

    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Gives us the difference between both dates, in days count.

    total.textContent = diffDays * nightPrice.textContent;
};

startDate.addEventListener("change", bookingCalc);
endDate.addEventListener("change", bookingCalc);

bookingCalc();