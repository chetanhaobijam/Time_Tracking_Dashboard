// Variable Declaration
const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");

const statHeader = document.querySelectorAll(".stat-header");
const currentData = document.querySelectorAll(".current-data");
const previousData = document.querySelectorAll(".previous-data");

// Determine whether to add hr or hrs function
const determineHours = (num) => {
    if(num === 1) {
        return "hr";
    } else {
        return "hrs";
    }
}

// Asynchronous Data Extraction Function
const getData = async() => {
    try {
        const fetchData = await fetch("./data.json");
        const data = await fetchData.json();
        
        for(let i = 0; i < data.length; i++) {
            statHeader[i].textContent = data[i]["title"];

            // Daily Data
            daily.addEventListener("click", () => {
                let dailyCurrent = data[i]["timeframes"]["daily"]["current"];
                let dailyPrevious = data[i]["timeframes"]["daily"]["previous"];

                currentData[i].textContent = dailyCurrent + determineHours(dailyCurrent);
                previousData[i].textContent = "Yesterday - " + dailyPrevious + determineHours(dailyPrevious);
            })
            
            // Weekly Data
            weekly.addEventListener("click", () => {
                let weeklyCurrent = data[i]["timeframes"]["weekly"]["current"];
                let weeklyPrevious = data[i]["timeframes"]["weekly"]["previous"];

                currentData[i].textContent = weeklyCurrent + determineHours(weeklyCurrent);
                previousData[i].textContent = "Last Week - " + weeklyPrevious + determineHours(weeklyPrevious);
            })

            // Monthly Data
            monthly.addEventListener("click", () => {
                let monthlyCurrent = data[i]["timeframes"]["monthly"]["current"];
                let monthlyPrevious = data[i]["timeframes"]["monthly"]["previous"];

                currentData[i].textContent = monthlyCurrent + determineHours(monthlyCurrent);
                previousData[i].textContent = "Last Month - " + monthlyPrevious + determineHours(monthlyPrevious);
            })

        }

    }
    catch(error) {
        throw error;
    }
    finally {
        console.log("Asynchronous Data Operation Finished");
    }
}

getData();